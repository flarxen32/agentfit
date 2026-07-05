import { Redis } from "@upstash/redis";

/**
 * Email capture persistence for the Report Card ("Email me my report").
 *
 * Leads are stored in Vercel KV (Upstash Redis) so they persist across cold
 * starts and deploys. Every captured email is a warm lead for the outbound
 * list (XRO-10).
 *
 * Each lead is stored as a JSON string under two keys:
 *   - lead:{id}            → the full lead object
 *   - lead_index           → a sorted set scored by timestamp for ordering
 *
 * Schema: { id, capturedAt, email, fitScore, grade, role, task, tools, source }
 */

const redis = new Redis({
  url: process.env.KV_REST_API_URL as string,
  token: process.env.KV_REST_API_TOKEN as string,
});

const LEAD_PREFIX = "lead:";
const LEAD_INDEX = "lead_index";

export interface EmailCapture {
  id: string;
  capturedAt: string;
  email: string;
  /** The visitor's automation fit score (0-100) at capture time. */
  fitScore: number;
  /** Letter grade (A-D) at capture time. */
  grade: string;
  /** Visitor role from the audit, if available. */
  role: string;
  /** Visitor's #1 task from the audit, if available. */
  task: string;
  /** Tools the visitor selected, if available. */
  tools: string;
  source: string;
}

/** Check whether KV is configured (env vars present). */
export function isKVConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 * Append a capture to Vercel KV.
 *
 * Stores the lead as a JSON hash and adds it to a timestamp-ordered index
 * so /api/leads can return them newest-first.
 */
export async function appendEmailCapture(capture: EmailCapture): Promise<void> {
  const score = new Date(capture.capturedAt).getTime();
  await Promise.all([
    redis.set(`${LEAD_PREFIX}${capture.id}`, capture),
    redis.zadd(LEAD_INDEX, { score, member: capture.id }),
  ]);
}

/** Read all captures (for /api/leads export), newest-first. */
export async function readEmailCaptures(limit = 200): Promise<EmailCapture[]> {
  // Get the newest `limit` member IDs from the sorted set (descending)
  const ids = await redis.zrange(LEAD_INDEX, 0, limit - 1, { rev: true });
  if (!ids || ids.length === 0) return [];

  const keys = (ids as string[]).map((id) => `${LEAD_PREFIX}${id}`);
  const records = await redis.mget<EmailCapture[]>(...keys);

  return records.filter((r): r is EmailCapture => r !== null);
}

/** Count captures without exposing PII (lightweight metric). */
export async function countEmailCaptures(): Promise<number> {
  return redis.zcard(LEAD_INDEX);
}

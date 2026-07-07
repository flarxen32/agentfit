import { Redis } from "@upstash/redis";

/**
 * Inbound reply persistence for outreach@xablam.com.
 *
 * When a prospect replies to a cold email, the reply lands at
 * outreach@xablam.com. Email routing (Cloudflare Email Routing or
 * Namecheap eforward → IMAP) forwards the raw message to a worker or
 * webhook that normalises it into an `InboundReply` and POSTs it here.
 *
 * Replies are stored in Vercel KV (Upstash Redis) so they persist across
 * cold starts and deploys, and are queryable via GET /api/replies.
 *
 * Each reply is stored as a JSON string under two keys:
 *   - reply:{id}            → the full reply object
 *   - reply_index           → a sorted set scored by timestamp for ordering
 *
 * Storage mirrors the lead-capture pattern in lib/email-capture.ts.
 */

const redis = new Redis({
  url: process.env.KV_REST_API_URL as string,
  token: process.env.KV_REST_API_TOKEN as string,
});

const REPLY_PREFIX = "reply:";
const REPLY_INDEX = "reply_index";

export interface InboundReply {
  /** Stable unique id (sha1 of message-id or from+subject+ts). */
  id: string;
  /** ISO timestamp the reply was received by the sink. */
  receivedAt: string;
  /** Sender email address (the prospect). */
  from: string;
  /** Sender display name if available. */
  fromName?: string;
  /** Original recipient (should be outreach@xablam.com). */
  to: string;
  /** Email subject line. */
  subject: string;
  /** Plain-text body, stripped of quoted replies/signatures where possible. */
  bodyText: string;
  /** Raw RFC-822 Message-ID header, if provided by the forwarder. */
  messageId?: string;
  /** Source forwarder that delivered this reply ("cloudflare" | "namecheap-imap" | "manual" | "test"). */
  source: string;
  /** Free-form metadata from the forwarder (e.g. SPF/DKIM result). */
  meta?: Record<string, string>;
}

/** Check whether KV is configured (env vars present). */
export function isKVConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/** Append an inbound reply to Vercel KV. Idempotent on `id`. */
export async function appendReply(reply: InboundReply): Promise<void> {
  const score = new Date(reply.receivedAt).getTime();
  const key = `${REPLY_PREFIX}${reply.id}`;

  // NX semantics: if the record already exists (idempotent re-delivery),
  // don't clobber or duplicate the index entry.
  const existing = await redis.get<InboundReply>(key);
  if (existing) return;

  await redis.set(key, reply);
  await redis.zadd(REPLY_INDEX, { score, member: reply.id });
}

/** Read recent replies (newest-first), for /api/replies export. */
export async function readReplies(limit = 200): Promise<InboundReply[]> {
  const ids = await redis.zrange(REPLY_INDEX, 0, limit - 1, { rev: true });
  if (!ids || ids.length === 0) return [];

  const idArr = ids as string[];
  const keys = idArr.map((id) => `${REPLY_PREFIX}${id}`);
  const records = await redis.mget<InboundReply[]>(...keys);

  // Clean orphan index entries (defensive).
  const orphans = idArr.filter((_, i) => records[i] === null);
  if (orphans.length > 0) {
    void redis.zrem(REPLY_INDEX, ...orphans).catch(() => {});
  }

  return records.filter((r): r is InboundReply => r !== null);
}

/** Count replies without exposing PII (lightweight metric). */
export async function countReplies(): Promise<number> {
  return redis.zcard(REPLY_INDEX);
}

/** Find a reply by its stable id (for dedup/inspection). */
export async function getReply(id: string): Promise<InboundReply | null> {
  return redis.get<InboundReply>(`${REPLY_PREFIX}${id}`);
}

/**
 * Derive a stable id when the forwarder doesn't supply one.
 * Uses from+subject+receivedAt (truncated) — good enough for dedup
 * without a heavyweight hash dep; we fall back to crypto.randomUUID()
 * only when truly nothing is available.
 */
export async function deriveReplyId(
  from: string,
  subject: string,
  receivedAt: string,
): Promise<string> {
  const { createHash, randomUUID } = await import("node:crypto");
  const raw = `${from}|${subject}|${receivedAt}`;
  return createHash("sha1").update(raw).digest("hex").slice(0, 24) || randomUUID();
}

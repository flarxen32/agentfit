import { mkdirSync, appendFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Email capture persistence for the Report Card ("Email me my report").
 *
 * Submissions are appended to a JSONL file (data/email-captures.jsonl).
 * JSONL = one JSON object per line, append-only, durable across restarts
 * and deploys. Intentionally simple — no DB, no migration, easy to grep/export.
 *
 * This feeds the Bet #1 outbound list (XRO-10): every capture is a warm lead
 * who has already seen their fit score and opted in for the report.
 *
 * Each line: { id, capturedAt, email, fitScore, grade, role, task, tools, source }
 */

const DATA_DIR = join(process.cwd(), "data");
const FILE = join(DATA_DIR, "email-captures.jsonl");

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

/** Append a capture to the JSONL store. Creates the dir/file if needed. */
export function appendEmailCapture(capture: EmailCapture): void {
  mkdirSync(DATA_DIR, { recursive: true });
  appendFileSync(FILE, JSON.stringify(capture) + "\n", "utf8");
}

/** Read all captures (for export to the outbound list). */
export function readEmailCaptures(): EmailCapture[] {
  if (!existsSync(FILE)) return [];
  const raw = readFileSync(FILE, "utf8");
  return raw
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line) as EmailCapture);
}

/** Count captures without exposing PII (lightweight metric). */
export function countEmailCaptures(): number {
  return readEmailCaptures().length;
}

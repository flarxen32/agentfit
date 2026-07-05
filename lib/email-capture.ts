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
 * Schema: { id, capturedAt, email, fitScore, grade, role, task, tools, industry, hoursPerWeek, source }
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
  /** Visitor's industry from the audit, if available. */
  industry: string;
  /** Hours per week the visitor spends on the task, if available. */
  hoursPerWeek: number;
  source: string;
}

/** Check whether KV is configured (env vars present). */
export function isKVConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 /** Append a capture to Vercel KV.
  *
  * Stores the lead as a JSON hash and adds it to a timestamp-ordered index
  * so /api/leads can return them newest-first. Also fires a webhook
  * notification so the team is alerted instantly about new high-fit leads.
  */
 export async function appendEmailCapture(capture: EmailCapture): Promise<void> {
   const score = new Date(capture.capturedAt).getTime();
   const key = `${LEAD_PREFIX}${capture.id}`;

   // Store the lead record FIRST. Only add to the index after the record
   // is durably saved — this prevents orphan index entries (where the index
   // points to a lead that was never stored) if one of the two operations
   // fails. Previously used Promise.all which could leave orphans on partial
   // failure.
   await redis.set(key, capture);
   await redis.zadd(LEAD_INDEX, { score, member: capture.id });

   // Webhook notification for hot leads (FitScore >= 50) so the team can
   // follow up immediately. Awaited (not fire-and-forget) because Vercel
   // serverless kills background fetches once the response is returned.
   // Errors are caught so a webhook outage never blocks lead capture.
   if (capture.fitScore >= 50) {
     try {
       await notifyNewLead(capture);
     } catch {
       // Webhook failed — lead is still saved, which is the critical path.
     }
   }
 }

 /**
  * Send a webhook notification about a new hot lead.
  *
  * Supports two formats, auto-detected from the LEAD_WEBHOOK_URL:
  *  - ntfy.sh URLs (https://ntfy.sh/...): sends a push notification with
  *    Title/Tags headers and a plain-text body. Subscribe to the topic via
  *    the ntfy app or https://ntfy.sh/<topic> to receive instant alerts.
  *  - Other URLs (Discord/Slack-compatible): sends a JSON embed payload.
  */
 async function notifyNewLead(capture: EmailCapture): Promise<void> {
   const webhookUrl = process.env.LEAD_WEBHOOK_URL;
   if (!webhookUrl) return;

   const isNtfy = webhookUrl.includes("ntfy.sh");

   if (isNtfy) {
     // ntfy.sh: plain-text body + headers for title, tags, priority, click URL
     const body = [
       `🔥 New AgentFit Lead (FitScore: ${capture.fitScore}/100)`,
       ``,
       `Email: ${capture.email}`,
       `Role: ${capture.role || "—"}`,
       `Industry: ${capture.industry || "—"}`,
       `Top task: ${capture.task || "—"}`,
       `Tools: ${capture.tools || "—"}`,
       `Hours/wk: ${capture.hoursPerWeek || "—"}`,
       ``,
       `Follow up now → response rates drop 60x after 24h`,
     ].join("\n");

     await fetch(webhookUrl, {
       method: "POST",
       headers: {
         Title: `🔥 Lead: ${capture.email} (FitScore ${capture.fitScore})`,
         Tags: "bell,money,lead",
         Priority: capture.fitScore >= 70 ? "high" : "default",
         Click: "https://agentfit-mu.vercel.app/offer",
       },
       body,
     });
     return;
   }

   // Discord/Slack-compatible JSON embed
   const message = {
     content: `🔥 **New AgentFit Lead** (FitScore: ${capture.fitScore}/100)`,
     embeds: [
       {
         title: `Lead: ${capture.email}`,
         fields: [
           { name: "Role", value: capture.role || "—" },
           { name: "Task", value: capture.task || "—" },
           { name: "Industry", value: capture.industry || "—" },
           { name: "Tools", value: capture.tools || "—" },
           { name: "Hours/wk", value: String(capture.hoursPerWeek || "—") },
           { name: "Captured", value: capture.capturedAt },
         ],
         color: 0x10b981,
         url: "https://agentfit-mu.vercel.app/offer",
       },
     ],
   };

   await fetch(webhookUrl, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(message),
   });
 }

/** Read all captures (for /api/leads export), newest-first.
 *  Silently filters out orphan index entries (IDs in the sorted set whose
 *  lead record is missing — can happen from old race conditions before the
 *  fix in the write path). */
export async function readEmailCaptures(limit = 200): Promise<EmailCapture[]> {
  // Get the newest `limit` member IDs from the sorted set (descending)
  const ids = await redis.zrange(LEAD_INDEX, 0, limit - 1, { rev: true });
  if (!ids || ids.length === 0) return [];

  const idArr = ids as string[];
  const keys = idArr.map((id) => `${LEAD_PREFIX}${id}`);
  const records = await redis.mget<EmailCapture[]>(...keys);

  // Detect orphan entries and clean them from the index so total/count stay
  // consistent. Fire-and-forget — don't block the read on cleanup.
  const orphans = idArr.filter((_, i) => records[i] === null);
  if (orphans.length > 0) {
    void redis.zrem(LEAD_INDEX, ...orphans).catch(() => {});
  }

  return records.filter((r): r is EmailCapture => r !== null);
}

/** Count captures without exposing PII (lightweight metric). */
export async function countEmailCaptures(): Promise<number> {
  return redis.zcard(LEAD_INDEX);
}

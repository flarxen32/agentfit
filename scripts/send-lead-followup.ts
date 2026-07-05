/**
 * Lead follow-up sender — emails AgentFit audit completers with a personalized
 * $750 custom-agent-build offer.
 *
 * This closes the funnel loop: a visitor completes the audit → their email is
 * captured to Vercel KV → this script sends them a warm, personalized follow-up
 * referencing their fit score and estimated savings.
 *
 * Run AFTER XRO-24 (Resend infra) is provisioned:
 *   npx tsx scripts/send-lead-followup.ts --dry-run   # preview, no send
 *   npx tsx scripts/send-lead-followup.ts              # send to all uncontacted leads
 *   npx tsx scripts/send-lead-followup.ts --lead-id <id>  # send to one lead
 *
 * Contract:
 *   - Reads leads from Vercel KV (same store as /api/leads)
 *   - Sends via Resend (same mailer as outbound — requires RESEND_API_KEY)
 *   - Tracks which leads have been contacted via KV key "lead_contacted:{id}"
 *   - Idempotent: re-running won't double-email a lead
 *
 * Depends on: XRO-24 (Resend provisioned), XRO-30 (KV email capture)
 */
import { readEmailCaptures, type EmailCapture } from "@/lib/email-capture";
import { sendOne } from "@/lib/outbound/mailer";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL as string,
  token: process.env.KV_REST_API_TOKEN as string,
});

const CONTACTED_PREFIX = "lead_contacted:";

// ─── CLI parsing ───────────────────────────────────────────────
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const leadIdIdx = args.indexOf("--lead-id");
const filterLeadId = leadIdIdx !== -1 ? args[leadIdIdx + 1] : undefined;

// ─── Helpers ───────────────────────────────────────────────────

async function isContacted(id: string): Promise<boolean> {
  const v = await redis.get(`${CONTACTED_PREFIX}${id}`);
  return Boolean(v);
}

async function markContacted(id: string, messageId: string): Promise<void> {
  await redis.set(`${CONTACTED_PREFIX}${id}`, {
    contactedAt: new Date().toISOString(),
    messageId,
  });
}

/** Build a personalized follow-up email for an AgentFit lead. */
function buildFollowupEmail(lead: EmailCapture): {
  subject: string;
  html: string;
  text: string;
} {
  const fitLabel =
    lead.fitScore >= 75
      ? "excellent"
      : lead.fitScore >= 50
        ? "strong"
        : lead.fitScore >= 25
          ? "solid"
          : "emerging";

  const taskLine = lead.task
    ? `Your #1 automation opportunity: <strong>${lead.task}</strong>.`
    : "Your audit surfaced clear automation opportunities.";

  const roleLine = lead.role
    ? `As a ${lead.role}, your time is the bottleneck.`
    : "As a business operator, your time is the bottleneck.";

  const gradeLine = lead.grade
    ? ` You scored a <strong>${lead.grade}</strong> on the automation readiness grade.`
    : "";

  const subject = lead.task
    ? `Your AgentFit audit: ${lead.task} is your biggest win`
    : "Your AgentFit audit results + next step";

  const bookingLink =
    process.env.BOOKING_LINK || "https://cal.com/xro/scoping";

  const html = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
  <p style="font-size: 16px; line-height: 1.6;">Hi,</p>

  <p style="font-size: 16px; line-height: 1.6;">
    You just ran the AgentFit audit — your automation readiness score came back
    as <strong>${lead.fitScore}/100 (${fitLabel} fit)</strong>.${gradeLine}
  </p>

  <p style="font-size: 16px; line-height: 1.6;">
    ${taskLine} ${roleLine} That task is costing you hours every week, and it's
    exactly the kind of repetitive, rules-based work that a custom AI agent can
    take off your plate.
  </p>

  <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 20px; margin: 24px 0;">
    <p style="margin: 0 0 12px; font-size: 15px; font-weight: 600; color: #15803d;">
      Here's what I can build for you:
    </p>
    <ul style="margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.8; color: #166534;">
      <li>A custom AI agent that automates ${lead.task || "your #1 repetitive task"}</li>
      <li>Built and deployed in 7 days</li>
      <li>$750 flat — if it doesn't save you hours, you don't pay</li>
    </ul>
  </div>

  <p style="font-size: 16px; line-height: 1.6;">
    Want to see if this is a fit? Book a free 30-minute scoping call and I'll
    sketch out exactly what your agent would do:
  </p>

  <p style="text-align: center; margin: 28px 0;">
    <a href="${bookingLink}"
       style="display: inline-block; background: #1a1a1a; color: #fff; padding: 14px 32px; border-radius: 9999px; text-decoration: none; font-weight: 600; font-size: 15px;">
      Book my 30-min scoping call →
    </a>
  </p>

  <p style="font-size: 14px; line-height: 1.6; color: #71717a;">
    No pressure — even if we don't work together, the call will give you a clear
    automation roadmap for your business.
  </p>

  <p style="font-size: 16px; line-height: 1.6;">
    Best,<br/>
    The AgentFit Team
  </p>

  <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
  <p style="font-size: 12px; color: #a1a1aa;">
    You're receiving this because you completed the AgentFit AI automation audit.
    Reply "stop" if you don't want follow-ups.
  </p>
</div>
`.trim();

  const text = `Hi,

You just ran the AgentFit audit — your automation readiness score came back as ${lead.fitScore}/100 (${fitLabel} fit).${gradeLine ? " You scored a " + lead.grade + " on the automation readiness grade." : ""}

${lead.task ? "Your #1 automation opportunity: " + lead.task + "." : "Your audit surfaced clear automation opportunities."} ${lead.role ? "As a " + lead.role + ", your time is the bottleneck." : "As a business operator, your time is the bottleneck."} That task is costing you hours every week, and it's exactly the kind of repetitive, rules-based work that a custom AI agent can take off your plate.

Here's what I can build for you:
- A custom AI agent that automates ${lead.task || "your #1 repetitive task"}
- Built and deployed in 7 days
- $750 flat — if it doesn't save you hours, you don't pay

Want to see if this is a fit? Book a free 30-minute scoping call: ${bookingLink}

No pressure — even if we don't work together, the call will give you a clear automation roadmap.

Best,
The AgentFit Team`;

  return { subject, html, text };
}

// ─── Main ──────────────────────────────────────────────────────

async function main() {
  console.log("=== AgentFit Lead Follow-up Sender ===\n");

  if (dryRun) {
    console.log("[DRY RUN] No emails will be sent.\n");
  }

  // Check env
  if (!process.env.KV_REST_API_URL) {
    console.error("ERROR: KV_REST_API_URL not set. Cannot read leads.");
    process.exit(1);
  }

  if (!dryRun && !process.env.RESEND_API_KEY) {
    console.error(
      "ERROR: RESEND_API_KEY not set. Provision Resend (XRO-24) first.\n" +
        "Run with --dry-run to preview emails without sending.",
    );
    process.exit(1);
  }

  // Load leads
  const allLeads = await readEmailCaptures(500);
  console.log(`Total leads in KV: ${allLeads.length}`);

  // Filter to a specific lead if requested
  const leads = filterLeadId
    ? allLeads.filter((l) => l.id === filterLeadId)
    : allLeads;

  if (leads.length === 0) {
    console.log("No leads to process. Exiting.");
    return;
  }

  // Filter out already-contacted and test/internal leads
  const toContact: EmailCapture[] = [];
  const skipped: { lead: EmailCapture; reason: string }[] = [];

  for (const lead of leads) {
    // Skip test/internal leads
    if (
      lead.email.includes("test-") ||
      lead.email.includes("@xro.com") ||
      lead.email.includes("example.com")
    ) {
      skipped.push({ lead, reason: "test/internal email" });
      continue;
    }

    // Skip already contacted (idempotency check)
    if (!filterLeadId) {
      const contacted = await isContacted(lead.id);
      if (contacted) {
        skipped.push({ lead, reason: "already contacted" });
        continue;
      }
    }

    toContact.push(lead);
  }

  console.log(`Leads to contact: ${toContact.length}`);
  console.log(`Skipped: ${skipped.length}`);
  skipped.forEach((s) =>
    console.log(`  - ${s.lead.email} (${s.reason})`),
  );
  console.log("");

  if (toContact.length === 0) {
    console.log("No new leads to contact. Done.");
    return;
  }

  // Preview first email in dry-run
  if (dryRun) {
    const sample = toContact[0];
    const email = buildFollowupEmail(sample);
    console.log("--- PREVIEW (first lead) ---");
    console.log(`To: ${sample.email}`);
    console.log(`Subject: ${email.subject}`);
    console.log(`\n${email.text}\n`);
    console.log("--- END PREVIEW ---\n");
    console.log(
      `Would send ${toContact.length} follow-up email(s) in live mode.`,
    );
    return;
  }

  // Send
  const results: { email: string; status: "sent" | "error"; error?: string }[] =
    [];

  for (const lead of toContact) {
    const { subject, html, text } = buildFollowupEmail(lead);
    try {
      const messageId = await sendOne({
        to: lead.email,
        subject,
        html,
        text,
      });
      await markContacted(lead.id, messageId);
      console.log(`  ✅ Sent to ${lead.email} (id: ${lead.id}, msg: ${messageId})`);
      results.push({ email: lead.email, status: "sent" });

      // Rate limit: 1 email per second (Resend free tier allows 2/s)
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`  ❌ Failed for ${lead.email}: ${msg}`);
      results.push({ email: lead.email, status: "error", error: msg });
    }
  }

  // Summary
  const sent = results.filter((r) => r.status === "sent").length;
  const failed = results.filter((r) => r.status === "error").length;
  console.log(
    `\n=== Done: ${sent} sent, ${failed} failed out of ${toContact.length} ===`,
  );
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

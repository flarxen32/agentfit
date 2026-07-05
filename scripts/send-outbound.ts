#!/usr/bin/env node
/**
 * XRO-21 outbound sequence sender (built as part of XRO-24 infra).
 *
 * Reads the XRO-10 prospect list, sends the first-touch email to each
 * prospect, and records the result to data/outbound-log.jsonl for
 * tracking (opens/replies come from Resend webhooks — see TODO).
 *
 * Safety rails:
 *   --dry-run    Render emails to stdout; do not send. (default off)
 *   --limit N    Send to only the first N prospects (for a soft launch).
 *   --template   "first" | "followup" (default "first")
 *
 * Usage:
 *   npx tsx scripts/send-outbound.ts --dry-run
 *   npx tsx scripts/send-outbound.ts --limit 5      # soft launch
 *   npx tsx scripts/send-outbound.ts                # full 50 (first-touch)
 *
 * Exits non-zero on any hard error (missing key, unreadable list).
 */
import { appendFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { loadProspects, sendOne, type OutboundProspect } from "../lib/outbound/mailer";

function flag(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
function flagBool(name: string): boolean {
  return process.argv.includes(name);
}

/** First-touch email body. Personalized from the prospect pack. */
function firstTouchHtml(p: OutboundProspect): string {
  const name = p.name ? p.name.split(" ")[0] : "there";
  const taskLine = p.task
    ? `<p>Based on your role${p.role ? ` as ${p.role}` : ""}, I'd bet your #1 time-sink is <strong>${p.task}</strong>. ${p.hook ?? ""}</p>`
    : `<p>${p.hook ?? ""}</p>`;
  return `<!doctype html><html><body style="font-family:system-ui,sans-serif;max-width:520px">
<p>Hi ${name},</p>
${taskLine}
<p>We build custom AI agents that take that task off your plate — built in 7 days, $750 flat. If it doesn't save you hours, you don't pay.</p>
<p>Want me to scope yours? <a href="https://agentfit.com/offer">Book a 30-minute call</a> and I'll come with a build plan already drafted.</p>
<p>— Alex<br/>AgentFit</p>
</body></html>`;
}
function firstTouchText(p: OutboundProspect): string {
  const name = p.name ? p.name.split(" ")[0] : "there";
  const taskLine = p.task
    ? `Based on your role${p.role ? ` as ${p.role}` : ""}, I'd bet your #1 time-sink is ${p.task}. ${p.hook ?? ""}`
    : (p.hook ?? "");
  return `Hi ${name},\n\n${taskLine}\n\nWe build custom AI agents that take that task off your plate — built in 7 days, $750 flat. If it doesn't save you hours, you don't pay.\n\nWant me to scope yours? Book a 30-minute call: https://agentfit.com/offer — I'll come with a build plan already drafted.\n\n— Alex\nAgentFit`;
}

const LOG = join(process.cwd(), "data", "outbound-log.jsonl");

function logResult(rec: Record<string, unknown>) {
  mkdirSync(join(process.cwd(), "data"), { recursive: true });
  appendFileSync(LOG, JSON.stringify(rec) + "\n", "utf8");
}

async function main() {
  const dryRun = flagBool("--dry-run");
  const limit = flag("--limit") ? Number(flag("--limit")) : undefined;
  const template = flag("--template") ?? "first";

  let prospects: OutboundProspect[];
  try {
    prospects = loadProspects();
  } catch (e) {
    console.error("Could not read data/outbound-prospects.json:", e instanceof Error ? e.message : e);
    console.error("Put the XRO-10 prospect list there (array of {id,email,name,role,task,hook}).");
    process.exit(1);
  }
  if (limit) prospects = prospects.slice(0, limit);
  console.log(`${dryRun ? "[DRY RUN] " : ""}Sending ${template} to ${prospects.length} prospect(s).`);

  let sent = 0;
  let errors = 0;
  for (const p of prospects) {
    const subject =
      template === "followup"
        ? `Re: your ${p.task ?? "biggest time-sink"}`
        : `Your ${p.task ?? "#1 task"} — automated?`;
    const html = template === "followup" ? firstTouchHtml(p) : firstTouchHtml(p);
    const text = template === "followup" ? firstTouchText(p) : firstTouchText(p);

    if (dryRun) {
      console.log(`--- ${p.email} ---\n${text}\n`);
      continue;
    }
    try {
      const messageId = await sendOne({ to: p.email, subject, html, text });
      logResult({ at: new Date().toISOString(), prospectId: p.id, email: p.email, template, messageId, status: "sent" });
      sent++;
      // Respect Resend free-tier rate (100/day) with a polite delay.
      await new Promise((r) => setTimeout(r, 1200));
    } catch (e) {
      errors++;
      const msg = e instanceof Error ? e.message : String(e);
      logResult({ at: new Date().toISOString(), prospectId: p.id, email: p.email, template, status: "error", error: msg });
      console.error(`✗ ${p.email}: ${msg}`);
    }
  }
  console.log(`\nDone. sent=${sent} errors=${errors}${dryRun ? " (dry run, nothing sent)" : ""}`);
  console.log(`Tracking log: ${LOG}`);
  if (!existsSync(LOG) && !dryRun) {
    console.log("Note: open/reply tracking requires a Resend webhook -> data store (out of XRO-24 scope).");
  }
}

main().catch((e) => {
  console.error("Fatal:", e instanceof Error ? e.message : e);
  process.exit(1);
});

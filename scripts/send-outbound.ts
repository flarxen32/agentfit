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
import { appendFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { loadProspects, sendOne, type OutboundProspect } from "../lib/outbound/mailer";

/** Read the send log and return the set of emails already successfully sent
 *  (any template). Used by --skip-sent to avoid double-sending on re-runs. */
function alreadySentEmails(logPath: string): Set<string> {
  const sent = new Set<string>();
  if (!existsSync(logPath)) return sent;
  try {
    const lines = readFileSync(logPath, "utf8").split("\n").filter(Boolean);
    for (const line of lines) {
      try {
        const rec = JSON.parse(line);
        if (rec.status === "sent" && rec.email) sent.add(rec.email.toLowerCase());
      } catch { /* skip malformed line */ }
    }
  } catch { /* ignore read errors */ }
  return sent;
}

/** Read the Resend delivery-status file and return emails that bounced.
 *  Used by --exclude-bounced to protect sender reputation on follow-up sends.
 *  File format: { results: { "email@x.com": "bounced", ... } } */
function bouncedEmails(): Set<string> {
  const bounced = new Set<string>();
  const bounceFile = join(process.cwd(), "data", "first-touch-delivery-status.json");
  if (!existsSync(bounceFile)) return bounced;
  try {
    const data = JSON.parse(readFileSync(bounceFile, "utf8"));
    const results = data?.results ?? {};
    for (const [email, status] of Object.entries(results)) {
      if (status === "bounced") bounced.add(email.toLowerCase());
    }
  } catch { /* ignore read errors */ }
  return bounced;
}

/** Read the manual do-not-send list (replied, opted out, manually excluded).
 *  File format: ["email@x.com", ...] — lowercase. Created/updated manually
 *  when replies arrive so follow-ups don't go to people already engaged. */
function doNotSendEmails(): Set<string> {
  const dns = new Set<string>();
  const dnsFile = join(process.cwd(), "data", "do-not-send.json");
  if (!existsSync(dnsFile)) return dns;
  try {
    const data = JSON.parse(readFileSync(dnsFile, "utf8"));
    if (Array.isArray(data)) {
      for (const email of data) if (typeof email === "string") dns.add(email.toLowerCase());
    }
  } catch { /* ignore read errors */ }
  return dns;
}

function flag(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
function flagBool(name: string): boolean {
  return process.argv.includes(name);
}

/** First-touch email body. Personalized from the prospect pack. */
function firstTouchHtml(p: OutboundProspect): string {
  const name = greetingName(p);
  const taskLine = p.task
    ? `<p>Based on your role${p.role ? ` as ${p.role}` : ""}, I'd bet your #1 time-sink is <strong>${p.task}</strong>. ${p.hook ?? ""}</p>`
    : `<p>${p.hook ?? ""}</p>`;
  return `<!doctype html><html><body style="font-family:system-ui,sans-serif;max-width:520px">
<p>Hi ${name},</p>
${taskLine}
<p>We build custom AI agents that take that task off your plate — built in 7 days, $750 flat. If it doesn't save you hours, you don't pay.</p>
<p>Want me to scope yours? <a href="https://agentfit-mu.vercel.app/offer">Book a 30-minute call</a> and I'll come with a build plan already drafted.</p>
<p>— Alex<br/>AgentFit</p>
</body></html>`;
}
function firstTouchText(p: OutboundProspect): string {
  const name = greetingName(p);
  const taskLine = p.task
    ? `Based on your role${p.role ? ` as ${p.role}` : ""}, I'd bet your #1 time-sink is ${p.task}. ${p.hook ?? ""}`
    : (p.hook ?? "");
  return `Hi ${name},\n\n${taskLine}\n\nWe build custom AI agents that take that task off your plate — built in 7 days, $750 flat. If it doesn't save you hours, you don't pay.\n\nWant me to scope yours? Book a 30-minute call: https://agentfit-mu.vercel.app/offer — I'll come with a build plan already drafted.\n\n— Alex\nAgentFit`;
}

/** Day-3 follow-up. Shorter, references the first email, same single CTA. */
function cleanTask(task: string | undefined): string {
  if (!task) return "your biggest time-sink";
  // Strip trailing "automation" to avoid "automating X automation"
  const cleaned = task.replace(/\s+automation$/i, "").trim();
  // If stripping removed everything meaningful, keep original
  return cleaned || task;
}

function greetingName(p: OutboundProspect): string {
  // The prospect list stores company names in the `name` field (name == company
  // for all 50 entries). Never use a company name fragment as a greeting —
  // "Hi Dragonfly" or "Hi Lounge" looks robotic and wrong. Always use "there".
  return "there";
}

function taskPhrase(task: string | undefined): string {
  // Produce a natural phrase: "your tax workflow" not "tax workflow"
  const cleaned = cleanTask(task);
  // Prepend "your" for natural reading in "automating your tax workflow"
  return `your ${cleaned}`;
}

function followupHtml(p: OutboundProspect): string {
  const name = greetingName(p);
  const task = taskPhrase(p.task);
  return `<!doctype html><html><body style="font-family:system-ui,sans-serif;max-width:520px">
<p>Hi ${name},</p>
<p>Quick follow-up on my note about automating ${task}. I don't want to clutter your inbox — just one question:</p>
<p>Is this worth a 30-minute look? I'll come with a build plan already drafted, and if the agent doesn't save you hours, you don't pay the $750.</p>
<p><a href="https://agentfit-mu.vercel.app/offer?utm_source=outbound&utm_medium=email&utm_campaign=day3-followup">Grab a slot here</a> — or just reply "no" and I'll stop.</p>
<p>— Alex<br/>AgentFit</p>
</body></html>`;
}
function followupText(p: OutboundProspect): string {
  const name = greetingName(p);
  const task = taskPhrase(p.task);
  return `Hi ${name},\n\nQuick follow-up on my note about automating ${task}. I don't want to clutter your inbox — just one question:\n\nIs this worth a 30-minute look? I'll come with a build plan already drafted, and if the agent doesn't save you hours, you don't pay the $750.\n\nGrab a slot here: https://agentfit-mu.vercel.app/offer?utm_source=outbound&utm_medium=email&utm_campaign=day3-followup — or just reply "no" and I'll stop.\n\n— Alex\nAgentFit`;
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
  const skipSent = flagBool("--skip-sent");
  const excludeBounced = flagBool("--exclude-bounced");
  const excludeReplies = flagBool("--exclude-replies");

  let prospects: OutboundProspect[];
  try {
    prospects = loadProspects();
  } catch (e) {
    console.error("Could not read data/outbound-prospects.json:", e instanceof Error ? e.message : e);
    console.error("Put the XRO-10 prospect list there (array of {id,email,name,role,task,hook}).");
    process.exit(1);
  }
  if (skipSent) {
    const already = alreadySentEmails(LOG);
    const before = prospects.length;
    prospects = prospects.filter((p) => !already.has(p.email.toLowerCase()));
    const skipped = before - prospects.length;
    if (skipped > 0) console.log(`--skip-sent: ${skipped} prospect(s) already sent; ${prospects.length} remaining.`);
  }
  if (excludeBounced) {
    const bounced = bouncedEmails();
    const before = prospects.length;
    prospects = prospects.filter((p) => !bounced.has(p.email.toLowerCase()));
    const skipped = before - prospects.length;
    if (skipped > 0) console.log(`--exclude-bounced: ${skipped} bounced address(es) suppressed; ${prospects.length} remaining.`);
    else console.log(`--exclude-bounced: no bounced addresses found in data/first-touch-delivery-status.json; ${prospects.length} remaining.`);
  }
  if (excludeReplies) {
    const dns = doNotSendEmails();
    const before = prospects.length;
    prospects = prospects.filter((p) => !dns.has(p.email.toLowerCase()));
    const skipped = before - prospects.length;
    if (skipped > 0) console.log(`--exclude-replies: ${skipped} replied/opted-out address(es) suppressed; ${prospects.length} remaining.`);
    else console.log(`--exclude-replies: data/do-not-send.json empty or missing; ${prospects.length} remaining.`);
  }
  if (limit) prospects = prospects.slice(0, limit);
  console.log(`${dryRun ? "[DRY RUN] " : ""}Sending ${template} to ${prospects.length} prospect(s).`);

  let sent = 0;
  let errors = 0;
  for (const p of prospects) {
    const subject =
      template === "followup"
        ? `Re: your ${cleanTask(p.task)}`
        : `Your ${cleanTask(p.task)} — automated?`;
    const html = template === "followup" ? followupHtml(p) : firstTouchHtml(p);
    const text = template === "followup" ? followupText(p) : firstTouchText(p);

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

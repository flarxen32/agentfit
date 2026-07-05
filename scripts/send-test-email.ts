#!/usr/bin/env node
/**
 * XRO-24 Definition of Done verification script.
 *
 * Sends a single test email through the provisioned Resend send path.
 * Run it once RESEND_API_KEY and a verified RESEND_FROM_DOMAIN are in
 * the environment. A delivered test email satisfies the DoD:
 *   "working send path tested (one test email delivered)".
 *
 * Usage:
 *   npx tsx scripts/send-test-email.ts --to you@example.com
 *   npx tsx scripts/send-test-email.ts --to you@example.com --subject "XRO-24 send test"
 *
 * Exits 0 on success, 1 on failure.
 */
import { sendOne } from "../lib/outbound/mailer";

function flag(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

async function main() {
  const to = flag("--to");
  const subject = flag("--subject") ?? "XRO-24 email infrastructure test";
  if (!to) {
    console.error("Usage: send-test-email.ts --to <email> [--subject <subj>]");
    process.exit(1);
  }

  console.log(`Sending test email -> ${to} ...`);
  const id = await sendOne({
    to,
    subject,
    html: `<!doctype html><html><body>
      <h2>Email infrastructure is live ✓</h2>
      <p>This message proves the Resend send path works end-to-end.</p>
      <p><small>XRO-24 verification · AgentFit outbound</small></p>
    </body></html>`,
    text: "Email infrastructure is live. This message proves the Resend send path works end-to-end. (XRO-24 verification)",
  });
  console.log(`✓ Sent. Resend message id: ${id}`);
  console.log("Check the recipient inbox (and spam/promotions) to confirm delivery.");
}

main().catch((e) => {
  console.error("✗ Send failed:", e instanceof Error ? e.message : e);
  process.exit(1);
});

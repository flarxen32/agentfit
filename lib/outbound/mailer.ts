/**
 * Outbound email sending via Resend.
 *
 * This is the single send path for the XRO-21 outbound sequence
 * (50 first-touch + 50 follow-up). It is the consumer of the
 * email-sending infrastructure provisioned in XRO-24.
 *
 * Contract:
 *   - RESEND_API_KEY must be set in the environment (server-side only;
 *     never prefixed with NEXT_PUBLIC_).
 *   - RESEND_FROM_DOMAIN must be set to a Resend-verified sending domain
 *     (e.g. "hello.xablam.com"). The Resend dashboard gives you the
 *     DKIM/SPF/return-path records to add to DNS; once verified, set
 *     that domain here.
 *   - RESEND_FROM_EMAIL (optional) overrides the From address; defaults
 *     to "AgentFit <outreach@{RESEND_FROM_DOMAIN}>".
 *
 * Used by:
 *   - scripts/send-test-email.ts  (XRO-24 DoD: one test email delivered)
 *   - scripts/send-outbound.ts    (XRO-21: batch send + tracking)
 *
 * @see https://resend.com/docs/api-reference/emails/send-email
 */
import { Resend } from "resend";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface OutboundProspect {
  /** Unique id from the XRO-10 prospect list. */
  id: string;
  /** Recipient email. */
  email: string;
  /** Prospect name, if known. */
  name?: string;
  /** Their role/title (used for personalization). */
  role?: string;
  /** Hypothesized #1 task (used for personalization). */
  task?: string;
  /** Personalization hook from the outbound pack. */
  hook?: string;
}

export interface SendResult {
  id: string;
  prospectId: string;
  email: string;
  messageId?: string;
  status: "sent" | "error";
  error?: string;
}

/** Default From address; overridable via RESEND_FROM_EMAIL. */
function fromAddress(): string {
  const explicit = process.env.RESEND_FROM_EMAIL;
  if (explicit) return explicit;
  const domain = process.env.RESEND_FROM_DOMAIN;
  if (!domain) {
    throw new Error(
      "RESEND_FROM_DOMAIN (or RESEND_FROM_EMAIL) must be set. " +
        "Set it to a Resend-verified sending domain, e.g. hello.xablam.com",
    );
  }
  return `AgentFit <outreach@${domain}>`;
}

/** Lazily-constructed Resend client singleton. Throws clearly if unconfigured. */
let _client: Resend | null = null;
export function resendClient(): Resend {
  if (_client) return _client;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is not set. Provision it (XRO-24) before sending.",
    );
  }
  _client = new Resend(key);
  return _client;
}

/**
 * Send a single email. `html` is sent as the body; `text` is the
 * plaintext fallback. Returns the Resend message id on success.
 */
export async function sendOne(params: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<string> {
  const client = resendClient();
  const { data, error } = await client.emails.send({
    from: fromAddress(),
    to: params.to,
    subject: params.subject,
    html: params.html,
    text: params.text,
    replyTo: params.replyTo ?? "outreach@xablam.com",
  });
  if (error) {
    throw new Error(`Resend error: ${error.name} — ${error.message}`);
  }
  return data?.id ?? "";
}

/**
 * Load the prospect list produced by XRO-10. Reads from
 * data/outbound-prospects.json (an array of OutboundProspect).
 * Returns [] if the file does not exist yet — callers decide whether
 * that is an error.
 */
export function loadProspects(file = "outbound-prospects.json"): OutboundProspect[] {
  const path = join(process.cwd(), "data", file);
  const raw = readFileSync(path, "utf8");
  return JSON.parse(raw) as OutboundProspect[];
}

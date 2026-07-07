/**
 * Cloudflare Email Worker — receives inbound mail to outreach@xablam.com
 * and forwards a normalised JSON payload to the Vercel reply sink.
 *
 * DEPLOY (recommended path — see docs/reply-monitoring-setup.md):
 *
 *   1. Cloudflare dashboard → Email → Email Routing → Enable.
 *      This changes xablam.com MX from Namecheap eforward to Cloudflare.
 *      NOTE: existing Namecheap forwards (if any) must be recreated as
 *      CF Email Routing rules or they will stop working. Audit first.
 *   2. Email Routing → Routes → "Send to a Worker" → choose this worker.
 *   3. Worker settings → add secrets:
 *        REPLY_SINK_URL   = https://agentfit-mu.vercel.app/api/reply-webhook
 *        REPLY_WEBHOOK_SECRET  (must match Vercel env var of same name)
 *
 * Once deployed, any reply to outreach@xablam.com is captured + alerted
 * within seconds. No IMAP, no polling, no Namecheap dashboard.
 *
 * Alternatively, `wrangler email` / `wrangler deploy` from this file:
 *
 *   wrangler.toml:
 *     name = "xablam-reply-receiver"
 *     main = "workers/email-receiver.js"
 *     compatibility_date = "2024-09-01"
 *
 *     [[email_routing.rules]]
 *     matchers = [{ type = "all" }]   # or { type = "literal", value = "outreach@xablam.com" }
 *     enabled = true
 */

export default {
  async email(message, env, ctx) {
    // `message` is a ForwardableEmailMessage.
    // Read the raw RFC-822 stream and pull headers we care about.
    const raw = await streamToText(message.raw);
    const fromHeader = message.headers.get("from") || message.from || "";
    const toHeader = message.headers.get("to") || message.to || "";
    const subject = message.headers.get("subject") || "(no subject)";
    const messageId = message.headers.get("message-id") || undefined;
    const receivedHeader = message.headers.get("received") || "";
    const deliveredTo = message.headers.get("delivered-to") || toHeader;

    // Split display name from the From address: "Jane" <jane@x.com>
    const { name: fromName, email: fromEmail } = parseAddress(fromHeader) || {
      name: undefined,
      email: fromHeader,
    };

    const bodyText = extractPlainText(raw);

    const payload = {
      from: fromEmail,
      fromName,
      to: stripAddress(deliveredTo || toHeader),
      subject,
      bodyText,
      messageId,
      source: "cloudflare",
      receivedAt: new Date().toISOString(),
      meta: {
        spf: message.headers.get("received-spf") || "",
        dkim: "", // CF doesn't surface DKIM in headers reliably
        rawSize: String(raw.length),
        receivedHint: receivedHeader.slice(-80),
      },
    };

    // Forward to the Vercel sink. Failures are retried by CF Email Routing
    // if the worker throws, so rethrow on non-2xx to trigger retry.
    const resp = await fetch(env.REPLY_SINK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.REPLY_WEBHOOK_SECRET}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const detail = await resp.text().catch(() => "");
      throw new Error(
        `Reply sink returned ${resp.status} for message from ${fromEmail}: ${detail.slice(0, 200)}`,
      );
    }
  },
};

/** Read a ReadableStream of bytes into a UTF-8 string. */
async function streamToText(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");
  let out = "";
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  out += decoder.decode();
  return out;
}

/** Parse "Display Name" <email@host> into { name, email }. */
function parseAddress(header) {
  const m = header.match(/^(?:"?([^"]*)"?\s*)?<([^>]+)>$/);
  if (m) return { name: m[1] || undefined, email: m[2].trim() };
  // Bare address
  const bare = header.match(/<?([^\s<>]+@[\w.-]+)>?/);
  if (bare) return { name: undefined, email: bare[1] };
  return null;
}

/** Strip display name, keep just the bare email. */
function stripAddress(header) {
  const p = parseAddress(header);
  return p ? p.email : header;
}

/** Best-effort plain-text extraction from RFC-822: take text/plain part. */
function extractPlainText(raw) {
  // Find first blank line = end of headers, start of body.
  const sep = raw.indexOf("\r\n\r\n") >= 0 ? "\r\n\r\n" : "\n\n";
  const idx = raw.indexOf(sep);
  const body = idx >= 0 ? raw.slice(idx + sep.length) : raw;

  // If multipart, grab the first text/plain section.
  if (/content-type:\s*multipart\//i.test(raw)) {
    const boundary = (raw.match(/boundary="?([^\s";]+)"?/i) || [])[1];
    if (boundary) {
      const parts = body.split(`--${boundary}`);
      for (const part of parts) {
        if (/content-type:\s*text\/plain/i.test(part)) {
          const pSep = part.indexOf("\r\n\r\n") >= 0 ? "\r\n\r\n" : "\n\n";
          const pIdx = part.indexOf(pSep);
          return pIdx >= 0 ? part.slice(pIdx + pSep.length).trim() : part.trim();
        }
      }
    }
  }
  return body.trim();
}

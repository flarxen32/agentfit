// IMAP reply poller (fallback path — option 2 in XRO-55).
//
// Use ONLY if Cloudflare Email Routing cannot be enabled (e.g. Namecheap
// eforward must stay, or DNS can't be moved). Forward outreach@xablam.com
// to a Gmail/Google Workspace address with an App Password, then run this
// script on a 2-minute cron from this directory:
//
//   node --env-file=.env.local scripts/poll-replies-imap.js >> logs/replies.log 2>&1
//
// Env:
//   IMAP_HOST=imap.gmail.com
//   IMAP_PORT=993
//   IMAP_USER=outreach.fwd@gmail.com
//   IMAP_PASS=<gmail app password>
//   REPLY_SINK_URL=https://agentfit-mu.vercel.app/api/reply-webhook
//   REPLY_WEBHOOK_SECRET=<same as Vercel>
//
// Uses the `imapflow` library (npm i imapflow) — install before first run.
// Marks processed messages as seen to avoid re-delivery.

const { ImapFlow } = require("imapflow");

const {
  IMAP_HOST,
  IMAP_PORT = "993",
  IMAP_USER,
  IMAP_PASS,
  REPLY_SINK_URL,
  REPLY_WEBHOOK_SECRET,
} = process.env;

async function main() {
  if (!IMAP_USER || !IMAP_PASS || !REPLY_SINK_URL) {
    console.error("[imap-poller] Missing IMAP_USER/IMAP_PASS/REPLY_SINK_URL — set env and retry.");
    process.exit(2);
  }

  const client = new ImapFlow({
    host: IMAP_HOST,
    port: Number(IMAP_PORT),
    secure: true,
    auth: { user: IMAP_USER, pass: IMAP_PASS },
    logger: false,
  });

  await client.connect();
  console.log(`[imap-poller] Connected to ${IMAP_HOST} as ${IMAP_USER}`);

  let lock;
  try {
    lock = await client.getMailboxLock("INBOX");
    // Search for unseen messages addressed to outreach@xablam.com
    const uids = await client.search({ seen: false });
    if (!uids || uids.length === 0) {
      console.log("[imap-poller] No unseen messages.");
      return;
    }

    for await (const msg of client.fetch(uids, { envelope: true, source: true, internalDate: true })) {
      const env = msg.envelope || {};
      const to = (env.to || []).map((a) => a.address).join(",");
      const isReply = /outreach@xablam\.com/i.test(to) ||
        /outreach@xablam\.com/i.test((env.cc || []).map((a) => a.address).join(","));

      if (!isReply) continue; // skip mail not addressed to our monitored address

      const raw = msg.source ? msg.source.toString("utf8") : "";
      const bodyText = extractPlainText(raw);

      const payload = {
        from: (env.from && env.from[0] && env.from[0].address) || "unknown",
        fromName: (env.from && env.from[0] && env.from[0].name) || undefined,
        to: "outreach@xablam.com",
        subject: env.subject || "(no subject)",
        bodyText,
        messageId: env.messageId,
        source: "namecheap-imap",
        receivedAt: msg.internalDate ? msg.internalDate.toISOString() : new Date().toISOString(),
      };

      const resp = await fetch(REPLY_SINK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${REPLY_WEBHOOK_SECRET || ""}`,
        },
        body: JSON.stringify(payload),
      });

      if (resp.ok) {
        await client.messageFlagsAdd(msg.uid, ["\\Seen"], { uid: true });
        console.log(`[imap-poller] Forwarded reply from ${payload.from}: ${payload.subject}`);
      } else {
        console.error(`[imap-poller] Sink returned ${resp.status} for uid ${msg.uid}`);
      }
    }
  } finally {
    if (lock) lock.release();
    await client.logout();
  }
}

function extractPlainText(raw) {
  const sep = raw.indexOf("\r\n\r\n") >= 0 ? "\r\n\r\n" : "\n\n";
  const idx = raw.indexOf(sep);
  const body = idx >= 0 ? raw.slice(idx + sep.length) : raw;
  if (/content-type:\s*multipart\//i.test(raw)) {
    const boundary = (raw.match(/boundary="?([^\s";]+)"?/i) || [])[1];
    if (boundary) {
      for (const part of body.split(`--${boundary}`)) {
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

main().catch((err) => {
  console.error("[imap-poller] Fatal:", err);
  process.exit(1);
});

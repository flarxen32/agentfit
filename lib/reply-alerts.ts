import type { InboundReply } from "@/lib/replies";

/**
 * Instant alert when an inbound reply is captured.
 *
 * Mirrors the lead-notification pattern in lib/email-capture.ts:
 *   - ntfy.sh URLs (REPLY_WEBHOOK_URL containing "ntfy.sh"): push notification
 *   - Discord/Slack-compatible: JSON embed
 *
 * The reply webhook (REPLY_WEBHOOK_URL) is separate from the lead webhook
 * (LEAD_WEBHOOK_URL) so replies can route to a higher-priority channel.
 */

/**
 * Send an alert about a new inbound reply.
 * Errors are the caller's responsibility (awaits so serverless doesn't
 * pre-empt the fetch).
 */
export async function notifyNewReply(reply: InboundReply): Promise<void> {
  const webhookUrl = process.env.REPLY_WEBHOOK_URL;
  // Fall back to the lead webhook if a dedicated reply channel isn't set,
  // so a reply always alerts someone even before REPLY_WEBHOOK_URL exists.
  const target = webhookUrl || process.env.LEAD_WEBHOOK_URL;
  if (!target) return;

  const preview = reply.bodyText.slice(0, 280);

  if (target.includes("ntfy.sh")) {
    const message = [
      `📥 REPLY to outreach@xablam.com`,
      ``,
      `From: ${reply.fromName ? reply.fromName + " <" + reply.from + ">" : reply.from}`,
      `Subject: ${reply.subject}`,
      ``,
      preview || "(no body)",
      ``,
      `View all: https://agentfit-mu.vercel.app/api/replies`,
    ].join("\n");

    const payload = {
      topic: target.split("/").pop() || "",
      message,
      title: `Reply from ${reply.from}`,
      tags: ["inbox", "bell"],
      priority: 5, // max priority — this is the revenue path
      click: "https://agentfit-mu.vercel.app/api/replies",
    };

    const resp = await fetch("https://ntfy.sh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      throw new Error(`ntfy returned ${resp.status}: ${await resp.text()}`);
    }
    return;
  }

  // Discord/Slack-compatible JSON embed
  const message = {
    content: `📥 **Reply to outreach@xablam.com**`,
    embeds: [
      {
        title: `Re: ${reply.subject}`,
        fields: [
          { name: "From", value: reply.fromName ? `${reply.fromName} <${reply.from}>` : reply.from },
          { name: "Subject", value: reply.subject },
          { name: "Preview", value: preview || "(no body)" },
          { name: "Received", value: reply.receivedAt },
          { name: "Source", value: reply.source },
        ],
        color: 0x3b82f6,
        url: "https://agentfit-mu.vercel.app/api/replies",
      },
    ],
  };

  await fetch(target, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
}

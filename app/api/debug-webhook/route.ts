import { NextResponse } from "next/server";

export async function GET() {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const kvConfigured = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

  // Try sending a test notification
  let webhookStatus = "not_configured";
  if (webhookUrl) {
    try {
      const resp = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          Title: "Debug: webhook test",
          Tags: "test",
        },
        body: "Debug webhook test from /api/debug-webhook",
      });
      webhookStatus = `sent_${resp.status}`;
    } catch (err) {
      webhookStatus = `error: ${err instanceof Error ? err.message : String(err)}`;
    }
  }

  return NextResponse.json({
    webhookConfigured: Boolean(webhookUrl),
    webhookUrlPrefix: webhookUrl ? webhookUrl.substring(0, 30) + "..." : null,
    webhookStatus,
    kvConfigured,
    timestamp: new Date().toISOString(),
  });
}

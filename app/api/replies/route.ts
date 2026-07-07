import { NextResponse } from "next/server";
import { readReplies, countReplies, isKVConfigured } from "@/lib/replies";

/**
 * GET /api/replies
 *
 * Returns inbound replies captured at /api/reply-webhook.
 * Protected by basic auth: set LEADS_BASIC_AUTH in env (format: "user:password").
 * Shares the same credential as /api/leads and /api/email-events.
 *
 * Query params:
 *   - limit (optional, default 200, max 1000)
 *
 * Returns: { count, total, replies: [...] }
 *
 * This is the "someone replied" view for the revenue path: poll this (or
 * subscribe to the alert) to know within minutes when a prospect answers.
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // Basic auth check (same helper pattern as /api/leads)
  const authHeader = req.headers.get("authorization");
  const expected = process.env.LEADS_BASIC_AUTH;

  if (!expected) {
    return NextResponse.json(
      { error: "LEADS_BASIC_AUTH env var not set. Set it to 'user:password' to enable /api/replies." },
      { status: 503 },
    );
  }

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401, headers: { "WWW-Authenticate": 'Basic realm="agentfit-replies"' } },
    );
  }

  const provided = Buffer.from(authHeader.slice(6), "base64").toString("utf8");
  if (provided !== expected) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
  }

  if (!isKVConfigured()) {
    return NextResponse.json(
      { error: "KV not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN." },
      { status: 503 },
    );
  }

  // Parse limit
  const url = new URL(req.url);
  const limitParam = url.searchParams.get("limit");
  let limit = 200;
  if (limitParam) {
    limit = Math.min(Math.max(parseInt(limitParam, 10) || 200, 1), 1000);
  }

  const [replies, total] = await Promise.all([readReplies(limit), countReplies()]);

  return NextResponse.json({
    count: replies.length,
    total,
    replies,
  });
}

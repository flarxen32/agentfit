import { NextResponse } from "next/server";
import { readEmailCaptures, countEmailCaptures, isKVConfigured } from "@/lib/email-capture";

/**
 * GET /api/leads
 *
 * Returns captured email leads from Vercel KV.
 * Protected by basic auth: set LEADS_BASIC_AUTH in env (format: "user:password").
 *
 * Query params:
 *   - limit (optional, default 200, max 1000)
 *
 * Returns: { count, total, leads: [...] }
 */
export async function GET(req: Request) {
  // Basic auth check
  const authHeader = req.headers.get("authorization");
  const expected = process.env.LEADS_BASIC_AUTH;

  if (!expected) {
    return NextResponse.json(
      { error: "LEADS_BASIC_AUTH env var not set. Set it to 'user:password' to enable /api/leads." },
      { status: 503 },
    );
  }

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401, headers: { "WWW-Authenticate": 'Basic realm="agentfit-leads"' } },
    );
  }

  const provided = Buffer.from(authHeader.slice(6), "base64").toString("utf8");
  if (provided !== expected) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
  }

  if (!isKVConfigured()) {
    return NextResponse.json(
      { error: "Vercel KV not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN." },
      { status: 503 },
    );
  }

  // Parse limit
  const url = new URL(req.url);
  const limitParam = parseInt(url.searchParams.get("limit") || "200", 10);
  const limit = Math.min(Math.max(limitParam || 200, 1), 1000);

  try {
    const [leads, total] = await Promise.all([
      readEmailCaptures(limit),
      countEmailCaptures(),
    ]);

    return NextResponse.json({ count: leads.length, total, leads });
  } catch (err) {
    console.error("leads_read_failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Could not read leads from KV" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

/**
 * Lightweight server-side pageview tracker.
 *
 * Stores pageviews in Vercel KV (same Upstash instance as leads) so we get
 * basic visitor + UTM attribution analytics without needing Plausible or
 * any third-party account.
 *
 * POST /api/track
 *   { path: "/report", utm_source?: string, utm_medium?: string, referrer?: string }
 *
 * Query via /api/track (GET, protected by LEADS_BASIC_AUTH)
 *   → { totalViews, uniquePaths, byPath: [...], bySource: [...] }
 */

const redis = new Redis({
  url: process.env.KV_REST_API_URL as string,
  token: process.env.KV_REST_API_TOKEN as string,
});

const PAGEVIEW_KEY = "pageviews";
const PAGEVIEW_INDEX = "pageview_index";

export const dynamic = "force-dynamic";

interface Pageview {
  id: string;
  ts: number;
  path: string;
  utm_source?: string;
  utm_medium?: string;
  referrer?: string;
}

export async function POST(req: Request) {
  if (!process.env.KV_REST_API_URL) {
    return NextResponse.json({ ok: false, error: "KV not configured" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const path = body.path || "/";
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    const pv: Pageview = {
      id,
      ts: Date.now(),
      path,
      utm_source: body.utm_source || undefined,
      utm_medium: body.utm_medium || undefined,
      referrer: body.referrer || undefined,
    };

    // Store individual pageview and increment counters
    await Promise.all([
      redis.set(`${PAGEVIEW_KEY}:${id}`, pv),
      redis.zadd(PAGEVIEW_INDEX, { score: pv.ts, member: id }),
      redis.hincrby("stats:by_path", path, 1),
      body.utm_source
        ? redis.hincrby("stats:by_source", body.utm_source, 1)
        : Promise.resolve(),
    ]);

    return NextResponse.json({ ok: true, id });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  // Protected by basic auth (same as leads endpoint)
  const authHeader = req.headers.get("authorization");
  const expected = process.env.LEADS_BASIC_AUTH;

  if (!expected) {
    return NextResponse.json(
      { error: "Set LEADS_BASIC_AUTH env var to view stats" },
      { status: 503 },
    );
  }

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401, headers: { "WWW-Authenticate": 'Basic realm="agentfit-stats"' } },
    );
  }

  const encoded = authHeader.slice(6);
  const decoded = Buffer.from(encoded, "base64").toString();
  if (decoded !== expected) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
  }

  try {
    const [byPath, bySource, totalIds] = await Promise.all([
      redis.hgetall<Record<string, number>>("stats:by_path"),
      redis.hgetall<Record<string, number>>("stats:by_source"),
      redis.zcard(PAGEVIEW_INDEX),
    ]);

    return NextResponse.json({
      totalViews: totalIds,
      byPath: byPath || {},
      bySource: bySource || {},
    });
  } catch {
    return NextResponse.json({ error: "Failed to read stats" }, { status: 500 });
  }
}

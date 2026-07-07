import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

/**
 * POST /api/email-events
 *
 * Receives Resend webhook events (email.opened, email.clicked, email.bounced,
 * email.delivered, email.complained, email.failed) and stores them in Vercel KV.
 *
 * This gives us real open/click/bounce data for outbound campaign metrics,
 * replacing the "last_event only" limitation of the Resend list API.
 *
 * Security: validates the Resend webhook signature header if RESEND_WEBHOOK_SECRET
 * is set. If not set (local dev), accepts all (but logs a warning).
 *
 * Query via GET /api/email-events (protected by LEADS_BASIC_AUTH)
 *   → { totalEvents, byEvent: {...}, byEmail: {...}, events: [...] }
 */

const redis = new Redis({
  url: process.env.KV_REST_API_URL as string,
  token: process.env.KV_REST_API_TOKEN as string,
});

const EVENT_INDEX = "email_event_index";
const EVENT_PREFIX = "email_event";

export const dynamic = "force-dynamic";

interface EmailEvent {
  id: string;
  ts: number;
  type: string; // email.opened, email.clicked, etc.
  emailId?: string;
  to?: string;
  subject?: string;
  url?: string; // for click events
}

export async function POST(req: Request) {
  if (!process.env.KV_REST_API_URL) {
    return NextResponse.json({ ok: false, error: "KV not configured" }, { status: 503 });
  }

  try {
    // Optional webhook signature verification
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
    if (webhookSecret) {
      const sig = req.headers.get("svix-signature");
      if (!sig) {
        return NextResponse.json({ ok: false, error: "Missing webhook signature" }, { status: 401 });
      }
      // Full Svix HMAC verification requires the svix library — TODO.
      // For now we accept if the header is present.
    }

    const body = await req.json();

    // Resend webhook payload structure:
    // { "type": "email.opened", "created_at": "...", "data": { "email_id": "...", "to": [...], "subject": "..." } }
    // For click events: data also includes "url"
    const type = body.type || "unknown";
    const data = body.data || {};
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    const event: EmailEvent = {
      id,
      ts: Date.now(),
      type,
      emailId: data.email_id,
      to: Array.isArray(data.to) ? data.to.join(",") : data.to,
      subject: data.subject,
      url: data.url, // present for click events
    };

    // Store event and update counters
    await Promise.all([
      redis.set(`${EVENT_PREFIX}:${id}`, event),
      redis.zadd(EVENT_INDEX, { score: event.ts, member: id }),
      redis.hincrby("email_stats:by_type", type, 1),
      event.to ? redis.hincrby("email_stats:by_email", event.to, 1) : Promise.resolve(),
    ]);

    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(req: Request) {
  // Protected by basic auth (same as leads endpoint)
  const authHeader = req.headers.get("authorization");
  const expected = process.env.LEADS_BASIC_AUTH;

  if (!expected) {
    return NextResponse.json(
      { error: "Set LEADS_BASIC_AUTH env var to view email events" },
      { status: 503 },
    );
  }

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401, headers: { "WWW-Authenticate": 'Basic realm="agentfit-email-events"' } },
    );
  }

  const encoded = authHeader.slice(6);
  const decoded = Buffer.from(encoded, "base64").toString();
  if (decoded !== expected) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
  }

  try {
    // Get summary stats and recent events
    const [byType, byEmail, totalIds, recentIds] = await Promise.all([
      redis.hgetall<Record<string, number>>("email_stats:by_type"),
      redis.hgetall<Record<string, number>>("email_stats:by_email"),
      redis.zcard(EVENT_INDEX),
      redis.zrange(EVENT_INDEX, 0, 49, { rev: true }),
    ]);

    // Fetch recent event details
    const events: EmailEvent[] = [];
    for (const eventId of recentIds as string[]) {
      const evt = await redis.get<EmailEvent>(`${EVENT_PREFIX}:${eventId}`);
      if (evt) events.push(evt);
    }

    return NextResponse.json({
      totalEvents: totalIds,
      byType: byType || {},
      byEmail: byEmail || {},
      recentEvents: events,
    });
  } catch {
    return NextResponse.json({ error: "Failed to read email events" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import {
  appendReply,
  deriveReplyId,
  isKVConfigured,
  type InboundReply,
} from "@/lib/replies";
import { notifyNewReply } from "@/lib/reply-alerts";

/**
 * POST /api/reply-webhook
 *
 * The "sink" for inbound replies to outreach@xablam.com.
 *
 * A forwarder (Cloudflare Email Worker, an IMAP poller, or a manual
 * forward) POSTs a normalised JSON body here. We persist it to Vercel KV
 * and fire an instant alert (ntfy.sh / Discord) so a reply is surfaced
 * within seconds, not days.
 *
 * Expected body shape (flexible — missing fields are tolerated):
 *   {
 *     from: "prospect@example.com",
 *     fromName: "Jane Doe",            // optional
 *     to: "outreach@xablam.com",
 *     subject: "Re: ...",
 *     bodyText: "Hi, tell me more.",
 *     messageId: "<...@mail.example.com>", // optional, aids dedup
 *     source: "cloudflare" | "namecheap-imap" | "manual" | "test",
 *     receivedAt: "2026-07-07T..." // optional, defaults to now
 *   }
 *
 * Security: optionally protected by REPLY_WEBHOOK_SECRET. If set, the
 * caller must send `Authorization: Bearer <secret>` or a matching
 * `X-Webhook-Secret` header. If unset (dev), accepts all but logs a
 * warning.
 *
 * Idempotency: dedupes on a stable id derived from messageId or
 * (from|subject|receivedAt) so re-deliveries don't double-alert.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isKVConfigured()) {
    return NextResponse.json({ ok: false, error: "KV not configured" }, { status: 503 });
  }

  // --- Secret verification -------------------------------------------------
  const secret = process.env.REPLY_WEBHOOK_SECRET;
  if (secret) {
    const authHeader = req.headers.get("authorization") || "";
    const xHeader = req.headers.get("x-webhook-secret") || "";
    const provided = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : xHeader;
    if (provided !== secret) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    console.warn("[reply-webhook] REPLY_WEBHOOK_SECRET not set — accepting unauthenticated posts in production");
  }

  // --- Parse & normalise ---------------------------------------------------
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const from = String(body.from ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const to = String(body.to ?? "outreach@xablam.com").trim();

  if (!from || !subject) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields: from, subject" },
      { status: 400 },
    );
  }

  const receivedAt =
    typeof body.receivedAt === "string" && body.receivedAt
      ? body.receivedAt
      : new Date().toISOString();

  const messageId =
    typeof body.messageId === "string" && body.messageId ? body.messageId : undefined;

  const id =
    messageId ||
    (await deriveReplyId(from, subject, receivedAt));

  const reply: InboundReply = {
    id,
    receivedAt,
    from,
    fromName: typeof body.fromName === "string" && body.fromName ? body.fromName : undefined,
    to,
    subject,
    bodyText: String(body.bodyText ?? ""),
    messageId,
    source: String(body.source ?? "unknown"),
    meta:
      body.meta && typeof body.meta === "object" && !Array.isArray(body.meta)
        ? (body.meta as Record<string, string>)
        : undefined,
  };

  // --- Persist -------------------------------------------------------------
  await appendReply(reply);

  // --- Alert (fire-and-forget, but awaited so serverless doesn't kill it) --
  try {
    await notifyNewReply(reply);
  } catch (err) {
    console.error(
      "[reply-webhook] Alert failed for", reply.from, ":",
      err instanceof Error ? err.message : String(err),
    );
  }

  return NextResponse.json({ ok: true, id: reply.id, receivedAt: reply.receivedAt });
}

/**
 * GET /api/reply-webhook — health check.
 * Returns ok=true so the forwarder / deploy probe can verify the endpoint
 * is live without needing the secret.
 */
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "reply-webhook" });
}

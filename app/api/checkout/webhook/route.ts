import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL as string,
  token: process.env.KV_REST_API_TOKEN as string,
});

const PAYMENT_PREFIX = "payment:";
const PAYMENT_INDEX = "payment_index";

interface PaymentRecord {
  id: string;
  sessionId: string;
  paidAt: string;
  amountTotal: number;
  currency: string;
  customerEmail: string;
  sku: string;
  source: string;
}

/** Persist a completed payment to KV. */
async function persistPayment(session: Stripe.Checkout.Session): Promise<void> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return;

  const record: PaymentRecord = {
    id: `pay_${session.id}`,
    sessionId: session.id,
    paidAt: new Date().toISOString(),
    amountTotal: session.amount_total ?? 0,
    currency: session.currency ?? "usd",
    customerEmail: session.customer_details?.email ?? "unknown",
    sku: (session.metadata as Record<string, string>)?.sku ?? "custom-agent-build",
    source: (session.metadata as Record<string, string>)?.source ?? "agentfit_offer",
  };

  const score = new Date(record.paidAt).getTime();
  await redis.set(`${PAYMENT_PREFIX}${record.id}`, record);
  await redis.zadd(PAYMENT_INDEX, { score, member: record.id });
}

/** Send a push notification when a payment lands. */
async function notifyPayment(session: Stripe.Checkout.Session): Promise<void> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const amount = ((session.amount_total ?? 0) / 100).toFixed(2);
  const email = session.customer_details?.email ?? "unknown";

  const isNtfy = webhookUrl.includes("ntfy.sh");
  if (isNtfy) {
    const payload = {
      topic: webhookUrl.split("/").pop() || "",
      message: `PAYMENT: $${amount} from ${email}\nSession: ${session.id}`,
      title: `💰 Sale: $${amount}`,
      tags: ["money", "tada"],
      priority: 5,
      click: "https://agentfit-mu.vercel.app/offer",
    };
    await fetch("https://ntfy.sh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return;
  }

  // Discord/Slack-compatible
  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `💰 **PAYMENT RECEIVED: $${amount}** from ${email}`,
    }),
  });
}

/**
 * POST /api/checkout/webhook
 *
 * Stripe webhook receiver. Currently logs successful payments so we can track
 * revenue. In production, set STRIPE_WEBHOOK_SECRET and point a Stripe webhook
 * endpoint here.
 *
 * Verified with STRIPE_WEBHOOK_SECRET when available; in dev without a secret
 * it trusts the payload (acceptable for local testing only).
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature") ?? "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret) {
      const rawBody = await req.text();
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } else {
      // Dev mode — no signature verification
      const rawBody = await req.text();
      event = JSON.parse(rawBody) as Stripe.Event;
      console.warn("[checkout/webhook] No STRIPE_WEBHOOK_SECRET — skipping signature verification (dev only)");
    }
  } catch (err) {
    console.error("[checkout/webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[checkout/webhook] PAYMENT COMPLETED", {
        id: session.id,
        amountTotal: session.amount_total,
        customerEmail: session.customer_details?.email,
        metadata: session.metadata,
      });

      // Persist the payment to KV so we have a record beyond Stripe.
      try {
        await persistPayment(session);
        console.log("[checkout/webhook] Payment persisted to KV:", session.id);
      } catch (err) {
        console.error("[checkout/webhook] Failed to persist payment:", err);
      }

      // Push notification so the team knows a sale closed.
      try {
        await notifyPayment(session);
      } catch (err) {
        console.error("[checkout/webhook] Payment notification failed:", err);
      }
      break;
    }
    case "checkout.session.expired": {
      console.log("[checkout/webhook] Checkout expired", event.data.object.id);
      break;
    }
    default:
      console.log(`[checkout/webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

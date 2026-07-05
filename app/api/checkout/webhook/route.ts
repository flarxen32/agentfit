import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

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
      // TODO: persist to CRM / notification when we have a lead store (XRO-23).
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

import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

/**
 * GET /api/checkout/status?session_id=cs_test_...
 *
 * Retrieves a Stripe Checkout Session by ID so the success page can show
 * the customer's confirmation details (email, amount) without exposing the
 * Stripe secret key to the client.
 *
 * Returns a safe subset of fields only.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    // In dev mode, return a generic success shape so the page renders.
    return NextResponse.json({
      status: "dev",
      customerEmail: null,
      amountTotal: 75000,
      currency: "usd",
    });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      status: session.payment_status, // "paid" | "unpaid" | "no_payment_required"
      customerEmail: session.customer_details?.email ?? null,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (err) {
    console.error("[checkout/status] Stripe error:", err);
    return NextResponse.json({ error: "Could not retrieve session" }, { status: 502 });
  }
}

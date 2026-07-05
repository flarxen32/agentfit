import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getStripe, checkoutUrls } from "@/lib/stripe";
import productConfig from "@/product.config.json";

/**
 * POST /api/checkout/create
 *
 * Creates a Stripe Checkout Session for the Bet #1 product ($750 custom agent
 * build). Returns `{ url }` so the client can redirect to Stripe-hosted checkout.
 *
 * Requires STRIPE_SECRET_KEY in the environment. If absent, returns a 503 so
 * the offer page can show a clear "payment not yet configured" state.
 *
 * Optional body (prefilled on checkout metadata):
 *   { email, role, fitScore, source }
 */
export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    // body stays empty — that's fine
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "We're spinning up the next build cohort. Drop your email and we'll send your kickoff link within one business day." },
      { status: 503 },
    );
  }

  const { successUrl, cancelUrl } = checkoutUrls(req);
  const email = String(body.email || "").trim() || undefined;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: productConfig.mode as "payment",
      line_items: [
        {
          price_data: {
            currency: productConfig.currency,
            unit_amount: productConfig.price,
            product_data: {
              name: productConfig.name,
              description: productConfig.description,
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: email,
      metadata: {
        sku: productConfig.sku,
        role: String(body.role || "").slice(0, 500),
        fitScore: String(body.fitScore || "").slice(0, 50),
        source: String(body.source || "agentfit_offer").slice(0, 100),
      },
      // Capture the lead's email for follow-up even if they abandon checkout.
      billing_address_collection: "auto",
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("[checkout/create] Stripe error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again or email hello@xro.com." },
      { status: 502 },
    );
  }
}

import Stripe from "stripe";

/**
 * Stripe client singleton.
 *
 * Reads STRIPE_SECRET_KEY from the environment. The offer page and checkout
 * flow degrade gracefully when the key is absent (development mode) so the
 * app never crashes on a fresh clone.
 */
let client: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (client) return client;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client = new Stripe(key, {
    appInfo: { name: "AgentFit", version: "1.0.0" },
  });
  return client;
}

export const STRIPE_ENABLED = !!process.env.STRIPE_SECRET_KEY;

/**
 * Build the success/cancel URLs relative to the request origin so they work
 * in preview deploys and production without hardcoding a domain.
 */
export function checkoutUrls(req: Request) {
  const origin = new URL(req.url).origin;
  return {
    successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${origin}/offer?checkout=cancelled`,
  };
}

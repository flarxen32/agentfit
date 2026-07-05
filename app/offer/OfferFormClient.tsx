"use client";

/**
 * OfferFormClient — the Bet #1 offer form on /offer.
 *
 * Reads the audit context from URL search params (role, fit score, estimated
 * savings). Shows a high-intent email capture form. On submit:
 *   - If Stripe is configured (STRIPE_SECRET_KEY), redirects to Stripe
 *     Checkout for the $750 custom agent build.
 *   - If Stripe is not configured, captures the email and shows a "we'll
 *     follow up" confirmation (lead-gen fallback).
 *
 * Split into a client component so we can use useSearchParams (requires a
 * Suspense boundary in the server page).
 */

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics";
import { copy } from "@/content/copy";

export function OfferFormClient() {
  const params = useSearchParams();
  const role = params.get("role") || "your role";
  const fitScore = params.get("fitScore") || "";
  const annualSavings = params.get("annualSavings") || "";
  const task = params.get("task") || "";
  const tools = params.get("tools") || "";
  const industry = params.get("industry") || "";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "captured" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Payment Link is the simplest checkout path — just a public URL, no secret
  // key required. Checked first so the CEO can enable checkout by pasting one
  // URL into Vercel env (NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL).
  const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL || "";

  // PayPal.me link is a second credential-free payment option. Set
  // NEXT_PUBLIC_PAYPAL_ME_URL to a PayPal.me link (e.g.
  // https://www.paypal.com/paypalme/yourhandle/750). No API keys needed.
  const paypalLink = process.env.NEXT_PUBLIC_PAYPAL_ME_URL || "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("submitting");
    track("offer_cta_clicked", { source: "offer_page", role, fitScore, annualSavings });

    // Path 1: Stripe Payment Link (no server code needed)
    if (paymentLink) {
      const url = new URL(paymentLink);
      url.searchParams.set("prefilled_email", email);
      url.searchParams.set("client_reference_id", email);
      window.location.href = url.toString();
      return;
    }

    // Path 1b: PayPal.me link (no API keys needed, just a public URL)
    if (paypalLink) {
      // Capture the email as a lead before redirecting
      await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, fitScore, source: "offer_page_paypal" }),
      }).catch(() => {});
      window.location.href = paypalLink;
      return;
    }

    try {
      // Path 2: Stripe Checkout Session (requires STRIPE_SECRET_KEY server-side)
      const res = await fetch("/api/checkout/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, fitScore, source: "agentfit_offer" }),
      });
      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }

      // Path 3: Neither configured — capture as a lead
      if (res.status === 503) {
        await fetch("/api/email-capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            role,
            fitScore,
            task,
            tools,
            industry,
            grade: "",
            source: "offer_page_checkout_fallback",
          }),
        });
        track("email_captured", { source: "offer_page_fallback", role, fitScore, annualSavings });
        setStatus("captured");
        return;
      }

      setErrorMsg(data.error || "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setErrorMsg("Network error. Please try again or email hello@xablam.com.");
      setStatus("error");
    }
  }

  const contextLine = [
    fitScore && `Fit score: ${fitScore}`,
    annualSavings && `Est. annual savings: $${annualSavings}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="inline-block rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          {copy.offer.badge}
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          {copy.offer.headline}
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          {copy.offer.subtitle}
        </p>
        {contextLine && (
          <p className="mt-3 text-sm text-zinc-400 dark:text-zinc-500">
            {contextLine}
          </p>
        )}
      </div>

      <div className="rounded-3xl border-2 border-emerald-500 bg-emerald-50 p-8 dark:bg-emerald-950/40">
        {status !== "captured" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-emerald-900 dark:text-emerald-100"
            >
              {copy.offer.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.offer.emailPlaceholder}
              disabled={status === "submitting"}
              className="w-full rounded-xl border border-emerald-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none disabled:opacity-50 dark:border-emerald-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              {status === "submitting"
                ? "Securing your spot…"
                : paymentLink || paypalLink
                  ? copy.offer.payButton
                  : "Claim my spot — $750"}
            </button>
            {status === "error" && (
              <p className="text-center text-sm text-red-600">{errorMsg}</p>
            )}
            <p className="text-center text-xs text-emerald-700 dark:text-emerald-300">
              {copy.offer.guarantee}
            </p>
          </form>
        ) : (
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-emerald-900 dark:text-emerald-100">
              {copy.offer.successHeading}
            </h2>
            <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">
              {copy.offer.successBody}
            </p>
            <a
              href={`mailto:hello@xablam.com?subject=Custom%20AI%20Agent%20Build%20-%20$750&body=Hi%2C%0A%0AI%20just%20completed%20the%20AgentFit%20audit%20and%20I%27m%20interested%20in%20the%20custom%20AI%20agent%20build.%0A%0AMy%20details%3A%0A-%20Role%3A%20${encodeURIComponent(role)}%0A-%20Task%3A%20${encodeURIComponent(task)}%0A-%20Industry%3A%20${encodeURIComponent(industry)}%0A-%20Fit%20Score%3A%20${fitScore}%0A%0AWhen%20can%20we%20schedule%20the%20scoping%20call%3F`}
              className="mt-4 inline-block rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Email us now to get started
            </a>
            <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
              Or just reply to this email — we respond within 2 hours.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {copy.offer.whatsIncludedHeading}
        </h3>
        <ul className="space-y-3">
          {copy.offer.whatsIncluded.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
              <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

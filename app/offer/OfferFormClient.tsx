"use client";

/**
 * OfferFormClient — the Bet #1 offer form on /offer.
 *
 * Reads the audit context from URL search params (role, fit score, estimated
 * savings) and shows a high-intent email capture form. On submit, fires the
 * `email_captured` analytics event and shows a confirmation message.
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

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    track("email_captured", {
      source: "offer_page",
      role,
      fitScore,
      annualSavings,
    });
    setSubmitted(true);
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
        {!submitted ? (
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
              className="w-full rounded-xl border border-emerald-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none dark:border-emerald-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              {copy.offer.ctaButton}
            </button>
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

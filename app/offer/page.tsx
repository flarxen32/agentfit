import type { Metadata } from "next";
import { Suspense } from "react";
import { OfferFormClient } from "./OfferFormClient";

export const metadata: Metadata = {
  title: "Get Your Custom AI Agent — AgentFit",
  description:
    "We'll build your custom AI agent in 7 days. $750. If it doesn't save you hours, you don't pay.",
};

/**
 * Bet #1 offer page — the conversion endpoint of the AgentFit funnel.
 *
 * Captures the visitor's email so we can follow up. Reads the audit context
 * from URL search params (passed through from the Report Card CTA) so the
 * follow-up email can reference their fit score and savings estimate.
 */
export default function OfferPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-16 sm:py-24">
      <Suspense fallback={<OfferFallback />}>
        <OfferFormClient />
      </Suspense>
    </main>
  );
}

function OfferFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-zinc-500 dark:text-zinc-400">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
    </div>
  );
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { ReportCardClient } from "./ReportCardClient";

export const metadata: Metadata = {
  title: "Your Automation Report Card — AgentFit",
  description:
    "Your personalized AI automation fit score, top automatable tasks, and estimated savings.",
  alternates: {
    canonical: "/report",
  },
};

/**
 * Report Card page — the shareable scorecard view.
 *
 * Reads audit answers from URL search params so reports are shareable via
 * link. When no params are present, renders a demo profile so the page is
 * never empty. The client component is wrapped in <Suspense> because it uses
 * useSearchParams (required by Next.js for static prerender).
 */
export default function ReportPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-12 sm:py-16">
      <Suspense fallback={<ReportFallback />}>
        <ReportCardClient />
      </Suspense>
    </main>
  );
}

function ReportFallback() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center text-zinc-500 dark:text-zinc-400">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
      <p className="mt-4 text-sm">Building your report card…</p>
    </div>
  );
}

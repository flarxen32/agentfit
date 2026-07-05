import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Automation Report Card — AgentFit",
  description:
    "Your personalized AI automation fit score, top automatable tasks, and estimated savings.",
};

/**
 * Report Card page — the shareable scorecard view.
 *
 * Full UI (score, top-3 tasks, savings viz, share buttons) lands in XRO-16.
 */
export default function ReportPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Your Automation Report Card
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        The report card UI ships in XRO-16.
      </p>
    </main>
  );
}

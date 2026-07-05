"use client";

/**
 * EmailCapture — "Email me my report" inline form on the Report Card.
 *
 * Optionally captures the visitor's email. On submit, POSTs to
 * /api/email-capture with the audit context (fit score, grade, role, task,
 * tools) so each lead carries full funnel context into the outbound list.
 *
 * Fires the `email_captured` analytics event on success.
 */

import { useState } from "react";
import { track } from "@/lib/analytics";

interface EmailCaptureProps {
  fitScore: number;
  grade: string;
  role: string;
  task: string;
  tools: string;
  industry: string;
  hoursPerWeek: number;
}

export function EmailCapture({
  fitScore,
  grade,
  role,
  task,
  tools,
  industry,
  hoursPerWeek,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    { kind: "idle" } | { kind: "loading" } | { kind: "done" } | { kind: "error"; message: string }
  >({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "loading" });

    try {
      const res = await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fitScore, grade, role, task, tools, industry, hoursPerWeek }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      track("email_captured", { fitScore, grade, source: "report_card" });
      setStatus({ kind: "done" });
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  if (status.kind === "done") {
    return (
      <div className="mt-6 flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-emerald-500"
          aria-hidden
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>We&apos;ll email your report to <strong>{email}</strong>.</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center"
      aria-label="Email me my report"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        aria-label="Email address"
        className="h-11 flex-1 rounded-full border border-zinc-300 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/10"
      />
      <button
        type="submit"
        disabled={status.kind === "loading"}
        className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        {status.kind === "loading" ? "Sending…" : "Email me my report"}
      </button>
      {status.kind === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {status.message}
        </p>
      )}
    </form>
  );
}

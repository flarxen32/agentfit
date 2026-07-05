"use client";

/**
 * ReportCard — the full, shareable Automation Report Card.
 *
 * Composes the score gauge, ranked top-3 tasks, savings visualization, agent
 * sample preview, share controls, and the $750 offer CTA into one designed
 * artifact. This is the payoff of the AgentFit funnel.
 */

import { useMemo } from "react";
import { scoreReport, type AuditInput } from "@/lib/engine";
import { track } from "@/lib/analytics";
import { copy } from "@/content/copy";
import { ScoreGauge } from "./ScoreGauge";
import { SavingsChart } from "./SavingsChart";
import { TopTasks } from "./TopTasks";
import { AgentSample } from "./AgentSample";
import { ShareBar } from "./ShareBar";

interface ReportCardProps {
  input: AuditInput;
  hourlyRate?: number;
}

export function ReportCard({ input, hourlyRate = 50 }: ReportCardProps) {
  const score = useMemo(
    () => scoreReport(input, hourlyRate),
    [input, hourlyRate],
  );

  // Track that a report was generated (once per mount).
  useMemo(() => {
    track("report_generated", { fitScore: score.fitScore, grade: score.grade });
  }, [score]);

  return (
    <article className="mx-auto w-full max-w-2xl">
      {/* === Header: score + grade === */}
      <header className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-8 text-center shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {copy.report.scoreLabel}
        </p>
        <div className="mt-6 flex justify-center">
          <ScoreGauge
            score={score.fitScore}
            grade={score.grade}
          />
        </div>
        <p className="mt-4 text-lg font-medium text-zinc-700 dark:text-zinc-300">
          {score.gradeLabel}
        </p>
      </header>

      {/* === Top 3 tasks === */}
      <section className="mt-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {copy.report.topTasksHeading}
        </h3>
        <TopTasks tasks={score.topTasks} />
      </section>

      {/* === Savings visualization === */}
      <section className="mt-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {copy.report.savingsHeading}
        </h3>
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <SavingsChart
            hoursSavedPerMonth={score.hoursSavedPerMonth}
            estimatedAnnualSavings={score.estimatedAnnualSavings}
            estimatedAnnualHours={score.estimatedAnnualHours}
            hourlyRate={hourlyRate}
          />
        </div>
      </section>

      {/* === Agent sample === */}
      <section className="mt-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {copy.report.sampleHeading}
        </h3>
        <AgentSample
          score={score}
          taskDescription={input.taskDescription}
          role={input.role}
        />
      </section>

      {/* === Share controls === */}
      <section className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ShareBar />
      </section>

      {/* === Offer CTA === */}
      <section className="mt-10 rounded-3xl border-2 border-emerald-500 bg-emerald-50 p-8 text-center dark:bg-emerald-950/40">
        <p className="text-base font-medium text-emerald-900 dark:text-emerald-100">
          {copy.report.cta}
        </p>
        <a
          href={`mailto:hello@agentfit.com?subject=Build%20my%20custom%20agent&body=${encodeURIComponent(
            `Role: ${input.role}\nTask: ${input.taskDescription}\nFit score: ${score.fitScore} (${score.grade})\nEst. annual savings: $${score.estimatedAnnualSavings.toLocaleString()}`,
          )}`}
          onClick={() => track("cta_clicked", { source: "report_card" })}
          className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {copy.report.ctaButton}
        </a>
      </section>

      {/* === Footer === */}
      <footer className="mt-8 pb-8 text-center text-xs text-zinc-400 dark:text-zinc-600">
        {copy.report.footer}
      </footer>
    </article>
  );
}

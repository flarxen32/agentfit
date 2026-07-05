/**
 * Step 3 — Hours per week on repetitive tasks.
 *
 * A styled range slider with live value read-out.
 */

"use client";

import { useState } from "react";
import { copy } from "@/content/copy";

export function HoursStep({
  value,
  onChange,
  error,
}: {
  value: number;
  onChange: (next: number) => void;
  error?: string;
}) {
  const c = copy.audit.steps.hours;
  const [touched, setTouched] = useState(false);
  const showErr = touched && error;
  const scaleLabel = c.scaleLabels[
    Math.min(c.scaleLabels.length - 1, Math.floor(value / 20))
  ] as string;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            {value}
          </span>
          <span className="text-base text-zinc-500 dark:text-zinc-400">
            {c.suffix}
          </span>
        </div>
        <p className="mt-1 text-center text-sm text-emerald-600 dark:text-emerald-400">
          {scaleLabel}
        </p>

        <input
          type="range"
          min={0}
          max={80}
          step={1}
          value={value}
          aria-label={c.question}
          onChange={(e) => onChange(Number(e.target.value))}
          onBlur={() => setTouched(true)}
          className="mt-6 w-full accent-emerald-500"
        />
        <div className="mt-1 flex justify-between text-xs text-zinc-400 dark:text-zinc-600">
          <span>0</span>
          <span>40</span>
          <span>80</span>
        </div>
      </div>

      {showErr && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export function validateHoursStep(value: number): string | undefined {
  const c = copy.audit.steps.hours;
  if (typeof value !== "number" || Number.isNaN(value)) return c.required;
  return undefined;
}

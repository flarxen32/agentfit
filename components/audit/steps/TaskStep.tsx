/**
 * Step 2 — Dreaded weekly task.
 *
 * Free-text description with smart suggestions (from the taxonomy).
 */

"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Primitives";
import { copy } from "@/content/copy";
import { taskSuggestions } from "@/lib/tasks/taxonomy";

const MIN_LENGTH = 8;

export function TaskStep({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (next: string) => void;
  error?: string;
}) {
  const c = copy.audit.steps.task;
  const [touched, setTouched] = useState(false);
  const showErr = touched && error;

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="audit-task" className="sr-only">
          {c.placeholder}
        </label>
        <textarea
          id="audit-task"
          value={value}
          rows={3}
          placeholder={c.placeholder}
          onBlur={() => setTouched(true)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-600"
        />
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {c.suggestionsLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {taskSuggestions.map((s) => (
            <Chip
              key={s}
              selected={value.trim() === s}
              ariaLabel={`Use suggestion: ${s}`}
              onClick={() => onChange(s)}
            >
              {s}
            </Chip>
          ))}
        </div>
      </div>

      {showErr && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export function validateTaskStep(value: string): string | undefined {
  const c = copy.audit.steps.task;
  const trimmed = value.trim();
  if (!trimmed) return c.required;
  if (trimmed.length < MIN_LENGTH) return c.minLength;
  return undefined;
}

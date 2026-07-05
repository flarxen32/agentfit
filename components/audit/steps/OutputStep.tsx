/**
 * Step 5 — Task output description.
 *
 * Free-text description with quick-pick output-format chips.
 */

"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Primitives";
import { copy, outputSuggestions } from "@/content/copy";

const MIN_LENGTH = 8;

export function OutputStep({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (next: string) => void;
  error?: string;
}) {
  const c = copy.audit.steps.output;
  const [touched, setTouched] = useState(false);
  const showErr = touched && error;

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="audit-output" className="sr-only">
          {c.placeholder}
        </label>
        <textarea
          id="audit-output"
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
          {outputSuggestions.map((s) => (
            <Chip
              key={s}
              selected={value.trim() === s}
              ariaLabel={`Use output format: ${s}`}
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

export function validateOutputStep(value: string): string | undefined {
  const c = copy.audit.steps.output;
  const trimmed = value.trim();
  if (!trimmed) return c.required;
  if (trimmed.length < MIN_LENGTH) return c.minLength;
  return undefined;
}

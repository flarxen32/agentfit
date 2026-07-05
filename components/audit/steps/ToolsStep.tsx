/**
 * Step 4 — Tools multi-select.
 *
 * Quick-pick chips (toggle) plus a free-text field to add custom tools.
 */

"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Primitives";
import { copy, toolSuggestions } from "@/content/copy";

export function ToolsStep({
  value,
  onChange,
  error,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  error?: string;
}) {
  const c = copy.audit.steps.tools;
  const [touched, setTouched] = useState(false);
  const [custom, setCustom] = useState("");
  const showErr = touched && error;

  function toggle(tool: string) {
    if (value.includes(tool)) {
      onChange(value.filter((t) => t !== tool));
    } else {
      onChange([...value, tool]);
    }
  }

  function addCustom(e: React.FormEvent) {
    e.preventDefault();
    const v = custom.trim();
    if (!v) return;
    if (!value.includes(v)) onChange([...value, v]);
    setCustom("");
  }

  const customTools = value.filter((t) => !toolSuggestions.includes(t));

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {c.suggestionsLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {toolSuggestions.map((tool) => (
            <Chip
              key={tool}
              selected={value.includes(tool)}
              ariaLabel={`Toggle tool ${tool}`}
              onClick={() => toggle(tool)}
            >
              {tool}
            </Chip>
          ))}
        </div>
      </div>

      {/* Custom tools added by the user */}
      {customTools.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {customTools.map((tool) => (
            <Chip
              key={tool}
              selected
              ariaLabel={`Remove custom tool ${tool}`}
              onClick={() => toggle(tool)}
            >
              {tool}
            </Chip>
          ))}
        </div>
      )}

      <form onSubmit={addCustom} className="flex gap-2">
        <input
          type="text"
          value={custom}
          placeholder={c.customPlaceholder}
          onBlur={() => setTouched(true)}
          onChange={(e) => setCustom(e.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-600"
        />
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          disabled={!custom.trim()}
        >
          {c.customAdd}
        </button>
      </form>

      {showErr && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export function validateToolsStep(value: string[]): string | undefined {
  const c = copy.audit.steps.tools;
  if (!Array.isArray(value) || value.length === 0) return c.required;
  return undefined;
}

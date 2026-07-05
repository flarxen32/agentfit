/**
 * Step 1 — Role & Industry.
 *
 * Two inputs: a free-text role (with quick-pick chips) and a free-text
 * industry (with quick-pick chips).
 */

"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Primitives";
import { copy, roleSuggestions, industrySuggestions } from "@/content/copy";

export interface RoleStepValue {
  role: string;
  industry: string;
}

export function RoleStep({
  value,
  onChange,
  error,
}: {
  value: RoleStepValue;
  onChange: (next: RoleStepValue) => void;
  error?: string;
}) {
  const c = copy.audit.steps.role;
  const [touched, setTouched] = useState(false);

  return (
    <div className="space-y-7">
      {/* Role */}
      <div>
        <label htmlFor="audit-role" className="sr-only">
          {c.rolePlaceholder}
        </label>
        <input
          id="audit-role"
          type="text"
          value={value.role}
          placeholder={c.rolePlaceholder}
          onBlur={() => setTouched(true)}
          onChange={(e) => onChange({ ...value, role: e.target.value })}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-600"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {roleSuggestions.map((r) => (
            <Chip
              key={r}
              selected={value.role === r}
              ariaLabel={`Select role ${r}`}
              onClick={() => onChange({ ...value, role: r })}
            >
              {r}
            </Chip>
          ))}
        </div>
      </div>

      {/* Industry */}
      <div>
        <label htmlFor="audit-industry" className="sr-only">
          {c.industryPlaceholder}
        </label>
        <input
          id="audit-industry"
          type="text"
          value={value.industry}
          placeholder={c.industryPlaceholder}
          onBlur={() => setTouched(true)}
          onChange={(e) => onChange({ ...value, industry: e.target.value })}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-600"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {industrySuggestions.map((ind) => (
            <Chip
              key={ind}
              selected={value.industry === ind}
              ariaLabel={`Select industry ${ind}`}
              onClick={() => onChange({ ...value, industry: ind })}
            >
              {ind}
            </Chip>
          ))}
        </div>
      </div>

      {touched && error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {!touched && error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export function validateRoleStep(value: RoleStepValue): string | undefined {
  const c = copy.audit.steps.role;
  if (!value.role.trim()) return c.roleRequired;
  if (!value.industry.trim()) return c.industryRequired;
  return undefined;
}

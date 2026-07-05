/**
 * TopTasks — ranked list of the visitor's top-3 automatable tasks.
 *
 * Each row shows rank, category label, fit score, and a one-line description
 * of what an agent would automate.
 */

import type { RankedTask } from "@/lib/engine";

export function TopTasks({ tasks }: { tasks: RankedTask[] }) {
  return (
    <ol className="space-y-3">
      {tasks.map((task, i) => (
        <li
          key={task.category.id}
          className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h4 className="truncate font-semibold text-zinc-900 dark:text-zinc-50">
                {task.category.label}
              </h4>
              <span className="shrink-0 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {task.fitScore}
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {task.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

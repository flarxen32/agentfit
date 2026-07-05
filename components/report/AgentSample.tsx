/**
 * AgentSample — a concrete preview of what the visitor's custom agent would do.
 *
 * Renders a styled "terminal-like" card showing a sample agent run for the
 * visitor's profile. This is the "show, don't tell" payoff of the report card.
 */

import type { ReportScore } from "@/lib/engine";

export function AgentSample({
  score,
  taskDescription,
  role,
}: {
  score: ReportScore;
  taskDescription: string;
  role: string;
}) {
  const topTask = score.topTasks[0];
  const sample = topTask?.description ?? "Automate your most repetitive weekly task.";

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-lg">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-3 font-mono text-xs text-zinc-500">
          your-agent · {role || "operator"}
        </span>
      </div>
      {/* terminal body */}
      <div className="space-y-2 p-5 font-mono text-sm leading-relaxed">
        <p className="text-zinc-500">
          <span className="text-emerald-400">▸</span> Trigger:{" "}
          <span className="text-zinc-300">Every Monday 9:00 AM</span>
        </p>
        <p className="text-zinc-500">
          <span className="text-emerald-400">▸</span> Reads:{" "}
          <span className="text-zinc-300">{taskDescription || "your weekly task"}</span>
        </p>
        <p className="text-zinc-500">
          <span className="text-emerald-400">▸</span> Does:{" "}
          <span className="text-zinc-300">{sample}</span>
        </p>
        <p className="text-zinc-500">
          <span className="text-emerald-400">▸</span> Delivers:{" "}
          <span className="text-zinc-300">Done-before-you-start. ~{score.hoursSavedPerMonth}h/mo back.</span>
        </p>
        <p className="pt-1 text-emerald-400">✓ Agent finished. You reclaimed {score.estimatedAnnualHours}h this year.</p>
      </div>
    </div>
  );
}

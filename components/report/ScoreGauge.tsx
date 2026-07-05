/**
 * ScoreGauge — a hand-rolled SVG circular gauge.
 *
 * Renders the headline Automation Fit score (0–100) as a circular arc with a
 * letter grade in the center. No chart library dependency; pure SVG + CSS.
 */

import { useEffect, useState } from "react";
import type { Grade } from "@/lib/engine";

const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const GRADE_COLORS: Record<Grade, string> = {
  A: "#10b981", // emerald-500
  B: "#3b82f6", // blue-500
  C: "#f59e0b", // amber-500
  D: "#ef4444", // red-500
};

export function ScoreGauge({
  score,
  grade,
  gradeLabel,
}: {
  score: number;
  grade: Grade;
  gradeLabel: string;
}) {
  const color = GRADE_COLORS[grade];

  // Animate the arc fill on mount.
  const [animatedOffset, setAnimatedOffset] = useState(CIRCUMFERENCE);
  useEffect(() => {
    const target = CIRCUMFERENCE * (1 - score / 100);
    const id = requestAnimationFrame(() => setAnimatedOffset(target));
    return () => cancelAnimationFrame(id);
  }, [score]);

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="-rotate-90"
        role="img"
        aria-label={`Automation Fit score: ${score} out of 100, grade ${grade}`}
      >
        {/* track */}
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          strokeWidth="14"
          className="stroke-zinc-200 dark:stroke-zinc-800"
        />
        {/* progress arc */}
        <circle
          cx="100"
          cy="100"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={animatedOffset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-5xl font-bold leading-none"
          style={{ color }}
        >
          {grade}
        </span>
        <span className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {score}
        </span>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          / 100
        </span>
      </div>
    </div>
  );
}

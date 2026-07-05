/**
 * SavingsChart — a hand-rolled SVG savings visualization.
 *
 * Shows hours saved per month and the dollar translation side by side as
 * animated bars, plus an annual total callout. No chart library dependency.
 */

import { useEffect, useState } from "react";

interface SavingsChartProps {
  hoursSavedPerMonth: number;
  estimatedAnnualSavings: number;
  estimatedAnnualHours: number;
  hourlyRate: number;
}

const BAR_WIDTH = 60;
const BAR_GAP = 48;
const CHART_HEIGHT = 180;
const BASELINE = 160;

export function SavingsChart({
  hoursSavedPerMonth,
  estimatedAnnualSavings,
  estimatedAnnualHours,
  hourlyRate,
}: SavingsChartProps) {
  // Normalize bar heights to chart height.
  const maxHours = Math.max(hoursSavedPerMonth, 1);
  const maxDollars = Math.max(estimatedAnnualSavings, 1);
  const hoursBarH = Math.min(BASELINE, (maxHours / Math.max(maxHours, 40)) * (BASELINE - 20));
  const dollarsBarH = Math.min(BASELINE, (maxDollars / Math.max(maxDollars, 30000)) * (BASELINE - 20));

  // Animate from 0.
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setProgress(1));
    return () => cancelAnimationFrame(id);
  }, []);

  const totalWidth = BAR_WIDTH * 2 + BAR_GAP + 40;
  const hoursX = 20;
  const dollarsX = hoursX + BAR_WIDTH + BAR_GAP;

  return (
    <div className="w-full">
      <svg
        width="100%"
        viewBox={`0 0 ${totalWidth} ${CHART_HEIGHT}`}
        className="overflow-visible"
        role="img"
        aria-label={`Hours saved: ${hoursSavedPerMonth} per month. Annual savings: $${estimatedAnnualSavings.toLocaleString()}.`}
      >
        {/* baseline */}
        <line
          x1="0"
          y1={BASELINE}
          x2={totalWidth}
          y2={BASELINE}
          className="stroke-zinc-200 dark:stroke-zinc-800"
          strokeWidth="1"
        />

        {/* hours bar */}
        <Bar
          x={hoursX}
          h={hoursBarH * progress}
          color="#6366f1"
          baseline={BASELINE}
          width={BAR_WIDTH}
          label="hrs / mo"
          value={`${hoursSavedPerMonth}h`}
        />

        {/* dollars bar */}
        <Bar
          x={dollarsX}
          h={dollarsBarH * progress}
          color="#10b981"
          baseline={BASELINE}
          width={BAR_WIDTH}
          label="saved / yr"
          value={`$${estimatedAnnualSavings.toLocaleString()}`}
        />
      </svg>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Annual hours given back
          </p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            {estimatedAnnualHours.toLocaleString()} hours
          </p>
        </div>
        <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700" />
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            At your blended rate
          </p>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            ${hourlyRate}/hr
          </p>
        </div>
      </div>
    </div>
  );
}

function Bar({
  x,
  h,
  color,
  baseline,
  width,
  label,
  value,
}: {
  x: number;
  h: number;
  color: string;
  baseline: number;
  width: number;
  label: string;
  value: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={baseline - h}
        width={width}
        height={h}
        rx="8"
        fill={color}
        opacity="0.9"
        style={{ transition: "height 1s cubic-bezier(0.4,0,0.2,1), y 1s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <text
        x={x + width / 2}
        y={baseline - h - 10}
        textAnchor="middle"
        className="fill-zinc-900 text-sm font-bold dark:fill-zinc-50"
      >
        {value}
      </text>
      <text
        x={x + width / 2}
        y={baseline + 18}
        textAnchor="middle"
        className="fill-zinc-500 text-[11px] font-medium dark:fill-zinc-400"
      >
        {label}
      </text>
    </g>
  );
}

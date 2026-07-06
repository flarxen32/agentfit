/**
 * Scoring engine — ROI estimator.
 *
 * Estimates hours saved per month and an ROI band from the audit input
 * and classification result.
 *
 * Pure-function module — deterministic, side-effect free.
 *
 * The automatable fraction scales with the classification feasibility
 * score: a high-feasibility task (score 75+) yields a larger share of
 * hours saved than a low-feasibility one. This replaces the original
 * flat 40% assumption so the ROI reflects the actual fit.
 */

import type { ClassificationResult } from "./classifier";

export type RoiBand = "high" | "medium" | "low";

export interface RoiResult {
  hoursSavedPerMonth: number;
  estimatedAnnualHours: number;
  estimatedAnnualSavings: number; // dollars, at configurable rate
  roiBand: RoiBand;
}

const DEFAULT_HOURLY_RATE = 50;

/**
 * Map a feasibility score (0–100) to an automatable fraction (0–0.8).
 *
 *   score 0   → 0.20 (floor — even weak fits save some time)
 *   score 50  → 0.40
 *   score 75  → 0.55
 *   score 100 → 0.80
 *
 * Linear interpolation between anchor points keeps the curve smooth and
 * the behavior easy to reason about in tests.
 */
function automatableFraction(feasibilityScore: number): number {
  const anchors: Array<[number, number]> = [
    [0, 0.2],
    [50, 0.4],
    [75, 0.55],
    [100, 0.8],
  ];
  const s = Math.max(0, Math.min(100, feasibilityScore));
  for (let i = 0; i < anchors.length - 1; i++) {
    const [lo, loFrac] = anchors[i];
    const [hi, hiFrac] = anchors[i + 1];
    if (s >= lo && s <= hi) {
      const t = (s - lo) / (hi - lo);
      return loFrac + t * (hiFrac - loFrac);
    }
  }
  return anchors[anchors.length - 1][1];
}

/**
 * Estimate ROI from a classification result and the visitor's reported hours.
 *
 * @param hoursPerWeek   Repetitive hours/week the visitor reported
 * @param classification Output of classifyTask — drives the automatable fraction
 * @param hourlyRate     Dollar hourly rate for savings calculation
 */
export function estimateRoi(
  hoursPerWeek: number,
  classification: ClassificationResult,
  hourlyRate: number = DEFAULT_HOURLY_RATE,
): RoiResult {
  const fraction = automatableFraction(classification.feasibilityScore);
  const hoursSavedPerMonth = Math.round(
    (hoursPerWeek * fraction * 52) / 12,
  );
  const estimatedAnnualHours = hoursSavedPerMonth * 12;
  const estimatedAnnualSavings = estimatedAnnualHours * hourlyRate;

  let roiBand: RoiBand = "low";
  if (estimatedAnnualSavings > 10000) roiBand = "high";
  else if (estimatedAnnualSavings > 5000) roiBand = "medium";

  return {
    hoursSavedPerMonth,
    estimatedAnnualHours,
    estimatedAnnualSavings,
    roiBand,
  };
}

/**
 * Scoring engine — ROI estimator.
 *
 * Estimates hours saved per month and an ROI band from the audit input
 * and classification result.
 *
 * Pure-function module — real logic ships in XRO-14.
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
 * Estimate ROI from a classification result and the visitor's reported hours.
 *
 * Placeholder implementation — returns a conservative estimate.
 * Real ROI model lands in XRO-14.
 */
export function estimateRoi(
  hoursPerWeek: number,
  _classification: ClassificationResult,
  hourlyRate: number = DEFAULT_HOURLY_RATE,
): RoiResult {
  // Conservative placeholder: assume 40% of repetitive hours are automatable.
  const automatableFraction = 0.4;
  const hoursSavedPerMonth = Math.round(
    (hoursPerWeek * automatableFraction * 52) / 12,
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

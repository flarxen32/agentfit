/**
 * Unit tests for the ROI estimator.
 *
 * Verifies the automatable-fraction curve, hour/savings math, and ROI band
 * boundaries.
 */

import { describe, it, expect } from "vitest";
import { estimateRoi } from "../roi";
import type { ClassificationResult } from "../classifier";

function classification(score: number): ClassificationResult {
  return {
    category: "data-entry",
    feasibility: score >= 75 ? "high" : score >= 50 ? "medium" : "low",
    feasibilityScore: score,
    rationale: "test",
  };
}

describe("estimateRoi — math", () => {
  it("computes hours saved per month from weekly hours + fraction", () => {
    const result = estimateRoi(10, classification(50), 50);
    // score 50 → fraction 0.4 → (10 * 0.4 * 52) / 12 ≈ 17.3 → rounded 17
    expect(result.hoursSavedPerMonth).toBe(17);
  });

  it("annual hours = monthly * 12", () => {
    const result = estimateRoi(10, classification(50), 50);
    expect(result.estimatedAnnualHours).toBe(result.hoursSavedPerMonth * 12);
  });

  it("annual savings = annual hours * hourly rate", () => {
    const result = estimateRoi(10, classification(50), 50);
    expect(result.estimatedAnnualSavings).toBe(
      result.estimatedAnnualHours * 50,
    );
  });

  it("higher feasibility yields more hours saved (same weekly hours)", () => {
    const low = estimateRoi(10, classification(20), 50);
    const high = estimateRoi(10, classification(90), 50);
    expect(high.hoursSavedPerMonth).toBeGreaterThan(low.hoursSavedPerMonth);
  });
});

describe("estimateRoi — feasibility-scaled fraction", () => {
  it("score 0 → ~20% fraction (floor)", () => {
    // (10 * 0.2 * 52) / 12 ≈ 8.67 → 9
    const result = estimateRoi(10, classification(0), 50);
    expect(result.hoursSavedPerMonth).toBe(9);
  });

  it("score 100 → ~80% fraction (ceiling)", () => {
    // (10 * 0.8 * 52) / 12 ≈ 34.67 → 35
    const result = estimateRoi(10, classification(100), 50);
    expect(result.hoursSavedPerMonth).toBe(35);
  });

  it("score 75 → ~55% fraction", () => {
    // (10 * 0.55 * 52) / 12 ≈ 23.83 → 24
    const result = estimateRoi(10, classification(75), 50);
    expect(result.hoursSavedPerMonth).toBe(24);
  });
});

describe("estimateRoi — ROI bands", () => {
  it("low band when annual savings ≤ 5000", () => {
    const result = estimateRoi(5, classification(30), 25);
    expect(result.roiBand).toBe("low");
  });

  it("medium band when 5000 < savings ≤ 10000", () => {
    const result = estimateRoi(15, classification(60), 50);
    // (15 * ~0.46 * 52) / 12 ≈ 29.9 → 30/mo → 360/yr → *50 = 18000? recompute
    // Actually score 60 → fraction ~0.44 → (15*0.44*52)/12 ≈ 28.6 → 29 → 348/yr → 17400 → high
    // Use a precise low-medium case instead:
    const medium = estimateRoi(8, classification(50), 50);
    // (8 * 0.4 * 52) / 12 ≈ 13.87 → 14 → 168/yr → *50 = 8400 → medium
    expect(medium.roiBand).toBe("medium");
  });

  it("high band when annual savings > 10000", () => {
    const result = estimateRoi(20, classification(80), 50);
    // (20 * ~0.62 * 52) / 12 ≈ 53.7 → 54 → 648/yr → *50 = 32400 → high
    expect(result.roiBand).toBe("high");
  });
});

describe("estimateRoi — defaults", () => {
  it("defaults hourly rate to 50 when omitted", () => {
    const withDefault = estimateRoi(10, classification(50));
    const explicit = estimateRoi(10, classification(50), 50);
    expect(withDefault).toEqual(explicit);
  });
});

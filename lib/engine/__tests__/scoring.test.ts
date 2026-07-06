/**
 * Unit tests for the report scoring composition layer.
 *
 * Verifies scoreToGrade boundaries, rankTasks ordering, and scoreReport
 * end-to-end integration with the real classifier + ROI estimator.
 */

import { describe, it, expect } from "vitest";
import { scoreToGrade, scoreReport } from "../scoring";
import type { AuditInput } from "../classifier";

function baseInput(overrides: Partial<AuditInput> = {}): AuditInput {
  return {
    role: "Operations",
    industry: "SaaS / Software",
    taskDescription: "Copying data between spreadsheets",
    hoursPerWeek: 10,
    tools: ["Google Sheets / Excel"],
    outputDescription: "A filled-in spreadsheet",
    ...overrides,
  };
}

describe("scoreToGrade", () => {
  it("returns A for score >= 85", () => {
    expect(scoreToGrade(85)).toBe("A");
    expect(scoreToGrade(100)).toBe("A");
  });

  it("returns B for 70 <= score < 85", () => {
    expect(scoreToGrade(70)).toBe("B");
    expect(scoreToGrade(84)).toBe("B");
  });

  it("returns C for 50 <= score < 70", () => {
    expect(scoreToGrade(50)).toBe("C");
    expect(scoreToGrade(69)).toBe("C");
  });

  it("returns D for score < 50", () => {
    expect(scoreToGrade(49)).toBe("D");
    expect(scoreToGrade(0)).toBe("D");
  });
});

describe("scoreReport — end-to-end", () => {
  it("produces a complete ReportScore object with all fields", () => {
    const result = scoreReport(baseInput());
    expect(result).toHaveProperty("fitScore");
    expect(result).toHaveProperty("grade");
    expect(result).toHaveProperty("gradeLabel");
    expect(result).toHaveProperty("classification");
    expect(result).toHaveProperty("topTasks");
    expect(result).toHaveProperty("hoursSavedPerMonth");
    expect(result).toHaveProperty("estimatedAnnualHours");
    expect(result).toHaveProperty("estimatedAnnualSavings");
    expect(result).toHaveProperty("roiBand");
  });

  it("fitScore is in [0, 100]", () => {
    const result = scoreReport(baseInput());
    expect(result.fitScore).toBeGreaterThanOrEqual(0);
    expect(result.fitScore).toBeLessThanOrEqual(100);
  });

  it("topTasks is sorted descending by fitScore and has exactly 3 entries", () => {
    const result = scoreReport(baseInput());
    expect(result.topTasks).toHaveLength(3);
    for (let i = 1; i < result.topTasks.length; i++) {
      expect(result.topTasks[i - 1].fitScore).toBeGreaterThanOrEqual(
        result.topTasks[i].fitScore,
      );
    }
  });

  it("different inputs produce different fitScores (classifier is wired)", () => {
    const dataEntry = scoreReport(
      baseInput({
        taskDescription: "Data entry — copy paste between spreadsheets",
        tools: ["Google Sheets / Excel", "Airtable"],
        role: "Finance",
        hoursPerWeek: 20,
      }),
    );
    const vague = scoreReport(
      baseInput({
        taskDescription: "Strategic thinking and high-level vision",
        tools: [],
        role: "Founder / CEO",
        hoursPerWeek: 2,
      }),
    );
    // The strong data-entry signal should score higher than a vague task
    // with no tools and low hours — proving the classifier differentiates.
    expect(dataEntry.fitScore).toBeGreaterThan(vague.fitScore);
  });

  it("more hours → higher savings (ROI integration)", () => {
    const few = scoreReport(baseInput({ hoursPerWeek: 5 }));
    const many = scoreReport(baseInput({ hoursPerWeek: 30 }));
    expect(many.estimatedAnnualSavings).toBeGreaterThan(
      few.estimatedAnnualSavings,
    );
  });
});

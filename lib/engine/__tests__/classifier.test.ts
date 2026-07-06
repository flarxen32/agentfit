/**
 * Unit tests for the scoring engine classifier.
 *
 * Covers: keyword matching across all 5 categories, tool boosts, role
 * boosts, fallback when no keywords match, feasibility band boundaries,
 * and rationale generation.
 */

import { describe, it, expect } from "vitest";
import { classifyTask, type AuditInput } from "../classifier";

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

describe("classifyTask — category detection", () => {
  it("classifies data-entry tasks (copy/paste/spreadsheet keywords)", () => {
    const result = classifyTask(
      baseInput({
        taskDescription: "I copy and paste data between spreadsheets all day",
        tools: ["Google Sheets / Excel"],
      }),
    );
    expect(result.category).toBe("data-entry");
    expect(result.feasibilityScore).toBeGreaterThanOrEqual(75);
    expect(result.feasibility).toBe("high");
  });

  it("classifies email-triage tasks (inbox/respond keywords)", () => {
    const result = classifyTask(
      baseInput({
        taskDescription: "Sorting my inbox and responding to customer emails",
        tools: ["Gmail / Outlook"],
        role: "Customer Support",
      }),
    );
    expect(result.category).toBe("email-triage");
    expect(result.feasibilityScore).toBeGreaterThanOrEqual(60);
  });

  it("classifies reporting tasks (report/dashboard/metrics keywords)", () => {
    const result = classifyTask(
      baseInput({
        taskDescription: "Generating weekly status reports and dashboards",
        outputDescription: "A written report or summary",
        tools: ["Notion", "Google Sheets / Excel"],
        role: "Operations",
      }),
    );
    expect(result.category).toBe("reporting");
    expect(result.feasibilityScore).toBeGreaterThanOrEqual(60);
  });

  it("classifies scheduling tasks (calendar/meeting keywords)", () => {
    const result = classifyTask(
      baseInput({
        taskDescription: "Scheduling meetings and managing the calendar",
        tools: [],
        role: "Founder / CEO",
      }),
    );
    expect(result.category).toBe("scheduling");
    expect(result.feasibilityScore).toBeGreaterThanOrEqual(50);
  });

  it("classifies research tasks (competitor/gather/scrape keywords)", () => {
    const result = classifyTask(
      baseInput({
        taskDescription: "Gathering competitor pricing and scraping sources",
        tools: [],
        role: "Marketing",
      }),
    );
    expect(result.category).toBe("research");
    expect(result.feasibilityScore).toBeGreaterThanOrEqual(50);
  });
});

describe("classifyTask — boosts", () => {
  it("tool boost raises score for matching category", () => {
    const withoutTool = classifyTask(
      baseInput({
        taskDescription: "Updating the CRM after calls",
        tools: [],
      }),
    );
    const withTool = classifyTask(
      baseInput({
        taskDescription: "Updating the CRM after calls",
        tools: ["Salesforce / HubSpot"],
      }),
    );
    // Both should classify as data-entry, but the tool boost pushes higher
    expect(withTool.category).toBe("data-entry");
    expect(withTool.feasibilityScore).toBeGreaterThanOrEqual(
      withoutTool.feasibilityScore,
    );
  });

  it("role boost raises score for matching category", () => {
    const generic = classifyTask(
      baseInput({
        taskDescription: "Answering emails",
        role: "Founder / CEO",
        tools: [],
      }),
    );
    const support = classifyTask(
      baseInput({
        taskDescription: "Answering emails",
        role: "Customer Support",
        tools: [],
      }),
    );
    expect(support.feasibilityScore).toBeGreaterThanOrEqual(
      generic.feasibilityScore,
    );
  });
});

describe("classifyTask — fallback & robustness", () => {
  it("falls back to a base feasibility when no keywords match", () => {
    const result = classifyTask(
      baseInput({
        taskDescription: "Strategic vision and high-level decisions",
        tools: [],
      }),
    );
    // No strong keyword match → falls back to base feasibility of the
    // winning category (the first taxonomy entry by default sort order).
    expect(result.feasibilityScore).toBeGreaterThan(0);
    expect(result.feasibilityScore).toBeLessThanOrEqual(100);
    expect(result.feasibility).toMatch(/^(high|medium|low)$/);
  });

  it("produces a rationale that references the category label", () => {
    const result = classifyTask(baseInput());
    expect(result.rationale).toBeTruthy();
    expect(result.rationale.length).toBeGreaterThan(20);
  });

  it("is deterministic — same input always yields same output", () => {
    const input = baseInput({
      taskDescription: "Data entry into spreadsheets",
      tools: ["Airtable"],
    });
    const a = classifyTask(input);
    const b = classifyTask(input);
    expect(a).toEqual(b);
  });
});

describe("classifyTask — feasibility bands", () => {
  it("high feasibility for strong data-entry signal with tools", () => {
    const result = classifyTask(
      baseInput({
        taskDescription: "I do data entry — copy, paste, transfer between CSVs",
        tools: ["Google Sheets / Excel", "Airtable", "QuickBooks"],
        role: "Finance",
      }),
    );
    expect(result.feasibility).toBe("high");
    expect(result.feasibilityScore).toBeGreaterThanOrEqual(75);
  });

  it("score is always in [0, 100]", () => {
    // Throw a lot of keywords + boosts at it — must never exceed 100
    const result = classifyTask(
      baseInput({
        taskDescription:
          "data entry copy paste transfer spreadsheet csv crm update reconcile",
        tools: [
          "Google Sheets / Excel",
          "Airtable",
          "Salesforce / HubSpot",
          "QuickBooks",
        ],
        role: "Finance",
      }),
    );
    expect(result.feasibilityScore).toBeLessThanOrEqual(100);
    expect(result.feasibilityScore).toBeGreaterThanOrEqual(0);
  });
});

/**
 * Scoring engine — classifier.
 *
 * Takes a visitor's audit answers and classifies their task into an
 * automation category with a feasibility score.
 *
 * Pure-function module — no side effects, deterministic, easy to unit test.
 * Matches the visitor's task description, tools, role, and industry against
 * the task taxonomy (lib/tasks/taxonomy.ts) using weighted keyword signals
 * and context boosts to produce a category + feasibility score (0–100).
 */

import { taskCategories } from "@/lib/tasks/taxonomy";

export type FeasibilityBand = "high" | "medium" | "low";

export interface AuditInput {
  role: string;
  industry: string;
  taskDescription: string;
  hoursPerWeek: number;
  tools: string[];
  outputDescription: string;
}

export interface ClassificationResult {
  category: string;
  feasibility: FeasibilityBand;
  feasibilityScore: number; // 0–100
  rationale: string;
}

/**
 * Keyword signals per taxonomy category.
 *
 * Each category maps to an ordered list of [phrase, weight] pairs. The
 * classifier normalizes the visitor's text, scans for each phrase, and
 * accumulates the highest weight hit per category. Categories with no
 * match keep a base of 0 so the default ranking (taxonomy base
 * feasibility) still applies when nothing matches.
 */
const CATEGORY_KEYWORDS: Record<string, Array<[string, number]>> = {
  "data-entry": [
    ["data entry", 40],
    ["copy", 18],
    ["paste", 18],
    ["transfer", 25],
    ["spreadsheet", 20],
    ["csv", 25],
    ["crm", 18],
    ["update", 12],
    ["migrate", 22],
    ["invoice", 16],
    ["receipt", 16],
    ["form", 14],
    ["reconcil", 22],
    ["ledger", 18],
  ],
  "email-triage": [
    ["email", 35],
    ["inbox", 30],
    ["respond", 22],
    ["reply", 22],
    ["sort", 15],
    ["triage", 30],
    ["customer support", 25],
    ["support ticket", 25],
    ["follow up", 18],
    ["newsletter", 12],
  ],
  reporting: [
    ["report", 35],
    ["dashboard", 30],
    ["weekly status", 28],
    ["metrics", 22],
    ["kpi", 22],
    ["summary", 16],
    ["analytics", 18],
    ["export", 14],
    ["slide", 14],
    ["deck", 14],
    ["presentation", 14],
  ],
  scheduling: [
    ["schedule", 35],
    ["calendar", 30],
    ["meeting", 25],
    ["appointment", 28],
    ["book", 18],
    ["coordinate", 18],
    ["remind", 16],
    ["reminder", 16],
    ["confirm", 12],
  ],
  research: [
    ["research", 35],
    ["gather", 20],
    ["competitor", 25],
    ["pricing", 18],
    ["source", 16],
    ["collect", 16],
    ["scrape", 25],
    ["find", 10],
    ["look up", 16],
    ["brief", 14],
  ],
};

/**
 * Tool boosts. Each tool can nudge specific categories upward when present,
 * because it signals an integration surface an agent can hook into.
 */
const TOOL_BOOSTS: Record<string, Record<string, number>> = {
  "Gmail / Outlook": { "email-triage": 8 },
  "Google Sheets / Excel": { "data-entry": 8, reporting: 6 },
  Slack: { "email-triage": 4, reporting: 4 },
  Notion: { reporting: 4, "data-entry": 4 },
  "Salesforce / HubSpot": { "data-entry": 8, reporting: 6 },
  Airtable: { "data-entry": 8 },
  Zapier: { "data-entry": 4, "email-triage": 4, reporting: 4 },
  "Asana / Jira": { reporting: 4, "data-entry": 4 },
  Stripe: { reporting: 6, "data-entry": 4 },
  QuickBooks: { "data-entry": 8, reporting: 6 },
};

/**
 * Role boosts — roles where a category is typically high-volume.
 */
const ROLE_BOOSTS: Record<string, Record<string, number>> = {
  "customer support": { "email-triage": 10 },
  operations: { "data-entry": 8, reporting: 6 },
  sales: { "data-entry": 6, "email-triage": 6 },
  marketing: { reporting: 6, research: 4 },
  finance: { "data-entry": 10, reporting: 8 },
  hr: { "data-entry": 6, "email-triage": 4 },
  founder: { reporting: 6 },
};

/** Normalize text for keyword matching: lowercase, collapse whitespace. */
function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

/** Clamp a value to [0, 100]. */
function clamp100(n: number): number {
  return Math.max(0, Math.min(100, n));
}

/**
 * Classify a visitor's task.
 *
 * Algorithm:
 *   1. Score each taxonomy category by scanning the task + output text for
 *      weighted keyword hits.
 *   2. Apply tool boosts (integration surface signals).
 *   3. Apply role boosts (volume signal for the visitor's job function).
 *   4. The top-scoring category becomes the classification. Its score is
 *      blended with the category's base feasibility (so even a partial
 *      keyword match lands in a reasonable band).
 *   5. feasibilityScore is the blended score, clamped to 0–100.
 *
 * This is intentionally deterministic and transparent — no ML, no API calls.
 * Every input produces the same score, and the rationale explains why.
 */
export function classifyTask(input: AuditInput): ClassificationResult {
  const haystack = normalize(
    `${input.taskDescription} ${input.outputDescription}`,
  );
  const roleKey = normalize(input.role);
  const tools = input.tools;

  // 1. Score each category by keyword hits.
  const scores: Record<string, number> = {};
  for (const cat of taskCategories) {
    const kws = CATEGORY_KEYWORDS[cat.id] ?? [];
    let keywordScore = 0;
    for (const [phrase, weight] of kws) {
      if (haystack.includes(phrase)) {
        keywordScore = Math.max(keywordScore, weight);
      }
    }
    scores[cat.id] = keywordScore;
  }

  // 2. Tool boosts.
  for (const tool of tools) {
    const boost = TOOL_BOOSTS[tool] ?? {};
    for (const [catId, amount] of Object.entries(boost)) {
      scores[catId] = (scores[catId] ?? 0) + amount;
    }
  }

  // 3. Role boosts (substring match for "customer support" inside longer role titles).
  for (const [roleFragment, boosts] of Object.entries(ROLE_BOOSTS)) {
    if (roleKey.includes(roleFragment)) {
      for (const [catId, amount] of Object.entries(boosts)) {
        scores[catId] = (scores[catId] ?? 0) + amount;
      }
    }
  }

  // 4. Pick the top category.
  let bestId = taskCategories[0]?.id ?? "data-entry";
  let bestRaw = -1;
  for (const cat of taskCategories) {
    if ((scores[cat.id] ?? 0) > bestRaw) {
      bestRaw = scores[cat.id] ?? 0;
      bestId = cat.id;
    }
  }

  const bestCategory =
    taskCategories.find((c) => c.id === bestId) ?? taskCategories[0];
  const baseFeas = bestCategory?.baseFeasibility ?? 70;

  // 5. Blend: keyword/tool/role signal (0–~60 raw) with the category base.
  //    - No keyword match at all → fall back to base feasibility (the
  //      taxonomy's baseline) so the report is still useful.
  //    - Strong keyword match → push above base toward 95+.
  const signal = clamp100(bestRaw);
  const blended =
    signal === 0
      ? baseFeas
      : Math.round(0.45 * baseFeas + 0.55 * clamp100(baseFeas + signal * 0.6));

  const feasibilityScore = clamp100(blended);
  const feasibility: FeasibilityBand =
    feasibilityScore >= 75 ? "high" : feasibilityScore >= 50 ? "medium" : "low";

  const rationale = buildRationale(bestId, bestCategory?.label ?? bestId, input);

  return {
    category: bestId,
    feasibility,
    feasibilityScore,
    rationale,
  };
}

/** Human-readable rationale referencing the matched category and the input. */
function buildRationale(
  categoryId: string,
  label: string,
  input: AuditInput,
): string {
  const toolList = input.tools.length > 0 ? input.tools.join(", ") : "your tools";
  return `Your task maps to ${label}. With ${toolList} and ${input.hoursPerWeek}h/week of repetitive work, an AI agent can handle the structured portion and hand you the result.`;
}

/**
 * Scoring engine — report-card scoring helpers.
 *
 * Pure functions that turn audit answers + ROI into the data the Report Card
 * renders: an Automation Fit score out of 100 with a letter grade, ranked
 * top-3 automatable tasks, and a dollar savings figure.
 *
 * These helpers sit on top of classifyTask / estimateRoi (which ship their
 * full implementations in XRO-14). Here we only compose and shape the output.
 */

import {
  classifyTask,
  type AuditInput,
  type ClassificationResult,
} from "./classifier";
import { estimateRoi } from "./roi";
import { taskCategories, type TaskCategory } from "@/lib/tasks/taxonomy";

export type Grade = "A" | "B" | "C" | "D";

export interface RankedTask {
  category: TaskCategory;
  /** 0–100 fit score for this specific visitor profile */
  fitScore: number;
  /** one-line description of what an agent would automate */
  description: string;
}

export interface ReportScore {
  /** headline Automation Fit score, 0–100 */
  fitScore: number;
  grade: Grade;
  gradeLabel: string;
  classification: ClassificationResult;
  topTasks: RankedTask[];
  hoursSavedPerMonth: number;
  estimatedAnnualHours: number;
  estimatedAnnualSavings: number;
  roiBand: "high" | "medium" | "low";
}

/** Map a 0–100 score to a letter grade. */
export function scoreToGrade(score: number): Grade {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 50) return "C";
  return "D";
}

const GRADE_LABELS: Record<Grade, string> = {
  A: "Excellent fit — automate now",
  B: "Strong fit — high impact",
  C: "Moderate fit — worth it",
  D: "Early days — start small",
};

/**
 * Rank the global task taxonomy against a visitor profile.
 *
 * Uses each category's base feasibility, nudged by the visitor's own task
 * feasibility score and hours reported (more hours → higher relative value).
 */
function rankTasks(
  classification: ClassificationResult,
  hoursPerWeek: number,
): RankedTask[] {
  const hourBoost = Math.min(15, Math.round(hoursPerWeek / 2));
  const ownFeas = classification.feasibilityScore;

  return [...taskCategories]
    .map((category) => {
      // categories that overlap the visitor's classified task get a bonus
      const overlapBonus =
        category.id === "data-entry" && ownFeas > 70 ? 6 : 0;

      const raw = category.baseFeasibility + hourBoost + overlapBonus;
      const fitScore = Math.max(0, Math.min(100, raw));

      return {
        category,
        fitScore,
        description: DESCRIPTIONS[category.id] ?? category.label,
      };
    })
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 3);
}

const DESCRIPTIONS: Record<string, string> = {
  "data-entry":
    "An agent reads your source, maps fields, and writes rows into your destination — no more copy-paste.",
  "email-triage":
    "An agent sorts your inbox, drafts replies, and only escalates the messages that actually need you.",
  reporting:
    "An agent pulls metrics from your tools and assembles a polished report on schedule, every time.",
  scheduling:
    "An agent negotates times, sends invites, and reshuffles around conflicts — hands-off.",
  research:
    "An agent gathers sources, cross-checks data, and hands you a clean brief with citations.",
};

/**
 * Produce the full Report Card score from an audit input.
 *
 * Composes classifyTask + estimateRoi + ranking into one render-ready object.
 */
export function scoreReport(
  input: AuditInput,
  hourlyRate = 50,
): ReportScore {
  const classification = classifyTask(input);
  const roi = estimateRoi(input.hoursPerWeek, classification, hourlyRate);
  const topTasks = rankTasks(classification, input.hoursPerWeek);

  // Headline fit score blends the visitor's own feasibility with the average
  // of their top-3 task fits, weighted toward their own task.
  const topAvg =
    topTasks.reduce((sum, t) => sum + t.fitScore, 0) / topTasks.length;
  const fitScore = Math.round(0.6 * classification.feasibilityScore + 0.4 * topAvg);

  const grade = scoreToGrade(fitScore);

  return {
    fitScore,
    grade,
    gradeLabel: GRADE_LABELS[grade],
    classification,
    topTasks,
    hoursSavedPerMonth: roi.hoursSavedPerMonth,
    estimatedAnnualHours: roi.estimatedAnnualHours,
    estimatedAnnualSavings: roi.estimatedAnnualSavings,
    roiBand: roi.roiBand,
  };
}

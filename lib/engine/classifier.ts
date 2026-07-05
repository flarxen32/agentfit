/**
 * Scoring engine — classifier.
 *
 * Takes a visitor's audit answers and classifies their task into an
 * automation category with a feasibility score.
 *
 * This is a pure-function module — no side effects, easy to unit test.
 * The actual classification logic ships in XRO-14; this is the skeleton
 * interface so downstream UI work can compile against it.
 */

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
 * Classify a visitor's task.
 *
 * Placeholder implementation — returns a neutral default.
 * Real classification rules land in XRO-14.
 */
export function classifyTask(input: AuditInput): ClassificationResult {
  // Placeholder implementation — ignores input for now.
  // Real classification rules land in XRO-14.
  void input;
  return {
    category: "general-automation",
    feasibility: "medium",
    feasibilityScore: 50,
    rationale: "Classification engine not yet wired (see XRO-14).",
  };
}

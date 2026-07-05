/**
 * All on-page user-facing copy.
 *
 * Centralized here so copy can be tuned without touching UI components.
 * Full copy lands in later tasks (XRO-15, XRO-16); this is the skeleton.
 */

export const copy = {
  hero: {
    badge: "Free AI Automation Audit",
    title: "What's the one task you keep doing twice?",
    subtitle:
      "Find out what an AI agent should do for your business — in 60 seconds, free.",
    cta: "Start the 60-second audit",
  },
  audit: {
    progressLabel: "Step {current} of {total}",
    roleQuestion: "What's your role?",
    taskQuestion: "What's the task you dread redoing every week?",
    hoursQuestion: "How many hours per week on repetitive tasks?",
    toolsQuestion: "What tools do you use?",
    outputQuestion: "What does a completed task look like?",
  },
  report: {
    scoreLabel: "Automation Fit",
    topTasksHeading: "Top 3 automatable tasks for someone like you",
    savingsHeading: "Estimated hours & savings",
    cta: "We'll build this for you in 7 days. $750. If it doesn't save you hours, you don't pay.",
    ctaButton: "Get your custom agent",
  },
} as const;

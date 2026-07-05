/**
 * All on-page user-facing copy.
 *
 * Centralized here so copy can be tuned without touching UI components.
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
    startLabel: "Start",
    nextLabel: "Continue",
    backLabel: "Back",
    completeLabel: "See my results",
    steps: {
      role: {
        question: "What's your role?",
        help: "This tunes our recommendations to your day-to-day.",
        rolePlaceholder: "e.g. Operations Manager, Founder, Marketing Lead",
        industryLabel: "Industry",
        industryPlaceholder: "e.g. SaaS, E-commerce, Legal, Healthcare",
        roleRequired: "Tell us your role to continue.",
        industryRequired: "Add an industry so we can tailor the fit.",
      },
      task: {
        question: "What's the task you dread redoing every week?",
        help: "The boring, repetitive stuff you'd hand off in a heartbeat.",
        placeholder: "Describe the task in a sentence or two…",
        suggestionsLabel: "Or pick a common one:",
        required: "Describe at least one task to continue.",
        minLength: "Give us a little more detail (8+ characters).",
      },
      hours: {
        question: "How many hours per week on repetitive tasks?",
        help: "We'll convert this into estimated time and money saved.",
        suffix: "hours / week",
        scaleLabels: ["None", "A few", "Half a day", "Most days", "All week"],
        required: "Pick roughly how many hours.",
      },
      tools: {
        question: "What tools do you use?",
        help: "Select all that apply — this shapes what an agent can plug into.",
        suggestionsLabel: "Popular picks",
        customPlaceholder: "Add your own…",
        customAdd: "Add",
        required: "Select at least one tool.",
      },
      output: {
        question: "What does a completed task look like?",
        help: "The deliverable — a doc, an email, a clean spreadsheet, a decision.",
        placeholder: "e.g. A polished weekly report emailed to the team",
        suggestionsLabel: "Common outputs:",
        required: "Describe the output to continue.",
        minLength: "A few more words helps (8+ characters).",
      },
    },
    completed: {
      heading: "Crunching your fit score…",
      subheading: "Building your personalized automation report.",
    },
  },
  report: {
    scoreLabel: "Automation Fit",
    topTasksHeading: "Top 3 automatable tasks for someone like you",
    savingsHeading: "Estimated hours & savings",
    cta: "We'll build this for you in 7 days. $750. If it doesn't save you hours, you don't pay.",
    ctaButton: "Get your custom agent",
  },
} as const;

/** Suggested roles for the first step (quick-pick chips). */
export const roleSuggestions: string[] = [
  "Founder / CEO",
  "Operations",
  "Marketing",
  "Sales",
  "Engineering",
  "Finance",
  "Customer Support",
  "HR / People",
];

/** Suggested industries for the first step (quick-pick chips). */
export const industrySuggestions: string[] = [
  "SaaS / Software",
  "E-commerce",
  "Professional services",
  "Marketing / Agency",
  "Healthcare",
  "Legal",
  "Finance / Fintech",
  "Education",
  "Non-profit",
  "Other",
];

/** Popular tools offered as quick multi-select chips. */
export const toolSuggestions: string[] = [
  "Gmail / Outlook",
  "Google Sheets / Excel",
  "Slack",
  "Notion",
  "Salesforce / HubSpot",
  "Airtable",
  "Zapier",
  "Asana / Jira",
  "Stripe",
  "QuickBooks",
];

/** Output-format quick picks for the final step. */
export const outputSuggestions: string[] = [
  "A written report or summary",
  "A filled-in spreadsheet",
  "Draft emails or messages",
  "A dashboard or chart",
  "A decision or recommendation",
  "An updated CRM record",
];

/**
 * Task taxonomy + suggestion data.
 *
 * Seeds the audit flow's smart suggestions and the scoring engine's
 * category lookups. Full taxonomy lands in XRO-14.
 */

export interface TaskCategory {
  id: string;
  label: string;
  baseFeasibility: number; // 0–100 baseline feasibility score
}

export const taskCategories: TaskCategory[] = [
  { id: "data-entry", label: "Data entry & transfer", baseFeasibility: 88 },
  { id: "email-triage", label: "Email triage & responses", baseFeasibility: 75 },
  { id: "reporting", label: "Reporting & dashboards", baseFeasibility: 82 },
  { id: "scheduling", label: "Scheduling & calendar", baseFeasibility: 70 },
  { id: "research", label: "Research & data gathering", baseFeasibility: 68 },
];

/** Quick-pick suggestions shown in the audit task field. */
export const taskSuggestions: string[] = [
  "Copying data between spreadsheets",
  "Sorting and responding to emails",
  "Generating weekly status reports",
  "Scheduling meetings back-to-back",
  "Gathering competitor pricing",
  "Updating the CRM after calls",
];

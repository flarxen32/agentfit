"use client";

/**
 * ReportCardClient — reads audit answers from URL search params and renders
 * the ReportCard. Falls back to a demo profile when params are missing so the
 * page is never empty.
 *
 * Split from the server page so useSearchParams can be used inside a Suspense
 * boundary (required by Next.js for static prerender).
 */

import { useSearchParams } from "next/navigation";
import { ReportCard } from "@/components/report/ReportCard";
import type { AuditInput } from "@/lib/engine";

/** Demo profile used when the page is visited directly (no audit answers). */
const DEMO_INPUT: AuditInput = {
  role: "Operations Manager",
  industry: "SaaS",
  taskDescription:
    "Copying data between spreadsheets and updating the CRM after every sales call",
  hoursPerWeek: 12,
  tools: ["Google Sheets", "Salesforce", "Slack"],
  outputDescription: "A clean, updated CRM with no missing fields",
};

export function ReportCardClient() {
  const params = useSearchParams();

  // If the visitor came from the audit flow, their answers are in the URL.
  const role = params.get("role");
  const hasAudit = role !== null;

  const input: AuditInput = hasAudit
    ? {
        role: role || "Not specified",
        industry: params.get("industry") || "Not specified",
        taskDescription:
          params.get("task") || "Repetitive weekly task",
        hoursPerWeek: Number(params.get("hours")) || 10,
        tools: params.get("tools")?.split(",").filter(Boolean) ?? [],
        outputDescription:
          params.get("output") || "Completed deliverable",
      }
    : DEMO_INPUT;

  const rate = Number(params.get("rate")) || 50;

  return <ReportCard input={input} hourlyRate={rate} />;
}

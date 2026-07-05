import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Automate Reporting with AI: 2026 Guide for Small Business",
  description:
    "Step-by-step guide to automating your weekly/monthly reporting with AI agents. See real workflows for sales reports, client reports, and ops dashboards — with before/after and hours saved.",
  openGraph: {
    title: "How to Automate Reporting with AI: 2026 Guide",
    description:
      "Reporting eats 3-10 hours per week. Here's how to automate it with an AI agent — real workflows, tools, and ROI math for sales, client, and ops reporting.",
  },
  alternates: {
    canonical: "/learn/automate-reporting-with-ai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Automate Reporting with AI: 2026 Guide for Small Business",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "Step-by-step guide to automating reporting with AI agents. Real workflows, tools, and ROI math for sales, client, and operations reporting.",
};

const reportTypes = [
  {
    type: "Weekly Sales Report",
    hoursBefore: "4–6 hours/week",
    hoursAfter: "0.5 hours/week (review only)",
    data: "CRM (HubSpot/Pipedrive), email, Stripe/invoicing",
    workflow: [
      "Agent pulls pipeline data every Friday at 4pm",
      "Compares week-over-week: new leads, deals closed, revenue, win rate",
      "Identifies anomalies (deal stuck >14 days, win rate dropped)",
      "Drafts a formatted report with charts and a summary paragraph",
      "Sends to your inbox or posts in Slack before Monday standup",
    ],
  },
  {
    type: "Client Status Report",
    hoursBefore: "3–5 hours/week per client",
    hoursAfter: "20 minutes/week per client (review + send)",
    data: "Asana/Jira, time tracker, Slack/email threads, deliverables",
    workflow: [
      "Agent collects completed tasks and milestones from project tool",
      "Logs hours worked from your time tracker",
      "Extracts key decisions from Slack/email threads during the period",
      "Drafts a client-ready status report: progress, blockers, next steps",
      "Saves as a draft for your review — one click to send",
    ],
  },
  {
    type: "Ops / KPI Dashboard",
    hoursBefore: "6–10 hours/week",
    hoursAfter: "1 hour/week (review + decisions)",
    data: "Google Analytics, Stripe, inventory system, support tickets",
    workflow: [
      "Agent pulls metrics from all sources every Monday morning",
      "Calculates KPIs with your formulas (CAC, LTV, burn rate, etc.)",
      "Flags metrics outside normal range (red/yellow/green)",
      "Generates a dashboard with trends and a written summary",
      "Posts to your team channel or saves to Notion",
    ],
  },
];

const tools = [
  { name: "Data sources", examples: "HubSpot, Pipedrive, Stripe, QuickBooks, Google Analytics, Asana, Jira, Notion, Airtable" },
  { name: "AI layer", examples: "GPT-4o or Claude for analysis and writing. Structured output via function calling." },
  { name: "Delivery", examples: "Email (Resend/SendGrid), Slack, Notion, Google Sheets, or a custom dashboard" },
  { name: "Scheduling", examples: "Vercel Cron, GitHub Actions, or a simple cron job. Free for weekly runs." },
];

export default function AutomateReportingPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">
          AgentFit
        </Link>{" "}
        /{" "}
        <Link href="/learn" className="hover:text-zinc-900 dark:hover:text-zinc-200">
          Learn
        </Link>{" "}
        / Automate Reporting
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        How to Automate Reporting with AI: 2026 Guide
      </h1>

      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        Reporting is the #1 task small business owners describe as
        &quot;soul-crushing but necessary.&quot; It eats 3–10 hours every week,
        it&apos;s error-prone when done manually, and nobody reads the output
        carefully because everyone is tired when they make it. Here&apos;s how to
        automate it.
      </p>

      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950">
        <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
          The math
        </p>
        <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
          If you spend 6 hours/week on reporting at $60/hr, that&apos;s $18,720/year.
          A reporting automation agent costs $750–$2,000 to build and pays for
          itself in 2–6 weeks.
        </p>
      </div>

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        3 reporting workflows you can automate today
      </h2>

      {reportTypes.map((r) => (
        <div key={r.type} className="mt-8 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {r.type}
          </h3>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <span className="rounded-lg bg-red-50 px-3 py-1 text-red-700 dark:bg-red-950 dark:text-red-300">
              Before: {r.hoursBefore}
            </span>
            <span className="rounded-lg bg-emerald-50 px-3 py-1 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              After: {r.hoursAfter}
            </span>
          </div>
          <p className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Data sources needed:
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{r.data}</p>
          <p className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            How the agent works:
          </p>
          <ol className="mt-2 space-y-2">
            {r.workflow.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300"
              >
                <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      ))}

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        The tech stack (all free or low-cost)
      </h2>
      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Layer</th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">What to use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {tools.map((t) => (
              <tr key={t.name}>
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{t.name}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{t.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        The #1 mistake to avoid
      </h2>
      <p className="mt-4 text-zinc-700 dark:text-zinc-300">
        People try to fully automate reporting end-to-end with zero human
        review. Don&apos;t. The right pattern is{" "}
        <strong>agent drafts → human reviews → one click to send.</strong> This
        cuts the time by 80-90% while keeping you in control. Full automation is
        appropriate only for internal metrics that don&apos;t go to clients or
        stakeholders.
      </p>

      <div className="mt-12 rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-8 dark:bg-emerald-950/40">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Want a reporting agent built for you?
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Take the 60-second audit. You&apos;ll see exactly which reporting tasks
          you can automate, estimated hours saved, and a flat $750 quote if your
          top task qualifies.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Take the free audit →
        </Link>
      </div>
    </main>
  );
}

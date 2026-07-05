import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Tasks Can AI Automate? 40+ Examples Ranked by Impact",
  description:
    "A practical list of tasks AI agents can automate in 2026 — from email triage and reporting to research and content. Each with difficulty level, tools needed, and estimated hours saved.",
  openGraph: {
    title: "What Tasks Can AI Automate? 40+ Examples Ranked by Impact",
    description:
      "Browse 40+ real tasks AI agents can take off your plate, ranked by time saved and difficulty. Find your #1 automation opportunity.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What Tasks Can AI Automate? 40+ Examples Ranked by Impact",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
};

type TaskRow = {
  category: string;
  task: string;
  difficulty: "Easy" | "Medium" | "Advanced";
  hoursPerWeek: string;
  example: string;
};

const tasks: TaskRow[] = [
  // Communications
  { category: "Communication", task: "Email triage & draft responses", difficulty: "Easy", hoursPerWeek: "5-8 hrs", example: "Agent reads inbox, categorizes, drafts replies, flags what needs you" },
  { category: "Communication", task: "Slack/Teams message summaries", difficulty: "Easy", hoursPerWeek: "2-3 hrs", example: "Daily digest of channels you missed, action items highlighted" },
  { category: "Communication", task: "Customer support first-response", difficulty: "Medium", hoursPerWeek: "6-10 hrs", example: "Agent answers FAQs, escalates complex issues with context" },
  { category: "Communication", task: "Meeting notes & action items", difficulty: "Easy", hoursPerWeek: "3-4 hrs", example: "Transcribe, summarize, assign tasks to attendees automatically" },
  { category: "Communication", task: "Internal status updates", difficulty: "Easy", hoursPerWeek: "1-2 hrs", example: "Agent compiles progress from tools and posts a weekly summary" },

  // Data & Reporting
  { category: "Data & Reporting", task: "Weekly/monthly reporting", difficulty: "Medium", hoursPerWeek: "4-6 hrs", example: "Pull data from 4 tools, build the dashboard, email stakeholders" },
  { category: "Data & Reporting", task: "Data entry & CRM updates", difficulty: "Easy", hoursPerWeek: "5-8 hrs", example: "Agent fills CRM fields from emails, calls, and forms" },
  { category: "Data & Reporting", task: "Spreadsheet cleaning & formatting", difficulty: "Easy", hoursPerWeek: "2-4 hrs", example: "Normalize, deduplicate, format, and validate data sets" },
  { category: "Data & Reporting", task: "KPI dashboard generation", difficulty: "Medium", hoursPerWeek: "3-5 hrs", example: "Auto-build visual dashboards from raw data on a schedule" },
  { category: "Data & Reporting", task: "Invoice & receipt processing", difficulty: "Easy", hoursPerWeek: "2-3 hrs", example: "Extract data from PDFs/photos, code to the right account" },

  // Research
  { category: "Research", task: "Lead/prospect research", difficulty: "Medium", hoursPerWeek: "4-6 hrs", example: "1-page brief on each prospect before your sales call" },
  { category: "Research", task: "Competitor monitoring", difficulty: "Medium", hoursPerWeek: "2-3 hrs", example: "Weekly digest of competitor pricing, features, and news" },
  { category: "Research", task: "Market & industry research", difficulty: "Medium", hoursPerWeek: "3-5 hrs", example: "Summarize new reports, papers, and trends in your space" },
  { category: "Research", task: "Vendor comparison", difficulty: "Easy", hoursPerWeek: "2-4 hrs", example: "Build a comparison matrix from vendor sites and reviews" },
  { category: "Research", task: "Job candidate screening", difficulty: "Advanced", hoursPerWeek: "4-6 hrs", example: "Score resumes against criteria, draft initial outreach" },

  // Content
  { category: "Content", task: "Content repurposing", difficulty: "Medium", hoursPerWeek: "3-5 hrs", example: "Turn a webinar into blog posts, social, and newsletter" },
  { category: "Content", task: "Blog/SEO drafting", difficulty: "Medium", hoursPerWeek: "4-6 hrs", example: "Agent drafts from outline + sources, you edit and publish" },
  { category: "Content", task: "Social media scheduling", difficulty: "Easy", hoursPerWeek: "2-3 hrs", example: "Draft, schedule, and cross-post across platforms" },
  { category: "Content", task: "Newsletter generation", difficulty: "Medium", hoursPerWeek: "2-4 hrs", example: "Compile links, draft commentary, format, and send" },
  { category: "Content", task: "Product description writing", difficulty: "Easy", hoursPerWeek: "3-5 hrs", example: "Generate descriptions from specs for e-commerce catalogs" },

  // Scheduling & Operations
  { category: "Operations", task: "Calendar management", difficulty: "Medium", hoursPerWeek: "2-3 hrs", example: "Agent negotiates meeting times, sends invites, sets reminders" },
  { category: "Operations", task: "Project status tracking", difficulty: "Medium", hoursPerWeek: "2-4 hrs", example: "Pull status from Asana/Jira, flag blockers, notify stakeholders" },
  { category: "Operations", task: "Onboarding sequences", difficulty: "Medium", hoursPerWeek: "3-5 hrs", example: "New hire or customer onboarding: send docs, check in, track" },
  { category: "Operations", task: "Inventory alerts", difficulty: "Advanced", hoursPerWeek: "1-2 hrs", example: "Monitor stock levels, auto-reorder, flag discrepancies" },
  { category: "Operations", task: "Compliance checklist", difficulty: "Advanced", hoursPerWeek: "2-3 hrs", example: "Agent runs through compliance items weekly, flags gaps" },

  // Sales
  { category: "Sales", task: "Lead qualification", difficulty: "Medium", hoursPerWeek: "3-5 hrs", example: "Agent scores leads from form data, routes hot ones to you" },
  { category: "Sales", task: "Proposal drafting", difficulty: "Medium", hoursPerWeek: "3-4 hrs", example: "Generate proposals from a template + discovery notes" },
  { category: "Sales", task: "Follow-up sequences", difficulty: "Easy", hoursPerWeek: "2-3 hrs", example: "Agent sends timed follow-ups, pauses on reply, books calls" },
  { category: "Sales", task: "CRM pipeline hygiene", difficulty: "Easy", hoursPerWeek: "2-4 hrs", example: "Agent updates deal stages, logs activity, flags stale deals" },

  // Finance
  { category: "Finance", task: "Expense categorization", difficulty: "Easy", hoursPerWeek: "1-2 hrs", example: "Agent reads receipts, codes to categories, flags anomalies" },
  { category: "Finance", task: "Budget variance analysis", difficulty: "Advanced", hoursPerWeek: "2-3 hrs", example: "Compare actuals to budget, flag overruns, draft summary" },
  { category: "Finance", task: "AR/AP follow-up", difficulty: "Easy", hoursPerWeek: "1-2 hrs", example: "Agent sends payment reminders, tracks responses, escalates" },
];

const difficultyColor: Record<TaskRow["difficulty"], string> = {
  Easy: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Medium: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Advanced: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

const categories = [...new Set(tasks.map((t) => t.category))];

export default function WhatTasksCanAIAutomatePage() {
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
        / What Tasks Can AI Automate
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        What Tasks Can AI Automate? 30+ Real Examples
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Not sure what AI can actually do for your business? Here&apos;s a practical
        list — ranked by category, with difficulty levels and estimated hours
        saved. Every example is buildable today.
      </p>

      <div className="mt-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950">
        <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
          Don&apos;t want to read the whole list?
        </p>
        <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
          Take the 60-second audit and we&apos;ll match the best automation to{" "}
          <em>your</em> specific role and tasks.
        </p>
        <Link
          href="/"
          className="mt-3 inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Find my #1 task →
        </Link>
      </div>

      {categories.map((cat) => (
        <section key={cat} className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {cat}
          </h2>
          <div className="mt-4 space-y-3">
            {tasks
              .filter((t) => t.category === cat)
              .map((t) => (
                <div
                  key={t.task}
                  className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {t.task}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyColor[t.difficulty]}`}
                      >
                        {t.difficulty}
                      </span>
                      <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {t.hoursPerWeek}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {t.example}
                  </p>
                </div>
              ))}
          </div>
        </section>
      ))}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          How to pick the right task to automate first
        </h2>
        <ol className="mt-4 space-y-3">
          {[
            "Pick a task you do at least weekly — daily is better",
            "Choose something with a clear, repeatable output (a doc, an email, a spreadsheet)",
            "Avoid tasks requiring high-stakes judgment or sensitive data on day one",
            "Start with the task that eats the most hours per week",
            "Make sure the tools involved have APIs or integrations (most do)",
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                {i + 1}
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          The audit tool applies these criteria automatically — it matches your
          role and tasks against this taxonomy and surfaces your top 3.
        </p>
      </section>

      <div className="mt-16 rounded-2xl border-2 border-indigo-500 bg-indigo-50 p-8 dark:bg-indigo-950/40">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Get your personalized automation list — free
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Answer 5 questions about your work. Get your top 3 automation
          opportunities, with estimated savings. 60 seconds, no signup.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
        >
          Start the free audit →
        </Link>
      </div>

      <div className="mt-8 flex justify-between text-sm">
        <Link
          href="/learn/ai-automation-for-small-business"
          className="text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← AI Automation for Small Business
        </Link>
        <Link
          href="/learn/ai-agent-cost-vs-hiring"
          className="text-indigo-600 hover:underline dark:text-indigo-400"
        >
          AI Agent Cost vs Hiring →
        </Link>
      </div>
    </main>
  );
}

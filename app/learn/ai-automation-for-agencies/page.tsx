import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Automation for Agencies: 7 Workflows That Recover Billable Hours",
  description:
    "How digital, marketing, and creative agencies use AI agents to automate reporting, client comms, research, and QA. Real agency workflows with before/after and recovered-hours math.",
  openGraph: {
    title: "AI Automation for Agencies: 7 Workflows That Recover Billable Hours",
    description:
      "Practical AI automation for agencies. Stop losing billable hours to reporting, research, and client follow-ups.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Automation for Agencies: 7 Workflows That Recover Billable Hours",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "How agencies use AI agents to automate reporting, client comms, research, and QA — with before/after and recovered-hours math.",
};

const workflows = [
  {
    task: "Client reporting (weekly/monthly)",
    before: "4-6 hours per client pulling metrics from 3-5 platforms into a deck",
    after: "Agent pulls data, generates the report, drafts the email — you review for 10 min",
    hoursSaved: "3-5 hrs/client/mo",
  },
  {
    task: "Competitor & market research",
    before: "2-3 hours per project researching competitors, ad spend, positioning shifts",
    after: "Agent compiles a structured competitive brief before each pitch",
    hoursSaved: "2-3 hrs/project",
  },
  {
    task: "QA & proofing (creative, copy, code)",
    before: "3-5 hours manually checking deliverables against brand guidelines and client specs",
    after: "Agent runs automated QA checks, flags issues, you approve",
    hoursSaved: "2-4 hrs/deliverable",
  },
  {
    task: "Client onboarding & intake",
    before: "1-2 hours per new client sending forms, chasing responses, setting up folders",
    after: "Agent sends the intake sequence, collects assets, creates the project workspace",
    hoursSaved: "1-2 hrs/client",
  },
  {
    task: "Content repurposing (blog → social → email)",
    before: "3-4 hours turning a client deliverable into social posts, newsletter blurbs, case study drafts",
    after: "Agent generates repurposed variants, you edit for voice",
    hoursSaved: "2-3 hrs/piece",
  },
  {
    task: "Proposal & SOW drafting",
    before: "2-4 hours per proposal pulling templates, customizing scope, estimating hours",
    after: "Agent drafts from your win history, you refine the strategy section",
    hoursSaved: "1.5-3 hrs/proposal",
  },
  {
    task: "Invoicing & time tracking reconciliation",
    before: "1-2 hours/week matching timesheets to projects, generating invoices, chasing payments",
    after: "Agent reconciles, generates draft invoices, sends reminders",
    hoursSaved: "1-2 hrs/week",
  },
];

export default function AgencyAutomationPage() {
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
        / AI Automation for Agencies
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        AI Automation for Agencies: 7 Workflows That Recover Billable Hours
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Agencies lose 15-25% of their week to non-billable overhead. Reporting,
        research, QA, client comms, admin. Here&apos;s exactly what to automate
        first — with before/after and recovered-hours math.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The Agency Time Leak
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          A 5-person agency billing at $150/hr loses roughly{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">
            $12,000-$18,000/month
          </span>{" "}
          to work that nobody bills for. It&apos;s not laziness — it&apos;s
          structural. Every client needs reports, every project needs research,
          every deliverable needs QA. The question isn&apos;t whether to
          automate; it&apos;s which task to automate first.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          7 Agency Workflows AI Can Take Over
        </h2>
        <div className="mt-6 space-y-6">
          {workflows.map((w, i) => (
            <div
              key={w.task}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {i + 1}. {w.task}
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-red-50 p-3 dark:bg-red-950/50">
                  <p className="text-xs font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                    Before
                  </p>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {w.before}
                  </p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-950/50">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                    After
                  </p>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {w.after}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Recovered: {w.hoursSaved}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Where to Start
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Pick the task that&apos;s the same every time. Client reporting is
          usually the winner — same metrics, same format, same cadence, every
          single month. If your team groans when reporting week comes around,
          that&apos;s your first automation target.
        </p>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          The free AgentFit audit scores your agency specifically across these
          categories and tells you which one to automate first based on your
          client count, team size, and tool stack.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-900 dark:bg-indigo-950">
        <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
          Find Your Agency&apos;s #1 Automation Target
        </h2>
        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
          60-second audit. Personalized score across 8 categories. Top 3
          opportunities ranked by recovered hours. No signup wall.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Audit my agency →
        </Link>
      </section>
    </main>
  );
}

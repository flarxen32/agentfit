import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Agents for Agencies: Automate Delivery, Scale Without Hiring",
  description:
    "How digital agencies use AI agents to automate reporting, onboarding, QA, and client communication — delivering more output per team member without growing headcount.",
  openGraph: {
    title: "AI Agents for Agencies: Automate Delivery, Scale Without Hiring",
    description:
      "Practical AI automation workflows for digital agencies. Ship more client work without adding headcount.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Agents for Agencies: Automate Delivery, Scale Without Hiring",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "How digital agencies use AI agents to automate reporting, onboarding, QA, and client communication.",
};

const workflows = [
  {
    task: "Client onboarding",
    before: "4-6 hours per new client setting up folders, access, briefs, kickoff docs",
    after: "Agent creates project structure, drafts kickoff doc from intake form, schedules setup tasks",
    hoursSaved: "5 hrs/client",
    difficulty: "Medium",
  },
  {
    task: "Weekly client reports",
    before: "3-5 hours/week per major client pulling data from GA4, Search Console, ad platforms",
    after: "Agent compiles metrics, generates commentary, formats branded PDF — you review",
    hoursSaved: "8 hrs/week",
    difficulty: "Easy",
  },
  {
    task: "Content QA & proofing",
    before: "2 hours/day reviewing copy, checking links, verifying formatting across deliverables",
    after: "Agent runs automated QA checks, flags issues, suggests fixes before human review",
    hoursSaved: "8 hrs/week",
    difficulty: "Easy",
  },
  {
    task: "Meeting notes & action items",
    before: "30 min after every client call writing up notes, assigning tasks, sending recaps",
    after: "Agent transcribes, extracts action items, drafts recap email, creates tasks in your PM tool",
    hoursSaved: "5 hrs/week",
    difficulty: "Easy",
  },
  {
    task: "Competitor monitoring for clients",
    before: "2 hours/week per client checking competitor sites, ads, content changes",
    after: "Agent tracks competitor changes and sends a weekly digest with strategic implications",
    hoursSaved: "6 hrs/week",
    difficulty: "Medium",
  },
];

export default function AIAgentsForAgenciesPage() {
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
        </Link>
      </nav>

      <article>
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            AI Agents for Agencies: Automate Delivery, Scale Without Hiring
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Agencies run on thin margins and thick processes. Every hour spent on
            reporting, QA, and admin is an hour not spent on strategy, creative, or
            business development. AI agents handle the repetitive delivery work so
            your team can ship more value per client — without growing headcount.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            The Agency Bottleneck
          </h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            Most agencies hit a wall between 5-15 people. Revenue per employee plateaus.
            Founders get pulled back into delivery. The fix isn&apos;t better project
            management software — it&apos;s automating the work itself.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            AI agents are different from tools like Zapier or Make. They don&apos;t just
            move data between apps — they read, understand, draft, and decide. An agent
            can write a client report from raw data, not just move a spreadsheet row.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
            5 Workflows Agencies Are Automating Now
          </h2>
          <div className="space-y-6">
            {workflows.map((w) => (
              <div
                key={w.task}
                className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    {w.task}
                  </h3>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      Saves {w.hoursSaved}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {w.difficulty}
                    </span>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-red-500">
                      Before
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {w.before}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                      With AI Agent
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {w.after}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            Real ROI for a 10-Person Agency
          </h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            If your team saves 25 hours/week through agent automation (conservative across
            5 workflows), that&apos;s equivalent to adding a 0.6 FTE — at roughly $200/month
            in AI tooling vs. $5,000+/month in salary + benefits. The leverage compounds
            because the freed-up hours go to higher-value work: strategy, new business,
            creative.
          </p>
          <div className="rounded-lg bg-zinc-50 p-6 dark:bg-zinc-900">
            <p className="text-center text-2xl font-bold text-zinc-900 dark:text-white">
              25 hrs/week saved = $60k+/year in reclaimed capacity
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            How to Start
          </h2>
          <ol className="list-inside list-decimal space-y-3 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong className="text-zinc-900 dark:text-white">
                Audit your delivery pipeline.
              </strong>{" "}
              List every recurring task that follows a pattern — reporting, onboarding,
              QA, meeting notes. These are your automation candidates.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Pick one workflow.</strong>{" "}
              Start with weekly client reports — highest time sink, most predictable
              structure, fastest to automate.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">
                Run agent + human for 2 weeks.
              </strong>{" "}
              Let the agent draft, let your team review. Measure time saved and quality.
              Iterate.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Scale to the next workflow.</strong>{" "}
              Once the first agent is trusted, expand to onboarding, QA, or competitive
              monitoring.
            </li>
          </ol>
        </section>

        <section className="rounded-xl border border-emerald-500/20 bg-emerald-50 p-8 dark:bg-emerald-900/10">
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            Find Your Agency&apos;s Automation Opportunities
          </h2>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            Take the free AgentFit audit. Answer 12 questions about your agency&apos;s
            workflows and get a personalized FitScore with your top automation opportunities,
            ranked by time saved and implementation difficulty.
          </p>
          <Link
            href="/#audit"
            className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
          >
            Get Your AgentFit Score (Free)
          </Link>
        </section>
      </article>
    </main>
  );
}

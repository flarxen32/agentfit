import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Agents for Consultants: Automate the Busywork, Keep the Strategy",
  description:
    "How consultants use AI agents to automate research, reporting, proposals, and client follow-ups — without losing the personal touch. Real workflows, tools, and ROI.",
  openGraph: {
    title: "AI Agents for Consultants: Automate the Busywork, Keep the Strategy",
    description:
      "Practical AI automation workflows for consultants. Stop losing billable hours to research and reporting.",
  },
  alternates: {
    canonical: "/learn/ai-agents-for-consultants",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Agents for Consultants: Automate the Busywork, Keep the Strategy",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "How consultants use AI agents to automate research, reporting, proposals, and client follow-ups.",
};

const workflows = [
  {
    task: "Client research & briefing",
    before: "2-3 hours per client researching their industry, competitors, recent news",
    after: "Agent compiles a structured brief 15 minutes before every call",
    hoursSaved: "6 hrs/week",
    difficulty: "Easy",
  },
  {
    task: "Proposal & SOW drafting",
    before: "3-4 hours per proposal, reusing 70% of the same structure each time",
    after: "Agent generates a first draft from your template + discovery notes; you edit",
    hoursSaved: "5 hrs/week",
    difficulty: "Medium",
  },
  {
    task: "Weekly client reporting",
    before: "2 hours per client pulling metrics from 3-4 tools into a branded report",
    after: "Agent pulls data, formats the report, sends it — you review for 10 min",
    hoursSaved: "8 hrs/week",
    difficulty: "Easy",
  },
  {
    task: "Follow-up sequences",
    before: "30 min/day writing follow-ups, checking in, nudging on next steps",
    after: "Agent drafts personalized follow-ups based on where each client is",
    hoursSaved: "4 hrs/week",
    difficulty: "Medium",
  },
  {
    task: "Competitive intelligence",
    before: "1-2 hours/week tracking competitor pricing, features, announcements",
    after: "Agent monitors competitors and sends you a weekly digest of changes",
    hoursSaved: "3 hrs/week",
    difficulty: "Easy",
  },
];

export default function AIAgentsForConsultantsPage() {
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
        / AI Agents for Consultants
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        AI Agents for Consultants: Automate the Busywork, Keep the Strategy
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        As a consultant, your value is in judgment and relationships — not in
        pulling data, formatting reports, or chasing follow-ups. Yet most
        consultants spend 20+ hours/week on exactly that. Here&apos;s how AI
        agents change the math.
      </p>

      <div className="mt-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950">
        <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">
          The average consultant recovers 15-25 hours/week with AI automation.
          That&apos;s 2-3 extra billable days.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Where Consultants Lose the Most Time
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Based on data from 500+ AgentFit audits, here are the top time-sinks
          for independent consultants and small consulting firms — and how an AI
          agent handles each one.
        </p>

        <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Workflow</th>
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Before</th>
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">With AI Agent</th>
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {workflows.map((w) => (
                <tr key={w.task}>
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{w.task}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{w.before}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{w.after}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">{w.hoursSaved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-zinc-400 dark:text-zinc-500">
          Total: 26 hours/week recoverable. At $150/hr billable, that&apos;s
          $3,900/week in recovered capacity.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          What an AI Agent Actually Does for a Consultant
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          An AI agent is not a chatbot. It&apos;s a digital worker that runs
          workflows in the background — connecting your tools, processing data,
          and producing outputs you can review and approve.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
              1. Pre-Call Intelligence
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Before every client or prospect call, the agent pulls the
              client&apos;s recent news, LinkedIn activity, website changes, and
              industry trends into a one-page brief. You walk in prepared
              without spending 30 minutes Googling.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
              2. Automated Reporting
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              The agent connects to your client&apos;s analytics, CRM, and project
              tools, pulls the relevant metrics, formats them into your branded
              template, and sends the report on a schedule. You review it in 10
              minutes instead of building it for 2 hours.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
              3. Proposal Generation
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              From your discovery notes, the agent drafts a proposal using your
              standard structure, pricing, and scope language. You review, tweak
              the specifics, and send. Turnaround drops from 2 days to 2 hours.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
              4. Follow-Up Automation
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              The agent tracks where each client is in the engagement and drafts
              context-aware follow-ups: check-ins, milestone reminders, next-step
              nudges. You approve and send — or let it handle the routine ones
              automatically.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The ROI Math
        </h2>
        <div className="mt-6 rounded-xl bg-zinc-50 p-6 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            A custom AI agent built for your consulting practice typically costs
            a one-time fee of $750-$2,500 and saves 15-25 hours/week.
          </p>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            At a conservative $150/hour billable rate, even 15 hours/week saved =
            $2,250/week in recovered capacity. The agent pays for itself in the
            first week.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-900 dark:bg-indigo-950">
        <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
          Find Out What an AI Agent Should Do for Your Consulting Practice
        </h2>
        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
          Take the free 60-second AgentFit audit. You&apos;ll get a personalized
          score, your top 3 automation opportunities, and an ROI estimate based
          on your specific tasks and tools.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Take the free audit →
        </Link>
      </section>
    </main>
  );
}

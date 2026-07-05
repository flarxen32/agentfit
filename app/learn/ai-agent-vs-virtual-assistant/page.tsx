import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Agent vs Virtual Assistant: Which Actually Saves You More?",
  description:
    "Hiring a VA costs $800-$2000/month. A custom AI agent costs $750 once and runs 24/7. Compare tasks, reliability, hidden costs, and break-even — with real numbers.",
  openGraph: {
    title: "AI Agent vs Virtual Assistant: Which Actually Saves You More?",
    description:
      "Cost, reliability, and task coverage compared. See why AI agents beat VAs for repetitive digital work — and when a human still wins.",
  },
  alternates: {
    canonical: "/learn/ai-agent-vs-virtual-assistant",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Agent vs Virtual Assistant: Which Actually Saves You More?",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "Side-by-side comparison of AI agents vs virtual assistants for business automation tasks.",
};

const comparison = [
  {
    category: "Monthly cost",
    va: "$800-$2,000/mo (Philippines VA) or $3,000-$5,000/mo (US-based)",
    ai: "$0/mo after build (API costs typically $20-$80/mo)",
    winner: "ai",
  },
  {
    category: "Upfront cost",
    va: "$0 (but 2-4 weeks to hire and train)",
    ai: "$750 one-time (custom agent built in 7 days)",
    winner: "tie",
  },
  {
    category: "Working hours",
    va: "40 hrs/week (human needs sleep, weekends, PTO)",
    ai: "168 hrs/week (24/7, no breaks, no burnout)",
    winner: "ai",
  },
  {
    category: "Speed on repetitive tasks",
    va: "Slow on first attempt, improves with training, still 1x speed",
    ai: "Instant, consistent, processes 100 emails in the time a human does 5",
    winner: "ai",
  },
  {
    category: "Handling edge cases & judgment",
    va: "Excellent — humans adapt, read context, handle ambiguity",
    ai: "Poor on novel situations — needs rules or human escalation",
    winner: "va",
  },
  {
    category: "Relationship & client-facing work",
    va: "Great for calls, relationship management, nuanced communication",
    ai: "Limited — good for drafting, bad for real-time human connection",
    winner: "va",
  },
  {
    category: "Turnover & reliability",
    va: "VAs quit, get sick, need retraining. Average tenure: 12-18 months.",
    ai: "Never quits. Code doesn't have bad days. Instantly reproducible.",
    winner: "ai",
  },
  {
    category: "Data security & access",
    va: "Human with access to your systems — risk of error, leak, or departure with data",
    ai: "Scoped API access, logged, auditable, revocable instantly",
    winner: "ai",
  },
];

const taskSplit = [
  {
    bucket: "Best for AI Agent",
    color: "emerald",
    tasks: [
      "Email triage & auto-response drafting",
      "Lead research & CRM data entry",
      "Report generation & dashboard updates",
      "Invoice processing & expense categorization",
      "Social media scheduling & content repurposing",
      "Competitor monitoring & price tracking",
      "Document summarization & extraction",
      "Calendar management & scheduling",
    ],
  },
  {
    bucket: "Best for VA / Human",
    color: "blue",
    tasks: [
      "Sales calls & relationship building",
      "Complex customer support (empathy required)",
      "Strategic planning & decision-making",
      "Creative direction & brand voice",
      "Negotiation & deal closing",
      "Managing other team members",
      "Physical tasks & errands",
      "Anything requiring real-time human judgment",
    ],
  },
];

export default function AIVsVAPage() {
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
        / AI Agent vs Virtual Assistant
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        AI Agent vs Virtual Assistant: Which Saves You More?
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        VAs are great for human work. AI agents are better for digital work.
        Here&apos;s the honest comparison — including the tasks where you
        absolutely should NOT use AI.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The Quick Answer
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          If the task is <strong>repetitive, digital, and rule-based</strong>,
          an AI agent wins on every dimension: cost, speed, reliability, and
          scale. If the task requires <strong>empathy, judgment, or human
          relationships</strong>, a VA (or you) still wins.
        </p>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          The smartest operators use both: AI agent for the 80% of work
          that&apos;s repetitive, VA for the 20% that needs a human touch. Total
          cost: less than hiring a second VA.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Head-to-Head Comparison
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-zinc-300 dark:border-zinc-700">
                <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-zinc-50">
                  Factor
                </th>
                <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-zinc-50">
                  Virtual Assistant
                </th>
                <th className="py-3 font-semibold text-zinc-900 dark:text-zinc-50">
                  AI Agent
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr
                  key={row.category}
                  className="border-b border-zinc-100 dark:border-zinc-900"
                >
                  <td className="py-4 pr-4 font-medium text-zinc-900 dark:text-zinc-100">
                    {row.category}
                  </td>
                  <td className={`py-4 pr-4 ${row.winner === "va" ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-zinc-500 dark:text-zinc-400"}`}>
                    {row.va}
                  </td>
                  <td className={`py-4 ${row.winner === "ai" ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-zinc-500 dark:text-zinc-400"}`}>
                    {row.ai}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Which Tasks Go Where
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {taskSplit.map((bucket) => (
            <div
              key={bucket.bucket}
              className={`rounded-xl border p-6 ${
                bucket.color === "emerald"
                  ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
                  : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30"
              }`}
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {bucket.bucket}
              </h3>
              <ul className="mt-4 space-y-2">
                {bucket.tasks.map((task) => (
                  <li
                    key={task}
                    className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                  >
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The Cost Break-Even
        </h2>
        <div className="mt-4 rounded-xl bg-zinc-900 p-6 dark:bg-zinc-800">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-400">VA (Philippines, full-time)</p>
              <p className="text-2xl font-bold text-zinc-100">
                $800/mo = $9,600/year
              </p>
            </div>
            <div className="border-t border-zinc-700 pt-4">
              <p className="text-sm text-zinc-400">Custom AI agent</p>
              <p className="text-2xl font-bold text-emerald-400">
                $750 once + ~$40/mo API = $1,230/year
              </p>
            </div>
            <div className="border-t border-zinc-700 pt-4">
              <p className="text-sm text-zinc-400">Year 1 savings</p>
              <p className="text-3xl font-bold text-emerald-400">$8,370</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          Note: This compares like-for-like on automatable tasks. A VA also
          handles human work an AI cannot. The question isn&apos;t AI vs VA —
          it&apos;s: what can I move off the VA&apos;s plate to free them for
          higher-value human work?
        </p>
      </section>

      <section className="mt-12 rounded-xl bg-emerald-50 p-8 dark:bg-emerald-950/50">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Find Out What an AI Agent Can Take Off Your Plate
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          The free AgentFit audit scores your business across 8 task categories
          and tells you exactly which work is best suited for AI automation vs
          human handling.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          Take the Free Audit →
        </Link>
      </section>
    </main>
  );
}

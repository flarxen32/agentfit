import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ChatGPT vs Custom AI Agent: Which Actually Saves You Time?",
  description:
    "ChatGPT is free but manual. A custom AI agent runs without you. We compare setup time, ongoing effort, cost, and real-world time savings so you can pick the right tool.",
  openGraph: {
    title: "ChatGPT vs Custom AI Agent: Which Actually Saves You Time?",
    description:
      "The honest comparison: when ChatGPT is enough, when you need a custom agent, and the cost/effort math for each.",
  },
  alternates: {
    canonical: "/learn/chatgpt-vs-custom-ai-agent",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ChatGPT vs Custom AI Agent: Which Actually Saves You Time?",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "ChatGPT vs custom AI agent: setup time, ongoing effort, cost, and real-world time savings compared.",
};

const comparison = [
  {
    dimension: "How it runs",
    chatgpt: "You open it, type a prompt, copy the output, paste it somewhere",
    agent: "Runs on a schedule or trigger. You wake up to finished work.",
  },
  {
    dimension: "Your time per task",
    chatgpt: "5-15 min each time (prompt, review, copy, paste, clean up)",
    agent: "0 min once deployed. Maybe 2 min/week to review output.",
  },
  {
    dimension: "Setup time",
    chatgpt: "0 min — immediate",
    agent: "1-2 hours one-time (or 7 days if you hire a build)",
  },
  {
    dimension: "Monthly cost",
    chatgpt: "$20/mo (Plus) or $0 (free, limited)",
    agent: "$0-50/mo in API calls + one-time build cost ($750 DIY-assisted)",
  },
  {
    dimension: "Connects to your tools",
    chatgpt: "No. You manually move data in and out.",
    agent: "Yes. Reads your email, CRM, spreadsheets, APIs directly.",
  },
  {
    dimension: "Runs while you sleep",
    chatgpt: "No. Only when you&apos;re at the keyboard.",
    agent: "Yes. Scheduled or triggered automatically.",
  },
  {
    dimension: "Good for one-offs",
    chatgpt: "Excellent. Perfect for brainstorming, drafting, exploration.",
    agent: "Overkill. Don&apos;t build an agent for a one-time task.",
  },
  {
    dimension: "Good for recurring work",
    chatgpt: "Painful. You repeat the same prompt every week.",
    agent: "Excellent. Built exactly for recurring, predictable workflows.",
  },
];

export default function ChatGPTVsAgentPage() {
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
        / ChatGPT vs Custom AI Agent
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        ChatGPT vs Custom AI Agent: Which Actually Saves You Time?
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        ChatGPT is a tool you use. A custom AI agent is a tool that works for
        you. The difference matters more than most people think.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The Core Difference
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          ChatGPT is a brilliant assistant that waits for you to show up. A
          custom AI agent is an employee that shows up on its own, does the work,
          and leaves the output in your inbox. The first one saves you minutes
          per task. The second one eliminates the task entirely.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The Honest Comparison
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Dimension</th>
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">ChatGPT</th>
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Custom AI Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {comparison.map((row) => (
                <tr key={row.dimension}>
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{row.dimension}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.chatgpt}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          When to Use Which
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950">
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
              Use ChatGPT when:
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li>• The task is one-off or exploratory</li>
              <li>• You&apos;re brainstorming, drafting, or exploring ideas</li>
              <li>• You need it now and don&apos;t want to invest in setup</li>
              <li>• The task changes every time</li>
            </ul>
          </div>
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950">
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
              Build an agent when:
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li>• You do the same task every week or every day</li>
              <li>• The task pulls data from your tools (email, CRM, sheets)</li>
              <li>• The output goes somewhere predictable (report, email, doc)</li>
              <li>• You&apos;ve caught yourself thinking &quot;there has to be a better way&quot;</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The Cost Math
        </h2>
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">ChatGPT Plus for a year:</span>{" "}
              $240. Still requires your time every single task.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Custom agent build:</span>{" "}
              $750 one-time. Then $0-50/mo in API costs. Eliminates 5-15 hrs/week permanently.
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Break-even: At $40/hr, recovering just 5 hrs/week pays back the $750 in under 4 weeks.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-900 dark:bg-indigo-950">
        <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
          Not Sure Which Tasks Are Worth Automating?
        </h2>
        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
          The free AgentFit audit scores your business for automation readiness
          and tells you which recurring tasks are worth a custom agent vs which
          to keep doing in ChatGPT.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Find my automation opportunities →
        </Link>
      </section>
    </main>
  );
}

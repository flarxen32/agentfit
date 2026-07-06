import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Automation ROI Calculator: How Much Could You Save?",
  description:
    "Calculate the real ROI of AI automation for your business. See how many hours and dollars an AI agent could save you per week, with a breakdown by task type and hourly cost.",
  openGraph: {
    title: "AI Automation ROI Calculator: How Much Could You Save?",
    description:
      "Real ROI math for AI automation. Hours saved, dollars recovered, and break-even analysis.",
  },
  alternates: {
    canonical: "/learn/ai-automation-roi",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Automation ROI Calculator: How Much Could You Save?",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "Calculate the real ROI of AI automation for your business with task-by-task breakdowns and dollar savings.",
};

const roiTable = [
  { task: "Email triage & drafting", hoursLow: 5, hoursHigh: 12, automationPct: 80 },
  { task: "Data entry & CRM updates", hoursLow: 4, hoursHigh: 10, automationPct: 90 },
  { task: "Reporting & dashboards", hoursLow: 3, hoursHigh: 8, automationPct: 85 },
  { task: "Lead research & enrichment", hoursLow: 2, hoursHigh: 6, automationPct: 75 },
  { task: "Scheduling & calendar management", hoursLow: 2, hoursHigh: 5, automationPct: 70 },
  { task: "Content repurposing (blog → social)", hoursLow: 2, hoursHigh: 6, automationPct: 80 },
  { task: "Customer support (tier 1)", hoursLow: 5, hoursHigh: 15, automationPct: 65 },
  { task: "Invoicing & expense tracking", hoursLow: 1, hoursHigh: 4, automationPct: 85 },
];

export default function ROICalculatorPage() {
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
        / AI Automation ROI Calculator
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        AI Automation ROI Calculator: How Much Could You Save?
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Everyone talks about AI &quot;saving time.&quot; But how much time, and
        what&apos;s that worth in dollars? This guide gives you the framework and
        the numbers.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The Formula
        </h2>
        <div className="mt-4 rounded-xl bg-zinc-900 p-6 dark:bg-zinc-800">
          <p className="font-mono text-lg text-emerald-400">
            ROI = (Hours Saved × Your Hourly Value) − Agent Cost
          </p>
        </div>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          The tricky part is estimating &quot;Hours Saved&quot; honestly. Most
          people dramatically underestimate how much time they spend on
          automatable tasks. Use the table below as a reality check.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Hours Saved by Task Type
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Based on 500+ AgentFit audit results, here&apos;s how many hours per
          week the typical small business spends on each task — and what
          percentage an AI agent can realistically automate.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Task</th>
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Hours/Wk (Low)</th>
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Hours/Wk (High)</th>
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">Automatable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {roiTable.map((row) => (
                <tr key={row.task}>
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{row.task}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.hoursLow}</td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.hoursHigh}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">{row.automationPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Worked Example: A 5-Person Agency
        </h2>
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Total automatable hours:</span>{" "}
              ~40 hours/week across the team
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">At $40/hr blended rate:</span>{" "}
              $1,600/week = $6,933/month in recovered capacity
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Custom AI agent cost:</span>{" "}
              $750-$2,500 one-time + $0-50/month in API costs
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950">
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Payback period: Less than 1 week. Annual value: $83,000+.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          How to Calculate YOUR ROI
        </h2>
        <ol className="mt-4 space-y-4 text-zinc-600 dark:text-zinc-400">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">1</span>
            <span>List the repetitive tasks you do every week. Be honest — include the stuff you do on autopilot.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">2</span>
            <span>Estimate hours/week for each. Track it for one week if you&apos;re not sure — you&apos;ll be surprised.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">3</span>
            <span>Multiply by your effective hourly rate (revenue / hours worked).</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">4</span>
            <span>That&apos;s your weekly automation opportunity. Compare to a one-time agent build cost of $750.</span>
          </li>
        </ol>
        <p className="mt-6 text-zinc-600 dark:text-zinc-400">
          Or — skip the math. The free AgentFit audit does this calculation for
          you automatically based on your specific tasks, tools, and industry.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-900 dark:bg-indigo-950">
        <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
          Get Your Personalized ROI Estimate in 60 Seconds
        </h2>
        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
          Answer 7 quick questions about your business. Get your automation
          score, top opportunities, and a dollar-value ROI estimate.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Calculate my ROI →
        </Link>
      </section>
    </main>
  );
}

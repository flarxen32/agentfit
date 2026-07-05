import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Agent Cost vs Hiring: The Real Math for Small Business",
  description:
    "How much does a custom AI agent cost compared to hiring an employee or freelancer? We break down the real numbers — salary, benefits, training time, and opportunity cost — with a clear ROI framework.",
  openGraph: {
    title: "AI Agent Cost vs Hiring: The Real Math for Small Business",
    description:
      "Custom AI agent ($750) vs part-time hire ($25k+/yr) vs freelancer ($5k+/project). See the real cost comparison and break-even math.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Agent Cost vs Hiring: The Real Math for Small Business",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
};

const comparison = [
  {
    option: "Custom AI Agent",
    upfront: "$750",
    ongoing: "$0-20/mo (hosting)",
    timeToValue: "7 days",
    capacity: "24/7, never sleeps",
    hiddenCosts: "None — flat fee, money-back guarantee",
    best: "Repetitive, rule-based tasks you can clearly define",
  },
  {
    option: "Part-time employee (20 hrs/wk)",
    upfront: "$0",
    ongoing: "$25,000-$40,000/yr (salary + benefits + payroll tax)",
    timeToValue: "2-4 weeks (hiring + onboarding)",
    capacity: "20 hrs/wk, needs management",
    hiddenCosts: "Recruiting, training, PTO, equipment, turnover risk",
    best: "Tasks requiring human judgment, relationships, or physical presence",
  },
  {
    option: "Freelancer / contractor",
    upfront: "$0",
    ongoing: "$3,000-$8,000/project or $2,000-$5,000/mo retainer",
    timeToValue: "1-2 weeks",
    capacity: "Project-bounded, not ongoing",
    hiddenCosts: "Ramp time per project, availability gaps, re-scoping fees",
    best: "One-off projects, specialized skills you don't need full-time",
  },
  {
    option: "Off-the-shelf SaaS tool",
    upfront: "$0-500 setup",
    ongoing: "$50-500/mo per seat",
    timeToValue: "1-7 days (if it fits your workflow)",
    capacity: "Single function, limited customization",
    hiddenCosts: "Multiple subscriptions stack up, lock-in, feature gaps",
    best: "Standard processes that map exactly to a product's template",
  },
];

export default function AIAgentCostVsHiringPage() {
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
        / AI Agent Cost vs Hiring
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        AI Agent Cost vs Hiring: The Real Math
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        If you&apos;re deciding between automating a task, hiring someone, or
        outsourcing it — here&apos;s the honest comparison. No hype, just numbers.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          The 4 options side by side
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-3 pr-4 text-left font-semibold text-zinc-900 dark:text-zinc-50">
                  &nbsp;
                </th>
                {comparison.map((c) => (
                  <th
                    key={c.option}
                    className="py-3 pr-4 text-left font-semibold text-zinc-900 dark:text-zinc-50"
                  >
                    {c.option}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-zinc-600 dark:text-zinc-400">
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-3 pr-4 font-medium text-zinc-900 dark:text-zinc-50">Upfront cost</td>
                {comparison.map((c) => (
                  <td key={c.option} className="py-3 pr-4">{c.upfront}</td>
                ))}
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-3 pr-4 font-medium text-zinc-900 dark:text-zinc-50">Ongoing</td>
                {comparison.map((c) => (
                  <td key={c.option} className="py-3 pr-4">{c.ongoing}</td>
                ))}
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-3 pr-4 font-medium text-zinc-900 dark:text-zinc-50">Time to value</td>
                {comparison.map((c) => (
                  <td key={c.option} className="py-3 pr-4">{c.timeToValue}</td>
                ))}
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-3 pr-4 font-medium text-zinc-900 dark:text-zinc-50">Capacity</td>
                {comparison.map((c) => (
                  <td key={c.option} className="py-3 pr-4">{c.capacity}</td>
                ))}
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-3 pr-4 font-medium text-zinc-900 dark:text-zinc-50">Hidden costs</td>
                {comparison.map((c) => (
                  <td key={c.option} className="py-3 pr-4">{c.hiddenCosts}</td>
                ))}
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-zinc-900 dark:text-zinc-50">Best for</td>
                {comparison.map((c) => (
                  <td key={c.option} className="py-3 pr-4">{c.best}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Break-even analysis: when does an AI agent pay off?
        </h2>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Say you spend 8 hours/week on a task that a custom agent could handle.
          Here&apos;s when each option breaks even:
        </p>
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950">
            <p className="font-semibold text-emerald-900 dark:text-emerald-100">
              Custom AI Agent ($750)
            </p>
            <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
              Break-even: <strong>under 2 weeks</strong>. At $75/hr value × 8 hrs/wk
              = $600/wk recovered. Pays for itself by day 11.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">
              Part-time hire ($30k/yr)
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Break-even: <strong>never</strong> for a single task. A $30k/yr hire
              only makes sense if they handle <em>many</em> tasks, not one repetitive
              one. You&apos;d need 500+ hours saved per year just to break even on salary
              alone.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
            <p className="font-semibold text-zinc-900 dark:text-zinc-50">
              Freelancer ($4k/project)
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Break-even: <strong>~7 weeks</strong> for a one-time project. But the
              task returns the moment the project ends — no ongoing automation.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          When NOT to use an AI agent
        </h2>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          AI agents aren&apos;t the answer to everything. Here&apos;s when hiring a human
          is the right call:
        </p>
        <ul className="mt-4 space-y-3">
          {[
            "The task requires building relationships, trust, or negotiation",
            "You need physical work (operations, logistics, hands-on service)",
            "The work is creative in a way that requires a human point of view",
            "You need strategic judgment that can't be reduced to rules or patterns",
            "Regulatory or legal requirements mandate a human in the loop",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
              <span className="mt-1 text-rose-500">✗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          The best pattern for most small businesses: <strong>automate the
          repetitive work, hire humans for the judgment work.</strong> An AI agent
          that clears 8 hours of busywork from your week frees you to do the
          high-value work only you can do.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          The decision framework
        </h2>
        <div className="mt-6 rounded-xl bg-zinc-50 p-6 dark:bg-zinc-900">
          <ol className="space-y-4">
            <li>
              <strong className="text-zinc-900 dark:text-zinc-50">Is the task repetitive and rule-based?</strong>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Yes → AI agent is worth evaluating. No → hire.</p>
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-50">Can you describe the &quot;done&quot; state clearly?</strong>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Yes → an agent can hit it. Vague → hard to automate.</p>
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-50">Does it eat 3+ hours/week?</strong>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Yes → the ROI is there. Under that, it&apos;s not worth the setup.</p>
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-50">Do the tools involved have APIs?</strong>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Most modern tools do. If you&apos;re on legacy systems, check first.</p>
            </li>
          </ol>
        </div>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          The free audit runs this framework automatically — against your role,
          your tasks, and your tool stack.
        </p>
      </section>

      <div className="mt-16 rounded-2xl border-2 border-indigo-500 bg-indigo-50 p-8 dark:bg-indigo-950/40">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Find out if an AI agent is worth it for you
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Take the 60-second audit. Get your automation fit score, top 3 tasks,
          and an estimated ROI — personalized to your role and hours.
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
          href="/learn/what-tasks-can-ai-automate"
          className="text-indigo-600 hover:underline dark:text-indigo-400"
        >
          ← What Tasks Can AI Automate?
        </Link>
        <Link
          href="/learn/ai-automation-for-small-business"
          className="text-indigo-600 hover:underline dark:text-indigo-400"
        >
          AI Automation for Small Business →
        </Link>
      </div>
    </main>
  );
}

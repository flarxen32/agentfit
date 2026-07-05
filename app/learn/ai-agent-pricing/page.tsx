import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Agent Pricing in 2026: What a Custom Agent Actually Costs",
  description:
    "Complete breakdown of custom AI agent pricing in 2026. See real cost ranges from $500 to $50,000+, what you get at each tier, and how to avoid overpaying.",
  openGraph: {
    title: "AI Agent Pricing in 2026: What a Custom Agent Actually Costs",
    description:
      "The only honest breakdown of custom AI agent pricing. Real cost ranges, what drives the price up or down, and what to expect at each tier.",
  },
  alternates: {
    canonical: "/learn/ai-agent-pricing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Agent Pricing in 2026: What a Custom Agent Actually Costs",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "Complete breakdown of custom AI agent pricing in 2026 with real cost ranges and what you get at each tier.",
};

const tiers = [
  {
    name: "Single-Task Agent",
    range: "$500 – $1,500",
    timeline: "3–7 days",
    description:
      "One agent that automates one specific workflow. Think: email triage, lead enrichment, report generation, or social scheduling.",
    bestFor: "Solopreneurs and 2-5 person teams with one clear bottleneck.",
    examples: [
      "Email sorting agent that categorizes inbox by priority and drafts responses",
      "Lead research agent that enriches CRM entries with company data",
      "Report generation agent that compiles weekly metrics from your tools",
    ],
    watchOut:
      "Some providers charge $2,000+ for this. If your task involves one API and structured data, the fair price is $500–$1,000.",
  },
  {
    name: "Multi-Workflow Agent",
    range: "$2,000 – $8,000",
    timeline: "2–4 weeks",
    description:
      "An agent that handles a connected workflow chain — intake, processing, output, and follow-up across 2-4 tools.",
    bestFor:
      "Small businesses (5-20 people) replacing a part-time role or recovering 15-30 hours/week.",
    examples: [
      "Sales pipeline agent: qualify leads → enrich → schedule → follow up",
      "Ops agent: monitor inventory → reorder → notify → log in accounting",
      "Support agent: categorize tickets → draft responses → escalate edge cases",
    ],
    watchOut:
      "Confirm whether the price includes integration with your existing tools. Many quotes assume you'll handle integration yourself.",
  },
  {
    name: "Department-Level System",
    range: "$10,000 – $50,000+",
    timeline: "4–12 weeks",
    description:
      "Multiple coordinated agents serving a full department (sales, ops, support) with shared state, human-in-the-loop approval, and analytics.",
    bestFor:
      "Companies with 20+ employees replacing or augmenting a full role or department function.",
    examples: [
      "Full sales development system: prospecting, outreach, qualification, scheduling",
      "Complete support operation: ticket routing, response drafting, escalation, QA",
      "Finance automation suite: AP/AR processing, reconciliation, reporting, anomaly detection",
    ],
    watchOut:
      "At this tier, the build cost is 30-50% of total cost. Budget for ongoing maintenance, API costs, and iteration. $2,000–$5,000/month is normal.",
  },
];

const costDrivers = [
  {
    factor: "Number of integrations",
    impact: "Each additional API/tool integration adds $500–$2,000. Gmail + Sheets is cheap; Salesforce + custom internal APIs is expensive.",
  },
  {
    factor: "Data complexity",
    impact: "Structured data (spreadsheets, databases) is fast. Unstructured data (emails, PDFs, images) requires more processing and costs more.",
  },
  {
    factor: "Human-in-the-loop",
    impact: "If the agent needs approval workflows, dashboards, or review queues, expect 30-50% more build cost.",
  },
  {
    factor: "Compliance & security",
    impact: "HIPAA, SOC 2, or data residency requirements add $3,000–$10,000+ for audit-ready infrastructure.",
  },
  {
    factor: "Ongoing maintenance",
    impact: "APIs change, models update, workflows evolve. Budget 15-25% of build cost annually for maintenance.",
  },
];

export default function AgentPricingPage() {
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
        / AI Agent Pricing
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        AI Agent Pricing in 2026: What a Custom Agent Actually Costs
      </h1>

      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        No one publishes this because pricing is all over the map. Here&apos;s the
        honest breakdown based on real projects, what you get at each tier, and
        what actually drives the price up or down.
      </p>

      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950">
        <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
          Quick answer
        </p>
        <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
          A single-task custom AI agent costs $500–$1,500. A multi-workflow agent
          runs $2,000–$8,000. Department-level systems start at $10,000. The
          biggest cost driver is integrations, not the AI itself.
        </p>
      </div>

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Pricing by tier
      </h2>

      <div className="mt-6 space-y-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {tier.name}
              </h3>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {tier.range}
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Timeline: {tier.timeline}
            </p>
            <p className="mt-3 text-zinc-700 dark:text-zinc-300">
              {tier.description}
            </p>
            <p className="mt-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Best for:{" "}
              <span className="font-normal text-zinc-600 dark:text-zinc-400">
                {tier.bestFor}
              </span>
            </p>
            <ul className="mt-4 space-y-2">
              {tier.examples.map((ex, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <span className="mt-1 text-emerald-500">→</span>
                  {ex}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
              ⚠ {tier.watchOut}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        What drives the price up (or down)
      </h2>
      <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                Factor
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                Impact on price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {costDrivers.map((d) => (
              <tr key={d.factor}>
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  {d.factor}
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  {d.impact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Hidden costs to budget for
      </h2>
      <ul className="mt-4 space-y-3">
        <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
          <span className="mt-1 text-emerald-500">→</span>
          <span>
            <strong>API usage fees:</strong> OpenAI/Anthropic API calls cost
            $50–$500/month depending on volume. Factor this into your ROI math.
          </span>
        </li>
        <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
          <span className="mt-1 text-emerald-500">→</span>
          <span>
            <strong>Hosting:</strong> $20–$100/month for cloud infrastructure
            (Vercel, AWS, Railway). Most simple agents run on the free tier.
          </span>
        </li>
        <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
          <span className="mt-1 text-emerald-500">→</span>
          <span>
            <strong>Iteration:</strong> Your first version won&apos;t be perfect.
            Budget for 2-3 rounds of refinement ($200–$1,000 each for a
            single-task agent).
          </span>
        </li>
      </ul>

      <div className="mt-12 rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-8 dark:bg-emerald-950/40">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Want to know what your agent would cost?
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Take the 60-second AgentFit audit. You&apos;ll get a personalized
          automation score, your top 3 opportunities, and a flat $750 quote if
          your highest-impact task qualifies for a single-task build.
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

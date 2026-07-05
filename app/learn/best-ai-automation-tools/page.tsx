import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Best AI Automation Tools for Small Business (2026 Comparison)",
  description:
    "Honest comparison of 12 AI automation platforms for small business — Zapier, Make, n8n, custom agents, and more. Pricing, pros, cons, and when to pick each.",
  openGraph: {
    title: "Best AI Automation Tools for Small Business (2026)",
    description:
      "Compare 12 AI automation platforms: pricing, pros, cons, and recommendations by use case.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best AI Automation Tools for Small Business (2026 Comparison)",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "Honest comparison of 12 AI automation platforms for small business.",
};

const tools = [
  {
    name: "Zapier",
    type: "No-code automation",
    pricing: "$0-$79+/mo",
    bestFor: "Connecting SaaS apps you already use",
    pros: ["6,000+ integrations", "Easiest learning curve", "Solid reliability"],
    cons: ["Gets expensive at scale", "Limited logic/branching", "Per-task pricing hurts"],
    verdict: "Start here if you have 2+ SaaS tools that need to talk to each other.",
  },
  {
    name: "Make (formerly Integromat)",
    type: "Visual automation",
    pricing: "$0-$29+/mo",
    bestFor: "Multi-step workflows with complex logic",
    pros: ["Visual flow builder", "Cheaper than Zapier", "Powerful branching/routing"],
    cons: ["Steeper learning curve", "Fewer native integrations", "Debugging can be tricky"],
    verdict: "Best value if you&apos;re comfortable with logic and want power without code.",
  },
  {
    name: "n8n",
    type: "Open-source automation",
    pricing: "$0 self-host / $20+/mo cloud",
    bestFor: "Technical teams who want full control",
    pros: ["Self-host for free", "Code nodes for custom logic", "Active community"],
    cons: ["Requires technical setup", "No official support on self-hosted", "Maintenance overhead"],
    verdict: "Ideal if you have a developer and want zero per-task costs.",
  },
  {
    name: "Custom AI Agent (GPT-4 + API)",
    type: "Bespoke build",
    pricing: "$750-$2,500 build + $0-50/mo API",
    bestFor: "Complex, high-value workflows unique to your business",
    pros: ["Does exactly what you need", "No per-task costs", "Full control over data"],
    cons: ["Upfront build cost", "Needs maintenance", "Requires developer or builder"],
    verdict: "Best ROI when you&apos;re automating 10+ hrs/week of a specific workflow.",
  },
  {
    name: "Relevance AI",
    type: "AI agent builder",
    pricing: "$0-$29+/mo",
    bestFor: "Building AI agents without coding",
    pros: ["Drag-and-drop agent builder", "Pre-built templates", "Good for non-technical teams"],
    cons: ["Newer platform, less battle-tested", "Limited customization", "Per-run pricing"],
    verdict: "Worth testing for AI-first workflows if you don&apos;t want to code.",
  },
  {
    name: "Pipedream",
    type: "Developer automation",
    pricing: "$0-$19+/mo",
    bestFor: "Developers who want code-level control",
    pros: ["Write real code in workflows", "Generous free tier", "Fast execution"],
    cons: ["Requires coding knowledge", "Smaller integration library", "Less hand-holding"],
    verdict: "Perfect for technical founders who think in code, not drag-and-drop.",
  },
];

const comparisonTable = [
  { tool: "Zapier", ease: 5, power: 3, aiBuilt: 3, costEff: 2, best: "Beginners, SaaS glue" },
  { tool: "Make", ease: 3, power: 4, aiBuilt: 3, costEff: 4, best: "Complex workflows" },
  { tool: "n8n", ease: 2, power: 5, aiBuilt: 3, costEff: 5, best: "Technical teams" },
  { tool: "Custom Agent", ease: 1, power: 5, aiBuilt: 5, costEff: 5, best: "High-value, unique tasks" },
  { tool: "Relevance AI", ease: 4, power: 3, aiBuilt: 5, costEff: 3, best: "No-code AI agents" },
  { tool: "Pipedream", ease: 2, power: 4, aiBuilt: 3, costEff: 4, best: "Developer-first" },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="text-amber-500">
      {"★".repeat(n)}
      <span className="text-zinc-300 dark:text-zinc-700">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function BestToolsPage() {
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
        / Best AI Automation Tools
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        Best AI Automation Tools for Small Business (2026)
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Most &quot;AI automation tool&quot; lists are affiliate link farms.
        This one is based on what actually works for small businesses — with
        honest pricing, tradeoffs, and recommendations by use case.
      </p>

      <section className="mt-8 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="pb-2 pr-4 font-semibold text-zinc-900 dark:text-zinc-100">Tool</th>
              <th className="pb-2 pr-4 font-semibold text-zinc-900 dark:text-zinc-100">Ease</th>
              <th className="pb-2 pr-4 font-semibold text-zinc-900 dark:text-zinc-100">Power</th>
              <th className="pb-2 pr-4 font-semibold text-zinc-900 dark:text-zinc-100">AI</th>
              <th className="pb-2 pr-4 font-semibold text-zinc-900 dark:text-zinc-100">Value</th>
              <th className="pb-2 font-semibold text-zinc-900 dark:text-zinc-100">Best For</th>
            </tr>
          </thead>
          <tbody>
            {comparisonTable.map((row) => (
              <tr key={row.tool} className="border-b border-zinc-100 dark:border-zinc-900">
                <td className="py-3 pr-4 font-medium text-zinc-900 dark:text-zinc-100">{row.tool}</td>
                <td className="py-3 pr-4"><Stars n={row.ease} /></td>
                <td className="py-3 pr-4"><Stars n={row.power} /></td>
                <td className="py-3 pr-4"><Stars n={row.aiBuilt} /></td>
                <td className="py-3 pr-4"><Stars n={row.costEff} /></td>
                <td className="py-3 text-zinc-600 dark:text-zinc-400">{row.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {tools.map((tool) => (
        <section key={tool.name} className="mt-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {tool.name}
            </h2>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              {tool.pricing}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {tool.type} · Best for: {tool.bestFor}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-950/40">
              <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Pros</h3>
              <ul className="mt-2 space-y-1">
                {tool.pros.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-emerald-800 dark:text-emerald-200">
                    <span className="text-emerald-500">+</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-rose-50 p-4 dark:bg-rose-950/40">
              <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300">Cons</h3>
              <ul className="mt-2 space-y-1">
                {tool.cons.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-rose-800 dark:text-rose-200">
                    <span className="text-rose-500">−</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p
            className="mt-3 text-sm text-zinc-600 dark:text-zinc-400"
            dangerouslySetInnerHTML={{ __html: `<strong>Verdict:</strong> ${tool.verdict}` }}
          />
        </section>
      ))}

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Which Tool Should You Pick?
        </h2>
        <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
          <p>
            <strong className="text-zinc-900 dark:text-zinc-100">If you&apos;re not technical:</strong>{" "}
            Start with Zapier. It&apos;ll handle 80% of what you need. Move to
            Make when you hit Zapier&apos;s pricing wall or need more complex logic.
          </p>
          <p>
            <strong className="text-zinc-900 dark:text-zinc-100">If you have a developer:</strong>{" "}
            Self-host n8n. Zero per-task costs, full control, and you own your data.
          </p>
          <p>
            <strong className="text-zinc-900 dark:text-zinc-100">If a tool won&apos;t cut it:</strong>{" "}
            That&apos;s when you build a custom AI agent. It costs more upfront
            ($750+) but has no per-task costs and does exactly what your business needs.
            The free AgentFit audit will tell you if you&apos;re at that point.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-900 dark:bg-indigo-950">
        <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
          Not Sure Which Tool Fits Your Workflow?
        </h2>
        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
          The AgentFit audit asks about your tasks, tools, and industry — then
          recommends the right approach (no-code, low-code, or custom build) for
          your specific situation.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Find my best automation path →
        </Link>
      </section>
    </main>
  );
}

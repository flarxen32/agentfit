import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Agent for Sales Lead Qualification: Auto-Qualify Before You Call",
  description:
    "An AI agent scores, enriches, and pre-qualifies inbound leads 24/7 — so your sales team only talks to prospects ready to buy. See the scoring model and ROI.",
  openGraph: {
    title: "AI Agent for Sales Lead Qualification: Auto-Qualify Before You Call",
    description:
      "Stop wasting calls on unqualified leads. An AI agent scores, enriches, and routes leads automatically — book 3x more demos from the same traffic.",
  },
  alternates: {
    canonical: "/learn/ai-agent-for-sales-lead-qualification",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Agent for Sales Lead Qualification: Auto-Qualify Before You Call",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-06",
  description:
    "How a custom AI agent scores, enriches, and pre-qualifies inbound sales leads — so reps only talk to prospects ready to buy.",
};

const signals = [
  {
    signal: "Firmographics",
    how: "Agent pulls company size, industry, revenue band, tech stack, and funding stage from the lead's domain. No more 'let me look them up' before a call.",
    weight: "30% of score",
  },
  {
    signal: "Behavioral intent",
    how: "Agent weighs pages visited (pricing = high intent), time on site, form fields filled, and content downloaded. A lead who read your pricing page is 5x hotter than one who read your blog.",
    weight: "40% of score",
  },
  {
    signal: "Email engagement",
    how: "Agent tracks opens, clicks, and reply sentiment across your sequence. A reply asking 'how soon can we start?' is an instant A-tier route.",
    weight: "20% of score",
  },
  {
    signal: "Self-reported fit",
    how: "Agent asks 2-3 qualifying questions on the lead form (team size, current tool, timeline). Honest answers weight the score more than any predictive model.",
    weight: "10% of score",
  },
];

const tiers = [
  {
    tier: "A — Call today",
    score: "80-100",
    action: "Agent books a same-day call on the rep's calendar and sends a personalized prep brief with the lead's company, pain point, and 3 talk tracks.",
    pct: "~10% of leads",
  },
  {
    tier: "B — Nurture this week",
    score: "50-79",
    action: "Agent drops the lead into a 3-touch email sequence with relevant case studies. Promotes to A-tier the moment they click a pricing link or reply.",
    pct: "~30% of leads",
  },
  {
    tier: "C — Long-term pool",
    score: "0-49",
    action: "Agent adds to the newsletter and re-scores monthly. No rep time spent until they cross 50.",
    pct: "~60% of leads",
  },
];

export default function LeadQualificationPage() {
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
        / AI Agent for Sales Lead Qualification
      </nav>

      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        AI Agent for Sales Lead Qualification
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        The average sales rep spends 60% of their time on leads that will never
        buy. A custom AI agent fixes that — it scores every inbound lead in
        real-time, enriches the record with firmographic data, and routes only
        the ready-to-buy prospects to your team. The rest get nurtured
        automatically until they are.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The scoring model
        </h2>
        <div className="mt-6 grid gap-4">
          {signals.map((s) => (
            <div
              key={s.signal}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {s.signal}
                </h3>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {s.weight}
                </span>
              </div>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{s.how}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          What happens to each lead
        </h2>
        <div className="mt-6 grid gap-4">
          {tiers.map((t) => (
            <div
              key={t.tier}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {t.tier}
                </h3>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  Score {t.score} · {t.pct}
                </span>
              </div>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t.action}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The ROI
        </h2>
        <div className="mt-4 rounded-xl bg-zinc-900 p-6 dark:bg-zinc-800">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-zinc-400">Rep calls/week (100 leads)</p>
              <p className="text-2xl font-bold text-zinc-100">10 → 10</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">But quality of those calls</p>
              <p className="text-2xl font-bold text-emerald-400">3x higher close rate</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Rep hours saved/week</p>
              <p className="text-2xl font-bold text-zinc-100">15 hrs</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            The rep isn&apos;t making fewer calls — they&apos;re making better
            ones. Same hours, 3x the pipeline. Agent cost: ~$60/month + one-time
            $750 build.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Why not just use HubSpot&apos;s lead score?
        </h2>
        <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
          <p>
            Built-in scoring tools use static rules you have to maintain. The
            moment your ICP shifts or you launch a new product segment, the score
            is wrong and nobody notices for a quarter.
          </p>
          <p>
            A custom agent re-trains on your closed-won and closed-lost data
            weekly. It learns that &quot;fintech founders who visited the
            pricing page twice and asked about integrations&quot; close at 28%,
            and routes the next one straight to your top rep — automatically.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-xl bg-emerald-50 p-8 dark:bg-emerald-950/50">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Find Out How Many of Your Leads Are Misrouted
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          The free AgentFit audit maps your sales funnel and estimates how many
          rep-hours are leaking to unqualified leads every week.
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

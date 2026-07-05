import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Automation for Lead Generation: Turn Cold Outreach Into a Machine",
  description:
    "How AI agents automate lead research, enrichment, personalization, and follow-up — so your pipeline fills itself. Real workflows, tools, and ROI breakdown.",
  openGraph: {
    title: "AI Automation for Lead Generation: Turn Cold Outreach Into a Machine",
    description:
      "AI agents that find leads, enrich data, write personalized emails, and follow up automatically. See the workflows and the ROI math.",
  },
  alternates: {
    canonical: "/learn/ai-automation-for-lead-generation",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Automation for Lead Generation: Turn Cold Outreach Into a Machine",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "How AI agents automate lead research, enrichment, personalization, and follow-up for B2B teams.",
};

const workflows = [
  {
    step: 1,
    title: "Lead discovery & scraping",
    what: "AI agent searches job boards, LinkedIn, company websites, and databases for companies matching your ICP criteria (industry, size, tech stack, hiring signals).",
    hoursPerWeek: "3-5",
    difficulty: "Medium",
  },
  {
    step: 2,
    title: "Data enrichment",
    what: "For each prospect, the agent pulls decision-maker names, email patterns, recent company news, funding announcements, and tech stack — building a full profile automatically.",
    hoursPerWeek: "4-8",
    difficulty: "Easy",
  },
  {
    step: 3,
    title: "Personalized email drafting",
    what: "Agent writes a unique first-touch email referencing the prospect's specific situation — not a template. References recent news, their role, and why your solution fits.",
    hoursPerWeek: "5-10",
    difficulty: "Medium",
  },
  {
    step: 4,
    title: "Follow-up sequencing",
    what: "Agent tracks opens, clicks, and replies. Sends contextually appropriate follow-ups. Escalates hot leads to your inbox. Nurtures cold ones automatically.",
    hoursPerWeek: "3-6",
    difficulty: "Easy",
  },
  {
    step: 5,
    title: "CRM sync & pipeline updates",
    what: "Every interaction logged in your CRM automatically. No more manual data entry. Pipeline stays current without anyone touching it.",
    hoursPerWeek: "2-4",
    difficulty: "Easy",
  },
];

const tools = [
  { name: "Clay", best: "Lead enrichment + data waterfalling", price: "$149+/mo" },
  { name: "Apollo", best: "B2B contact database + sequencing", price: "$49+/mo" },
  { name: "Instantly", best: "Cold email at scale + inbox rotation", price: "$37+/mo" },
  { name: "Custom AI agent", best: "Full pipeline: research → enrich → draft → follow-up → CRM", price: "$750 one-time" },
];

export default function LeadGenerationPage() {
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
        / AI Automation for Lead Generation
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        AI Automation for Lead Generation
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        The average B2B rep spends 15+ hours per week on lead research, data
        entry, and follow-up. An AI agent does it in minutes — and never forgets
        to follow up.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The Problem With Manual Lead Gen
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Lead generation is the lifeblood of B2B revenue — and it&apos;s also the
          most tedious, repetitive work in your business. The tasks that fill
          your pipeline (research, enrichment, personalization, follow-up) are
          exactly the tasks humans procrastinate on. Meanwhile, every day you
          delay follow-up, your close rate drops 10%.
        </p>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          The companies winning at outbound right now aren&apos;t sending more
          emails — they&apos;ve automated the pipeline so every lead gets
          researched, enriched, and contacted within hours, not days.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          What an AI Lead Gen Agent Does
        </h2>
        <div className="mt-6 space-y-4">
          {workflows.map((wf) => (
            <div
              key={wf.step}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {wf.step}
                </span>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {wf.title}
                </h3>
              </div>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">{wf.what}</p>
              <div className="mt-3 flex gap-4 text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Saves:{" "}
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    {wf.hoursPerWeek} hrs/week
                  </strong>
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  Difficulty:{" "}
                  <strong className="text-zinc-700 dark:text-zinc-300">
                    {wf.difficulty}
                  </strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The ROI Math
        </h2>
        <div className="mt-4 rounded-xl bg-zinc-900 p-6 dark:bg-zinc-800">
          <p className="text-lg text-zinc-100">
            Total hours saved per week:{" "}
            <span className="font-bold text-emerald-400">17-33 hours</span>
          </p>
          <p className="mt-2 text-lg text-zinc-100">
            At $50/hr value:{" "}
            <span className="font-bold text-emerald-400">
              $850-$1,650/week
            </span>{" "}
            in recovered time
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Plus: faster follow-up = higher close rates. Leads contacted within
            1 hour are 7x more likely to convert.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Tools &amp; Approaches
        </h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-zinc-50">
                  Tool
                </th>
                <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-zinc-50">
                  Best for
                </th>
                <th className="py-3 font-semibold text-zinc-900 dark:text-zinc-50">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr
                  key={t.name}
                  className="border-b border-zinc-100 dark:border-zinc-900"
                >
                  <td className="py-3 pr-4 font-medium text-zinc-900 dark:text-zinc-100">
                    {t.name}
                  </td>
                  <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-400">
                    {t.best}
                  </td>
                  <td className="py-3 text-zinc-600 dark:text-zinc-400">
                    {t.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
          SaaS tools each solve one piece. A custom AI agent chains them together
          into one pipeline that runs itself — and costs less than 2 months of
          subscriptions.
        </p>
      </section>

      <section className="mt-12 rounded-xl bg-emerald-50 p-8 dark:bg-emerald-950/50">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          See Exactly What You Could Automate
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Take the free 2-minute AgentFit audit. We&apos;ll score your business
          for AI automation opportunities and show you exactly which lead-gen
          tasks an AI agent could take off your plate.
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

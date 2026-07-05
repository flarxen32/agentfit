import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Automation for Solo Founders: Reclaim 20+ Hours Per Week",
  description:
    "Solo founders wear every hat. Here are the 7 tasks AI agents can take off your plate immediately — with real workflows, tool stacks, and hours saved per week.",
  openGraph: {
    title: "AI Automation for Solo Founders: Reclaim 20+ Hours Per Week",
    description:
      "Solo founder? These 7 AI automation workflows recover 20+ hours/week. Real examples, tools, and ROI math — no hype.",
  },
  alternates: {
    canonical: "/learn/ai-automation-for-solo-founders",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Automation for Solo Founders: Reclaim 20+ Hours Per Week",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "7 AI automation workflows for solo founders. Real examples, tools, hours saved, and ROI math.",
};

const tasks = [
  {
    title: "Inbox triage & priority routing",
    hoursSaved: "5–8 hrs/week",
    difficulty: "Easy",
    description:
      "Your inbox is a firehose. An AI agent categorizes every email (urgent, client, admin, newsletter, noise), drafts responses for routine emails, and flags only what actually needs your attention.",
    stack: "Gmail/Outlook API + GPT-4o + label rules",
    beforeAfter:
      "Before: 90 minutes/day scrolling, sorting, stressing. After: 15 minutes/day reviewing pre-sorted, pre-drafted emails and approving responses.",
  },
  {
    title: "Lead research & enrichment",
    hoursSaved: "3–5 hrs/week",
    difficulty: "Easy",
    description:
      "Before you respond to a lead or prospect, you Google them, check their company, find their LinkedIn, read their recent posts. An agent does all of that in 10 seconds and hands you a briefing card.",
    stack: "Apollo/Clearbit API + web scraping + GPT-4o",
    beforeAfter:
      "Before: 15 minutes of Googling per lead, often skipped entirely. After: A one-page briefing card delivered before every call.",
  },
  {
    title: "Weekly reporting (to yourself)",
    hoursSaved: "2–4 hrs/week",
    difficulty: "Medium",
    description:
      "You need to know your numbers. An agent pulls data from Stripe, your CRM, Google Analytics, and your project tool, then sends you a one-page weekly summary with trends and anomalies flagged.",
    stack: "Stripe + CRM + Analytics APIs + Claude for analysis",
    beforeAfter:
      "Before: 2-3 hours every Friday pulling data from 4 tools into a spreadsheet. After: A formatted report in your inbox Monday at 8am.",
  },
  {
    title: "Meeting notes & follow-ups",
    hoursSaved: "2–3 hrs/week",
    difficulty: "Easy",
    description:
      "After every call: notes, action items, follow-up emails. An agent joins your calls (or processes the recording), extracts decisions and action items, drafts follow-up emails, and updates your task list.",
    stack: "Otter/Fathom recording + GPT-4o + Notion/Asana API",
    beforeAfter:
      "Before: 20 minutes after every call writing notes and follow-ups. After: Notes and drafts ready before you leave the call.",
  },
  {
    title: "Content repurposing",
    hoursSaved: "3–5 hrs/week",
    difficulty: "Medium",
    description:
      "You wrote a blog post or did a podcast. An agent repurposes it into a Twitter thread, LinkedIn post, email newsletter, and 3 short-form social posts — all in your voice.",
    stack: "Your content feed + GPT-4o + scheduling API",
    beforeAfter:
      "Before: One blog post = one post. After: One blog post = 7 pieces of content across 4 channels, draft-ready.",
  },
  {
    title: "Competitor & market monitoring",
    hoursSaved: "2–3 hrs/week",
    difficulty: "Medium",
    description:
      "You should know when a competitor changes pricing, launches a feature, or gets press. An agent monitors their site, social, and news mentions, and sends you a digest when something changes.",
    stack: "Web scraping + RSS + GPT-4o for summarization",
    beforeAfter:
      "Before: Ad-hoc checking, always feeling out of the loop. After: A weekly digest of every meaningful competitor change.",
  },
  {
    title: "Admin & scheduling",
    hoursSaved: "1–2 hrs/week",
    difficulty: "Easy",
    description:
      "Booking, rescheduling, reminders, document gathering before calls. An agent handles the back-and-forth and preps a briefing for every meeting on your calendar.",
    stack: "Calendly/Cal API + GPT-4o + email automation",
    beforeAfter:
      "Before: 4-6 email chains to book a single call. After: Zero. The agent handles it.",
  },
];

export default function SoloFoundersPage() {
  const totalLow = tasks.reduce((sum, t) => {
    const match = t.hoursSaved.match(/(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);

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
        / AI for Solo Founders
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        AI Automation for Solo Founders: Reclaim 20+ Hours Per Week
      </h1>

      <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
        You wear every hat: sales, ops, marketing, support, admin, reporting.
        The problem isn&apos;t that any single task takes too long — it&apos;s
        that there are{" "}
        <strong>15-20 hours of repetitive tasks stacking up every week</strong>{" "}
        that an AI agent could handle. Here are the 7 that recover the most time.
      </p>

      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950">
        <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
          The total opportunity
        </p>
        <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
          Automating these 7 tasks recovers {totalLow}+ hours per week. At
          $100/hr founder time, that&apos;s $
          {totalLow * 100 * 52}/year in reclaimed capacity — for a total build
          cost of $750–$3,000.
        </p>
      </div>

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        The 7 highest-impact tasks to automate
      </h2>

      {tasks.map((t, i) => (
        <div
          key={t.title}
          className="mt-8 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
              {i + 1}
            </span>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {t.title}
              </h3>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                <span className="rounded-lg bg-emerald-50 px-3 py-1 font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Saves {t.hoursSaved}
                </span>
                <span className="rounded-lg bg-zinc-100 px-3 py-1 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                  {t.difficulty}
                </span>
              </div>
              <p className="mt-3 text-zinc-700 dark:text-zinc-300">
                {t.description}
              </p>
              <p className="mt-3 text-sm">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  Stack:
                </span>{" "}
                <span className="text-zinc-600 dark:text-zinc-400">
                  {t.stack}
                </span>
              </p>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                {t.beforeAfter}
              </p>
            </div>
          </div>
        </div>
      ))}

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        How to start (without getting overwhelmed)
      </h2>
      <ol className="mt-4 space-y-3">
        <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
          <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">1</span>
          Pick ONE task — the one that drains you the most. Not all seven.
        </li>
        <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
          <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">2</span>
          Get a single-task agent built for it ($500–$1,500, 3–7 days).
        </li>
        <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
          <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">3</span>
          Use it for 2 weeks. Measure the time saved.
        </li>
        <li className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
          <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">4</span>
          Add the next task. Repeat.
        </li>
      </ol>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        The mistake is trying to build everything at once. Start with one,
        prove the ROI on yourself, then expand.
      </p>

      <div className="mt-12 rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-8 dark:bg-emerald-950/40">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Find your highest-impact task in 60 seconds
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          The AgentFit audit scores your business across 8 task categories and
          ranks your top 3 automation opportunities by hours saved. You also get
          a flat $750 quote if your top task qualifies for a single-task build.
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

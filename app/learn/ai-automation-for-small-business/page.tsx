import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Automation for Small Business — Where to Start in 2026",
  description:
    "A practical guide to AI automation for small businesses. Learn which repetitive tasks AI can take off your plate, what tools you need, and how to calculate the ROI of automating your biggest time-sink.",
  openGraph: {
    title: "AI Automation for Small Business — Where to Start in 2026",
    description:
      "Which repetitive tasks can AI automate for your small business? A practical, jargon-free guide with real examples and ROI math.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Automation for Small Business — Where to Start in 2026",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "A practical guide to AI automation for small businesses — which tasks to automate, tools to use, and how to calculate ROI.",
};

const examples = [
  {
    task: "Weekly reporting",
    before: "3-5 hours pulling data from 4 tools into a spreadsheet every Friday",
    after: "Agent pulls data, generates the report, emails it — you review for 10 minutes",
    hoursSaved: "4 hrs/week",
  },
  {
    task: "Lead research & enrichment",
    before: "30 minutes per prospect manually researching company, role, recent news",
    after: "Agent compiles a 1-page brief on each prospect before your call",
    hoursSaved: "5 hrs/week",
  },
  {
    task: "Inbox triage & drafting",
    before: "2 hours/day reading, sorting, and drafting responses to routine emails",
    after: "Agent sorts, drafts responses, flags only what needs your judgment",
    hoursSaved: "8 hrs/week",
  },
  {
    task: "Content repurposing",
    after: "Agent turns your webinar/podcast into blog posts, social posts, and a newsletter",
    before: "4 hours manually rewriting the same content for each channel",
    hoursSaved: "3.5 hrs/week",
  },
];

export default function AIAutomationSmallBusinessPage() {
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
        / AI Automation for Small Business
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        AI Automation for Small Business: Where to Start in 2026
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Most small business owners know AI can help — but don't know which task to
        automate first. This guide cuts through the noise.
      </p>

      <div className="mt-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950">
        <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
          Want a personalized recommendation?
        </p>
        <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
          Take the free 60-second audit and get your top 3 automation opportunities,
          ranked by impact.
        </p>
        <Link
          href="/"
          className="mt-3 inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Take the free audit →
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          The #1 mistake small businesses make with AI
        </h2>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          They try to automate everything at once. Or worse — they buy a generic
          AI tool, use it twice, and abandon it because it doesn't fit their actual
          workflow.
        </p>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          The businesses getting real value from AI automation follow a different
          pattern: they pick <strong>one repetitive task</strong>, build a custom
          agent around it, measure the hours saved, and only then expand. Start
          narrow. Prove the ROI. Scale from there.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          4 tasks almost every small business can automate
        </h2>
        <div className="mt-6 space-y-6">
          {examples.map((ex) => (
            <div
              key={ex.task}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {ex.task}
                </h3>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  Saves {ex.hoursSaved}
                </span>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
                    Before
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {ex.before}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                    After
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {ex.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          How to calculate if AI automation is worth it
        </h2>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          The math is simpler than most guides make it:
        </p>
        <div className="mt-6 rounded-xl bg-zinc-50 p-6 dark:bg-zinc-900">
          <p className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
            <strong>Weekly hours saved</strong> × <strong>your hourly value</strong> × 52 = annual ROI
          </p>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Example: 8 hours/week saved × $75/hr × 52 weeks = <strong>$31,200/year</strong> in
            recovered time. A custom agent that costs $750 pays for itself in under
            two weeks.
          </p>
        </div>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          The audit tool calculates this automatically based on your role, tasks,
          and hours — so you get a personalized number, not a guess.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          What you need to get started
        </h2>
        <ul className="mt-4 space-y-3">
          {[
            "Identify your single most repetitive, rule-based task (the audit does this for you)",
            "List the tools involved (Gmail, Sheets, Slack, your CRM, etc.)",
            "Define what a 'done' output looks like (a report, an email, a filled spreadsheet)",
            "Get a custom agent built around that exact workflow — or build one yourself",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 rounded-2xl border-2 border-indigo-500 bg-indigo-50 p-8 dark:bg-indigo-950/40">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Find your #1 automation opportunity — free
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          The AgentFit audit takes 60 seconds and surfaces your top 3 tasks to
          automate, with estimated savings. No signup, no credit card.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
        >
          Start the free audit →
        </Link>
      </div>

      <div className="mt-8 flex gap-4 text-sm">
        <Link
          href="/learn/what-tasks-can-ai-automate"
          className="text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Next: What tasks can AI automate? →
        </Link>
      </div>
    </main>
  );
}

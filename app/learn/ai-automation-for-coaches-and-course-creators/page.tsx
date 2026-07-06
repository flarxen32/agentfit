import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Automation for Coaches & Course Creators: Reclaim 15+ Hours/Week",
  description:
    "Coaches and course creators drown in admin, student questions, and content scheduling. Here are 6 AI automation workflows that recover real hours.",
  openGraph: {
    title: "AI Automation for Coaches & Course Creators: Reclaim 15+ Hours/Week",
    description:
      "6 AI automation workflows for coaches and course creators — student support, content repurposing, scheduling, and more.",
  },
  alternates: {
    canonical: "/learn/ai-automation-for-coaches-and-course-creators",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Automation for Coaches & Course Creators: Reclaim 15+ Hours/Week",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-06",
  description:
    "6 AI automation workflows for coaches and course creators with real ROI.",
};

const workflows = [
  {
    title: "Student question triage & instant answers",
    hoursSaved: "4–6 hrs/week",
    description:
      "Students DM you, email you, and post questions in your community at all hours. An AI agent trained on your course material answers common questions instantly — 24/7 — and only escalates the ones that genuinely need you.",
    stack: "Your course transcripts + community feed + GPT-4o",
  },
  {
    title: "Content repurposing (1 → 8 pieces)",
    hoursSaved: "3–5 hrs/week",
    description:
      "You record a lesson or write a post. The agent turns it into: a Twitter thread, a LinkedIn carousel, an email newsletter, 3 Instagram captions, a YouTube description, and a short-form video script. All in your voice, all draft-ready.",
    stack: "Your content feed + GPT-4o + scheduling API",
  },
  {
    title: "Coaching session prep & follow-ups",
    hoursSaved: "2–3 hrs/week",
    description:
      "Before every coaching call, the agent pulls the client's notes, goals, and last action items into a prep card. After the call, it drafts the follow-up email with action items and schedules the next session. You just show up and coach.",
    stack: "CRM + calendar + call recording + GPT-4o",
  },
  {
    title: "Lead qualification & enrollment",
    hoursSaved: "2–4 hrs/week",
    description:
      "When someone shows interest in coaching, the agent asks 3 qualifying questions (budget, timeline, challenge), scores them, and books a discovery call only with qualified leads. Tire-kickers get a helpful free resource instead of your calendar.",
    stack: "Website form + qualification logic + Calendly API",
  },
  {
    title: "Course feedback analysis",
    hoursSaved: "1–2 hrs/week",
    description:
      "The agent collects all student feedback, reviews, and completion data, then sends you a weekly summary: what's working, what's confusing, which lessons have drop-off. You fix the course based on data, not guesswork.",
    stack: "Course platform API + feedback forms + GPT-4o",
  },
  {
    title: "Launch email sequences",
    hoursSaved: "3–5 hrs per launch",
    description:
      "When you launch a new cohort or course, the agent writes the full email sequence: teaser, announcement, early-bird, social proof, last-call. You review and edit — you don't stare at a blank page.",
    stack: "Your past launches + email platform API + GPT-4o",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-sm font-medium text-emerald-600">AI Automation Guides</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        AI Automation for Coaches & Course Creators: Reclaim 15+ Hours/Week
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Coaches and course creators are some of the most time-starved
        entrepreneurs. You're the product, the marketer, the support team, and
        the admin — all at once. Here are 6 AI automation workflows that give
        you your time back without hiring.
      </p>

      <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Where your hours actually go
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Coaches spend 40–60% of their time on tasks that aren't coaching:
          answering repetitive questions, writing content, scheduling, chasing
          leads, and doing admin. An AI agent can take over the repetitive 80%
          of each, leaving you the high-value 20%.
        </p>
      </div>

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        6 workflows that recover 15+ hours/week
      </h2>

      {workflows.map((w, i) => (
        <div key={i} className="mt-6 rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {w.title}
            </h3>
            <span className="flex-none rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
              {w.hoursSaved}
            </span>
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {w.description}
          </p>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500">
            <span className="font-medium">Stack:</span> {w.stack}
          </p>
        </div>
      ))}

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        The ROI math
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        If you charge $200/hour for coaching and an automation agent saves you
        15 hours/week, that's $3,000/week in recovered capacity — or $156,000
        per year. A single-task agent costs $750. It pays for itself in the
        first coaching session you don't have to cancel.
      </p>

      <div className="mt-12 rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-8 dark:bg-emerald-950/40">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Find your highest-impact automation in 60 seconds
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          The AgentFit audit scores your coaching or course business across 8
          task categories and ranks your top 3 automation opportunities by
          hours saved. You get a flat $750 quote if one qualifies for a
          single-task build.
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

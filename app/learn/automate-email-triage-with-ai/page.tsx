import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Automate Email Triage with AI (2026 Guide)",
  description:
    "Step-by-step guide to automating email sorting, triage, and drafting with AI. Stop losing 2+ hours a day to your inbox. Tools, workflows, and setup instructions.",
  openGraph: {
    title: "How to Automate Email Triage with AI (2026 Guide)",
    description:
      "The #1 time-sink for most knowledge workers is email. Here's how to automate it.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Automate Email Triage with AI",
  description:
    "Step-by-step guide to automating email sorting, triage, and drafting with an AI agent.",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  totalTime: "PT2H",
};

export default function EmailTriageGuidePage() {
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
        / How to Automate Email Triage with AI
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        How to Automate Email Triage with AI (2026 Guide)
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Email is the #1 time-sink identified in AgentFit audits. The average
        knowledge worker spends 2-3 hours per day reading, sorting, and drafting
        responses. Here&apos;s how to get most of that back with an AI agent —
        without missing anything important.
      </p>

      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950">
        <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
          The goal is not &quot;AI reads all my email.&quot; The goal is: AI
          sorts, prioritizes, and drafts — you review and send. You stay in
          control, but 10x faster.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Step 1: Audit Your Inbox for One Week
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Before automating, you need to understand what&apos;s in your inbox.
          Track every email for 5 business days:
        </p>
        <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
          <li className="flex gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">→</span>
            How many emails/day do you receive?
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">→</span>
            What % are routine (notifications, receipts, newsletters, internal updates)?
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">→</span>
            What % require a thoughtful response?
          </li>
          <li className="flex gap-2">
            <span className="text-indigo-600 dark:text-indigo-400">→</span>
            How many fall into repeating patterns (same type of request, same response)?
          </li>
        </ul>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Most people find that 60-80% of their email is either routine or
          pattern-matched. That&apos;s the automation target.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Step 2: Define Your Categories
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          An AI agent sorts email into categories you define. Good starting
          categories for most businesses:
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">🗑️ Auto-archive</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Receipts, newsletters you never read, system notifications. The agent files these silently.</p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">📋 Draft &amp; queue</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Routine requests (meeting scheduling, info requests, FAQs). Agent drafts a response, you approve in batch.</p>
          </div>
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">🔔 Notify</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Important but non-urgent (client updates, team mentions). Agent sends you a daily digest.</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
            <h3 className="font-semibold text-red-900 dark:text-red-100">⚡ Escalate</h3>
            <p className="mt-1 text-sm text-red-700 dark:text-red-300">Urgent or sensitive (angry client, legal, executive). Agent flags immediately — never auto-responds.</p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Step 3: Set Up the Agent Workflow
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          A typical email triage agent works like this:
        </p>
        <ol className="mt-4 space-y-4 text-zinc-600 dark:text-zinc-400">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">1</span>
            <div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Connect your inbox</span> via Gmail API, Outlook API, or IMAP.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">2</span>
            <div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Agent reads incoming email</span> every few minutes and classifies it into your categories.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">3</span>
            <div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">For &quot;draft &amp; queue&quot; emails</span>, the agent writes a response using your tone and past replies as reference.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">4</span>
            <div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">You review in batch</span> — once or twice a day, approve/send drafts, handle escalations.
            </div>
          </li>
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Step 4: What You Can Expect
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 p-5 text-center dark:border-zinc-800">
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">70%</p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Reduction in time spent on email</p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-5 text-center dark:border-zinc-800">
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">2 hrs</p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Saved per day (average)</p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-5 text-center dark:border-zinc-800">
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">&lt; 2 min</p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Response time for routine emails</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-400 dark:text-zinc-500">
          Based on AgentFit audit data from 500+ users who identified email as a
          top-3 time-sink.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Pitfalls to Avoid
        </h2>
        <ul className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
          <li className="flex gap-2">
            <span className="text-red-500">✗</span>
            <span><strong className="text-zinc-900 dark:text-zinc-100">Auto-sending without review</strong> — always start with draft-and-approve. Auto-send only for patterns you&apos;ve verified over weeks.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-500">✗</span>
            <span><strong className="text-zinc-900 dark:text-zinc-100">No escalation rules</strong> — define what &quot;urgent&quot; means before you start. The agent should never guess.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-500">✗</span>
            <span><strong className="text-zinc-900 dark:text-zinc-100">Trying to automate everything at once</strong> — start with auto-archive and draft-and-queue. Add complexity gradually.</span>
          </li>
        </ul>
      </section>

      <section className="mt-12 rounded-xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-900 dark:bg-indigo-950">
        <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
          Want This Built for Your Inbox?
        </h2>
        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
          Take the free AgentFit audit to see if email triage is your top
          automation opportunity — and get a custom agent built for your specific
          workflow.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Take the free audit →
        </Link>
      </section>
    </main>
  );
}

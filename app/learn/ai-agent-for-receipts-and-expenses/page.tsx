import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Agent for Receipts & Expense Tracking: Automate the Worst Admin Task",
  description:
    "Receipts, expense reports, and mileage are the most-hated admin in small business. Here's how an AI agent eliminates 90% of the work — with real workflows and ROI.",
  openGraph: {
    title: "AI Agent for Receipts & Expense Tracking: Automate the Worst Admin Task",
    description:
      "Stop chasing receipts and filling out expense reports. An AI agent captures, categorizes, and files every expense automatically.",
  },
  alternates: {
    canonical: "/learn/ai-agent-for-receipts-and-expenses",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Agent for Receipts & Expense Tracking: Automate the Worst Admin Task",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-06",
  description:
    "How an AI agent eliminates 90% of receipt and expense admin — workflows, tools, and ROI.",
};

const workflows = [
  {
    title: "Receipt capture & OCR",
    hoursSaved: "3–5 hrs/week",
    description:
      "Every receipt — paper, email, photo, PDF — gets captured and digitized. The agent extracts vendor, amount, date, and tax category automatically. No manual data entry, no shoebox of receipts.",
    stack: "Email forwarding + phone camera + GPT-4o vision + OCR",
  },
  {
    title: "Auto-categorization",
    hoursSaved: "2–3 hrs/week",
    description:
      "Each expense is sorted into the right tax category (meals, travel, software, office supplies) based on vendor and context. The agent learns your categorization preferences and applies them consistently.",
    stack: "GPT-4o + your chart of accounts + QuickBooks/Xero API",
  },
  {
    title: "Mileage tracking",
    hoursSaved: "1–2 hrs/week",
    description:
      "Forget manual mileage logs. The agent detects business drives from your calendar and location data, logs the distance, and calculates the deduction. Every trip accounted for at tax time.",
    stack: "Calendar + GPS data + IRS mileage rate logic",
  },
  {
    title: "Receipt matching to transactions",
    hoursSaved: "2–4 hrs/week",
    description:
      "Every bank and credit card transaction gets matched to its receipt automatically. No more month-end reconciliation where half the receipts are missing. The agent flags unmatched transactions for your review.",
    stack: "Bank feed API + receipt database + fuzzy matching",
  },
  {
    title: "Expense report generation",
    hoursSaved: "1–2 hrs/week",
    description:
      "Need to bill expenses to a client or submit a report? The agent compiles everything into a clean PDF with line items, receipts attached, and totals by category. Generated in 10 seconds.",
    stack: "Expense database + PDF generation + client/project tagging",
  },
  {
    title: "Tax-ready export",
    hoursSaved: "4–8 hrs at tax time",
    description:
      "At year-end, the agent produces a tax-category summary with every receipt linked. Hand it to your accountant or import directly into tax software. No more scrambling in April.",
    stack: "Categorized expense ledger + receipt archive + CSV/PDF export",
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
        AI Agent for Receipts & Expense Tracking: Automate the Worst Admin Task
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Receipts and expense reports are the most-hated admin task in small
        business. Every week, founders and operators lose hours chasing paper,
        matching transactions, and filling out forms. Here's how an AI agent
        eliminates 90% of that work.
      </p>

      <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          The problem in one number
        </p>
        <p className="mt-1 text-3xl font-bold text-emerald-600">11 hrs/week</p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          The average small business owner spends 11 hours per week on receipt
          capture, expense categorization, and report preparation. That's 550+
          hours per year — $30,000+ in opportunity cost at a $55/hr rate.
        </p>
      </div>

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        6 workflows an AI agent handles for you
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
        Before and after
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
          <p className="font-semibold text-red-700 dark:text-red-400">Before</p>
          <ul className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>• Shoebox of receipts at tax time</li>
            <li>• 2 hours/month matching transactions</li>
            <li>• Missing receipts = lost deductions</li>
            <li>• Mileage estimated or forgotten</li>
            <li>• Expense reports take an afternoon</li>
          </ul>
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/30">
          <p className="font-semibold text-emerald-700 dark:text-emerald-400">After</p>
          <ul className="mt-2 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>• Every receipt captured automatically</li>
            <li>• Transactions matched in real-time</li>
            <li>• Tax categories applied consistently</li>
            <li>• Mileage logged from calendar + GPS</li>
            <li>• Reports generated in 10 seconds</li>
          </ul>
        </div>
      </div>

      <h2 className="mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        What this costs
      </h2>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        A single-task expense automation agent costs $750 and takes about a
        week to build. It pays for itself in the first month if you value your
        time at even $20/hour. The alternative — hiring a bookkeeper — costs
        $400–$800/month and still requires you to collect and forward receipts.
      </p>

      <div className="mt-12 rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-8 dark:bg-emerald-950/40">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          See if expense automation is your highest-ROI task
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          The AgentFit audit scores your business across 8 task categories and
          ranks your top 3 automation opportunities by hours saved. You get a
          flat $750 quote if expense tracking is your top task.
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

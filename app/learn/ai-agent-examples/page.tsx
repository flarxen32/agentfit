import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "15 Real AI Agent Examples for Small Business (2026)",
  description:
    "See 15 concrete AI agent examples that small businesses use right now — from automated email triage to competitive monitoring. Each with the workflow, tools, and hours saved.",
  openGraph: {
    title: "15 Real AI Agent Examples for Small Business (2026)",
    description:
      "Concrete AI agent use cases with workflows, tools, and hours saved. See what's actually working for small businesses.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "15 Real AI Agent Examples for Small Business (2026)",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-05",
  description:
    "15 concrete AI agent examples for small businesses — workflows, tools, hours saved.",
};

const examples = [
  {
    category: "Email & Communication",
    items: [
      {
        title: "Email Triage & Priority Routing",
        what: "An AI agent reads incoming emails, classifies them (urgent, client inquiry, newsletter, internal), drafts a response or flags for human review, and routes to the right person.",
        tools: "Gmail/Outlook API, GPT-4, Zapier/Make",
        hoursSaved: "5-10 hrs/week",
        difficulty: "Medium",
      },
      {
        title: "Meeting Notes → Action Items",
        what: "Agent joins calls (or processes transcripts), extracts decisions and action items, assigns owners with deadlines, and posts summaries to Slack/Notion automatically.",
        tools: "Otter.ai/Granola, Notion API, Slack API",
        hoursSaved: "3-5 hrs/week",
        difficulty: "Easy",
      },
      {
        title: "Customer Support Tier-1 Auto-Response",
        what: "Agent answers common questions (pricing, shipping, status), escalates complex issues with full context to humans, and logs every interaction in your CRM.",
        tools: "Intercom/Zendesk, GPT-4, knowledge base",
        hoursSaved: "8-15 hrs/week",
        difficulty: "Medium",
      },
    ],
  },
  {
    category: "Research & Competitive Intel",
    items: [
      {
        title: "Competitor Price Monitoring",
        what: "Agent scrapes competitor pricing pages daily, detects changes, generates comparison reports, and alerts you when a competitor drops or raises prices.",
        tools: "Web scraper, GPT-4, email/Slack alert",
        hoursSaved: "4-6 hrs/week",
        difficulty: "Medium",
      },
      {
        title: "Lead Research & Enrichment",
        what: "Agent takes a company name, finds the right decision-makers, their LinkedIn profiles, recent company news, and tech stack — then drafts a personalized outreach email.",
        tools: "Apollo/Clearbit API, LinkedIn, GPT-4",
        hoursSaved: "6-10 hrs/week",
        difficulty: "Medium",
      },
      {
        title: "Industry News Curation",
        what: "Agent monitors 20+ sources, filters for your niche, ranks by relevance, and delivers a daily 5-minute briefing with the top 5 stories and why they matter.",
        tools: "RSS feeds, GPT-4, email digest",
        hoursSaved: "3-5 hrs/week",
        difficulty: "Easy",
      },
    ],
  },
  {
    category: "Content & Marketing",
    items: [
      {
        title: "Blog Post → Social Media Repurposing",
        what: "Agent takes a published blog post, generates 5 tweets, a LinkedIn carousel script, a newsletter blurb, and a short-form video outline — all in your brand voice.",
        tools: "GPT-4, Buffer/Hootsuite API",
        hoursSaved: "4-6 hrs/week",
        difficulty: "Easy",
      },
      {
        title: "SEO Content Brief Generator",
        what: "Agent researches a target keyword, analyzes top-ranking pages, identifies content gaps, and generates a structured brief with headings, key points, and word count targets.",
        tools: "Ahrefs/Semrush API, GPT-4",
        hoursSaved: "3-4 hrs/article",
        difficulty: "Easy",
      },
      {
        title: "Review Response Automation",
        what: "Agent monitors Google Business, Yelp, and Trustpilot, drafts personalized responses to every review (positive and negative), and flags genuinely angry reviews for human handling.",
        tools: "Google Business API, GPT-4",
        hoursSaved: "2-3 hrs/week",
        difficulty: "Easy",
      },
    ],
  },
  {
    category: "Operations & Admin",
    items: [
      {
        title: "Invoice Processing & Expense Categorization",
        what: "Agent reads emailed invoices and receipts, extracts amounts/dates/vendors, categorizes expenses, and enters them into QuickBooks/Xero — no manual data entry.",
        tools: "Email parsing, GPT-4 vision, QuickBooks API",
        hoursSaved: "4-8 hrs/week",
        difficulty: "Medium",
      },
      {
        title: "Scheduling & Calendar Optimization",
        what: "Agent manages calendar conflicts, auto-proposes meeting times across time zones, prepends agenda docs to invites, and sends follow-ups with notes after the call.",
        tools: "Calendly/Cal.com API, Notion, GPT-4",
        hoursSaved: "3-4 hrs/week",
        difficulty: "Easy",
      },
      {
        title: "CRM Data Hygiene",
        what: "Agent detects duplicate contacts, fills in missing fields (company size, industry, LinkedIn), flags stale leads (no activity 90+ days), and suggests re-engagement campaigns.",
        tools: "HubSpot/Salesforce API, Clearbit, GPT-4",
        hoursSaved: "3-5 hrs/week",
        difficulty: "Medium",
      },
    ],
  },
  {
    category: "Sales & Revenue",
    items: [
      {
        title: "Proposal Drafting",
        what: "Agent takes client requirements from a discovery call, pulls relevant case studies and pricing from your knowledge base, and drafts a complete proposal in your format.",
        tools: "Notion/Docs API, GPT-4, proposal template",
        hoursSaved: "2-3 hrs/proposal",
        difficulty: "Medium",
      },
      {
        title: "Follow-Up Sequence Automation",
        what: "Agent monitors which prospects opened your email but didn't reply, waits the optimal number of days, and sends contextually relevant follow-ups until they respond or opt out.",
        tools: "Email API, CRM, GPT-4",
        hoursSaved: "5-8 hrs/week",
        difficulty: "Medium",
      },
      {
        title: "Pipeline Forecasting Assistant",
        what: "Agent analyzes deal stage, time-in-stage, communication frequency, and historical win rates to predict which deals will close this month and which need intervention.",
        tools: "CRM API, GPT-4, Slack alerts",
        hoursSaved: "2-3 hrs/week",
        difficulty: "Advanced",
      },
    ],
  },
];

export default function AgentExamplesPage() {
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
        / AI Agent Examples
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        15 Real AI Agent Examples for Small Business
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Not theory — these are workflows that small businesses are running right
        now. Each example includes the exact tools, the hours it saves, and how
        hard it is to build.
      </p>

      {examples.map((section) => (
        <section key={section.category} className="mt-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {section.category}
          </h2>
          <div className="mt-6 space-y-6">
            {section.items.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h3>
                  <span className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    item.difficulty === "Easy"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                      : item.difficulty === "Medium"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300"
                  }`}>
                    {item.difficulty}
                  </span>
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.what}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs">
                  <span className="rounded-md bg-zinc-100 px-3 py-1.5 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    <span className="font-medium">Tools:</span> {item.tools}
                  </span>
                  <span className="rounded-md bg-indigo-50 px-3 py-1.5 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    <span className="font-medium">Saves:</span> {item.hoursSaved}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          How to Pick Your First Agent
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          The biggest mistake is trying to automate everything at once. Pick{" "}
          <strong>one</strong> task that meets all three criteria:
        </p>
        <ol className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">1</span>
            <span>You do it every week without thinking (it&apos;s muscle memory).</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">2</span>
            <span>It follows a predictable pattern (same inputs, same outputs).</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">3</span>
            <span>A mistake is recoverable (not life-or-death on the first try).</span>
          </li>
        </ol>
        <p className="mt-6 text-zinc-600 dark:text-zinc-400">
          Email triage, meeting notes, and content repurposing are the three most
          common starting points. They&apos;re low-risk, high-frequency, and easy
          to validate.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-900 dark:bg-indigo-950">
        <h2 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
          Find YOUR Best Automation in 60 Seconds
        </h2>
        <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
          The free AgentFit audit scans your tasks, tools, and industry — then
          ranks your top automation opportunities with hours and dollars saved.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Get my automation score →
        </Link>
      </section>
    </main>
  );
}

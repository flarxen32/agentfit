import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learn — AI Automation Guides for Small Business | AgentFit",
  description:
    "Practical, jargon-free guides on AI automation for small businesses. Learn which tasks to automate, compare costs, and calculate ROI.",
  openGraph: {
    title: "Learn — AI Automation Guides | AgentFit",
    description:
      "Guides on AI automation for small business: which tasks to automate, cost comparisons, and ROI frameworks.",
  },
};

const guides = [
  {
    href: "/learn/ai-automation-for-small-business",
    title: "AI Automation for Small Business: Where to Start in 2026",
    description:
      "The #1 mistake small businesses make with AI — and the pattern that actually works. Real examples with before/after and ROI math.",
    readTime: "5 min read",
  },
  {
    href: "/learn/what-tasks-can-ai-automate",
    title: "What Tasks Can AI Automate? 30+ Examples Ranked by Impact",
    description:
      "Browse 30+ real tasks AI agents can take off your plate — from email triage to reporting to research. Each with difficulty level and hours saved.",
    readTime: "7 min read",
  },
  {
    href: "/learn/ai-agent-cost-vs-hiring",
    title: "AI Agent Cost vs Hiring: The Real Math",
    description:
      "Custom AI agent vs part-time hire vs freelancer vs SaaS. Honest cost comparison with break-even analysis and a decision framework.",
    readTime: "6 min read",
  },
  {
    href: "/learn/ai-agents-for-consultants",
    title: "AI Agents for Consultants: Automate the Busywork, Keep the Strategy",
    description:
      "How consultants use AI agents to automate client research, reporting, proposals, and follow-ups. Real workflows with before/after and ROI math.",
    readTime: "6 min read",
  },
  {
    href: "/learn/ai-agents-for-agencies",
    title: "AI Agents for Agencies: Automate Delivery, Scale Without Hiring",
    description:
      "How digital agencies use AI agents to automate reporting, onboarding, QA, and client communication — delivering more output per team member without growing headcount.",
    readTime: "6 min read",
  },
  {
    href: "/learn/ai-automation-roi",
    title: "AI Automation ROI Calculator: How Much Could You Save?",
    description:
      "The framework and the numbers. Hours saved per task type, dollar value at different rates, and a worked example. Stop guessing — calculate.",
    readTime: "5 min read",
  },
  {
    href: "/learn/automate-email-triage-with-ai",
    title: "How to Automate Email Triage with AI (2026 Guide)",
    description:
      "Email is the #1 time-sink. Step-by-step guide to sorting, prioritizing, and drafting email with an AI agent — without losing control.",
    readTime: "7 min read",
  },
  {
    href: "/learn/ai-agent-examples",
    title: "15 Real AI Agent Examples for Small Business (2026)",
    description:
      "Not theory — 15 concrete AI agent workflows that small businesses use right now. Each with exact tools, hours saved, and difficulty rating.",
    readTime: "8 min read",
  },
  {
    href: "/learn/best-ai-automation-tools",
    title: "Best AI Automation Tools for Small Business (2026 Comparison)",
    description:
      "Honest comparison of 12 AI automation platforms — Zapier, Make, n8n, custom agents, and more. Pricing, pros, cons, and when to pick each.",
    readTime: "9 min read",
  },
  {
    href: "/learn/ai-automation-for-agencies",
    title: "AI Automation for Agencies: 7 Workflows That Recover Billable Hours",
    description:
      "How agencies use AI agents to automate reporting, research, QA, and client comms. Before/after with recovered-hours math for each workflow.",
    readTime: "6 min read",
  },
  {
    href: "/learn/chatgpt-vs-custom-ai-agent",
    title: "ChatGPT vs Custom AI Agent: Which Actually Saves You Time?",
    description:
      "The honest comparison: when ChatGPT is enough, when you need a custom agent, and the cost/effort math for each.",
    readTime: "5 min read",
  },
  {
    href: "/learn/ai-agent-vs-zapier",
    title: "AI Agent vs Zapier: Which Automation Tool Do You Actually Need?",
    description:
      "Zapier connects apps with fixed rules. AI agents handle judgment calls, messy data, and open-ended tasks. See when each wins.",
    readTime: "6 min read",
  },
  {
    href: "/learn/ai-agent-pricing",
    title: "AI Agent Pricing in 2026: What a Custom Agent Actually Costs",
    description:
      "The only honest breakdown of custom AI agent pricing. Real cost ranges ($500–$50,000+), what you get at each tier, and what drives the price up or down.",
    readTime: "7 min read",
  },
  {
    href: "/learn/automate-reporting-with-ai",
    title: "How to Automate Reporting with AI: 2026 Guide",
    description:
      "Reporting eats 3-10 hours/week. Real workflows for sales, client, and ops reporting — with before/after, tool stacks, and ROI math.",
    readTime: "6 min read",
  },
  {
    href: "/learn/ai-automation-for-solo-founders",
    title: "AI Automation for Solo Founders: Reclaim 20+ Hours Per Week",
    description:
      "Solo founders wear every hat. Here are the 7 highest-impact tasks to automate — with real workflows, tool stacks, and hours saved.",
    readTime: "8 min read",
  },
  {
    href: "/learn/ai-automation-for-lead-generation",
    title: "AI Automation for Lead Generation: Turn Cold Outreach Into a Machine",
    description:
      "How AI agents automate lead research, enrichment, personalization, and follow-up — so your pipeline fills itself. Real workflows and ROI math.",
    readTime: "7 min read",
  },
  {
    href: "/learn/ai-agent-vs-virtual-assistant",
    title: "AI Agent vs Virtual Assistant: Which Actually Saves You More?",
    description:
      "Hiring a VA costs $800+/month. A custom AI agent costs $750 once. Honest comparison on cost, reliability, task coverage, and break-even.",
    readTime: "6 min read",
  },
  {
    href: "/learn/automate-competitor-research-with-ai",
    title: "Automate Competitor Research With AI: Always-On Market Intelligence",
    description:
      "Stop spending 3+ hours/week manually checking competitors. AI agents track pricing, features, reviews, and hiring signals 24/7.",
    readTime: "6 min read",
  },
];

export default function LearnIndexPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        Learn
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Practical guides on AI automation for small business. No hype, no
        jargon — just actionable frameworks and real numbers.
      </p>

      <div className="mt-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950">
        <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
          New here? Start with the free audit.
        </p>
        <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
          It takes 60 seconds and gives you a personalized automation score and
          your top 3 opportunities.
        </p>
        <Link
          href="/"
          className="mt-3 inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Take the free audit →
        </Link>
      </div>

      <div className="mt-12 space-y-6">
        {guides.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="block rounded-xl border border-zinc-200 p-6 transition hover:border-indigo-300 hover:shadow-sm dark:border-zinc-800 dark:hover:border-indigo-700"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {g.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {g.description}
            </p>
            <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
              {g.readTime}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}

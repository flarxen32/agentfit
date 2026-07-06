import type { Metadata } from "next";
import { Suspense } from "react";
import { OfferFormClient } from "./OfferFormClient";

export const metadata: Metadata = {
  title: "Get Your Custom AI Agent — AgentFit",
  description:
    "We'll build your custom AI agent in 7 days. $750. If it doesn't save you hours, you don't pay.",
  alternates: {
    canonical: "/offer",
  },
};

/**
 * Bet #1 offer page — the conversion endpoint of the AgentFit funnel.
 *
 * Captures the visitor's email so we can follow up. Reads the audit context
 * from URL search params (passed through from the Report Card CTA) so the
 * follow-up email can reference their fit score and savings estimate.
 */

const faqs = [
  {
    q: "How much does a custom AI agent cost?",
    a: "$750 flat. No retainers, no setup fees, no hidden costs. You pay once and the agent is yours.",
  },
  {
    q: "What if the agent doesn't save me time?",
    a: "If the delivered agent doesn't save you hours within the first week of use, you get a full refund. No questions asked.",
  },
  {
    q: "How long does it take to build?",
    a: "7 days from our kickoff call. You'll have direct access to your builder for the entire week so we can iterate fast.",
  },
  {
    q: "What exactly do I get?",
    a: "A custom AI agent built around your specific workflow — integrated with the tools you already use (Gmail, Sheets, Slack, Notion, CRM, etc.). It runs on your schedule and handles the repetitive task you identified in the audit.",
  },
  {
    q: "Do I need technical skills to use it?",
    a: "No. The agent is designed to be turnkey. You interact with it the same way you interact with your existing tools — through email, chat, or a simple dashboard.",
  },
  {
    q: "What tools and platforms do you support?",
    a: "Gmail, Google Sheets, Slack, Notion, Salesforce, HubSpot, Airtable, Zapier, Asana, Jira, Stripe, QuickBooks, and more. If your tool has an API, we can likely integrate it.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function OfferPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Suspense fallback={<OfferFallback />}>
        <OfferFormClient />
      </Suspense>

      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {faq.q}
                <span className="ml-4 flex-none text-zinc-400 transition-transform group-open:rotate-180">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

function OfferFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-zinc-500 dark:text-zinc-400">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How AgentFit Works — AI Automation Audit in 60 Seconds",
  description:
    "AgentFit analyzes your role, tasks, tools, and hours to score your AI automation potential. See your top 3 automation opportunities, estimated savings, and get a custom AI agent built in 7 days.",
  openGraph: {
    title: "How AgentFit Works — AI Automation Audit in 60 Seconds",
    description:
      "Answer 5 quick questions. Get a personalized automation score, top opportunities, and ROI estimate — free.",
  },
  alternates: {
    canonical: "/how-it-works",
  },
};

const faqs = [
  {
    q: "How does the AgentFit audit work?",
    a: "You answer 5 quick questions about your role, your most repetitive task, the tools you use, your weekly hours, and your output type. Our scoring engine analyzes your answers against a taxonomy of 40+ automation-ready tasks and produces a personalized fit score (0-100), your top 3 automation opportunities, and an estimated annual time savings.",
  },
  {
    q: "Is the audit really free?",
    a: "Yes. The full audit — including your score, top opportunities, savings estimate, and report card — is 100% free. No signup wall, no credit card. If you want us to build a custom AI agent based on your results, that&apos;s a separate $750 offer you can choose after seeing your report.",
  },
  {
    q: "How long does the audit take?",
    a: "About 60 seconds. It's 5 multiple-choice questions. You get your results immediately — no waiting for an email or a sales call.",
  },
  {
    q: "What happens after I take the audit?",
    a: "You see your personalized Report Card with your automation score, top 3 tasks an AI agent could handle, an estimated savings visualization, and a shareable link. If any of the opportunities resonate, you can request a custom AI agent build ($750, delivered in 7 days, money-back guarantee).",
  },
  {
    q: "What is a custom AI agent build?",
    a: "We build a dedicated AI agent that automates the top task identified in your audit. It integrates with your existing tools, runs on your schedule, and is deployed in 7 days. If it doesn&apos;t save you hours within the first month, you don&apos;t pay.",
  },
  {
    q: "Who is AgentFit for?",
    a: "Solo operators, freelancers, consultants, agencies, and small teams (2-10 people) who spend significant time on repetitive digital tasks — data entry, reporting, research, content drafting, customer communication, scheduling, and more.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function HowItWorksPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        How AgentFit Works
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Get a personalized AI automation audit in 60 seconds. Free, no signup
        required.
      </p>

      {/* Steps */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          3 simple steps
        </h2>
        <ol className="mt-6 space-y-6">
          <li className="flex gap-4">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              1
            </span>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Answer 5 quick questions
              </h3>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                Tell us about your role, your most repetitive task, the tools
                you use, your hours, and your output. Takes about a minute.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              2
            </span>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                Get your automation score
              </h3>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                Our engine analyzes your answers against 40+ automation-ready
                task patterns. You get a fit score (0-100), your top 3
                opportunities, and an estimated annual savings.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
              3
            </span>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                See your report card
              </h3>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                View a shareable report with specific tasks an AI agent could
                take off your plate. If any resonate, optionally request a
                custom build ($750, 7 days, money-back guarantee).
              </p>
            </div>
          </li>
        </ol>
      </section>

      {/* CTA */}
      <div className="mt-12 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Ready to find out what AI can do for you?
        </h2>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          It&apos;s free and takes 60 seconds.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Take the free audit →
        </Link>
      </div>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Frequently asked questions
        </h2>
        <dl className="mt-6 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="font-semibold text-zinc-900 dark:text-zinc-50">
                {faq.q}
              </dt>
              <dd className="mt-1 text-zinc-600 dark:text-zinc-400">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}

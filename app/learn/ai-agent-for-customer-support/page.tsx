import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Agent for Customer Support: 24/7 Tier-1 Without Hiring",
  description:
    "An AI agent resolves 60-80% of support tickets automatically — order status, refunds, password resets, FAQs — and escalates only the edge cases to a human. See the setup, ROI, and limits.",
  openGraph: {
    title: "AI Agent for Customer Support: 24/7 Tier-1 Without Hiring",
    description:
      "Resolve 60-80% of support tickets without a human. An AI agent handles order status, refunds, FAQs, and routing — for under $100/month.",
  },
  alternates: {
    canonical: "/learn/ai-agent-for-customer-support",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI Agent for Customer Support: 24/7 Tier-1 Without Hiring",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-06",
  description:
    "How a custom AI agent handles Tier-1 customer support — order status, refunds, FAQs, and routing — resolving 60-80% of tickets without human staff.",
};

const ticketTypes = [
  {
    type: "Order status & shipping",
    volume: "25% of tickets",
    how: "Agent queries the order system and replies with tracking info, delivery ETA, and carrier links. Handles 'where is my order' in under 10 seconds, 24/7.",
    resolution: "98% auto-resolved",
  },
  {
    type: "Returns & refunds",
    volume: "15% of tickets",
    how: "Agent reads the return policy, confirms eligibility, issues an RMA or refund per your rules, and logs it in Shopify/Stripe. Escalates only policy-edge cases.",
    resolution: "75% auto-resolved",
  },
  {
    type: "Password resets & account access",
    volume: "12% of tickets",
    how: "Agent verifies identity via email code, triggers the reset flow, and confirms. Zero human touch for the most repetitive ticket type in existence.",
    resolution: "100% auto-resolved",
  },
  {
    type: "Product & pricing FAQs",
    volume: "20% of tickets",
    how: "Agent answers from your knowledge base — shipping costs, ingredient lists, compatibility, warranty terms. Updates its own answers when you publish a new KB article.",
    resolution: "85% auto-resolved",
  },
  {
    type: "Billing & invoice questions",
    volume: "10% of tickets",
    how: "Agent pulls billing history from Stripe/QuickBooks, explains a charge, and sends a copy invoice. Escalates only true disputes.",
    resolution: "70% auto-resolved",
  },
  {
    type: "Bug reports & feature requests",
    volume: "8% of tickets",
    how: "Agent logs the report, acknowledges to the customer, tags it in your tracker (Linear, Jira), and notifies the right engineer. No 'thanks for your feedback' black hole.",
    resolution: "Logged, routed",
  },
];

const limits = [
  {
    limit: "Angry or emotionally charged escalations",
    reality: "Route to a human immediately. The agent detects sentiment and never argues with a customer.",
  },
  {
    limit: "Novel edge cases it has never seen",
    reality: "Agent escalates after 1 failed resolution attempt — no infinite loops, no hallucinated answers.",
  },
  {
    limit: "Anything involving money movement above your threshold",
    reality: "You set the dollar ceiling. Refunds above it always go to a human approver.",
  },
];

export default function CustomerSupportPage() {
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
        / AI Agent for Customer Support
      </nav>

      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        AI Agent for Customer Support
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Customer support is the second-most-automated workflow after data entry.
        A custom agent resolves 60-80% of Tier-1 tickets autonomously — order
        status, refunds, FAQs, account access — and hands only the edge cases to
        a human. It works 24/7, never gets impatient, and costs less than a
        single support hire&apos;s first paycheck.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          What a support agent actually handles
        </h2>
        <div className="mt-6 grid gap-4">
          {ticketTypes.map((t) => (
            <div
              key={t.type}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {t.type}
                </h3>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {t.resolution}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {t.volume}
              </p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{t.how}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          What it does NOT do (the limits)
        </h2>
        <div className="mt-4 space-y-4">
          {limits.map((l) => (
            <div
              key={l.limit}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                {l.limit}
              </p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{l.reality}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The ROI
        </h2>
        <div className="mt-4 rounded-xl bg-zinc-900 p-6 dark:bg-zinc-800">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-zinc-400">Tickets/month (500)</p>
              <p className="text-2xl font-bold text-zinc-100">65% auto-resolved</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">FTE hours saved/month</p>
              <p className="text-2xl font-bold text-zinc-100">~130 hrs</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Equivalent FTE cost</p>
              <p className="text-2xl font-bold text-zinc-100">$4,500/mo</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            Agent cost: ~$80-120/month in API calls. One-time build: $750. The
            math pays back in week one.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-xl bg-emerald-50 p-8 dark:bg-emerald-950/50">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          See How Many of Your Support Tickets Are Automatable
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          The free AgentFit audit asks about your support volume and ticket mix,
          then shows exactly which categories an AI agent can take off your
          plate — and what it&apos;s worth.
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

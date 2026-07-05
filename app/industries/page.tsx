import type { Metadata } from "next";
import Link from "next/link";
import { industries, industryCount } from "@/lib/industries";

export const metadata: Metadata = {
  title: "AI Automation by Industry — Find Yours | AgentFit",
  description: `Browse AI automation opportunities for ${industryCount} industries. Each guide covers real tasks you can automate, hours saved, and ROI math specific to your industry.`,
  openGraph: {
    title: "AI Automation by Industry — Find Yours | AgentFit",
    description: `Real automation opportunities for ${industryCount} industries, with hours saved and ROI math for each.`,
  },
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Automation by Industry",
    description: `AI automation guides for ${industryCount} industries`,
    hasPart: industries.map((i) => ({
      "@type": "Article",
      name: `AI Automation for ${i.name}`,
      url: `https://agentfit-mu.vercel.app/industries/${i.slug}`,
    })),
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">
          AgentFit
        </Link>{" "}
        / Industries
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        AI Automation by Industry
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Automation opportunities look different in every industry. Pick yours to see
        the specific tasks you can automate, how many hours you&apos;d save, and the
        ROI math for your business.
      </p>

      {/* CTA */}
      <div className="mt-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950">
        <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
          Not sure where to start?
        </p>
        <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
          Take the free 60-second audit. We&apos;ll rank your top 3 automation
          opportunities regardless of industry.
        </p>
        <Link
          href="/"
          className="mt-3 inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Take the free audit →
        </Link>
      </div>

      {/* Industry grid */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className="group rounded-xl border border-zinc-200 p-6 transition hover:border-indigo-500 hover:shadow-md dark:border-zinc-800 dark:hover:border-indigo-400"
          >
            <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-50 dark:group-hover:text-indigo-400">
              {industry.name}
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              {industry.persona}
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                {industry.automations.length} tasks
              </span>
              <span>
                ~{industry.annualHoursSaved} hrs/yr saved
              </span>
            </div>
            <p className="mt-3 text-sm text-indigo-600 opacity-0 transition group-hover:opacity-100 dark:text-indigo-400">
              Explore →
            </p>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 rounded-2xl border-2 border-indigo-500 bg-indigo-50 p-8 dark:bg-indigo-950/40">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Don&apos;t see your industry?
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          The audit works for any service business. Take it and get personalized
          recommendations in 60 seconds.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
        >
          Start the free audit →
        </Link>
      </div>
    </main>
  );
}

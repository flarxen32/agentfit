import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, getIndustry, type Industry } from "@/lib/industries";

export const dynamicParams = false;

export async function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  const title = `AI Automation for ${industry.name}: ${industry.automations.length} Tasks You Can Automate Today`;
  const description = `${industry.hook} See ${industry.automations.length} real ${industry.name.toLowerCase()} tasks you can automate with AI agents — with hours saved and ROI math.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    alternates: {
      canonical: `/industries/${slug}`,
    },
  };
}

function difficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
    case "Medium":
      return "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
    default:
      return "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300";
  }
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry: Industry | undefined = getIndustry(slug);
  if (!industry) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `AI Automation for ${industry.name}`,
    author: { "@type": "Organization", name: "AgentFit" },
    publisher: { "@type": "Organization", name: "AgentFit" },
    datePublished: "2026-07-05",
    description: industry.hook,
    about: {
      "@type": "Thing",
      name: `AI automation in the ${industry.name.toLowerCase()} industry`,
    },
    keywords: industry.keywords.join(", "),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What tasks can AI automate in ${industry.name.toLowerCase()}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: industry.automations
            .map((a) => `${a.task} (${a.difficulty} to automate)`)
            .join("; "),
        },
      },
      {
        "@type": "Question",
        name: `How much time can a ${industry.name.toLowerCase()} business save with AI automation?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Automating the top ${industry.automations.length} tasks saves approximately ${industry.annualHoursSaved} hours per year — worth about $${industry.annualValue.toLocaleString()} at $60/hour.`,
        },
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />

      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">
          AgentFit
        </Link>{" "}
        /{" "}
        <Link href="/industries" className="hover:text-zinc-900 dark:hover:text-zinc-200">
          Industries
        </Link>{" "}
        / {industry.name}
      </nav>

      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
        For {industry.persona}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        AI Automation for {industry.name}: {industry.automations.length} Tasks to Automate
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">{industry.hook}</p>

      {/* Inline CTA — appears high on the page */}
      <div className="mt-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950">
        <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
          Want the {industry.name.toLowerCase()}-specific audit?
        </p>
        <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
          Take the free 60-second audit. Get your top 3 {industry.name.toLowerCase()}{" "}
          automation opportunities ranked by hours saved.
        </p>
        <Link
          href="/"
          className="mt-3 inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Take the free {industry.name} audit →
        </Link>
      </div>

      {/* The pain point — empathy section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          The {industry.name.toLowerCase()} problem
        </h2>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {industry.painPoint}
        </p>
      </section>

      {/* Automation opportunities */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {industry.automations.length} tasks you can automate this quarter
        </h2>
        <div className="mt-6 space-y-6">
          {industry.automations.map((auto, i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {auto.task}
                </h3>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyColor(auto.difficulty)}`}
                >
                  {auto.difficulty}
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Tools: {auto.tool}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
                    Before
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {auto.hoursBefore}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                    After
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {auto.hoursAfter}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROI math */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          The ROI for {industry.name.toLowerCase()}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-emerald-50 p-6 dark:bg-emerald-950/40">
            <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
              {industry.annualHoursSaved} hrs
            </p>
            <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-200">
              Saved per year by automating these {industry.automations.length} tasks
            </p>
          </div>
          <div className="rounded-xl bg-indigo-50 p-6 dark:bg-indigo-950/40">
            <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
              ${industry.annualValue.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-indigo-800 dark:text-indigo-200">
              Annual value at $60/hour — a custom agent pays for itself fast
            </p>
          </div>
        </div>
      </section>

      {/* Real example */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          What this looks like in practice
        </h2>
        <div className="mt-4 rounded-xl border-l-4 border-indigo-500 bg-zinc-50 p-6 dark:bg-zinc-900">
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
            Scenario
          </p>
          <p className="mt-1 text-zinc-700 dark:text-zinc-300">
            {industry.caseExample.scenario}
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Result
          </p>
          <p className="mt-1 text-zinc-700 dark:text-zinc-300">
            {industry.caseExample.result}
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <div className="mt-16 rounded-2xl border-2 border-indigo-500 bg-indigo-50 p-8 dark:bg-indigo-950/40">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Get your {industry.name.toLowerCase()} automation roadmap — free
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          The AgentFit audit takes 60 seconds and shows your top 3 tasks to automate,
          specific to your role and tools. No signup, no credit card.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
        >
          Start the free {industry.name} audit →
        </Link>
      </div>

      {/* Internal links to related industries */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Explore other industries
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {industries
            .filter((i) => i.slug !== industry.slug)
            .slice(0, 8)
            .map((other) => (
              <Link
                key={other.slug}
                href={`/industries/${other.slug}`}
                className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-600 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
              >
                {other.name}
              </Link>
            ))}
        </div>
        <Link
          href="/industries"
          className="mt-4 inline-block text-sm text-indigo-600 hover:underline dark:text-indigo-400"
        >
          See all industries →
        </Link>
      </div>
    </main>
  );
}

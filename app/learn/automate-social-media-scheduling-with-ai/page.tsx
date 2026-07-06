import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automate Social Media Scheduling With AI: Post on Autopilot",
  description:
    "An AI agent drafts, schedules, and cross-posts to LinkedIn, X, and Instagram on your schedule — no more blank-page paralysis or last-minute posting. See the workflow and cost.",
  openGraph: {
    title: "Automate Social Media Scheduling With AI: Post on Autopilot",
    description:
      "Stop spending 5+ hours/week on social media. An AI agent drafts, schedules, and repurposes content across platforms automatically.",
  },
  alternates: {
    canonical: "/learn/automate-social-media-scheduling-with-ai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Automate Social Media Scheduling With AI: Post on Autopilot",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-06",
  description:
    "How a custom AI agent drafts, schedules, and repurposes social media content across LinkedIn, X, and Instagram — cutting 5+ hours/week of manual work.",
};

const workflow = [
  {
    phase: "Content sourcing",
    what: "Agent reads your blog, customer calls, industry news, and last quarter's top posts. Identifies angles worth posting about.",
    manualTime: "2 hrs/week",
  },
  {
    phase: "Drafting",
    what: "Agent writes 5-10 posts per week in your voice. Each post is platform-native: long-form for LinkedIn, punchy for X, visual-caption for Instagram.",
    manualTime: "3 hrs/week",
  },
  {
    phase: "Repurposing",
    what: "One blog post becomes 3 LinkedIn posts, 5 X threads, and 2 Instagram captions. Agent does the reformatting automatically.",
    manualTime: "2 hrs/week",
  },
  {
    phase: "Scheduling",
    what: "Agent schedules at your optimal posting times (learned from your analytics). Posts to Buffer, Hootsuite, or direct API.",
    manualTime: "1 hr/week",
  },
  {
    phase: "Engagement routing",
    what: "Agent monitors replies, flags high-intent DMs (sales leads, complaints) for your immediate attention, and auto-responds to FAQs.",
    manualTime: "1 hr/week",
  },
];

const platforms = [
  { name: "LinkedIn", fit: "B2B thought leadership, company page, personal profile", best: "Long-form posts, carousels, text+image" },
  { name: "X (Twitter)", fit: "Threads, hot takes, community engagement", best: "Short text, threads, reply engagement" },
  { name: "Instagram", fit: "Visual brands, product showcases, behind-the-scenes", best: "Reels, carousels, captions" },
  { name: "YouTube", fit: "Tutorials, demos, long-form education", best: "Titles, descriptions, chapter markers" },
];

export default function SocialMediaPage() {
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
        / Automate Social Media Scheduling With AI
      </nav>

      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Automate Social Media Scheduling With AI
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Social media is where good intentions go to die. You know you should
        post consistently, but the blank page wins every time. A custom AI agent
        drafts your posts, repurposes your content across platforms, schedules at
        optimal times, and flags the replies that actually need your attention —
        for under $40/month.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The hidden cost of "just post more"
        </h2>
        <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
          <p>
            Founders and small teams spend <strong>5-9 hours per week</strong>{" "}
            on social media — most of it on low-value work: staring at a blank
            composer, reformatting the same idea for three platforms, manually
            scheduling, and doom-scrolling notifications to find the one DM that
            matters.
          </p>
          <p>
            The high-value work — responding to a sales inquiry, jumping into a
            relevant conversation, launching a campaign — gets the leftover
            scraps. An AI agent flips that ratio.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          What the agent does, phase by phase
        </h2>
        <div className="mt-6 grid gap-4">
          {workflow.map((w) => (
            <div
              key={w.phase}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {w.phase}
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{w.what}</p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Manual equivalent:{" "}
                <strong className="text-red-500">{w.manualTime}</strong>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Platform fit
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-zinc-500 dark:text-zinc-400">
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-3 pr-4">Platform</th>
                <th className="py-3 pr-4">Best for</th>
                <th className="py-3">Format the agent writes</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              {platforms.map((p) => (
                <tr key={p.name} className="border-b border-zinc-100 dark:border-zinc-900">
                  <td className="py-3 pr-4 font-medium">{p.name}</td>
                  <td className="py-3 pr-4">{p.fit}</td>
                  <td className="py-3">{p.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The ROI
        </h2>
        <div className="mt-4 rounded-xl bg-zinc-900 p-6 dark:bg-zinc-800">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-zinc-400">Manual hours/week</p>
              <p className="text-2xl font-bold text-zinc-100">9 hrs</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Annual cost at $50/hr</p>
              <p className="text-2xl font-bold text-zinc-100">$23,400</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">AI agent annual cost</p>
              <p className="text-2xl font-bold text-emerald-400">~$1,000</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            Plus: consistency compounds. Posting 5x/week instead of 1x grows
            reach 4-8x over a quarter — the revenue impact dwarfs the labor
            savings.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-xl bg-emerald-50 p-8 dark:bg-emerald-950/50">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Find Out How Much Social Media Time Is Costing You
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          The free AgentFit audit maps your social workflow and shows exactly
          what an AI agent can draft, schedule, and monitor for you.
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

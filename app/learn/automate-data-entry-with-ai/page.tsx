import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automate Data Entry With AI: Kill the Copy-Paste Tax Forever",
  description:
    "An AI agent reads invoices, forms, emails, and PDFs — then enters the data into your CRM, sheets, or accounting tool. No templates, no macros, no manual re-typing. See the ROI.",
  openGraph: {
    title: "Automate Data Entry With AI: Kill the Copy-Paste Tax Forever",
    description:
      "Stop re-typing data between tools. An AI agent reads any document and enters it where it belongs — 95% accuracy, 90% time savings.",
  },
  alternates: {
    canonical: "/learn/automate-data-entry-with-ai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Automate Data Entry With AI: Kill the Copy-Paste Tax Forever",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-06",
  description:
    "How a custom AI agent reads invoices, forms, emails, and PDFs — then enters the data into your CRM, sheets, or accounting tool without templates or macros.",
};

const sources = [
  {
    source: "Email → CRM",
    what: "Agent reads inbound inquiries, extracts name, company, need, and budget, and creates a enriched CRM record in HubSpot or Salesforce. Zero manual data entry.",
    hours: "4 hrs/week",
  },
  {
    source: "PDF invoices → accounting",
    what: "Agent reads vendor invoices (any layout), extracts line items and totals, codes to the right GL account, and posts the entry to QuickBooks/Xero.",
    hours: "6 hrs/week",
  },
  {
    source: "Form responses → spreadsheet",
    what: "Agent parses Google Form / Typeform responses, categorizes them, deduplicates against existing rows, and appends to the right sheet with formulas applied.",
    hours: "2 hrs/week",
  },
  {
    source: "Receipts → expense reports",
    what: "Agent reads receipt photos, extracts merchant, date, amount, and tax, matches to your expense policy, and files the report in your accounting system.",
    hours: "3 hrs/week",
  },
  {
    source: "Leads from spreadsheets → enrichment",
    what: "Agent reads a raw prospect list, enriches each row with company size, industry, verified email, and tech stack, then deduplicates and ranks.",
    hours: "5 hrs/week",
  },
  {
    source: "Meeting notes → action items",
    what: "Agent reads your call transcripts, extracts decisions and action items, assigns owners, and creates tasks in Asana, Jira, or Linear.",
    hours: "3 hrs/week",
  },
];

const comparison = [
  { approach: "Manual typing", cost: "$0 software + 23 hrs/week labor", accuracy: "Human error rate: 2-4%", flexibility: "Handles anything" },
  { approach: "Template-based OCR (Rossum, Docparser)", cost: "$200-500/month + setup", accuracy: "90-95% on supported layouts", flexibility: "Breaks on new layouts" },
  { approach: "Zapier / Make (structured data only)", cost: "$20-100/month", accuracy: "100% on what it can parse", flexibility: "Cannot read unstructured docs" },
  { approach: "Custom AI agent", cost: "$750 build + ~$50/month API", accuracy: "95%+ on any document", flexibility: "Reads anything, adapts to new layouts" },
];

export default function DataEntryPage() {
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
        / Automate Data Entry With AI
      </nav>

      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Automate Data Entry With AI
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Data entry is the single most-automatable task in any business. It is
        repetitive, structured, error-prone, and invisible to revenue — exactly
        what AI agents were built to eliminate. A custom agent reads any document
        (email, PDF, scan, spreadsheet, form) and puts the data exactly where it
        belongs, without templates, macros, or a single re-typed field.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The copy-paste tax
        </h2>
        <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
          <p>
            The average knowledge worker spends <strong>23 hours per month</strong>{" "}
            on manual data entry — moving information between tools that should
            already talk to each other. That&apos;s over a quarter of a full work
            week, gone to keystrokes that add zero value.
          </p>
          <p>
            Worse: every manual touch is a chance to transpose a number, misspell
            a name, or paste into the wrong field. Those errors surface weeks
            later as reconciliation headaches, bounced emails, and missed
            renewals.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          What an agent automates
        </h2>
        <div className="mt-6 grid gap-4">
          {sources.map((s) => (
            <div
              key={s.source}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {s.source}
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{s.what}</p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Manual equivalent:{" "}
                <strong className="text-red-500">{s.hours}</strong>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          How it compares
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-zinc-500 dark:text-zinc-400">
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="py-3 pr-4">Approach</th>
                <th className="py-3 pr-4">Cost</th>
                <th className="py-3 pr-4">Accuracy</th>
                <th className="py-3">Flexibility</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700 dark:text-zinc-300">
              {comparison.map((c) => (
                <tr key={c.approach} className="border-b border-zinc-100 dark:border-zinc-900">
                  <td className="py-3 pr-4 font-medium">{c.approach}</td>
                  <td className="py-3 pr-4">{c.cost}</td>
                  <td className="py-3 pr-4">{c.accuracy}</td>
                  <td className="py-3">{c.flexibility}</td>
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
              <p className="text-2xl font-bold text-zinc-100">23 hrs</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Annual cost at $50/hr</p>
              <p className="text-2xl font-bold text-zinc-100">$59,800</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">AI agent annual cost</p>
              <p className="text-2xl font-bold text-emerald-400">~$1,350</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            Plus: zero transcription errors, instant turnaround, and your team
            does work that actually requires a human brain.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-xl bg-emerald-50 p-8 dark:bg-emerald-950/50">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Find Out How Much Data Entry Is Costing You
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          The free AgentFit audit maps every place your team re-types data
          between tools and shows exactly what an AI agent can eliminate.
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

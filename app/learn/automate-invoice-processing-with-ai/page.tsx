import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automate Invoice Processing With AI: AP Automation Without an ERP",
  description:
    "AI agents read, extract, and reconcile invoices 24/7 — no templates, no manual data entry. See how small teams cut AP time by 90% for under $50/month.",
  openGraph: {
    title: "Automate Invoice Processing With AI: AP Automation Without an ERP",
    description:
      "Stop typing invoice numbers into QuickBooks by hand. AI agents extract, code, and reconcile invoices automatically.",
  },
  alternates: {
    canonical: "/learn/automate-invoice-processing-with-ai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Automate Invoice Processing With AI: AP Automation Without an ERP",
  author: { "@type": "Organization", name: "AgentFit" },
  publisher: { "@type": "Organization", name: "AgentFit" },
  datePublished: "2026-07-06",
  description:
    "How AI agents automate invoice processing — OCR extraction, GL coding, matching, and approval routing — without an expensive ERP.",
};

const steps = [
  {
    step: "1. Capture",
    how: "Agent reads invoices from email, PDFs, scans, or a shared folder. No templates needed — it understands any layout, including handwritten notes and multi-language invoices.",
    manualHours: "3 hrs/week",
  },
  {
    step: "2. Extract",
    how: "Agent pulls vendor, invoice number, line items, tax, GL codes, and payment terms. Handles multi-line, multi-currency, and split-coding without a lookup table.",
    manualHours: "4 hrs/week",
  },
  {
    step: "3. Match & verify",
    how: "Agent 3-way-matches invoice → PO → receipt automatically. Flags only exceptions for human review, cutting the queue by 80-95%.",
    manualHours: "2 hrs/week",
  },
  {
    step: "4. Code & route",
    how: "Agent applies your GL coding rules and routes approvals to the right person in Slack or email. Approvers click one button; the agent posts the entry to QuickBooks, Xero, or NetSuite.",
    manualHours: "2 hrs/week",
  },
  {
    step: "5. Schedule payment",
    how: "Agent schedules payment on the due date (capturing early-pay discounts where they exist) and reconciles the transaction when it clears.",
    manualHours: "1 hr/week",
  },
];

const myths = [
  {
    myth: "You need a $50K+ ERP to automate invoices.",
    truth: "A custom AI agent costs $750 flat, runs for under $50/month in API calls, and connects to QuickBooks, Xero, or NetSuite you already use.",
  },
  {
    myth: "Invoice OCR only works on clean PDFs.",
    truth: "Modern AI agents read scans, phone photos, email forwards, and mixed-language invoices with the same accuracy — typically 95%+ on first pass.",
  },
  {
    myth: "We tried a template-based AP tool and it broke every time a vendor changed their format.",
    truth: "AI agents don't use templates. They read the document semantically, so a vendor redesigning their invoice has zero impact on extraction.",
  },
];

export default function InvoiceProcessingPage() {
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
        / Automate Invoice Processing With AI
      </nav>

      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Automate Invoice Processing With AI
      </h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Accounts payable is the textbook AI automation case — high-volume,
        structured, error-prone, and invisible to revenue. A custom agent
        captures, extracts, matches, codes, and reconciles invoices end-to-end,
        without a $50K ERP or a fragile template tool.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          The problem with manual AP
        </h2>
        <div className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-400">
          <p>
            The average small business processes 50-500 invoices per month. At
            4-6 minutes of manual touch per invoice (open email, read PDF,
            re-type into the accounting system, match to PO, route for approval,
            schedule payment), that&apos;s <strong>3-50 hours of pure
            keystrokes every month</strong>. One typo in a vendor name or
            invoice number becomes a reconciliation nightmare weeks later.
          </p>
          <p>
            Traditional AP automation tools (Bill.com, Stampli, AvidXchange)
            charge $50-200/user/month, lock you into their workflow, and still
            break when a vendor changes their invoice layout. Template-based OCR
            is the reason most teams give up on AP automation within 6 months.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          How an AI agent handles invoices end-to-end
        </h2>
        <div className="mt-6 grid gap-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {s.step}
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{s.how}</p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Manual equivalent:{" "}
                <strong className="text-red-500">{s.manualHours}</strong>
              </p>
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
              <p className="text-sm text-zinc-400">Manual hours/week</p>
              <p className="text-2xl font-bold text-zinc-100">12 hrs</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Annual cost at $50/hr</p>
              <p className="text-2xl font-bold text-zinc-100">$31,200</p>
            </div>
            <div>
              <p className="text-sm text-zinc-400">AI agent annual cost</p>
              <p className="text-2xl font-bold text-emerald-400">~$1,400</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            Plus: zero typos, instant vendor lookup, no late-payment fees, and
            your team stops doing data entry forever.
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Common objections — debunked
        </h2>
        <div className="mt-4 space-y-4">
          {myths.map((m) => (
            <div
              key={m.myth}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                ❌ {m.myth}
              </p>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                ✅ {m.truth}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl bg-emerald-50 p-8 dark:bg-emerald-950/50">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Find Out How Much AP Time Is Costing You
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          The free AgentFit audit maps your invoice workflow and calculates
          exactly how many hours and dollars an AI agent could save you every
          month.
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

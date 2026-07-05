import Link from "next/link";
import AuditFlow from "@/components/audit/AuditFlow";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AgentFit",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free AI automation audit",
  },
  description:
    "Free AI automation audit that scores your business for AI automation opportunities in 60 seconds. Get a personalized score, top 3 automation tasks, and ROI estimate.",
  url: "https://agentfit-mu.vercel.app",
};

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <AuditFlow />
      <footer className="mt-12 border-t border-zinc-200 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <Link href="/industries" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Browse by industry
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/learn" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Guides
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            How it works
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/offer" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Custom agent build
          </Link>
        </div>
      </footer>
    </main>
  );
}

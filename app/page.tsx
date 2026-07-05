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
    </main>
  );
}

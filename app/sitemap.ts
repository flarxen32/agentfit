import type { MetadataRoute } from "next";
import { industries } from "@/lib/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://agentfit-mu.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/report`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/offer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/learn`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/industries`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/learn/ai-agents-for-consultants`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/learn/ai-automation-roi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/learn/automate-email-triage-with-ai`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const learnPages: MetadataRoute.Sitemap = [
    `${base}/learn/ai-automation-for-small-business`,
    `${base}/learn/what-tasks-can-ai-automate`,
    `${base}/learn/ai-agent-cost-vs-hiring`,
    `${base}/learn/ai-agents-for-agencies`,
    `${base}/learn/ai-agent-examples`,
    `${base}/learn/best-ai-automation-tools`,
  ].map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${base}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...learnPages, ...industryPages];
}

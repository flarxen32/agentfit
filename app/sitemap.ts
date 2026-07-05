import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://agentfit-mu.vercel.app";
  return [
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
  ];
}

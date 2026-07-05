import type { NextConfig } from "next";

/**
 * Next.js config.
 *
 * Primary deploy target: Vercel (see vercel.json + the Deploy Preview
 * workflow), running the full Next.js server runtime including the
 * /api/score route handler.
 *
 * Static-export fallback for GitHub Pages is enabled by setting
 * NEXT_PUBLIC_STATIC_EXPORT=1, giving downstream tasks a live preview URL
 * even before Vercel credentials are connected. For GitHub Pages project
 * sites (https://<user>.github.io/agentfit/), also set NEXT_PUBLIC_BASE_PATH
 * to "/agentfit" so assets resolve under the subpath.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  ...(process.env.NEXT_PUBLIC_STATIC_EXPORT
    ? {
        output: "export" as const,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;

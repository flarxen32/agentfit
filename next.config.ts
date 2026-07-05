import type { NextConfig } from "next";

/**
 * Next.js config.
 *
 * The primary deploy target is Vercel (see vercel.json + the Deploy Preview
 * workflow), which runs the full Next.js server runtime including the
 * /api/score route handler.
 *
 * A static-export fallback (`output: "export"`) is enabled when
 * NEXT_PUBLIC_STATIC_EXPORT is set so the same codebase can be published to
 * GitHub Pages — giving downstream tasks a live preview URL even before the
 * Vercel credentials are connected. The /api/score health endpoint is a
 * standalone route not referenced by any client code, so excluding it from
 * the static export has no functional impact.
 */
const nextConfig: NextConfig = {
  ...(process.env.NEXT_PUBLIC_STATIC_EXPORT
    ? {
        output: "export" as const,
        images: { unoptimized: true },
        // /api/score is a server-only health endpoint — no client references.
        // It can't be statically exported, so exclude it from the Pages build.
        exportMap: { exclude: ["/api/score"] },
      }
    : {}),
};

export default nextConfig;

import { ImageResponse } from "next/og";

/**
 * Default Open Graph image for AgentFit.
 *
 * Rendered at build/request time by Next.js metadata file convention.
 * Shows a branded social preview card: dark gradient background, AgentFit
 * wordmark, value prop headline, and CTA — matching the site's design
 * language (emerald accent, zinc neutrals).
 *
 * This image is what appears when the AgentFit URL is shared on Indie
 * Hackers, Reddit, Hacker News, Twitter/X, LinkedIn, Slack, etc.
 * Without it, those platforms show a blank or text-only link.
 */

export const alt = "AgentFit — Free AI Automation Audit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #09090b 0%, #18181b 50%, #064e3b 100%)",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Accent bar top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(90deg, #10b981 0%, #34d399 100%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
            padding: "10px 24px",
            borderRadius: "100px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "#34d399",
              letterSpacing: "0.02em",
            }}
          >
            FREE · 60 seconds · No signup
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "900px",
          }}
        >
          <span
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            What's the one task
          </span>
          <span
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#34d399",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            you keep doing twice?
          </span>
        </div>

        {/* Subheadline */}
        <span
          style={{
            fontSize: 30,
            color: "#a1a1aa",
            marginTop: "28px",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Get a free AI automation audit — personalized score, top
          opportunities, and ROI estimate for your business.
        </span>

        {/* Brand + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#10b981",
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#09090b",
              }}
            >
              A
            </span>
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#e4e4e7",
            }}
          >
            AgentFit
          </span>
          <span
            style={{
              fontSize: 24,
              color: "#52525b",
            }}
          >
            agentfit-mu.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

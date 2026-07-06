import { ImageResponse } from "next/og";

/**
 * Root Open Graph image — shown when any AgentFit URL is shared on
 * Reddit, Hacker News, Slack, X, LinkedIn, iMessage, etc.
 *
 * Using Next.js file convention (opengraph-image.tsx), this auto-injects
 * <meta property="og:image"> and <meta name="twitter:image"> tags.
 *
 * Dynamic generation via next/og — no static asset needed, no human keys.
 */
export const alt = "AgentFit — Free AI Automation Audit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#0f172a",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Accent gradient bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "8px",
            background: "linear-gradient(90deg, #6366f1, #a855f7, #6366f1)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
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
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              fontSize: "28px",
            }}
          >
            ⚡
          </div>
          <span style={{ fontSize: "28px", color: "#94a3b8", fontWeight: 500 }}>
            AgentFit
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "#f8fafc",
            lineHeight: 1.1,
            marginBottom: "20px",
            maxWidth: "900px",
          }}
        >
          Free AI Automation Audit
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            color: "#cbd5e1",
            lineHeight: 1.3,
            maxWidth: "850px",
          }}
        >
          Find out what an AI agent should do for your business — in 60 seconds.
        </div>

        {/* CTA pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "40px",
            padding: "16px 32px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            color: "white",
            fontSize: "26px",
            fontWeight: 600,
          }}
        >
          Get your fit score →
        </div>

        {/* Decorative dots bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "60px",
            display: "flex",
            gap: "12px",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: i === 0 ? "#6366f1" : i === 1 ? "#a855f7" : "#38bdf8",
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}

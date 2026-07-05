import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://agentfit-mu.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AgentFit — Free AI Automation Audit",
  description:
    "Find out what an AI agent should do for your business — free, in 60 seconds. Get a personalized score, top automation opportunities, and ROI estimate.",
  openGraph: {
    title: "AgentFit — Free AI Automation Audit",
    description:
      "Find out what an AI agent should do for your business — free, in 60 seconds.",
    url: SITE_URL,
    siteName: "AgentFit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentFit — Free AI Automation Audit",
    description:
      "Find out what an AI agent should do for your business — free, in 60 seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Plausible analytics script — only included when
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. The track() helper in lib/analytics
 * calls window.plausible() which this script provides.
 */
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}

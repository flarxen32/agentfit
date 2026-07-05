/**
 * Lightweight analytics event tracking.
 *
 * Production-ready: fires events to Plausible when
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. Falls back to console.debug in dev.
 *
 * Events tracked across the funnel:
 *   audit_started → step_completed → report_generated → cta_clicked
 *                                              ↘ report_shared
 *                                              ↘ email_captured
 *
 * To enable in production, set NEXT_PUBLIC_PLAUSIBLE_DOMAIN (e.g.
 * "agentfit.vercel.app") and include the Plausible script in layout.tsx.
 */

export type AnalyticsEvent =
  | "audit_started"
  | "step_completed"
  | "report_generated"
  | "cta_clicked"
  | "report_shared"
  | "email_captured";

// Plausible custom-event names use colons; map our events to those.
const PLAUSIBLE_EVENT_MAP: Record<AnalyticsEvent, string> = {
  audit_started: "Audit Started",
  step_completed: "Step Completed",
  report_generated: "Report Generated",
  cta_clicked: "CTA Clicked",
  report_shared: "Report Shared",
  email_captured: "Email Captured",
};

interface PlausibleWindow extends Window {
  plausible?: (
    event: string,
    options?: { props?: Record<string, unknown> },
  ) => void;
}

/**
 * Track an analytics event.
 *
 * Calls Plausible if the script is loaded; otherwise logs in dev.
 * Safe in SSR (no window access).
 */
export function track(event: AnalyticsEvent, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") {
    return; // SSR — no-op
  }

  const plausible = (window as PlausibleWindow).plausible;
  if (plausible) {
    plausible(PLAUSIBLE_EVENT_MAP[event], props ? { props } : undefined);
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, props ?? {});
  }
}

/**
 * Whether analytics is configured (Plausible domain env var is set).
 * Use to conditionally include the Plausible script tag in layout.
 */
export function isAnalyticsConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
}

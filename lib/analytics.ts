/**
 * Lightweight analytics event tracking.
 *
 * Real implementation (Plausible/PostHog/etc.) lands in XRO-18.
 * This module exposes a stable `track()` API so components can call it
 * without coupling to a specific provider yet.
 */

export type AnalyticsEvent =
  | "audit_started"
  | "step_completed"
  | "report_generated"
  | "cta_clicked"
  | "report_shared";

export function track(
  event: AnalyticsEvent,
  props?: Record<string, unknown>,
): void {
  // Provider wiring lands in XRO-18. For now, log in dev only.
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, props ?? {});
  }
}

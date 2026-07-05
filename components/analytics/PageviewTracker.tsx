"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Server-side pageview beacon.
 *
 * Fires a POST to /api/track on every route change with the current path
 * and UTM params. Uses sendBeacon for reliability (survives page unload).
 *
 * Combined with the /api/track GET endpoint (protected by LEADS_BASIC_AUTH),
 * this gives us basic visitor + UTM attribution without Plausible or any
 * third-party account.
 */
export function PageviewTracker() {
  return (
    <Suspense fallback={null}>
      <PageviewTrackerInner />
    </Suspense>
  );
}

function PageviewTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const utm_source = searchParams.get("utm_source") || undefined;
    const utm_medium = searchParams.get("utm_medium") || undefined;
    const referrer = typeof document !== "undefined" ? document.referrer || undefined : undefined;

    const data = JSON.stringify({ path: pathname, utm_source, utm_medium, referrer });

    // sendBeacon is fire-and-forget; falls back to fetch if unavailable
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([data], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname, searchParams]);

  return null;
}

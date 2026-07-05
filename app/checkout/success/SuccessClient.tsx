"use client";

/**
 * SuccessClient — the post-checkout confirmation page.
 *
 * Reads the session_id from the URL, fetches payment status from
 * /api/checkout/status, and shows the customer what happens next.
 */
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface SessionInfo {
  status?: string;
  customerEmail?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
  error?: string;
}

export function SuccessClient() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [info, setInfo] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    fetch(`/api/checkout/status?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((data) => setInfo(data))
      .catch(() => setInfo({ error: "Could not load session details" }))
      .finally(() => setLoading(false));
  }, [sessionId]);

  const paid = info?.status === "paid" || info?.status === "dev";

  return (
    <div className="space-y-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {loading ? (
        <p className="text-zinc-500">Confirming your payment…</p>
      ) : paid ? (
        <>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              You&apos;re booked! 🎉
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Your custom AI agent build is confirmed.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-left dark:border-emerald-800 dark:bg-emerald-950/40">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-300">
              What happens next
            </h2>
            <ol className="mt-4 space-y-3 text-zinc-700 dark:text-zinc-300">
              <li className="flex gap-3">
                <span className="font-bold text-emerald-600">1.</span>
                <span>You&apos;ll get a kickoff email within one business day with a link to book your scoping call.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-emerald-600">2.</span>
                <span>On the 30-minute call, we scope your biggest time-sink and agree on the build plan.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-emerald-600">3.</span>
                <span>Your agent is delivered in 7 days — with a money-back guarantee if it doesn&apos;t save you hours.</span>
              </li>
            </ol>
          </div>

          {info?.customerEmail && (
            <p className="text-sm text-zinc-500">
              Confirmation sent to <strong>{info.customerEmail}</strong>
            </p>
          )}
        </>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Payment not confirmed yet
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            If you believe this is an error, email <a href="mailto:hello@xablam.com" className="text-emerald-600 underline">hello@xablam.com</a> with your details and we&apos;ll sort it out.
          </p>
        </div>
      )}
    </div>
  );
}

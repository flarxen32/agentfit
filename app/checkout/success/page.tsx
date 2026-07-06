import type { Metadata } from "next";
import { Suspense } from "react";
import { SuccessClient } from "./SuccessClient";

export const metadata: Metadata = {
  title: "Payment confirmed — AgentFit",
  description: "Your custom AI agent build is confirmed.",
  alternates: {
    canonical: "/checkout/success",
  },
};

export default function CheckoutSuccessPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-16 sm:py-24">
      <Suspense fallback={<div className="text-zinc-500">Loading…</div>}>
        <SuccessClient />
      </Suspense>
    </main>
  );
}

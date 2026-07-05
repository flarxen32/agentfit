import { NextResponse } from "next/server";

/**
 * Optional agent-assisted classification endpoint.
 *
 * POST /api/score — accepts audit answers, returns a structured score.
 * Real LLM-enriched classification lands in a later task; this skeleton
 * returns a health-check response so the route is wired and discoverable.
 */
export async function GET() {
  return NextResponse.json({ status: "ok", service: "agentfit-score" });
}

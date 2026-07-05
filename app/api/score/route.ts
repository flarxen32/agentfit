import { NextResponse } from "next/server";

/**
 * Optional agent-assisted classification endpoint.
 *
 * POST /api/score — accepts audit answers, returns a structured score.
 * Real LLM-enriched classification lands in a later task; this skeleton
 * returns a health-check response so the route is wired and discoverable.
 *
 * `dynamic = "force-static"` lets the GET handler render to a static JSON
 * file under `output: "export"` (used for the GitHub Pages preview build).
 * On Vercel the route runs as a normal serverless handler.
 */
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ status: "ok", service: "agentfit-score" });
}

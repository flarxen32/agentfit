import { NextResponse } from "next/server";
import { appendEmailCapture } from "@/lib/email-capture";

/**
 * POST /api/email-capture
 *
 * Captures a visitor's email from the Report Card ("Email me my report").
 * Records the full audit context (fit score, grade, role, task, tools,
 * industry, hoursPerWeek) at capture time so the outbound list (XRO-10)
 * carries the full funnel context per lead.
 *
 * Body: { email, fitScore, grade, role, task, tools, industry, hoursPerWeek }
 * Returns: { ok: true, id }
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = String(body.email || "").trim();
  const role = String(body.role || "").trim();
  const task = String(body.task || "").trim();
  const tools = String(body.tools || "").trim();
  const industry = String(body.industry || "").trim();
  const grade = String(body.grade || "").trim();
  const fitScore = Number(body.fitScore) || 0;
  const hoursPerWeek = Number(body.hoursPerWeek) || 0;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 422 });
  }

  // Basic email sanity
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address" },
      { status: 422 },
    );
  }

  const capture = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    capturedAt: new Date().toISOString(),
    email,
    fitScore,
    grade,
    role,
    task,
    tools,
    industry,
    hoursPerWeek,
    source: "agentfit-report-card",
  };

  try {
    await appendEmailCapture(capture);
  } catch (err) {
    console.error("email_capture_failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "Could not save your email. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: capture.id });
}

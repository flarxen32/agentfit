/**
 * Auto-followup: instantly email new audit completers with a personalized
 * follow-up based on their audit data. Fires automatically inside the
 * email-capture flow the moment a lead is stored.
 *
 * Design:
 *   - No-op if RESEND_API_KEY is not set (graceful degradation).
 *   - Uses the Resend onboarding sender (onboarding@resend.dev) when no
 *     verified domain is configured, so it works immediately without DNS
 *     setup. The sender domain can be upgraded later via RESEND_FROM_DOMAIN.
 *   - Personalizes the email body using the lead's fit score, role, task,
 *     tools, and industry — the same fields captured in the audit.
 *   - Never throws into the request path: capture success is independent
 *     of follow-up delivery.
 */

interface LeadData {
  email: string;
  fitScore: number;
  grade: string;
  role: string;
  task: string;
  tools: string;
  industry: string;
  hoursPerWeek: number;
}

function fromAddress(): string {
  const explicit = process.env.RESEND_FROM_EMAIL;
  if (explicit) return explicit;
  const domain = process.env.RESEND_FROM_DOMAIN;
  if (domain) return `AgentFit <outreach@${domain}>`;
  // Resend's shared onboarding sender — works without domain verification.
  return "AgentFit <onboarding@resend.dev>";
}

function buildSubject(d: LeadData): string {
  return `Your AgentFit score is in — here's your #1 automation pick`;
}

function buildHtml(d: LeadData): string {
  const scoreLine =
    d.fitScore > 0
      ? `You just ran your business through AgentFit and scored a <strong>${d.fitScore}/100</strong> for AI automation potential. That's solid — but it means you're leaving real hours on the table every week.`
      : `You just ran your business through AgentFit. Your results are ready.`;

  const taskLine = d.task
    ? `Here's what stood out: you're spending time on <strong>${d.task}</strong>${
        d.tools ? ` using ${d.tools}` : ""
      }. That's exactly the kind of repetitive, structured work that an AI agent handles well.`
    : d.tools
      ? `Here's what stood out: you're using ${d.tools} — and there's real automation potential in how you use it.`
      : "Here's what stood out: your workflow has clear automation opportunities.";

  const hoursLine =
    d.hoursPerWeek > 0
      ? `<li>Saves you ~${d.hoursPerWeek} hours every single week</li>`
      : `<li>Saves you hours every single week</li>`;

  return `<!doctype html><html><body style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; padding: 20px; color: #1a1a1a; line-height: 1.6;">
<p>Hi${d.role ? `,` : ``}</p>

<p>${scoreLine}</p>

<p>${taskLine}</p>

<p>I can build you a custom AI agent that:</p>
<ul>
<li>Automates ${d.task || "your most repetitive task"} end-to-end</li>
${hoursLine}
<li>Integrates with ${d.tools || "your existing tools"}</li>
<li>Runs on autopilot — no managing, no babysitting</li>
</ul>

<p style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 8px; border-left: 3px solid #22c55e;">
<strong>The offer:</strong> Custom AI agent build — $750, delivered in 7 days.<br>
If it doesn't save you hours, you don't pay.
</p>

<p>Want to see exactly what this would look like for your business? Just reply to this email or <a href="https://agentfit-mu.vercel.app/offer">book a 30-minute scoping call</a> and I'll walk you through it.</p>

<p>Best,<br>
The AgentFit Team</p>

<p style="font-size: 13px; color: #666; margin-top: 32px;">
P.S. — You were one of the first to try AgentFit. If you're curious but not ready for a custom build, just reply with "what else?" and I'll share two more automation ideas from your audit results.
</p>
</body></html>`;
}

function buildText(d: LeadData): string {
  const score =
    d.fitScore > 0
      ? `You just ran your business through AgentFit and scored a ${d.fitScore}/100 for AI automation potential. That's solid — but it means you're leaving real hours on the table every week.`
      : `You just ran your business through AgentFit. Your results are ready.`;

  const task = d.task
    ? `Here's what stood out: you're spending time on ${d.task}${
        d.tools ? ` using ${d.tools}` : ""
      }. That's exactly the kind of repetitive, structured work that an AI agent handles well.`
    : "Here's what stood out: your workflow has clear automation opportunities.";

  return `${score}

${task}

I can build you a custom AI agent that:
- Automates ${d.task || "your most repetitive task"} end-to-end
- ${
    d.hoursPerWeek > 0
      ? `Saves you ~${d.hoursPerWeek} hours every single week`
      : "Saves you hours every single week"
  }
- Integrates with ${d.tools || "your existing tools"}
- Runs on autopilot — no managing, no babysitting

THE OFFER: Custom AI agent build — $750, delivered in 7 days.
If it doesn't save you hours, you don't pay.

Want to see exactly what this would look like? Just reply to this email or book a 30-minute scoping call: https://agentfit-mu.vercel.app/offer

Best,
The AgentFit Team

P.S. — You were one of the first to try AgentFit. If you're curious but not ready for a custom build, just reply with "what else?" and I'll share two more automation ideas from your audit results.`;
}

/**
 * Send a personalized follow-up email to a newly captured lead.
 * No-ops (returns { sent: false, reason: "not-configured" }) if
 * RESEND_API_KEY is not set. Never throws.
 */
export async function sendLeadFollowup(
  lead: LeadData,
): Promise<{ sent: boolean; messageId?: string; reason?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { sent: false, reason: "RESEND_API_KEY not set — follow-up skipped" };
  }

  try {
    // Dynamic import so the route doesn't crash if resend isn't installed
    const { Resend } = await import("resend");
    const client = new Resend(key);

    const { data, error } = await client.emails.send({
      from: fromAddress(),
      to: lead.email,
      subject: buildSubject(lead),
      html: buildHtml(lead),
      text: buildText(lead),
      replyTo: process.env.RESEND_REPLY_TO ?? "outreach@xablam.com",
      tags: [
        { name: "campaign", value: "agentfit-auto-followup" },
        { name: "source", value: "audit-report-card" },
      ],
    });

    if (error) {
      console.error("lead_followup_send_error", {
        email: lead.email,
        error: error.message,
      });
      return { sent: false, reason: error.message };
    }

    return { sent: true, messageId: data?.id };
  } catch (err) {
    console.error("lead_followup_exception", {
      email: lead.email,
      error: err instanceof Error ? err.message : String(err),
    });
    return {
      sent: false,
      reason: err instanceof Error ? err.message : "unknown error",
    };
  }
}

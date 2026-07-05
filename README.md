# AgentFit

> Find out what an AI agent should do for your business — free.

AgentFit is a free, interactive web tool that audits a visitor's business for
AI automation opportunities, scores each one by hours saved and ROI, and hands
off to a custom-agent offer. It's the classic "free tool as lead-gen" play
(HubSpot's Website Grader, WordStream's AdGrader) built for the AI-agent era.

## What it does

A single-page interactive experience (3–5 minutes, no account required):

1. **Guided audit** — a short multi-step questionnaire about your role, the
   task you dread redoing every week, hours spent, tools used, and outputs.
2. **Live scoring engine** — classifies the task, estimates automation
   feasibility, hours saved per month, and an ROI band.
3. **Automation Report Card** — a beautiful, shareable scorecard with your fit
   score, top-3 automatable tasks, estimated savings, and a clear next step.

## Tech stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router) + TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Engine:** a small, well-tested TypeScript scoring module (pure functions)
- **Hosting:** [Vercel](https://vercel.com/) (free tier)

## Project structure

```
agentfit/
├── app/                      # Next.js App Router routes
│   ├── layout.tsx            # Root layout + Plausible script
│   ├── page.tsx              # Landing + audit flow
│   ├── report/page.tsx       # Shareable report card
│   ├── offer/page.tsx        # Bet #1 offer page (email capture)
│   └── api/score/route.ts    # Optional agent-assisted classification endpoint
├── components/
│   ├── audit/                # Multi-step audit flow components
│   ├── report/               # Report card, charts, share buttons
│   └── ui/                   # Buttons, progress bar, layout primitives
├── lib/
│   ├── engine/               # Scoring engine (pure TS, unit-tested)
│   ├── tasks/                # Task taxonomy + suggestion data
│   └── analytics.ts
├── content/
│   └── copy.ts               # All on-page copy (tunable without touching UI)
└── public/
    └── og/                   # Social share card templates
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                          |
|--------------------|--------------------------------------|
| `npm run dev`      | Start the dev server                 |
| `npm run build`    | Production build                     |
| `npm run start`    | Start the production server          |
| `npm run lint`     | Run ESLint                           |
| `npm run typecheck`| Run TypeScript type checking (`tsc`) |

## Architecture overview

AgentFit is a single-page funnel:

```
Landing (hero + CTA)
   → Audit flow (multi-step questionnaire, client-side state)
   → Scoring engine (pure TS: classifier + ROI estimator)
   → Report Card (fit score, top-3 tasks, savings viz, share)
   → CTA → /offer (Bet #1 offer page, email capture)
```

**Scoring engine** (`lib/engine/`) — pure TypeScript functions, no side
effects, fully unit-testable. `classifyTask()` maps audit answers to an
automation category + feasibility score (0–100). `estimateRoi()` converts
reported hours into monthly/annual savings and an ROI band.

**Analytics** (`lib/analytics.ts`) — provider-agnostic `track()` function.
Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and include the Plausible script in
`layout.tsx` to enable event tracking. Events: `audit_started`,
`step_completed`, `report_generated`, `cta_clicked`, `report_shared`,
`email_captured`. In dev, events log to `console.debug`.

**Copy** (`content/copy.ts`) — all user-facing strings in one file so the
team can tune messaging without touching components.

## Analytics setup (optional)

Analytics is opt-in via [Plausible](https://plausible.dev/):

1. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in your `.env.local` (e.g.
   `agentfit.vercel.app`).
2. The Plausible `<Script>` tag in `app/layout.tsx` is automatically
   included when the env var is set — no manual uncommenting needed.
3. Deploy — events fire automatically from the `track()` calls in each
   funnel step.

**Events tracked:**

| Event | Fired when |
|-------|-----------|
| `audit_started` | Visitor clicks "Start the 60-second audit" |
| `step_completed` | Each step validated and advanced |
| `report_generated` | Report card rendered (funnel completion) |
| `cta_clicked` | Visitor clicks "Get your custom agent" on the report |
| `report_shared` | Copy link, social share, or PDF download |
| `email_captured` | Email submitted on the `/offer` page |

In dev (`NODE_ENV=development`), events log to `console.debug`.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Plausible analytics domain |

Copy `.env.example` to `.env.local` and fill in values.

## Deployment & preview

There are two preview-deploy paths, both wired and ready:

### Option A — Vercel (primary, recommended)

The project is configured for Vercel via `vercel.json` and the
`.github/workflows/deploy.yml` workflow (posts the preview URL as a PR comment).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Import `flarxen32/agentfit` at [vercel.com/new](https://vercel.com/new) —
   the GitHub integration auto-deploys on every push (no token needed).
2. Add `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` if using analytics.
3. Each push/PR gets a live preview URL.

Alternatively, add repo secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`,
`VERCEL_PROJECT_ID` to let the deploy workflow run headlessly.

### Option B — GitHub Pages (zero-credential fallback)

A static-export build (`.github/workflows/deploy-pages.yml`) publishes to
GitHub Pages using only the built-in `GITHUB_TOKEN`. This is the same app
minus the `/api/score` health endpoint (which renders as static JSON).

**One-time enable** (requires repo admin via browser or a token with Pages
permission — cannot be done by a fine-grained PAT):
Settings → Pages → Build and deployment → Source = **GitHub Actions**.

Once enabled, every push to `main` deploys to
`https://flarxen32.github.io/agentfit/`.

## License

[MIT](./LICENSE) — code. Report-card design assets are CC-BY (TBD).

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
│   ├── layout.tsx
│   ├── page.tsx              # Landing + audit flow
│   ├── report/page.tsx       # Shareable report card
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
   → CTA → Bet #1 offer page (email capture)
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
2. Uncomment the Plausible `<Script>` tag in `app/layout.tsx`.
3. Deploy — events fire automatically from the `track()` calls in each
   funnel step.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Plausible analytics domain |

Copy `.env.example` to `.env.local` and fill in values.

## Deployment

Deploy to Vercel (free tier):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Add `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` if using analytics.
4. Deploy.

## License

[MIT](./LICENSE) — code. Report-card design assets are CC-BY (TBD).

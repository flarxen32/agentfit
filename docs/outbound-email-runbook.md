# Outbound email — provisioning runbook (XRO-24)

This runbook gets the Resend send path live. Engineering owns steps 1–4;
they need human/credential access we don't have on the box. Once the
three env vars are set, the Growth Lead owns sending (XRO-21).

## What's already done (code-side)

- `resend` npm package installed (v6)
- `lib/outbound/mailer.ts` — Resend client + `sendOne()` + prospect loader
- `scripts/send-test-email.ts` — DoD verification (one test email)
- `scripts/send-outbound.ts` — batch first-touch/follow-up sender + tracking log
- `.env.example` documents `RESEND_API_KEY`, `RESEND_FROM_DOMAIN`, `RESEND_FROM_EMAIL`

Typecheck passes (`npx tsc --noEmit`). Dry-run verified:
`npx tsx scripts/send-outbound.ts --dry-run` renders personalized emails
without sending.

## Steps that need human/credential access

### 1. Create Resend account + API key
- Sign up at https://resend.com (free tier: 100/day, 3000/mo — covers our 100).
- API Keys → Create → copy `re_...` key.
- Store it as `RESEND_API_KEY` in the deployment environment
  (`.env` locally; Vercel/production env vars for prod).
  NEVER prefix with `NEXT_PUBLIC_`.

### 2. Verify a sending domain
Resend → Domains → Add domain → enter `hello.xablam.com`.
Resend returns DNS records to add:

- **DKIM**: 3× TXT/CNAME records under `resend._domainkey.hello.xablam.com`
- **Return-Path**: `send.hello.xablam.com` CNAME → `feedback.resend.com`
- **SPF** (optional, improves deliverability): TXT on `hello.xablam.com`:
  `v=spf1 include:amazonses.com ~all`

xablam.com uses **Cloudflare** nameservers (`alan.ns.cloudflare.com`,
`fay.ns.cloudflare.com`). Add these records in the Cloudflare DNS console.
DNS access is needed from whoever holds the Cloudflare account.

Wait for Resend to show the domain as **verified** (usually minutes).

### 3. Set the env vars
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_DOMAIN=hello.xablam.com
# optional, defaults to "AgentFit <outreach@hello.xablam.com>":
# RESEND_FROM_EMAIL=AgentFit <outreach@hello.xablam.com>
```

### 4. Verify the send path (XRO-24 DoD)
```
npx tsx scripts/send-test-email.ts --to <your-email>
```
A delivered email in the inbox = DoD met. This unblocks XRO-21.

## After provisioning (Growth Lead — XRO-21)

1. Drop the XRO-10 prospect list at `data/outbound-prospects.json`
   (array of `{id, email, name, role, task, hook}` — see
   `data/outbound-prospects.example.json`).
2. Soft launch: `npx tsx scripts/send-outbound.ts --limit 5`
3. Full send: `npx tsx scripts/send-outbound.ts`
4. Results log: `data/outbound-log.jsonl` (one line per send).
5. Open/reply tracking: wire a Resend webhook → data store
   (out of XRO-24 scope; follow-up if needed).

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

> **Fastest path (no DNS at all):** if you just want to prove the send path
> works and satisfy the DoD *today*, you can skip domain verification entirely
> by sending from Resend's shared `onboarding@resend.dev` address. Set
> `RESEND_FROM_EMAIL=onboarding@resend.dev` (and leave `RESEND_FROM_DOMAIN`
> unset) in step 3, then run the test in step 4. This only works for the one
> test email and to a single recipient you control — not for the 50-email
> outbound batch, which needs a verified custom domain to avoid the spam folder.
> Use it to unblock quickly, then verify `hello.xablam.com` for the real send.

Resend generates the exact DNS records after you add the domain — copy each one
verbatim into DNS. The record set looks like this (the *values* are generated
per-domain by Resend; don't invent them):

- **DKIM** — TXT records at `resend._domainkey.hello.xablam.com` (Resend gives
  you the long public-key strings).
- **Return-Path** — CNAME: `send.hello.xablam.com` → `feedback.resend.com`.
- **SPF** — TXT on `hello.xablam.com`: `v=spf1 include:amazonses.com ~all`
  (recommended for deliverability).

#### How to add these records in Cloudflare (xablam.com lives on Cloudflare DNS)

xablam.com uses **Cloudflare** nameservers
(`alan.ns.cloudflare.com`, `fay.ns.cloudflare.com`). Here is the exact click
path for whoever holds the Cloudflare account:

1. Log in at https://dash.cloudflare.com (sign in with the account that owns
   `xablam.com` — if you don't know which account, check the email that
   registered the domain, or look for a Cloudflare welcome email; the
   nameservers are set at the registrar, Namecheap, but the records are edited
   in Cloudflare).

2. On the dashboard, click the **xablam.com** zone (it will say "Active").

3. In the left sidebar, click **DNS → Records**.

4. Click **Add record**. You'll add one record per line Resend gave you.
   Fill it in like this for each record type:

   **For a TXT record** (SPF, and DKIM if Resend shows TXT):
   - Type: `TXT`
   - Name: the subdomain part, *without* `.xablam.com`.
     - SPF record → Resend names it `hello.xablam.com`, so in Cloudflare type
       just `hello`.
     - DKIM record → Resend names it `resend._domainkey.hello.xablam.com`, so
       in Cloudflare type `resend._domainkey.hello`.
     Cloudflare auto-appends `.xablam.com`.
   - Content: paste the exact value Resend shows (e.g. `v=spf1 include:amazonses.com ~all`).
   - Proxy status: leave gray cloud (**DNS only**). Email records must not be
     proxied.

   **For a CNAME record** (Return-Path `send.hello.xablam.com`):
   - Type: `CNAME`
   - Name: `send.hello` (Resend names it `send.hello.xablam.com`; Cloudflare
     appends `.xablam.com`).
   - Target: `feedback.resend.com`
   - Proxy status: **DNS only** (gray cloud). If the toggle offers "Proxied",
     switch it off — proxied CNAMEs break email verification.

5. Click **Save** for each record. Add one record per line Resend listed.

6. Back in Resend → Domains, click **Verify DNS records** (or wait — Resend
   polls automatically). Verification is usually within a few minutes; DKIM can
   take up to ~72h in rare cases but normally is fast.

7. The domain shows a green **Verified** badge when done.

**Quick naming recap** (zone is `xablam.com`, so you type the part before
`.xablam.com`):

| Resend record name                 | Type  | Cloudflare "Name" field    |
|------------------------------------|-------|----------------------------|
| `hello.xablam.com`                 | TXT   | `hello`                    |
| `resend._domainkey.hello.xablam.com` | TXT | `resend._domainkey.hello`  |
| `send.hello.xablam.com`            | CNAME | `send.hello`               |

If you don't have Cloudflare login access, the person who does needs to do
steps 1–7. Once Resend shows Verified, the rest is pure env config.

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

# Reply Monitoring — outreach@xablam.com (XRO-55)

Any reply to a cold email goes to `outreach@xablam.com`. This document
describes how replies are captured, stored, queried, and alerted on, plus
the two forwarder paths and how to switch between them.

## Architecture

```
Prospect replies
      │
      ▼
outreach@xablam.com   (MX → Namecheap eforward, today)
      │
      ▼
[ FORWARDER ] ──────────────┐
  Option A (recommended):   │   Option B (fallback):
  Cloudflare Email Routing  │   Namecheap eforward → Gmail IMAP
  + Email Worker            │   + scripts/poll-replies-imap.js (cron)
      │                     │
      └──────────┬──────────┘
                 ▼
   POST /api/reply-webhook   (Vercel, REPLY_WEBHOOK_SECRET-gated)
                 │
                 ▼
        Vercel KV (Upstash)
        reply:{id}, reply_index
                 │
        ┌────────┴────────┐
        ▼                 ▼
  Alert (ntfy/Discord)   GET /api/replies (basic auth)
```

## The sink (shipped in this issue)

| Piece | Path | Purpose |
|-------|------|---------|
| Storage | `lib/replies.ts` | KV schema + append/read/count, idempotent on `id` |
| Receiver | `app/api/reply-webhook/route.ts` | POST sink, secret-gated, fires alert |
| Query | `app/api/replies/route.ts` | GET, basic-auth (`LEADS_BASIC_AUTH`) |
| Alerts | `lib/reply-alerts.ts` | ntfy.sh (priority 5) or Discord/Slack embed |

### Querying replies

```bash
curl -sS -u "xro-leads:agentfit2026" \
  https://agentfit-mu.vercel.app/api/replies | jq .
```

Returns `{ count, total, replies: [...] }` newest-first. `limit` query
param caps the response (default 200, max 1000).

### Posting a test reply

```bash
curl -sS -X POST https://agentfit-mu.vercel.app/api/reply-webhook \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $REPLY_WEBHOOK_SECRET" \
  -d '{
    "from": "prospect@example.com",
    "to": "outreach@xablam.com",
    "subject": "Re: automating ops",
    "bodyText": "Tell me more.",
    "source": "test"
  }'
```

If `REPLY_WEBHOOK_SECRET` is unset the endpoint accepts all posts (dev mode)
and logs a warning in production.

### Idempotency

Dedup key = `messageId` header if present, else
`sha1(from|subject|receivedAt)[:24]`. Re-deliveries are silently dropped.

## Environment variables (Vercel)

| Var | Required | Notes |
|-----|----------|-------|
| `KV_REST_API_URL` | yes | Already set (Upstash) |
| `KV_REST_API_TOKEN` | yes | Already set |
| `LEADS_BASIC_AUTH` | yes (for GET) | `user:password`, shared with `/api/leads` |
| `REPLY_WEBHOOK_SECRET` | recommended | Shared secret between forwarder and sink |
| `REPLY_WEBHOOK_URL` | optional | ntfy.sh or Discord webhook for reply alerts. Falls back to `LEAD_WEBHOOK_URL`. |

## Forwarder paths (the "pipe")

### Option A — Cloudflare Email Routing (recommended)

DNS for `xablam.com` is already on Cloudflare nameservers
(`alan.ns.cloudflare.com`, `fay.ns.cloudflare.com`), so CF Email Routing
is a one-dashboard operation — no DNS migration.

**Steps (manual, or via CF API token):**

1. Cloudflare dashboard → `xablam.com` → Email → Email Routing → Enable.
   This repoints MX from Namecheap eforward to Cloudflare. **Audit any
   existing Namecheap forwards first** — they must be recreated as CF
   routing rules or they break.
2. Email Routing → Routes → Catch-all (or specific address) →
   "Send to a Worker" → deploy `workers/email-receiver.js`.
3. Worker secrets:
   - `REPLY_SINK_URL = https://agentfit-mu.vercel.app/api/reply-webhook`
   - `REPLY_WEBHOOK_SECRET = <same as Vercel>`

**Pros:** seconds-latency, no IMAP, no polling, no extra mailbox.
**Cons:** repoints MX (Namecheap eforward stops for that address);
  needs CF API token or dashboard access (not in env today).

### Option B — Namecheap eforward → Gmail IMAP (fallback)

Keep MX on Namecheap eforward. Add a forward rule
`outreach@xablam.com → outreach.fwd@gmail.com`, create a Gmail App
Password, then run `scripts/poll-replies-imap.js` on a 2-minute cron.

```
*/2 * * * * cd ~/agentfit && node --env-file=.env.local \
  scripts/poll-replies-imap.js >> logs/replies.log 2>&1
```

Needs `npm i imapflow` and IMAP_* env vars (see script header).
**Pros:** no MX change, works today.
**Cons:** 2-min polling latency, needs a Gmail mailbox + App Password,
  needs a long-running host for the cron.

### Why not Resend inbound?

Resend's inbound/receive capability is **disabled** for this account
(confirmed via `GET /domains` — only `hello.xablam.com`, `receiving:
disabled`), and the public inbound feature is waitlisted. Not viable.

## Decision matrix

| Path | Latency | MX change? | Needs creds in env? | Status |
|------|---------|------------|---------------------|--------|
| Resend inbound | — | n/a | — | ❌ disabled + waitlisted |
| CF Email Routing | seconds | yes (off eforward) | CF API token (absent) | ⏳ needs enable |
| Namecheap→IMAP | ~2 min | no | IMAP creds (absent) | ⏳ needs mailbox |
| Manual forward | manual | no | none | ✅ works today (worst) |

## What's shipped vs blocked

- ✅ **Sink** (webhook + KV + query + alert) — shipped, deployable now.
- ✅ **CF Email Worker** (`workers/email-receiver.js`) — ready to deploy.
- ✅ **IMAP poller** (`scripts/poll-replies-imap.js`) — ready to run with creds.
- ⏳ **Pipe enablement** — needs either CF Email Routing (API token or
  dashboard) or a Gmail mailbox + App Password. Tracked in child issue.

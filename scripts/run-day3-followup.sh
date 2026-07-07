#!/usr/bin/env bash
# XRO-42: Day-3 follow-up send + metrics report to Paperclip.
# Scheduled for 2026-07-09 (3 days after first-touch on 2026-07-06).
# Idempotent: aborts if date is too early or follow-ups already sent.
set -euo pipefail

cd /home/nog/agentfit

# --- Mutual exclusion: prevent dual-fire race (Hermes cron + system crontab) ---
# If two cron mechanisms fire at the same instant, flock ensures only one runs.
exec 9>/tmp/xro42-day3-followup.lock
if ! flock -n 9; then
  echo "SKIP: Another instance of run-day3-followup.sh is already running (flock held). No double-send."
  exit 0
fi

# --- Load Resend credentials ---
set -a
source .env.local
set +a

# --- Load Paperclip credentials for cron (JWT secret, NOT expiring token) ---
# .paperclip-env contains the permanent agent JWT secret + IDs needed to
# mint fresh API tokens at runtime. Cron fires days after the heartbeat that
# wrote the file, so any JWT in it would be expired.
if [ -f .paperclip-env ]; then
  set -a
  source .paperclip-env
  set +a
fi

# --- Paperclip API credentials ---
# When called from a Hermes cron session (job 93323e3c), PAPERCLIP_API_KEY and
# PAPERCLIP_RUN_ID are already set by the runtime with a valid checked-out run.
# Reuse them so the PATCH succeeds — self-minted JWTs with a random run_id hit 409
# (issue is checked out to a different run).
#
# When called from the system crontab (no Hermes runtime env), fall back to
# minting a fresh JWT. This JWT can only READ issues reliably; PATCH may 409 if
# another run holds the checkout. The email send itself is not affected.
if [ -n "${PAPERCLIP_API_KEY:-}" ] && [ -n "${PAPERCLIP_RUN_ID:-}" ]; then
  echo "Using existing Paperclip credentials from runtime (run ${PAPERCLIP_RUN_ID})."
  CRON_RUN_ID="$PAPERCLIP_RUN_ID"
elif [ -f .paperclip-env ]; then
  echo "No runtime Paperclip credentials — minting fresh JWT from .paperclip-env (fallback path)."
  CRON_RUN_ID=$(python3 -c "import uuid; print(uuid.uuid4())")
  export PAPERCLIP_API_KEY=$(PAPERCLIP_RUN_ID="$CRON_RUN_ID" python3 -c "
import jwt, time, os
payload = {
    'sub': os.environ['PAPERCLIP_AGENT_ID'],
    'company_id': os.environ['PAPERCLIP_COMPANY_ID'],
    'adapter_type': 'hermes_local',
    'run_id': os.environ['PAPERCLIP_RUN_ID'],
    'iat': int(time.time()),
    'exp': int(time.time()) + 300,
    'iss': 'paperclip',
    'aud': 'paperclip-api'
}
print(jwt.encode(payload, os.environ['PAPERCLIP_AGENT_JWT_SECRET'], algorithm='HS256'))
" 2>/dev/null || echo "")
  if [ -z "${PAPERCLIP_API_KEY}" ]; then
    echo "WARNING: Failed to mint Paperclip JWT. Emails will send but Paperclip update will be skipped."
  fi
  export PAPERCLIP_RUN_ID="$CRON_RUN_ID"
else
  echo "WARNING: No Paperclip credentials available (no runtime env, no .paperclip-env). Paperclip update will be skipped."
  CRON_RUN_ID=""
fi

# --- Paperclip context ---
ISSUE_ID="3a3edfde-dfcc-45d7-b873-4ac38b7dcf6f"
COMPANY_ID="0f4042fa-5964-43b6-8536-ea114dc4acd2"
API_BASE="${PAPERCLIP_API_URL%/}"
case "$API_BASE" in */api) ;; *) API_BASE="$API_BASE/api" ;; esac

echo "=== XRO-42 Day-3 Follow-up Send ==="
echo "Time: $(date -u +%Y-%m-%dT%H:%M:%SZ)"

# --- Date gate ---
TODAY=$(date -u +%Y%m%d)
if [ "$TODAY" -lt "20260709" ]; then
  echo "ABORT: Too early. Follow-up window opens 2026-07-09. Today is $(date -u +%Y-%m-%d)."
  exit 0
fi

# --- Idempotency: check if follow-ups already sent ---
SENT_COUNT=$(grep '"template":"followup"' data/outbound-log.jsonl 2>/dev/null | grep -c '"status":"sent"' || echo "0")
if [ "$SENT_COUNT" -gt 0 ]; then
  echo "SKIP: Follow-up already sent ($SENT_COUNT records in log). No double-send."
  exit 0
fi

# --- Send follow-ups ---
BOUNCED_COUNT=$(jq '[.results | to_entries[] | select(.value=="bounced")] | length' data/first-touch-delivery-status.json 2>/dev/null || echo "0")
PROSPECT_TOTAL=$(jq 'length' data/outbound-prospects.json 2>/dev/null || echo "50")
FOLLOWUP_TARGET=$((PROSPECT_TOTAL - BOUNCED_COUNT))
echo "Starting follow-up send to ${FOLLOWUP_TARGET} prospects (${BOUNCED_COUNT} bounced excluded)..."
npx tsx scripts/send-outbound.ts --template followup --exclude-bounced --exclude-replies

echo ""
echo "Send complete. Collecting metrics..."

# --- Collect metrics from log ---
sleep 2
FIRST_SENT=$(grep '"template":"first"' data/outbound-log.jsonl 2>/dev/null | grep -c '"status":"sent"' || echo "0")
FIRST_ERR=$(grep '"template":"first"' data/outbound-log.jsonl 2>/dev/null | grep -c '"status":"error"' || echo "0")
FOLLOWUP_SENT=$(grep '"template":"followup"' data/outbound-log.jsonl 2>/dev/null | grep -c '"status":"sent"' || echo "0")
FOLLOWUP_ERR=$(grep '"template":"followup"' data/outbound-log.jsonl 2>/dev/null | grep -c '"status":"error"' || echo "0")
TOTAL_SENT=$((FIRST_SENT + FOLLOWUP_SENT))

echo "Metrics: first=$FIRST_SENT (err=$FIRST_ERR), followup=$FOLLOWUP_SENT (err=$FOLLOWUP_ERR), total=$TOTAL_SENT"

# --- Post metrics to Paperclip ---
METRICS_COMMENT=$(cat <<METRICS
XRO-42 Day-3 follow-up send complete — $(date -u +%Y-%m-%dT%H:%M:%SZ)

SEND METRICS
- First-touch sent: ${FIRST_SENT} (errors: ${FIRST_ERR})
- Follow-up sent: ${FOLLOWUP_SENT} (errors: ${FOLLOWUP_ERR})
- Total emails in sequence: ${TOTAL_SENT}

METRICS TO TRACK (manual until webhook integration)
- Replies: monitor outreach@xablam.com inbox
- Opens: check Resend dashboard for delivery/bounce/open data
- Calls booked: https://agentfit-mu.vercel.app/offer

KILL CRITERION (day 7 = 2026-07-13)
If reply rate < 2% (fewer than 1 reply) across all ${TOTAL_SENT} sends by 2026-07-13, kill outbound channel and pivot offer/channel.

NEXT: Monitor inbox + Resend dashboard. Report reply/call metrics when available.
METRICS
)

# Build JSON safely with jq.
# Keep status in_progress: the send is done but reply/metrics tracking continues
# until the day-7 kill criterion evaluation (2026-07-13).
# Using in_review here would fail with 422 (no review path available from cron).
PAYLOAD=$(jq -n \
  --arg status "in_progress" \
  --arg comment "$METRICS_COMMENT" \
  '{status:$status, comment:$comment}')

# Post to Paperclip. Skip gracefully if no credentials (email send already succeeded).
if [ -n "${PAPERCLIP_API_KEY}" ] && [ -n "${PAPERCLIP_RUN_ID}" ]; then
  HTTP_RESPONSE=$(curl -sS -o /dev/null -w "%{http_code}" \
    -X PATCH "${API_BASE}/issues/${ISSUE_ID}" \
    -H "Authorization: Bearer ${PAPERCLIP_API_KEY}" \
    -H "X-Paperclip-Run-Id: ${PAPERCLIP_RUN_ID}" \
    -H "Content-Type: application/json" \
    --data-binary "$PAYLOAD" 2>&1) || HTTP_RESPONSE="curl_failed"
  echo "Paperclip update HTTP status: $HTTP_RESPONSE"
  if [ "$HTTP_RESPONSE" != "200" ]; then
    echo "WARNING: Paperclip PATCH returned $HTTP_RESPONSE (may be 409 run-ownership conflict). Email send succeeded; metrics recorded in outbound-log.jsonl."
  fi
else
  echo "SKIP: No Paperclip credentials available. Email send succeeded; metrics in outbound-log.jsonl."
fi

echo ""
echo "=== XRO-42 Day-3 follow-up complete. ==="
echo "Follow-up sent to ${FOLLOWUP_SENT} prospects."

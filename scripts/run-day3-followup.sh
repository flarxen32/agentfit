#!/usr/bin/env bash
# XRO-42: Day-3 follow-up send + metrics report to Paperclip.
# Scheduled for 2026-07-09 (3 days after first-touch on 2026-07-06).
# Idempotent: aborts if date is too early or follow-ups already sent.
set -euo pipefail

cd /home/nog/agentfit

# --- Load Resend credentials ---
set -a
source .env.local
set +a

# --- Load Paperclip credentials (written by setup, not in shell profile) ---
if [ -f .paperclip-env ]; then
  source .paperclip-env
fi
# Unset stale RUN_ID — the cron fires autonomously with no heartbeat context.
# Sending a completed run's ID could cause the PATCH to be rejected.
unset PAPERCLIP_RUN_ID

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
npx tsx scripts/send-outbound.ts --template followup --exclude-bounced

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

# Build JSON safely with jq
PAYLOAD=$(jq -n \
  --arg status "in_review" \
  --arg comment "$METRICS_COMMENT" \
  '{status:$status, comment:$comment}')

# Post to Paperclip (include run ID header if available)
RUN_HEADER=()
if [ -n "${PAPERCLIP_RUN_ID:-}" ]; then
  RUN_HEADER=(-H "X-Paperclip-Run-Id: $PAPERCLIP_RUN_ID")
fi

HTTP_RESPONSE=$(curl -sS -o /dev/null -w "%{http_code}" \
  -X PATCH "${API_BASE}/issues/${ISSUE_ID}" \
  -H "Authorization: Bearer ${PAPERCLIP_API_KEY}" \
  "${RUN_HEADER[@]}" \
  -H "Content-Type: application/json" \
  --data-binary "$PAYLOAD" 2>&1) || HTTP_RESPONSE="curl_failed"

echo "Paperclip update HTTP status: $HTTP_RESPONSE"

echo ""
echo "=== XRO-42 Day-3 follow-up complete. ==="
echo "Follow-up sent to ${FOLLOWUP_SENT} prospects. Issue updated."

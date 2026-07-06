#!/usr/bin/env bash
# XRO-42: Day-3 follow-up send script.
# Sends the followup template to all non-bounced prospects.
# Run on or after 2026-07-09 (3 days after first-touch on 2026-07-06).
#
# Usage: bash scripts/send-followup.sh [--dry-run]
set -euo pipefail

cd "$(dirname "$0")/.."

# Load env (RESEND_API_KEY, RESEND_FROM_DOMAIN)
set -a
source .env.local
set +a

echo "=== XRO-42 Day-3 Follow-up Send ==="
echo "Time: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo ""

# Send followup to all prospects, excluding the 18 known-bounced addresses
# to protect sender reputation.
npx tsx scripts/send-outbound.ts --template followup --exclude-bounced "$@"

echo ""
echo "=== Send complete. Check data/outbound-log.jsonl for results. ==="

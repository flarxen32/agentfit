#!/usr/bin/env bash
# XRO-42 cron wrapper: fires run-day3-followup.sh daily at 09:00 UTC starting 2026-07-09.
# The inner script is date-gated and idempotent, so it's safe to run on other days.
set -euo pipefail
exec >> /home/nog/agentfit/data/day3-followup-cron.log 2>&1
echo "=== cron fire $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
cd /home/nog/agentfit
bash scripts/run-day3-followup.sh
echo "=== cron end (exit $?) ==="

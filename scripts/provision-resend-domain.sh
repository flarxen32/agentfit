#!/usr/bin/env bash
# provision-resend-domain.sh — XRO-24 DNS automation
#
# Creates the Resend sending domain via API, then writes every DNS record
# Resend returns into Cloudflare for xablam.com. Idempotent: re-running
# skips Resend domains that already exist and skips Cloudflare records that
# already match.
#
# Required env:
#   RESEND_API_KEY          re_... key from https://resend.com/api-keys
#   CLOUDFLARE_API_TOKEN    token with Zone:DNS:Edit on xablam.com
#   CLOUDFLARE_ZONE_ID      zone id for xablam.com (Cloudflare overview page)
# Optional:
#   SEND_DOMAIN             default hello.xablam.com
#   DRY_RUN=1               print the Cloudflare POST bodies but do not create
#
# Usage:
#   DRY_RUN=1 ./scripts/provision-resend-domain.sh
#   ./scripts/provision-resend-domain.sh
#
# After this runs, open Resend → Domains → Verify (or wait for auto-poll),
# then run scripts/send-test-email.ts to satisfy the XRO-24 DoD.
set -euo pipefail

: "${RESEND_API_KEY:?RESEND_API_KEY is required (re_...)}"
: "${CLOUDFLARE_API_TOKEN:?CLOUDFLARE_API_TOKEN is required}"
: "${CLOUDFLARE_ZONE_ID:?CLOUDFLARE_ZONE_ID is required}"
SEND_DOMAIN="${SEND_DOMAIN:-hello.xablam.com}"
DRY_RUN="${DRY_RUN:-0}"

echo ">> Provisioning DNS for $SEND_DOMAIN"
echo ">> Resend key set: ${RESEND_API_KEY:0:6}…  CF zone: $CLOUDFLARE_ZONE_ID  dry-run: $DRY_RUN"
echo

# --- 1. Create (or reuse) the Resend domain and fetch its DNS records ---------
DOMAIN_JSON="$(curl -sS -X POST https://api.resend.com/domains \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  --data "{\"name\":\"$SEND_DOMAIN\"}" 2>/dev/null || true)"

# If create failed it is usually because the domain already exists. Find it.
DOMAIN_ID="$(printf '%s' "$DOMAIN_JSON" | jq -r '.id // empty')"
DOMAIN_STATUS="$(printf '%s' "$DOMAIN_JSON" | jq -r '.status // empty')"
if [ -z "$DOMAIN_ID" ]; then
  echo ">> Create returned no id (likely already exists) — looking up existing domains…"
  DOMAIN_ID="$(curl -sS https://api.resend.com/domains \
    -H "Authorization: Bearer $RESEND_API_KEY" \
    | jq -r --arg d "$SEND_DOMAIN" '.data[]? | select(.name==$d) | .id' | head -n1)"
  if [ -z "$DOMAIN_ID" ]; then
    echo "!! Could not create or find domain $SEND_DOMAIN in Resend."
    printf '%s\n' "$DOMAIN_JSON"
    exit 1
  fi
  DOMAIN_JSON="$(curl -sS "https://api.resend.com/domains/$DOMAIN_ID" \
    -H "Authorization: Bearer $RESEND_API_KEY")"
  DOMAIN_STATUS="$(printf '%s' "$DOMAIN_JSON" | jq -r '.status // empty')"
fi

echo ">> Resend domain id: $DOMAIN_ID  status: $DOMAIN_STATUS"
echo

# Dump the full record set so we (and the human) can see exactly what's needed.
echo ">> Raw Resend records JSON:"
printf '%s\n' "$DOMAIN_JSON" | jq '.records // []'
echo

# --- 2. Push each record into Cloudflare -------------------------------------
RECORD_COUNT="$(printf '%s' "$DOMAIN_JSON" | jq '.records | length')"
if [ "$RECORD_COUNT" -lt 1 ]; then
  echo "!! Resend returned no records to create. Inspect the JSON above."
  exit 1
fi

# Cloudflare zone is xablam.com. Strip the zone suffix from record names so the
# API gets relative names it accepts; it also tolerates FQDNs, so either works.
ZONE_ROOT="xablam.com"

for i in $(seq 0 $((RECORD_COUNT - 1))); do
  R_TYPE="$(printf '%s' "$DOMAIN_JSON" | jq -r ".records[$i].type")"
  R_NAME="$(printf '%s' "$DOMAIN_JSON" | jq -r ".records[$i].name")"
  R_VAL="$(printf  '%s' "$DOMAIN_JSON" | jq -r ".records[$i].value // .records[$i].content")"

  # Some Resend records are labelled differently; normalize.
  case "$R_TYPE" in
    ""|"null") R_TYPE="$(printf '%s' "$DOMAIN_JSON" | jq -r ".records[$i].record // empty")" ;;
  esac

  echo ">> Record $((i+1))/$RECORD_COUNT — type=$R_TYPE name=$R_NAME"
  echo "     value=$R_VAL"

  # Make the name relative to the zone where possible.
  case "$R_NAME" in
    *."$ZONE_ROOT") REL_NAME="${R_NAME%.$ZONE_ROOT}" ;;
    "$ZONE_ROOT")   REL_NAME="@" ;;
    *)              REL_NAME="$R_NAME" ;;
  esac

  # Skip if an identical record already exists in Cloudflare.
  EXISTING="$(curl -sS -G "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    --data-urlencode "name=$R_NAME" \
    | jq -r --arg t "$R_TYPE" --arg c "$R_VAL" \
        '.result[]? | select(.type==$t and .content==$c) | .id' | head -n1)"
  if [ -n "$EXISTING" ]; then
    echo "     already present in Cloudflare (id=$EXISTING) — skipping."
    echo
    continue
  fi

  CF_BODY="$(jq -n --arg t "$R_TYPE" --arg n "$REL_NAME" --arg c "$R_VAL" \
    '{type:$t, name:$n, content:$c, ttl:1, proxied:false}')"

  if [ "$DRY_RUN" = "1" ]; then
    echo "     DRY_RUN — would POST: $CF_BODY"
    echo
    continue
  fi

  RESP="$(curl -sS -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/dns_records" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "$CF_BODY")"
  OK="$(printf '%s' "$RESP" | jq -r '.success // false')"
  NEW_ID="$(printf '%s' "$RESP" | jq -r '.result.id // empty')"
  if [ "$OK" = "true" ]; then
    echo "     created Cloudflare record id=$NEW_ID"
  else
    echo "     !! Cloudflare API reported failure:"
    printf '%s\n' "$RESP" | jq '.errors // .'
  fi
  echo
done

echo ">> Done. Next: in Resend → Domains → click Verify (or wait ~5 min for auto-poll),"
echo "   then run:  npx tsx scripts/send-test-email.ts --to <your-email>"
echo ">> You can also poll Resend status with:"
echo "   curl -sS https://api.resend.com/domains/$DOMAIN_ID -H \"Authorization: Bearer \$RESEND_API_KEY\" | jq '{status, records:[.records[]?.{name,type,status}]}'"

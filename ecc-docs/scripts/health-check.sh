#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# ECC Docs Health Check Script
#
# Verifies deployment is healthy by checking critical pages.
#
# Usage:
#   ./scripts/health-check.sh <deployment-url>
#   ./scripts/health-check.sh https://ecc-docs.vercel.app
#
# Exit codes:
#   0 - All health checks passed
#   1 - One or more checks failed
# ─────────────────────────────────────────────────────────────────────
set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
MAX_RETRIES=3
RETRY_DELAY=5
TIMEOUT=10

# Get deployment URL from argument or environment
BASE_URL="${1:-${DEPLOY_URL:-https://ecc-docs.vercel.app}}"

# Remove trailing slash
BASE_URL="${BASE_URL%/}"

echo -e "${BLUE}Health Check: ${BASE_URL}${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Critical pages to check
PAGES=(
  "/"
  "/docs/quick-start"
  "/docs/tutorials/"
  "/docs/tutorials/hello-ecc"
  "/docs/core-concepts/commands"
)

FAILED=0
PASSED=0

# ─── Check Function with Retry Logic ─────────────────────────────────
check_page() {
  local url="$1"
  local full_url="${BASE_URL}${url}"
  local attempt=1

  while [ $attempt -le $MAX_RETRIES ]; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time $TIMEOUT "$full_url" 2>/dev/null || echo "000")

    if [ "$HTTP_CODE" = "200" ]; then
      echo -e "  ${GREEN}✓${NC} ${url} (HTTP ${HTTP_CODE})"
      PASSED=$((PASSED + 1))
      return 0
    fi

    if [ $attempt -lt $MAX_RETRIES ]; then
      echo -e "  ${YELLOW}⟳${NC} ${url} (HTTP ${HTTP_CODE}) - retry attempt ${attempt}/${MAX_RETRIES}"
      sleep $RETRY_DELAY
    fi

    attempt=$((attempt + 1))
  done

  echo -e "  ${RED}✗${NC} ${url} (HTTP ${HTTP_CODE}) - failed after ${MAX_RETRIES} attempts"
  FAILED=$((FAILED + 1))
  return 1
}

# ─── Run Checks ──────────────────────────────────────────────────────
echo -e "\n${BLUE}Checking critical pages...${NC}\n"

for page in "${PAGES[@]}"; do
  check_page "$page" || true
done

# ─── Summary ──────────────────────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "Results: ${GREEN}${PASSED} passed${NC}, ${RED}${FAILED} failed${NC}"

if [ $FAILED -gt 0 ]; then
  echo -e "${RED}Health check FAILED!${NC}"
  exit 1
else
  echo -e "${GREEN}All health checks passed!${NC}"
  exit 0
fi

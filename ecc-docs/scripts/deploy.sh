#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# ECC Docs Deploy Script
#
# Usage:
#   ./scripts/deploy.sh              # Preview deployment
#   ./scripts/deploy.sh --prod       # Production deployment
#   ./scripts/deploy.sh --preview    # Explicit preview deployment
#
# Required environment variables:
#   VERCEL_TOKEN       - Vercel authentication token
#   VERCEL_ORG_ID      - Vercel organization ID (optional for CLI)
#   VERCEL_PROJECT_ID  - Vercel project ID (optional for CLI)
# ─────────────────────────────────────────────────────────────────────
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Parse arguments
DEPLOY_MODE="preview"
for arg in "$@"; do
  case $arg in
    --prod|--production)
      DEPLOY_MODE="prod"
      shift
      ;;
    --preview)
      DEPLOY_MODE="preview"
      shift
      ;;
    *)
      echo -e "${RED}Unknown argument: $arg${NC}"
      echo "Usage: $0 [--prod|--preview]"
      exit 1
      ;;
  esac
done

echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   ECC Docs Deploy Pipeline            ║${NC}"
echo -e "${BLUE}║   Mode: ${YELLOW}${DEPLOY_MODE}${BLUE}                          ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════╝${NC}"

# ─── Pre-flight Checks ───────────────────────────────────────────────
echo -e "\n${BLUE}[1/5] Pre-flight checks...${NC}"

# Check VERCEL_TOKEN
if [ -z "$VERCEL_TOKEN" ]; then
  echo -e "${RED}ERROR: VERCEL_TOKEN environment variable is not set${NC}"
  echo "Set it with: export VERCEL_TOKEN=your_token_here"
  exit 1
fi

# Check Vercel CLI
if ! command -v vercel &>/dev/null; then
  echo -e "${YELLOW}Installing Vercel CLI...${NC}"
  npm install -g vercel
fi

echo -e "${GREEN}✓ Pre-flight checks passed${NC}"

# ─── Run Tests ────────────────────────────────────────────────────────
echo -e "\n${BLUE}[2/5] Running tests (vitest)...${NC}"
cd "$PROJECT_DIR"

npx vitest run --reporter=dot
echo -e "${GREEN}✓ All tests passed${NC}"

# ─── Build ────────────────────────────────────────────────────────────
echo -e "\n${BLUE}[3/5] Building Docusaurus site...${NC}"

npm run build
echo -e "${GREEN}✓ Build successful${NC}"

# ─── Deploy ───────────────────────────────────────────────────────────
echo -e "\n${BLUE}[4/5] Deploying to Vercel (${DEPLOY_MODE})...${NC}"

if [ "$DEPLOY_MODE" = "prod" ]; then
  DEPLOY_URL=$(vercel --prod --token="$VERCEL_TOKEN" --yes 2>&1 | tail -1)
else
  DEPLOY_URL=$(vercel --token="$VERCEL_TOKEN" --yes 2>&1 | tail -1)
fi

echo -e "${GREEN}✓ Deployed to: ${DEPLOY_URL}${NC}"

# ─── Health Check ─────────────────────────────────────────────────────
echo -e "\n${BLUE}[5/5] Running health-check...${NC}"

if [ -f "$SCRIPT_DIR/health-check.sh" ]; then
  bash "$SCRIPT_DIR/health-check.sh" "$DEPLOY_URL"
else
  echo -e "${YELLOW}⚠ health-check.sh not found, skipping${NC}"
fi

# ─── Done ─────────────────────────────────────────────────────────────
echo -e "\n${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   Deployment Complete!                ║${NC}"
echo -e "${GREEN}║   URL: ${DEPLOY_URL}${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"

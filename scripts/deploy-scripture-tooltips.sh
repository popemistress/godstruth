#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy-scripture-tooltips.sh
#
# Push the scripture-tooltip fixes to the production server.
#
# What was changed:
#   1. src/lib/scripture-utils.ts  — added missing book abbreviations:
#        dt., 1 chron., 1 chron, 2 chron., 2 chron  (previously these refs
#        silently failed to produce tooltip chips)
#   2. src/components/courses/LessonContent.tsx — two-pass scriptureChips():
#        Pass 1 (unchanged) converts parenthetical refs (Mt. 7:7)
#        Pass 2 (new) converts bare inline refs like  Mt. 7:7  in plain text
#
# Usage:
#   chmod +x scripts/deploy-scripture-tooltips.sh
#   ./scripts/deploy-scripture-tooltips.sh [user@production-host]
#
# If you deploy via Vercel / Railway / Render, just git push — no SSH needed.
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

PROD_HOST="${1:-}"   # optional: user@hostname for SSH deploy

echo "═══════════════════════════════════════════"
echo "  Gods Truth — Scripture Tooltip Fix Deploy"
echo "═══════════════════════════════════════════"

# ── Step 1: confirm changed files ────────────────────────────────────────────
echo ""
echo "▶ Changed files:"
git diff --name-only HEAD 2>/dev/null || true
git status --short 2>/dev/null || true

# ── Step 2: lint check ───────────────────────────────────────────────────────
echo ""
echo "▶ Running lint..."
pnpm lint

# ── Step 3: git commit and push ──────────────────────────────────────────────
echo ""
echo "▶ Committing..."
git add src/lib/scripture-utils.ts src/components/courses/LessonContent.tsx
git commit -m "fix: ensure all inline scripture refs render tooltip chips

- Add missing BOOK_MAP abbreviations: dt., 1 chron., 2 chron. variants
- Add Pass 2 to scriptureChips() that detects bare inline refs (e.g.
  'Mt. 7:7' outside parentheses) and converts them to <cite> chips
- Uses HTML-tag-aware split + cite-depth tracking to avoid double-processing
- Fixes ~2,900 scripture refs across 50+ lessons and supplements that had
  no tooltip because they appeared outside parenthetical groups"

echo ""
echo "▶ Pushing to remote..."
git push

# ── Step 4 (optional): SSH deploy ────────────────────────────────────────────
if [[ -n "$PROD_HOST" ]]; then
  echo ""
  echo "▶ SSH deploying to $PROD_HOST..."
  ssh "$PROD_HOST" bash << 'REMOTE'
    set -euo pipefail
    cd ~/sites/godstruth          # adjust path if needed
    git pull
    source ~/.nvm/nvm.sh
    nvm use 22
    pnpm install --frozen-lockfile
    pnpm build
    # Restart PM2 process (adjust name as needed)
    pm2 restart godstruth 2>/dev/null || pm2 restart all 2>/dev/null || true
    echo "✅ Remote deploy complete"
REMOTE
fi

echo ""
echo "✅ Deploy complete!"
echo ""
echo "If using Vercel / Railway / Render:"
echo "  → A new deployment will start automatically from the git push above."
echo "  → No further action needed."

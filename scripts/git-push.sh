#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# git-push.sh
#
# Stage all changes, commit with a message, and push to origin/main.
#
# Usage:
#   ./scripts/git-push.sh "Your commit message"
#   ./scripts/git-push.sh          ← prompts for a message
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

BOLD="\033[1m"
GREEN="\033[32m"
CYAN="\033[36m"
YELLOW="\033[33m"
RED="\033[31m"
DIM="\033[2m"
RESET="\033[0m"

log()     { echo -e "${BOLD}${CYAN}  →${RESET} $*"; }
success() { echo -e "${BOLD}${GREEN}  ✔${RESET} $*"; }
warn()    { echo -e "${BOLD}${YELLOW}  ⚠${RESET} $*"; }
error()   { echo -e "${BOLD}${RED}  ✖${RESET} $*" >&2; }
dim()     { echo -e "${DIM}    $*${RESET}"; }
divider() { echo -e "${DIM}──────────────────────────────────────────────────────${RESET}"; }

cd ~/sites/godstruth

echo ""
echo -e "${BOLD}╔══════════════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}║           Gods Truth — Git Push to main              ║${RESET}"
echo -e "${BOLD}╚══════════════════════════════════════════════════════╝${RESET}"
echo ""

# ── Get commit message ────────────────────────────────────────────────────────
if [[ -n "${1:-}" ]]; then
  COMMIT_MSG="$1"
else
  echo -e "${BOLD}  Enter commit message:${RESET}"
  read -rp "  > " COMMIT_MSG
fi

if [[ -z "$COMMIT_MSG" ]]; then
  error "Commit message cannot be empty."
  exit 1
fi

# ── Git status ────────────────────────────────────────────────────────────────
divider
log "Current branch and status:"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
dim "  Branch: ${BRANCH}"
echo ""
git status
echo ""

# Abort if nothing to commit
if git diff --quiet && git diff --cached --quiet && [[ -z "$(git ls-files --others --exclude-standard)" ]]; then
  warn "Nothing to commit — working tree is clean."
  exit 0
fi

# ── Stage all changes ─────────────────────────────────────────────────────────
divider
log "Staging all changes (git add .) ..."
git add .
success "All changes staged"

log "Staged files:"
git diff --cached --name-status | while IFS=$'\t' read -r status file; do
  case "$status" in
    A) dim "  [added]    $file" ;;
    M) dim "  [modified] $file" ;;
    D) dim "  [deleted]  $file" ;;
    R*) dim "  [renamed]  $file" ;;
    *) dim "  [$status] $file" ;;
  esac
done

# ── Commit ────────────────────────────────────────────────────────────────────
divider
log "Committing with message: \"${COMMIT_MSG}\""
git commit -m "${COMMIT_MSG}"
success "Commit created"

COMMIT_HASH=$(git rev-parse --short HEAD)
dim "  Commit: ${COMMIT_HASH}"

# ── Push ──────────────────────────────────────────────────────────────────────
divider
log "Pushing to origin/${BRANCH} ..."
git push origin "${BRANCH}"
success "Pushed to origin/${BRANCH}"

# ── Summary ───────────────────────────────────────────────────────────────────
divider
echo ""
echo -e "${BOLD}${GREEN}╔══════════════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${GREEN}║              ✔  Push complete                        ║${RESET}"
echo -e "${BOLD}${GREEN}╚══════════════════════════════════════════════════════╝${RESET}"
echo ""
dim "  Branch : ${BRANCH}"
dim "  Commit : ${COMMIT_HASH} — ${COMMIT_MSG}"
echo ""

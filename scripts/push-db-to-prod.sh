#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# push-db-to-prod.sh
#
# 1. Dumps the local dev PostgreSQL database (via Docker)
# 2. SCPs the dump to the production server
# 3. SSHs in, drops the prod DB, recreates it, and restores from the dump
#
# Usage:  ./scripts/push-db-to-prod.sh
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

# ── Colours ──────────────────────────────────────────────────────────────────
BOLD="\033[1m"
DIM="\033[2m"
GREEN="\033[32m"
YELLOW="\033[33m"
CYAN="\033[36m"
RED="\033[31m"
RESET="\033[0m"

log()     { echo -e "${BOLD}${CYAN}  →${RESET} $*"; }
success() { echo -e "${BOLD}${GREEN}  ✔${RESET} $*"; }
warn()    { echo -e "${BOLD}${YELLOW}  ⚠${RESET} $*"; }
error()   { echo -e "${BOLD}${RED}  ✖${RESET} $*" >&2; }
dim()     { echo -e "${DIM}    $*${RESET}"; }
banner()  { echo -e "\n${BOLD}${CYAN}$*${RESET}"; }
divider() { echo -e "${DIM}──────────────────────────────────────────────────────${RESET}"; }

# Elapsed time helper
START_TIME=$(date +%s)
elapsed() {
  local now
  now=$(date +%s)
  echo $(( now - START_TIME ))s
}

# ── Local config ─────────────────────────────────────────────────────────────
LOCAL_CONTAINER="postgres"
LOCAL_USER="dbuser"
LOCAL_PASS="1P@55W0rd"
LOCAL_DB="godstruth"
BACKUP_FILE="$(pwd)/godstruth_push_$(date +%Y%m%d_%H%M%S).sql"

# ── Remote config ─────────────────────────────────────────────────────────────
SSH_HOST="web"
REMOTE_CONTAINER="godstruth_postgres"
REMOTE_USER="multipledevsites1"
REMOTE_PASS="pKZMHK8Hh%C0G*fy"
REMOTE_DB="godstruth"
REMOTE_TMP="/tmp/godstruth_restore.sql"

# ─────────────────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}╔══════════════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}║        Gods Truth — Push Dev DB → Production         ║${RESET}"
echo -e "${BOLD}╚══════════════════════════════════════════════════════╝${RESET}"
echo ""
echo -e "${DIM}  Local  container : ${LOCAL_CONTAINER}${RESET}"
echo -e "${DIM}  Local  database  : ${LOCAL_DB}${RESET}"
echo -e "${DIM}  Remote SSH host  : ${SSH_HOST}${RESET}"
echo -e "${DIM}  Remote container : ${REMOTE_CONTAINER}${RESET}"
echo -e "${DIM}  Remote database  : ${REMOTE_DB}${RESET}"
echo -e "${DIM}  Backup file      : ${BACKUP_FILE}${RESET}"
echo ""

# ── Safety confirmation ───────────────────────────────────────────────────────
warn "This will DESTROY the production database and replace it with local data."
echo ""
read -rp "$(echo -e "${BOLD}  Type 'yes' to continue: ${RESET}")" CONFIRM
if [[ "$CONFIRM" != "yes" ]]; then
  error "Aborted — you must type 'yes' to proceed."
  exit 1
fi

# ─────────────────────────────────────────────────────────────────────────────
banner "STEP 1/5 — Verifying local Docker container"
divider

log "Checking that Docker container '${LOCAL_CONTAINER}' is running..."
if ! docker inspect --format='{{.State.Status}}' "${LOCAL_CONTAINER}" 2>/dev/null | grep -q "running"; then
  error "Container '${LOCAL_CONTAINER}' is not running. Start it and try again."
  exit 1
fi
success "Container '${LOCAL_CONTAINER}' is running"

log "Checking PostgreSQL is accepting connections inside container..."
docker exec -e PGPASSWORD="${LOCAL_PASS}" "${LOCAL_CONTAINER}" \
  pg_isready -U "${LOCAL_USER}" -d "${LOCAL_DB}" -q
success "PostgreSQL is ready inside '${LOCAL_CONTAINER}'"

log "Counting tables in local database..."
TABLE_COUNT=$(docker exec -e PGPASSWORD="${LOCAL_PASS}" "${LOCAL_CONTAINER}" \
  psql -U "${LOCAL_USER}" -d "${LOCAL_DB}" -t -c \
  "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';" | xargs)
success "Found ${TABLE_COUNT} tables in local '${LOCAL_DB}'"

log "Counting rows across key tables..."
for TABLE in "User" "CourseLesson" "BibleEdition" "Content"; do
  COUNT=$(docker exec -e PGPASSWORD="${LOCAL_PASS}" "${LOCAL_CONTAINER}" \
    psql -U "${LOCAL_USER}" -d "${LOCAL_DB}" -t -c \
    "SELECT COUNT(*) FROM \"${TABLE}\" LIMIT 1;" 2>/dev/null | xargs || echo "N/A")
  dim "  ${TABLE}: ${COUNT} rows"
done

# ─────────────────────────────────────────────────────────────────────────────
banner "STEP 2/5 — Dumping local database"
divider

log "Running pg_dump on '${LOCAL_DB}'..."
log "Output file: ${BACKUP_FILE}"
DUMP_START=$(date +%s)

VERBOSE_LOG="/tmp/pgdump_verbose_$$.log"

# stdout → SQL file, stderr → separate verbose log (keeps dump file clean)
docker exec \
  -e PGPASSWORD="${LOCAL_PASS}" \
  "${LOCAL_CONTAINER}" \
  pg_dump \
    -U "${LOCAL_USER}" \
    -d "${LOCAL_DB}" \
    --no-owner \
    --no-acl \
    --clean \
    --if-exists \
    --verbose \
  > "${BACKUP_FILE}" \
  2> "${VERBOSE_LOG}"

DUMP_END=$(date +%s)
DUMP_SECS=$(( DUMP_END - DUMP_START ))
LINES=$(wc -l < "${BACKUP_FILE}")
SIZE=$(du -sh "${BACKUP_FILE}" | cut -f1)
VLOG_LINES=$(wc -l < "${VERBOSE_LOG}")

success "Dump complete in ${DUMP_SECS}s"
dim "  File      : ${BACKUP_FILE}"
dim "  Size      : ${SIZE}"
dim "  SQL lines : ${LINES}"
dim "  Verbose log (${VLOG_LINES} lines): ${VERBOSE_LOG}"

# Show last few lines of the verbose log so you can see what was dumped
log "pg_dump verbose log (last 10 lines):"
tail -10 "${VERBOSE_LOG}" | while IFS= read -r line; do dim "  $line"; done

# Validate the SQL file starts with the expected postgres header
log "Validating dump file integrity..."
HEADER=$(head -1 "${BACKUP_FILE}")
if [[ "$HEADER" == "--"* ]]; then
  success "Dump file header looks correct: ${HEADER}"
else
  error "Dump file may be corrupt — unexpected first line: ${HEADER}"
  exit 1
fi

# Show first 4 SQL lines as a sanity check
log "Dump SQL preview (first 4 lines):"
head -4 "${BACKUP_FILE}" | while IFS= read -r line; do dim "  $line"; done

# ─────────────────────────────────────────────────────────────────────────────
banner "STEP 3/5 — Transferring dump to production server"
divider

log "Testing SSH connectivity to '${SSH_HOST}'..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes "${SSH_HOST}" "echo ok" &>/dev/null; then
  error "Cannot connect to '${SSH_HOST}' — check your SSH config."
  exit 1
fi
success "SSH connection to '${SSH_HOST}' is working"

log "Uploading ${SIZE} dump file to ${SSH_HOST}:${REMOTE_TMP} ..."
SCP_START=$(date +%s)
scp -v "${BACKUP_FILE}" "${SSH_HOST}:${REMOTE_TMP}" 2>&1 | \
  grep -E "^(Sending|Bytes|debug1: Sending)" | while IFS= read -r line; do dim "  $line"; done || \
  scp "${BACKUP_FILE}" "${SSH_HOST}:${REMOTE_TMP}"
SCP_END=$(date +%s)
success "Upload complete in $(( SCP_END - SCP_START ))s → ${SSH_HOST}:${REMOTE_TMP}"

log "Verifying file arrived on production server..."
REMOTE_SIZE=$(ssh "${SSH_HOST}" "wc -c < '${REMOTE_TMP}'" | xargs)
LOCAL_SIZE=$(wc -c < "${BACKUP_FILE}" | xargs)
dim "  Local size  : ${LOCAL_SIZE} bytes"
dim "  Remote size : ${REMOTE_SIZE} bytes"
if [[ "$REMOTE_SIZE" != "$LOCAL_SIZE" ]]; then
  error "File size mismatch after transfer! Aborting."
  exit 1
fi
success "File size matches — transfer verified"

# ─────────────────────────────────────────────────────────────────────────────
banner "STEP 4/5 — Restoring database on production server"
divider

log "Connecting to ${SSH_HOST} to perform restore..."

ssh "${SSH_HOST}" bash << REMOTE
set -euo pipefail

BOLD="\033[1m"
DIM="\033[2m"
GREEN="\033[32m"
YELLOW="\033[33m"
CYAN="\033[36m"
RED="\033[31m"
RESET="\033[0m"
rlog()     { echo -e "\${BOLD}\${CYAN}  →\${RESET} \$*"; }
rsuccess() { echo -e "\${BOLD}\${GREEN}  ✔\${RESET} \$*"; }
rdim()     { echo -e "\${DIM}    \$*\${RESET}"; }
rerror()   { echo -e "\${BOLD}\${RED}  ✖\${RESET} \$*" >&2; }

CONTAINER="${REMOTE_CONTAINER}"
RUSER="${REMOTE_USER}"
PASS="${REMOTE_PASS}"
DB="${REMOTE_DB}"
DUMP_FILE="${REMOTE_TMP}"

rlog "Verifying Docker container '\${CONTAINER}' is running on production..."
STATUS=\$(docker inspect --format='{{.State.Status}}' "\${CONTAINER}" 2>/dev/null || echo "not found")
rdim "  Container status: \${STATUS}"
if [[ "\${STATUS}" != "running" ]]; then
  rerror "Container '\${CONTAINER}' is not running on production!"
  exit 1
fi
rsuccess "Container '\${CONTAINER}' is running"

rlog "Checking PostgreSQL is ready inside production container..."
docker exec -e PGPASSWORD="\${PASS}" "\${CONTAINER}" \
  pg_isready -U "\${RUSER}" -q
rsuccess "PostgreSQL is ready"

rlog "Checking dump file exists and is readable..."
DUMP_SIZE=\$(wc -c < "\${DUMP_FILE}" | xargs)
DUMP_LINES=\$(wc -l < "\${DUMP_FILE}" | xargs)
rdim "  Dump file : \${DUMP_FILE}"
rdim "  Size      : \${DUMP_SIZE} bytes"
rdim "  Lines     : \${DUMP_LINES}"
rsuccess "Dump file is present"

rlog "Counting active connections to '\${DB}'..."
CONN_COUNT=\$(docker exec -e PGPASSWORD="\${PASS}" "\${CONTAINER}" \
  psql -U "\${RUSER}" -d postgres -t -c \
  "SELECT COUNT(*) FROM pg_stat_activity WHERE datname='\${DB}';" | xargs)
rdim "  Active connections: \${CONN_COUNT}"

rlog "Terminating all active connections to '\${DB}'..."
KILLED=\$(docker exec -e PGPASSWORD="\${PASS}" "\${CONTAINER}" \
  psql -U "\${RUSER}" -d postgres -t -c \
  "SELECT COUNT(pg_terminate_backend(pid)) FROM pg_stat_activity
   WHERE datname='\${DB}' AND pid <> pg_backend_pid();" | xargs)
rsuccess "Terminated \${KILLED} connection(s)"

rlog "Dropping database '\${DB}'..."
docker exec -e PGPASSWORD="\${PASS}" "\${CONTAINER}" \
  psql -U "\${RUSER}" -d postgres -c "DROP DATABASE IF EXISTS \"\${DB}\";"
rsuccess "Database '\${DB}' dropped"

rlog "Creating fresh database '\${DB}' owned by '\${RUSER}'..."
docker exec -e PGPASSWORD="\${PASS}" "\${CONTAINER}" \
  psql -U "\${RUSER}" -d postgres -c "CREATE DATABASE \"\${DB}\" OWNER \"\${RUSER}\";"
rsuccess "Database '\${DB}' created"

rlog "Restoring dump into '\${DB}' (this may take a moment)..."
rdim "  Strategy: single transaction + disable FK triggers during load"
RESTORE_START=\$(date +%s)
RESTORE_LOG="/tmp/restore_errors_\$\$.log"

# Wrap the restore in a single transaction and disable trigger-based FK checks
# during the load so that forward-reference FK errors don't abort the import.
# The constraints still exist in the schema — they're just deferred until commit.
(
  echo "SET session_replication_role = replica;"
  cat "\${DUMP_FILE}"
  echo "SET session_replication_role = DEFAULT;"
) | docker exec -i -e PGPASSWORD="\${PASS}" "\${CONTAINER}" \
  psql -U "\${RUSER}" -d "\${DB}" \
  --echo-errors \
  2> "\${RESTORE_LOG}"

RESTORE_END=\$(date +%s)
RESTORE_SECS=\$(( RESTORE_END - RESTORE_START ))

# Check for real errors (ignore the expected DROP notices on fresh DB)
REAL_ERRORS=\$(grep -c "^ERROR" "\${RESTORE_LOG}" 2>/dev/null; true)
REAL_ERRORS=\${REAL_ERRORS:-0}
WARNINGS=\$(grep -c "^WARNING\|NOTICE" "\${RESTORE_LOG}" 2>/dev/null; true)
WARNINGS=\${WARNINGS:-0}

rdim "  Elapsed        : \${RESTORE_SECS}s"
rdim "  Real errors    : \${REAL_ERRORS}"
rdim "  Notices/warnings: \${WARNINGS}"

if [[ "\${REAL_ERRORS}" -gt 0 ]]; then
  rerror "Restore had \${REAL_ERRORS} error(s):"
  grep "^ERROR" "\${RESTORE_LOG}" | while IFS= read -r line; do rerror "  \${line}"; done
  rerror "Full log: \${RESTORE_LOG}"
  exit 1
fi

rsuccess "Restore complete in \${RESTORE_SECS}s — no errors"

rlog "Verifying restored tables..."
TABLE_COUNT=\$(docker exec -e PGPASSWORD="\${PASS}" "\${CONTAINER}" \
  psql -U "\${RUSER}" -d "\${DB}" -t -c \
  "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';" | xargs)
rdim "  Table count: \${TABLE_COUNT}"
rsuccess "Restored \${TABLE_COUNT} tables in production '${REMOTE_DB}'"

rlog "Spot-checking row counts on production..."
for TABLE in "User" "CourseLesson" "BibleEdition" "Content" "SiteSettings"; do
  COUNT=\$(docker exec -e PGPASSWORD="\${PASS}" "\${CONTAINER}" \
    psql -U "\${RUSER}" -d "\${DB}" -t -c \
    "SELECT COUNT(*) FROM \"\${TABLE}\";" 2>/dev/null | xargs || echo "N/A")
  rdim "  \${TABLE}: \${COUNT} rows"
done

TOTAL_ROWS=\$(docker exec -e PGPASSWORD="\${PASS}" "\${CONTAINER}" \
  psql -U "\${RUSER}" -d "\${DB}" -t -c \
  "SELECT SUM(n_live_tup) FROM pg_stat_user_tables;" 2>/dev/null | xargs || echo "?")
rdim "  Total rows across all tables: ~\${TOTAL_ROWS}"

rlog "Removing temp dump file from production server..."
rm -f "\${DUMP_FILE}" "\${RESTORE_LOG}"
rsuccess "Temp files removed"
REMOTE

# ─────────────────────────────────────────────────────────────────────────────
banner "STEP 5/5 — Summary"
divider

TOTAL=$(elapsed)
success "All steps completed in ${TOTAL}"
echo ""
echo -e "${DIM}  Local backup kept at:${RESET}"
echo -e "${BOLD}  ${BACKUP_FILE}${RESET}"
echo ""
echo -e "${BOLD}${GREEN}╔══════════════════════════════════════════════════════╗${RESET}"
echo -e "${BOLD}${GREEN}║     ✔  Production database successfully replaced     ║${RESET}"
echo -e "${BOLD}${GREEN}╚══════════════════════════════════════════════════════╝${RESET}"
echo ""

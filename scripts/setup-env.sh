#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

pnpm exec supabase start

env_output="$(pnpm exec supabase status -o env 2>/dev/null)"

get_var() {
  local name="$1"
  echo "$env_output" | grep "^${name}=" | head -n1 | cut -d= -f2- | sed 's/^"\(.*\)"$/\1/'
}

API_URL="$(get_var API_URL)"
PUBLISHABLE_KEY="$(get_var PUBLISHABLE_KEY)"
ANON_KEY="$(get_var ANON_KEY)"
SECRET_KEY="$(get_var SECRET_KEY)"

if [[ -z "$API_URL" ]]; then
  echo "error: could not read API_URL from supabase status" >&2
  exit 1
fi

NEXT_PUBLIC_SUPABASE_ANON_KEY="${PUBLISHABLE_KEY:-$ANON_KEY}"

if [[ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]]; then
  echo "error: could not read anon key from supabase status" >&2
  exit 1
fi

if [[ -z "$SECRET_KEY" ]]; then
  echo "error: could not read secret key from supabase status" >&2
  exit 1
fi

cat > .env.local <<EOF
NEXT_PUBLIC_SUPABASE_URL=${API_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
SUPABASE_SECRET_KEY=${SECRET_KEY}
EOF

echo "Wrote .env.local"

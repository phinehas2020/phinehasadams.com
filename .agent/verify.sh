#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

required_files=(
  ".agent/PLANS.md"
  ".agent/Prompt.md"
  ".agent/Plan.md"
  ".agent/Implement.md"
  ".agent/Documentation.md"
  ".agent/contracts/current.md"
  ".agent/reports/latest.md"
  ".agent/EvaluatorRubric.md"
  ".agent/verify.sh"
)

for file in "${required_files[@]}"; do
  test -f "$file"
done

milestone="$(sed -n 's/^Milestone: //p' .agent/contracts/current.md | head -n 1)"

case "$milestone" in
  M01)
    echo "verify: M01 bootstrap checks"
    test -x .agent/verify.sh
    ;;
  *)
    echo "verify: runtime checks for $milestone"
    npm run lint
    npm run build
    ;;
esac

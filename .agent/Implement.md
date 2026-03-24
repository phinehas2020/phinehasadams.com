# Implementation Runbook

## Source of truth
1. `.agent/Prompt.md`
2. `.agent/Plan.md`
3. `.agent/contracts/current.md`
4. `.agent/Documentation.md`

## Project-specific working rules
- Implement exactly one milestone at a time.
- Do not widen scope because a nearby cleanup looks easy.
- Preserve the strongest current qualities: clear typography, restrained tone, and the Sanity-backed website inventory.
- Default to deleting, isolating, or replacing legacy unused homepage code instead of keeping two competing brand directions alive.
- Keep the remake grounded in business clarity, not novelty for novelty's sake.
- Record every meaningful change in `.agent/Documentation.md`.
- Respect the dirty working tree; do not overwrite unrelated user edits.

## Required validation
- For planning-only milestones, run `./.agent/verify.sh` and any contract-specific existence checks.
- For runtime milestones, run:
  - `./.agent/verify.sh`
  - `npm run lint`
  - `npm run build`
- If the current milestone changes rendered UI or browser flows, also run Playwright QA on the affected public routes.

## UI-specific rule
- Always verify both `/` and `/websites-for-sale` after any shared-shell or visual-system change.
- Keep the public site coherent across light/dark sections, typography, motion, and CTA hierarchy.

## Documentation update
After every meaningful change, record:
- current milestone
- files changed
- commands run
- pass/fail status
- decisions made
- known issues
- next step

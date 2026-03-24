# Project Plan

## Goal
Turn `phinehasadams.com` into a coherent personal-business site where the homepage, ready-made website inventory, and proof all reinforce the same story.

## Non-goals
- Do not redesign unrelated demo routes unless a milestone explicitly includes them.
- Do not add a complex commerce layer.
- Do not change the core Next.js + Sanity stack without a separate contract.

## Hard constraints
- Preserve Sanity as the inventory source of truth.
- Keep legal routes and `/studio` functional.
- Respect the existing dirty working tree; new milestones must not silently overwrite user edits.
- Stop and repair when validation fails before moving forward.

## Intended architecture
- Shared marketing shell: navigation, footer, metadata, typography, tokens, and CTA conventions that unify public pages.
- Homepage narrative modules: hero, offer framing, proof/work, approach/process, and contact CTA.
- Inventory/product layer: Sanity-backed website cards, pricing/status, preview media, and conversion paths for ready-made sites.
- Supporting routes: legal content and retained demo/internal routes with clear public vs. non-public intent.
- Cleanup layer: removal or quarantine of unused legacy components, stale docs, and outdated content instructions.

## Milestones

### M01 - Bootstrap Durable Workflow
Scope:
- create the `.agent` workspace in this repo
- freeze the brief, milestone map, and baseline verification state
- add a repo-local `verify.sh`

Non-goals:
- editing the live site runtime
- fixing existing lint failures
- redesigning any public route

Acceptance criteria:
- `.agent/PLANS.md`, `.agent/Prompt.md`, `.agent/Plan.md`, `.agent/Implement.md`, `.agent/Documentation.md`, `.agent/contracts/current.md`, `.agent/reports/latest.md`, `.agent/EvaluatorRubric.md`, and `.agent/verify.sh` exist in this repo
- the planning files explicitly describe the current homepage, `/websites-for-sale`, Sanity website documents, legal routes, and legacy repo drift
- the baseline verification state is recorded with `npm run lint` failing and `npm run build` passing

Validation:
- `./.agent/verify.sh`
- `npm run lint`
- `npm run build`

Smoke test:
- open the `.agent` files and confirm they describe this repo instead of a generic redesign project

Failure conditions:
- the bootstrap files ignore the actual route structure or Sanity content model
- the docs claim lint already passes
- the bootstrap touches unrelated runtime files

### M02 - Unify The Foundation
Scope:
- establish the shared public IA, navigation, footer, and visual system
- decide what content stays in code versus moving into Sanity
- remove or quarantine clearly unused legacy homepage components and stale update docs

Non-goals:
- full homepage content polish
- deep catalog enhancements

Acceptance criteria:
- `/` and `/websites-for-sale` share one coherent shell
- stale docs and clearly dead legacy homepage direction are removed, replaced, or explicitly isolated
- content ownership is documented so future edits are straightforward

Validation:
- `./.agent/verify.sh`
- `npm run lint`
- `npm run build`
- browser QA on `/` and `/websites-for-sale`

Smoke test:
- visit both public pages and confirm they share the same brand language, navigation structure, and footer conventions

Failure conditions:
- old and new directions remain mixed together
- content update paths are still misleading
- shared shell changes break either public route

### M03 - Rebuild The Homepage
Scope:
- refine the home page into a high-conviction positioning page
- strengthen the hero, offer framing, proof, approach, and contact CTA
- make the pathways to custom work and ready-made sites explicit

Non-goals:
- redesigning the full catalog flow
- adding speculative new public pages

Acceptance criteria:
- the first viewport clearly communicates who the site is for, what is offered, and what action to take
- proof and approach sections support the positioning instead of reading like filler
- the contact path feels intentional and low-friction

Validation:
- `./.agent/verify.sh`
- `npm run lint`
- `npm run build`
- Playwright QA on `/`

Smoke test:
- a first-time visitor can land on `/`, describe the offer, and reach a CTA without confusion

Failure conditions:
- the homepage remains too broad or too vague
- proof is weak or disconnected from the offer
- the page regresses visually or responsively

### M04 - Rebuild The Ready-made Sites Funnel
Scope:
- redesign `/websites-for-sale` so it feels like a productized branch of the main brand
- clarify who the offer is for, how customization works, and when to buy versus request custom work
- improve the inventory presentation, trust, and CTA hierarchy

Non-goals:
- building a full commerce platform
- custom detail pages for every site unless a later contract adds them

Acceptance criteria:
- the page explains the ready-made offer with credible process framing
- available versus sold inventory is easy to scan
- pricing, previews, and CTA options are consistent and intentional
- the page reinforces, rather than competes with, the main site positioning

Validation:
- `./.agent/verify.sh`
- `npm run lint`
- `npm run build`
- Playwright QA on `/websites-for-sale`

Smoke test:
- a visitor can compare sites, understand the offer mechanics, and choose either purchase or custom inquiry without guessing

Failure conditions:
- the page still feels like a separate brand or one-off campaign
- inventory status or pricing presentation is confusing
- CTA hierarchy pushes the wrong action or hides the custom route

### M05 - Proof, Launch Hygiene, And Finish
Scope:
- finalize responsive polish, accessibility, metadata, legal-page consistency, and launch hygiene
- tighten documentation, remove remaining drift, and lock the verification stack

Non-goals:
- adding unrelated new features
- keeping experimental public routes without purpose

Acceptance criteria:
- public routes are polished, responsive, and consistent
- metadata, sitemap, robots, and legal pages match the final IA
- the documentation reflects what changed, how it was verified, and what remains

Validation:
- `./.agent/verify.sh`
- `npm run lint`
- `npm run build`
- Playwright QA across the final public demo flow

Smoke test:
- run the full visitor flow from home to proof to ready-made sites to legal and contact destinations with no broken edges

Failure conditions:
- verification is skipped
- obvious mobile or accessibility regressions remain
- final docs do not match the implemented site

## Stop-and-fix rule
If a validation command fails, stop and repair before moving to the next milestone.

## Decision log
- 2026-03-24: Bootstrap AGENTS workflow directly in the site repo so durable memory lives next to the code it governs.
- 2026-03-24: Preserve the current Next.js + Sanity stack because the live inventory and CMS flow already work.
- 2026-03-24: Treat the project as unification, not a blank-slate rebuild; the current homepage and catalog both contain valuable material.
- 2026-03-24: Explicitly plan legacy cleanup because the old component set is already causing lint and maintenance drift.

## Final demo flow
1. A new visitor lands on `/` and immediately understands the offer.
2. The visitor sees proof and approach that back up the positioning.
3. The visitor chooses between custom work and ready-made sites.
4. The visitor reaches `/websites-for-sale`, understands the inventory model, and takes a purchase or inquiry action.
5. The visitor can still access legal and contact destinations without friction.

# Current Milestone Contract

Milestone: M02

## Objective
Create a coherent public foundation across `/`, `/websites-for-sale`, and the legal pages by introducing shared chrome, aligning the visual system, updating stale content-owner docs, and removing the dead legacy component set that is no longer part of the live site.

## In scope
- add shared public navigation and footer across the public routes
- bring `/websites-for-sale`, `/privacy-policy`, and `/terms-and-conditions` into the same typography, spacing, and CTA system as the homepage
- clean up or remove legacy unused homepage components under `src/app/(site)/components/` that are no longer part of the active route tree
- update stale repo docs so content ownership points to the live files
- preserve the current Sanity website inventory flow while improving the surrounding shell

## Out of scope
- a full homepage narrative rewrite beyond what is needed to fit the shared shell
- a full catalog conversion rewrite or schema change
- new public routes
- changes to the `/studio` route behavior

## Files likely to change
- `.agent/Documentation.md`
- `.agent/contracts/current.md`
- `.agent/reports/latest.md`
- `CONTENT_UPDATE_GUIDE.md`
- `README.md`
- `src/app/(site)/layout.tsx`
- `src/app/(site)/components/home/HomePage.tsx`
- `src/app/(site)/components/home/HomePage.module.css`
- `src/app/(site)/websites-for-sale/page.tsx`
- `src/app/(site)/websites-for-sale/page.module.css`
- `src/app/(site)/websites-for-sale/WebsitePreview.tsx`
- `src/app/(site)/privacy-policy/page.tsx`
- `src/app/(site)/terms-and-conditions/page.tsx`
- `src/app/globals.css`
- legacy files under `src/app/(site)/components/` that are confirmed unused

## User-visible behaviors
- Visitors see one consistent header/footer system across home, catalog, and legal routes.
- `/websites-for-sale` feels like a productized branch of the main brand rather than a different product.
- Legal pages feel intentional and navigable instead of isolated inline-style documents.
- The public site no longer depends on dead legacy components that are not part of the live experience.

## Acceptance criteria
- `/`, `/websites-for-sale`, `/privacy-policy`, and `/terms-and-conditions` share one visible brand system and navigation/footer pattern.
- Stale docs point to the active homepage and catalog files instead of the dead component set.
- Unused legacy components are removed or explicitly isolated so they no longer create lint failures.
- `npm run lint` passes.
- `npm run build` passes.
- Browser QA confirms the shared shell works on both desktop and mobile for `/` and `/websites-for-sale`.

## Edge cases to verify
- Do not break the Sanity-driven inventory listing, sold states, pricing display, or Stripe links on `/websites-for-sale`.
- Do not hide or break legal routes while adding shared chrome.
- Do not accidentally remove a component that is still referenced by an active route.
- Do not overwrite or regress the user's in-progress homepage/layout work while aligning the shell.

## Verification
- `./.agent/verify.sh`
- `npm run lint`
- `npm run build`
- browser QA on `/` at desktop and mobile widths
- browser QA on `/websites-for-sale` at desktop and mobile widths
- smoke test `/privacy-policy` and `/terms-and-conditions`

## Failure conditions
- Home and catalog still feel like different products.
- Stale docs still tell the user to edit dead files.
- The legacy component cleanup breaks imports or leaves lint failing.
- Navigation, CTAs, or legal links break on any public route.

## Planner notes
Visual thesis: warm editorial-industrial with calm precision, no terminal cosplay, and no neon-SaaS chrome.
Content plan: shared shell first, then route-specific content inside that shell.
Interaction thesis: subtle sticky chrome, restrained image hover, and quiet CTA motion only.

## Evaluator notes
Fail this milestone if it only changes colors without unifying navigation and route structure, or if it claims cleanup while the dead component set still drives lint failures. Pass only if the public routes clearly belong to one brand system and the repo drift is materially reduced.

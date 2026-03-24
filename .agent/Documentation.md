---
status: in_progress
current_milestone: M02
---

# Project Documentation

## Summary
Completed the public-site unification pass for `/Users/phinehasadams/phinehasadams.com` by adding shared chrome across the public routes, bringing the ready-made websites page and legal pages into the same visual system as the homepage, updating stale docs, and removing the dead legacy component set that was still causing lint noise. The public routes now feel like one product instead of a homepage and a separate catalog campaign.

## Milestone status
- M01: completed
- M02: completed
- M03: pending
- M04: pending
- M05: pending

## Files changed
- `.agent/Documentation.md`
- `.agent/contracts/current.md`
- `.agent/reports/latest.md`
- `.claude/napkin.md`
- `CONTENT_UPDATE_GUIDE.md`
- `README.md`
- `src/app/(site)/layout.tsx`
- `src/app/(site)/components/home/HomePage.tsx`
- `src/app/(site)/components/home/HomePage.module.css`
- `src/app/(site)/components/site/SiteChrome.tsx`
- `src/app/(site)/components/site/SiteChrome.module.css`
- `src/app/(site)/components/site/PolicyPage.tsx`
- `src/app/(site)/components/site/PolicyPage.module.css`
- `src/app/(site)/privacy-policy/page.tsx`
- `src/app/(site)/terms-and-conditions/page.tsx`
- `src/app/(site)/utils/websites.ts`
- `src/app/(site)/websites-for-sale/page.tsx`
- `src/app/(site)/websites-for-sale/page.module.css`
- `src/app/(site)/websites-for-sale/WebsitePreview.tsx`
- `src/app/globals.css`
- `src/sanity/lib/image.ts`
- deleted legacy unused files under `src/app/(site)/components/`

## Decisions
- 2026-03-24: Use a route-aware shared `SiteChrome` in `(site)/layout.tsx` so the public marketing routes share chrome without forcing the same shell onto the unrelated demo routes.
- 2026-03-24: Keep the warm editorial direction from the homepage and pull `/websites-for-sale` into that same system instead of preserving the older dark microsite treatment.
- 2026-03-24: Replace the inline-style legal pages with a shared policy component so legal content is easier to maintain and visually consistent with the rest of the site.
- 2026-03-24: Delete the dead legacy component set under `src/app/(site)/components/` after confirming it was no longer referenced by any active route; this resolved the existing lint failure.
- 2026-03-24: Update `@sanity/image-url` usage to the named builder export while touching preview utilities so the deprecated default-export warning no longer comes from this repo code.

## Verification history
- `./.agent/verify.sh` -> pass -> `npm run lint` and `npm run build` both pass for M02 on 2026-03-24.
- Playwright QA -> pass -> desktop and mobile checks completed for `/`, `/websites-for-sale`, `/privacy-policy`, and `/terms-and-conditions` on 2026-03-24.
- Playwright flow check -> pass -> header `Contact` link from `/websites-for-sale` correctly navigates back to `/#contact` on 2026-03-24.

## Known issues / follow-ups
- `npm run build` still emits environmental warnings about `baseline-browser-mapping`, Next workspace root detection, and Node `--localstorage-file`.
- The milestone plan still lists future milestone buckets, but the current shipped pass already covers large parts of the originally planned homepage/catalog/legal cleanup.

## How to run
- `npm run dev`
- open `http://localhost:3000`

## Demo steps
- Open `/` and review the shared chrome, positioning, proof, approach, and contact CTA.
- Open `/websites-for-sale` and review the editorial hero, live inventory cards, pricing, and buy/custom routes.
- Open `/privacy-policy` and `/terms-and-conditions` and confirm they inherit the same public shell.
- Confirm `/studio` still exists and remains outside the marketing shell.

## Next step
Optional follow-up only: tighten content depth with future case-study detail or richer proof modules if needed, but there is no blocking unfinished public-route work from this pass.

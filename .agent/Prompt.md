# Project Prompt

## Overview
**Ground-up redesign (2026-04)**: Completely rebuild the public marketing surfaces of phinehasadams.com in **Industrial Brutalist (Tactical Telemetry)** visual language.

The site must feel like a precise, declassified R&D / telemetry system for the person you hire when you need sharper websites, cleaner operating systems, and reliable delivery with less sprawl. Rigid grids, zero border-radius, heavy uppercase neo-grotesk + dominant monospace, single hazard red accent on dark CRT substrate, visible structural lines, registration marks, and a fully evolved version of the signature interactive canvas (now a "Brutalist Telemetry / Signal Map" with the exact same physics but rendered in blueprint/phosphor/hazard language with registration overlays and HUD elements).

The homepage and /websites-for-sale must read as one tactical system. Live Sanity inventory, dual funnels (custom + ready-made), legal pages, and all existing functionality are preserved exactly. Light IA refinements are allowed only if they strengthen the "operating clarity" story (e.g. structured evidence/reference plates using existing photography).

This is a full visual and structural reset from the prior warm editorial unification — no residue of glass, blur, pills, or previous accent palette is acceptable in public marketing routes.

## Current-state audit
- The homepage is rendered from [`src/app/(site)/page.tsx`] and [`src/app/(site)/components/home/HomePage.tsx`], with live website inventory fetched from Sanity and featured on the page.
- `/websites-for-sale` is an active second funnel rendered from [`src/app/(site)/websites-for-sale/page.tsx`], using the same Sanity `website` documents for inventory, pricing, status, and Stripe links.
- The repo still contains an older portfolio direction under `src/app/(site)/components/` (`Hero.tsx`, `CanvasBackground.tsx`, `About.tsx`, `Capabilities.tsx`, `Projects.tsx`, `Contact.tsx`, and related modules) that is not the active home route.
- `CONTENT_UPDATE_GUIDE.md` and `README.md` are stale relative to the current route structure and content ownership.
- `npm run build` currently passes, but `npm run lint` fails in `src/app/(site)/components/CanvasBackground.tsx` with 14 ESLint errors.
- The repo had no `.agent` workspace before this bootstrap, so planning state previously lived outside the project itself.

## Users
- Primary: founder-led businesses and small teams that need a site that looks considered and a backend operating structure that does not feel chaotic.
- Secondary: buyers who want to purchase a ready-made site and get it customized quickly.
- Tertiary: referrals, collaborators, and recruiters who need a fast credibility check.

## Jobs to be done
- Understand what Phinehas Adams actually does within the first screen.
- Decide whether to start a custom project or browse ready-made websites.
- See enough proof to trust the work quality and judgment.
- Reach out without wondering what kind of project is a fit.

## Goals
- Make the value proposition legible in under 10 seconds on mobile and desktop.
- Create one visual and verbal system shared by the homepage and the websites-for-sale experience.
- Turn live work and website inventory into proof, not just decoration.
- Increase qualified inquiries for custom work.
- Preserve the ready-made sites revenue path without letting it overpower the main positioning.
- Reduce maintenance drift by aligning the codebase, docs, and content model.

## Non-goals
- Do not rebuild the old sci-fi portfolio direction unless a future milestone explicitly revives it as a separate experiment.
- Do not turn the site into a generic agency-with-blog template.
- Do not build a full marketplace with carts, search, or multi-vendor complexity.
- Do not expand the public information architecture with speculative pages that are not needed to support the core sales story.

## Hard constraints
- platform: Keep the current Next.js App Router stack unless a later contract explicitly approves a migration.
- performance: Marketing pages should feel fast on mobile, minimize unnecessary client JS, and keep media choices intentional.
- data/storage: Preserve Sanity as the source of truth for website inventory; extend it only where it clearly reduces content drift.
- UX: Every primary public page must have a strong CTA and explain what action the visitor should take next.
- security/privacy: Keep legal pages present, keep `/studio` disallowed from indexing, and make off-site purchase/contact flows explicit.
- compatibility: Support current evergreen browsers and respect reduced-motion preferences.

## Required routes
- `/`
- `/websites-for-sale`
- `/privacy-policy`
- `/terms-and-conditions`
- `/studio/[[...tool]]`

## Desired information architecture
- Home
- Ready-made websites
- Work and proof sections on the home page, with room to grow into case studies later if needed
- Contact CTA integrated into the home page and reinforced on the websites page
- Legal footer links

## Content model direction
- Keep the existing `website` Sanity document as the inventory backbone.
- Add structured content for the main sales narrative only if it materially improves maintainability.
- Avoid a CMS schema explosion; prefer a small number of high-value document types over dozens of tiny fields.
- Treat proof as first-class content: featured websites, outcomes, short context, status, and optionally offer type or business category.

## Deliverables
- A repo-local project brief and milestone plan.
- A unified positioning system tying together custom work and ready-made sites.
- A route-level plan for the homepage, websites-for-sale page, legal pages, metadata, and shared shell.
- A cleanup plan for legacy unused components and stale docs.
- A verification baseline documenting what passes today and what is already broken.

## Design direction (Ground-up 2026-04 — Brutalist)
**Industrial Brutalist — Tactical Telemetry (dark)** is the locked language:
- Rigid blueprint grids, visible 1-2px structural lines, zero border-radius on all marketing surfaces.
- Heavy uppercase neo-grotesk for macro/structural typography + JetBrains Mono (or equivalent) as the dominant typeface.
- Single hazard red (#E61919 / #FF2A2A) as the only accent on dark CRT substrate (#0A0A0A / #121212).
- Registration marks, bracket/slash syntax, and data-plate framing as structural elements.
- Photography treated as declassified reference plates with mono captions ("PLATE 07 — PM_A0843 — PRINCIPAL / 2026").
- The signature canvas is preserved and evolved (exact physics, new telemetry visual language with canvas-drawn registration marks, crosshairs, scale rulers, and live HUD readouts). No thermal/magma residue.
- No glass, blur, soft shadows, pills, warm accents, or previous editorial softness anywhere in public routes.
- Swiss light print variant exists only as a documented future option (not v1).

This is a complete reset. The prior warm editorial unification (M02 era) is the baseline being replaced, not evolved.

## Hard Requirements
- Evolved canvas interaction (physics 100% identical) must ship in M01 foundation.
- All existing Sanity `website` documents, queries, pricing, sold states, and Stripe flows remain untouched.
- Dual funnels (custom inquiry + ready-made catalog) stay equally prominent.
- Legal pages and /studio continue to function without change to content ownership.

## Success signals
- A new visitor can explain the offer after one screen without guessing.
- The site feels like one brand, not a homepage plus a separate campaign plus leftover experiments.
- Live work and inventory feel like evidence of capability and offer design.
- Content ownership is obvious enough that future updates do not require reverse engineering the repo.

## Done when
- the end-to-end demo flow works
- the homepage and websites-for-sale page feel like parts of the same business
- the required validations pass for each implementation milestone
- legacy drift is either removed or clearly quarantined
- known issues are documented if any remain

## Demo flow
1. Open `/` and understand who Phinehas Adams helps, what gets built, and what to do next.
2. Scroll through proof, approach, and contact sections without hitting confusing dead ends or mixed branding.
3. Navigate to `/websites-for-sale`, compare offerings, inspect proof and pricing, and choose either a purchase CTA or a custom-project CTA.
4. Reach the legal pages and `/studio` without broken routes or ambiguous content ownership.

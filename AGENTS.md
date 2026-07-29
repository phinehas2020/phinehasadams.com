# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single **Next.js 16 (App Router, Turbopack)** app — the `phinehasadams.com`
portfolio/marketing site — with an embedded **Sanity Studio** CMS at `/studio`. It uses **npm**
(only `package-lock.json` is present) and `.npmrc` sets `legacy-peer-deps=true`, so plain
`npm install` / `npm run *` commands work without extra flags. Node 20+ is required (Node 22 works).

Standard commands live in `package.json` (`dev`, `build`, `start`, `lint`). Run the dev server
with `npm run dev` (serves everything on `http://localhost:3000`).

Non-obvious notes:
- **No environment variables are required to run.** Sanity is intentionally optional: when
  `NEXT_PUBLIC_SANITY_PROJECT_ID` is empty, `sanityFetch` short-circuits and the
  `/websites-for-sale` grid renders an empty state. The public site, `/studio` route, and all
  pages still load. Only set the `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`
  (and `SANITY_REVALIDATE_SECRET` for the revalidate webhook) vars if you need real CMS content.
- **Stripe** is not a local service — "Buy now" links are just external `stripeLink` URLs stored
  per Sanity listing. Nothing to run/configure locally.
- On `/websites-for-sale`, listing cards show a gray placeholder that turns into a spinning 3D
  cube loader while the client-side iframe previews load — this is expected, not a bug.
- `.agent/verify.sh` is a CI-style verification harness (checks `.agent/*` docs exist and, for
  non-`M01` milestones, runs `npm run lint` + `npm run build`). It is not a dependency-install
  script.

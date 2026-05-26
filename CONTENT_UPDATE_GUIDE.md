# Content Update Guide

## Overview (Post 2026-04 Brutalist Redesign)
This site is now a full **Industrial Brutalist (Tactical Telemetry)** system. All public marketing surfaces follow DESIGN.md.

Main sales narrative lives in code (brutalist language). Ready-made inventory still lives in Sanity `website` documents.

## Where to edit what

### Homepage
- File: `src/app/(site)/components/home/HomePage.tsx`
- Styles: `src/app/(site)/components/home/HomePage.module.css`
- Use this for the main positioning copy, proof framing, approach section, and contact CTA.

### Ready-made websites page
- File: `src/app/(site)/websites-for-sale/page.tsx`
- Styles: `src/app/(site)/websites-for-sale/page.module.css`
- Use this for the catalog intro, process framing, pricing explanation, and CTA structure around the inventory.

### Shared public shell
- Layout: `src/app/(site)/layout.tsx`
- Header/footer component: `src/app/(site)/components/site/SiteChrome.tsx`
- Shell styles: `src/app/(site)/components/site/SiteChrome.module.css`
- Use this when changing shared navigation, footer links, or the public page frame.

### Legal pages
- Privacy: `src/app/(site)/privacy-policy/page.tsx`
- Terms: `src/app/(site)/terms-and-conditions/page.tsx`
- Shared legal component: `src/app/(site)/components/site/PolicyPage.tsx`

### Inventory content
- Source of truth: Sanity Studio `website` documents
- Schema: `src/sanity/schemaTypes/website.ts`
- Query: `src/sanity/lib/queries.ts`
- Update titles, descriptions, prices, sold state, Stripe links, and preview images in Sanity instead of hard-coding inventory cards.

### Global metadata and tokens
- Metadata: `src/app/layout.tsx`
- Global tokens: `src/app/globals.css`

## Deployment
- Local development: `npm run dev`
- Production verification: `npm run lint` and `npm run build`

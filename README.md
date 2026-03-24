# phinehasadams.com

Marketing site and ready-made website catalog for Phinehas Adams, built with Next.js App Router and Sanity.

## Stack
- Next.js 16
- React 19
- Sanity for website inventory content
- CSS modules for page-level styling

## Key routes
- `/` main positioning page
- `/websites-for-sale` ready-made website inventory
- `/privacy-policy`
- `/terms-and-conditions`
- `/studio/[[...tool]]` Sanity Studio

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Editing content
- Homepage copy and layout: `src/app/(site)/components/home/HomePage.tsx`
- Catalog framing and card layout: `src/app/(site)/websites-for-sale/page.tsx`
- Shared public shell: `src/app/(site)/components/site/SiteChrome.tsx`
- Inventory data: Sanity `website` documents via the Studio route

See `CONTENT_UPDATE_GUIDE.md` for the current content ownership map.

## Verification

```bash
./.agent/verify.sh
npm run lint
npm run build
```

## Durable workflow
This repo uses the `.agent/` workspace for planning, contracts, reports, and milestone documentation. Start with:
- `.agent/Prompt.md`
- `.agent/Plan.md`
- `.agent/contracts/current.md`
- `.agent/Documentation.md`

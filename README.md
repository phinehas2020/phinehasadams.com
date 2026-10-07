# phinehasadams.com

Phinehas Adams’s website: AI, websites and business automation. Built with Next.js 16, React 19 and optional Sanity inventory.

## Development

Use Node 24 (Node 20.19+ or 22.12+ also meet the dependencies’ requirements).

```bash
npm ci
npm run dev -- --hostname 0.0.0.0 --port 3000
```

The checked-in .npmrc preserves the repository’s legacy peer-dependency installation behavior.

## Validation

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run build
npm run start -- --hostname 0.0.0.0 --port 3000
```

Fonts and the Apollo photograph are served locally; the public homepage needs no API key. See DESIGN.md for the selected direction and design-qa.md for browser verification.

## Integrations

Sanity inventory is optional. Configure the project/dataset variables described in src/sanity/env.ts to use the catalog and Studio. With no project configured, the public catalog has an empty state. Existing external preview and Stripe purchase links are provided by the inventory data.

Contact links open an email client. The SMS consent page keeps its existing optional, unchecked checkbox and email request behavior. Vercel Analytics runs only in Vercel deployments.

The fictional automation walkthrough is a local interactive demonstration. It does not call an AI service, look up prices or send messages.

## Assets

The selected design is in docs/design/blue-program.png. The actual NASA photograph and source credit are documented in public/images/README.md. Local font sources and licenses are in src/app/fonts.

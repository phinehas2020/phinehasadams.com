# Napkin

## Session Notes (2026-04+)

**Current request**: User asked to "redesign this site from the ground up" on phinehasadams.com (Next.js 16 + Sanity marketing + ready-made websites catalog site).

**Context from prior agent work**:
- Site recently unified (M02 complete per .agent/Documentation.md): shared chrome, consistent warm editorial-industrial visual language across home + /websites-for-sale + legal.
- Strong custom CSS (no Tailwind for most UI), custom fonts (Avenir/Baskerville/IBM Plex), warm dark palette (#0b0a0a bg, cream ink, #ff5522 accent), interactive thermodynamic grid in hero, detailed inventory cards with pricing/Stripe/sold states.
- Positioning: "Websites, systems, and operating clarity" for founder-led businesses. Two paths: custom projects + ready-made foundations for fast customization.
- .agent/ durable planning workflow active with Prompt/Plan/Implement/etc.

**Initial audit observations (pre-redesign)**:
- Design is already quite custom and avoids many generic AI patterns (per redesign-existing-projects skill checklist): no pure black, no 3-col cards everywhere, good typography scale with display serif, custom interactions, meaningful copy, no obvious slop.
- However, the warm orange-red accent + glassmorphism + specific editorial tone may feel dated or not "ground up" fresh to the user.
- Ground-up request implies new visual system, not incremental polish on current tokens/CSS modules.

**What to log going forward**:
- Any assumptions about new aesthetic direction (user has not specified style: brutalist? ultra-minimal? cinematic? industrial? new color direction?).
- Decisions on whether to keep Sanity inventory model, routes, or evolve architecture.
- Technical choices: keep CSS modules? adopt Tailwind more? add GSAP/Anime.js/Framer? new component library?
- Content migration strategy.

## Corrections
| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|-----------------|-------------------|
| 2026-04 | self | Read .Codex/napkin.md first per skill — file did not exist at session start | Created initial napkin immediately upon confirming absence; will update continuously |

## User Preferences
- (none captured yet for this redesign — will ask/clarify on direction, constraints, timeline)

## Patterns That Work
- Previous unification succeeded by keeping Next.js + Sanity, unifying under one shell and visual system rather than separate "campaign" treatment for catalog.
- Detailed CSS modules + design tokens in :root allow strong custom identity without heavy libs.
- Live Sanity data for inventory keeps content editable without code deploys.

## Patterns That Don't Work
- Treating "redesign" as pure incremental upgrades when user explicitly says "from the ground up" (the redesign-existing-projects skill emphasizes "do not rewrite from scratch" but user intent here overrides for a fresh brand expression).
- Proceeding on visual direction without explicit user input or options (high ambiguity).

## Domain Notes
- Brand: Phinehas Adams — high-judgment builder of public websites + internal systems for businesses tired of sprawl.
- Key funnels: custom inquiry (email/#contact) and ready-made purchase (Stripe links in Sanity).
- Must preserve: Sanity as inventory source of truth, legal pages, studio route, core messaging, fast performance on marketing pages.
- Assets in public/ and Sanity images need audit for reuse or replacement in new design.
- Interactive elements (ThermodynamicGrid) are signature — decide whether to evolve, replace, or remove in ground-up version.

## Next Session Reminders
- Re-read this napkin before any code changes or design proposals.
- Propose multiple high-end design directions (with references) before implementing.
- Use enter_plan_mode or design skills (high-end-visual-design, design-taste-frontend, etc.) for the new system.
- Document new plan in .agent/ or update Prompt.md for the redesign phase.
- Verify with build/lint + visual QA after any implementation slices.

## 2026-04 Redesign Audit Summary (Ground-Up Request)
**Current state (post M02 unification)**: Sophisticated custom dark editorial-industrial design. Warm deep bg (#050505 variants), cream ink, vibrant orange-red #ff5522 accent with glows. Glassmorphic cards (backdrop-blur + hairlines + soft shadows). Instrument Serif (display) + Sora (sans) + JetBrains Mono via Google Fonts in (site)/layout. Custom canvas "ThermodynamicGrid" hero interaction (mouse paints diffusing/cooling heat map with thermal magma palette) — signature and performant. Shell unifies home + catalog + legal. Sanity `website` docs power live inventory with pricing, sold state, Stripe, previewImage or thum.io fallback. Strong copy, clear dual funnels (custom inquiry vs ready-made buy). Photography assets (portraits + work screenshots) exist in public/images/.

**Strengths preserved**: Next.js 16 + Sanity stack, route structure, content model (minimal schema), live data fetching, CTAs, legal, performance focus, dual revenue paths.
**Weaknesses/opportunities for ground-up**: The current glass + warm orange + specific editorial may read as "previous version" to owner. Interactive grid is cool but may not fit every new direction. Many prior iterations (per .claude/napkin) show repeated homepage experiments; fresh slate avoids drift.

**Design directions under consideration (drawn from high-end-visual-design, industrial-brutalist-ui, minimalist-ui, design-taste-frontend skills + brand fit for "websites, systems, operating clarity")**:
1. **Industrial Brutalist (Tactical Telemetry / Swiss Print hybrid)**: Rigid grids, no border-radius, heavy uppercase neo-grotesk + mono, hazard red accent, blueprint/CRT textures (scanlines, halftone, ASCII framing), data-dense sections alternating with vast negative space. Dark or light substrate. Feels like declassified R&D manuals or aerospace telemetry — perfect for "operating clarity", "less sprawl", systems work. Signature motif: vector schematics, registration marks, or interactive grid-as-blueprint.
2. **Premium Editorial Minimalism (Warm Monochrome)**: Light warm bone/off-white (#F7F6F3), flat 1px borders, bento/asym grids, extreme typographic contrast (Instrument Serif or similar display + clean geometric sans), muted desat pastels ONLY for tiny accents. No glass, no heavy shadows, massive breathing room, document-like. Photography and portraits pop cleanly. Quiet sophistication. Signature: subtle line studies or abstract continuous-line motifs.
3. **Vanguard High-End Editorial Luxury (Evolved Dark Cinematic)**: Applies strict agency rules (double-bezel nested "machined" cards, heavy macro whitespace py-24+, custom springy cubic-bezier motion, noise/film grain, variance in layout archetypes). Can stay dark/espresso or shift. Massive fluid typography, haptic depth. Evolves the warmth of current but eliminates any generic residue. Signature: advanced but GPU-safe micro-choreography or evolved canvas element fitting the luxe feel.
4. **User-defined hybrid or reference-driven**: e.g. "brutalist but with the existing portraits front-and-center", "like Linear but for personal services", "full brutal Swiss print light mode", or specific font/palette/mood refs.

**Key decisions pending user input**: Which direction (or hybrid)? Must-keep elements (the thermodynamic canvas? specific headlines/copy? photo treatment)? Keep Sanity exactly as-is for inventory or extend schema lightly? Motion library preference (custom canvas, animejs per existing skill, GSAP, Framer Motion)? Any new sections or IA changes? Timeline / scope (full ground-up in slices vs one big push)? 

Update this napkin with choice + rationale immediately upon decision.

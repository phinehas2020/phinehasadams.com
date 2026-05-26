# DESIGN.md — phinehasadams.com
**Industrial Brutalist (Tactical Telemetry) Design System**  
**Version**: 1.0 (Ground-up redesign, 2026-04)  
**Status**: Living document — the single source of truth for all public marketing surfaces.

---

## 1. Philosophy & Voice
This is a **tactical, precise, declassified** personal business site for Phinehas Adams: the person you hire when you need sharper public websites, cleaner internal systems, and reliable delivery with less sprawl.

The visual language is **Industrial Brutalist — Tactical Telemetry**:
- Feels like a high-end R&D / aerospace / classified systems manual or a live telemetry terminal.
- Raw mechanical precision + Swiss typographic rigor + military terminal aesthetics.
- No decoration for its own sake. Every line, border, and glyph has structural purpose.
- High data density in places, vast calculated negative space in others.
- The signature interactive element (evolved canvas) is the primary "delight" — a live signal map, not decoration.

**Tone keywords**: precise, operational, declassified, mechanical, calm under pressure, no bullshit.

**Never** (anti-patterns):
- Warm editorial softness, glassmorphism, blur, rounded pills, orange glows, soft shadows.
- Generic SaaS gradients, AI slop layouts (3 equal cards, centered symmetry), consumer polish.
- Pure black (#000) or oversaturated anything.
- Rounded corners (0 radius or 1–2px max on rare exceptions).
- Multiple accents. Hazard red is the only one.

---

## 2. Substrate & Color (Tactical Dark — Locked for v1)
One substrate only.

- **Backgrounds**: `#0A0A0A` (primary CRT), `#121212` (elevated panels / plates)
- **Ink**: `#EAEAEA` (primary phosphor), `#F5F5F5` (highlights)
- **Muted**: `#8A8A8A`
- **Hazard (only accent)**: `#E61919` or `#FF2A2A` — status, CTAs, registration marks, active signal, critical dividers
- **Grid / Structure lines**: `#2A2A2A` or `#1F1F1F`
- **Terminal green (one use only)**: `#4AF626` — e.g. a single "OPERATIONAL" or "LIVE" status indicator somewhere on the page. Never used for general text or multiple elements.

**CSS custom properties** (define once in globals or a dedicated tokens file):
```css
--bg-crt: #0A0A0A;
--bg-elevated: #121212;
--ink-phosphor: #EAEAEA;
--ink-highlight: #F5F5F5;
--ink-muted: #8A8A8A;
--hazard: #E61919;
--grid-line: #2A2A2A;
--terminal-green: #4AF626;
```

**Swiss Light variant**: Documented in an appendix for future use (print, PDF, or later A/B). Not implemented in v1 public site.

---

## 3. Typography
### 3.1 Display / Structural (Hero titles, big section headers, "UNIT / ID" labels)
- Heavy neo-grotesk, 900 weight, **uppercase**
- Tracking: -0.03em to -0.06em (tight architectural blocks)
- Leading: 0.85–0.95 (compressed)
- Fluid sizing: `clamp(3.5rem, 9vw, 8rem+)` for hero
- Recommended / implemented font (M01): **Archivo Black** (900) via `next/font/google` (reliable static 900 weight, excellent neo-grotesk character for brutalist structural type).
- Strong alternatives: Bricolage Grotesque (variable or 800), Inter Black (900).

### 3.2 Body / UI / Data / Telemetry (Everything else)
- JetBrains Mono (already loaded) or Space Mono / Geist Mono
- 400–500 weight
- Generous tracking: 0.05em–0.1em (typewriter / terminal feel)
- Sizes: 0.75rem–1.05rem for data rows and labels

### 3.3 Spare Texture (max 1–2 elements per page)
- High-contrast serif (EB Garamond, Playfair Display, or Times)
- Only for deliberate artistic disruption
- Must be post-processed (CSS `mix-blend-mode: multiply` + halftone SVG overlay or 1-bit dither simulation) so it feels printed/analog against the mono grid

**All structural navigation, labels, and big numbers**: uppercase.

---

## 4. Layout & Grid Rules (The Blueprint System)
- **Primary tool**: CSS Grid with explicit `gap: 1px` (or 2px) between contrasting backgrounds → creates razor-thin visible structural lines automatically.
- **Visible compartmentalization**: Thick (1–2px) solid borders or full-width `<hr>` rules to separate operational units. No invisible floating cards.
- **Bimodal density**: Dense mono data clusters right next to huge structural type + generous air.
- **Macro whitespace**: `py-24` minimum between major sections. Often `py-32` or `py-40`. The design must breathe like an engineering drawing.
- **Asymmetry & tension**: Prefer offset placements, bleeding elements, and non-centered compositions. Symmetry only when it reads as deliberate mechanical alignment.
- **Container**: `width: min(1280px, calc(100% - 3rem))` (or similar precise value). Never edge-to-edge text blocks except hero.
- **Mobile**: Single-column collapse. Preserve borders, mono density, and air. No overlaps or rotations under 768px.

**Example structural pattern** (hero or panel):
```html
<div class="panel">
  <div class="panel-header">UNIT / 042 — DEPLOYED</div>
  <hr class="structural-rule" />
  <div class="data-grid">...</div>
</div>
```

---

## 5. Component Specifications
### 5.1 Panels / Plates / Readouts
- Thick visible border (2px solid var(--grid-line) or hazard on active)
- 0 border-radius
- Inner hairline separators for data rows
- Mono labels in format: `STATUS`, `PRICE`, `DOMAIN`, `UNIT / ID-XXX`
- Background: var(--bg-elevated) or transparent over the main bg
- "Registration" marks (geometric +, target, or ® © ™) used as structural ornaments in corners or edges

### 5.2 Buttons & CTAs
- Square (0–2px radius max)
- Either solid hazard fill with phosphor ink, or thick border + phosphor ink
- Uppercase mono labels
- Optional trailing syntax: `>>>` or `// EXEC` when it reinforces telemetry
- Hover/active: subtle scale(0.985) or border color flip to hazard. No soft lifts or color washes.

### 5.3 Navigation & Footer
- Heavy mono branding (e.g. `PHINEHAS ADAMS` or `[ P / A ]`)
- Structural links in bracket or slash syntax: `[ HOME ] [ INVENTORY ] [ TRANSMIT ]`
- Possible "command bar" or fixed top bar feel with registration marks
- Footer mirrors the structural language with small "DOC / LEGAL-01" style links

### 5.4 Status & Data
- Square flags or inline mono with hazard underline/strike-through for sold/archived states
- Live data (pricing, counts) in mono with tabular alignment where possible

---

## 6. The Signature Canvas — Brutalist Telemetry Grid
**Non-negotiable**: The existing interactive canvas physics and performance characteristics are preserved 100%.

**File**: `src/components/ui/brutalist-telemetry-grid.tsx` (evolve or replace the thermodynamic one)

**Physics (do not touch)**:
- Same `resolution` and `coolingFactor` props
- Same mouse/pointer brush (Bresenham line + radius falloff heat/signal injection)
- Same diffusion + cooling loop
- Same rAF, resize, ctx setup (no alpha for perf), event cleanup

**Only visual + language change**:
- Background clear to var(--bg-crt)
- Cold/structure: faint phosphor grid lines + small rects/points
- Active signal: hazard red, size/opacity scaled by intensity, slight warp on hot cells
- Trails: low-opacity hazard or blueprint blue
- **Additive overlays every frame or on a second canvas layer**:
  - Corner registration marks (simple + or target shapes in hazard)
  - Crosshairs/reticles at high-signal areas (throttled)
  - Edge scale rulers with mono labels "0" "0.5" "1.0" (signal density)
  - Live HUD text (small mono, low opacity): `SIGNAL NODES: ${count}` or `ANOMALY DENSITY: XX%`
- `getSignalColor(t)` completely rewritten (no thermal sine waves). Example mapping:
  - Low t → phosphor / grid line
  - Mid t → faint blueprint
  - High t → hazard red core + white highlight
- Optional enhancement: pointer "lock" (click) spawns a persistent plotted hazard square + label that cools slowly (feels like logging an event)

**Integration**: Full-bleed hero backdrop only (or additional small "live map" instances in evidence sections). Exact same pointer-events and shell layering as today.

**Reduced motion**: Freeze the simulation or render a static high-contrast grid + one set of registration marks.

**M01 gate**: Interaction must feel identical or better on real input devices. No performance regression.

---

## 7. Photography & Assets
- Existing portraits (PM_*.jpg) and work screenshots (work-*.png) are **reference plates**, not hero portraits.
- Presentation: sharp, high-contrast, framed by structural borders or rules.
- Captions (always mono, uppercase where structural): `PLATE 07 — PM_A0843 — PRINCIPAL / 2026`
- Optional subtle halftone or 1-bit treatment on key placements via CSS filters or pre-processed variants.
- No soft editorial fades, vignettes, or warm overlays.

---

## 8. Motion
- Primary motion = the evolved canvas (signal injection and diffusion).
- All other state changes: instant or mechanically stepped.
- No soft easings, spring physics, lift transforms, or "premium" micro-animations.
- Scroll reveals (if any): simple opacity + transform only, staggered sparingly on data rows.
- Respect `prefers-reduced-motion` everywhere.

---

## 9. Do / Don't (Strict)
**Do**:
- Use 1px grid gaps + contrasting backgrounds for automatic structural lines.
- Put everything inside visible panels or between thick rules.
- Use mono for 90%+ of text.
- Let huge uppercase structural type breathe with massive air around it.
- Treat the canvas as a live telemetry instrument, not background decoration.
- Use registration marks and bracket/slash syntax as design elements.

**Don't**:
- Any border-radius on marketing surfaces (0 is the rule).
- Backdrop-filter / blur / glass anywhere.
- Multiple accent colors.
- Soft shadows or rounded pills.
- Centered symmetrical 3-column grids as default.
- Warm editorial language or orange glows.
- Inter or system sans for display (use the heavy neo-grotesk).

---

## 10. Implementation Notes for Developers
- All public marketing pages live under `src/app/(site)/`.
- CSS Modules + new brutal tokens (no Tailwind for the core visual language).
- Update `.agent/verify.sh` or add a brutalist-specific visual checklist if it helps the gates.
- Every PR that touches public UI must pass the M01+ checklist items (no radius, mono dominance, hazard only, canvas fidelity, etc.).
- When in doubt, make it more structural, more mono, more air, more registration marks.

---

## Appendix A — Swiss Light Variant (Future Only)
Light substrate (`#F4F4F0` or `#EAE8E3` newsprint), carbon ink, same hazard red, heavy sans uppercase, rigid grids, blueprint lines. Use for print/PDF or a future re-skin. Not part of v1 public site.

---

**This document governs all future visual decisions on the public marketing site.**  
When editing any marketing component or CSS, the answer to "does this match the system?" must be found here first.

*Maintained as part of the durable .agent/ workflow.*
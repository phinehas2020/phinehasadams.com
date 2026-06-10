# DESIGN.md — phinehasadams.com
**Cinematic Photographic System, v2**
**Status**: Living document — source of truth for the public marketing site.
(Supersedes the 2026-04 "Industrial Brutalist / Tactical Telemetry" system, which shipped and was then replaced by the cinematic redesign on `main`.)

---

## 1. Concept & Voice

The site reads like **a short film about a builder**: full-bleed photography, film grain, a letterboxed interlude, type that rises like title cards. One person, one story — homestead kid who now builds business systems end to end.

**Copy rules (anti-slop):**
- Concrete nouns over abstractions: fences, engines, irrigation, livestock, storefront, wiring — never "solutions," "seamless," "elevate," "bridging the space between."
- Short declaratives. Sentence case. No exclamation marks.
- The farm vocabulary is the brand: "Walk the fence line," "fed and watered," "Stand watch," "Tell me what's broken."
- Every claim stays specific and checkable (3 days, 10 days, 08:00–18:00 CST, replies in under an hour).

## 2. Color

```css
--bg: #0d0b09;        /* near-black, warm */
--bg-raised: #15110d;
--bg-deep: #080705;
--fg: #f4efe7;        /* cream */
--fg-soft / --fg-faint: cream at 66% / 40% */
--ember: #e2683a;     /* the only accent */
--line: cream at 14%; --line-strong: 30%;
```

One accent. Photography carries the rest of the color. All imagery gets the unified grade: `saturate(.8) contrast(1.06–1.08) sepia(.08–.1)` plus the fixed `.grain` overlay.

## 3. Type

- **Display**: Anton 400, uppercase, line-height 0.84–0.95, used for name, section statements, big closes.
- **Body**: Archivo (350–650), sentence case, max ~46ch.
- **Annotations**: JetBrains Mono, uppercase, letter-spacing 0.1–0.26em, `--label` size — section indices (`01 Work`), frame ids (`FR 3006`), captions, clock.

## 4. Motion (ScrollMotion.tsx + globals.css)

All motion is declared with data-attributes on server components; one client component drives everything. `.js-motion` is added to `<html>` pre-paint by an inline script — without JS the page renders fully visible, and `prefers-reduced-motion` collapses everything to static.

| Attribute | Effect |
| --- | --- |
| `data-reveal` | fade + rise on enter (`--reveal-delay` to stagger) |
| `data-reveal="blur"` | adds a blur-in |
| `data-reveal="clip"` | shutter-wipe open from a widescreen slit (imagery) |
| `data-lines` + `[data-line-mask] > [data-line]` | masked lines rise, staggered by `--li` |
| `data-parallax="0.15"` | counter-scroll translate |
| `data-scrub` / `data-scrub="pin"` | exposes `--scrub` 0→1 (viewport pass / tall-section progress) |
| `data-hero` | exposes `--hero-progress` 0→1 as the hero scrolls away |

**Signature moments** (keep these; don't add more without removing one):
1. Hero entrance — film fade-in, name lines rise from masks; lines drift apart on scroll-out.
2. Interlude letterbox — sticky stage, bars part like a film gate (`--scrub`), "Same hands. Different tools." lands late.
3. Process rail — ember line draws down the offset rail with scroll; ghost outline numerals fill ember on hover.

**Rules**: transform/opacity only (bars, not clip-path, for the letterbox); rAF-throttled; every effect has a no-JS and reduced-motion end state that reads as a finished page.

## 5. Layout

- Container `--maxw: 88rem`, gutter `clamp(1.25rem, 4vw, 4rem)`.
- Sections separated by 1px `--line` rules and indexed mono labels (01–07).
- Asymmetry over symmetry: offset statements (About), staggered gallery columns, offset process rail. Never three equal cards (the Projects grid is the one sanctioned 3-up, it's an inventory).
- Section padding `clamp(6rem, 12vh, 10rem)`+.

## 6. Imagery

- Personal photography only — portraits and field work. Work screenshots stay out of the Field gallery.
- Captions are mono: real frame id (`FR 2974`) + a short title describing what's in frame. Alt text describes the image, never the filename.
- Treatment: 4/5 or 4/3 frames, 10–12px radius, 1px line border, filmic vignette + local grain.

## 7. Never

- Purple/blue gradients, glassmorphism panels, more than one accent.
- "Elevate / seamless / unleash / next-gen / delve" or any copy that could be on anyone else's site.
- Scroll-jacking, cursor followers, sound effects, over-long pinned sections.
- Lorem ipsum, filename alt text, placeholder names.

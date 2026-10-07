# Blue Program — phinehasadams.com

The user selected this direction on October 6, 2026. It supersedes the earlier cinematic/farm and tactical-telemetry directions.

Visual target: [selected concept](docs/design/blue-program.png). Its blue publication cover, large personal name, Earthrise band, and worked example set the visual direction. The full site extends that direction with dedicated Websites, Automation, About, and Contact pages, plus a substantive homepage and the existing website catalog and policy/consent pages.

The original homepage at commit 3ad7c6b contained website inventory, approach, background, process, photography, capabilities, and contact details. Those functions and relevant content are carried into the expanded homepage and dedicated pages. The first three-block implementation was too narrow for the requested complete rework.

## Purpose and voice

Phinehas is the builder. His focus is websites, AI and business automation. Use plain, concrete language and understandable examples. Lead with “I build with AI. I automate the repetitive parts.”

Do not imply NASA, Tesla or SpaceX affiliation. Do not invent clients, results, delivery guarantees, Google rankings, response times or availability. Gristmill, the CAD test asset and farm photography are not anchors for this design.

## Visual system

- NASA blue #0032A0, white and black. Red #E4002B is a small accent.
- Strong flush-left typography, simple rules, generous space and square controls.
- Local Site Sans (Liberation Sans derivative) for body/navigation; local Cover Sans (Archivo derivative) for display. Font sources/licenses live in src/app/fonts.
- Cover name uses the display face’s weight and width axes; never squeeze the whole layout or rasterize text.
- Maximum content width 90rem; responsive gutter clamp(1.25rem, 4.8vw, 4.5rem).
- Two-column desktop cover; stacked phone layout. Four visible navigation links for Websites, Automation, About, and Contact, with a home link in the name. Current page is underlined. No hidden mobile menu.
- No cinematic grain, entry animation, fake telemetry, generic rounded cards or invented engineering annotations. Reduced-motion preference disables smooth scrolling.

## Imagery

The hero uses the original Apollo 17 Earthrise photograph AS17-152-23272. See public/images/README.md for the archive source. Keep the visible credit and link. Preserve the original file; crop with object-fit. The concept generator flattened the horizon; the implementation deliberately keeps the true photographic geometry.

## Working example

The filter request is fictional. The browser walkthrough uses deterministic local state, not live AI, a customer database or an ordering integration. Optional made-up model/address inputs change the draft; price stays unknown. Nothing is sent. Keep the initial page readable without JavaScript and maintain labels, focus management and live step announcements.

## Existing site behavior

Shared navigation/footer connect all pages. Preserve Sanity inventory, sold status, prices, external preview/purchase links and optional SMS consent semantics. The home catalog previews available records from the existing source; these are website starting points, not claimed client results.

The Contact page validates a short project brief, shows the email subject/body, and lets the visitor open and send it in their own email app. Answers stay in browser state. No server submission, fabricated success, storage, or external AI call. Direct email is visible without JavaScript. Project-type links can preselect Website or Automation.

About retains the original background, named tools and disciplines, and six photographs. Photography is supporting personal work on About, not the homepage’s sales pitch. Service pages describe practical deliverables, steps, examples, and questions in plain first-person language. Costs and timing depend on the agreed work; no invented figures or guarantees.

Vercel Analytics runs on Vercel deployments, not local previews.

## References

- 1976 NASA Graphics Standards Manual: https://www.nasa.gov/wp-content/uploads/2015/01/nasa_graphics_manual_nhb_1430-2_jan_1976.pdf
- Official color guide: https://www.nasa.gov/wp-content/uploads/2023/07/nasa-insignia-colorguide.png
- Apollo 17 Earthrise: https://images.nasa.gov/details/as17-152-23272

Run visual and interaction QA against the selected target before changing the composition. The current report is design-qa.md.

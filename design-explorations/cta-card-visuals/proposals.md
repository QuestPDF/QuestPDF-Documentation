# Proposals: five pairings for the CTA card visuals

Read `research.md` first (audit, personas, principles, benchmark) and `brainstorm.md` (the 30 directions these were chosen from). All five are built on the lab page `/cta-visuals-lab.html` (unlinked; `docs/cta-visuals-lab.md`, components in `docs/.vitepress/theme/homepage/lab/cta/`), after today's cards as V0. Captures per pairing: `captures/<id>.png` (1440 light/dark, hover, 1100, 390) and `captures/lab-overview-{light,dark}.png`.

Lab toolbar: **Force hover** (adds `.lab-hover` to every lab card; V0 keeps real `:hover` only), **Reduced motion** (simulates the media query), **Replay entrance**, **Freeze / Resume** and **Scrub** (pause every animation and transition under the lab and set them to a fraction of their own duration), **Phone width** (390px and 1100px iframes of the page). URL switches for captures: `?hover=1`, `?reduce=1`, `?embed=1` (no toolbar or notes), `?still=1` (every transition jumps to its end state).

## Shared material

- **Copy, links, accents, hover ring, halo, lift**: production, unchanged (the frame is copied into `CtaLabCard.vue` with the hover rules widened to `:is(:hover, .lab-hover)`).
- **Badge**: dropped in all five. "10 min" stays in the link row, where it already is; the play glyph alone says "video" (Apple, Stripe, JetBrains all stop there).
- **Rays**: dropped in A, B, C, E (they are invisible at 1:1 and cost a paint layer); kept in D so the owner can compare.
- **Assets** (`docs/public/homepage/lab-cta/`, all real renders, WebP): `invoice-head.webp` = crop (70,70)–(700,560) of `invoice1.webp`, 630×490, 19KB, shown at 203–231px wide (2.7–3.1× oversampled). Element tiles = crops of the Component Variants pages the shipped gallery card already uses (the 640px renders upscaled 2× for the lab; production re-renders at 2× or 3×). Weight above the fold per pairing: A 77KB, B 68KB, C 46KB, D 77KB, E 55KB. **Today: 611KB** (two 1190px invoices plus fifteen gallery pages, twelve of them hidden).
- **Paper in dark mode**: `#F4F4F6` with the image at 92% opacity, a 6% white hairline; the white area is contained by a well, a frame or a window in A–D.
- **Entrance**: once, when the card is 40% in view (or at once when it is already on screen, as in production), through an IntersectionObserver; under `prefers-reduced-motion` the rest state shows from the start. No timers, no loops, nothing runs off screen. The scroll-bound drift in B uses `animation-timeline: view()` behind `@supports`, which is inert off screen by definition.
- **Compact (≤700px)**: every visual carries a `.thumb`: a 72×72 rounded tile with the invoice head (plus a 28px play disc) or one element tile.
- **1100px (34% column, 170px)**: everything is fluid; A, C, D, E hold; B's cut gets tight (see its risks).

---

## A · Well

The visual column becomes an inset tile, the page's chip and icon-tile surface (`--home-surface-inner`: `#F0F2F6` on white in light mode, 40% black on the glass in dark mode), 16px radius, a 6% inset hairline. The invoice head sits inside it as a sheet with a 6px radius and a soft shadow, 14px from the well's edges, running out of the bottom; the play button rests on it. The gallery well holds a 3×3 sheet of element tiles, 6px apart, 6px radius.

**Storyboard**
- Rest: the sheet reads "Invoice #4048, issue date, due date, From …" at 13px title / 8px body on a 1× screen; nine tiles: QR, house listing, PAID stamp, donut chart, ISO seal, portrait, map, notary seal, barcode.
- Entrance (once): the sheet rises 14px into place and fades in (500ms), the play button scales from 60% 150ms later (350ms, overshoot easing); the tiles fade up 10px in reading order, 40ms apart (450ms each).
- Hover / focus: the card lifts 3px, ring and halo (production); the sheet drifts up 6px (500ms), the play button grows 8%; the tiles do nothing.
- Idle: nothing.
- Leave: everything returns on the same curves.
- Reduced motion: the rest state from the first frame; hover changes shadow and colour only.
- Touch: entrance once, then the rest state.
- 72px: the invoice head with a 28px play disc; the house tile.

**Timing**

| Element | Property | From → to | Duration | Easing | Delay |
|---|---|---|---|---|---|
| sheet (entrance) | translateY, opacity | 14px, 0 → 0, 1 | 500ms | cubic-bezier(.4,0,.2,1) | 0 |
| play (entrance) | scale, opacity | .6, 0 → 1, 1 | 350ms | cubic-bezier(.34,1.56,.64,1) | 150ms |
| tile *i* (entrance) | translateY, opacity | 10px, 0 → 0, 1 | 450ms | same | 40ms × *i* |
| sheet (hover) | translateY | 0 → −6px | 500ms | same | 0 |
| play (hover) | scale | 1 → 1.08 | 350ms | overshoot | 0 |

**Assets**: `invoice-head.webp` (630×490, 19KB) and nine tiles (≈58KB); production re-renders the nine elements at 3× from the Component Variants document (≈140×140 CSS px each → 420px sources), target ≤ 8KB each.

**Pros**: the most house-style of the five (grey inset on white is the chip pattern; dark well on glass is the stat-tile pattern); both cards share one container so the row reads as one family; the dark-mode paper is framed and dimmed; cheapest to build (CSS only, one composable); indifferent to the gallery's future shape (tiles can become page thumbnails later).

**Cons**: a container in a container; the quietest in daylight; nine 66px tiles are iconic rather than legible (the chart and the signature need a second look); the sheet shows only the left half of the invoice (the "For" column is cut).

**Persona fit**: P1 (a real invoice, big enough to read) and P2/P7 (framed, restrained) best; P3 gets the table head but not the paging story; P5 gets range from the tiles.

**Risks and mitigations**: the well could read as a disabled input in light mode → keep the hairline at 6% and the radius at 16px, never add an inner shadow; the tiles could read as app icons → keep them paper-white with the render's own edges, never add icon-style gradients.

**Effort**: 1 day (new `visual` branch in `HomePageCtaCard.vue`, assets, dark-mode check).

---

## B · Bleed

The invoice head is larger than the column (231 + 44px wide) and positioned so that its top-left corner lies outside the card; the card's 32px rounded corner cuts it. Only its right and bottom edges are visible, with a hairline and a soft shadow. The gallery is a 2×3 brick mosaic (house listing spanning two rows, APPROVED stamp, QR, map, signature) that runs off the top and the left; an 8% fade on its right edge keeps it off the text.

**Storyboard**
- Rest: the largest "Invoice #4048" on the page after the headline (≈15px); the mosaic reads as a collection that continues beyond the card.
- Entrance (once): the sheet slides in 14px from the cut corner (600ms); the tiles slide in the same way, 50ms apart.
- Hover / focus: a 3px drift towards the pointer (sheet and mosaic), the play button grows.
- Idle: where supported, the sheet travels 12px while the card crosses the viewport (scroll-bound, no JS; inert off screen). Nothing else.
- Reduced motion: rest state from the first frame, no drift, no scroll binding.
- Touch: entrance once; the scroll-bound drift still works (it is scroll, not hover).
- 72px: as A.

**Timing**: sheet 600ms cubic-bezier(.4,0,.2,1); tiles 500ms, 50ms × *i*; hover 600ms; scroll drift linear over the card's travel from entering at the bottom to leaving at the top.

**Assets**: `invoice-head.webp`; five tiles (≈49KB); production: the same elements re-rendered at 2–3×.

**Pros**: the boldest and the most contemporary (Linear/Vercel-style product crops that run off the edge); the invoice is the most legible of the five; the gallery reads as "more than fits"; the only pairing whose idle motion costs nothing and never loops.

**Cons**: bends the 32px inset that every other panel on the page keeps; asymmetric; the right-edge fade on the mosaic is a gradient device, kept at 8% but still a device; at 1100px the sheet shrinks to 214px and the cut corner shows less of the title; the cut corner sits exactly where the glow is, so the glow has to move or go.

**Persona fit**: P1 and P5 best (big, confident, designed); P2 may read the bleed as "marketing" even though it is a real render; P3 loses the table head.

**Risks and mitigations**: the sheet could touch the text column → width capped at +44px (checked at 1440 and 1100); the scroll drift could be noticed → 12px over the whole viewport is below the threshold most people perceive while scrolling; if it is noticed, drop the `@supports` block.

**Effort**: 1.5 days (absolute positioning against the card's padding box, glow repositioning, 1100px tuning).

---

## C · Window

The page's own window chrome (`HomePageWindowContainer`: three dots, a file name, `--vp-c-bg-alt` header, 1px divider, 14px radius) used as a document viewer titled `invoice.pdf`, its body showing the invoice head at viewer zoom, the play button over it. The gallery is a second window titled `samples` with four tiles and a 11px caption under each: Charts, Maps, Stamps, Codes (the actual page names of the Component Variants document).

**Storyboard**
- Rest: two windows; the dots are grey.
- Entrance (once): the invoice settles from 105% to 100% over 2.4s (a single slow Ken Burns, origin top-left) while fading in; the four items rise 8px, 60ms apart.
- Hover / focus: the dots take their red/yellow/green (as the code window below does on hover), the page pans up 6px (500ms), the play button grows.
- Reduced motion: no settle, no pan.
- 72px: as A, with the donut tile for the gallery.

**Timing**: settle 2400ms cubic-bezier(.2,.6,.2,1); items 450ms, 60ms × *i*; hover 500ms; dots 100ms.

**Assets**: `invoice-head.webp`; four tiles (≈27KB).

**Pros**: the strongest family bond with the rest of the page: the code window directly below uses the same chrome, so the row and the quick-start panel read as one system (document → code); the captions give the gallery card its only *legible* statement of range; the viewer framing is the most "software" of the five and the least "marketing".

**Cons**: three windows above the fold; the chrome spends 32px of the 228px column; a window titled `invoice.pdf` promises a viewer-like destination, and the click lands on a page that does not have the video yet; the captions must track the gallery's real sections once it exists (today they are the renders' page names, which is honest but temporary).

**Persona fit**: P2 and P3 best (software vocabulary, structure, captions); P1 fine; P5 least (small tiles, chrome instead of picture).

**Risks and mitigations**: "three windows" could look repetitive → the quick-start window could drop its dots and keep only the file name, or the cards could use a lighter header (file name only, no dots); the 2.4s settle could read as motion for its own sake → it is 5%, once; cut it to 1.6s if it registers.

**Effort**: 1 day.

---

## D · Render once

The rest state is A's content in a plainer hairline frame (12px radius, `--home-surface-inner` fill, 7% inset ring). The entrance carries the meaning: the invoice is painted in from the top behind a 2px accent line with a soft glow, 1.2s, the way a renderer paints a page; the play button appears when the line reaches the bottom. The gallery sheet "develops": each tile starts as blank paper and its content fades in, in reading order, 80ms apart. Keeps today's rays.

**Storyboard**
- Rest (after the entrance): identical to A without the well's depth.
- Entrance (once): `clip-path: inset(0 0 100% 0)` → `inset(0)` over 1.2s with the line travelling from top to bottom; tiles' images 0 → 1 over 500ms each, 150ms + 80ms × *i*.
- Hover / focus: the play button only (plus the production ring and halo).
- Reduced motion: both rest states from the first frame; no line, no develop.
- Touch: the entrance plays once on scroll-in (it is not hover-bound), then rest.
- 72px: as A.

**Timing**: reveal 1200ms cubic-bezier(.4,0,.2,1); line opacity 0→1 at 8%, 1→0 at 92%; play button 350ms after 1100ms; tiles 500ms ease, 150ms + 80ms × *i* (about 1.3s total).

**Assets**: as A.

**Pros**: the only pairing whose entrance says what the library does (it renders); both cards arrive with the same grammar (paint in); strong first impression for a visitor who lands on the page and sees the row already in view.

**Cons**: the most motion; a visitor scrolling fast sees a half-painted page; the accent line is a third glowing device next to the ring and the halo; the rest state is A with a weaker container, so after the first second it is the plainer of the two.

**Persona fit**: P1 and P5 (a small delight that explains); P2 and P8 may count the line as advertising; P7 never sees it.

**Risks and mitigations**: the sweep could read as a scanner or a loading bar → the line is 2px and gone in 1.2s, never repeated; if it still reads as loading, keep the clip reveal and drop the line.

**Effort**: 1 day.

---

## E · Quiet

One sheet with an 8px radius, a 9% hairline and a soft shadow, the play button, no container, no glow, no rays. Four larger tiles (house, QR, donut, PAID) in a 2×2 with hairlines and shadows.

**Storyboard**
- Rest: everything.
- Entrance: a 300ms fade.
- Hover / focus: the play button grows, the shadows deepen (300ms); the production ring and halo.
- Reduced motion: no fade.
- 72px: as A.

**Assets**: `invoice-head.webp`; four tiles (≈36KB).

**Pros**: the least to build and to maintain; nothing can date; four tiles at 105px are the most legible tiles of the five; the honest minimum.

**Cons**: in dark mode the sheet is again the brightest object in the row, softened only by the dimmed paper; without a shared container the two cards are related only by the hairline; shows range (four kinds) but not depth.

**Persona fit**: P2, P7, P8 (nothing to object to); P5 least.

**Effort**: 0.5 day.

---

## Comparison

| | A Well | B Bleed | C Window | D Render once | E Quiet |
|---|---|---|---|---|---|
| 2s read (one vs many) | ●●●● | ●●●●● | ●●●●● | ●●●● | ●●●● |
| Rest-state poster | ●●●●● | ●●●●● | ●●●● | ●●●● | ●●●● |
| Honest today | yes | yes | yes* | yes | yes |
| Family with the page | ●●●●● | ●●●● | ●●●●● | ●●●● | ●●● |
| Distinct from the code window | yes | yes | shares chrome | yes | yes |
| Craft ceiling (hard to cheapen) | ●●●● | ●●●● | ●●●● | ●●● | ●●● |
| Durable 2+ years | ●●●●● | ●●●● | ●●●● | ●●●● | ●●●●● |
| Motion restraint | ●●●●● | ●●●● | ●●●● | ●●● | ●●●●● |
| Dark mode | ●●●●● | ●●●● | ●●●●● | ●●●● | ●●● |
| 1100px | holds | tight | holds | holds | holds |
| ≤900 / 72px | fine | fine | fine | fine | fine |
| Bytes at 2× (both cards) | 77KB | 68KB | 46KB | 77KB | 55KB |
| Upkeep | low | low | medium (captions) | low | low |
| Effort | 1d | 1.5d | 1d | 1d | 0.5d |

\* while the quick-start page actually holds the video.

## Recommendation

**Ship A (Well), with C's captions as an option for the gallery tiles and B's scroll-bound drift as an optional later layer.**

Why A: it answers the diagnosis directly. The pages become legible (the invoice at 3× the shipped scale), the gallery's variety becomes visible (nine kinds of content instead of three identical sheets), the loose paper is replaced by the page's own inset-tile surface, dark mode gets a contained, dimmed paper instead of a white slab, and motion is reduced to one entrance and a 6px hover drift. It is the pairing that most looks like it was always part of this page, which is what "evolution, not revolution" asks for, and it is indifferent to what the gallery turns into: when real gallery documents exist, the nine element tiles become nine page thumbnails without touching the component.

**Runner-up: C (Window).** The best family bond with the quick-start panel and the only one that states the gallery's range in words. Choose it if the owner wants the row to read as "software, not marketing", and accept three windows above the fold, or drop the dots from the cards' headers.

**Quiet alternative: E.** If the owner wants to ship in half a day and revisit when the video and the gallery exist.

**Not recommended now:** B is the most striking and the most contemporary, but it bends the page's inset rule and its cut corner collides with the glow; worth a round-two look if A feels too safe. D's sweep is a good idea for the moment the row is the first thing on screen, but on this page the hero is, and the cards are usually entered while scrolling; the line will often play to an empty room.

## Production plan for A

**Assets, all rendered with QuestPDF (library source at `~/Programming/QuestPDF/QuestPDF-main`, or the NuGet package, which renders fine with `GenerateImages`):**

1. `invoice-head@2x.webp`, `invoice-head@3x.webp`: render the tutorial invoice (`docs/invoice-tutorial.md`, `InvoiceDocument`, or whichever invoice the published video builds) with `ImageGenerationSettings { RasterDpi = 216 }` (3×), crop the top-left region from the page margin to just past the "From" column (≈ 0–530pt × 0–410pt at A4), encode WebP q82. Expected 630×490 CSS px at 2× ≈ 20KB, 3× ≈ 40KB. If the video's invoice differs from the tutorial's, re-crop the same region of that document. Until the video is cut, use the current `invoice1.webp` crop (19KB), which is what the lab shows.
2. Nine element tiles at 3× from the Component Variants document (its source is not in this repo; the owner rendered the 36 pages that ship in `docs/public/homepage/sample-gallery/`): QR with logo (Codes), house listing (Images & photos), PAID stamp (Callouts & badges), donut (Charts), ISO seal (Callouts & badges), portrait (Images & photos), map (Maps), notary seal (Signatures), tracking barcode (Codes). Crop each to a square region around the element, 420×420 source px, WebP q85, target ≤ 8KB each. The lab's crop boxes (in the 640px render's coordinates) are in `docs/.vitepress/theme/homepage/lab/cta/` component comments and in the asset script's table in this folder's history; the production crops should be taken from the 3× render with the same boxes ×3.
3. Later, when the gallery exists: replace the nine element tiles with nine first-page thumbnails of real gallery documents *if* they have a strong top third (letterhead, title, table); otherwise keep element crops. The component does not change.
4. Delete `docs/public/homepage/getting-started/invoice1.webp`/`invoice2.webp` and the fifteen `sample-gallery/page-*.webp` from the homepage payload once nothing else uses them (611KB today, 77KB after).

**How `HomePageCtaCard.vue` changes (the frame, copy, link row, ring and halo stay):**

- Props: `images: string[]` becomes `visual: { kind: "sheet"; src: string } | { kind: "tiles"; srcs: string[] }`, or simpler: keep `variant: "video" | "gallery"` and `images`, where the video variant uses `images[0]` as the sheet and the gallery variant uses the first nine as tiles. Drop `badge`.
- Template: replace `.page-stack` with `.well` containing either `.sheet > img` plus `.play-button`, or `.grid > .tile > img` ×9. Keep `aria-hidden` on the visual.
- Script: keep the IntersectionObserver entrance (it already exists); delete `startBrowsing`/`stopBrowsing`, the timer, `active`, `stepped`, `slotClass`.
- Styles: delete the fan, coverflow, `row-leave` keyframes, badge and `--row-*` properties (≈300 lines); add the well, sheet, grid and tile rules from `VisualWellVideo.vue` / `VisualWellGallery.vue` (≈90 lines); drop the `.background-gradient::before` rays (keep the two radial gradients); keep the compact (≤700px) block but point it at `.sheet img` / the first tile; keep the reduced-motion block, trimmed to the new properties.
- `HomePageGettingStarted.vue`: pass the invoice-head crop. `HomePageSampleGallery.vue`: pass the nine tiles with a comment naming each element's page.
- Lab clean-up: delete `docs/cta-visuals-lab.md`, `docs/.vitepress/theme/homepage/lab/cta/`, `docs/public/homepage/lab-cta/`, and `docs/public/cards-lab.html` / `video-card-lab.html` (both superseded).

## Open questions for the product owner

1. **The video does not exist yet.** The card already promises ten minutes and links to a page without an embed. Should the card ship before the video (with the play glyph as the only promise), or should the copy change to "Quick start" until the video is published? Copy is out of this brief's scope, so the lab keeps it; the honest minimum is what the lab shows.
2. **Which invoice will the video build?** The crop should be of that document. The lab uses the current `invoice1.webp` (PLN, 18 items, "company" logo), which is not the tutorial's invoice.
3. **Gallery tiles: elements or pages?** Nine element crops (what the lab shows) or, once the gallery exists, nine first pages. Elements read better at 66px; pages say "complete documents", which the copy promises.
4. **Captions on the gallery tiles** (C's device, "Charts / Maps / Stamps / Codes") inside A's well: yes or no? They add the only legible statement of range but also text where the page otherwise has pictures.
5. **The glow**: keep the two radial gradients (as the lab does for A–D), or go without (E)? The rays are proposed for deletion in every case.
6. **Scroll-bound drift (B's idle)** as an optional layer on A: 12px over the viewport, no JS. Barely perceptible, and some people dislike anything that moves while they scroll.
7. **"40+ samples"** stays a placeholder until the gallery exists; the link row keeps it only because copy is out of scope.
8. Does the Component Variants document's source live somewhere I can run, so the production tiles can be rendered at 3× from the same code rather than upscaled from the 640px pages?

## Round two (2026-10-13, after feedback: "more creative, sophisticated animations", "maybe some 3D")

Five more pairings, F–J, at the bottom of the lab page. All of them keep A's well as the container, so the row stays in the page's family and the rest state stays the poster from round one; what changes is the choreography. The house rules still hold: every sequence plays once on entrance or on intent and then holds, nothing loops, nothing runs off screen, and reduced motion shows the finished state.

### F · Assembly + Deal

The page is built the way the layout engine places it. The invoice is cut into seven horizontal bands (title block, parties, table rule, four rows) stacked on one sheet; before the entrance each band is displaced, and they settle in order: the title slides in 10px from the left while sharpening from a 3px blur (0–0.6s), the parties rise 10px (0.25–0.85s), the table's header rule draws itself left to right through a clip-path (0.5–0.95s), the rows deal in from below 90ms apart (from 0.7s), the play button lands with an overshoot at 1.15s. The gallery's nine tiles start as a deck on the centre cell, each turned −7° to +6°, and are dealt to their cells over 0.7s each, 55ms apart, centre first then the ring; they straighten and lose their deck shadow as they land. Hover: the sheet drifts 6px.

Assets: seven bands (26KB together, the same pixels as the head crop) plus the nine tiles. Effort: 1.5 days (bands can be one sprite with `object-position`).

Pros: the only round-two entrance whose motion *explains the product* (a page is composed from parts, in order). The deal is a strong "many" read and finishes with the same sheet as A. Cons: a visitor arriving mid-entrance sees half a page; nine bands are nine requests unless sprited; the deck is a metaphor, though a quieter one than fanned paper.

### G · Focus + Pull-back

Camera moves instead of object moves. The invoice starts 12% too close, 5px out of focus and at 40% opacity, and pulls into focus over 1.6s (scale and blur on separate curves so the focus lands before the size does); the play button lands at 1s. On hover the camera dollies down the page 40px over 2.4s and returns on leave; the sheet uses the wider `invoice-top` crop so the dolly has somewhere to go. The gallery starts on one tile, the ISO seal filling the well at 3.1×, and pulls back over 1.4s until all nine are in frame; hover leans in 4%.

Assets: `invoice-top.webp` (54KB) plus the nine tiles. Effort: 1 day.

Pros: the most cinematic entrance; "one to many" told in one move. Cons: the blur costs a GPU layer for 1.6s; the pull-back is the move most likely to be called an effect; the dolly needs the pointer to rest for two seconds.

### H · Hover story

The rest state is A's poster; the hover carries the sophistication, on intent only. Video: the play disc widens into a pill with the label *Watch* (0.35s, overshoot) and the camera reads down the entire invoice, parties, table, last rows, over 3.2s on an ease-in-out, then holds; leave returns it in 0.9s. Gallery: each tile has a second element on its back (price tag, product card, APPROVED, line chart, PASS seal, heat map, order tracker, signature, DANGER) and the nine flip in a wave, 40ms apart, 0.6s each, and hold; leave flips them back. Eighteen elements, no loop. Under reduced motion the pill still widens and the backs show at once.

Assets: `invoice-tall.webp` (40KB) plus eighteen tiles (≈105KB). Effort: 1.5 days.

Pros: the richest hover on the page and the one most likely to be remembered; the flip wave states "there is more" without a count. Cons: touch and the approver see none of it; 3D flips are a known device; the pill repeats the link row's verb; the heaviest asset set.

### I · Scroll-bound

No timers. The invoice builds as the card travels from the bottom edge of the viewport to its centre: the title between entry 0–70%, the parties, the rule, the four rows and the play button each bound to a later slice of that travel, through CSS scroll-driven animations (`animation-timeline: view()`). Scrolling slowly builds the page; scrolling back takes it apart. The gallery's three columns rise 48 / 84 / 64px at three speeds, like layers at different depths past a window, and settle at the centre. Chrome, Edge and Safari 26 play it; Firefox and reduced motion show the finished state. Hover: the sheet drifts 6px.

Assets: as F. Effort: 1 day, plus a browser matrix check.

Pros: the motion is exactly as fast as the reader, which is the most sophisticated pacing available; zero JS, zero timers, inert off screen by construction. Cons: at 1440×900 the row is already 70% in at load, so a visitor who never scrolls sees a page missing its last rows until they move (on shorter viewports it plays fully); not every browser plays it; scroll-bound motion divides people.

### J · 3D: page turn + depth

Perspective on intent, not as decoration. Video: the invoice is a two-page object (`invoice-head` on page one, the wider `invoice2-top` on page two). On entrance the pair lays down onto the well, rotateX 16° → 0 with its shadow settling, 0.9s. On hover page one turns 72° around its spine (0.9s), the way a page is lifted to look at the next, and page two shows through: the table continuing to the totals, which is the part of the video a developer most wants to see. A light sweeps across the lifting page and a shadow at the fold moves with it; leave lays it back. Gallery: the tiles stand up from lying flat (rotateX −90° about their bottom edge, 0.7s, 60ms apart); on hover the whole sheet tilts 8° / −9° in perspective and the tiles lift to three depths (centre 0, ring 10px, corners 18px), so they parallax against each other; leave flattens.

Assets: `invoice-head.webp`, `invoice2-top.webp` (≈33KB) plus the nine tiles. Effort: 1.5 days (perspective and preserve-3d interplay with the well's clipping needs a Safari check).

Pros: the 3D has a reason (two pages, depth between tiles) and only appears while the pointer rests, which answers the benchmark's objection to static tilted panels. The page turn is the single most informative hover in the lab: it shows paging. Cons: the turn hides the title while it plays; preserve-3d and overflow clipping fight on some engines; perspective is still perspective, and a reviewer who dislikes it will dislike it on intent too.

### Comparison, round two

| | F Assembly | G Focus | H Hover story | I Scroll | J 3D |
|---|---|---|---|---|---|
| Rest poster | A | A (wider crop) | A | A (fully built only after a scroll at 1440×900) | A |
| Entrance meaning | high (composition) | medium (camera) | none (fade) | high (built by the reader) | medium (laid down) |
| Hover payload | small | medium (dolly) | large (pill + read-down + flip wave) | small | large (page turn + depth) |
| Touch parity | entrance only | entrance only | none | scroll plays on touch | entrance only |
| Risk of "effect" | low | medium | medium | medium | medium-high |
| Browser support | all | all | all | Chrome/Edge/Safari 26 | all (Safari check) |
| Bytes at 2× | 84KB | 112KB | 145KB | 84KB | 91KB |
| Effort | 1.5d | 1d | 1.5d | 1d | 1.5d |

### Recommendation after round two

**Ship F's entrance on A's rest state, and add J's page turn as the video card's hover** (both are inside the same well, so they combine without a layout change). F gives the row an entrance that explains the product and finishes on the poster; the page turn gives the hover a reason to exist and shows paging, which is what P3 asks of the video. For the gallery card, keep F's deal as the entrance and leave the hover to the card's ring and halo; H's flip wave is the alternative if the owner wants the gallery to answer the pointer too (it costs eighteen tiles). I is the one to revisit when the row moves below the fold or the hero gets shorter. G is the fallback if the band assembly proves fiddly to maintain.

The honesty caveats from round one still apply: the video and the gallery do not exist yet, so the play glyph stays the only promise, and the page turn shows the real second page of the current invoice render.

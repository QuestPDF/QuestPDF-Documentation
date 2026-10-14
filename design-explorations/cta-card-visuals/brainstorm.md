# Brainstorm: directions for the two CTA visuals

Scored against the ten principles in `research.md` §4 plus the brief's criteria. Scores are 1–5 (5 best). The column *2s* is "clarity of what is behind the click in under two seconds", *Poster* the rest-state quality, *Family* coherence with the page and distinctness from the code window below, *Craft* the ceiling (how hard it is to make it look cheap: 5 = hard), *Durable* over two years, *Motion* restraint, *Perf* bytes and main-thread cost, *A11y* reduced-motion and touch parity, *Widths* behaviour at 1100 / ≤900 / 72px, *Upkeep* when the video or gallery changes. *Honest* is pass/fail against the facts in `research.md` §1 (no video yet, no gallery yet, placeholder counts).

Every direction keeps the card frame, copy, link row and hover ring.

## Video card ("Watch the 10-minute intro")

| # | Direction | What it shows / moves | 2s | Poster | Honest | Family | Craft | Durable | Motion | Perf | A11y | Widths | Upkeep | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| V1 | **Well** | invoice head as a sheet inside an inset tile (chip surface); entrance rise; hover drift 6px | 4 | 5 | pass | 5 | 4 | 5 | 5 | 5 | 5 | 5 | 5 | 48 |
| V2 | **Bleed** | the invoice runs off the card's corner at a large scale; entrance slide; hover 3px; optional scroll-driven 12px | 5 | 5 | pass | 4 | 4 | 4 | 4 | 5 | 5 | 3 | 5 | 44 |
| V3 | **Window / viewer** | window chrome titled `invoice.pdf`, page at viewer zoom; one slow Ken Burns on entrance; dots colour on hover | 5 | 4 | pass* | 4 | 4 | 4 | 4 | 5 | 5 | 4 | 5 | 44 |
| V4 | **Render sweep** | same frame as V1; the page is painted in top-down behind an accent line, once | 4 | 5 | pass | 4 | 3 | 4 | 3 | 5 | 4 | 5 | 5 | 42 |
| V5 | **Quiet sheet** | one sheet, hairline, shadow, play glyph; fade only | 4 | 4 | pass | 3 | 3 | 5 | 5 | 5 | 5 | 5 | 5 | 44 |
| V6 | Full page on a tinted plate | whole A4 invoice (Typst/Overleaf style) on an accent-tinted plate; 231px tall page | 3 | 3 | pass | 4 | 3 | 4 | 5 | 5 | 5 | 3 | 5 | 40 |
| V7 | Two-page spread | pages 1 and 2 side by side in a frame ("it pages") | 3 | 3 | pass | 3 | 2 | 4 | 5 | 4 | 5 | 2 | 4 | 35 |
| V8 | Macro typography crop | the table rows and totals at 2× (proves typographic precision) | 2 | 4 | pass | 4 | 4 | 4 | 5 | 5 | 5 | 4 | 4 | 41 |
| V9 | Page model (exploded header/content/footer) | three slices with API labels that snap together on hover | 3 | 2 | pass | 3 | 2 | 3 | 3 | 4 | 3 | 2 | 3 | 28 (done twice before) |
| V10 | Code → page split | editor beside the page | 4 | 3 | pass | **1** (third code visual) | 2 | 3 | 3 | 3 | 3 | 1 | 2 | 25 |
| V11 | Chapter list / timeline | chapter names with timecodes beside a small page | 4 | 3 | **fail** (no chapters exist) | 3 | 3 | 4 | 4 | 5 | 5 | 2 | 1 | — |
| V12 | Progress bar / player skin | 16:9 frame, controls, timecode | 5 | 3 | **fail** (controls that do nothing) | 2 | 2 | 2 | 4 | 5 | 4 | 3 | 3 | — |
| V13 | Presenter / lower thirds | a narrator avatar or broadcast captions | 4 | 3 | **fail** (no presenter, no script) | 2 | 2 | 2 | 3 | 5 | 4 | 3 | 1 | — |
| W1 | *Wildcard:* real 3s WebM loop of the video with a poster | a short muted clip, poster first | 5 | 5 | **fail today** (no video); pass later | 4 | 5 | 4 | 2 | 2 | 3 | 4 | 3 | later |
| W2 | *Wildcard:* pointer-tracking 3D tilt | the sheet tilts towards the pointer | 3 | 3 | pass | 1 | 2 | 1 | 1 | 4 | 2 | 3 | 5 | 25 |
| W3 | *Wildcard:* cinematic still | the invoice under a cone of light, dark vignette, title typeset like a film poster | 4 | 4 | pass | 1 | 3 | 1 | 5 | 4 | 5 | 3 | 4 | 34 |

\* V3 is honest only while the page the card links to shows the video; a window titled `invoice.pdf` promises a viewer-like destination more than V1 does.

Notes on the rejected ones: V9 was built twice already (cards-lab C, video-lab G) and the owner did not pick it; V10 puts code above the code window; V11–V13 fail honesty today; W1 is the right long-term answer *once the video exists* (Framer, JetBrains and Apple all use a chosen still plus a clip) and is listed in the production plan as a follow-up; W2 and W3 are the two devices the benchmark names as dated.

## Gallery card ("Browse the sample gallery")

| # | Direction | What it shows / moves | 2s | Poster | Honest | Family | Craft | Durable | Motion | Perf | A11y | Widths | Upkeep | Total |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| G1 | **Tile sheet 3×3 in a well** | nine element crops (QR, house, stamp, donut, seal, portrait, map, notary, barcode); staggered fade-up | 5 | 5 | pass | 5 | 4 | 5 | 5 | 5 | 5 | 4 | 4 | 47 |
| G2 | **Bleeding mosaic** | five larger crops in a 2×3 brick that runs off two edges | 5 | 4 | pass | 4 | 3 | 4 | 4 | 5 | 5 | 3 | 4 | 41 |
| G3 | **Window with captions** | four tiles with the Component Variants page names as captions | 5 | 4 | pass | 4 | 4 | 4 | 4 | 5 | 5 | 4 | 4 | 43 |
| G4 | **Develop** | G1's sheet whose tiles fade in one by one, once | 5 | 5 | pass | 5 | 3 | 4 | 3 | 5 | 4 | 4 | 4 | 42 |
| G5 | **Quiet 2×2** | four larger tiles with hairlines and shadows, no container | 4 | 4 | pass | 3 | 3 | 5 | 5 | 5 | 5 | 4 | 4 | 42 |
| G6 | Full-page thumbnails 2×2 | four whole gallery pages (Overleaf style) | 2 | 2 | pass | 4 | 3 | 4 | 5 | 4 | 5 | 2 | 3 | 34 (the Component Variants pages have no macro structure; works once real gallery documents exist) |
| G7 | Stacked deck, top page lifts | a deck of pages; hover lifts the top one | 3 | 3 | pass | 2 | 2 | 2 | 3 | 5 | 4 | 3 | 4 | 31 (paper again) |
| G8 | Filter chips + tiles | chips cycle, tiles cross-fade | 5 | 4 | **fail** (no categories exist) | 3 | 3 | 3 | 2 | 4 | 3 | 3 | 1 | — |
| G9 | Single page, cross-fade through pages | one large page that swaps | 3 | 3 | pass | 3 | 3 | 3 | **1** (a loop) | 4 | 2 | 4 | 4 | 30 |
| G10 | Mini gallery page preview in a window | a scaled-down grid that mimics the future page | 4 | 3 | **fail** (the page does not exist; it would promise a layout) | 4 | 2 | 3 | 4 | 4 | 5 | 3 | 1 | — |
| G11 | Horizontal strip / filmstrip | a row of crops that scrolls | 4 | 3 | pass | 2 | 2 | 2 | 2 | 4 | 3 | 3 | 4 | 29 (rejected before as a gimmick) |
| G12 | Caption-only "contents" list | a typeset list of sample names with tiny marks | 3 | 3 | pass | 4 | 3 | 5 | 5 | 5 | 5 | 5 | 2 | 40 (text-only, no proof of output) |
| W4 | *Wildcard:* isometric wall of pages | a tilted grid of twelve pages | 4 | 3 | pass | 1 | 2 | 1 | 3 | 4 | 4 | 2 | 3 | 27 (the perspective shelf) |
| W5 | *Wildcard:* sticker sheet | the big elements (PAID, ISO seal, QR, donut) cut out on transparent backgrounds, arranged like stickers | 4 | 4 | pass | 2 | 3 | 2 | 4 | 4 | 5 | 3 | 2 | 33 (reads as clip art the moment a cut-out is imperfect) |
| W6 | *Wildcard:* scroll-driven conveyor | tiles drift with the scroll position, no JS | 4 | 4 | pass | 3 | 3 | 3 | 4 | 5 | 4 | 3 | 4 | 37 (good as an ambient option on G1/G2, weak alone) |

## Choosing the pairs

The pair has to be one family with two reads. The strongest family bond is a **shared container** (both visuals framed the same way) and a **shared entrance grammar** (both arrive once, in the same direction). "One against many" then comes from the content: one large document crop against a sheet of small element crops.

| Pairing | Video | Gallery | Family bond | Read |
|---|---|---|---|---|
| A Well | V1 | G1 | the same inset tile (chip surface) on both cards | one sheet vs nine tiles |
| B Bleed | V2 | G2 | both run off the card's top-left corner | one big document vs a collection that continues |
| C Window | V3 | G3 | the same window chrome, two file names | a viewer vs a folder |
| D Render once | V4 | G4 | the same hairline frame; both *render in* on entrance | process vs range |
| E Quiet | V5 | G5 | none beyond hairline + shadow | one vs four, still |

Rejected pairings: V1+G3 (two containers of different kinds in one row), V3+G1 (a window next to a well reads as two different components), V6+G6 (two whole pages: the gallery pages have no structure to show), anything with V10 (code above the code window), anything with a loop.

Ambient motion (W6) is offered as an optional layer on B only, because B's bleed already implies that the document extends beyond the card and a 12px scroll-bound drift reinforces that; on the contained pairings it would read as a glitch.

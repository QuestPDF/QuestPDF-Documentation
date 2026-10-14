Nothing in production components was changed.

# Research: visuals and motion for the two CTA cards under the hero

Date: 2026-10-13. Branch: `theme-redesign-experiment` (the product owner's uncommitted edits to `HomePageCtaCard.vue`, `CustomPages.css` and four other files were left untouched). Lab page: `/cta-visuals-lab.html` (unlinked), components in `docs/.vitepress/theme/homepage/lab/cta/`, lab-only assets in `docs/public/homepage/lab-cta/`. Captures in `captures/`.

## 1. Audit of the current state

Measured on the dev server (`http://localhost:5173/`) with the Playwright headless shell, 1440×1000, both themes; DOM geometry read through a probe page.

| Fact | Measured |
|---|---|
| Card | 672×292, 32px radius, 32px padding, two cards 32px apart, equal height |
| Visual column | 231×228 (38%); 34% at 901–1280px; 72×72 thumbnail at ≤700px |
| Video pages | `invoice1.webp` / `invoice2.webp` (1190×1684) shown at 118px wide → **scale 0.099**; the 20pt title renders at ~3.6px, body text at ~2px |
| Gallery pages | 15 Component Variants pages (640×906) shown at 104px wide → scale 0.16; body text ~1.5px |
| Play button | 52px disc on the front page; "10 min" badge 52×22 at the page's bottom-right (DOM says visible; it appeared in some captures and not others, because it fades in 0.4s after the entrance) |
| Glow | two radial gradients at the top-left (accent 13% + 6%), plus `repeating-conic-gradient` rays at 2–2.5% alpha masked to a 420px circle: the rays are not visible in any capture at 1:1; they cost a paint layer for no effect |
| Motion | entrance: pages open from a stacked position once (0.6s). Hover: fan opens a little further; gallery coverflow steps one page every 2.5s while hovered, first step after 350ms; play button grows 8%; arrow slides 4px. Touch users see the entrance only. |
| 1100px | the gallery's left page starts at x=765 inside a card whose padding box starts at 768: at 34% the side page is **clipped by the card's left edge** (see `captures/v0.png`, "1100 light") |

Captures: `captures/v0.png` (1440 light/dark, hover, 1100, 390) and the two overview pages.

### What the captures say about the hypotheses

| Hypothesis | Verdict |
|---|---|
| Pages at 104–118px are illegible and read as stock "document" clip art | **Confirmed.** At 2× zoom of the capture, the invoice is grey texture with a blue logo blob; the gallery pages are three near-identical white sheets. The gallery's variety (maps, charts, seals) is invisible: the Component Variants pages are "label + element" lists with no macro structure, so they thumbnail to the same grey rectangle. |
| Fan and coverflow are stock metaphors | **Confirmed**, and the coverflow is the "perspective shelf" that `cards-lab.html` had already rejected as dated (rotateY 24°, scaled sides, slides on hover). |
| The video card says "video" only through the play button; the badge repeats the link row | **Confirmed.** "10 min" appears twice within 150px. |
| On dark mode, white sheets on dark glass are the hardest-edged objects on the page | **Confirmed.** The two cards hold the only pure-white rectangles above the fold; the headline gradient and the stats tiles are the next brightest. |
| Storytelling motion is hover-only, small and mechanical | **Confirmed.** The hover deltas are 11px of translate and 2° of rotation (fan), 12px (coverflow). |
| Loose paper props don't match the window/glass vocabulary | **Confirmed.** Every other visual on the page is framed (stat tiles, chips, the code window with dots and a file name, the Companion screenshot, the `hello.pdf` figure with a caption). The cards are the only place where unframed, rotated sheets float. |
| New finding | At 1100px the gallery coverflow is clipped by the card edge. |
| New finding | The intro video does not exist yet: `docs/quick-start.md` has no embed and `docs/roadmap.md` lists "Introductory video and learning materials" under *In progress*. The card links to a page without a video. The gallery page does not exist either (`/sample-gallery.html` is a placeholder; roadmap "Up next"). |

## 2. Why the previous labs' recommendations fell short

- **They were designed for a different card.** `cards-lab.html` (2026-10-12) measured the bento cards at 672×496 with the visual *above* the text, a 576px-wide stage. Its recommendation, a 16:9 player frame plus an eight-tile contact sheet, needs that width: at today's 231px column a 16:9 frame is 130px tall and an 8-up contact sheet has 50px tiles. `video-card-lab.html` built everything on a fixed 576×324 frame and said itself that its split screen was "the busiest of the ten at thumbnail size: 11px code is readable on a desktop and decorative on a phone." The layout then changed to side-by-side cards with a 231px visual and the recommendations did not transfer.
- **The shipped version fell back to objects because objects scale down.** A fan of pages and a coverflow survive a 231px column *geometrically*; they do not survive it *semantically*, because the pages themselves need 300px+ to say anything. So the result reads as a generic illustration of "documents".
- **The labs relied on long hover sequences.** The cards-lab's hover stories ran 6–7s; the video-lab's ran ~9s. Nobody rests a pointer on a card that long, and touch users never see them. The shipped card inherited the hover-only model with a shorter, weaker payload.
- **Two of the ten video directions were code windows**, which the labs themselves flagged: "the page would show code three times before the fold". The quick-start window sits directly below the row.
- **Nothing addressed dark mode or 1100px.** Both labs captured 1440 and phone only; the clipped coverflow at 1100 and the white-slab problem in dark mode are consequences.
- **The honesty constraints were not applied.** Chapter ticks, timecodes and a progress bar were recommended for a video that does not exist yet.

The conclusion for this round: at 231×228 the visual has to be **one strong object at a scale where it reads, or a tight pattern of recognisable elements**, framed in the page's own vocabulary, with motion that plays once. Scenes (players, split screens, timelines) are out of budget at this size.

## 3. Personas

Sources are in §6. Confidence: **H** = several independent public sources, **M** = one source or indirect, **L** = plausible, little public evidence. GitHub issue counts underweight buyers; the owner's statement that pre-purchase emails most often ask about telemetry, license servers and air-gapped use is taken as a high-confidence fact (zero GitHub hits for those terms).

### P1 · The developer with the ticket (H)
*"Generate invoices / reports as PDF" landed in the sprint.* Arrives from Google, NuGet or a Reddit thread ("Just trying to export one d*mn PDF report in C#", r/dotnet 2025, 59 comments). Tabs open: the ticket, Stack Overflow, two competitor pages, maybe an HTML-to-PDF article. Stack Overflow's top `questpdf` question is "Is it possible to use QuestPDF in ASP.NET Core Web API? … I tried searching for some reference code" (4,114 views).
- Question to the video card: *How fast can I get an invoice out, and does the video actually build one?*
- Question to the gallery card: *Is there a finished invoice I can copy?*
- Trust: a real rendered invoice with a table; a duration; code that compiles. Skepticism: clip-art documents, a play button on a page (not a player), "40+ samples" if the page is empty.
- Aesthetic: engineering-grade, Stripe/Linear-level crispness; dislikes marketing gloss.
- 2-second read: "this is a real invoice, the video builds it, ten minutes" / "there are many kinds of things I can copy".
- Hovers: sometimes, briefly. On a laptop trackpad the pointer crosses the card on the way to the code below.

### P2 · The evaluator (tech lead / architect) (H)
Evaluating a long-term dependency; the axis is licence stability and native-dependency risk, not features (Reddit on dual licensing, 2023, 54 comments; "GeneratePdf is not Thread-Safe" #1447; the 218-comment Alpine/ARM/glibc thread #622). Reads the pricing FAQ. Asks about telemetry, licence servers and air-gapped deployment by email before buying (owner).
- Video card: *Will this teach my team the model in ten minutes, or is it a sales reel?*
- Gallery card: *Does the output look like something I would ship? Is it maintained?*
- Trust: restraint, precision, real output, consistent chrome. Skepticism: sparkles, glass, anything that looks like a template site; motion that keeps moving.
- Aesthetic: Linear, Vercel, JetBrains product pages; Apple-level quiet.
- 2-second read: "mature, maintained, the output is precise".
- Hovers: rarely. Reads the row at rest while scrolling to the licence section.

### P3 · The migrant from HTML-to-PDF or a report designer (H)
Burned by wkhtmltopdf/Puppeteer pagination ("I've chased the HTML-to-PDF pipelines enough to know that they are all jank", r/dotnet 2025), tables across pages ("I've had trouble with html → pdf when it comes to tables", HN), Crystal Reports on .NET 6. The largest share of advocacy quotes.
- Video card: *Does it show the page model (header, content, footer, paging) so I can judge the migration?*
- Gallery card: *Are there multi-page tables, totals, headers and footers I can copy?*
- Trust: visible structure (header row, table, totals, page numbers), multi-page evidence. Skepticism: pretty single pages with no table; anything that looks like a WYSIWYG designer.
- 2-second read: "real tables, real paging, real invoice".
- Hovers: yes if the pointer is already there.

### P4 · The agent-driven developer (M, merged into P1 as a trait)
No public issue or discussion mentions Copilot, Cursor, ChatGPT or `llms.txt` (0 hits), but the need for pasteable reference code is everywhere (#667 "need AWS or Azure example"; #1336 answered with a full sample) and the site already ships `llms.txt`. Wants reference code, not visuals. The cards' job for this persona is only to not get in the way; the agent section further down serves them. (See `design-explorations/quick-start-agents/research.md` for the AI-adoption survey data.)

### P5 · The design-conscious developer / product owner (M, as a trait of P1/P3)
Judges the library by its output ("rendering has been pixel perfect so far"; cosmetic feature requests: gradients, shadows, rounded images, Font Awesome). No non-developer product-owner voice was found in public; the owner's customers are developers. Still: the gallery card is the one place where *range and polish* are shown.
- 2-second read: "the output looks designed, not generated".

### P6 · The returning customer wanting a recipe (H for docs, L for the homepage)
Arrives via search into docs; the long tail of discussions is recipe-shaped ("Reset page number", "Show element only on last page", "Table of contents dots"). Rarely lands on the homepage; when they do, the gallery card is the recipe book.

### P7 · The approver who never clicks (H, paired with P2)
Legal, procurement, the manager who signs ("Usually it's not the cost. It's the effort and the timing required to get the license", r/dotnet 2023; a provincial government asking whether it counts as non-profit, #1087). Reads polish as vendor maturity; what they actually check is NuGet presence, source, maintenance, support promise. The row must look like it belongs to a company that will still exist in five years.
- Hovers: never.

### P8 · The licence-wary small-shop developer (M, new)
Pre-sold on code-first, hunting for "truly free" ("completely free … no AGPL, trials, or paid tiers", SO 2026; "Tired of QuestPDF licensing?" r/dotnet 2026). The cards are not their decision point; the licence section is. They punish anything that smells like upsell. Motion that feels like advertising counts.

### Who hovers?
Only P1 and P3 reliably put a pointer on the cards, and for under a second. P2, P7 and all phone/touch visitors judge the rest state alone. Anything the cards must say has to be said at rest.

## 4. Principles (the scoring criteria)

1. **Legible at 231px.** Whatever is shown must be recognisable at that size: titles ≥ 11px rendered, or shapes that are iconic without text (QR, stamp, map, chart, photo).
2. **Real output only.** Every pixel of "document" is a QuestPDF render; crops are allowed, mock-ups are not.
3. **The rest state is the poster.** Touch users, reduced motion and the approver see nothing else. The still must be finished and beautiful.
4. **One against many.** Video = one document being made; gallery = many kinds of content. Two distinct reads, equal weight, one family.
5. **Framed, not loose.** The page's vocabulary is framed objects with hairlines, 12–16px radii, cool hues, grey insets on white. No rotated sheets, no perspective.
6. **Motion once, or on intent.** Entrance plays once; hover answers the pointer within 300ms; nothing loops; nothing runs off screen.
7. **Honest.** No controls that do nothing, no chapters, no categories, no counts that do not exist. The play glyph is the one permitted "video" signifier until the video exists.
8. **Distinct from the code window below.** No code in the cards.
9. **Dark mode is first-class.** The paper is dimmed and contained; the white area is a fraction of the visual, not the whole column.
10. **Cheap.** ≤ 200KB above the fold at 2× for both cards; transform/opacity only; no JS beyond the entrance observer.

## 5. Benchmark (live, 2026-10-13)

Pages fetched as HTML; appearance inferred from markup (IFM) where noted. Unreachable: Canva, Figma Community, Tailwind Plus (login), Pitch, Linear's product tour (JS shell).

| Site | "Watch a video" | "Browse examples / templates" | Borrow | Avoid |
|---|---|---|---|---|
| Linear | none; hero is one real app frame on a grainy dark stage with a faint edge glow and hairline gridlines (IFM) | none | total restraint; one real artefact, faint glow | nothing for a video card |
| Vercel /templates | none | 200px cards; the 1200×630 screenshot peeks in from the bottom-right, cropped by the card, hairline border (IFM) | offset, cropped, hairline-framed screenshot showing the identifying corner | heavy copy makes the artefact secondary |
| Stripe | "Watch the video →" as a text link with a hover arrow under a photo; no play glyph, no duration; a plain YouTube href with an aria-label saying what you will watch | text links only; gradient bento borders | a labelled text link beats a glossy player | gradient card borders |
| Raycast | carousel of 18 raw YouTube `hqdefault` thumbnails, opens YouTube | icon + preview + one-line caption per extension; terminal "Plus thousands more… Browse the store" card | one-line captions; "…and N more" | raw YouTube thumbnails; mock cursors; glass backdrops |
| Resend / react.email | no CTA; 3D looping objects as section icons | 3-up grid of real email covers + "Brand / Type" names + avatar; hover = 1px border tint + 1px lift | "Type / Variant" captions; the quiet hover | glossy 3D loops, gradient text |
| Supabase | none | 2-col cards with a framework logo eyebrow and an **abstract CSS wireframe** instead of a screenshot | logo eyebrow; quiet "View all" | wireframe stand-ins (for a PDF library the real page is the point) |
| Clerk | none | wall of real component screenshots, percent-positioned, 1px shadow rings; also a rotateX(-75°) tilted glowing panel | composite of real artefacts, descriptive alts | perspective tilt, glass bentos |
| Framer templates | every tile is a `<video>` with a poster picked at t=4.5s, plays on hover (IFM) | 4:3 tiles on a subtle plate with a 1px inset `::after` border; hover = 3px lift; name, author, price | inset hairline on a plate; chosen poster frame; 3px lift | video on every tile |
| Webflow templates | none | grid of landscape crops; hover swaps to the **tall full page** (150/199) with a 4% scale; dark scrim + white "View details" pill | hover reveals a taller crop of the same document | scrim + pill, shimmer skeletons |
| JetBrains IDEA | `<video poster>` with a **labelled "Watch video" pill** (play SVG + text) over a dark product poster; captions track; custom player shows time | text link | labelled pill on a real-UI poster | alt-less GIFs, heavy custom chrome, 7-step coachmarks |
| Apple | "Watch the film" = text link + small play-circle glyph in the section header; modal `.m3u8`; inline videos with chosen start/end frames | none | text + glyph, chosen still | scroll-scrubbed video, sparkles icon, 16 bento items |
| Typst Universe | hero video with a poster and an aria-label | 3-col cards, **full first page at 90px** on a per-template gradient plate derived from the document's palette, 1px border in a tertiary colour, type badge on the corner; hover = 3px accent outline | tinted plate from the document's own colours; a type badge | 90px pages cannot sell by themselves |
| Overleaf templates | none | **entire A4 first page** at ~350px on white with a double soft shadow; hover = 8% tint; 2-line title, badge | whole page + soft shadow is the most honest thumbnail | category pictograms lose the "real output" proof |
| Notion templates | hero video loop with a play/pause control | shadowed previews in a 3-up, opening a modal; counts ("389 templates"); hero imagery is a **pile of papers** | counts as proof of depth | the paper pile |
| shadcn/ui blocks | none | light/dark twin screenshots in a `rounded-xl border` on a 1px dotted stage; mono ids as captions | dotted stage, mono captions, twin assets | — |
| Loom | the real player embedded with its chrome hidden | none | hide the chrome, keep the player real | fake play buttons inside illustrations |
| Retool templates | none | 320×180 `object-left` crops on a `#F6F6F6` plate with a hairline; dims on hover | left-anchored crop on a plate | dimming on hover |

**What signals premium now:** restraint about video (labelled text links or a "Watch video" pill on a chosen still; Apple, Stripe, JetBrains); real artefacts in hairline frames (Clerk, Framer, Vercel, Retool); tinted plates instead of drop shadows (Typst, Framer, Retool); quiet hovers of 1–3px (Framer, react.email, Overleaf); light/dark twin assets; mono metadata captions.

**What has become cliché:** bento-everything (Stripe, Clerk, Raycast, Notion, Apple), perspective-tilted panels (Clerk, Framer's homepage), gradient blobs and glass (Resend, Clerk, Raycast), mock cursors and fake play buttons (Raycast, Loom), sparkles (Apple), fanned or piled paper (Notion), raw YouTube thumbnails (Raycast), logo marquees (everyone), scroll-scrubbed video (Apple only).

**Document thumbnails at 200–250px**, from the document tools: a whole page works only when the sample has a strong top third (letterhead, title, table); otherwise crop the identifying top-left (Retool, Vercel) and let hover reveal more (Webflow). Put the page on a plate (Typst's tinted plate, Framer's subtle control colour) rather than on the bare card.

**Competitors (iText, Aspose, Syncfusion, IronPDF, PDFsharp, Telerik, DevExpress):** designer vendors sell screenshots of the designer and a "report gallery"; library vendors sell a code snippet plus a trial button. Only Syncfusion shows a thumbnail-per-document strip (boarding pass, certificate, invoice). Nobody shows a rendered PDF next to the code that made it, and nobody shows an intro video with a real poster. The field is open for "real output, framed, at a legible scale".

## 6. Sources

| # | Source | Accessed | Confidence |
|---|---|---|---|
| 1 | `docs/.vitepress/theme/homepage/HomePageCtaCard.vue`, `HomePageGettingStarted.vue`, `HomePageSampleGallery.vue`, `HomePage.vue`, `CustomPages.css`; captures `captures/v0.png` | 2026-10-13 | H |
| 2 | `docs/public/cards-lab.html`, `docs/public/video-card-lab.html`, memory notes `bento-cards-lab`, `homepage-visual-verification` | 2026-10-13 | H |
| 3 | `docs/roadmap.md` (video "In progress", gallery "Up next"); `docs/quick-start.md` (no embed) | 2026-10-13 | H |
| 4 | github.com/QuestPDF/QuestPDF: 14.2k stars, ~1,490 issues; searches for `table page break` (34), `header footer` (70), `font` (166), `docker linux` (35), `ShowEntire OR … pagination` (63), `page number OR last page` (49), `previewer OR companion` (98), AI terms (0 real hits); discussions #491 (licensing, 85 comments), #479 (last-page footer), #1345 (visual designer poll: 61% yes, 23% "I prefer code"), #622 (218 comments, deployment); issues #667, #1336, #1447, #1474, #1475 | 2026-10-13 | H (titles), M (counts) |
| 5 | api.stackexchange.com, tag `questpdf` (4) and search (36): "Is it possible to use QuestPDF in ASP.NET Core Web API?" (4,114 views), "Error when running QuestPDF on docker container" (4,254), "Repeat content on every page" (632), "How to create a proforma invoice" | 2026-10-13 | H |
| 6 | r/csharp and r/dotnet via the pullpush.io archive (99 submissions, ~200 comments, 2021–2026): dual-licensing thread 2023-02-21 (54 comments); "Just trying to export one d*mn PDF report in C#" 2025-05-29 (59); previewer launch 2022-04 (192 pts); 2026 "free alternative" threads | 2026-10-13 | H (text), M (completeness) |
| 7 | news.ycombinator.com/item?id=34429791 (2023) | 2026-10-13 | H |
| 8 | questpdf.com/pricing (FAQ: no keys, no activation servers, offline/air-gapped, perpetual, resellers); questpdf.com/llms.txt | 2026-10-13 | H |
| 9 | Competitor pages: itextpdf.com, products.aspose.com/pdf/net, syncfusion.com PDF framework, ironpdf.com, pdfsharp.net, telerik.com/products/reporting, devexpress.com reporting | 2026-10-13 | H |
| 10 | Benchmark sites listed in §5, fetched as HTML | 2026-10-13 | M (visuals inferred from markup) |
| 11 | Product owner: pre-purchase emails ask about telemetry, licence servers and air-gapped use (memory note `buyer-questions-privacy`, 2026-10-11) | — | H |

## Round two

2026-10-13, feedback on the first five: "I need more creative, sophisticated animations" and "maybe some 3D animations". Five more pairings (F–J) were built on the lab page and are written up in `proposals.md` § Round two; the research above was not changed. One finding from building them: VitePress sets `max-width: 100%` on images, so any crop meant to be wider than its frame (G's dolly, J's page two) needs `max-width: none`.

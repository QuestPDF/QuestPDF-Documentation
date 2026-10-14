# Prompt: visuals and motion for the two homepage CTA cards

> Paste everything below the line into a coding agent (Claude Code or similar) started in
> `~/WebstormProjects/QuestPDF-Documentation`. The dev server is expected at http://localhost:5173/.

---

## Role and goal

You are a senior product designer and design engineer who designs developer-tool marketing sites.
You have two jobs: understand QuestPDF's audience in depth, then design the image and motion for the
two call-to-action cards directly under the homepage hero. Start wide and then narrow down. Explore
many genuinely different approaches, judge them honestly, prototype the best ones at real size on the
real page, and recommend one pairing.

The product owner loves having these two large cards at the top. What they dislike is the images and
their animations, which feel poor. In scope: everything in the visual column, meaning the pages, the
play button and badge, the accent glow and rays behind them, and all motion. The card's frame, copy,
link row and hover ring stay unless you argue for a change, and the "evolution, not revolution" house
rule below applies. The result
must match the existing look and feel of the page and read as professional, polished and modern. It
must not feel like a template, and it must not look like a trend that will date within a year.

## Ground truth: read these before you form any opinion

**The cards**
- `docs/.vitepress/theme/homepage/HomePageCtaCard.vue` is one component shared by both cards through
  `variant: "video" | "gallery"`. Read the whole file, including its comments.
- `HomePageGettingStarted.vue` holds the video card's copy and passes two invoice renders from
  `docs/public/homepage/getting-started/`. It links to `/quick-start.html`.
- `HomePageSampleGallery.vue` holds the gallery card's copy and passes 15 renders from
  `docs/public/homepage/sample-gallery/` (product cards, charts, tables, stamps, maps, QR codes,
  signatures and more). It links to `/sample-gallery.html`, which is a placeholder because the page
  does not exist yet (see `docs/roadmap.md`).
- `HomePage.vue` defines the row, the canvas background and the section seams.
- Today's behaviour:
  - Video card: a fan of 2 small tilted pages with a play button and a "10 min" badge. The fan opens
    a few pixels more on hover.
  - Gallery card: a coverflow of 3 pages (`rotateY`) that steps one page every 2.5s while hovered.
  - Both: the pages are closed until the card scrolls into view. There is an accent glow plus faint
    rays in the top-left corner, and a conic "ring" orbits the edge on hover.
  - Accents: blue `#0094F9`/`#2979FF` on the video card, indigo `#5C6BC0`/`#3F51B5` on the gallery card.
- Geometry, measured at 1440×900 in dark mode:
  - Each card is 672×292 with a 32px radius. The cards sit side by side with a 32px gap and are
    stretched to equal height.
  - The visual column is 38% of the card (about 231×228). Text takes the rest.
  - The cards sit at y≈508–800, so they are above the fold. They are part of the first impression and
    of LCP.
  - At 901–1280px the visual column narrows to 34%.
  - At ≤900px the cards stack and become wider.
  - At ≤700px the visual collapses to a 72×72 thumbnail beside the title.
- Uncommitted edits by the product owner are in the working tree, including `HomePageCtaCard.vue`.
  Do not touch them.

**The visual language of the page.** Study the code and look at the running page in both themes.
- Canvas and surfaces:
  - `body` carries `grain.png` and soft radial washes in blue, cyan, indigo and teal (no yellow or
    green).
  - The hero has a dot grid, and dotted seams separate the sections.
  - `.panel` surfaces are translucent "glass" (`--home-surface`) with a faint top rim and a sheen
    (`CustomPages.css`).
- Type and icons:
  - Inter, with a cyan→blue gradient on "Code-first".
  - Font Awesome Pro icons.
  - Stat tiles with icon squares.
- Other UI on the page:
  - `HomePageWindowContainer` draws window chrome for the code window directly below the cards and
    for the Companion App panel.
  - Further down are the agent demo panel, the standards chips and the license cards.
- Find what makes the page feel the way it does: the ratio of quiet to loud, the edge treatments,
  the shadows, the radii, the colour temperature and the motion personality. The new visuals must
  belong to that family.

**Prior explorations. Read them, don't repeat them blindly.**
- `docs/public/cards-lab.html` explored 10 concepts with a critique. Its verdicts:
  - Gimmicks: loupe, filmstrip, and a progress bar that plays nothing.
  - Will look dated: the perspective shelf.
  - Bad pairings: two code windows, or two sliding strips.
  - Recommendation: player frame plus contact sheet, with chapter ticks.
- `docs/public/video-card-lab.html` explored 10 video directions. Its recommendation was a split
  screen (editor plus page) with a chapter bar and one caption line. "Poster" and "Blueprint" were the
  quieter alternatives.
- `design-explorations/quick-start-agents/` shows the expected working method and the house rules.
- `git log -p` on the homepage components shows how the cards evolved.
- Note that what shipped, a coverflow, is close to the "perspective shelf" that was already flagged
  as dated. Explain in your own words why the earlier recommendations probably didn't satisfy and why
  the shipped result looks poor. Any direction you propose must be new, or must carry an explicit
  argument for reviving an old one.

**Initial diagnosis.** These are hypotheses. Verify, refute or extend them by looking at the real page.
- Pages 104–118px wide make A4 content illegible. They read as stock "document" clip art, not as
  QuestPDF output, and the gallery's variety (maps, charts, seals) disappears.
- The paper fan and the coverflow are stock metaphors.
- The video card says "video" only through a play button stuck on a tilted sheet. The "10 min" badge
  repeats the link row.
- On dark mode, white sheets on dark glass are the hardest-edged objects on the page.
- All storytelling motion is hover-only. Touch users see none of it, and the hover motion is small and
  mechanical.
- Loose paper props don't match the page's precise window and glass vocabulary.

**Honesty constraints, as facts to design around**
- Check whether the intro video exists. `docs/quick-start.md` currently shows no embed.
- The gallery page does not exist yet.
- Duration, chapter names and "40+ samples" may be placeholders.
- A visual must never promise something that isn't there: player controls that do nothing, filters or
  categories the gallery won't have, or chapters that don't exist.
- Document imagery must be real QuestPDF output. You may produce new, purpose-made renders with
  QuestPDF (library source at `~/Programming/QuestPDF/QuestPDF-main`). Good options are compositions
  designed to read at 230px, crops, 2×/3× WebP/AVIF, and SVG output. Describe exactly how you would
  produce every asset. Where you can't render it now, mock it in HTML and label it as a placeholder.

## Phase 1: Personas, from evidence and not from recall

Build the personas from evidence:
- The homepage copy.
- The pricing and license pages:
  - Community: free under $1M revenue.
  - Professional: $1,999/yr, every developer in one entity.
  - Enterprise: $4,999/yr, affiliates, procurement.
  - All tiers are perpetual.
- The stats: 14.2K stars, 36M NuGet downloads, 800+ paying customers, 6 years.
- The Companion App, the standards (PDF/A, PDF/UA, ZUGFeRD/Factur-X) and the enterprise foundations
  (air-gapped, no telemetry).
- The AI-agent section and the roadmap.
- Public signals: GitHub issues and discussions for QuestPDF/QuestPDF, NuGet, Stack Overflow,
  r/dotnet, and competitor pages (iText, Aspose, Syncfusion, IronPDF, PDFsharp/MigraDoc,
  HTML-to-PDF via Puppeteer/Playwright/wkhtmltopdf, RDLC/SSRS/Crystal).

Cite your sources and mark a confidence level for each claim. GitHub issue volume underweights buyers.
Questions about telemetry, license servers and air-gapped use come by email before a purchase and
almost never appear as issues, yet they are among the most frequent. Expect these hypotheses at least,
and validate, merge or replace them:
- The .NET developer who was just handed a "generate invoices and reports" ticket.
- The tech lead or architect evaluating a long-term dependency.
- The developer migrating away from HTML-to-PDF or a legacy report designer, who is burned by
  pagination, headers and footers, and table breaks.
- The developer who works through an AI agent and wants reference code to paste and adapt.
- The design-conscious developer or product owner who cares how the output looks.
- The returning customer who wants a recipe book.
- The buyer or manager who never clicks but reads polish as a signal of vendor maturity.

For each persona, write:
- Their context on arrival: where they come from and what else is open in their tabs.
- The exact question they ask of each card at the moment they decide whether to click.
- What earns trust and what triggers skepticism. Developers punish fluff, fake UI and slow motion.
- Their aesthetic expectations.
- What a 2-second glance at the rest state must tell them.
- Whether they will ever hover. Many will not, and touch users cannot.

End the phase with a short list of design principles derived from the personas. These become the
scoring criteria.

## Phase 2: Benchmark

Study 10–15 respected developer-tool or design-led sites live, and date your findings. Examples:
Linear, Vercel (templates), Stripe, Raycast, Resend, Supabase, Clerk, Tailwind/Catalyst, Framer and
Webflow template galleries, JetBrains, and Apple product pages for restraint. Look at how they show
these two things:
1. "Watch a video" calls to action and poster frames.
2. "Browse examples, templates or a gallery" calls to action.

For each site, record what it does, what to borrow and what to avoid. Note what currently signals
"premium" and what has become cliché: perspective walls of screenshots, glassy player skins, sparkles,
bento-everything, gradient blobs.

## Phase 3: Brainstorm wide

Produce 12–15 directions per card. Vary them along all of these axes:
- **What the image shows:** a single finished document, many documents, the process (code to page,
  blank to done), the page model or structure, the toolchain (IDE, Companion App), a macro crop that
  proves typographic precision, the same data designed several ways, the presenter or narration,
  abstract or brand.
- **The frame:** none, a window frame from the page's own vocabulary, a 16:9 frame, a grid or
  masonry, isometric, a blueprint overlay.
- **What moves, and how:** assemble, reveal or sweep, cycle or cross-fade, morph, zoom, depth or
  parallax, type-on.
- **When it moves:** never (a strong poster), once on entrance, on hover or focus, a very slow ambient
  idle, scroll-driven, or pointer-tracking.
- **The technique:** CSS on real renders, SVG, a short pre-rendered WebM/MP4 loop with a poster frame,
  canvas, View Transitions.

Include 2–3 deliberately bold wildcards per card. Score every direction in one table against the
Phase 1 principles plus these criteria:
- Clarity of what is behind the click in under 2s.
- Quality of the rest-state poster.
- Honesty.
- Coherence with the page family, and distinctness from the code window directly below. A third code
  visual above the fold is a known problem.
- Ceiling of craft: how easily it looks cheap.
- Durability over 2+ years.
- Motion restraint.
- Performance: bytes above the fold, main-thread cost, transform/opacity only.
- Accessibility.
- Behaviour at 901–1280px, ≤900px and the 72px thumbnail.
- Upkeep when the video or the gallery changes.

Then judge the cards as a pair. They should be one family with two distinct reads (for example "one"
against "many", or "process" against "range"), at equal height and equal visual weight.

## Phase 4: Converge and prototype

Shortlist 4–5 pairings. For each pairing, write:
- A storyboard covering rest, entrance, hover or focus, idle, leave, reduced motion, touch and the
  72px compact state.
- A timing table with durations, easings, delays and loop policy.
- An asset list: what to render, the sizes, the formats and the target weights.
- Pros and cons.
- Persona fit: which persona's question it answers best and which it neglects.
- Risks and mitigations.
- An effort estimate.

Build every shortlisted pairing, plus today's version as baseline V0, on an unlinked lab page:
- The page is `docs/cta-visuals-lab.md`, with layout `page`, no sidebar or aside, and pageClass
  `wide-layout`.
- Import the lab component in a `<script setup>` block in the `.md` file, as `docs/agents-lab.md`
  does. No change to `theme/index.ts` is needed.
- Put the components in `docs/.vitepress/theme/homepage/lab/cta/`.
- Wrap everything in `.custom-page.home-page.textured-page` so each pairing sits on the real canvas at
  the real size.
- Each pairing gets a note strip: its name, why it gets clicked, and its trade-offs.
- Add a toolbar with these controls: force hover, freeze or scrub time, simulate reduced motion, and
  phone width.

Capture and check every pairing in light and dark mode at 1440, 1100 and 390px, plus the hover states.
Before capturing, read the project memory note `homepage-visual-verification.md`. It covers headless
Chromium captures, the force-dark helper, Font Awesome failing on `[::1]`, forcing hover states, and
timer budgets for animations.

## House rules

These are non-negotiable.
- **Evolution, not revolution.** Keep the cards' copy, link rows, layout and hover ring unless a
  change is essential. If it is, flag it separately.
- **Keep effects faint.** Start any surface effect at about half of what looks right in isolation.
  The glass rim was once called "way too strong".
- **No "AI-powered" styling.** No sparkles, no purple AI glow.
- **No endless attention-grabbing loops.** Motion plays once or on intent. Ambient motion is allowed
  only if it is barely perceptible and pauses off-screen.
- **Honour `prefers-reduced-motion`.** The still frame must be a finished, beautiful poster in its
  own right.
- **Style comments.** Use only `/* */` comments in non-SCSS Vue `<style>` blocks. `//` breaks
  `docs:build`.
- **JS-only controls.** In the lab, controls that only run JavaScript must be `<button>`s styled like
  `a.action`, because the VitePress router captures `<a>` clicks.
- **Leave production alone.** Do not modify `HomePageCtaCard.vue`, `HomePageGettingStarted.vue`,
  `HomePageSampleGallery.vue`, `HomePage.vue` or `CustomPages.css`.
- **No commits.**
- **Performance budget.** New above-the-fold imagery should total at most ~200 KB for both cards at
  2×. No new JS dependencies. Keep animations at 60 fps on a mid-range laptop.

## Output

Write the deliverables to `design-explorations/cta-card-visuals/`:

1. `research.md`:
   - An audit of the current state, with captures.
   - Why the previous labs' recommendations fell short.
   - The personas, with sources and confidence levels.
   - The derived principles.
   - The benchmark table.
2. `brainstorm.md`: every direction per card, the scoring table, the wildcards, and how you chose the
   pairs.
3. `proposals.md`:
   - The 4–5 pairings in full detail.
   - A comparison matrix.
   - One recommendation, plus a runner-up and a "quiet" alternative.
   - The production plan for the recommendation: which assets to render with QuestPDF, and how
     `HomePageCtaCard.vue` would change.
   - Open questions for the product owner.
4. The lab page and its components, as described in Phase 4.

Start `research.md` with this line: "Nothing in production components was changed." Leave room for a
"Round two" section, because feedback will follow. Be concrete and visual, and argue from the
personas and from what you saw on the page, not from taste alone.

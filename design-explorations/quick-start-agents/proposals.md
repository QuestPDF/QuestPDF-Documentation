# Proposals: one panel for the code sample, the code-first reasons and the agent loop

Five concepts, each a different organising idea for the same material. Read `research.md` first for the tokens, the verified claims and the sample; `brainstorm.md` for the 18 concepts these were chosen from.

## Shared material (identical in all five)

**Sample.** `InvoiceDocument.cs`, the `ComposeTable` method from the In-Depth Invoice Tutorial, 26 lines (research.md §4). Static and edited code are the same file.

**Request.** "Show negative amounts in red." One prompt.

**Diff.** 3 changed lines, 1 removed and 2 added (net +1):

```diff
-            table.Cell().AlignRight().Text($"{item.Total:C}");
+            table.Cell().AlignRight().Text($"{item.Total:C}")
+                .FontColor(item.Total < 0 ? Colors.Red.Medium : Colors.Black);
```

**Visible change.** The invoice has one credit line ("Returned: USB-C cable, 2 m", −$24.00). After the change, that amount is red. Nothing else moves.

**Rendered output.** In the mockups the page is drawn in HTML so both states show without a build. In production: two real renders (`invoice-before.webp`, `invoice-after.webp`, light and dark variants like the Companion screenshots) cross-faded, or one render with the amount painted red by CSS on a transparent-background crop. Real renders are preferred because a developer may zoom.

**The four reasons, rewritten** (every sentence checkable; sources in research.md §3):

| Title | Description | Source |
|---|---|---|
| Dynamic content is just code | Loops, conditions and functions build the document. Completion, inspections and refactoring in your IDE work on it. | quick-start.md ("pure C#, strong typing, seamless IDE support") |
| Reviewable in version control | A document change is a diff. It goes through the same pull request and history as the rest of your code. | inherent to C# source files |
| Reusable components | Headers, tables and address blocks become classes you share across documents and projects. | invoice-tutorial.md, `IComponent` |
| Works with your coding agent | Plain C# files, a typed API the compiler checks, layout errors that name the element at fault, docs published as llms.txt. | quick-start.md; debug-pointer.md (`DocumentLayoutException` trace); `vitepress-plugin-llms`, questpdf.com/llms.txt |

Short variants (one line each) exist for layouts that need them (mockups/shared.js).

**Micro-labels.** `−1 +2` (counted from the diff), `1 file`, `Compiles` (the snippet is real API; compile it in the sample project before shipping), `Proposed by your agent`, `Reviewed by you`, `Rendered`, `Merged`, `proposed change` / `main` in the window header. No model names, no tool names, no timings except the demo length (`15 s`).

**Trust signals available to every concept.** Real code (Shiki-highlighted, same component as today), the rendered page, the diff, the install command, the `llms.txt` mention. Adoption numbers (stars, downloads, 800+ customers, years) stay in the hero; standards stay in the trust card. None of the concepts repeats them, so the panel stays about the loop.

**Shared playback engine** (JS, adapted from `HomePageAgentDemo.vue`; `useInView` from `lab/labAnimation.ts`):

| t | event |
|---|---|
| 0.0 s | panel ≥ 40 % in view; timer starts; nothing moves |
| 4.0 s | demo starts (or earlier on click of the trigger). Plays once per page load; `sessionStorage` flag prevents a replay on back-navigation |
| 4.0–5.0 | request text types in (28 ms/char, 31 chars) where the concept puts it |
| 5.6 | status "Proposed by your agent" appears; the removed line is marked red (300 ms fade) |
| 6.2–7.8 | the two added lines type in green (16 ms/char), in place |
| 8.2 | `Compiles` turns green |
| 9.4 | `Reviewed by you` turns green; removed line collapses, added lines turn from green to the blue `line-highlighted` (400 ms) |
| 9.8 | page cross-fades to the "after" render (400 ms), `Rendered` turns green |
| 10.5 | end state. A **Replay** button is visible in every concept from here on |

Reduced motion (`prefers-reduced-motion: reduce`): no autoplay. The trigger button steps through the same states with instant transitions (no typing, no fades), Scrub needs nothing special. Keyboard: the trigger and Replay are `<button>`s mirroring `a.action` (the router captures `<a>` clicks, see memory). An `aria-live="polite"` region announces the state changes in one sentence each ("Your agent proposed a change: 1 line removed, 2 added", "Reviewed, merged and rendered"). The IntersectionObserver pauses the timers off-screen, like today.

CSS-only: the diff line styles, the state switching (`data-state` on the panel root), the page cross-fade, the chips. JS: the timer, the typing, the state machine, the trigger, the reduced-motion branch, the Plausible events (`Agent demo: played / replayed / triggered`).

Height note: the code window reserves the height of its tallest state (28 lines) in every state, so nothing on the page moves when the demo runs. That reserve costs 39 px at rest and is the main reason four concepts land a few pixels over 900 (see each concept's budget). Dropping one blank line from the sample brings every concept under 900.

---

## 1. Pull Request

**Concept.** The request is handled as a pull request: a review card above the code carries the request as its title, the diff lands in the file, the checks go green, the page re-renders and the card settles as "Merged".

### Storyboard

| State | Time | Review card | Code | Page |
|---|---|---|---|---|
| Resting | first paint | quiet line "A request from the product owner, handled as a pull request." + **Play the request · 15 s** | plain, readable | before |
| Typing | 4.0–5.0 s | the request types in as the card title; chips `−1 +2`, `1 file` fade in | plain | before |
| Proposed | 5.6–8.2 s | checks: Proposed ✓, Compiles ✓, Reviewed ○, Rendered ○; window meta "proposed change" | diff (red + green) | before |
| Reviewed | 9.4 s | Reviewed ✓ | removed line collapses, new lines highlighted blue; meta "main" | before |
| Done | 10.5 s | **Merged** chip, all four checks ✓, **Replay** | highlighted | after (credit line red) |

### Wireframes

1440 px (panel 1376 wide, 48 padding; grid 8fr / 4fr, 40 gap):

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Documents as code, changes as pull requests              [INSTALL $ dotnet…] │
│ A C# file that renders to a PDF, lives in version control and changes by…    │
│                                                                              │
│ ┌ review card ─────────────────────────────────────┐  ┌ page 250 ────────┐   │
│ │ ⑂ A request from the product owner…  [▶ Play 15s]│  │ Invoice #5327    │   │
│ └──────────────────────────────────────────────────┘  │  …table…         │   │
│ ┌ InvoiceDocument.cs ──────────────────────────────┐  │  Returned −24.00 │   │
│ │ void ComposeTable(IContainer container)          │  └──────────────────┘   │
│ │ {                                                │     invoice.pdf          │
│ │   container.Table(table =>                       │  ───────────────────    │
│ │   … 26 lines, 13 px …                            │  </> Dynamic content…   │
│ │                                                  │  ⑂  Reviewable in VC    │
│ │                                                  │  ⬢  Reusable components │
│ └──────────────────────────────────────────────────┘  ▣  Works with agent    │
└──────────────────────────────────────────────────────────────────────────────┘
```

390 px: head → install chip → review card → code window (horizontal scroll) → page (full width) → caption → four reasons stacked. One column, same order.

### Reading paths

| Persona | first 5 s | 30 s | element that answers them |
|---|---|---|---|
| Developer | code window, install chip | reads all 26 lines undisturbed (demo waits 4 s, and the card does not cover the code); watches the diff land | the code; `Compiles` check |
| Tech lead | "changes as pull requests" title, review card | the diff is 3 lines; `Reviewed by you` is a required check before the page changes; `1 file` | review card checks |
| Eng. manager | the review card's small numbers | sees request → 3-line diff → merged in 10 s; no ROI claim, just the size of the change | `−1 +2`, `Merged` |
| Product owner | the rendered invoice | their sentence becomes the PR title; the credit line turns red only after review | the page + request title |

### Interaction

Trigger: viewport ≥ 40 % + 4 s, or the **Play the request** button. Replay button in the done state. The review card has a fixed min-height (80 px) so the code window never moves. Reduced motion: button steps through Resting → Proposed → Done instantly. Easing: `ease` 300–400 ms for fades, typing as in the shared engine.

### Copy

- Title: **Documents as code, changes as pull requests**
- Lead: A C# file that renders to a PDF, lives in version control and changes by small reviewed diffs.
- Card at rest: "A request from the product owner, handled as a pull request." Button: "Play the request · 15 s".
- Checks: Proposed by your agent · Compiles · Reviewed by you · Rendered. Chips: `−1 +2`, `1 file`, `Merged`.
- Reasons: the short variants (one line each), under the page.

### Trust signals

Real code and render side by side; the diff; the `Compiles` and `Reviewed by you` checks say out loud that a human gate exists; the install command; `llms.txt` in the agent reason.

### Cost argument

The card is the whole cost: one sentence in, three lines out, one reviewer, one file. The manager sees the size of the change, not a number. "Merged" closes the loop without saying how long it took.

### Risks and mitigations

- The PR metaphor is engineering-flavoured; the product owner may not know "merged". Mitigation: the request is in plain words as the title, and the page is the thing that changes.
- A card above the code pushes the code down 92 px. Mitigation: the card is also the place the reader learns what will happen, so it earns the space; still the tallest concept after Four Steps.
- Dark/light: the card uses `--home-surface-inner`, chips reuse the standards-badge style; green/red only in chips and the diff.

### Budget and effort

Measured panel height at 1440 (mockup): 893 px resting, 899 mid, 903 done. Under budget at rest; done state is +3 px. Effort: 3 days (component, engine adaptation, two renders, reduced-motion branch, analytics).

Mockup: `mockups/pull-request.html` (toolbar switches Resting / Mid-demo / Done and dark / light).

---

## 2. Four Steps

**Concept.** A four-step strip, Request → Change → Review → Document, sits above the code and the page; it explains the loop in words at rest and lights up step by step during the demo.

### Storyboard

| State | Time | Strip | Code | Page |
|---|---|---|---|---|
| Resting | first paint | 1 Request "Plain language, from anyone" / 2 Change "A small diff from your agent" / 3 Review "Reviewed by you" / 4 Document "Rendered again", each with a one-line description; grey top rules | plain; window header holds **Play the request · 15 s** | before |
| Request | 4–5 s | step 1 turns green, its description becomes the quoted request | plain | before |
| Change | 5.6–8.2 | step 2 blue with a spinner, text "Editing InvoiceDocument.cs: −1 +2 lines, compiles."; window meta "proposed change" | diff | before |
| Review | 9.4 | step 3 green, "Reviewed and merged by you." | highlighted | before |
| Done | 10.5 | step 4 green, "invoice.pdf rendered with the credit line in red."; **Replay** in the window header | highlighted | after |

### Wireframes

1440 px:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ From a request to an updated document in four steps      [INSTALL $ dotnet…] │
│                                                                              │
│ ──────────────   ──────────────   ──────────────   ──────────────            │
│ 1 REQUEST        2 CHANGE         3 REVIEW         4 DOCUMENT                │
│ Plain language…  A small diff…    Reviewed by you  Rendered again            │
│ one line         one line         one line         one line                  │
│                                                                              │
│ ┌ InvoiceDocument.cs ────────────────  [▶ Play 15s] ┐  ┌ page 320 ────────┐  │
│ │ 26 lines                                          │  │                  │  │
│ │                                                   │  │                  │  │
│ └───────────────────────────────────────────────────┘  └──────────────────┘  │
│                                                            invoice.pdf       │
└──────────────────────────────────────────────────────────────────────────────┘
```

390 px: head → install → steps stacked (1–4) → code → page. The strip becomes a vertical list with the same top rules.

### Reading paths

| Persona | first 5 s | 30 s | answer |
|---|---|---|---|
| Developer | code window (largest element) | code, then the strip tells them what will happen before it happens; nothing surprises them | code, step 2 "compiles" |
| Tech lead | step 3 "Reviewed by you" | the process is explicit: a human review step is built into the story | the strip |
| Eng. manager | the four words | the whole process in one glance; sees it run once in 10 s | strip + chips in step 2 |
| Product owner | step 1 "Plain language, from anyone" | their request appears in step 1, the page changes at step 4 | step 1 + page |

### Interaction

Same engine. Trigger in the code window header (no extra row). The strip changes colour only (top rule and label): green for done, brand blue for in progress; no movement. Reduced motion: steps switch instantly.

### Copy

- Title: **From a request to an updated document in four steps** (no lead; the strip is the lead)
- Steps: Request / Plain language, from anyone / "A product owner asks for a change the way they always have." · Change / A small diff from your agent / "Documents are code, so the change is a few typed lines the compiler checks." · Review / Reviewed by you / "The diff goes through the same pull request and history as the rest of the project." · Document / Rendered again / "The PDF is generated by your build; the Companion App shows it as you save."
- The four reasons are folded into the step descriptions (code = typed lines; version control = step 3; the Companion App = step 4). **Lost:** "Reusable components" and the IDE-support sentence. This is the trade-off of the concept; the trust card below could pick up components.

### Trust signals

Code + render; the diff; step 4 names the Companion App's hot reload (verified, companion/features.md); step 2 says "compiles".

### Cost argument

The strip is the argument: four short steps, two of which are the human's. The reader counts the steps; nobody quotes hours.

### Risks

- Tallest concept; the strip and the code both want to be first. Mitigation: the strip is three lines tall and uses the same uppercase label style as the trust card.
- Two of the four reasons are gone. If the product owner of the site wants all four verbatim, this concept needs a fifth row and goes to ~990 px.
- The strip is pure text at rest; some readers skip it, which is fine because the code and page still work alone.

### Budget and effort

Measured: 917 px resting, 918 mid/done. Over by 17 px; dropping one blank code line (−20) fixes it. Effort: 2.5 days.

Mockup: `mockups/four-steps.html`.

---

## 3. Scrub

**Concept.** Nothing autoplays. A slider under the code and page has five positions, Code · Request · Change · Review · Document; every position is a still, and the reader drags through the loop at their own pace.

### Storyboard

| Position | Caption (right of the slider) | Code | Page |
|---|---|---|---|
| 0 Code (resting) | "The table from the invoice tutorial: three columns, a header and a loop over the items. Drag the slider, or press →, to follow one request." | plain | before |
| 1 Request | "The product owner writes: **"Show negative amounts in red."** No ticket for a designer, no template editor." | plain | before |
| 2 Change | "Your agent proposes −1 +2 lines in InvoiceDocument.cs. The API is typed, so the compiler checks the proposal before anyone reads it." | diff | before |
| 3 Review | "You read three lines in a pull request and approve. That is the whole review." | diff | before |
| 4 Document | "invoice.pdf is rendered again: the credit line is red. One request, three lines, reviewed by you." | highlighted | after |

There is no timeline; the "demo" is five frames. A small **Play** button can be added to step the slider every 2.5 s, but the concept works without it.

### Wireframes

1440 px (grid 240 / 1fr / 300):

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Documents as code, changes as diffs                      [INSTALL $ dotnet…] │
│ A C# file that renders to a PDF, lives in version control and changes by…    │
│                                                                              │
│ </> Dynamic…     ┌ InvoiceDocument.cs ───────────────┐   ┌ page 300 ──────┐  │
│     two lines    │                                   │   │                │  │
│ ⑂ Reviewable…    │ 26 lines                          │   │                │  │
│ ⬢ Reusable…      │                                   │   │                │  │
│ ▣ Works with…    │                                   │   └────────────────┘  │
│                  └───────────────────────────────────┘      invoice.pdf      │
│ ┌ scrubber ────────────────────────────────────────────────────────────────┐ │
│ │ ●────○────○────○────○            Code. The table from the invoice…      │ │
│ │ CODE REQUEST CHANGE REVIEW DOCUMENT                                      │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

390 px: head → install → reasons (stacked) → code → page → scrubber (only the current label shown under the thumb, caption below).

### Reading paths

| Persona | 5 s | 30 s | answer |
|---|---|---|---|
| Developer | code; the four reasons beside it | reads everything static; discovers the slider, drags to Change, inspects the diff for as long as they like | code + caption at Change |
| Tech lead | reasons column ("Reviewable in version control") | drags to Review: "You read three lines… That is the whole review." | caption at Review |
| Eng. manager | the five labels | the loop in five words; drags end to end in two seconds | the labels |
| Product owner | the page | drags to Request (their sentence) then Document (red line) | captions 1 and 4 |

### Interaction

`<input type="range" min=0 max=4>` styled with the brand thumb; keyboard arrows and Home/End work natively; `aria-valuetext` carries the step name. The caption is `aria-live="polite"`. Transitions between stills: 200 ms opacity for the page, none for the code. Reduced motion: identical. No JS timers at all unless the optional Play button is added.

### Copy

- Title: **Documents as code, changes as diffs**
- Lead: A C# file that renders to a PDF, lives in version control and changes by small reviewed diffs.
- Reasons: full four, vertical, left column. Captions as in the storyboard.

### Trust signals

Code + render + diff; the reasons column holds the `llms.txt` and layout-error facts; the caption at Change states what the compiler does (true of any typed C#).

### Cost argument

Position 3's caption says it in one sentence: three lines, one reviewer. Position 4 counts: one request, three lines. The reader did the "work" of dragging, which makes the brevity felt.

### Risks

- Discoverability: a slider under a code block can be missed. Mitigation: the caption at position 0 tells the reader to drag; the thumb is brand blue; optional auto-step after 4 s in view for readers who never touch it (that would reintroduce a timer, keep it off by default).
- Sliders are awkward on touch; mitigation: tick positions snap (step=1) and the labels are tap targets that set the value.
- Excitement is the lowest of the five: nothing moves unless asked.

### Budget and effort

Measured: 915 px in every position. Over by 15 px (the scrubber box is 70 px). Effort: 2 days.

Mockup: `mockups/scrub.html` (the slider is live).

---

## 4. Margin Notes

**Concept.** A static, annotated layout: the code on the left, a notes gutter with the four reasons pinned to the lines they describe, the page on the right with a single **Run a request** button under it. The demo is opt-in and plays in the note pinned to the Total line.

### Storyboard

| State | Notes gutter | Code | Page / button |
|---|---|---|---|
| Resting | "Reviewable in version control" pinned to the file tab; "Reusable components" to `container.Table(`; "Dynamic content is just code" to `foreach`; "Works with your coding agent" to the Total line | plain | before; **Run a request · 15 s** + one-line hint |
| Typing → Proposed (4–8 s) | the three other notes dim to 40 %; the Total-line note becomes the live note: label REQUEST, the quoted request, "Your agent proposes −1 +2 lines", "Compiles" ✓, "Waiting for your review" ○ | diff | before; hint "The page updates after your review." |
| Reviewed → Done (9.4–10.5 s) | label MERGED, "−1 +2 lines, compiles" ✓, "Reviewed by you" ✓, "invoice.pdf rendered again" ✓ | highlighted | after; **Replay** |

### Wireframes

1440 px (grid 1fr / 300 / 260):

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ Read the document in C#                                  [INSTALL $ dotnet…] │
│ The table from the invoice tutorial and the page it renders. Documents are…  │
│                                                                              │
│ ┌ InvoiceDocument.cs ──────────────┐ ─┤ Reviewable in version control    ┌ page 260 ┐
│ │ void ComposeTable(…)             │  │ A document change is a diff…     │          │
│ │ {                                │  │                                  │          │
│ │   container.Table(table =>       │ ─┤ Reusable components              │          │
│ │   …                              │  │ A method or an IComponent class… └──────────┘
│ │                                  │  │                                    invoice.pdf
│ │   foreach (var item in …)        │ ─┤ Dynamic content is just code     [▶ Run a request 15s]
│ │   …                              │  │ Loops, conditions and functions…  one-line hint
│ │   table.Cell()…Text($"{…:C}");   │ ─┤ Works with your coding agent
│ │ }                                │  │ A typed API the compiler checks…
│ └──────────────────────────────────┘
└──────────────────────────────────────────────────────────────────────────────┘
```

390 px: head → install → code → notes as a plain stacked list (leader lines dropped) → page → button. The live note keeps its place in the list.

### Reading paths

| Persona | 5 s | 30 s | answer |
|---|---|---|---|
| Developer | code, uninterrupted; notes are quiet | reads code and the note beside each line; decides whether to press Run | code + notes |
| Tech lead | "Reviewable in version control" at the top of the gutter | notes map claims to lines (components = a method, review = the file); presses Run, sees "Waiting for your review" | notes |
| Eng. manager | the page and the button | presses Run; the live note counts the change and the gates in three lines | live note |
| Product owner | the page | reads the hint under the button ("One request from a product owner…"); presses Run; sees the amount turn red | button hint + page |

### Interaction

Explicit trigger only; no viewport timer. Everything else as the shared engine. Note dimming 300 ms. Notes are absolutely positioned at `41 + 8 + line × 19.5 px`; the diff adds lines below the pinned line, so no note moves. Reduced motion: Run steps instantly through the three states.

### Copy

- Title: **Read the document in C#**
- Lead: The table from the invoice tutorial and the page it renders. Documents are code, so everything you know about software applies.
- Notes: the four reasons, with the version-control one pinned to the file tab and the agent one pinned to the line the agent will edit. Hint: "One request from a product owner, handled by your agent and reviewed by you."

### Trust signals

The strongest static trust of the five: every claim is pinned to the line that proves it. The live note's three checks; `llms.txt` and layout errors in the agent note.

### Cost argument

Only on demand: the live note's "−1 +2 lines" and "Reviewed by you". Managers who never press Run get the reasons but not the loop. That is the concept's honest limitation.

### Risks

- The loop is hidden behind a click; some visitors never see the agent story. Mitigation: a 4-second autoplay could be enabled later with one flag; the hint line sells the click.
- Pinned notes need code line positions to be stable across font stacks (system mono differs per OS). Mitigation: pin by measuring the line's `offsetTop` at mount, not by constants.
- Below 1100 px the notes lose their leader lines and become a list, which is fine but less special.

### Budget and effort

Measured: 833 px in every state. Comfortably under budget. Effort: 2.5 days (the measuring of line offsets is the extra).

Mockup: `mockups/margin-notes.html`.

---

## 5. Document First

**Concept.** The rendered page is the subject: large, with the request bar directly above it. The code sits beside it as the evidence that the change was small; the four reasons run under both in a compact strip.

### Storyboard

| State | Request bar | Page (340 px) | Code |
|---|---|---|---|
| Resting | 👤 "Show negative amounts in red." + **Play · 15 s** (primary) | before | plain |
| Start (4 s) | no typing: the request is already visible at rest (it is the product owner's daily sentence), so the bar simply switches state when the demo starts | before | plain |
| Proposed (5.6–8.2) | ⟳ "Agent editing InvoiceDocument.cs" · `−1 +2` · "review next"; window meta "proposed change" | before | diff |
| Reviewed (9.4) | ✓ "Reviewed by you, rendered again" · `−1 +2` · **Replay**; meta "main" | cross-fade to after | highlighted |

### Wireframes

1440 px (grid 5fr / 7fr):

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ The document is code. Ask for a change and watch it land.  [INSTALL $ …]     │
│ A request becomes a small diff. You review it, and the PDF follows.          │
│                                                                              │
│ ┌ 👤 "Show negative amounts in red."   [▶ Play 15s] ┐ ┌ InvoiceDocument.cs ──┐ │
│ └───────────────────────────────────────────────────┘ │                      │ │
│        ┌ page 340 ─────────────────┐                  │ 26 lines             │ │
│        │ Invoice #5327             │                  │                      │ │
│        │ …                         │                  │                      │ │
│        │ Returned: USB-C  −$24.00  │                  │                      │ │
│        └───────────────────────────┘                  └──────────────────────┘ │
│                 invoice.pdf                                                    │
│ ─────────────────────────────────────────────────────────────────────────────  │
│ </> Dynamic content…  ⑂ Reviewable…  ⬢ Reusable…  ▣ Works with your agent      │
└──────────────────────────────────────────────────────────────────────────────┘
```

390 px: head → install → request bar (wraps to two rows) → page (340, fits in 342) → caption → code → reasons stacked.

### Reading paths

| Persona | 5 s | 30 s | answer |
|---|---|---|---|
| Developer | the code (right, large enough) | code first, then the request bar; the page is a real render they can zoom | code + diff |
| Tech lead | title "The document is code" | "review next" and "Reviewed by you" in the bar; small diff beside the page | request bar states |
| Eng. manager | the page + the request sentence | sees the request become a document change with the diff visible; `−1 +2` | bar chips |
| Product owner | the page, the request in their words | the strongest of the five: their sentence, their document, the red line | page |

### Interaction

Shared engine; the primary-coloured Play button is the only primary button in the panel (it is the product owner's button). The bar keeps a fixed 56 px height in all states (text is `nowrap` with ellipsis on desktop, wraps on phones). Reduced motion: stepped.

### Copy

- Title: **The document is code. Ask for a change and watch it land.**
- Lead: A request becomes a small diff. You review it, and the PDF follows.
- Bar states: "Show negative amounts in red." / "Agent editing InvoiceDocument.cs" · `−1 +2` · "review next" / "Reviewed by you, rendered again" · `−1 +2` · Replay.
- Reasons: short variants in a four-column strip.

### Trust signals

The render is the largest element, which is the Resend/Tailwind pattern from research.md §6; the diff beside it; "review next" makes the human gate visible before the page changes.

### Cost argument

The request sentence is the product owner's literal daily request (brief), shown at rest, so even without playing the demo the reader connects "my sentence" to "a 3-line change". The bar's `−1 +2` is the only number.

### Risks

- Developers may feel the code is secondary. Mitigation: the code column is wider (7fr) than the page column; the code is still 13 px and complete.
- A large white page on the dark canvas is bright. Mitigation: `opacity: 0.85` as the quick-start image does today; the mockup shows it works.
- The request is visible at rest, so a reader may think the demo has already run. Mitigation: the Play button is primary and labelled with its length.

### Budget and effort

Measured: 908 px in every state. Over by 8 px. Effort: 3 days (two real renders are essential here; the page must look perfect at 340 px).

Mockup: `mockups/document-first.html`.

---

## Comparison

Scores 1–5. "Excitement" is the chance a reader tells a colleague about it; "Professionalism" is the chance a skeptical enterprise reader trusts it.

| Criterion | 1 Pull Request | 2 Four Steps | 3 Scrub | 4 Margin Notes | 5 Document First |
|---|---|---|---|---|---|
| Serves all four personas | 5 | 5 | 4 | 3 (loop is opt-in) | 5 |
| Honesty | 5 | 5 | 5 | 5 | 5 |
| Static code readability | 5 | 5 | 5 | 5 | 4 |
| Visual calm | 4 | 4 | 5 | 5 | 4 |
| Implementation effort (5 = least) | 3 | 4 | 4 | 3 | 3 |
| Mobile viability | 4 | 4 | 3 | 4 | 4 |
| Excitement | 4 | 3 | 2 | 3 | 5 |
| Professionalism | 5 | 4 | 5 | 5 | 4 |
| Height at 1440 (rest, measured) | 893 | 917 | 915 | 833 | 908 |
| All four reasons kept | yes (short) | no (two folded away) | yes (full) | yes (full) | yes (short) |
| Total (8 scored rows) | **35** | 34 | 33 | 33 | **34** |

Observations:

- Pull Request and Document First serve the personas best and differ mainly in who the layout is for: the PR card speaks to the lead and manager, the large page to the product owner.
- Margin Notes is the calmest and the shortest, and has the best static trust, but hides the loop behind a click, which fails the brief's third priority for visitors who do not click.
- Scrub is the most honest about motion but the least likely to be noticed.
- Four Steps explains the most and shows the least; it also drops two reasons.

## Recommendation

**Build the hybrid of 1 and 4: Margin Notes at rest, Pull Request when it plays.**

- Resting state from Margin Notes: code left, the four reasons pinned to their lines in a gutter, the page right. This is the best static layout for the developer and the tech lead, and it is the shortest (833 px).
- Demo from Pull Request, but without the card above the code: the live note in the gutter *is* the review card (request as title, `−1 +2`, `1 file`, the four checks, then "Merged"), exactly as the Margin Notes mockup already shows. No extra row, so the height stays at 833 px.
- Trigger from the brief's first option: 4 s after the panel enters the viewport, plus the explicit **Run a request** button under the page for readers who scroll fast, and **Replay** afterwards. This is the one thing taken from Pull Request's behaviour that Margin Notes alone lacks; it makes the loop visible to the manager and product owner without a click.
- Title and lead from Pull Request ("Documents as code, changes as pull requests") so the version-control argument is in the heading, where the tech lead reads first.

Why not Document First, the most exciting one: it is the only concept where the developer's first read is not the code, and the brief lists the code as priority one. Its request bar is still worth borrowing later for a dedicated "for product teams" section.

The hybrid needs no new component beyond what the two mockups show; estimate 3 days including real before/after renders and the line-offset measuring.

## Open questions for the product owner

1. **Autoplay or click?** The hybrid autoplays once after 4 s. If analytics show the quick-start panel is read for less than 4 s on average, the demo never plays for most visitors and the explicit button becomes the primary path. Which do you prefer to launch with?
2. **Must all four reasons stay verbatim?** Four Steps folds two away; the other four keep them in short or full form. If the current titles are sacrosanct, Four Steps is out.
3. **Can the sample be compiled and rendered in the examples project before launch?** The copy says "Compiles"; the renders should be real. Who owns `InvoiceDocument.cs` and the two renders?
4. **Is "pull request" the right word for your audience?** GitHub-centric teams know it; some .NET shops say "merge request" or just "review". The checks could read "Reviewed by you" without the PR framing.
5. **Should the trust card's "Develop with AI agents" title disappear entirely?** This panel absorbs it. The trust row then has two cards (standards, foundations) and needs a different layout, which is outside this task.
6. **Any agent surface coming (MCP server, skills, an AGENTS.md in the examples repo)?** If yes, the agent reason gains a verifiable fourth item and the panel could link to a docs page; today only `llms.txt` exists.
7. **Is a 15-second demo length acceptable, or should the typing be faster?** Current demo rounds are ~10 s each; the proposals keep typing speeds and add the 4 s delay.

---

## Round two (2026-10-13, after feedback)

Feedback on round one: Pull Request and Margin Notes liked most, Document First interesting; ask for more concepts that integrate the code, argue for code-first with confidence, and fold the agent loop and its animation in naturally.

What the three liked concepts share: the loop happens inside an artefact developers already trust (a pull request, a code margin, the document), never in a chat box. Round two pushes that further. All five are implemented on the lab page (`docs/agents-lab.md`, sections 6 to 10) with the same sample, request and diff as round one.

| # | Concept | Organising idea | Where the request lives | What makes the code-first argument |
|---|---|---|---|---|
| 6 | **Suggestion** | a review thread inside the code window, GitHub style | a comment under the Total line, collapsed to "1 comment from the product owner" at rest | the agent answers with a *suggested change* block; "Apply suggestion" is the human's click; the file is untouched until then |
| 7 | **Page Callouts** | the document explains itself | a callout bubble on the credit line of the invoice | numbered markers map page regions to code; hovering the legend highlights the region and its lines, so the reader sees that every part of the page is a few lines |
| 8 | **Blame Gutter** | authorship, like git blame | a request bar under the window header | the gutter says "you · 3 weeks ago" on every block; after the demo two lines say "agent · now, reviewed by you": two of twenty-seven, both reviewed |
| 9 | **Spec to Page** | the product owner's checklist | a new sentence on the list | each sentence highlights the lines that implement it; the request becomes a sentence with a check mark |
| 10 | **Notes + Pull Request** | the round-one hybrid, built | the live note in the gutter | Margin Notes at rest; the note becomes the review card (Merged, 1 file, four checks); autoplay after 4 s plus Play and Replay |

Ideas considered and not built: a Companion-App hot-reload frame (true, but duplicates the Companion panel below); a request inbox with three queued requests (implies cost without evidence and breaks the one-prompt rule); a before/after page stack (a Document First variant, not a new idea); a command-palette "ask" bar over the code (reads as AI chrome).

Observations after building:

- 6 Suggestion is the most native to developers and the clearest human gate ("Apply suggestion" is yours), at the price of pushing three code lines down while the thread is open.
- 7 Page Callouts is the only concept where the product owner and the developer look at the same spot: the callout is on the number they care about, the highlight is on the line that draws it.
- 8 Blame Gutter makes the cost argument with no numbers at all; the gutter is the evidence. It costs 190 px of code width.
- 9 Spec to Page is the quietest way to say "requirements are lines of code" and gives the manager a checklist to read.
- 10 is the safe choice; 6 and 7 are the candidates for a stronger one.

# Brainstorm: one panel for code, code-first reasons and the agent loop

Scoring: 1 (poor) to 5 (strong) on six criteria. **P** serves all four personas · **H** honesty (no unverifiable claims needed) · **R** readability of the static code · **C** visual calm · **E** implementation effort (5 = cheapest) · **M** mobile viability. Total out of 30.

Shared fixed material (see research.md §4): the `ComposeTable` invoice sample, the request "Show negative amounts in red.", a 4-line diff, and the invoice page with one credit line that turns red.

| # | Concept | Description | P | H | R | C | E | M | Σ |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Pull Request** | The code window and the invoice page sit side by side. After a delay a review card appears above the code with the request as its title; the diff lands in the code, a "Reviewed by you" state follows, the page updates, and the card settles into a small "merged" line. The metaphor every tech lead already trusts. | 5 | 5 | 5 | 4 | 3 | 4 | 26 |
| 2 | **Four Steps** | A four-step strip (Request → Change → Review → Document) sits above the code and page. The strip is static copy at rest; during the demo each step lights in turn while the code and page below do the work. The narrative is explicit, so no one has to infer the loop. | 5 | 5 | 5 | 4 | 4 | 4 | 27 |
| 3 | **Scrub** | No autoplay. A slider under the code and page lets the reader drag through five states (code → request → diff → review → page). Each position is a still; the reader controls the pace. Reduced motion is the default behaviour. | 4 | 5 | 5 | 5 | 3 | 3 | 25 |
| 4 | **Margin Notes** | A fully static layout: the code with four short notes pinned to specific lines (`foreach` → dynamic content is code; `ComposeTable` → reusable; the file tab → version control; `.Text(...)` → typed API). One "Run a request" button in the page column plays the loop once. The calmest option; the demo is opt-in. | 4 | 5 | 5 | 5 | 4 | 4 | 27 |
| 5 | **Document First** | The invoice page is the biggest thing in the panel, with a request bar directly above it ("Show negative amounts in red."). The code sits beside it, narrower. The demo changes the page the reader is looking at; the diff is the evidence next to it. Built for the product owner without hiding the code. | 5 | 5 | 4 | 4 | 3 | 4 | 25 |
| 6 | Chat transcript | Today's composer, status line and diff, with the rendered page added on the right. Familiar, but the chat frame invites a fake model name and reads like every other AI demo. | 3 | 3 | 4 | 3 | 5 | 3 | 21 |
| 7 | Persona tabs | Tabs "I write it / I review it / I ask for it" switch which callouts surround the same code and page. Serves the personas by name, but asks the reader to self-identify before seeing the point, and tabs hide content. | 4 | 4 | 4 | 3 | 3 | 3 | 21 |
| 8 | Before / after cost story | Left: "a document tweak today" (ticket, designer, sprint). Right: the loop. Makes the cost argument loudest, but the "before" column is an invented process the reader may not recognise, and it needs a paragraph. | 4 | 2 | 3 | 3 | 4 | 3 | 19 |
| 9 | Change log | A git-log style list of three merged requests with line counts; clicking one shows its diff and page. Shows the pattern (every request is small), but two of the three diffs would exist only as counts, which is a metric without a source. | 4 | 3 | 4 | 4 | 2 | 3 | 20 |
| 10 | Interactive playground | Editable code with a preview that swaps between pre-rendered variants. Fakes compilation; a developer who types anything else sees it is a trick. | 3 | 1 | 4 | 3 | 1 | 1 | 13 |
| 11 | Linked hover | Static code and page; hovering a code line highlights the matching region on the page and vice versa (the Companion App's hierarchy idea, inverted). Excellent for "the code is the document", silent on agents. | 3 | 5 | 5 | 5 | 3 | 2 | 23 |
| 12 | Terminal session | The loop as a terminal transcript (`$ agent "Show negative amounts in red"`, unified diff, `✓ compiled`). Developers like it; the product owner reads none of it. | 2 | 4 | 4 | 4 | 4 | 3 | 21 |
| 13 | Commit card | No typing at all: after the delay a commit card slides in ("Show negative amounts in red · 1 file · +3 −1 · reviewed by you"), the diff fades in, the page updates. Minimal motion, maximal signal. A sub-variant of 1. | 4 | 5 | 5 | 5 | 4 | 4 | 27 |
| 14 | Flip card | The page flips to reveal the diff on its back. Gimmick; hides one of the two things that must stay visible. | 2 | 4 | 3 | 2 | 3 | 3 | 17 |
| 15 | Sticky note | The request as a note stuck to the page; it "moves" into the code as a diff. Cute once; patronising to engineers. | 3 | 4 | 4 | 2 | 3 | 3 | 19 |
| 16 | Screen recording | A 20-second click-to-play video of a real IDE, agent and Companion App. Perfectly honest but unreadable text, no theme support, heavy, and hard to keep current. | 3 | 5 | 2 | 3 | 2 | 2 | 17 |
| 17 | Figure with callouts | A documentation-style figure: numbered markers 1–4 on the layout with a caption list under it (Warp "fig." style). Entirely static; the loop is described, not shown. | 3 | 5 | 5 | 5 | 5 | 4 | 27 |
| 18 | Filmstrip | Five thumbnails of the page states in a row; the active one is enlarged. Clear timeline, but the diff gets small and the row is wide. | 3 | 4 | 3 | 4 | 3 | 2 | 19 |

## Selection

Highest totals cluster at 25–27; the choice is about range rather than score. The five picked are built on different organising ideas:

| Pick | Organising idea | What it is best at |
|---|---|---|
| **1. Pull Request** | a review | tech lead and manager: the change is small, reviewed, merged |
| **2. Four Steps** | a process strip | explicit narrative; nobody has to infer the loop |
| **3. Scrub** | reader-controlled time | calm, honest, no autoplay; developers who hate motion |
| **4. Margin Notes** | annotated static code | developer reads first; the agent demo is opt-in |
| **5. Document First** | the document as the subject | product owner; the page changes in front of them |

Not picked but kept for the hybrid: **13 Commit card** (a lower-motion ending for 1) and **11 Linked hover** (a way to tie code to page in any static state). **17 Figure with callouts** scored well but shows nothing moving, which the brief asks for.

Dropped and why: 6 looks like every AI demo; 7 hides content behind self-identification; 8 and 9 need numbers or processes we cannot source; 10 is dishonest; 12 excludes the product owner; 14, 15, 18 are gimmicks; 16 is unreadable and unthemeable.

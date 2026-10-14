# Research: merging the quick-start panel and the "Develop with AI agents" panel

Date: 2026-10-13. Branch: `theme-redesign-experiment`. Nothing in production components was changed.

## 1. What the two panels are today

### Quick-start panel (`docs/.vitepress/theme/homepage/HomePageQuickStart.vue`)

- `.panel.quick-start-panel`: a 4fr / 8fr grid, 56px column gap, 56px padding (overrides the 48px homepage panel padding). Stacks below 1280px, document drops under the code below 1000px.
- Left ("pitch"): `HomePageInstallCommand` (copy-to-clipboard chip, `dotnet add package QuestPDF`), a 1px hairline, then four `.point` rows (44px icon tile + `row-title` + `row-description`):
  1. Dynamic Content Is Just Code
  2. Version Control Friendly
  3. Reusable Components
  4. Ready for AI ("A semantic Fluent API helps AI assistants generate layouts, refactor components, and troubleshoot issues effectively.") with icon `fa-sparkles`.
- Right ("stage"): `HomePageCodeContainer` with `codeExamples/quickStart.cs` (currently a *stock list* sample, 36 lines) and an absolutely positioned `figure.document` overlapping the window's bottom-right corner: `/minimal-api.png` at 260px wide, caption `hello.pdf`, three-layer drop shadow, 0.85 opacity in dark mode. Note: the image shows the "Hello PDF" page, not the stock list; the sample and the render are already out of sync on this branch.
- No section header (commented out). No animation.

### "Develop with AI agents" panel (`HomePageTrust.vue` + `HomePageAgentDemo.vue`)

- Lives in the right column of `HomePageTrust.vue` as `.panel.agents` with a purple corner glow (`--accent: #7E57C2`, `#9575CD` dark), `card-title` "Develop with AI agents" and a `card-description`.
- `HomePageAgentDemo.vue`: a **looped** simulation on `InvoiceTable.cs` (5 initial lines). Three rounds: "Right-align the prices and format them as currency." / "Show negative amounts in red." / "Add a quantity column between the name and the price." Each round: prompt types into a composer (28ms/char), status line ("Reading the documentation at llms.txt", "Editing InvoiceTable.cs", "Checking the rendered page"), removed line marked red, added lines typed green (16ms/char), "Done: 1 line removed, 3 lines added", round counter `1 / 3`. Starts 900ms after entering the viewport (threshold 0.4), loops forever, pauses off-screen. Under `prefers-reduced-motion` the finished session is shown still.
- Uses a sparkle icon in the composer and a purple AI accent. There is **no rendered preview** in this panel, so the product owner never sees the document change.
- Diff rendering: a Shiki `ShikiTransformer` adds `line-removed` / `line-added` classes; the CSS for those lives in `HomePageHighlightedCode.vue` (`#F4433622` red, `#4CAF5022` green, 3px left border).

### Problems the merge should fix

- Two panels tell overlapping stories ("just code" and "agents edit code") with two different code samples and no shared render.
- The agent demo autoplays almost immediately, loops forever and starts before the reader has read the code (brief constraint: at least 4s delay or explicit trigger, play once, replay control).
- The sparkle icon and purple accent read as an "AI-powered" badge (brief: none).
- Status copy such as "Checking the rendered page" implies an integration (agent reads the Companion preview) that the docs do not describe.

## 2. Design tokens, typography, surfaces, animation utilities: what can be reused

Sources: `docs/.vitepress/theme/CustomPages.css`, `VitepressAdjustments.css`, `homepage/HomePage.vue`, `node_modules/vitepress/dist/client/theme-default/styles/vars.css`.

| Token / class | Value | Use |
|---|---|---|
| `--custom-page-width` | 90rem on the homepage (`wide-layout`); content has 32px side padding | panel outer width at 1440px = 1376px, inner = 1280px |
| `--custom-page-bg` | `#FAFAFC` light, `var(--vp-c-bg)` dark | canvas |
| `--vp-c-bg` / `--vp-c-bg-alt` | `#ffffff` / `#f6f6f8` light; `#101010` / `#161618` dark | code window body / window header |
| `--vp-c-text-1/2/3` | `#3c3c43` / `#67676c` / `#929295` light; `#dfdfd6` / `#98989f` / `#6a6a71` dark | text levels |
| `--vp-c-divider` | `#e2e2e3` light, `#2e2e32` dark | hairlines, window borders |
| `--vp-c-brand-1/2/3` | `#0277BD` / `#039BE5` / `#29B6F6` light; `#4FC3F7` / `#03A9F4` / `#0288D1` dark | links, focus rings, section tag |
| `--home-surface` | `#FFFFFF` light, `rgba(255,255,255,0.045)` dark | `.panel` / `.card` background on textured pages |
| `--home-surface-inner` | `#F0F2F6` light, `rgba(0,0,0,0.4)` dark | chips, icon tiles, install chip, composer |
| `--home-surface-edge`, `--home-surface-rim`, `--home-surface-sheen` | hairline ring + soft shadow (light), faint glass rim/sheen (both) | automatically applied to `.panel` |
| `--elevation`, `--elevation-hover` | layered shadows | hover lift on `a.action` |
| `--vp-font-family-base` | `-apple-system, BlinkMacSystemFont, sans-serif, …` (system stack, no webfont) | all text |
| `--vp-font-family-mono` | `ui-monospace, Menlo, Monaco, Consolas, …` | code, install command |
| `.panel` | `--home-surface`, radius 32px, padding 48px on the homepage (32px 24px below 700px) | the merged panel container |
| `.card-title` / `.card-description` | 1.5rem/2rem 700 / 1.125rem/1.75rem text-2 (1rem below 768px) | panel heading + lead |
| `.row-title` / `.row-description` | 1.125rem/1.5rem 600 / 0.9375rem (1rem on the homepage) | the four bullets |
| `.section-tag` | brand-tinted uppercase pill | optional label above a heading |
| `.chip` (HomePage.vue) | 12px radius, `--home-surface-inner`, 0.9375rem 500 | small labelled items |
| `.standards-badges > span`, `.fact-label` (HomePageTrust.vue) | 0.8125rem chips; 0.75rem uppercase 0.06em labels | micro-labels ("4 lines changed") |
| `a.action`, `a.action.primary` | 12px radius, 12px 24px padding; primary `#2196F3` | the replay / play control (must be a `<button>` mirroring these styles, see below) |
| `HomePageWindowContainer` | 16px radius window with three dots and a file name, `--vp-c-bg-alt` header | code window and document window |
| `HomePageCodeContainer` + `HomePageHighlightedCode` | Shiki `light-plus` / `dark-plus`, 14px/1.5 (12px below 700px), `line-highlighted` / `line-removed` / `line-added` classes | code and diff |
| `HomePageInstallCommand` | full and `compact` variants | install line |
| Icons | Font Awesome kit (`fa-regular`, `fa-solid`), `.custom-page .fa-solid` is brand blue | step/bullet icons |
| `lab/labAnimation.ts` | `useInView(target, threshold)` (IntersectionObserver + reduced-motion), `useLoop`, `sleep` | viewport trigger and reduced motion; lab-only today, can be promoted |
| `HomePageAgentDemo.vue` | async "engine": `pause()` waits while hidden, typed prompt, typed added lines, diff transformer | the playback engine, minus the loop |
| `HomePageCodeAnimation.vue` | click-to-play pattern ("Watch Live Demo", `~90 sec` label), IntersectionObserver pause, Plausible events | explicit-trigger pattern and analytics hook |
| `trackPlausibleEvent` (`plausibleEvents.ts`) | analytics | "Demo played / replayed" events |

Theme handling: `html.dark` class on the root; Shiki dual themes via `--shiki-dark` variables; images for white pages use `opacity: 0.85` in dark mode. Section seams are dotted lines drawn by `HomePage.vue`; sections are 48px apart.

Constraints found in memory and code worth respecting:

- `// comments` in non-SCSS Vue style blocks break `docs:build`; only `/* */`.
- The VitePress router captures `<a>` clicks; JS-only controls (play, replay, scrub) must be `<button>`s that mirror `a.action` styles.
- Surface effects must stay faint (rim/sheen were halved after a first pass).
- Memory "Design: evolution, not revolution": keep copy, order and components where possible; flag reorders.

## 3. What QuestPDF verifiably offers to AI agents (only these may appear in copy)

| Claim | Evidence | Source |
|---|---|---|
| Documentation is published for LLMs as `llms.txt` and `llms-full.txt` | `vitepress-plugin-llms` ^1.13.5 in `package.json`, registered in `docs/.vitepress/config.ts`; `docs/.vitepress/dist/llms.txt` and `llms-full.txt` exist; `https://www.questpdf.com/llms.txt` is live and lists every docs page | `package.json`, `config.ts:26`, live fetch 2026-10-13 |
| The API is a strongly typed C# Fluent API; generated code is checked by the compiler and IDE | `docs/quick-start.md` ("pure C#, strong typing, seamless IDE support"); every sample in the docs | `docs/quick-start.md` |
| Layout errors are descriptive: `DocumentLayoutException` prints the element path, the method and source line, the "wrap reason" and a per-element measurement dump; `DebugPointer("…")` adds named markers to that trace | `docs/api-reference/debug-pointer.md` (full example trace), `tip-layout-constraints.md`, `row.md`, `show-entire.md` | `docs/api-reference/debug-pointer.md` |
| Companion App: hot reload, document hierarchy with jump-to-code, runtime exception view with stack trace and source, layout issue debugging with colour-coded elements and wrap reasons | `docs/companion/features.md`, homepage capabilities list in `HomePageCompanion.vue` | `docs/companion/features.md` |
| Documents are plain C# files, so they live in version control and go through pull requests like any code | inherent; the current bullet "Version Control Friendly" | `HomePageQuickStart.vue` |
| Reusable components: `IComponent`, helper methods, three-layer architecture | `docs/invoice-tutorial.md` ("Address component", "Suggested architecture") | `docs/invoice-tutorial.md` |
| "Ready for AI" wording already used by the project | NuGet/GitHub README section "Ready for AI": "QuestPDF's semantic Fluent API helps AI assistants generate layouts, refactor components, explain document structure, and troubleshoot issues more effectively." | `github.com/QuestPDF/QuestPDF` README (fetched 2026-10-13) |
| Adoption: GitHub stars, NuGet downloads, 800+ paying customers, years in production (computed from first NuGet release) | `docs/.vitepress/theme/statistics.data.ts`, shown in the hero | `statistics.data.ts` |
| Standards: PDF/A-2/3 (b, u, a), PDF/UA-1, EN 16931 / ZUGFeRD / Factur-X; every build validated with veraPDF and Mustang | `HomePageTrust.vue` | `HomePageTrust.vue` |
| No telemetry, no network calls, no license server; works air-gapped | Pricing FAQ, `/security-policy` | `pricing/PricingFaq.vue:109` |
| Free for individuals, non-profits, open source and organisations under $1M revenue; all features in every tier | README | GitHub README |
| Intro video builds "a production-ready invoice in fewer than 200 lines of C#" | `HomePageGettingStarted.vue` | CTA card copy |

**Not verifiable, must not appear:** an MCP server, agent "skills", a Copilot/Cursor/Claude integration, an agent that reads the Companion preview, any claim that generated code is correct, any ROI figure, any "minutes" figure measured on real teams. The current demo status "Checking the rendered page" implies the agent sees the preview; the docs do not describe that, so the new copy must attribute preview checking to the human (or to the Companion App's hot reload, which is real).

Also not in the docs: any named list of agent tools. The brief allows naming tools in neutral lists "if the docs do"; they do not, so the copy stays tool-agnostic ("your coding agent").

## 4. Code sample for the merged panel

One sample, used both as the static code and as the file the agent edits. Invoice-like, so it connects to the 10-minute intro (which builds an invoice) and the In-Depth Invoice Tutorial. Derived from `docs/invoice-tutorial.md` `ComposeTable`, trimmed to 24 lines so it reads in seconds. Every call is real API from the tutorial (`Table`, `ColumnsDefinition`, `RelativeColumn`, `Header`, `Cell`, `AlignRight`, `Text`, `SemiBold`, `FontColor`, `Colors.Red.Medium`, `Colors.Black`).

```csharp
// InvoiceDocument.cs
void ComposeTable(IContainer container)
{
    container.Table(table =>
    {
        table.ColumnsDefinition(columns =>
        {
            columns.RelativeColumn(3);
            columns.RelativeColumn();
            columns.RelativeColumn();
        });

        table.Header(header =>
        {
            header.Cell().Text("Product").SemiBold();
            header.Cell().AlignRight().Text("Quantity").SemiBold();
            header.Cell().AlignRight().Text("Total").SemiBold();
        });

        foreach (var item in Model.Items)
        {
            table.Cell().Text(item.Name);
            table.Cell().AlignRight().Text(item.Quantity);
            table.Cell().AlignRight().Text($"{item.Total:C}");
        }
    });
}
```

The demo request: **"Show negative amounts in red."** (already the second round of today's demo; it is literally a product-owner request). The diff, 1 line removed and 3 added (4 changed lines):

```diff
-            table.Cell().AlignRight().Text($"{item.Total:C}");
+            table.Cell().AlignRight()
+                .Text($"{item.Total:C}")
+                .FontColor(item.Total < 0 ? Colors.Red.Medium : Colors.Black);
```

The rendered preview is an invoice page with one credit line ("Returned: USB-C cable", −24.00). After the change, that one amount turns red. One prompt, four changed lines, one visible change.

Rendered output in the mockups is drawn in HTML/CSS (a white page with the table) so the before/after can be shown without a build; in production it would be two real renders (`invoice-before.webp`, `invoice-after.webp`) or a cross-fade between them.

## 5. Audience realities (why "AI-powered" badges read as noise)

See section 7 for the sourced data. Working assumptions used in the brainstorm:

- Most professional developers already use an AI assistant daily; being "AI-ready" is table stakes, not a differentiator. The differentiator is *evidence*: a real file, a real diff, a real render.
- Trust in AI output is low and falling among developers who use it most; "the code compiles" and "I can review the diff" are the arguments that land.
- Enterprise readers assume vendor AI claims are marketing. Neutral labels (`4 lines changed`, `reviewed by you`) and the absence of sparkles signal seriousness.
- Product owners respond to the document changing, not to code. The render must be on screen and must visibly change.

## 6. Reference landing pages: how respected developer tools show a code demo and an AI story

Method: each homepage was fetched live on 2026-10-13 (HTML and, where served, the agent-facing markdown version); animation behaviour is inferred from markup and components, not from a rendered browser session, and is marked as such. Secondary sources are flagged.

| Site | Code demo | AI framing | Borrow | Avoid |
|---|---|---|---|---|
| **Stripe** (stripe.com, docs.stripe.com) | None on today's homepage; the famous auto-typing editor survives only in teardowns. Docs lead with `stripe agent setup`. | "SDKs, APIs, MCP server and AI developer tools" as a plain list item; no badge, no sparkles; Anthropic/Cursor only as customer logos. | AI as one integration surface in a neutral list. | A homepage so abstract that no code is shown at all. |
| **Linear** (linear.app) | Product UI mockups, two `.webm` loops, two tiny `HomeScreen.tsx` diff snippets as set dressing. | H1 "The product development system for teams and agents"; "Powered by agents"; model and tool names inside mock UI only. | Agents framed as teammates using the same artefacts as humans (PRs, issues). | Agents in the H1 makes the core pitch read AI-first. |
| **Vercel** (vercel.com) | No editor; "Paste to your agent" block with a copyable prompt. | H1 "Agentic Infrastructure"; "Agent Skills", MCP named; no sparkles. | A copyable prompt as a cheap, honest CTA. | "Agent" three times in one headline. |
| **Supabase** (supabase.com) | Framework tab strip (`role="tab"`) above a fixed-height Shiki code panel; static, switcher only, no result pane. | Almost none on the visual page; the agent-facing markdown adds `npx skills add …` and an MCP endpoint. | Agent instructions in a machine-facing version, keeping the human page clean. | Code with no visible output; the reader cannot tell what it produces. |
| **Prisma** (prisma.io) | Hero video (`motion-reduce:hidden`), Before/After comparison, three-step tabs with file-name captions; no side-by-side result. | "your agent" throughout, "Schema-as-LLM-context"; docs have "Copy prompt" blocks, `prisma skills sync`, llms.txt. | Per-path "Copy prompt" blocks in docs: concrete and verifiable. | "From prompt to production" turns the whole page into an AI pitch; the product gets hard to find. |
| **Resend** (resend.com) | Language tab strip over a line-numbered code panel; a rendered React Email template beside its code; static. | None on the visual page; agent markdown lists MCP server and skills. | Code next to the rendered email, the closest analogue to C# next to a PDF. | Output shown only once, far below the hero. |
| **Tailwind CSS** (tailwindcss.com) | HTML editor with the rendered card beside it; a `TypingAnimation` component in the bundle (typed utility classes, inferred); tabbed editors for files. | Zero. Cursor, v0, Bolt only as sponsor logos. | Code left, live result right, typed edits, no chrome. | Nothing relevant; its silence on AI is itself credible. |
| **Raycast** (raycast.com) | None; static images. AI section is a mock chat with stepwise status lines. | "AI Agent — Meet your new virtual assistant"; model label inside the mock; no badge. | AI as one section with a concrete task transcript, after the non-AI value is established. | Three overlapping AI feature names blur together. |
| **Warp** (warp.dev) | Figure-style panels ("fig. 1 — the factory"), a "scrub to read" chart, a `curl` install snippet. | "A modern terminal for agentic coding"; names supported agents and models. | "fig. N" captions and monospace labels make demos feel like documentation. | Headline pivot buries the actual product. |
| **Cursor** (cursor.com) | Hero is a real-DOM "interactive demo for sighted users" with an sr-only description; split IDE + plan views; JS-driven. | "Cursor is your coding agent…"; models named; SOC 2 / ISO badges. | An sr-only narration of an animated demo (accessibility). | Autonomy claims ("hours or days") with no visible output check. |

Cross-site patterns:

- Only Tailwind and Resend show code next to its rendered result. Everyone else shows code alone or none. For a PDF library the rendered page is the proof, so this is the pattern to follow.
- Language switchers are universal where code exists; typed effects are rare (Tailwind only, inferred). Replay/scrub controls are rare (Warp "scrub to read").
- No site uses an "AI-powered" badge or sparkle icon. The honest pattern is a neutral list of integration surfaces (MCP, skills, llms.txt, "copy this prompt"). Named editors and models appear as logos or inside mock UIs, never in headlines.
- Products whose core is not AI (Tailwind, Resend, Supabase, Raycast) keep AI off the hero and give it one calm section after the product value is established.

## 7. Audience data (sourced)

- Stack Overflow Developer Survey 2025: 84% use or plan to use AI tools, 47.1% daily; 14.1% use agents daily, 37.9% do not plan to; 86.9% of agent users are concerned about accuracy; 46% distrust AI accuracy vs 33% who trust it, 3.1% "highly trust"; 66% cite "almost right, but not quite"; 45.2% say debugging AI code takes longer. https://survey.stackoverflow.co/2025/ai
- Stack Overflow 2026: 73% use coding assistants or agents daily; 48% trust AI only "when they can easily validate its answers"; 16% extend trust to most non-critical tasks. https://survey.stackoverflow.co/2026/ai (a trade-press summary adds that 78.7% say source attribution matters; secondary, not verified on the primary page.)
- JetBrains, AI coding agent adoption 2026 (15,000+ developers): 90% use AI coding agents at least weekly, 68% daily. No trust figures. https://blog.jetbrains.com/research/2026/08/ai-coding-agent-adoption-2026/
- Black Duck / UserEvidence, 831 enterprise engineers, 2026: 97% adoption, 64% moderately or extremely concerned about AI-introduced security defects; manual review (52%) is the top bottleneck. Vendor survey, directional. https://news.blackduck.com/2026-06-09-AI-Coding-Hits-97-Enterprise-Adoption-New-Black-Duck-Study-Shows-Governance-Is-the-ROI-Multiplier

What this means for the panel: nearly everyone in the audience already uses an agent, so "works with AI" earns nothing by itself. Roughly half trust AI output only when they can verify it. The verification in QuestPDF's case is visible and cheap: a four-line diff a human reads, a compiler that checks it, and a rendered page that shows the result. The panel should put those three things on screen and say little else.

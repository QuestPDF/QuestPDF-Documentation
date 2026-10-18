<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import {type Line, useAgentSession} from "./agentSession";
import {data as session} from "./quickStart.data";

/* One panel in three regions divided by hairlines: a window across the panel, with the code and the composer
   under it on its left and the rendered page, in a window of its own, on its right; and two cards side by side
   under it (why C#, and how an AI assistant fits in). While the window is mostly on screen, a request types
   itself into the composer and sends itself; the code then shows the assistant's edit as a diff (agentSession.ts
   plays the session), and the page zooms in on the part it changes and shows what QuestPDF renders from it, with
   a ring on what changed. The session starts from a Razor view, which the first request converts. */

interface Card {
  kind: "code-card" | "agent-card";
  title: string;
  label: string;
  notes: {
    icon: string;
    text: string;
  }[];
}

const cards: Card[] = [
  {
    kind: "code-card",
    title: "Create and review in C#",
    label: "Why write documents in C#",
    notes: [
      { icon: "fa-code", text: "Write loops and conditions in plain C#, not a template language" },
      { icon: "fa-puzzle-piece", text: "Build reusable components from ordinary classes and methods" },
      { icon: "fa-lightbulb-on", text: "Get IntelliSense, type checking and refactoring in your IDE" },
      { icon: "fa-code-branch", text: "Keep layouts in Git beside your application code" }
    ]
  },
  {
    kind: "agent-card",
    title: "Develop with AI agents",
    label: "How an AI assistant helps",
    notes: [
      { icon: "fa-sparkles", text: "Describe a document and get code built from your data models" },
      { icon: "fa-arrow-right-arrow-left", text: "Migrate HTML layouts and other tools' templates to QuestPDF" },
      { icon: "fa-comments", text: "Adjust layouts and add business rules through conversation" },
      { icon: "fa-code-compare", text: "Review each edit as a diff, like any other code change" }
    ]
  }
];

const windowElement = ref<HTMLElement | null>(null);
const { files, active, lines, roundIndex, promptIndex, promptText, typing, sent, working, finished, applied, zoomed, asking, countdown, paused, resetting } = useAgentSession(windowElement, session);

/* the A5 page rendered by QuestPDF with one, two... of the requests applied (A5 rather than A4, so the type is
   legible), three times the size of the page's box, so it stays sharp when zoomed in on. Each is large once
   decoded, so only the one shown, the one fading out and the next one are in the document. */
const page = { width: 595, height: 842 };
const pages = computed(() => session.rounds
    .map((_, index) => ({ index, src: `/homepage/quick-start-${index + 1}.webp` }))
    .filter(({ index }) => index >= applied.value - 2 && index <= applied.value));

/* from the moment the page shows a request until the next one is sent, rings mark what it changed */
const spots = computed(() => applied.value === roundIndex.value + 1
    ? session.rounds[roundIndex.value].focus.map(([x, y, width, height]) => ({ left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px` }))
    : []);

/* The page's box is 595 x 842 px, the pixels the rounds' focus and zoom are measured in, and the result column
   shows it scaled and moved. At rest the page's head and the statement fill the column inside its padding, the
   page's top edge in view and its foot running on below. While zoomed, the round's zoom fills the column, padding
   and all, its top at the column's top, so the column's sides fall in the gaps between the page's columns that
   the zoom's sides were chosen for; it is enlarged twice the rest at most, and 1.5 times at most wherever the page
   then fits across the column. */
const result = ref<HTMLElement | null>(null);
/* the column inside its padding, measured; until then, as it is on a wide screen */
const view = ref({ x: 24, y: 24, width: 528, height: 444 });
/* the page's head and the statement, with room for the total under it */
const overview = { width: page.width, height: 340 };
const maxScale = 1.5;

const camera = computed(() => {
  const { x, y, width, height } = view.value;
  const rest = Math.min(width / overview.width, height / overview.height);
  const zoom = zoomed.value ? session.rounds[roundIndex.value].zoom : undefined;

  if (!zoom)
    return { scale: rest, x: x + (width - page.width * rest) / 2, y };

  const [left, top, w, h] = zoom;
  const across = width + 2 * x;
  const down = height + 2 * y;
  let scale = Math.min(across / w, down / h, rest * 2);

  if (scale > maxScale && page.width * maxScale <= across)
    scale = maxScale;

  return {
    scale,
    x: page.width * scale > across ? clamp(across / 2 - (left + w / 2) * scale, across - page.width * scale, 0) : (across - page.width * scale) / 2,
    y: clamp(-top * scale, down - page.height * scale, y)
  };
});

const pageStyle = computed(() => ({
  transform: `translate(${camera.value.x}px, ${camera.value.y}px) scale(${camera.value.scale})`,
  "--scale": camera.value.scale
}));

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
  resizeObserver = new ResizeObserver(([{ contentRect: { x, y, width, height } }]) => view.value = { x, y, width, height });
  resizeObserver.observe(result.value!);
});

onUnmounted(() => resizeObserver?.disconnect());

/* the window's markup, as Shiki writes it, from the tokens highlighted at build time (quickStart.data.ts); a
   line being typed shows only its first characters. Lines are blocks, so a line's height can open and close. */
const codeHtml = computed(() => lines.value.map(({ line, folded }) => lineHtml(line, folded)).join(""));

function lineHtml({ text, kind, typed = Infinity, state }: Line, folded: boolean) {
  let html = "";

  for (const { content, style } of session.tokens[session.langs[active.value]][text]) {
    if (typed <= 0)
      break;

    html += `<span style="${style}">${content.slice(0, typed).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</span>`;
    typed -= content.length;
  }

  const classes = ["line", kind === "normal" ? "" : `line-${kind}`, state ? `line-${state}` : ""].filter(Boolean).join(" ");
  return `<span class="${classes}">${html}${folded ? `<span class="fold">{ … }</span>` : ""}</span>`;
}
</script>

<template>
  <div class="panel quick-start">
    <div ref="windowElement" class="window" :class="{ paused }">
      <div class="window-header">
        <span class="dot red" />
        <span class="dot yellow" />
        <span class="dot green" />

        <!-- a file the assistant creates opens in a new tab -->
        <div class="tabs">
          <span v-for="file of files" :key="file.name" class="tab" :class="{ active: file.name === active }">{{ file.name }}</span>
        </div>
      </div>

      <div class="window-body" :class="{ resetting }">
        <!-- the composer sticks within this part, so it never rides up over the code's title bar -->
        <div class="window-main">
          <div class="code-source" :style="{ '--code-lines': session.lines }">
            <pre class="shiki" tabindex="0"><code v-html="codeHtml"></code></pre>
          </div>

          <!-- the request types itself into the lit-up composer and sends itself once the ring around the send button
               fills; the button spins while the assistant works and shows a check once the page is updated -->
          <div class="composer" :class="{ asking, sent, working }">
            <i class="fa-regular fa-sparkles composer-icon" aria-hidden="true"></i>

            <!-- every request, unseen, under the typed one: the box is as tall as the longest from the start, so a
                 request that wraps while it types does not move the page -->
            <div class="composer-text">
              <span v-for="round of session.rounds" :key="round.prompt" class="composer-sizer" aria-hidden="true">{{ round.prompt }}</span>
              <span>{{ promptText }}<span v-if="!sent" class="caret" :class="{ steady: typing }"></span></span>
            </div>

            <span class="composer-step" aria-hidden="true">{{ promptIndex + 1 }} / {{ session.rounds.length }}</span>

            <!-- decoration only, as the session plays by itself -->
            <span class="composer-send" aria-hidden="true">
              <svg v-if="countdown" :key="countdown.key" class="countdown" viewBox="0 0 40 40" :style="{ '--countdown': `${countdown.ms}ms` }">
                <circle cx="20" cy="20" r="18.5" pathLength="100" />
              </svg>

              <i v-if="working" class="spinner"></i>
              <i v-else-if="finished" class="fa-regular fa-check"></i>
              <i v-else class="fa-regular fa-arrow-up"></i>
            </span>
          </div>
        </div>

        <!-- the page, in a window of its own beside the code -->
        <div class="viewer">
          <div class="window-header">
            <span class="buttons">
              <span class="dot red" />
              <span class="dot yellow" />
              <span class="dot green" />
            </span>

            <span class="window-title">Statement.pdf</span>
          </div>

          <div ref="result" class="result">
            <!-- the page, as rendered after the requests made so far; blank until the first one -->
            <div class="page" :class="{ blank: !applied }" :style="pageStyle">
              <img v-for="{ index, src } of pages" :key="src" :src="src" :alt="index + 1 === applied ? 'The statement rendered by QuestPDF' : ''" :class="{ shown: index + 1 === applied }" :width="page.width" :height="page.height" loading="lazy" />
              <span v-for="(spot, index) of spots" :key="`${roundIndex}-${index}`" class="spot" :style="spot" aria-hidden="true"></span>
            </div>

            <span class="page-empty" :class="{ hidden: applied }">Statement.pdf</span>
          </div>
        </div>
      </div>
    </div>

    <article v-for="card of cards" :key="card.kind" class="quick-start-card" :class="card.kind">
      <h2 class="card-title">{{ card.title }}</h2>

      <ul class="notes" :aria-label="card.label">
        <li v-for="note of card.notes" :key="note.icon" class="note">
          <i class="fa-regular" :class="note.icon" aria-hidden="true"></i>
          <span>{{ note.text }}</span>
        </li>
      </ul>
    </article>
  </div>
</template>

<style scoped>

/* the window across the panel, the cards side by side under it; the tokens are the AI card's purple, for the
   composer */
.quick-start {
  --agent-accent: #7E57C2;
  --composer-bg: color-mix(in srgb, var(--agent-accent) 8%, var(--vp-c-bg));
  --composer-border: color-mix(in srgb, var(--agent-accent) 18%, var(--vp-c-divider));
  --composer-border-sent: color-mix(in srgb, var(--agent-accent) 35%, var(--vp-c-divider));
  --composer-text: color-mix(in srgb, var(--agent-accent) 30%, var(--vp-c-text-1));
  --composer-bg-asking: color-mix(in srgb, var(--agent-accent) 11%, var(--vp-c-bg));
  --composer-border-asking: color-mix(in srgb, var(--agent-accent) 55%, var(--vp-c-divider));
  --composer-ring: color-mix(in srgb, var(--agent-accent) 12%, transparent);
  --composer-ring-strong: color-mix(in srgb, var(--agent-accent) 30%, transparent);
  --composer-shadow: 0 8px 24px -12px color-mix(in srgb, var(--agent-accent) 40%, transparent);

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-areas:
      "window window"
      "code agent";
  padding: 0;
  overflow: clip; /* the embedded window follows the panel's corners; clip, unlike hidden, lets the composer stick */
}

html.dark .quick-start {
  --agent-accent: #9575CD;
  --composer-bg: color-mix(in srgb, var(--agent-accent) 12%, var(--surface-inner));
  --composer-border: color-mix(in srgb, var(--agent-accent) 22%, var(--vp-c-divider));
  --composer-border-sent: color-mix(in srgb, var(--agent-accent) 50%, transparent);
  --composer-text: color-mix(in srgb, var(--agent-accent) 35%, var(--vp-c-text-1));
  --composer-bg-asking: color-mix(in srgb, var(--agent-accent) 18%, var(--surface-inner));
  --composer-border-asking: color-mix(in srgb, var(--agent-accent) 70%, transparent);
  --composer-ring: color-mix(in srgb, var(--agent-accent) 20%, transparent);
  --composer-ring-strong: color-mix(in srgb, var(--agent-accent) 45%, transparent);
  --composer-shadow: 0 8px 28px -10px rgba(0, 0, 0, 0.6);
}

/* the panel itself has no padding, so each card takes the panels' own */
.quick-start-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: var(--panel-padding);
}

/* each card has a colour, its tint, for its icons: blue for C#, purple for the AI card (as the composer) */

/* a faint blue glow, the same shape as the AI card's purple one: from the top-left corner on white, from the left
   edge behind the heading in dark mode */
.code-card {
  --tint: #0288D1;

  grid-area: code;
  background-image:
      radial-gradient(ellipse 70% 100% at 0% 0%, color-mix(in srgb, #2979FF 7%, transparent), transparent),
      radial-gradient(ellipse 35% 45% at 0% 0%, color-mix(in srgb, #82B1FF 5%, transparent), transparent);
}

html.dark .code-card {
  --tint: #80C8FF;

  background-image:
      radial-gradient(ellipse 90% 55% at 0% 64px, color-mix(in srgb, #64B5F6 10%, transparent), transparent),
      radial-gradient(ellipse 50% 30% at 0% 64px, color-mix(in srgb, #29B6F6 4%, transparent), transparent);
}

/* a faint purple glow. On white it falls from the top-left corner in a cleaner violet (the muted purple of the
   dark glow turns grey there); in dark mode it spreads from the left edge, behind the heading. */
.agent-card {
  --tint: #5E35B1;

  grid-area: agent;
  border-left: 1px solid var(--vp-c-divider);
  background-image:
      radial-gradient(ellipse 70% 100% at 0% 0%, color-mix(in srgb, #7C4DFF 7%, transparent), transparent),
      radial-gradient(ellipse 35% 45% at 0% 0%, color-mix(in srgb, #B388FF 5%, transparent), transparent);
}

html.dark .agent-card {
  --tint: #B388FF;

  background-image:
      radial-gradient(ellipse 90% 55% at 0% 64px, color-mix(in srgb, var(--agent-accent) 10%, transparent), transparent),
      radial-gradient(ellipse 50% 30% at 0% 64px, color-mix(in srgb, #AB47BC 4%, transparent), transparent);
}


.notes {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 12px 0 0;
}

/* rows like the license panel's list: as tall as its 36px rows, but each point is a sentence that wraps, so its icon
   sits on the first line */
.note {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 6px 0;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.note i {
  flex-shrink: 0;
  width: 18px;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--tint);
}


/* Two windows side by side, the code's and the page's, with no frames of their own: the panel's hairlines and
   corners are their edges, and a hairline divides them, title bars included. In light mode the title bars are
   as white as the code; dark mode keeps raised bars. */

/* the code's title bar over the code and the composer on the left; on the right, the page's window across both
   rows (the body has no box of its own here, so that window can reach up beside the title bar) */
.window {
  grid-area: window;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 36rem;
  grid-template-rows: auto 1fr;
  grid-template-areas:
      "header viewer"
      "main viewer";
  min-width: 0;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.window-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px 8px 24px;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: light-dark(transparent, var(--vp-c-bg-alt));
}

.window-body {
  display: contents;
}

/* the session fades out before it starts over; the title bars stay */
.code-source,
.result {
  transition: opacity 0.45s ease;
}

.window-body.resetting :is(.code-source, .composer, .result) {
  opacity: 0;
}

/* off screen, the composer's motion stands still with the session */
.window.paused .composer *,
.window.paused .composer::before {
  animation-play-state: paused;
}

.window-main {
  grid-area: main;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* the open files, the one in front raised; short of room, the others shrink to the start of their names */
.tabs {
  display: flex;
  gap: 2px;
  min-width: 0;
  margin-left: 12px;
  overflow: hidden;
}

.tab {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 4px 10px;
  border-radius: 7px;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
  transition: background-color 0.25s ease, color 0.25s ease;
  animation: tab-open 0.35s ease;
}

.tab.active {
  flex-shrink: 0;
  color: var(--vp-c-text-1);
  background-color: var(--surface-inner);
}

@keyframes tab-open {
  from { opacity: 0; transform: translateY(4px); }
}

/* each window's three buttons are grey until that window is pointed at */
.dot {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #8883;
  transition: background-color 100ms ease-in-out;
}

.dot.red {
  --lit: #F44336CC;
}

.dot.yellow {
  --lit: #FFC107CC;
}

.dot.green {
  --lit: #4CAF50CC;
}

.window:has(> .window-header:hover, .window-main:hover) > .window-header .dot,
.viewer:hover .dot {
  background-color: var(--lit);
}

/* tall enough for the most lines the session shows, so the window keeps its height while lines come and go */
.code-source {
  flex-grow: 1;
  min-height: calc(var(--code-lines) * 1lh + 24px);
  padding: 12px 8px; /* with the 16px of each line, the code starts at 24px, in line with the title bar's buttons */
  overflow: hidden;
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-source pre {
  overflow-x: auto;
  overflow-y: hidden;
}

/* lines are blocks, so the room for new lines can open in one move before they type in, and replaced lines
   close the same way */
.code-source :deep(.line) {
  display: block;
  width: max-content;
  min-width: 100%;
  min-height: 1lh;
  padding: 0 16px;
}

.code-source :deep(.line-opening) {
  overflow: hidden;
  animation: line-open 0.3s ease both;
}

.code-source :deep(.line-closing) {
  overflow: hidden;
  animation: line-close 0.3s ease both;
}

@keyframes line-open {
  from { height: 0; min-height: 0; }
  to { height: 1lh; min-height: 0; }
}

@keyframes line-close {
  from { height: 1lh; min-height: 0; }
  to { height: 0; min-height: 0; }
}

/* a diff line: a tint and a bar along its left edge, inside the line's padding */
.code-source :deep(.line-removed) {
  background-color: #F4433622;
  box-shadow: inset 3px 0 0 #F44336AA;
}

.code-source :deep(.line-added) {
  background-color: #4CAF5022;
  box-shadow: inset 3px 0 0 #4CAF50AA;
}

/* a folded method: its signature and a { … } marker, as an IDE folds it */
.code-source :deep(.fold) {
  margin-left: 6px;
  padding: 0 6px;
  border-radius: 4px;
  background-color: var(--surface-inner);
  color: var(--vp-c-text-3);
}


/* Result: the page in a viewer, a window of its own beside the code, that the page fills under its title bar;
   the padding is the room the page keeps at rest from the column's sides and top */

.viewer {
  grid-area: viewer;
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-left: 1px solid var(--vp-c-divider);
}

/* the file's name in the middle of the title bar, as tall as a tab, so both title bars line up */
.viewer .window-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  padding-right: 24px;
}

.buttons {
  display: flex;
  gap: 6px;
}

.window-title {
  padding: 4px 0;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.25rem;
  color: var(--vp-c-text-2);
}

.result {
  flex-grow: 1;
  position: relative;
  overflow: hidden;
  padding: 24px;
}

/* a page, in the proportions of A4 and A5 (1 : √2), that the camera scales and moves (its edge and the rings are
   divided by its scale, so they keep their widths); the renders are stacked and cross-fade when a request is done */
.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 595px;
  height: 842px;
  overflow: hidden;
  border-radius: calc(2px / var(--scale));
  background-color: white;
  box-shadow:
      0 0 0 calc(1px / var(--scale)) light-dark(rgba(16, 24, 40, 0.1), rgba(255, 255, 255, 0.1)),
      0 calc(6px / var(--scale)) calc(18px / var(--scale)) calc(-8px / var(--scale)) light-dark(rgba(16, 24, 40, 0.25), rgba(0, 0, 0, 0.6));
  transform-origin: 0 0;
  transition: transform 0.9s cubic-bezier(0.65, 0, 0.35, 1);
}

/* a blank page moves at once: as the column is first measured, and as the session starts over behind its fade */
.page.blank {
  transition: none;
}

.page img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.45s ease;
}

.page img.shown {
  opacity: 1;
}

.page-empty {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  color: #9E9E9E;
  transition: opacity 0.3s ease;
}

.page-empty.hidden {
  opacity: 0;
}

/* a ring around what the request changed, drawn in once the new page has settled */
.spot {
  position: absolute;
  border-radius: calc(4px / var(--scale));
  pointer-events: none;
  box-shadow:
      0 0 0 calc(2px / var(--scale)) color-mix(in srgb, #1E88E5 75%, transparent),
      0 0 0 calc(5px / var(--scale)) color-mix(in srgb, #1E88E5 14%, transparent);
  animation: spot-in 0.8s cubic-bezier(0.3, 0.7, 0.2, 1) 0.35s both;
}

@keyframes spot-in {
  from { opacity: 0; transform: scale(1.3); }
  60% { opacity: 1; }
  to { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .tab,
  .spot {
    animation: none;
  }

  .page {
    transition: none;
  }
}


/* Composer */

/* sticks to the bottom of the screen while the window runs past it, so the request stays in view; its tint is
   laid on the page colour, as it is see-through in dark mode */
.composer {
  position: sticky;
  bottom: 16px;
  z-index: 1;
  isolation: isolate; /* keeps the band (z-index: -1) above the composer's background but below its content */
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 24px 24px;
  padding: 10px 10px 10px 16px;
  border: 1px solid var(--composer-border);
  border-radius: 14px;
  background-color: var(--vp-c-bg);
  background-image: linear-gradient(var(--composer-bg), var(--composer-bg));
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.4s ease, opacity 0.45s ease;
}

.composer.sent {
  border-color: var(--composer-border-sent);
}

/* while a request arrives and waits to be sent, the composer lights up: a stronger border and tint, and a soft
   ring outside it, which swells once as the composer empties for the next request */
.composer.asking {
  border-color: var(--composer-border-asking);
  background-image: linear-gradient(var(--composer-bg-asking), var(--composer-bg-asking));
  box-shadow: 0 0 0 4px var(--composer-ring), var(--composer-shadow);
  animation: asking 0.9s ease-out;
}

@keyframes asking {
  from { box-shadow: 0 0 0 0 var(--composer-ring-strong), var(--composer-shadow); }
  40% { box-shadow: 0 0 0 8px var(--composer-ring), var(--composer-shadow); }
}

/* while the assistant works, a soft purple band sweeps across the composer */
.composer::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: linear-gradient(100deg,
      transparent 20%,
      color-mix(in srgb, var(--agent-accent) 9%, transparent) 50%,
      transparent 80%);
  background-size: 250% 100%;
  background-position: 120% 0;
  opacity: 0;
  transition: opacity 1.2s ease;
  /* the sweep always runs, invisible at opacity 0, so only the opacity follows the state: stopping it would
     snap the band back and cut the fade-out short */
  animation: sweep 3.2s linear infinite;
}

.composer.working::before {
  opacity: 1;
}

@keyframes sweep {
  from { background-position: 120% 0; }
  to { background-position: -120% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .composer::before {
    animation: none;
    background-position: 50% 0;
  }
}

.composer-icon {
  flex: 0 0 auto;
  font-size: 1rem;
  color: var(--agent-accent);
}

.composer-text {
  display: grid;
  flex: 1 1 auto;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--composer-text);
}

.composer-text > span {
  grid-area: 1 / 1;
}

.composer-sizer {
  visibility: hidden;
}

/* as wide as the caret, which follows a request until it is sent, so a request wraps where its sizer does */
.composer-sizer::after {
  content: "";
  display: inline-block;
  width: 3px;
}

.caret {
  display: inline-block;
  width: 2px;
  height: 1.0625rem;
  margin-left: 1px;
  vertical-align: -0.1875rem;
  background-color: var(--agent-accent);
  animation: blink 1s step-end infinite;
}

/* while characters arrive the caret stays lit, like a real editor */
.caret.steady {
  animation: none;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* which request of the session is in the composer */
.composer-step {
  flex: 0 0 auto;
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}

.composer-send {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: color-mix(in srgb, var(--agent-accent) 14%, transparent);
  color: var(--agent-accent);
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* filled while the request waits to send itself, and from then on; it presses itself in as the request goes */
.composer.asking .composer-send,
.composer.sent .composer-send {
  background-color: var(--agent-accent);
  color: white;
}

.composer.sent .composer-send {
  animation: press 0.35s ease;
}

@keyframes press {
  35% { transform: scale(0.84); }
}

/* a wait (the request about to send itself, or the page shown before the next request): a ring fills around the
   button, in the composer's padding */
.countdown {
  position: absolute;
  inset: -4px;
  width: 40px;
  height: 40px;
  transform: rotate(-90deg);
  pointer-events: none;
}

.countdown circle {
  fill: none;
  stroke: var(--agent-accent);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: countdown var(--countdown) linear forwards;
}

@keyframes countdown {
  to { stroke-dashoffset: 0; }
}

/* while the assistant works, a ring spins in place of the arrow */
.spinner {
  display: block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .spinner,
  .composer.asking,
  .composer.sent .composer-send {
    animation: none;
  }

  .spinner {
    border-color: white;
  }
}


/* below 1280px the longest line of code needs the window's full width: the page's window goes under the code and
   the composer under the page, in the body's column, so the composer still sticks over the code. The page is then
   as tall as the page's head and the statement need at its width, 440px at most. */
@media screen and (max-width: 1280px) {
  .window {
    display: flex;
    flex-direction: column;
  }

  .window-body {
    display: flex;
    flex-direction: column;
  }

  .window-main {
    display: contents;
  }

  .composer {
    order: 1;
  }

  .viewer {
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }

  .result {
    aspect-ratio: 595 / 400;
    max-height: 440px;
  }
}

/* phones: everything in one column, the window first */
@media screen and (max-width: 760px) {
  .quick-start {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
        "window"
        "code"
        "agent";
  }

  .agent-card {
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }

  .window-header,
  .viewer .window-header {
    padding: 8px 16px;
  }

  .result {
    padding: 16px;
  }

  .code-source {
    line-height: 1.25;
  }

  .composer {
    margin: 0 16px 16px;
  }
}

</style>

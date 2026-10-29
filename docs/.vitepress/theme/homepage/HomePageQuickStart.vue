<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {type Line, useAgentSession} from "./agentSession";
import {data as session} from "./quickStart.data";

/* One panel in three regions divided by hairlines: a window across the panel, with the code and the composer
   under it on its left and the rendered page, in a window of its own, on its right; and two cards side by side
   under it (why C#, and how an AI assistant fits in). While the window is mostly on screen, a request types
   itself into the composer and sends itself; the code then shows the assistant's edit as a diff (agentSession.ts
   plays the session), and the page flies to the part it changes and shows what QuestPDF renders from it. The
   session (quickStart.data.ts) starts from a legacy HTML invoice template that the first request converts. */

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
      { icon: "fa-arrow-right-arrow-left", text: "Migrate legacy HTML-based reports to QuestPDF with AI" },
      { icon: "fa-comments", text: "Create and modify documents confidently through prompts" },
      { icon: "fa-bolt", text: "Deliver new documents and changes significantly faster" },
      { icon: "fa-shield-check", text: "Keep every AI change type-checked and easy to review" }
    ]
  }
];

const windowElement = ref<HTMLElement | null>(null);
const { files, active, lines, promptIndex, promptText, typing, sent, working, finished, applied, zoom, scrolled, asking, countdown, paused, resetting, unfold } = useAgentSession(windowElement, session);

/* the page rendered by QuestPDF with none, one, two... of the requests applied (none: the page's chrome alone,
   shown from the start), three times the size of the page's box, so it stays sharp when zoomed in on. Each is
   large once decoded, so only the one shown, the one fading out and the next one are in the document. */
const page = session.page;
const pages = computed(() => Array.from({ length: session.rounds.length + 1 }, (_, index) => ({ index, src: `${session.renders}${index}.webp` }))
    .filter(({ index }) => Math.abs(index - applied.value) <= 1));

/* The page's box is 595 px wide and as tall as the session's page (842 px for the A4 invoice), the pixels the
   rounds' zoom is measured in, and the result column shows it scaled and moved. At rest the page's head
   and the statement fill the column inside its padding, the page's top edge in view and its foot running on below.
   While zoomed, the round's zoom fills the column, padding and all, its top at the column's top, so the column's
   sides fall in the gaps between the page's columns that the zoom's sides were chosen for; it is enlarged twice the
   rest at most, and 1.5 times at most wherever the page then fits across the column. */
const result = ref<HTMLElement | null>(null);
/* the column inside its padding, measured; until then, as it is on a wide screen */
const view = ref({ x: 24, y: 24, width: 528, height: 444 });
/* the page's head and its first content, the part of the page the viewer shows at rest */
const overview = session.overview;
const maxScale = 1.5;

const camera = computed(() => {
  const { x, y, width, height } = view.value;
  const rest = Math.min(width / overview.width, height / overview.height);

  if (!zoom.value)
    return { scale: rest, x: x + (width - page.width * rest) / 2, y };

  const [left, top, w, h] = zoom.value;
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

/* The camera as shown. When the page zooms in, out or on to another part, it flies there along the smooth zoom and
   pan path of van Wijk and Nuij (as d3's interpolateZoom): between parts far apart it draws back a little on the
   way, so the page never slides by in close-up, and the zoom runs evenly instead of rushing at its start. A longer
   way takes a little longer. When the column is resized, or the session starts over behind its fade, it moves at
   once. */
type Camera = { scale: number; x: number; y: number };

const shot = ref<Camera>(camera.value);
let shotZoom = zoom.value;
let flight = 0;

watch(camera, target => {
  cancelAnimationFrame(flight);
  const moved = zoom.value !== shotZoom;
  shotZoom = zoom.value;

  if (moved && !resetting.value && !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    fly(shot.value, target);
  else
    shot.value = target;
});

function fly(from: Camera, to: Camera) {
  /* a camera as the part of the page at the column's centre and how wide a part of the page the column shows */
  const across = view.value.width + 2 * view.value.x;
  const down = view.value.height + 2 * view.value.y;
  const toView = ({ scale, x, y }: Camera) => [(across / 2 - x) / scale, (down / 2 - y) / scale, across / scale];
  const path = zoomPath(toView(from), toView(to));
  const duration = clamp(900 + 400 * path.length, 1000, 1300);
  const start = performance.now();

  const frame = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const [cx, cy, width] = path.at(t < 0.5 ? 4 * t ** 3 : 1 - (2 - 2 * t) ** 3 / 2);
    const scale = across / width;
    shot.value = t < 1 ? { scale, x: across / 2 - cx * scale, y: down / 2 - cy * scale } : to;

    if (t < 1)
      flight = requestAnimationFrame(frame);
  };

  flight = requestAnimationFrame(frame);
}

/* van Wijk and Nuij, "Smooth and efficient zooming and panning" (2003), with rho = √2; `length` in the paper's units */
function zoomPath([x0, y0, w0]: number[], [x1, y1, w1]: number[]) {
  const rho = Math.SQRT2;
  const dx = x1 - x0;
  const dy = y1 - y0;
  const d = Math.hypot(dx, dy);

  if (d < 1e-6) {
    const length = Math.abs(Math.log(w1 / w0)) / rho;
    return { length, at: (t: number) => [x0 + t * dx, y0 + t * dy, w0 * (w1 / w0) ** t] };
  }

  const b = (w: number, sign: number) => (w1 * w1 - w0 * w0 + sign * rho ** 4 * d * d) / (2 * w * rho * rho * d);
  const r0 = Math.asinh(-b(w0, 1));
  const r1 = Math.asinh(-b(w1, -1));
  const length = (r1 - r0) / rho;

  return {
    length,
    at: (t: number) => {
      const r = rho * t * length + r0;
      const u = w0 / (rho * rho * d) * (Math.cosh(r0) * Math.tanh(r) - Math.sinh(r0));
      return [x0 + u * dx, y0 + u * dy, w0 * Math.cosh(r0) / Math.cosh(r)];
    }
  };
}

const pageStyle = computed(() => ({
  width: `${page.width}px`,
  height: `${page.height}px`,
  transform: `translate(${shot.value.x}px, ${shot.value.y}px) scale(${shot.value.scale})`,
  "--scale": shot.value.scale
}));

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
  resizeObserver = new ResizeObserver(([{ contentRect: { x, y, width, height } }]) => view.value = { x, y, width, height });
  resizeObserver.observe(result.value!);
});

onUnmounted(() => {
  cancelAnimationFrame(flight);
  resizeObserver?.disconnect();
});

/* the window's markup, as Shiki writes it, from the tokens highlighted at build time (quickStart.data.ts); a
   line being typed shows only its first characters. Lines are blocks, so a line's height can open and close. */
const codeHtml = computed(() => {
  const numbers = lineNumbers();
  return lines.value.map(({ line, folded }) => lineHtml(line, folded, numbers.get(line))).join("");
});

/* a line's number in the file as it will be once the diff is taken in, as an IDE numbers it with methods folded
   (the numbers skip a folded body): a removed line has none */
function lineNumbers() {
  const numbers = new Map<Line, number>();
  let number = 0;

  for (const line of files.value.find(file => file.name === active.value)?.lines ?? [])
    if (line.kind !== "removed")
      numbers.set(line, ++number);

  return numbers;
}

function lineHtml(line: Line, folded: boolean, number?: number) {
  const { text, kind, state, typed = text.length } = line;
  let left = typed;
  let html = "";

  for (const { content, style } of session.tokens[session.langs[active.value]][text]) {
    if (left <= 0)
      break;

    html += `<span style="${style}">${content.slice(0, left).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</span>`;
    left -= content.length;
  }

  /* the number is there, still, once the line's room has opened (a line without one keeps a blank slot), and a
     folded method's { … } once its signature has typed in */
  const classes = ["line", kind === "normal" ? "" : `line-${kind}`, state ? `line-${state}` : ""].filter(Boolean).join(" ");
  const gutter = `<span class="gutter">${state ? " " : number ?? " "}</span>`;
  const fold = folded && typed >= text.length ? `<span class="fold">{ … }</span>` : "";
  return `<span class="${classes}">${gutter}${html}${fold}</span>`;
}
</script>

<template>
  <div class="panel quick-start">
    <div ref="windowElement" class="window" :class="{ paused }">
      <div class="window-header">
        <span class="dot red" />
        <span class="dot yellow" />
        <span class="dot green" />

        <!-- the file in front: the HTML template, then the C# the assistant writes from it -->
        <span class="window-title">{{ active }}</span>
      </div>

      <div class="window-body" :class="{ resetting }">
        <!-- the composer sticks within this part, so it never rides up over the code's title bar -->
        <div class="window-main">
          <div class="code-source" :style="{ '--code-lines': session.lines, '--gutter-digits': session.digits, '--scroll': scrolled }">
            <pre class="shiki" tabindex="0"><code v-html="codeHtml"></code></pre>
          </div>

          <!-- the request types itself into the lit-up composer and sends itself once the ring around the send button
               fills; the button spins while the assistant works and shows a check once the page is updated -->
          <div class="composer" :class="{ asking, sent, working }">
            <i class="fa-solid fa-sparkles composer-icon" aria-hidden="true"></i>

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

            <span class="window-title">{{ session.title }}</span>
          </div>

          <div ref="result" class="result">
            <!-- the page, as rendered after the requests made so far; its chrome alone before the first one -->
            <div class="page" :style="pageStyle">
              <img v-for="{ index, src } of pages" :key="src" :src="src" :alt="index === applied ? `${session.title} rendered by QuestPDF` : ''" :class="{ shown: index === applied }" :width="page.width" :height="page.height" loading="lazy" />
            </div>
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

  --composer-fill: linear-gradient(110deg, #8466B7 0%, #6D49AB 100%);
  --composer-border: transparent;
  --composer-text: #FFFFFF;
  --composer-icon: rgba(255, 255, 255, 0.9);
  --composer-step: rgba(255, 255, 255, 0.85);
  --composer-ink: #FFFFFF;
  --composer-button-ink: #6D49AB; /* the gradient's darker end, where the button sits */
  --composer-sheen: rgba(255, 255, 255, 0.14);
  --composer-ring: color-mix(in srgb, var(--agent-accent) 12%, transparent);
  --composer-ring-strong: color-mix(in srgb, var(--agent-accent) 30%, transparent);
  --composer-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 10px 28px -10px rgba(109, 73, 171, 0.3);

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
  --composer-fill: linear-gradient(110deg, #6B509B 0%, #583E84 100%);
  --composer-button-ink: #583E84;
  --composer-ring: color-mix(in srgb, var(--agent-accent) 20%, transparent);
  --composer-ring-strong: color-mix(in srgb, var(--agent-accent) 45%, transparent);
  --composer-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 10px 28px -10px rgba(0, 0, 0, 0.6);
}

/* the panel itself has no padding, so each card takes the panels' own */
.quick-start-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: var(--panel-padding);
}

/* each card has a colour, its tint, for its icons: blue for C#, purple for the AI card (as the composer) */

/* dark mode: a faint blue glow from the left edge behind the heading, the same shape as the AI card's purple one;
   on white both cards stay plain (a tint there reads as a smudge) */
.code-card {
  --tint: #0288D1;

  grid-area: code;
}

html.dark .code-card {
  --tint: #80C8FF;

  background-image:
      radial-gradient(ellipse 90% 55% at 0% 64px, color-mix(in srgb, #64B5F6 10%, transparent), transparent),
      radial-gradient(ellipse 50% 30% at 0% 64px, color-mix(in srgb, #29B6F6 4%, transparent), transparent);
}

.agent-card {
  --tint: #5E35B1;

  grid-area: agent;
  border-left: 1px solid var(--vp-c-divider);
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
  background-color: light-dark(var(--vp-c-bg), var(--vp-c-bg-alt));
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
.window.paused .composer,
.window.paused .composer *,
.window.paused .composer::before {
  animation-play-state: paused;
}

/* the code's column carries the code's top padding; the composer, which sticks within the column, stops short of
   the title bar by this padding plus its own top margin, 24px, as far as it keeps from the window's foot */
.window-main {
  grid-area: main;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding-top: 12px;
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

/* as tall as the most lines the session shows, so the window keeps its height while lines come and go; a longer
   file scrolls inside it (by the session's --scroll, in lines), cut at the padding as under an editor's title bar */
.code-source {
  flex-grow: 1;
  padding-bottom: 12px;
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-source pre {
  height: calc(var(--code-lines) * 1lh);
  overflow-x: auto;
  overflow-y: hidden;
}

.code-source :deep(code) {
  display: block;
  translate: 0 calc(var(--scroll) * -1lh);
  transition: translate 0.6s ease;
}

/* lines are blocks, so the room for new lines can open in one move before they type in, and replaced lines
   close the same way; they run from edge to edge, so a diff line's tint does, with the line numbers starting in
   line with the title bar's buttons and little room after the longest line, so it fits the narrowest window */
.code-source :deep(.line) {
  display: block;
  width: max-content;
  min-width: 100%;
  min-height: 1lh;
  padding: 0 4px 0 24px;
}

/* line numbers, as an IDE shows them: dim, right-aligned and still while the code changes (a blank slot holds a
   space, so every line keeps one baseline) */
.code-source :deep(.gutter) {
  display: inline-block;
  width: calc(var(--gutter-digits) * 1ch);
  margin-right: 12px;
  text-align: right;
  color: var(--vp-c-text-3);
  opacity: 0.7;
  user-select: none;
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

/* the page lies on a grey desk, as in a PDF viewer, so its edges show on white too: in light mode a deeper grey
   than the inset tone, so the desk also tells from the page canvas around the window. The desk is the viewer's,
   not the result's, so it stays while the session fades out and starts over */
.viewer {
  grid-area: viewer;
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-left: 1px solid var(--vp-c-divider);
  background-color: light-dark(#E3E7EE, var(--surface-inner));
}

.buttons {
  display: flex;
  gap: 6px;
}

/* each window's file name after its buttons, spaced alike, so both title bars line up */
.window-title {
  margin-left: 12px;
  padding: 4px 10px;
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

/* a page, sized from the session's page box (A4 and A5, 1 : √2, by default), that the camera scales and moves (its
   edge is divided by its scale, so it keeps its width); the renders are stacked and cross-fade when a request is
   done */
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


/* Composer */

/* sticks to the bottom of the screen while the window runs past it, so the request stays in view; its tint is
   laid on the page colour, as it is see-through in dark mode. Like a chat box, where a request takes more than one
   line (on narrow screens), the icon stays by its first line and the send button by its last. */
.composer {
  position: sticky;
  bottom: 16px;
  z-index: 1;
  isolation: isolate; /* keeps the band (z-index: -1) above the composer's background but below its content */
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 12px 24px 24px; /* 24px of room above (with the code's bottom padding) and below, at rest and stuck */
  padding: 10px 10px 10px 16px;
  border: 1px solid var(--composer-border);
  border-radius: 14px;
  background-image: var(--composer-fill);
  box-shadow: var(--composer-shadow);
  overflow: hidden;
  transition: box-shadow 0.4s ease, opacity 0.45s ease;
}

/* the composer is clicked twice in a round, the same way each time: as it is clicked into for the next request,
   and as the request is sent (in step with its button). It goes down like a key under a finger and a ring swells
   once out of it. Each click has its keyframes under its own name: an animation whose name stays on the element
   from one state to the next carries on instead of playing again. */
.composer.sent {
  animation: keystroke 0.35s ease, ripple 0.9s ease-out;
}

/* while a request arrives and waits to be sent, a soft ring sits outside the composer */
.composer.asking {
  box-shadow: 0 0 0 4px var(--composer-ring), var(--composer-shadow);
  animation: keystroke-in 0.35s ease, ripple-in 0.9s ease-out;
}

@keyframes keystroke {
  35% { transform: translateY(2px) scale(0.99); }
}

@keyframes keystroke-in {
  35% { transform: translateY(2px) scale(0.99); }
}

@keyframes ripple {
  from { box-shadow: 0 0 0 0 var(--composer-ring-strong), var(--composer-shadow); }
  40% { box-shadow: 0 0 0 8px var(--composer-ring), var(--composer-shadow); }
}

@keyframes ripple-in {
  from { box-shadow: 0 0 0 0 var(--composer-ring-strong), var(--composer-shadow); }
  40% { box-shadow: 0 0 0 8px var(--composer-ring), var(--composer-shadow); }
}

/* while the assistant works, a soft band in the ink sweeps across the composer */
.composer::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: linear-gradient(100deg,
      transparent 20%,
      var(--composer-sheen) 50%,
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

/* the icon, the step and the send button each take a row as tall as the button, and the text's lines sit in the
   middle of one, so they line up on a single line */
.composer-icon {
  flex: 0 0 auto;
  font-size: 1rem;
  line-height: 2rem;
  color: var(--composer-icon);
}

.composer-text {
  display: grid;
  flex: 1 1 auto;
  padding: 5px 0;
  font-size: 1rem;
  font-weight: 600; /* the request is what the reader follows, so it leads the icon and the step counter */
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
  height: 1.125rem;
  margin-left: 1px;
  vertical-align: -0.1875rem;
  background-color: var(--composer-ink);
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
  align-self: flex-end;
  font-size: 0.875rem;
  line-height: 2rem;
  font-variant-numeric: tabular-nums;
  color: var(--composer-step);
}

.composer-send {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  align-self: flex-end;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: color-mix(in srgb, var(--composer-ink) 16%, transparent);
  color: var(--composer-ink);
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* filled while the request waits to send itself, and from then on; it presses itself in as the request goes */
.composer.asking .composer-send,
.composer.sent .composer-send {
  background-color: var(--composer-ink);
  color: var(--composer-button-ink);
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
  stroke: var(--composer-ink);
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
  border: 2px solid color-mix(in srgb, var(--composer-button-ink) 35%, transparent);
  border-top-color: var(--composer-button-ink);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .spinner,
  .composer.asking,
  .composer.sent,
  .composer.sent .composer-send {
    animation: none;
  }

  .spinner {
    border-color: var(--composer-button-ink);
  }
}


/* below 1280px the longest line of code needs the window's full width: the page's window goes under the code and
   the composer under the page, in the body's column, so the composer still sticks over the code; a hairline closes
   the page's window above it. The page is then as tall as the page's head and the statement need at its width,
   440px at most. */
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

  /* the code's top padding is its own here: the composer, which then sticks within the body, keeps its margin from
     the title bar */
  .code-source {
    padding-top: 12px;
  }

  .composer {
    order: 1;
    margin-top: 24px;
  }

  .viewer {
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
    border-bottom: 1px solid var(--vp-c-divider);
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

  .window-header {
    padding: 8px 16px;
  }

  .result {
    padding: 16px;
  }

  .code-source {
    line-height: 1.25;
  }

  .composer {
    margin: 16px;
  }
}

</style>

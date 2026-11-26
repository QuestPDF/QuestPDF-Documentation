<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { observeOnScreen, reducedMotion } from "../../homepage/ctaTimeline";

/* PROTOTYPE: two windows shuffled like cards, in a loop, after the tutorial film's intro (CodeAnimationPlayer,
   src/intro/shuffle.ts): the top card goes round to the bottom in one unbroken curve and changes layers only out of
   the frame, the panel's edge, so the windows never pass through each other; the other one just steps up a place.
   - show: ShowInCompanion() is typed, the app comes up with its start screen, then shows the document.
   - reload: the text's colour is changed in the code, the app comes up and the document changes with it;
     each pass starts from the colour the last one left.
   - implementation: a double-click selects the text in the app, the pencil shows its code there, Ctrl + click brings
     the editor up at the same line: the start of the chain that draws the text, where the app and the IDE do land.
   Mirrored, the windows leave past the right edge instead of the left.
   Drawn in HTML at 960 x 540 design px (1em = 16 of them) after the app's real screens, so it is sharp at every zoom.
   The build and reduced motion show the last scene. The panel around it has to clip its overflow. */
const props = defineProps<{
  scene: "show" | "reload" | "implementation";
  mirrored?: boolean;
}>();

const CALL = ".ShowInCompanion();";
const BLUE = "Blue.Medium";
const PURPLE = "DeepPurple.Lighten1"; /* #7E57C2, the homepage's AI purple */

const reload = props.scene === "reload";
const implementation = props.scene === "implementation";

const root = ref<HTMLElement>();
const editor = ref<HTMLElement>();
const app = ref<HTMLElement>();

const typed = ref(CALL.length);
const color = ref(reload ? PURPLE : BLUE);
const front = ref<"editor" | "app">(implementation ? "editor" : "app");
const hasDocument = ref(true);
const purple = ref(reload);

/* the implementation scene */
const pointer = ref<"rest" | "text" | "pencil">("rest");
const caption = ref("");
const clicks = ref(0); /* a new click restarts the ring */
const selected = ref(false);
const source = ref(false);
const opened = ref(implementation);


/* The code, coloured as in the tutorial film: Rider's schemes */

type Kind = "keyword" | "type" | "method" | "string" | "number-token" | "plain";

const CONTENT_LINE = 8;
const COLOR_LINE = 13;
const CALL_LINE = 16;

const code = computed(() => [
  "using QuestPDF.Companion;",
  "using QuestPDF.Fluent;",
  "using QuestPDF.Helpers;",
  "",
  "Document.Create(document =>",
  "{",
  "    document.Page(page =>",
  "    {",
  "        page.Content()",
  "            .AlignCenter()",
  "            .AlignMiddle()",
  "            .Text(\"Hello QuestPDF!\")",
  "            .FontSize(48)",
  `            .FontColor(Colors.${color.value});`,
  "    });",
  "})",
  CALL.slice(0, typed.value)
]);

/* the line the scene works on, and where its caret stands (a column; none: no caret) */
const activeLine = computed(() => implementation ? (opened.value ? CONTENT_LINE : -1) : reload ? COLOR_LINE : CALL_LINE);
const caretColumn = computed(() => implementation ? 8 : reload ? code.value[COLOR_LINE].length - 2 : typed.value);

function tokens(line: string): { text: string; kind: Kind }[] {
  return [...line.matchAll(/"[^"]*"?|[A-Za-z_]\w*|\d+|[^"A-Za-z_\d]+/g)].map(match => {
    const text = match[0];
    const before = line.slice(0, match.index);
    const after = line.slice(match.index! + text.length);
    let kind: Kind = "plain";

    if (text.startsWith("\"")) kind = "string";
    else if (/^\d/.test(text)) kind = "number-token";
    else if (text === "using") kind = "keyword";
    else if (/^[A-Za-z_]/.test(text) && (after.startsWith("(") || /^\s*\.$/.test(before))) kind = "method";
    else if (/^[A-Z]/.test(text)) kind = "type";

    return { text, kind };
  });
}

/* the part of the code the app's own source panel shows */
const SOURCE_FROM = 3;
const sourceLines = computed(() => code.value.slice(SOURCE_FROM).map((line, index) => ({ line, index: index + SOURCE_FROM })));

/* a line in two halves, around the caret when it stands in this line */
function halves(line: string, index: number) {
  const column = index === activeLine.value ? caretColumn.value : line.length;
  const result: { text: string; kind: Kind }[][] = [[], []];
  let start = 0;

  for (const token of tokens(line)) {
    const split = Math.min(Math.max(column - start, 0), token.text.length);
    if (split > 0) result[0].push({ text: token.text.slice(0, split), kind: token.kind });
    if (split < token.text.length) result[1].push({ text: token.text.slice(split), kind: token.kind });
    start += token.text.length;
  }

  return result;
}


/* The clock: the scene waiting to run is kept, so a pass paused off screen goes on where it stopped */

let timer: ReturnType<typeof setTimeout> | undefined;
let observer: ReturnType<typeof observeOnScreen> | undefined;
let visible = false;
let next: (() => void) | undefined;
let delay = 0;

function after(wait: number, scene: () => void) {
  next = scene;
  delay = wait;
  schedule();
}

function schedule() {
  clearTimeout(timer);

  if (next && visible && !document.hidden)
    timer = setTimeout(next, delay);
}


/* The shuffle */

const SHUFFLE = 1500;
const SAMPLES = 24;

/* a window's place: its offset (% of its size), size, tilt and how far it is dimmed (0 to 1) */
const FRONT = { x: 4, y: 4, scale: 1 };
const BACK = { x: -8, y: -8, scale: 0.92 };

/* how far the leaving window swings, past the panel's edge */
const SWING = 112;

const mix = (from: number, to: number, share: number) => from + (to - from) * share;
const ease = (share: number) => share * share * (3 - 2 * share);
const clamp = (share: number) => Math.min(1, Math.max(0, share));

function frame(x: number, y: number, scale: number, tilt: number, dim: number, zIndex: number): Keyframe {
  const side = props.mirrored ? -1 : 1;
  const dark = document.documentElement.classList.contains("dark");

  return {
    transform: `translate(${x * side}%, ${y}%) rotate(${tilt * side}deg) scale(${scale})`,
    filter: `grayscale(${0.7 * dim}) brightness(${1 - (dark ? 0.45 : 0.14) * dim})`,
    zIndex
  };
}

function shuffle(to: "editor" | "app") {
  const rising = to === "app" ? app.value : editor.value;
  const leaving = to === "app" ? editor.value : app.value;
  const shares = Array.from({ length: SAMPLES + 1 }, (_, index) => index / SAMPLES);

  /* out and back in one curve; the layer changes at its far end, out of sight */
  leaving?.animate(shares.map(share => {
    const place = ease(share);
    const swing = Math.sin(Math.PI * share) ** 2;
    return frame(
        mix(FRONT.x, BACK.x, place) - SWING * swing,
        mix(FRONT.y, BACK.y, place),
        mix(FRONT.scale, BACK.scale, place),
        -3 * swing,
        place,
        share <= 0.5 ? 3 : 1);
  }), { duration: SHUFFLE });

  /* steps up once most of the window above it has gone by */
  rising?.animate(shares.map(share => {
    const place = ease(clamp((share - 0.2) / 0.55));
    return frame(
        mix(BACK.x, FRONT.x, place),
        mix(BACK.y, FRONT.y, place),
        mix(BACK.scale, FRONT.scale, place),
        0,
        1 - place,
        2);
  }), { duration: SHUFFLE });

  front.value = to;
}


/* The scenes */

function type() {
  typed.value++;

  if (typed.value < CALL.length)
    after(65, type);
  else
    after(1000, showApp); /* the pause stands for Enter */
}

function erase() {
  color.value = color.value.slice(0, -1);
  after(color.value ? 40 : 250, color.value ? erase : typeColor);
}

/* blue turns purple and, in the next pass, purple turns blue: nothing has to be set back between them */
function typeColor() {
  const target = purple.value ? BLUE : PURPLE;
  color.value = target.slice(0, color.value.length + 1);

  if (color.value.length < target.length)
    after(60, typeColor);
  else
    after(1000, showApp); /* the pause stands for saving the file */
}

function showApp() {
  shuffle("app");
  after(SHUFFLE + (reload ? 500 : 900), update);
}

function update() {
  if (reload)
    purple.value = !purple.value;
  else
    hasDocument.value = true;

  after(3000, showEditor);
}

function showEditor() {
  /* the call is gone from the editor, under the app, before it comes back */
  if (!reload)
    typed.value = 0;

  shuffle("editor");
  after(SHUFFLE, start);
}

/* the implementation scene starts in the app and goes the other way; each step: what happens, then how long it stays */
const steps: [() => void, number][] = [
  [() => pointer.value = "text", 1100],
  [() => caption.value = "Double-click", 500],
  [() => { clicks.value++; selected.value = true; }, 2000],
  [() => { caption.value = ""; pointer.value = "pencil"; }, 1100],
  [() => { clicks.value++; source.value = true; }, 2200],
  [() => { clicks.value++; source.value = false; }, 400],
  [() => pointer.value = "text", 1100],
  [() => caption.value = "Ctrl + Click", 800],
  [() => clicks.value++, 550],
  [() => { opened.value = true; shuffle("editor"); }, SHUFFLE + 2400],
  /* the app, under the editor, is ready for the next pass */
  [() => { pointer.value = "rest"; caption.value = ""; selected.value = false; shuffle("app"); }, SHUFFLE]
];

function runStep(index: number) {
  if (index === steps.length)
    return start();

  const [happens, wait] = steps[index];
  happens();
  after(wait, () => runStep(index + 1));
}

function start() {
  if (implementation) {
    opened.value = false;
    after(700, () => runStep(0));
    return;
  }

  /* the app is under the editor now */
  if (!reload)
    hasDocument.value = false;

  after(800, reload ? erase : type);
}

onMounted(() => {
  if (reducedMotion())
    return;

  front.value = implementation ? "app" : "editor";
  typed.value = reload || implementation ? CALL.length : 0;
  color.value = BLUE;
  purple.value = false;
  start();

  observer = observeOnScreen(root.value!, onScreen => {
    visible = onScreen;
    schedule();
  }, 0.4);

  document.addEventListener("visibilitychange", schedule);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  clearTimeout(timer);
  document.removeEventListener("visibilitychange", schedule);
});
</script>

<template>
  <div ref="root" class="shuffle" :class="{ mirrored }" role="img"
       :aria-label="implementation
           ? 'A double-click selects the text in the Companion App, its source code shows in the app, and Ctrl + click opens it in the code editor'
           : reload
           ? 'The text colour is changed in the code, and the document in the Companion App changes with it'
           : 'ShowInCompanion() is typed in a code editor, and the document opens in the Companion App'">
    <div class="deck" aria-hidden="true">
      <div ref="editor" class="card editor" :class="front === 'editor' ? 'front' : 'back'">
        <div class="bar">
          <span class="file">Program.cs</span>
        </div>
        <div class="code">
          <div v-for="(line, index) of code" :key="index" class="line" :class="{ active: index === activeLine }"><span
            class="number">{{ index + 1 }}</span><span v-for="(token, part) of halves(line, index)[0]" :key="part"
            :class="token.kind">{{ token.text }}</span><span v-if="index === activeLine" class="caret"></span><span
            v-for="(token, part) of halves(line, index)[1]" :key="part" :class="token.kind">{{ token.text }}</span></div>
        </div>
      </div>

      <div ref="app" class="card" :class="front === 'app' ? 'front' : 'back'">
        <div class="bar">
          <img class="logo for-light" src="/questpdf-logo-nav-light.webp" alt="" width="149" height="24" />
          <img class="logo for-dark" src="/questpdf-logo-nav-dark.webp" alt="" width="149" height="24" />
          <span class="edition" :class="{ shown: hasDocument }">COMMUNITY</span>
          <svg class="buttons" viewBox="0 0 88 12" fill="none" stroke="currentColor">
            <path d="M0 6h10M35 1.5h11v9H35zM35 4.5h11M72 1l10 10M82 1 72 11" />
          </svg>
        </div>

        <div class="screens">
          <div class="screen welcome" :class="{ shown: !hasDocument }">
            <span class="dots left"></span>
            <span class="dots right"></span>
            <p class="welcome-title">Companion App</p>
            <ul class="menu">
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 15 6 12c2-6 7-9 15-9 0 8-3 13-9 15zM6 12H2l3-5h4M12 18v4l5-3v-4M5 16l-2 5 5-2" /><circle cx="15.5" cy="8.5" r="1.6" /></svg>
                Quick Start
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M20 18V2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14M4 20a2 2 0 0 1 2-2h14M9 7h7M9 11h7M18.500 18v4" /></svg>
                App features
              </li>
              <li>
                <svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="7" /><circle cx="12" cy="9" r="3" /><path d="M8 15v7l4-2 4 2v-7" /></svg>
                License
              </li>
              <li>
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="m10 2-.6 3-2 1.200-2.900-1-2 3.500 2.300 2v2.600l-2.300 2 2 3.500 2.900-1 2 1.200.6 3h4l.6-3 2-1.200 2.900 1 2-3.500-2.300-2v-2.600l2.300-2-2-3.500-2.900 1-2-1.200L14 2z" /></svg>
                Settings
                <svg class="chevron" viewBox="0 0 24 24"><path d="m4 8 8 8 8-8" /></svg>
              </li>
            </ul>
            <p class="version">Version 2026.11.0</p>
          </div>

          <div class="screen preview" :class="{ shown: hasDocument }">
            <ul class="tree">
              <li class="part open">Document</li>
              <li class="part">Background</li>
              <li class="part" :class="{ faded: selected }">Header</li>
              <li class="part open">Content</li>
              <li>Alignment</li>
              <li :class="{ chosen: selected }">Text Block <span class="value">Hello QuestPDF!</span></li>
              <li class="part" :class="{ faded: selected }">Footer</li>
              <li class="part">Foreground</li>
            </ul>
            <div class="desk">
              <div class="sheet" :class="{ selected }">
                <div class="page" :class="{ purple, selected }"><span class="text">Hello QuestPDF!</span></div>
              </div>
              <template v-if="implementation">
                <div class="toolbar" :class="{ shown: selected }">
                  <span class="pencil" :class="{ pressed: source }"><svg viewBox="0 0 24 24"><path d="M4 16 16 4l4 4L8 20H4zM13 7l4 4M12 21h9" /></svg></span>
                  <svg class="off" viewBox="0 0 24 24"><path d="M12 20V4M5 11l7-7 7 7" /></svg>
                  <svg class="off" viewBox="0 0 24 24"><path d="M12 4v16M5 13l7 7 7-7" /></svg>
                  <svg class="first" viewBox="0 0 24 24"><path d="M5 2h9l5 5v15H5zM9 12h6M9 16h6" /></svg>1 (1-1)
                  <svg class="first" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" /><path d="M12 2v6M12 16v6M2 12h6M16 12h6" /></svg>119.0 / 392.2
                  <svg class="first" viewBox="0 0 24 24"><path d="M5 5h14v14H5zM3 3h4v4H3zM17 3h4v4h-4zM3 17h4v4H3zM17 17h4v4h-4z" /></svg>357.0 × 57.6
                </div>
                <div class="source" :class="{ shown: source }">
                  <p class="path">HelloPdf\<b>Program.cs</b></p>
                  <div class="source-code">
                    <div v-for="{ line, index } of sourceLines" :key="index" class="line" :class="{ active: index === CONTENT_LINE }"><span
                      class="number">{{ index + 1 }}</span><span v-for="(token, part) of tokens(line)" :key="part"
                      :class="token.kind">{{ token.text }}</span></div>
                  </div>
                </div>
                <span :key="clicks" class="ring" :class="[pointer, { clicked: clicks > 0 }]"></span>
                <svg class="pointer" :class="pointer" viewBox="0 0 16 22"><path d="M1 1v17l4.200-4 2.800 6.500 2.600-1.100-2.800-6.400H14z" /></svg>
                <span class="keys" :class="{ shown: caption }"><template v-for="(key, index) of (caption || 'Ctrl + Click').split(' + ')" :key="key"><template v-if="index"> + </template><kbd>{{ key }}</kbd></template></span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.shuffle {
  --side: 1;

  position: relative;
  aspect-ratio: 16 / 9;
  container-type: inline-size;
}

.deck {
  position: absolute;
  inset: 0;
  font-size: calc(100cqi / 60);
}

/* each window takes 92% of the stage, the one in front at its lower right, the one at the back behind its upper left */
.card {
  line-height: 1.5;
  --in-front: translate(calc(4% * var(--side)), 4%);
  --behind: translate(calc(-8% * var(--side)), -8%) scale(0.92);

  position: absolute;
  inset: 4%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 0.875em;
  font-size: 0.92em;
  color: light-dark(#1F2328, #E6E6E6);
  background-color: light-dark(#FFFFFF, #17181A);
  box-shadow:
      0 0 0 1px light-dark(rgba(16, 24, 40, 0.12), rgba(255, 255, 255, 0.1)),
      0 1em 2.500em -1em light-dark(rgba(16, 24, 40, 0.3), rgba(0, 0, 0, 0.7));
}

.card.front {
  z-index: 2;
  transform: var(--in-front);
}

.card.back {
  z-index: 1;
  transform: var(--behind);
  filter: var(--dim);
}

.shuffle.mirrored {
  --side: -1;
}

.shuffle {
  --dim: grayscale(0.7) brightness(0.55);
}

html:not(.dark) .shuffle {
  --dim: grayscale(0.7) brightness(0.86);
}

.bar {
  display: flex;
  flex: none;
  align-items: center;
  height: 2em;
  padding: 0 0.750em;
  border-bottom: 1px solid light-dark(#E3E5E9, #2E2E32);
}


/* Editor: the colours of the tutorial film (CodeAnimationPlayer, src/styles.css), which are Rider Dark, in a window
   after Rider's Islands theme; in the light theme Rider Light */

.card.editor {
  background-color: light-dark(#FFFFFF, #121315);
}

.card.editor .bar {
  border-bottom-color: transparent;
  background-color: light-dark(#EBECF0, #1E2228);
}

.file {
  font-size: 0.750em;
  color: light-dark(#57606A, #CED0D6);
}

.code {
  padding: 0.900em 0;
  font-family: "JetBrains Mono", var(--vp-font-family-mono);
  font-size: 0.950em;
  line-height: 1.720;
  color: light-dark(#383838, #BDBDBD);
}

.line {
  min-height: 1.720em;
  padding-right: 1em;
  white-space: pre;
}

.line.active {
  background-color: light-dark(#EDF3FF, #1F2430);
}

.number {
  display: inline-block;
  width: 2.600em;
  margin-right: 1em;
  text-align: right;
  color: light-dark(#A8ADBD, #5A5D63);
}

.line.active .number {
  color: light-dark(#383838, #CED0D6);
}

.keyword { color: light-dark(#0F54D6, #6C95EB); }
.type { color: light-dark(#6B2FBA, #C191FF); }
.method { color: light-dark(#00855F, #39CC8F); }
.string { color: light-dark(#8C6C41, #C9A26D); }
.line > .number-token { color: light-dark(#AB2F6B, #ED94C0); }

.caret {
  display: inline-block;
  width: 0.125em;
  height: 1.200em;
  margin-right: -0.125em;
  vertical-align: text-bottom;
  background-color: currentColor;
  animation: blink 1s steps(2, jump-none) infinite;
}

@keyframes blink {
  from { opacity: 1; }
  to { opacity: 0; }
}


/* Companion App */

.logo {
  width: auto;
  height: 1.150em;
}

html.dark .for-light,
html:not(.dark) .for-dark {
  display: none;
}

.edition {
  margin-left: auto;
  padding: 0.300em 0.700em;
  border-radius: 0.400em;
  font-size: 0.600em;
  font-weight: 600;
  letter-spacing: 0.060em;
  color: light-dark(#D9640A, #FFA726);
  background-color: light-dark(#FDEBDD, #3A2A12);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.edition.shown {
  opacity: 1;
}

.buttons {
  width: 5.500em;
  margin-left: 1.500em;
  opacity: 0.7;
}

.screens {
  position: relative;
  flex: 1;
}

.screen {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.screen.shown {
  opacity: 1;
}

.custom-page .screen :is(p, ul, li) {
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 1.5;
  color: inherit;
}

.custom-page .screen ul {
  font-size: 1em;
}

.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
      radial-gradient(ellipse 90% 60% at 88% 0%, light-dark(#BBD9FF, #12304F), transparent),
      radial-gradient(ellipse 90% 60% at 10% 0%, light-dark(#D3E7FF, #10273A), transparent),
      light-dark(#F7F9FD, #0F1013);
}

.dots {
  position: absolute;
  top: 0;
  width: 28%;
  height: 60%;
  background-image: radial-gradient(circle, light-dark(rgba(255, 255, 255, 0.9), rgba(120, 190, 255, 0.28)) 0.100em, transparent 0.130em);
  background-size: 1.100em 1.100em;
}

.dots.left { left: 0; mask-image: radial-gradient(ellipse 100% 100% at 0 0, #000, transparent); }
.dots.right { right: 0; mask-image: radial-gradient(ellipse 100% 100% at 100% 0, #000, transparent); }

.custom-page .welcome .welcome-title {
  margin-bottom: 0.750em;
  font-size: 1.350em;
  font-weight: 600;
  color: light-dark(#1677FF, #E6E6E6);
}

.menu {
  position: relative;
  width: 15.200em;
  border: 1px solid light-dark(#E3E5E9, #303238);
  border-radius: 0.500em;
  background-color: light-dark(#FFFFFF, rgba(30, 33, 38, 0.9));
}

.custom-page .menu li {
  display: flex;
  align-items: center;
  gap: 1.200em;
  padding: 0.800em 1.100em;
  font-size: 0.770em;
  color: light-dark(#1F2328, #E6E6E6);
}

.menu li + li {
  border-top: 1px solid light-dark(#E3E5E9, #303238);
}

.menu svg {
  flex: none;
  width: 1.300em;
  height: 1.300em;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.600;
  stroke-linejoin: round;
}

.menu .chevron {
  width: 0.900em;
  margin-left: auto;
  opacity: 0.6;
}

.custom-page .welcome .version {
  margin-top: 2em;
  font-size: 0.700em;
  opacity: 0.65;
}

.preview {
  display: flex;
}

.tree {
  flex: none;
  width: 23.700%;
  border-right: 1px solid light-dark(#D9DBE0, #35363A);
  background-color: light-dark(#FFFFFF, #17181A);
}

.custom-page .preview .tree {
  padding: 0.400em 0;
}

.custom-page .tree li {
  position: relative;
  padding-left: 2.800em;
  font-size: 0.680em;
  line-height: 1.700;
  white-space: nowrap;
}

.custom-page .tree .part {
  font-weight: 600;
  color: light-dark(#2B5FB8, #64B5F6);
}

.tree .part::before {
  content: "";
  position: absolute;
  top: 0.600em;
  left: 1.400em;
  width: 0.400em;
  height: 0.400em;
  border: solid light-dark(#57606A, #A0A4AB);
  border-width: 1px 1px 0 0;
  transform: rotate(45deg);
}

.tree .part.open::before {
  transform: rotate(135deg);
}

.value {
  margin-left: 0.900em;
  opacity: 0.5;
}

.desk {
  position: relative;
  overflow: hidden;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: light-dark(#E9EBEF, #2B2C30);
}

.sheet {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* the zoomed page ends under the toolbar, short of the window's edge: where the two share an edge at a fraction of a
   pixel, the page's white shows through it */
.sheet.selected {
  clip-path: inset(1em 0 0);
}

.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
  aspect-ratio: 210 / 297;
  font-family: Lato, Carlito, sans-serif;
  font-size: 1.600em;
  white-space: nowrap;
  color: #2196F3;
  background-color: #FFFFFF;
  transition: color 0.25s ease, background-color 0.3s ease, scale 0.5s cubic-bezier(0.45, 0, 0.2, 1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

/* a selected element: the preview zooms in on it and, in the dark theme, the rest of the page is shaded */
.page.selected {
  scale: 1.850;
  background-color: light-dark(#FFFFFF, #999999);
}

.page.selected .text {
  outline: 0.060em solid #2F62BE;
  background-color: #FFFFFF;
}

.custom-page .tree .chosen::before {
  content: "";
  position: absolute;
  inset: 0 0.700em;
  z-index: -1;
  border-radius: 0.300em;
  background-color: light-dark(#DDE1FA, #42465C);
}

.custom-page .tree .chosen {
  z-index: 0;
}

.custom-page .tree .faded {
  opacity: 0.45;
}

.toolbar {
  position: absolute;
  inset: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 0.600em;
  height: 3em;
  padding: 0 0.900em;
  border-bottom: 1px solid light-dark(#D9DBE0, #35363A);
  font-size: 0.700em;
  white-space: nowrap;
  color: light-dark(#1F2328, #E6E6E6);
  background-color: light-dark(#FFFFFF, #17181A);
  opacity: 0;
  translate: 0 -100%;
  transition: opacity 0.3s ease, translate 0.3s ease;
}

.toolbar.shown {
  opacity: 1;
  translate: 0 0;
}

.toolbar svg {
  flex: none;
  width: 1.300em;
  height: 1.300em;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.600;
}

.toolbar .off { opacity: 0.3; }
.toolbar .first { margin-left: 1.600em; }

.pencil {
  display: flex;
  padding: 0.400em;
  border-radius: 0.350em;
}

.pencil.pressed {
  background-color: light-dark(#E5E5E7, #303136);
}

/* the app's own view of the code */
.source {
  position: absolute;
  inset: calc(2.100em - 1px) 0 auto;
  padding: 0.500em 0.600em 0.600em;
  border-bottom: 1px solid light-dark(#D9DBE0, #35363A);
  background-color: light-dark(#FFFFFF, #17181A);
  opacity: 0;
  translate: 0 -0.600em;
  transition: opacity 0.25s ease, translate 0.25s ease;
}

.source.shown {
  opacity: 1;
  translate: 0 0;
}

.custom-page .source .path {
  margin-bottom: 0.500em;
  font-size: 0.680em;
  color: light-dark(#6B6F76, #A0A4AB);
}

.custom-page .source .path b {
  color: light-dark(#1F2328, #FFFFFF);
}

.source-code {
  padding: 0.400em 0;
  border: 1px solid light-dark(#E3E5E9, #303238);
  border-radius: 0.400em;
  font-family: "JetBrains Mono", var(--vp-font-family-mono);
  font-size: 0.660em;
  line-height: 1.500;
  color: light-dark(#383A42, #ABB2BF);
}

.source-code .line { min-height: 1.500em; }
.source-code :is(.keyword, .type, .method) { color: inherit; }
.source-code .string { color: light-dark(#50A14F, #98C379); }
.source-code .line > .number-token { color: light-dark(#986801, #D19A66); }

.source-code .line.active {
  box-shadow: inset 0.180em 0 light-dark(#1F6FEB, #4C8DFF);
  background-color: light-dark(#DCE9FC, #1F2939);
}

.pointer {
  position: absolute;
  top: 78%;
  left: 82%;
  width: 1.300em;
  fill: #FFFFFF;
  stroke: #1F2328;
  stroke-width: 1.200;
  transition: top 1s cubic-bezier(0.45, 0, 0.2, 1), left 1s cubic-bezier(0.45, 0, 0.2, 1);
}

.pointer.text { top: 50%; left: 52%; }
.pointer.pencil { top: 3.500%; left: 3.200%; }

.ring {
  position: absolute;
  top: 50%;
  left: 52%;
  width: 2.400em;
  height: 2.400em;
  margin: -1.200em;
  border: 0.150em solid #2196F3;
  border-radius: 50%;
  opacity: 0;
}

.ring.pencil { top: 4.500%; left: 3.800%; }

.ring.clicked {
  animation: ring 0.5s ease-out;
}

@keyframes ring {
  from { opacity: 1; transform: scale(0.2); }
  to { opacity: 0; transform: scale(1); }
}

.keys {
  position: absolute;
  bottom: 8%;
  left: 50%;
  translate: -50% 0.500em;
  padding: 0.400em 0.800em;
  border-radius: 0.500em;
  font-size: 0.850em;
  white-space: nowrap;
  color: #FFFFFF;
  background-color: rgba(10, 12, 16, 0.82);
  opacity: 0;
  transition: opacity 0.25s ease, translate 0.25s ease;
}

.keys.shown {
  opacity: 1;
  translate: -50% 0;
}

.keys kbd {
  padding: 0.100em 0.450em;
  border-radius: 0.300em;
  font-family: inherit;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.16);
}

.page.purple {
  color: #7E57C2;
}

@media (prefers-reduced-motion: reduce) {
  .caret { display: none; }
}

</style>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { reducedMotion, Timeline } from "./ctaTimeline";

/* The invoice-tutorial card's visual, standing in for HomePageCtaBuildVisual.vue until the video ships: a paper page,
   the mirror of the features page beside it, shown as its layout (dashed boxes for the containers the tutorial builds)
   while a thin accent line sweeps down it section by section and leaves the finished invoice behind. It steps while
   hovered, and when the card comes into view on a device without hover it steps until it is back on the finished
   invoice; leaving returns to the finished invoice at once, so the next visit starts from the layout. Reduced motion:
   the finished invoice. */

const props = defineProps<{ active: boolean; visible: boolean }>();
const lit = computed(() => props.active || props.visible);
const root = ref<HTMLElement>();

/* where the line stands at each step: the layout, below the header, the addresses and the table, the finished page */
const STOPS = [0, 33, 64, 109, 136];
const HOLDS = [400, 550, 550, 650, 1600];
const FIRST = 200;
const FINISHED = STOPS.length - 1;

const step = ref(FINISHED);
const resetting = ref(false);
const sweep = computed(() => `${STOPS[step.value]}px`);
const timeline = new Timeline();

let token = 0;
let running = false;

/* the waits run on the document timeline (see ctaTimeline.ts); a cancelled wait ends the run */
async function play() {
  const mine = ++token;
  running = true;
  resetting.value = false;

  let moved = 0;
  let delay = FIRST;

  while (await Timeline.settled([timeline.wait(root.value!, delay)]) && mine === token) {
    if (!props.active && !(props.visible && (moved === 0 || step.value !== FINISHED))) {
      running = false;
      return;
    }

    step.value = (step.value + 1) % STOPS.length;
    moved++;
    delay = HOLDS[step.value];
  }
}

watch(lit, isLit => {
  if (isLit) {
    if (!running && !reducedMotion())
      play();

    return;
  }

  token++;
  running = false;
  timeline.cancel();

  resetting.value = step.value !== FINISHED;
  step.value = FINISHED;
});

onBeforeUnmount(() => timeline.cancel());

interface Part {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "strong" | "soft" | "accent" | "band" | "logo" | "rule";
}

const box = (item: Part) => ({ left: `${item.x}px`, top: `${item.y}px`, width: `${item.w}px`, height: `${item.h}px` });

/* the invoice on a 104 x 136 page; the table's number columns are right-aligned like the tutorial's */
const party = (x: number, label: number, lines: number[]): Part[] => [
  { x, y: 36, w: label, h: 4, tone: "strong" },
  { x, y: 42, w: 38, h: 1, tone: "rule" },
  ...lines.map((w, i) => ({ x, y: 45 + i * 6, w, h: 4, tone: "soft" as const }))
];

const rows = [
  { y: 81, product: 24, price: 10, total: 11 },
  { y: 88, product: 18, price: 9, total: 10 },
  { y: 95, product: 22, price: 10, total: 11 },
  { y: 102, product: 15, price: 8, total: 9 }
];

const parts: Part[] = [
  { x: 10, y: 9, w: 38, h: 6, tone: "accent" },
  { x: 10, y: 19, w: 28, h: 4, tone: "soft" },
  { x: 10, y: 25, w: 25, h: 4, tone: "soft" },
  { x: 72, y: 9, w: 22, h: 20, tone: "logo" },
  ...party(10, 12, [34, 28, 31]),
  ...party(56, 10, [32, 26, 30]),
  { x: 10, y: 67, w: 84, h: 10, tone: "band" },
  { x: 13, y: 70, w: 16, h: 4 },
  { x: 51, y: 70, w: 10, h: 4 },
  { x: 66, y: 70, w: 8, h: 4 },
  { x: 81, y: 70, w: 10, h: 4 },
  ...rows.flatMap(row => [
    { x: 13, y: row.y, w: row.product, h: 4 },
    { x: 61 - row.price, y: row.y, w: row.price, h: 4, tone: "soft" as const },
    { x: 69, y: row.y, w: 5, h: 4, tone: "soft" as const },
    { x: 91 - row.total, y: row.y, w: row.total, h: 4 }
  ]),
  { x: 60, y: 112, w: 18, h: 5 },
  { x: 80, y: 112, w: 11, h: 5, tone: "strong" },
  { x: 46, y: 125, w: 12, h: 4, tone: "soft" }
];

/* the containers, as the tutorial composes them */
const outlines: Part[] = [
  { x: 7, y: 6, w: 45, h: 26 },
  { x: 69, y: 6, w: 28, h: 26 },
  { x: 7, y: 34, w: 44, h: 29 },
  { x: 53, y: 34, w: 44, h: 29 },
  { x: 7, y: 65, w: 90, h: 43 },
  { x: 56, y: 110, w: 41, h: 10 },
  { x: 40, y: 122, w: 24, h: 10 }
];
</script>

<template>
  <div ref="root" class="scene tutorial" :class="[{ active: lit, resetting }, `step-${step}`]">
    <div class="stage">
      <div class="model">
        <div class="shadow" />

        <div class="paper page" :style="{ '--y': sweep }">
          <div class="layout">
            <span v-for="(outline, i) of outlines" :key="i" class="outline" :style="box(outline)" />
          </div>

          <div class="rendered">
            <span v-for="(part, i) of parts" :key="i" class="part" :class="part.tone" :style="box(part)" />
          </div>

          <span class="sweep-line" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./ctaVisual.css"></style>

<style scoped>

/* the pose, the mirror of the features page beside it, at its size */
.tutorial {
  --scale: 0.9;
  --tilt-y: 20deg;
  --tilt-z: -2deg;
  --ink-strong: #858E9C;
  --on-paper: light-dark(var(--accent-secondary), var(--accent));
  --sweep-ease: cubic-bezier(0.45, 0, 0.25, 1);
  min-height: 148px;
}

@media (prefers-reduced-motion: no-preference) {
  .tutorial.active {
    --tilt-x: 4deg;
    --tilt-y: 12deg;
    --tilt-z: -1deg;
    --rise: -4px;
  }
}

.model {
  width: 104px;
  height: 136px;
  margin: -68px 0 0 -52px;
}


/* Invoice */
.part {
  position: absolute;
  border-radius: 2px;
  background-color: var(--ink);
}

.part.strong {
  background-color: var(--ink-strong);
}

.part.soft {
  opacity: 0.55;
}

.part.accent {
  background-color: var(--on-paper);
}

.part.rule {
  border-radius: 0;
  opacity: 0.7;
}

.part.band,
.part.logo {
  background-color: #EDF0F4;
}

.part.logo {
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px #DCE1E9;
}


/* Sweep: above the line the invoice, below it the layout */
.layout,
.rendered {
  position: absolute;
  inset: 0;
  transition: clip-path 0.45s var(--sweep-ease);
}

.rendered {
  clip-path: inset(0 0 calc(136px - var(--y)) 0);
}

.layout {
  clip-path: inset(var(--y) 0 0 0);
}

.outline {
  position: absolute;
  box-sizing: border-box;
  border: 1px dashed color-mix(in srgb, var(--ink) 85%, transparent);
  border-radius: 2px;
  transition: opacity 0.25s ease 0.1s;
}

/* the line, with a faint glow on the rendered side */
.sweep-line {
  position: absolute;
  left: -4px;
  right: -4px;
  top: -14px;
  height: 15.5px;
  pointer-events: none;
  background-image:
      linear-gradient(var(--on-paper), var(--on-paper)),
      linear-gradient(transparent, color-mix(in srgb, var(--on-paper) 14%, transparent));
  background-size: 100% 1.5px, 100% 14px;
  background-position: bottom, top;
  background-repeat: no-repeat;
  border-radius: 1px;
  transform: translateY(var(--y));
  transition: transform 0.45s var(--sweep-ease), opacity 0.3s ease;
}

/* back to the layout: the invoice fades while the outlines return, then the line goes back to the top unseen */
.step-0 .rendered {
  opacity: 0;
  transition: opacity 0.2s ease, clip-path 0s linear 0.2s;
}

.step-0 .layout {
  transition: none;
}

.step-0 .sweep-line {
  transition: transform 0s linear 0.2s, opacity 0.2s ease 0.2s;
}

/* the finished invoice: the line fades once it reaches the bottom, the outlines hide once covered */
.step-4 .sweep-line {
  opacity: 0;
  transition: transform 0.45s var(--sweep-ease), opacity 0.3s ease 0.4s;
}

.step-4 .outline {
  opacity: 0;
  transition: opacity 0s linear 0.45s;
}

/* leaving mid-round: a quick sweep to the bottom */
.resetting .layout,
.resetting .rendered {
  transition: clip-path 0.35s ease-out;
}

.tutorial.resetting .sweep-line {
  transition: transform 0.35s ease-out, opacity 0.2s ease 0.15s;
}

.tutorial.resetting .outline {
  transition: opacity 0s linear 0.35s;
}

@media (prefers-reduced-motion: reduce) {
  .layout,
  .rendered,
  .outline,
  .sweep-line {
    transition: none !important;
  }
}

</style>

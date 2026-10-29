<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";

/* The intro-video card's visual: an invoice page in 3D whose sections land on it on hover. A pass always finishes,
   even if the pointer leaves. Reduced motion: the finished page, nothing moves. */

const props = defineProps<{ active: boolean }>();

/* rest: the finished page. fading: a pass has started and the content fades out. landing: the sections land.
   play: the play button is shown; it hides when a pass starts and returns with the totals. */
const phase = ref<"rest" | "fading" | "landing">("rest");
const play = ref(true);

/* the sections in page coordinates (148 x 200): where each sits, its delay after the first, and its bars */
interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Bar extends Box {
  tone?: "strong" | "soft";
}

interface Section extends Box {
  delay: number;
  bars: Bar[];
}

const tableRow: Bar[] = [
  { x: 4, y: 4, w: 44, h: 4 },
  { x: 60, y: 4, w: 14, h: 4, tone: "soft" },
  { x: 82, y: 4, w: 18, h: 4, tone: "soft" },
  { x: 104, y: 4, w: 18, h: 4 }
];

const sections: Section[] = [
  /* the title block */
  {
    x: 10, y: 12, w: 128, h: 30, delay: 0,
    bars: [
      { x: 2, y: 4, w: 14, h: 14, tone: "strong" },
      { x: 22, y: 5, w: 52, h: 8, tone: "strong" },
      { x: 22, y: 18, w: 34, h: 4, tone: "soft" },
      { x: 94, y: 5, w: 32, h: 4 },
      { x: 94, y: 13, w: 26, h: 4, tone: "soft" },
      { x: 94, y: 21, w: 30, h: 4, tone: "soft" }
    ]
  },
  /* the two parties */
  {
    x: 10, y: 50, w: 128, h: 32, delay: 0.17,
    bars: [
      { x: 2, y: 4, w: 30, h: 5, tone: "strong" },
      { x: 2, y: 13, w: 44, h: 3.5, tone: "soft" },
      { x: 2, y: 19, w: 38, h: 3.5, tone: "soft" },
      { x: 2, y: 25, w: 42, h: 3.5, tone: "soft" },
      { x: 70, y: 4, w: 30, h: 5, tone: "strong" },
      { x: 70, y: 13, w: 46, h: 3.5, tone: "soft" },
      { x: 70, y: 19, w: 36, h: 3.5, tone: "soft" },
      { x: 70, y: 25, w: 40, h: 3.5, tone: "soft" }
    ]
  },
  /* the table header and rows */
  {
    x: 10, y: 90, w: 128, h: 12, delay: 0.33,
    bars: [{ x: 0, y: 0, w: 128, h: 12, tone: "strong" }]
  },
  { x: 10, y: 104, w: 128, h: 12, delay: 0.45, bars: tableRow },
  { x: 10, y: 116, w: 128, h: 12, delay: 0.53, bars: tableRow },
  { x: 10, y: 128, w: 128, h: 12, delay: 0.6, bars: tableRow },
  { x: 10, y: 140, w: 128, h: 12, delay: 0.68, bars: tableRow },
  /* the totals */
  {
    x: 74, y: 158, w: 64, h: 26, delay: 0.83,
    bars: [
      { x: 10, y: 2, w: 24, h: 3.5, tone: "soft" },
      { x: 42, y: 2, w: 18, h: 3.5, tone: "soft" },
      { x: 10, y: 9, w: 24, h: 3.5, tone: "soft" },
      { x: 42, y: 9, w: 18, h: 3.5, tone: "soft" },
      { x: 4, y: 17, w: 30, h: 6, tone: "strong" },
      { x: 38, y: 17, w: 22, h: 6, tone: "strong" }
    ]
  },
  /* the footer line */
  {
    x: 10, y: 186, w: 60, h: 8, delay: 0.95,
    bars: [
      { x: 0, y: 2, w: 40, h: 3.5, tone: "soft" }
    ]
  }
];

/* the compact thumbnail (72 x 72): a flat miniature of the finished page */
const thumb: Bar[] = [
  { x: 8, y: 8, w: 10, h: 10, tone: "strong" },
  { x: 22, y: 9, w: 28, h: 6, tone: "strong" },
  { x: 8, y: 26, w: 24, h: 4 },
  { x: 40, y: 26, w: 24, h: 4 },
  { x: 8, y: 38, w: 56, h: 7, tone: "strong" },
  { x: 8, y: 50, w: 56, h: 4 },
  { x: 8, y: 58, w: 56, h: 4 },
  { x: 8, y: 66, w: 56, h: 4 }
];

function box(item: Box) {
  return { left: `${item.x}px`, top: `${item.y}px`, width: `${item.w}px`, height: `${item.h}px` };
}

/* the clock of a pass, matching the CSS below: the fade (0.2s), then the landings (the last starts 0.95s in
   and takes 0.7s); the play button returns with the totals, 1s in. A hover during a pass starts nothing. */
const FADE = 200;
const PLAY_AT = 1000;
const LAND = 950 + 700;

let busy = false;
let timers: ReturnType<typeof setTimeout>[] = [];

function after(delay: number, action: () => void) {
  timers.push(setTimeout(action, delay));
}

watch(() => props.active, active => {
  if (!active || busy || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;

  busy = true;
  play.value = false;
  phase.value = "fading";
  timers = [];

  after(FADE, () => {
    phase.value = "landing";
    after(PLAY_AT, () => play.value = true);
    after(LAND, () => busy = false);
  });
});

onBeforeUnmount(() => timers.forEach(clearTimeout));
</script>

<template>
  <div class="scene build" :class="[`phase-${phase}`, { play, active }]">
    <div class="stage">
      <div class="model">
        <div class="shadow" />
        <div class="paper page" />

        <div v-for="(section, index) of sections" :key="index" class="section" :style="{ ...box(section), '--d': `${section.delay}s` }">
          <span v-for="(bar, barIndex) of section.bars" :key="barIndex" class="shape" :class="bar.tone" :style="box(bar)" />
        </div>
      </div>
    </div>

    <span class="play-button"><i class="fa-solid fa-play"></i></span>

    <div class="thumb">
      <div class="paper mini">
        <span v-for="(bar, index) of thumb" :key="index" class="shape" :class="bar.tone" :style="box(bar)" />
      </div>
      <span class="play-button"><i class="fa-solid fa-play"></i></span>
    </div>
  </div>
</template>

<style scoped src="./ctaVisual.css"></style>

<style scoped>

/* the pose; the rest is shared, see ctaVisual.css */
.build {
  --tilt-y: 26deg;
  --tilt-z: -2deg;
  --lift: 56px; /* how far in front of the page a section starts */
}


.section {
  position: absolute;
  color: var(--ink);
}

.build.phase-fading .section {
  animation: build-fade 0.2s ease-out both;
}

.build.phase-landing .section {
  animation: build-land 0.7s cubic-bezier(0.3, 0.6, 0.15, 1) var(--d) both;
}

@keyframes build-fade {
  from {
    transform: translateZ(0);
    opacity: 1;
  }

  to {
    transform: translateZ(0);
    opacity: 0;
  }
}

@keyframes build-land {
  from {
    transform: translateZ(var(--lift));
    opacity: 0;
  }

  40% {
    opacity: 1;
  }

  to {
    transform: translateZ(0);
    opacity: 1;
  }
}


/* hidden from the start of a pass until the script sets .play */
.play-button {
  position: absolute;
  z-index: 10;
  left: calc(50% - 22px);
  top: calc(50% - 22px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;

  background-color: var(--accent-secondary);
  color: #FFF;
  box-shadow:
      0 0 0 5px color-mix(in srgb, var(--accent-secondary) 22%, transparent),
      0 8px 20px -4px color-mix(in srgb, var(--accent-secondary) 60%, transparent);
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.play-button i {
  font-size: 1rem;
  margin-left: 3px; /* optical centring of the triangle */
}

.build:not(.play) > .play-button {
  transform: scale(0.45);
  opacity: 0;
  transition-duration: 0.18s;
  transition-timing-function: ease-in;
}

.play-button::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent-secondary) 45%, transparent);
  opacity: 0;
  pointer-events: none;
}

/* Hover */
@media (prefers-reduced-motion: no-preference) {
  .build.active {
    --tilt-x: 4deg;
    --tilt-y: 14deg;
    --tilt-z: -1deg;
    --rise: -4px;
  }

  .build.active.play > .play-button {
    transform: scale(1.08);
    animation: play-breathe 1.8s ease-in-out 0.4s infinite;
  }

  .build.active.play > .play-button::before {
    animation: play-ring 1.8s ease-out 0.4s infinite;
  }
}

@keyframes play-breathe {
  0%, 100% {
    transform: scale(1.08);
  }

  35% {
    transform: scale(1.14);
  }
}

@keyframes play-ring {
  0% {
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent-secondary) 45%, transparent);
    opacity: 1;
  }

  70%, 100% {
    box-shadow: 0 0 0 18px color-mix(in srgb, var(--accent-secondary) 45%, transparent);
    opacity: 0;
  }
}


/* Compact */
@media screen and (max-width: 700px) {
  .build > .play-button {
    display: none;
  }

  .thumb .play-button {
    width: 28px;
    height: 28px;
    left: 22px;
    top: 22px;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-secondary) 22%, transparent);
  }

  .thumb .play-button i {
    font-size: 1rem;
    margin-left: 2px;
  }
}

</style>

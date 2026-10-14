<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useLabState } from "./ctaLab";

/* Round three, K, video: the invoice is implemented in front of you, in 3D. A blank sheet lies in the well
   in perspective, like a page on a desk seen from the front and a little above. The invoice's sections are
   skeletons, placeholder bars laid out like a real invoice (title block, the two parties, the table header,
   four rows, the totals, a footer line). Each one fades in a little in front of the page and moves onto it,
   top to bottom, one section after another, 1.65s in all; the play button lands with the totals, before the footer, the one cue of a
   video thumbnail.

   Hover: the play button goes at once, the sheet tilts towards the reader, and while the pointer rests on
   the card the build replays like a thumbnail preview: sections lift off together, land again, the play
   button lands after them, hold. The pointer leaving lets the current pass finish and stops the loop.
   Reduced motion: the finished page, flat, play button in place.

   Everything on the sheet is CSS: no image assets, so the skeleton can be restyled or reflowed in place. */

const root = ref<HTMLElement>();
const lab = useLabState();

/* landing: the sections descend onto the page (the entrance, and every hover pass); fading: the finished
   content fades out in place, the quick start of a hover pass */
const phase = ref<"landing" | "fading">("landing");

/* the first landing waits for the sheet to lay down; the replays do not */
const replay = ref(false);

/* the play button is part of the build: it goes the moment a pass starts (and the moment the pointer
   arrives) and lands once the last section has, after every pass */
const play = ref(true); /* in place from the first render, so it does not transition in on load */

/* the sections of the page, in page coordinates (the page is 148 x 200): where each one sits, how long
   after the previous one it lands, and the bars inside it */
interface Bar {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "strong" | "soft";
}

interface Section {
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  delay: number;
  bars: Bar[];
}

function row(y: number): Bar[] {
  return [
    { x: 4, y, w: 44, h: 4 },
    { x: 60, y, w: 14, h: 4, tone: "soft" },
    { x: 82, y, w: 18, h: 4, tone: "soft" },
    { x: 104, y, w: 18, h: 4 }
  ];
}

const sections: Section[] = [
  {
    name: "title", x: 10, y: 12, w: 128, h: 30, delay: 0,
    bars: [
      { x: 2, y: 4, w: 14, h: 14, tone: "strong" },
      { x: 22, y: 5, w: 52, h: 8, tone: "strong" },
      { x: 22, y: 18, w: 34, h: 4, tone: "soft" },
      { x: 94, y: 5, w: 32, h: 4 },
      { x: 94, y: 13, w: 26, h: 4, tone: "soft" },
      { x: 94, y: 21, w: 30, h: 4, tone: "soft" }
    ]
  },
  {
    name: "parties", x: 10, y: 50, w: 128, h: 32, delay: 0.17,
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
  {
    name: "head", x: 10, y: 90, w: 128, h: 12, delay: 0.33,
    bars: [{ x: 0, y: 0, w: 128, h: 12, tone: "strong" }]
  },
  { name: "row", x: 10, y: 104, w: 128, h: 12, delay: 0.45, bars: row(4) },
  { name: "row", x: 10, y: 116, w: 128, h: 12, delay: 0.53, bars: row(4) },
  { name: "row", x: 10, y: 128, w: 128, h: 12, delay: 0.6, bars: row(4) },
  { name: "row", x: 10, y: 140, w: 128, h: 12, delay: 0.68, bars: row(4) },
  {
    name: "totals", x: 74, y: 158, w: 64, h: 26, delay: 0.83,
    bars: [
      { x: 10, y: 2, w: 24, h: 3.5, tone: "soft" },
      { x: 42, y: 2, w: 18, h: 3.5, tone: "soft" },
      { x: 10, y: 9, w: 24, h: 3.5, tone: "soft" },
      { x: 42, y: 9, w: 18, h: 3.5, tone: "soft" },
      { x: 4, y: 17, w: 30, h: 6, tone: "strong" },
      { x: 38, y: 17, w: 22, h: 6, tone: "strong" }
    ]
  },
  {
    name: "footer", x: 10, y: 186, w: 60, h: 8, delay: 0.95,
    bars: [
      { x: 0, y: 2, w: 40, h: 3.5, tone: "soft" }
    ]
  }
];

/* the clock of one pass, matching the CSS below: the sheet lays down while the first sections land, the last section starts
   0.95s after the first and takes 0.7s, the play button lands 1s after the first section; a hover pass
   fades the content out (0.2s) and lands it again without the lay-down wait */
const LAND = 950 + 700;
const PLAY_AT = 1000; /* the play button lands as the totals do, while the footer is still on its way */
const FADE = 200;

let busy = false;
let timer: ReturnType<typeof setTimeout> | undefined;
let playTimer: ReturnType<typeof setTimeout> | undefined;

function reducedMotion() {
  return lab.reduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clear() {
  if (timer) clearTimeout(timer);
  if (playTimer) clearTimeout(playTimer);
  timer = undefined;
  playTimer = undefined;
}

/* the play button lands partway through a pass, before the last sections; the pass itself (busy) ends
   once everything has landed */
function land(delay: number) {
  playTimer = setTimeout(() => play.value = true, delay + PLAY_AT);
  timer = setTimeout(() => busy = false, delay + LAND);
}

/* one hover pass: the play button goes, the content fades out quickly, the build plays, the play button
   lands before the last sections; then only the play button moves (CSS) */
function pass() {
  clear();
  busy = true;
  play.value = false;
  phase.value = "fading";

  timer = setTimeout(() => {
    replay.value = true;
    phase.value = "landing";
    land(0);
  }, FADE);
}

function onEnter() {
  if (busy || reducedMotion()) return;

  pass();
}

function onLeave() {
  /* a pass in progress completes */
}

watch(() => lab.forceHover, value => value ? onEnter() : onLeave());

let card: Element | null = null;

onMounted(() => {
  card = root.value?.closest(".cta-lab-card") ?? null;
  card?.addEventListener("mouseenter", onEnter);
  card?.addEventListener("mouseleave", onLeave);
  card?.addEventListener("focus", onEnter);
  card?.addEventListener("blur", onLeave);
});

onBeforeUnmount(() => {
  clear();
  card?.removeEventListener("mouseenter", onEnter);
  card?.removeEventListener("mouseleave", onLeave);
  card?.removeEventListener("focus", onEnter);
  card?.removeEventListener("blur", onLeave);
});
</script>

<template>
  <div ref="root" class="vis-well vis-build" :class="[`phase-${phase}`, { replay, play }]">
    <div class="well">
      <div class="stage">
        <div class="sheet-3d">
          <div class="desk-shadow" />
          <div class="paper page" />

          <template v-for="(section, index) of sections" :key="index">
            <div
                class="section"
                :class="`section-${section.name}`"
                :style="{ left: `${section.x}px`, top: `${section.y}px`, width: `${section.w}px`, height: `${section.h}px`, '--d': `${section.delay}s` }">
              <span
                  v-for="(bar, barIndex) of section.bars"
                  :key="barIndex"
                  class="bar"
                  :class="bar.tone"
                  :style="{ left: `${bar.x}px`, top: `${bar.y}px`, width: `${bar.w}px`, height: `${bar.h}px` }" />
            </div>
          </template>
        </div>
      </div>

      <span class="play-button"><i class="fa-solid fa-play"></i></span>
    </div>

    <!-- compact: a flat miniature of the finished page -->
    <div class="thumb">
      <div class="paper mini">
        <span class="bar strong" style="left: 8px; top: 8px; width: 10px; height: 10px" />
        <span class="bar strong" style="left: 22px; top: 9px; width: 28px; height: 6px" />
        <span class="bar" style="left: 8px; top: 26px; width: 24px; height: 4px" />
        <span class="bar" style="left: 40px; top: 26px; width: 24px; height: 4px" />
        <span class="bar strong" style="left: 8px; top: 38px; width: 56px; height: 7px" />
        <span class="bar" style="left: 8px; top: 50px; width: 56px; height: 4px" />
        <span class="bar" style="left: 8px; top: 58px; width: 56px; height: 4px" />
        <span class="bar" style="left: 8px; top: 66px; width: 56px; height: 4px" />
      </div>
      <span class="play-button"><i class="fa-solid fa-play"></i></span>
    </div>
  </div>
</template>

<style>

/* The pose of the sheet: a page standing in three-quarter view, its left edge nearer, leaning back a
   little, so the sections that come forward (translateZ) grow towards the reader. Hover turns it towards
   the reader. The numbers are variables so the two poses only differ in values; the page keeps a 148 x 200
   coordinate system for the sections and is scaled to fit the well. */
.vis-build {
  --tilt-x: 8deg;
  --tilt-y: 26deg;
  --tilt-z: -2deg;
  --sheet-scale: 0.86;
  --sheet-rise: 0px;
  --lift: 56px; /* how far in front of the page a section starts */

  --ink: #A7AEBB;
}


/* no well: the page floats on the card itself, only its own shadow under it */
.vis-build .well,
html.dark .vis-build .well {
  background-color: transparent;
  box-shadow: none;
}

.vis-build .stage {
  position: absolute;
  inset: 0;
  perspective: 640px;
  perspective-origin: 50% 45%;
}

.vis-build .sheet-3d {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 148px;
  height: 200px;
  margin: -100px 0 0 -74px;
  transform-style: preserve-3d;
  transform: translateY(var(--sheet-rise)) scale(var(--sheet-scale)) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) rotateZ(var(--tilt-z));
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.4s ease;
}

/* the page: white, a hairline, a faint light from the top-left */
.vis-build .page {
  position: absolute;
  inset: 0;
  border-radius: 3px;
  background-image: linear-gradient(160deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.025));
}

/* the shadow the page throws, just behind it in its own plane, offset down and to the right */
.vis-build .desk-shadow {
  position: absolute;
  inset: 8px -6px -10px 10px;
  border-radius: 8px;
  background: rgba(20, 24, 40, 0.16);
  filter: blur(10px);
  transform: translateZ(-1px);
}

html.dark .vis-build .desk-shadow {
  background: rgba(0, 0, 0, 0.45);
}


/* Sections: blocks of grey bars. The resting values are the start pose (invisible, in front of the page);
   the landing animation fades each one in and carries it onto the page. */
.vis-build .section {
  position: absolute;
  color: var(--ink);
}

.vis-build .section .bar,
.vis-build .mini .bar {
  position: absolute;
  display: block;
  border-radius: 2px;
  background-color: currentColor;
  opacity: 0.7;
}

.vis-build .section .bar.strong,
.vis-build .mini .bar.strong {
  opacity: 1;
}

.vis-build .section .bar.soft {
  opacity: 0.5;
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

/* the entrance: the sheet lays down first, then the sections land one after another; --d is each
   section's own offset, the lay-down wait is dropped on the replays */
.vis-build {
  --t0: 0s;
}


.cta-lab:not(.reduce-motion) .vis-build.replay.phase-landing .section {
  animation: build-land 0.7s cubic-bezier(0.3, 0.6, 0.15, 1) calc(var(--t0) + var(--d)) both;
}


/* the start of a hover pass: the finished content fades out in place, quickly */
.cta-lab:not(.reduce-motion) .vis-build.replay.phase-fading .section {
  animation: build-fade 0.2s ease-out both;
}


/* the play button lands with the totals, on every pass: hidden (small, transparent) until the script sets .play,
   and gone again quickly, 0.18s, when a pass or a hover starts; the bouncy show transition is the card's */
.vis-build .play-button {
  left: calc(50% - 26px);
  top: calc(50% - 26px);
}

.cta-lab-card .vis-build:not(.play) .play-button {
  transform: scale(0.45);
  opacity: 0;
  transition-duration: 0.18s;
  transition-timing-function: ease-in;
}

/* while the pointer rests and the button is in place, it breathes and a ring spreads out of it */
.vis-build .play-button::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent-secondary) 45%, transparent);
  opacity: 0;
  pointer-events: none;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-build.play .play-button {
  animation: build-play-breathe 1.8s ease-in-out 0.4s infinite;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-build.play .play-button::before {
  animation: build-play-ring 1.8s ease-out 0.4s infinite;
}

@keyframes build-play-breathe {
  0%, 100% { transform: scale(1.08); }
  35% { transform: scale(1.14); }
}

@keyframes build-play-ring {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent-secondary) 45%, transparent); opacity: 1; }
  70%, 100% { box-shadow: 0 0 0 18px color-mix(in srgb, var(--accent-secondary) 45%, transparent); opacity: 0; }
}

/* hover: the sheet tilts towards the reader and rises a little; the loop is driven from the script */
.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-build {
  --tilt-x: 4deg;
  --tilt-y: 14deg;
  --tilt-z: -1deg;
  --sheet-rise: -4px;
}


/* Reduced motion, real or simulated: the finished page, lying flat, nothing moves */
.cta-lab.reduce-motion .cta-lab-card .vis-build .play-button {
  transform: none;
  opacity: 1;
}

.cta-lab.reduce-motion .vis-build .section {
  animation: none;
  opacity: 1;
  transform: none;
}


@media (prefers-reduced-motion: reduce) {
  .vis-build .section {
    animation: none !important;
    opacity: 1;
    transform: none;
  }


  .vis-build .sheet-3d {
    transition: none;
  }

  .cta-lab-card .vis-build .play-button {
    transform: none;
    opacity: 1;
  }
}


/* Compact thumbnail: the flat miniature */
.vis-build .mini {
  position: absolute;
  inset: 0;
  color: var(--ink);
}

</style>

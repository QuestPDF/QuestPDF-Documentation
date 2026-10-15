<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";

/* The visual of the intro-video card: an invoice is implemented in front of the reader, in 3D. A blank
   sheet stands on the card in perspective, like a page held slightly turned. The invoice's sections are
   skeletons, placeholder bars laid out like a real invoice (title block, the two parties, the table header,
   four rows, the totals, a footer line). The card shows the finished page from the start: no entrance.

   Hover (`active`, from HomePageCtaCard.vue): the play button goes at once, the finished content fades
   out in place (0.2s), the sheet turns towards the reader, and the build plays once: each section fades
   in a little in front of the page and moves onto it, top to bottom, about 1.65s in all; the play button
   lands with the totals. From then on, while the pointer rests, only the play button moves: it breathes,
   with a ring spreading out of it. The pointer leaving lets a pass in progress finish; the next hover
   plays another.
   Reduced motion: the finished page, the play button in place, nothing moves. Below 700px the card shows
   a flat miniature of the finished page instead (see the compact rules in HomePageCtaCard.vue).

   Everything is CSS: no image assets. */

const props = defineProps<{ active: boolean }>();

/* rest: the finished page, as the card first shows it. fading: a pass has started, the finished content
   fades out in place. landing: the sections land one after another. play: the play button is in place;
   it goes the moment a pass starts and lands with the totals. */
const phase = ref<"rest" | "fading" | "landing">("rest");
const play = ref(true);

/* the sections of the page, in page coordinates (the page is 148 x 200): where each one sits, how long
   after the first one it lands, and the bars inside it */
interface Bar {
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "strong" | "soft";
}

interface Section {
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
  { x: 10, y: 104, w: 128, h: 12, delay: 0.45, bars: row(4) },
  { x: 10, y: 116, w: 128, h: 12, delay: 0.53, bars: row(4) },
  { x: 10, y: 128, w: 128, h: 12, delay: 0.6, bars: row(4) },
  { x: 10, y: 140, w: 128, h: 12, delay: 0.68, bars: row(4) },
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

function box(item: { x: number; y: number; w: number; h: number }) {
  return { left: `${item.x}px`, top: `${item.y}px`, width: `${item.w}px`, height: `${item.h}px` };
}

/* the clock of a pass, matching the CSS below: the content fades out (0.2s), then the sections land, the
   last one starting 0.95s after the first and taking 0.7s; the play button lands with the totals, 1s in,
   while the footer is still on its way. A hover while a pass runs does not start another. */
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
  <div class="build" :class="[`phase-${phase}`, { play, active }]">
    <div class="stage">
      <div class="sheet-3d">
        <div class="sheet-shadow" />
        <div class="paper page" />

        <div v-for="(section, index) of sections" :key="index" class="section" :style="{ ...box(section), '--d': `${section.delay}s` }">
          <span v-for="(bar, barIndex) of section.bars" :key="barIndex" class="bar" :class="bar.tone" :style="box(bar)" />
        </div>
      </div>
    </div>

    <span class="play-button"><i class="fa-solid fa-play"></i></span>

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

<style scoped>

/* The pose of the sheet: a page standing in three-quarter view, its left edge nearer, leaning back a
   little, so the sections that come forward (translateZ) grow towards the reader. Hover turns it towards
   the reader. The numbers are variables so the two poses only differ in values; the page keeps a 148 x 200
   coordinate system for the sections and is scaled to fit the column. */
.build {
  --tilt-x: 8deg;
  --tilt-y: 26deg;
  --tilt-z: -2deg;
  --sheet-scale: 0.86;
  --sheet-rise: 0px;
  --lift: 56px; /* how far in front of the page a section starts */

  --ink: #A7AEBB;

  position: relative;
  width: 100%;
  height: 100%;
  min-height: 196px;
}

.stage {
  position: absolute;
  inset: 0;
  perspective: 640px;
  perspective-origin: 50% 45%;
}

.sheet-3d {
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

/* a sheet of paper: white, a hairline, dimmed a little on the dark theme so it is not the brightest
   thing on the page */
.paper {
  background: #FFF;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.10);
}

html.dark .paper {
  background: #F4F4F6;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06);
}

/* the page: a faint light from the top-left */
.page {
  position: absolute;
  inset: 0;
  border-radius: 3px;
  background-image: linear-gradient(160deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.025));
}

/* the shadow the page throws, just behind it in its own plane, offset down and to the right */
.sheet-shadow {
  position: absolute;
  inset: 8px -6px -10px 10px;
  border-radius: 8px;
  background: rgba(20, 24, 40, 0.16);
  filter: blur(10px);
  transform: translateZ(-1px);
}

html.dark .sheet-shadow {
  background: rgba(0, 0, 0, 0.45);
}


/* Sections: blocks of grey bars, resting on the page; a hover pass fades them out in place, quickly, and
   lands them again one after another (--d is each section's own offset): each fades in a little in front
   of the page and is carried onto it */
.section {
  position: absolute;
  color: var(--ink);
}

.bar {
  position: absolute;
  display: block;
  border-radius: 2px;
  background-color: currentColor;
  opacity: 0.7;
}

.bar.strong {
  opacity: 1;
}

.bar.soft {
  opacity: 0.5;
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


/* The play button, centred on the column. Hidden (small, transparent) from the start of a pass until the
   script sets .play as the totals land; the show transition overshoots. */
.play-button {
  position: absolute;
  z-index: 10;
  left: calc(50% - 26px);
  top: calc(50% - 26px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;

  background-color: var(--accent-secondary);
  color: #FFF;
  box-shadow:
      0 0 0 6px color-mix(in srgb, var(--accent-secondary) 22%, transparent),
      0 8px 20px -4px color-mix(in srgb, var(--accent-secondary) 60%, transparent);
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

/* the colour is set on the glyph itself: the page-wide rule that paints every solid icon brand blue
   (.custom-page .fa-solid in CustomPages.css) would otherwise hide the triangle on the blue disc */
.play-button i {
  font-size: 18px;
  margin-left: 3px; /* optical centring of the triangle */
  color: #FFF;
}

.build:not(.play) > .play-button {
  transform: scale(0.45);
  opacity: 0;
  transition-duration: 0.18s;
  transition-timing-function: ease-in;
}

/* the ring that spreads out of the button while it breathes */
.play-button::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent-secondary) 45%, transparent);
  opacity: 0;
  pointer-events: none;
}

/* Hover, with motion allowed: the sheet turns towards the reader and rises a little; the button, once in
   place, grows a touch and breathes: the disc swells 4% and settles, and a ring of the accent colour
   spreads out of it and fades, once every 1.8s, until the next pass hides it */
@media (prefers-reduced-motion: no-preference) {
  .build.active {
    --tilt-x: 4deg;
    --tilt-y: 14deg;
    --tilt-z: -1deg;
    --sheet-rise: -4px;
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


/* Compact: below 700px the column is a 72px tile beside the title; only the flat miniature shows, with a
   small play button that never moves */
.thumb {
  display: none;
}

.mini {
  position: absolute;
  inset: 0;
  color: var(--ink);
}

@media screen and (max-width: 700px) {
  .build {
    width: 72px;
    height: 72px;
    min-height: 0;
  }

  .stage,
  .build > .play-button {
    display: none;
  }

  .thumb {
    display: block;
    position: relative;
    width: 72px;
    height: 72px;
    border-radius: 12px;
    overflow: hidden;
  }

  .thumb .play-button {
    width: 28px;
    height: 28px;
    left: 22px;
    top: 22px;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-secondary) 22%, transparent);
  }

  .thumb .play-button i {
    font-size: 10px;
    margin-left: 2px;
  }
}

</style>

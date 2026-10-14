<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/* The visual of the sample-gallery card: a pile of sample documents, in 3D. Six pages stand on the card in
   three-quarter view, the same pose as the invoice of the intro-video card next to it but turned the other
   way, so the two visuals face each other. Each page behind the front one is set back a little and peeks
   out to the right, so the pile has depth. Every page is a different kind of document, drawn as skeleton
   placeholders: a report with a bar chart, a certificate with a seal, a product catalogue, a dashboard, a
   letter, a long table. One element on each page carries the card's accent, the way a real sample has a
   touch of colour.

   The card shows the pile from the start: no entrance.
   Hover, "pick one up": the pile turns towards the reader and the front page lifts off it, 64px towards
   the camera, turned to face the camera square on (its own rotations undo the pile's pose), with a deep
   shadow; the camera comes closer (a shorter perspective) so the lift reads as depth, and the pages left
   behind shrink a touch, sink and dim. Centred in the column. Meanwhile colour arrives on the pages, one
   after another from the front: headings darken, the accent element brightens, photos take a tint, the
   seal fills in (the samples are rendered documents, not placeholders). Once settled, the pile browses:
   the held page fades away where it is while the pile advances beneath it and the next front page rises
   into the hand; the faded page reappears at the back. One page every 1.8s while the pointer rests; the
   step in progress finishes when the pointer leaves, and the colour drains back from the rear.
   Reduced motion: the pile in its pose, nothing moves. Below 700px the card shows a flat miniature of the
   front page instead (see the compact rules in HomePageCtaCard.vue).

   Everything is CSS: no image assets. The component listens for hover on the surrounding .cta-card link,
   which HomePageCtaCard.vue renders around its visual slot. */

const root = ref<HTMLElement>();

/* active: the page in front. leaving: the page that has just left the front and is on its way to the
   back. stepping: a browse step is in progress, so the pile waits a moment before it advances. The card
   shows the pile from the start: no entrance. */
const active = ref(0);
const leaving = ref(-1);
const stepping = ref(false);

/* the shapes on a page, in page coordinates (the page is 148 x 200). bar: a placeholder line or block.
   block: a photo. frame: an outline. ring / disc: a circle (the donut, a seal, an emblem). band: a faint
   stripe behind a table row. One per page is "accent": the card's colour. */
interface Shape {
  kind?: "bar" | "block" | "frame" | "ring" | "disc" | "band";
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "strong" | "soft" | "accent";
  r?: number; /* rotation in degrees: a signature */
  b?: number; /* border width: rings and frames */
}

interface Page {
  name: string;
  shapes: Shape[];
}

function cells(y: number, columns: [number, number][], tones: (Shape["tone"] | undefined)[] = [undefined, "soft", "soft", undefined]): Shape[] {
  return columns.map(([x, w], index) => ({ x, y, w, h: 4, tone: tones[index] }));
}

const chartHeights = [30, 46, 24, 58, 40, 68];

const pages: Page[] = [
  {
    name: "report",
    shapes: [
      { x: 10, y: 12, w: 64, h: 8, tone: "strong" },
      { x: 10, y: 24, w: 40, h: 4, tone: "soft" },
      { x: 108, y: 13, w: 30, h: 4, tone: "soft" },

      ...chartHeights.map((h, index): Shape => ({ x: 14 + index * 20, y: 96 - h, w: 14, h, tone: index === chartHeights.length - 1 ? "accent" : undefined })),
      { x: 10, y: 96, w: 128, h: 1.5, tone: "soft" },
      ...chartHeights.map((_, index): Shape => ({ x: 16 + index * 20, y: 100, w: 10, h: 3, tone: "soft" })),

      { x: 10, y: 112, w: 128, h: 4 },
      { x: 10, y: 119, w: 120, h: 4, tone: "soft" },
      { x: 10, y: 126, w: 128, h: 4 },
      { x: 10, y: 133, w: 84, h: 4, tone: "soft" },

      { x: 10, y: 148, w: 128, h: 8, tone: "strong" },
      ...[160, 168, 176, 184].flatMap(y => cells(y, [[12, 40], [66, 22], [96, 16], [118, 18]]))
    ]
  },
  {
    name: "certificate",
    shapes: [
      { kind: "frame", x: 8, y: 8, w: 132, h: 184, tone: "soft", b: 2 },
      { kind: "frame", x: 13, y: 13, w: 122, h: 174, tone: "soft", b: 1 },
      { kind: "ring", x: 66, y: 24, w: 16, h: 16, tone: "strong", b: 3 },

      { x: 34, y: 50, w: 80, h: 9, tone: "strong" },
      { x: 49, y: 64, w: 50, h: 4, tone: "soft" },
      { x: 54, y: 82, w: 40, h: 3.5, tone: "soft" },
      { x: 29, y: 90, w: 90, h: 8, tone: "strong" },
      { x: 24, y: 106, w: 100, h: 4, tone: "soft" },
      { x: 34, y: 113, w: 80, h: 4, tone: "soft" },
      { x: 44, y: 120, w: 60, h: 4, tone: "soft" },

      { kind: "ring", x: 100, y: 138, w: 28, h: 28, tone: "accent", b: 4 },
      { kind: "disc", x: 107, y: 145, w: 14, h: 14, tone: "accent" },

      { x: 22, y: 152, w: 34, h: 5, tone: "strong", r: -8 },
      { x: 18, y: 162, w: 50, h: 1.5, tone: "soft" },
      { x: 18, y: 167, w: 30, h: 3.5, tone: "soft" }
    ]
  },
  {
    name: "catalogue",
    shapes: [
      { x: 10, y: 12, w: 56, h: 8, tone: "strong" },
      { x: 108, y: 14, w: 30, h: 4, tone: "soft" },

      ...[28, 84, 140].flatMap((y, row) => [10, 79].flatMap((x, column): Shape[] => [
        { kind: "block", x, y, w: 59, h: 40, tone: row === 1 && column === 1 ? "accent" : undefined },
        { x, y: y + 44, w: 34, h: 4 },
        { x: x + 45, y: y + 44, w: 14, h: 4, tone: "strong" },
        { x, y: y + 50, w: 48, h: 3, tone: "soft" }
      ]))
    ]
  },
  {
    name: "dashboard",
    shapes: [
      { x: 10, y: 12, w: 50, h: 8, tone: "strong" },
      { x: 112, y: 14, w: 26, h: 4, tone: "soft" },

      ...[10, 54, 98].flatMap((x): Shape[] => [
        { kind: "frame", x, y: 28, w: 40, h: 28, tone: "soft", b: 1 },
        { x: x + 4, y: 32, w: 18, h: 3, tone: "soft" },
        { x: x + 4, y: 40, w: 26, h: 9, tone: "strong" }
      ]),

      { kind: "ring", x: 12, y: 66, w: 50, h: 50, tone: "accent", b: 9 },
      { x: 28, y: 87, w: 18, h: 6, tone: "strong" },
      ...[72, 82, 92, 102].flatMap((y, index): Shape[] => [
        { x: 72, y, w: 6, h: 4, tone: index === 0 ? "accent" : "strong" },
        { x: 84, y, w: [46, 36, 42, 28][index], h: 4, tone: index % 2 ? "soft" : undefined }
      ]),

      { x: 10, y: 128, w: 128, h: 8, tone: "strong" },
      ...[140, 149, 158, 167, 176, 185].flatMap(y => cells(y, [[12, 34], [60, 18], [90, 16], [116, 20]]))
    ]
  },
  {
    name: "letter",
    shapes: [
      { x: 10, y: 12, w: 14, h: 14, tone: "accent" },
      { x: 30, y: 14, w: 44, h: 5, tone: "strong" },
      { x: 30, y: 22, w: 32, h: 3.5, tone: "soft" },
      { x: 104, y: 14, w: 34, h: 3.5, tone: "soft" },
      { x: 110, y: 20, w: 28, h: 3.5, tone: "soft" },

      { x: 10, y: 40, w: 28, h: 4, tone: "soft" },
      { x: 10, y: 52, w: 52, h: 4 },
      { x: 10, y: 59, w: 42, h: 4, tone: "soft" },
      { x: 10, y: 66, w: 36, h: 4, tone: "soft" },
      { x: 10, y: 80, w: 70, h: 5, tone: "strong" },

      ...[128, 128, 116, 72].map((w, index): Shape => ({ x: 10, y: 92 + index * 7, w, h: 4, tone: index % 2 ? "soft" : undefined })),
      ...[128, 124, 96].map((w, index): Shape => ({ x: 10, y: 125 + index * 7, w, h: 4, tone: index % 2 ? "soft" : undefined })),

      { x: 10, y: 152, w: 28, h: 4 },
      { x: 12, y: 162, w: 40, h: 6, tone: "strong", r: -7 },
      { x: 10, y: 174, w: 36, h: 4 },
      { x: 10, y: 181, w: 28, h: 3.5, tone: "soft" },
      { x: 10, y: 192, w: 60, h: 2.5, tone: "soft" }
    ]
  },
  {
    name: "table",
    shapes: [
      { x: 10, y: 12, w: 76, h: 8, tone: "strong" },
      { x: 10, y: 24, w: 48, h: 4, tone: "soft" },
      { x: 10, y: 34, w: 128, h: 9, tone: "strong" },

      ...Array.from({ length: 11 }, (_, index) => 47 + index * 12).flatMap((y, index): Shape[] => [
        ...(index % 2 ? [{ kind: "band", x: 10, y: y - 4, w: 128, h: 12 } as Shape] : []),
        ...cells(y, [[13, 34], [54, 18], [80, 14], [110, 24]], [undefined, "soft", index % 3 === 1 ? "accent" : "soft", undefined])
      ]),

      { x: 92, y: 182, w: 46, h: 5, tone: "strong" }
    ]
  }
];

/* a page's place in the pile: 0 is the front, 5 the back; the pages behind the front one lean a little
   each way, so the pile is not a perfect block */
const LAST = pages.length - 1;
const TILTS = [0, 1.2, -1, 0.8, -1.4, 0.6];

const slots = computed(() => pages.map((_, index) => (index - active.value + pages.length) % pages.length));

function shapeStyle(shape: Shape) {
  return {
    left: `${shape.x}px`,
    top: `${shape.y}px`,
    width: `${shape.w}px`,
    height: `${shape.h}px`,
    transform: shape.r ? `rotate(${shape.r}deg)` : undefined,
    borderWidth: shape.b ? `${shape.b}px` : undefined
  };
}

/* the clock, matching the CSS below: a browse step takes 1.5s. The first one waits for the pile to finish
   turning towards the reader and the front page to lift (0.6s), so only one thing moves at a time; the
   later ones keep a browsing pace */
const STEP = 1500;
const FIRST_STEP_DELAY = 650;
const STEP_INTERVAL = 1800;

let hovering = false;
let timer: ReturnType<typeof setTimeout> | undefined;
let stepTimer: ReturnType<typeof setTimeout> | undefined;
let card: Element | null = null;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clear() {
  if (timer) clearTimeout(timer);
  timer = undefined;
}

/* one browse step: the front page leaves (its animation fades it out and brings it back at the rear),
   the pile advances, and once the step is over the page that left is just the back page */
function step() {
  if (stepTimer) clearTimeout(stepTimer);

  leaving.value = active.value;
  active.value = (active.value + 1) % pages.length;
  stepping.value = true;

  /* the animation's own end event clears the class (see onFlightEnd); this is the fallback should it not
     arrive, well after the step: the animation holds its end state, which is the back place, so the class
     can go late but not early (removing it mid-step would snap the page into place) */
  stepTimer = setTimeout(settle, STEP + 400);
}

function settle() {
  if (stepTimer) clearTimeout(stepTimer);
  stepTimer = undefined;
  leaving.value = -1;
  stepping.value = false;
}

/* a step is two animations of the same length (place and fade), so this arrives twice; the second call
   finds the page no longer leaving and does nothing */
function onFlightEnd(event: AnimationEvent, index: number) {
  if (event.target === event.currentTarget && leaving.value === index)
    settle();
}

function schedule(delay: number) {
  clear();
  timer = setTimeout(() => {
    if (!hovering) return;
    step();
    schedule(STEP_INTERVAL);
  }, delay);
}

function onEnter() {
  hovering = true;
  if (reducedMotion()) return;

  schedule(FIRST_STEP_DELAY);
}

function onLeave() {
  hovering = false;
  clear();
}

onMounted(() => {
  card = root.value?.closest(".cta-card") ?? null;
  card?.addEventListener("mouseenter", onEnter);
  card?.addEventListener("mouseleave", onLeave);
  card?.addEventListener("focus", onEnter);
  card?.addEventListener("blur", onLeave);

});

onBeforeUnmount(() => {
  clear();
  if (stepTimer) clearTimeout(stepTimer);
  card?.removeEventListener("mouseenter", onEnter);
  card?.removeEventListener("mouseleave", onLeave);
  card?.removeEventListener("focus", onEnter);
  card?.removeEventListener("blur", onLeave);
});
</script>

<template>
  <div ref="root" class="deck" :class="{ stepping }" :style="{ '--last': LAST }">
    <div class="stage">
      <div class="deck-3d">
        <div class="deck-shadow" />

        <div
            v-for="(page, index) of pages"
            :key="page.name"
            class="page-3d"
            :class="{ leaving: leaving === index, front: slots[index] === 0 }"
            :style="{ '--i': slots[index], '--r': `${TILTS[slots[index]]}deg` }"
            @animationend="onFlightEnd($event, index)">
          <div class="paper page">
            <span
                v-for="(shape, shapeIndex) of page.shapes"
                :key="shapeIndex"
                class="shape"
                :class="[shape.kind ?? 'bar', shape.tone]"
                :style="shapeStyle(shape)" />
          </div>
        </div>

      </div>
    </div>

    <!-- compact: a flat miniature of the front page, the report -->
    <div class="thumb">
      <div class="paper mini">
        <span class="shape bar strong" style="left: 8px; top: 8px; width: 30px; height: 6px" />
        <span class="shape bar soft" style="left: 8px; top: 17px; width: 20px; height: 3px" />
        <span class="shape bar" style="left: 8px; top: 40px; width: 7px; height: 12px" />
        <span class="shape bar" style="left: 18px; top: 32px; width: 7px; height: 20px" />
        <span class="shape bar" style="left: 28px; top: 44px; width: 7px; height: 8px" />
        <span class="shape bar" style="left: 38px; top: 28px; width: 7px; height: 24px" />
        <span class="shape bar" style="left: 48px; top: 36px; width: 7px; height: 16px" />
        <span class="shape bar accent" style="left: 58px; top: 24px; width: 7px; height: 28px" />
        <span class="shape bar soft" style="left: 8px; top: 52px; width: 57px; height: 1px" />
        <span class="shape bar" style="left: 8px; top: 60px; width: 56px; height: 3px" />
        <span class="shape bar soft" style="left: 8px; top: 66px; width: 44px; height: 3px" />
      </div>
    </div>
  </div>
</template>

<style scoped>

/* The pose of the pile: pages standing in three-quarter view, the right edge nearer (the mirror of the
   invoice next door), leaning back a little. Each page behind the front one is set back by --dz and
   shifted by --dx / --dy, so the pile shows its depth to the right. Hover turns the pile towards the
   reader and opens the offsets. The pages keep a 148 x 200 coordinate system for the shapes and are
   scaled to fit the column; the pile is nudged left so its depth stays inside the column.
   --ink is the grey of the placeholders, --ink-strong the darker grey the headings take on hover. */
.deck {
  --tilt-x: 8deg;
  --tilt-y: -26deg;
  --tilt-z: 2deg;
  --deck-scale: 0.86;
  --deck-rise: 0px;
  --deck-shift: -12px;
  --dx: 4px;
  --dy: -4px;
  --dz: 14px;

  --ink: #A7AEBB;
  --ink-strong: #5A6472;

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
  transition: perspective 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.deck-3d {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 148px;
  height: 200px;
  margin: -100px 0 0 -74px;
  transform-style: preserve-3d;
  transform: translateX(var(--deck-shift)) translateY(var(--deck-rise)) scale(var(--deck-scale)) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) rotateZ(var(--tilt-z));
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
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

/* a page in the pile: its place is --i (0 in front), its lean --r; the transition carries it to a new
   place when the pile advances or opens on hover. The other inputs are for the page in hand: --lift
   (towards the reader), --par-x / --par-y (a shift), --spin / --turn-y / --flat (rotations about Z, Y
   and X, in that order: the reverse of the pile's, so a page can undo the pile's pose exactly) and
   --shrink for the pages left behind. */
.page-3d {
  --lift: 0px;
  --par-x: 0px;
  --par-y: 0px;
  --spin: 0deg;
  --turn-y: 0deg;
  --flat: 0deg;
  --shrink: 1;

  position: absolute;
  inset: 0;
  will-change: transform, opacity; /* the pages stay composited, so a step starting or ending does not re-raster them */
  transform:
      translate3d(
          calc(var(--i) * var(--dx) + var(--par-x)),
          calc(var(--i) * var(--dy) + var(--par-y)),
          calc(var(--i) * -1 * var(--dz) + var(--lift)))
      rotateZ(calc(var(--r) + var(--spin)))
      rotateY(var(--turn-y))
      rotateX(var(--flat))
      scale(var(--shrink));
  transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.3s ease;
}

/* the page: a faint light from the top-left and a soft shadow onto the page behind; the pages behind the front one are dimmed a touch more
   for each place back, so the pile reads as depth even where the pages overlap */
.page {
  position: absolute;
  inset: 0;
  border-radius: 3px;
  overflow: hidden;
  color: var(--ink);
  background-image: linear-gradient(160deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, calc(0.025 + var(--i) * 0.012)));
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.10),
      0 1px 2px rgba(16, 24, 40, 0.08),
      0 6px 14px -4px rgba(16, 24, 40, 0.22);
  transition: box-shadow 0.45s ease, filter 0.45s ease;
}

html.dark .page {
  box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.06),
      0 1px 2px rgba(0, 0, 0, 0.3),
      0 6px 14px -4px rgba(0, 0, 0, 0.55);
}

/* the shadow the pile throws, well behind the back page (a page returning to the back arrives from 20px
   behind its place and must stay in front of the shadow all the way, or its edge pops as it crosses the
   shadow's plane), offset down and to the right */
.deck-shadow {
  position: absolute;
  inset: 8px -6px -10px 10px;
  border-radius: 8px;
  background: rgba(20, 24, 40, 0.16);
  filter: blur(10px);
  transform: translate3d(calc(var(--last) * var(--dx)), calc(var(--last) * var(--dy)), calc(var(--last) * -1 * var(--dz) - 48px));
  transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
}

html.dark .deck-shadow {
  background: rgba(0, 0, 0, 0.45);
}


/* Shapes: grey placeholders, one accent element per page */
.shape {
  position: absolute;
  display: block;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: currentColor;
  opacity: 0.7;
}

.shape.strong {
  opacity: 1;
}

.shape.soft {
  opacity: 0.5;
}

.shape.accent {
  color: var(--accent-secondary);
  opacity: 0.55;
}

/* a photo: a lighter block with a sheen */
.shape.block {
  opacity: 0.32;
  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 60%);
}

.shape.block.accent {
  opacity: 0.4;
}

.shape.frame,
.shape.ring {
  background: none;
  border-style: solid;
  border-color: currentColor;
}

.shape.frame {
  border-radius: 3px;
  opacity: 0.4;
}

.shape.ring,
.shape.disc {
  border-radius: 50%;
}

.shape.band {
  opacity: 0.1;
}


/* A browse step (1.5s): the page in front stays where it is and fades out over the first 0.45s (a soft
   ease-in-out, so it neither pops nor lingers) while the pile advances beneath it; invisible, it takes the
   place behind the back page and fades in there slowly, over the remaining second, well after the pile
   has closed up: the arrival at the back is the quiet end of the step, not a second event. It does not fly: an earlier version
   lifted the page towards the reader and dissolved it in flight, which was too much motion for a small
   visual. The only movement is a 6px rise off the pile, which keeps the fading page in front of the one
   arriving in its place (the two would otherwise meet in one plane). Place and fade are two animations,
   so the fade has a single easing of its own and the place can jump while the page is out of sight. The
   other pages wait a moment, so the pile is seen to advance under the fading page rather than with it.
   The page leaves from the hand: raised, square to the camera, a touch higher; it lands at the back at
   the receded size (see the pickup rules below). */
.deck.stepping .page-3d:not(.leaving) {
  transition-delay: 0.15s;
}

.page-3d.leaving {
  animation: deck-leave-place 1.5s both, deck-leave-fade 1.5s both;
}

/* the place: at the front, a touch off the pile, until the page is out of sight; then behind the back
   page, from a little further back, sliding into place as it fades in */
@keyframes deck-leave-place {
  0% {
    transform: translate3d(-2px, 10px, 64px) rotateZ(-1deg) rotateY(16deg) rotateX(-6deg) scale(1);
    animation-timing-function: ease-out;
  }

  30% {
    transform: translate3d(-2px, 6px, 76px) rotateZ(-1deg) rotateY(16deg) rotateX(-6deg) scale(1);
    animation-timing-function: step-end;
  }

  31% {
    transform: translate3d(calc(var(--last) * var(--dx)), calc(var(--last) * var(--dy) - 6px), calc(var(--last) * -1 * var(--dz) - 30px)) rotateZ(var(--r)) scale(var(--shrink));
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  100% {
    transform: translate3d(calc(var(--last) * var(--dx)), calc(var(--last) * var(--dy)), calc(var(--last) * -1 * var(--dz) - 10px)) rotateZ(var(--r)) scale(var(--shrink));
  }
}

/* the fade: out over the first 0.45s, out of sight across the jump, then slowly back in over a second */
@keyframes deck-leave-fade {
  0% {
    opacity: 1;
    animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
  }

  30%, 34% {
    opacity: 0;
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  100% {
    opacity: 1;
  }
}


/* Hover: the pile turns towards the reader (rotated X 6, Y -16, Z 1), rises a little and fans open; the
   camera comes closer; the browsing is driven from the script */
.cta-card:is(:hover, :focus-visible) .deck {
  --tilt-x: 6deg;
  --tilt-y: -16deg;
  --tilt-z: 1deg;
  --deck-rise: -4px;
  --dx: 7px;
  --dy: -6px;
  --dz: 20px;
}

.cta-card:is(:hover, :focus-visible) .stage {
  perspective: 500px;
}

/* Pick one up: the front page lifts 64px off the pile and faces the camera square on (Z -1, Y 16, X -6
   undo the pile's pose), shifted so that, projected, it sits centred in the column; a deep shadow under
   it. The pages left behind shrink, sink and dim, so the one in hand is clearly the one in hand. */
.cta-card:is(:hover, :focus-visible) .page-3d.front:not(.leaving) {
  --lift: 64px;
  --par-x: -2px;
  --par-y: 10px;
  --spin: -1deg;
  --turn-y: 16deg;
  --flat: -6deg;
  transition-delay: 0.08s;
}

.cta-card:is(:hover, :focus-visible) .page-3d.front:not(.leaving) .page {
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.10),
      0 2px 4px rgba(16, 24, 40, 0.08),
      0 36px 48px -14px rgba(16, 24, 40, 0.5);
}

.cta-card:is(:hover, :focus-visible) .page-3d:not(.front) {
  --shrink: 0.9;
  --lift: -10px;
}

.cta-card:is(:hover, :focus-visible) .page-3d:not(.front) .page {
  filter: brightness(0.95);
}

/* Colour prints on: while the pointer rests, the pages render in colour one after another from the
   front (headings darken, the accent element brightens, photos take a tint, bands and seals colour);
   on leave the colour drains back from the rear */
.shape {
  transition: color 0.5s ease, opacity 0.5s ease, background-color 0.5s ease;
  transition-delay: calc((5 - var(--i)) * 60ms);
}

.cta-card:is(:hover, :focus-visible) .shape {
  transition-delay: calc(0.1s + var(--i) * 110ms);
}

.cta-card:is(:hover, :focus-visible) .deck {
  .shape.strong { color: var(--ink-strong); }
  .shape.accent { opacity: 1; }
  .shape.block { background-color: color-mix(in srgb, var(--accent) 45%, #C9D0DB); opacity: 0.55; }
  .shape.block.accent { background-color: var(--accent-secondary); opacity: 0.85; }
  .shape.band { background-color: var(--accent-secondary); opacity: 0.09; }
  .shape.ring.strong { color: var(--accent-secondary); }
}



/* Compact: below 700px the column is a 72px tile beside the title; only the flat miniature shows */
.thumb {
  display: none;
}

.mini {
  position: absolute;
  inset: 0;
  color: var(--ink);
}

@media screen and (max-width: 700px) {
  .deck {
    width: 72px;
    height: 72px;
    min-height: 0;
  }

  .stage {
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
}


/* Reduced motion: the pile in its pose, nothing moves (no browsing: see the script) */
@media (prefers-reduced-motion: reduce) {
  .deck .deck-3d {
    transition: none;
    transform: translateX(var(--deck-shift)) translateY(var(--deck-rise)) scale(var(--deck-scale)) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) rotateZ(var(--tilt-z));
  }

  .deck .page-3d {
    transition: none;
    animation: none;
    opacity: 1;
    transform: translate3d(calc(var(--i) * var(--dx)), calc(var(--i) * var(--dy)), calc(var(--i) * -1 * var(--dz))) rotateZ(var(--r));
  }

  .deck-shadow,
  .stage,
  .page,
  .shape {
    transition: none;
  }

  .cta-card:is(:hover, :focus-visible) .deck {
    --tilt-x: 8deg;
    --tilt-y: -26deg;
    --tilt-z: 2deg;
    --deck-rise: 0px;
    --dx: 4px;
    --dy: -4px;
    --dz: 14px;
  }

  .cta-card:is(:hover, :focus-visible) .stage {
    perspective: 640px;
  }

  .cta-card:is(:hover, :focus-visible) .page-3d.front:not(.leaving),
  .cta-card:is(:hover, :focus-visible) .page-3d:not(.front) {
    --lift: 0px;
    --par-x: 0px;
    --par-y: 0px;
    --spin: 0deg;
    --turn-y: 0deg;
    --flat: 0deg;
    --shrink: 1;
  }

  .cta-card:is(:hover, :focus-visible) .page-3d:not(.front) .page {
    filter: none;
  }
}

</style>

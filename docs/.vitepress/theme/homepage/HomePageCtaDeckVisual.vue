<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";

/* The sample-gallery card's visual: a pile of six sample pages in 3D (a report, a certificate, a catalogue,
   a dashboard, a letter, a long table), placeholders with one accent element each, turned to face the
   invoice in the card beside it.

   Hover (`active`, from HomePageCtaCard.vue): the pile turns towards the reader, the front page lifts off it
   to face the camera and colour arrives on the pages. Then the pile browses, one page every 1.3s: the page
   in hand fades out while the next one rises into its place, and reappears at the back. When the pointer
   leaves, the step in progress finishes in the hover pose first; the hover class is the component's own
   for that reason. Reduced motion: the pile stays still. */

const props = defineProps<{ active: boolean }>();

/* hover: the hover pose, which outlasts the pointer until a running step ends. front: the page in front.
   leaving: the page on its way from the front to the back while a step runs (-1: none). */
const hover = ref(false);
const front = ref(0);
const leaving = ref(-1);
const stepping = computed(() => leaving.value >= 0);

/* a shape on a page, in page coordinates (148 x 200): a placeholder bar, or a photo (block), an outline
   (frame), a circle (ring, disc) or a stripe behind a table row (band); one per page takes the accent */
interface Shape {
  kind?: "block" | "frame" | "ring" | "disc" | "band";
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

/* each place in the pile (0 in front) leans a little, so the pile is not a perfect block */
const LAST = pages.length - 1;
const TILTS = [0, 1.2, -1, 0.8, -1.4, 0.6];

const slots = computed(() => pages.map((_, index) => (index - front.value + pages.length) % pages.length));

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

/* the clock, matching the CSS below: a step takes 1.2s, and each page rests in hand about 0.7s before it
   leaves (it is in hand 0.53s after hover, 0.6s into a step), so the first step comes 1.2s after hover and
   the next ones 1.3s apart */
const STEP = 1200;
const FIRST_STEP_DELAY = 1200;
const STEP_INTERVAL = 1300;

let browseTimer: ReturnType<typeof setTimeout> | undefined;
let stepTimer: ReturnType<typeof setTimeout> | undefined;

/* one browse step: the front page leaves (its animation fades it out and brings it back at the rear) and the
   pile advances. The step ends on a timer, not on animationend, which Chrome does not send to a hidden tab;
   the animation holds its end state, so the class may go a little late, never early. */
function step() {
  clearTimeout(stepTimer);

  leaving.value = front.value;
  front.value = (front.value + 1) % pages.length;

  stepTimer = setTimeout(settle, STEP + 50);
}

/* the hover pose was held while the step finished; it goes now if the pointer has left */
function settle() {
  leaving.value = -1;
  hover.value = props.active;
}

function browse(delay: number) {
  browseTimer = setTimeout(() => {
    step();
    browse(STEP_INTERVAL);
  }, delay);
}

watch(() => props.active, isActive => {
  clearTimeout(browseTimer);

  if (isActive && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    hover.value = true;
    browse(FIRST_STEP_DELAY);
  }
  else if (!stepping.value) {
    hover.value = false;
  }
});

onBeforeUnmount(() => {
  clearTimeout(browseTimer);
  clearTimeout(stepTimer);
});
</script>

<template>
  <div class="scene deck" :class="{ hover, stepping }" :style="{ '--last': LAST }">
    <div class="stage">
      <div class="model">
        <div class="shadow" />

        <!-- the stationary blank sheet at the back place -->
        <div class="page-3d blank" :style="{ '--i': LAST, '--r': `${TILTS[LAST]}deg` }">
          <div class="paper page" />
        </div>

        <div
            v-for="(page, index) of pages"
            :key="page.name"
            class="page-3d"
            :class="{ leaving: leaving === index, front: slots[index] === 0 }"
            :style="{ '--i': slots[index], '--r': `${TILTS[slots[index]]}deg` }">
          <div class="paper page">
            <span
                v-for="(shape, shapeIndex) of page.shapes"
                :key="shapeIndex"
                class="shape"
                :class="[shape.kind, shape.tone]"
                :style="shapeStyle(shape)" />
          </div>
        </div>

      </div>
    </div>

    <!-- compact: a flat miniature of the front page, the report -->
    <div class="thumb">
      <div class="paper mini">
        <span class="shape strong" style="left: 8px; top: 8px; width: 30px; height: 6px" />
        <span class="shape soft" style="left: 8px; top: 17px; width: 20px; height: 3px" />
        <span class="shape" style="left: 8px; top: 40px; width: 7px; height: 12px" />
        <span class="shape" style="left: 18px; top: 32px; width: 7px; height: 20px" />
        <span class="shape" style="left: 28px; top: 44px; width: 7px; height: 8px" />
        <span class="shape" style="left: 38px; top: 28px; width: 7px; height: 24px" />
        <span class="shape" style="left: 48px; top: 36px; width: 7px; height: 16px" />
        <span class="shape accent" style="left: 58px; top: 24px; width: 7px; height: 28px" />
        <span class="shape soft" style="left: 8px; top: 52px; width: 57px; height: 1px" />
        <span class="shape" style="left: 8px; top: 60px; width: 56px; height: 3px" />
        <span class="shape soft" style="left: 8px; top: 66px; width: 44px; height: 3px" />
      </div>
    </div>
  </div>
</template>

<style scoped src="./ctaVisual.css"></style>

<style scoped>

/* the pose, the mirror of the invoice beside it; each place back is set back by --dz and shifted by --dx /
   --dy, and the pile is nudged left so its depth stays in the column. --ink-strong: the headings on hover. */
.deck {
  --tilt-y: -26deg;
  --tilt-z: 2deg;
  --shift: -12px;
  --dx: 4px;
  --dy: -4px;
  --dz: 14px;
  --ink-strong: #5A6472;
}

/* the camera comes closer on hover */
.stage {
  transition: perspective 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
}

/* a page in the pile: its place --i (0 in front) and lean --r. The rest is for the page in hand: --lift
   (towards the reader), --par-x / --par-y (a shift), --spin / --turn-y / --flat (rotations about Z, Y and X,
   the reverse of the pile's order, so a page can undo the pile's pose exactly) and --shrink for the pages
   left behind. */
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

/* no shadow per page (six would darken the pile past the invoice beside it); each place back is shaded a
   touch darker instead, so the pile reads as depth */
.page {
  --page-shade: calc(0.025 + var(--i) * 0.012);
  overflow: hidden;
  color: var(--ink);
  box-shadow:
      0 0 0 1px light-dark(rgba(0, 0, 0, 0.10), rgba(255, 255, 255, 0.06)),
      0 1px 2px light-dark(rgba(16, 24, 40, 0.08), rgba(0, 0, 0, 0.3));
  transition: box-shadow 0.45s ease, filter 0.45s ease;
}

/* one shadow for the whole pile, behind the back place and centred on the pile's depth */
.shadow {
  transform: translate3d(calc(var(--last) * var(--dx) / 2), calc(var(--last) * var(--dy) / 2), calc(var(--last) * -1 * var(--dz) - 16px));
  transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
}

/* the blank sheet stands still just behind the back page, so the back place never looks empty while the
   pile advances */
.page-3d.blank {
  --lift: -2px;
}

.deck.hover .page-3d.blank {
  --lift: -12px;
}


/* Shapes: the shared placeholders in more kinds, and the accent */
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


/* A browse step (1.2s): the page in hand fades out where it is while the next one rises into its place, a
   cross-fade, so the hand is never seen empty; out of sight, the page that left jumps to the back place and
   fades in there. Place and fade are separate animations, so the place can jump while the page is invisible.
   A 6px rise keeps the fading page in front of the one arriving (they would otherwise share a plane). The
   rest of the pile advances slowly and a moment later. */
.deck.stepping .page-3d:not(.leaving) {
  transition-duration: 0.7s;
  transition-delay: 0.1s;
}

.deck.hover.stepping .page-3d.front:not(.leaving) {
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition-delay: 0s;
}

.deck.hover.stepping .page-3d.front:not(.leaving) .page {
  transition-duration: 0.6s;
}

.page-3d.leaving {
  animation: deck-leave-place 1.2s both, deck-leave-fade 1.2s both;
}

/* at the front until the page is out of sight, then the back place, settling the last 4px from the front
   (from behind, it would cross the blank sheet's plane and its edge would pop) */
@keyframes deck-leave-place {
  0% {
    transform: translate3d(-2px, 10px, 64px) rotateZ(-1deg) rotateY(16deg) rotateX(-6deg) scale(1);
    animation-timing-function: ease-out;
  }

  35% {
    transform: translate3d(-2px, 6px, 76px) rotateZ(-1deg) rotateY(16deg) rotateX(-6deg) scale(1);
    animation-timing-function: step-end;
  }

  36% {
    transform: translate3d(calc(var(--last) * var(--dx)), calc(var(--last) * var(--dy)), calc(var(--last) * -1 * var(--dz) + var(--lift) + 4px)) rotateZ(var(--r)) scale(var(--shrink));
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  100% {
    transform: translate3d(calc(var(--last) * var(--dx)), calc(var(--last) * var(--dy)), calc(var(--last) * -1 * var(--dz) + var(--lift))) rotateZ(var(--r)) scale(var(--shrink));
  }
}

/* the fade: out over the first 0.42s, out of sight across the jump, then slowly back in over 0.75s */
@keyframes deck-leave-fade {
  0% {
    opacity: 1;
    animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
  }

  35%, 39% {
    opacity: 0;
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  100% {
    opacity: 1;
  }
}


/* Hover: the pile turns towards the reader and fans open, and the camera comes closer */
.deck.hover {
  --tilt-x: 6deg;
  --tilt-y: -16deg;
  --tilt-z: 1deg;
  --rise: -4px;
  --dx: 7px;
  --dy: -6px;
  --dz: 20px;
}

.deck.hover .stage {
  perspective: 500px;
}

/* the front page lifts off the pile and faces the camera square on (its rotations undo the pile's pose),
   centred in the column; the pages left behind shrink, sink and dim */
.deck.hover .page-3d.front:not(.leaving) {
  --lift: 64px;
  --par-x: -2px;
  --par-y: 10px;
  --spin: -1deg;
  --turn-y: 16deg;
  --flat: -6deg;
  transition-delay: 0.08s;
}

.deck.hover .page-3d.front:not(.leaving) .page {
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.10),
      0 2px 4px rgba(16, 24, 40, 0.08),
      0 20px 32px -12px rgba(16, 24, 40, 0.35);
}

.deck.hover .page-3d:not(.front) {
  --shrink: 0.9;
  --lift: -10px;
}

.deck.hover .page-3d:not(.front) .page {
  filter: brightness(0.95);
}

/* colour arrives page by page from the front on hover, and drains back from the rear on leave */
.shape {
  transition: color 0.5s ease, opacity 0.5s ease, background-color 0.5s ease;
  transition-delay: calc((var(--last) - var(--i)) * 60ms);
}

.deck.hover .shape {
  transition-delay: calc(0.1s + var(--i) * 110ms);
}

.deck.hover .shape.strong { color: var(--ink-strong); }
.deck.hover .shape.accent { opacity: 1; }
.deck.hover .shape.block { background-color: color-mix(in srgb, var(--accent) 45%, #C9D0DB); opacity: 0.55; }
.deck.hover .shape.block.accent { background-color: var(--accent-secondary); opacity: 0.85; }
.deck.hover .shape.band { background-color: var(--accent-secondary); opacity: 0.09; }
.deck.hover .shape.ring.strong { color: var(--accent-secondary); }

</style>

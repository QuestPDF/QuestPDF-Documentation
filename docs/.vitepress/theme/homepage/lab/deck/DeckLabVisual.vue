<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/* Lab copy of HomePageCtaDeckVisual.vue (the pile of sample documents) without the magnifying glass, with
   one hover idea per variant on top of the production pose and browse:

   pickup   the front page lifts towards the reader while the pointer rests; the pile browses beneath it and
            each new front page rises to meet the reader in turn
   spread   the pile fans out into a contact sheet of all six documents (no browsing), restacks on leave
   riffle   the browse step is a flip: the front page turns over on its right edge and lands at the back
   colour   colour arrives on the pages in sequence: headings darken, accent elements brighten, photos tint
   tabs     a coloured filing tab slides out of each page's right edge, one colour per document kind
   pointer  the pile tilts with the pointer and the pages parallax by depth

   Several variants can be combined (variant="pickup colour"). Delete with the lab. */

const props = withDefaults(defineProps<{ variant?: string }>(), { variant: "" });
const variants = computed(() => props.variant.split(" ").filter(Boolean));
const has = (name: string) => variants.value.includes(name);

const root = ref<HTMLElement>();
const active = ref(0);
const leaving = ref(-1);
const stepping = ref(false);
const tracking = ref(false);
const turns = ref(0); /* ring: whole turns of the ring so far, so it never spins the long way round */

interface Shape {
  kind?: "bar" | "block" | "frame" | "ring" | "disc" | "band";
  x: number;
  y: number;
  w: number;
  h: number;
  tone?: "strong" | "soft" | "accent";
  r?: number;
  b?: number;
}

interface Page {
  name: string;
  tab: string;
  shapes: Shape[];
}

function cells(y: number, columns: [number, number][], tones: (Shape["tone"] | undefined)[] = [undefined, "soft", "soft", undefined]): Shape[] {
  return columns.map(([x, w], index) => ({ x, y, w, h: 4, tone: tones[index] }));
}

const chartHeights = [30, 46, 24, 58, 40, 68];

const pages: Page[] = [
  {
    name: "report",
    tab: "#5C6BC0",
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
    tab: "#F2A541",
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
    tab: "#26A69A",
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
    tab: "#EC5F7E",
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
    tab: "#66BB6A",
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
    tab: "#78909C",
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

/* the browse clock. The riffle thumbs faster than the fade, the pull-out is slower; the spreads and the
   float do not browse at all; the carousel and the ring step by moving the pages, with no leave flight */
const stepLength = computed(() => has("pullout") ? 1300 : has("riffle") ? 800 : 900);
const firstStepDelay = computed(() => has("riffle") ? 450 : has("ring") || has("carousel") ? 900 : 650);
const stepInterval = computed(() => has("riffle") ? 1400 : has("pullout") ? 2300 : has("ring") || has("carousel") ? 1600 : 1800);
const browses = computed(() => !["spread", "fan", "cascade", "float"].some(has));
const slides = computed(() => has("ring") || has("carousel"));

let hovering = false;
let timer: ReturnType<typeof setTimeout> | undefined;
let stepTimer: ReturnType<typeof setTimeout> | undefined;
let card: HTMLElement | null = null;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clear() {
  if (timer) clearTimeout(timer);
  timer = undefined;
}

function step() {
  if (stepTimer) clearTimeout(stepTimer);
  active.value = (active.value + 1) % pages.length;
  turns.value++;
  if (slides.value) return;

  leaving.value = (active.value + pages.length - 1) % pages.length;
  stepping.value = true;
  stepTimer = setTimeout(settle, stepLength.value + 400);
}

function settle() {
  if (stepTimer) clearTimeout(stepTimer);
  stepTimer = undefined;
  leaving.value = -1;
  stepping.value = false;
}

function onFlightEnd(event: AnimationEvent, index: number) {
  if (event.target === event.currentTarget && leaving.value === index)
    settle();
}

function schedule(delay: number) {
  clear();
  timer = setTimeout(() => {
    if (!hovering) return;
    step();
    schedule(stepInterval.value);
  }, delay);
}

function onEnter() {
  hovering = true;
  if (reducedMotion()) return;
  if (has("pointer")) tracking.value = true;
  if (browses.value) schedule(firstStepDelay.value);
}

function onLeave() {
  hovering = false;
  tracking.value = false;
  root.value?.style.setProperty("--px", "0");
  root.value?.style.setProperty("--py", "0");
  clear();
}

/* pointer variant: where the pointer is over the card, -1..1 each way from its centre */
function onMove(event: MouseEvent) {
  if (!has("pointer") || !card || !root.value) return;
  const rect = card.getBoundingClientRect();
  const px = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  const py = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  root.value.style.setProperty("--px", Math.max(-1, Math.min(1, px)).toFixed(3));
  root.value.style.setProperty("--py", Math.max(-1, Math.min(1, py)).toFixed(3));
}

onMounted(() => {
  card = (root.value?.closest(".cta-card") as HTMLElement | null) ?? null;
  card?.addEventListener("mouseenter", onEnter);
  card?.addEventListener("mouseleave", onLeave);
  card?.addEventListener("mousemove", onMove);
  card?.addEventListener("focus", onEnter);
  card?.addEventListener("blur", onLeave);
});

onBeforeUnmount(() => {
  clear();
  if (stepTimer) clearTimeout(stepTimer);
  card?.removeEventListener("mouseenter", onEnter);
  card?.removeEventListener("mouseleave", onLeave);
  card?.removeEventListener("mousemove", onMove);
  card?.removeEventListener("focus", onEnter);
  card?.removeEventListener("blur", onLeave);
});
</script>

<template>
  <div
      ref="root"
      class="deck"
      :class="[variants.map(v => `variant-${v}`), { stepping, tracking }]"
      :style="{ '--last': LAST, '--px': 0, '--py': 0 }">
    <div class="stage">
      <div class="deck-3d" :style="{ '--turn': `${turns * 60}deg` }">
        <div class="deck-shadow" />

        <div
            v-for="(page, index) of pages"
            :key="page.name"
            class="page-3d"
            :class="[`s${slots[index]}`, { leaving: leaving === index, front: slots[index] === 0 }]"
            :style="{ '--i': slots[index], '--k': index, '--r': `${TILTS[slots[index]]}deg`, '--tab': page.tab }"
            @animationend="onFlightEnd($event, index)">
          <div class="paper page">
            <span
                v-for="(shape, shapeIndex) of page.shapes"
                :key="shapeIndex"
                class="shape"
                :class="[shape.kind ?? 'bar', shape.tone]"
                :style="shapeStyle(shape)" />
          </div>
          <span v-if="has('tabs')" class="tab" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* Pose, pile, pages and shapes: the production rules (see HomePageCtaDeckVisual.vue). The page transform
   has extra inputs the variants drive: --lift (towards the reader), --flat (a tilt back), --turn-y (a turn),
   --shrink (a scale), --par-x / --par-y (a shift) and --deck-bob (the float's bobbing, a registered property
   so it can be animated). */
@property --deck-bob {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}

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

.paper {
  background: #FFF;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.10);
}

html.dark .paper {
  background: #F4F4F6;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.page-3d {
  --lift: 0px;
  --flat: 0deg;
  --turn-y: 0deg;
  --spin: 0deg;
  --shrink: 1;
  --par-x: 0px;
  --par-y: 0px;

  position: absolute;
  inset: 0;
  will-change: transform, opacity;
  transform:
      translate3d(
          calc(var(--i) * var(--dx) + var(--par-x)),
          calc(var(--i) * var(--dy) + var(--par-y) + var(--deck-bob)),
          calc(var(--i) * -1 * var(--dz) + var(--lift)))
      rotateZ(calc(var(--r) + var(--spin)))
      rotateY(var(--turn-y))
      rotateX(var(--flat))
      scale(var(--shrink));
  transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.3s ease;
}

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

.shape {
  position: absolute;
  display: block;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: currentColor;
  opacity: 0.7;
}

.shape.strong { opacity: 1; }
.shape.soft { opacity: 0.5; }

.shape.accent {
  color: var(--accent-secondary);
  opacity: 0.55;
}

.shape.block {
  opacity: 0.32;
  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 60%);
}

.shape.block.accent { opacity: 0.4; }

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
.shape.disc { border-radius: 50%; }

.shape.band { opacity: 0.1; }


/* The browse step, as in production: the front page fades where it lies, the pile advances beneath it,
   and it fades back in at the rear */
.deck.stepping .page-3d:not(.leaving) {
  transition-delay: 0.15s;
}

.page-3d.leaving {
  animation: deck-leave-place 0.9s both, deck-leave-fade 0.9s both;
}

@keyframes deck-leave-place {
  0% {
    transform: translate3d(0, 0, 0) rotateZ(0deg);
    animation-timing-function: ease-out;
  }

  50% {
    transform: translate3d(0, 0, 6px) rotateZ(0deg);
    animation-timing-function: step-end;
  }

  52% {
    transform: translate3d(calc(var(--last) * var(--dx)), calc(var(--last) * var(--dy) - 6px), calc(var(--last) * -1 * var(--dz) - 20px)) rotateZ(var(--r));
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  100% {
    transform: translate3d(calc(var(--last) * var(--dx)), calc(var(--last) * var(--dy)), calc(var(--last) * -1 * var(--dz))) rotateZ(var(--r));
  }
}

@keyframes deck-leave-fade {
  0% {
    opacity: 1;
    animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
  }

  50%, 56% {
    opacity: 0;
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  100% {
    opacity: 1;
  }
}


/* Hover: the pile turns towards the reader, rises a little and fans open */
.cta-card:is(:hover, :focus-visible) .deck {
  --tilt-x: 4deg;
  --tilt-y: -14deg;
  --tilt-z: 1deg;
  --deck-rise: -4px;
  --dx: 7px;
  --dy: -6px;
  --dz: 20px;
}


/* ---- pickup: the front page comes up to meet the reader; the rest of the pile recedes ----
   The page lifts 64px off the pile and turns to face the camera square on: its own rotations are the
   pile's hover pose undone (the pile is rotated X 6, Y -16, Z 1; the page rotates Z -1, Y 16, X -6, in
   that order). It throws a deep shadow, and the camera moves closer (a shorter perspective), so the lift
   reads as depth, not size. The pages left behind shrink a touch, sink a little and dim. */

.cta-card:is(:hover, :focus-visible) .deck.variant-pickup {
  --tilt-x: 6deg;
  --tilt-y: -16deg;
}

.cta-card:is(:hover, :focus-visible) .deck.variant-pickup .stage {
  perspective: 500px;
}

.cta-card:is(:hover, :focus-visible) .deck.variant-pickup .page-3d.front:not(.leaving) {
  --lift: 64px;
  --par-x: -2px;
  --par-y: 10px;
  --spin: -1deg;
  --turn-y: 16deg;
  --flat: -6deg;
  transition-delay: 0.08s;
}

.cta-card:is(:hover, :focus-visible) .deck.variant-pickup .page-3d.front:not(.leaving) .page {
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.10),
      0 2px 4px rgba(16, 24, 40, 0.08),
      0 36px 48px -14px rgba(16, 24, 40, 0.5);
}

.cta-card:is(:hover, :focus-visible) .deck.variant-pickup .page-3d:not(.front) {
  --shrink: 0.9;
  --lift: -10px;
}

.cta-card:is(:hover, :focus-visible) .deck.variant-pickup .page-3d:not(.front) .page {
  filter: brightness(0.95);
}

/* a lifted page leaves from where it is: raised, tilted, a touch higher; it lands at the back at the
   receded size */
.variant-pickup .page-3d.leaving {
  animation-name: deck-leave-place-lifted, deck-leave-fade;
}

@keyframes deck-leave-place-lifted {
  0% {
    transform: translate3d(-2px, 10px, 64px) rotateZ(-1deg) rotateY(16deg) rotateX(-6deg) scale(1);
    animation-timing-function: ease-out;
  }

  50% {
    transform: translate3d(-2px, 6px, 76px) rotateZ(-1deg) rotateY(16deg) rotateX(-6deg) scale(1);
    animation-timing-function: step-end;
  }

  52% {
    transform: translate3d(calc(var(--last) * var(--dx)), calc(var(--last) * var(--dy) - 6px), calc(var(--last) * -1 * var(--dz) - 30px)) rotateZ(var(--r)) scale(var(--shrink));
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  100% {
    transform: translate3d(calc(var(--last) * var(--dx)), calc(var(--last) * var(--dy)), calc(var(--last) * -1 * var(--dz) - 10px)) rotateZ(var(--r)) scale(var(--shrink));
  }
}


/* ---- spread: a contact sheet of all six, three by two, on a pile turned almost flat to the reader ---- */

.cta-card:is(:hover, :focus-visible) .deck.variant-spread {
  --tilt-x: 3deg;
  --tilt-y: -6deg;
  --tilt-z: 0deg;
  --deck-rise: 0px;
}

.variant-spread .page-3d {
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.3s ease;
  transition-delay: calc((5 - var(--i)) * 35ms); /* the back pages go first when restacking */
}

.cta-card:is(:hover, :focus-visible) .deck.variant-spread .page-3d {
  transition-delay: calc(var(--i) * 45ms); /* the front page goes first when spreading */
}

.cta-card:is(:hover, :focus-visible) .deck.variant-spread .s0 { transform: translate3d(-100px, -54px, 0px) scale(0.48) rotateZ(-1.5deg); }
.cta-card:is(:hover, :focus-visible) .deck.variant-spread .s1 { transform: translate3d(0px, -54px, -1px) scale(0.48) rotateZ(1deg); }
.cta-card:is(:hover, :focus-visible) .deck.variant-spread .s2 { transform: translate3d(100px, -54px, -2px) scale(0.48) rotateZ(-1deg); }
.cta-card:is(:hover, :focus-visible) .deck.variant-spread .s3 { transform: translate3d(-100px, 54px, -3px) scale(0.48) rotateZ(1.2deg); }
.cta-card:is(:hover, :focus-visible) .deck.variant-spread .s4 { transform: translate3d(0px, 54px, -4px) scale(0.48) rotateZ(-1.2deg); }
.cta-card:is(:hover, :focus-visible) .deck.variant-spread .s5 { transform: translate3d(100px, 54px, -5px) scale(0.48) rotateZ(0.8deg); }

/* the pile's shadow spreads into a soft pool under the sheet */
.cta-card:is(:hover, :focus-visible) .deck.variant-spread .deck-shadow {
  transform: translate3d(0, 0, -48px) scale(2, 1.2);
  opacity: 0.6;
}

.variant-spread .deck-shadow {
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.6s ease;
}


/* ---- riffle: the browse step is a flip about the right edge ---- */

.variant-riffle .page-3d {
  transform-origin: 100% 50%;
  backface-visibility: hidden;
}

.variant-riffle .page-3d.leaving {
  animation: deck-riffle-place 0.8s both, deck-riffle-fade 0.8s both;
}

/* the left edge lifts towards the reader and the page turns over past edge-on, then (hidden by its
   backface) it is already at the rear, settling into place as it fades back in */
@keyframes deck-riffle-place {
  0% {
    transform: translate3d(0, 0, 0) rotateY(0deg);
    animation-timing-function: cubic-bezier(0.5, 0, 0.75, 0.4);
  }

  50% {
    transform: translate3d(0, 0, 12px) rotateY(108deg);
    animation-timing-function: step-end;
  }

  52% {
    transform: translate3d(calc(var(--last) * var(--dx)), calc(var(--last) * var(--dy) - 4px), calc(var(--last) * -1 * var(--dz) - 24px)) rotateY(0deg) rotateZ(var(--r));
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  100% {
    transform: translate3d(calc(var(--last) * var(--dx)), calc(var(--last) * var(--dy)), calc(var(--last) * -1 * var(--dz))) rotateY(0deg) rotateZ(var(--r));
  }
}

@keyframes deck-riffle-fade {
  0%, 46% {
    opacity: 1;
  }

  50%, 56% {
    opacity: 0;
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  100% {
    opacity: 1;
  }
}

.variant-riffle.stepping .page-3d:not(.leaving) {
  transition-delay: 0.2s;
}


/* ---- colour: the samples are rendered in colour while the pointer rests, one page after another ---- */

.variant-colour .shape {
  transition: color 0.5s ease, opacity 0.5s ease, background-color 0.5s ease;
  transition-delay: calc((5 - var(--i)) * 60ms);
}

.cta-card:is(:hover, :focus-visible) .deck.variant-colour .shape {
  transition-delay: calc(0.1s + var(--i) * 110ms);
}

.cta-card:is(:hover, :focus-visible) .deck.variant-colour {
  .shape.strong { color: var(--ink-strong); }
  .shape.accent { opacity: 1; }
  .shape.block { background-color: color-mix(in srgb, var(--accent) 45%, #C9D0DB); opacity: 0.55; }
  .shape.block.accent { background-color: var(--accent-secondary); opacity: 0.85; }
  .shape.band { background-color: var(--accent-secondary); opacity: 0.09; }
  .shape.ring.strong { color: var(--accent-secondary); }
}


/* ---- tabs: a filing tab on each page's right edge, one colour per document ---- */

.tab {
  position: absolute;
  left: 100%;
  top: calc(14px + var(--i) * 26px);
  width: 16px;
  height: 22px;
  border-radius: 0 5px 5px 0;
  background: var(--tab);
  box-shadow: 0 2px 6px -2px rgba(16, 24, 40, 0.4);
  transform: translateX(-16px);
  opacity: 0;
  transition: transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.25s ease, top 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: 0s;
}

.cta-card:is(:hover, :focus-visible) .deck.variant-tabs .tab {
  transform: translateX(-3px);
  opacity: 1;
  transition-delay: calc(0.15s + var(--i) * 55ms);
}

/* the pile opens a little further, so each tab clears the page in front of it */
.cta-card:is(:hover, :focus-visible) .deck.variant-tabs {
  --dx: 9px;
  --dy: -7px;
}


/* ---- pointer: the pile follows the pointer; pages parallax by depth ---- */

.deck.variant-pointer.tracking {
  --tilt-x: calc(4deg - var(--py) * 7deg);
  --tilt-y: calc(-14deg + var(--px) * 10deg);
}

.deck.variant-pointer.tracking .deck-3d {
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
}

.deck.variant-pointer.tracking .page-3d {
  --par-x: calc(var(--i) * var(--px) * -2.2px);
  --par-y: calc(var(--i) * var(--py) * -1.6px);
  transition-duration: 0.3s;
}

.deck.variant-pointer.tracking .deck-shadow {
  transform: translate3d(calc(var(--last) * var(--dx) + var(--px) * -10px), calc(var(--last) * var(--dy) + var(--py) * -8px), calc(var(--last) * -1 * var(--dz) - 48px));
  transition-duration: 0.3s;
}


/* ---- fan: a hand of cards; the pages pivot about a point well below the pile ---- */

.cta-card:is(:hover, :focus-visible) .deck.variant-fan {
  --tilt-x: 3deg;
  --tilt-y: -6deg;
  --tilt-z: 0deg;
  --deck-scale: 0.74;
  --deck-rise: -4px;
}

.variant-fan .page-3d {
  transform-origin: 50% 125%;
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.3s ease;
  transition-delay: calc((5 - var(--i)) * 30ms);
}

.cta-card:is(:hover, :focus-visible) .deck.variant-fan .page-3d {
  transform: rotateZ(calc((var(--i) - 2.5) * 8deg)) translateZ(calc(var(--i) * -2px));
  transition-delay: calc(var(--i) * 40ms);
}


/* ---- cascade: the pile slides open like a stack of windows, each page peeking out above the one in
   front of it; the front page stays in hand at the bottom right ---- */

.cta-card:is(:hover, :focus-visible) .deck.variant-cascade {
  --tilt-x: 4deg;
  --tilt-y: -10deg;
  --tilt-z: 0deg;
  --deck-scale: 0.72;
  --deck-shift: 14px;
  --deck-rise: 26px;
}

.variant-cascade .page-3d {
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.3s ease;
  transition-delay: calc((5 - var(--i)) * 30ms);
}

.cta-card:is(:hover, :focus-visible) .deck.variant-cascade .page-3d {
  transform: translate3d(calc(var(--i) * -24px), calc(var(--i) * -17px), calc(var(--i) * -3px)) rotateZ(calc(var(--i) * -0.5deg));
  transition-delay: calc(var(--i) * 40ms);
}


/* ---- carousel: a coverflow; the front page faces the reader, the others recede to each side; the browse
   slides the row one page to the left ---- */

.cta-card:is(:hover, :focus-visible) .deck.variant-carousel {
  --tilt-x: 4deg;
  --tilt-y: -4deg;
  --tilt-z: 0deg;
  --deck-scale: 0.64;
  --deck-shift: 0px;
}

.variant-carousel .page-3d {
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.4s ease;
}

.cta-card:is(:hover, :focus-visible) .deck.variant-carousel .s0 { transform: translate3d(0, 0, 40px) rotateY(0deg); }
.cta-card:is(:hover, :focus-visible) .deck.variant-carousel .s1 { transform: translate3d(100px, 4px, -24px) rotateY(-40deg); }
.cta-card:is(:hover, :focus-visible) .deck.variant-carousel .s2 { transform: translate3d(156px, 8px, -90px) rotateY(-50deg); }
.cta-card:is(:hover, :focus-visible) .deck.variant-carousel .s3 { transform: translate3d(0, 10px, -150px) rotateY(0deg); opacity: 0; }
.cta-card:is(:hover, :focus-visible) .deck.variant-carousel .s4 { transform: translate3d(-156px, 8px, -90px) rotateY(50deg); }
.cta-card:is(:hover, :focus-visible) .deck.variant-carousel .s5 { transform: translate3d(-100px, 4px, -24px) rotateY(40deg); }

.cta-card:is(:hover, :focus-visible) .deck.variant-carousel .deck-shadow {
  transform: translate3d(0, 20px, -100px) scale(2.6, 1.1);
  opacity: 0.5;
}

.variant-carousel .deck-shadow {
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.6s ease;
}


/* ---- ring: the six pages stand on a ring around a vertical axis, the front one facing the reader; each
   browse step turns the whole ring by a sixth. The pages keep their own place on the ring (--k, not the
   slot), the ring itself turns (--turn, counted up, never reduced, so it never spins back the long way). ---- */

.cta-card:is(:hover, :focus-visible) .deck.variant-ring {
  --tilt-x: 12deg;
  --tilt-y: 0deg;
  --tilt-z: 0deg;
  --deck-scale: 0.56;
  --deck-shift: 0px;
  --deck-rise: 6px;
}

.cta-card:is(:hover, :focus-visible) .deck.variant-ring .deck-3d {
  transform: translateX(var(--deck-shift)) translateY(var(--deck-rise)) scale(var(--deck-scale)) rotateX(var(--tilt-x)) rotateY(calc(var(--tilt-y) - var(--turn))) rotateZ(var(--tilt-z));
  transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.variant-ring .page-3d {
  backface-visibility: hidden;
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.3s ease;
}

.cta-card:is(:hover, :focus-visible) .deck.variant-ring .page-3d {
  transform: rotateY(calc(var(--k) * 60deg)) translateZ(156px);
}

.cta-card:is(:hover, :focus-visible) .deck.variant-ring .deck-shadow {
  opacity: 0;
}

.variant-ring .deck-shadow {
  transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
}


/* ---- pullout: the front page is drawn out of the pile sideways, shown, then slipped in at the back ---- */

.cta-card:is(:hover, :focus-visible) .deck.variant-pullout {
  --tilt-x: 5deg;
  --tilt-y: -12deg;
  --deck-scale: 0.78;
  --deck-shift: -24px;
}

.variant-pullout .page-3d.leaving {
  animation: deck-pull-place 1.3s both, deck-pull-fade 1.3s both;
}

/* the pile closes up only once the page is well out */
.variant-pullout.stepping .page-3d:not(.leaving) {
  transition-delay: 0.45s;
}

@keyframes deck-pull-place {
  0% {
    transform: translate3d(0, 0, 0) rotateY(0deg);
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  36% {
    transform: translate3d(82px, -10px, 30px) rotateY(-16deg);
    animation-timing-function: ease-in-out;
  }

  54% {
    transform: translate3d(82px, -10px, 30px) rotateY(-16deg);
    animation-timing-function: ease-in;
  }

  70% {
    transform: translate3d(110px, 8px, -30px) rotateY(-8deg);
    animation-timing-function: step-end;
  }

  72% {
    transform: translate3d(calc(var(--last) * var(--dx) + 14px), calc(var(--last) * var(--dy) - 4px), calc(var(--last) * -1 * var(--dz) - 30px)) rotateZ(var(--r));
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  100% {
    transform: translate3d(calc(var(--last) * var(--dx)), calc(var(--last) * var(--dy)), calc(var(--last) * -1 * var(--dz))) rotateZ(var(--r));
  }
}

@keyframes deck-pull-fade {
  0%, 58% {
    opacity: 1;
    animation-timing-function: ease-in;
  }

  70%, 74% {
    opacity: 0;
    animation-timing-function: ease-out;
  }

  100% {
    opacity: 1;
  }
}


/* ---- float: the pile comes apart in depth and the pages hover, each bobbing on its own beat ---- */

.cta-card:is(:hover, :focus-visible) .deck.variant-float {
  --tilt-x: 7deg;
  --tilt-y: -22deg;
  --tilt-z: 1deg;
  --deck-scale: 0.8;
  --deck-shift: -22px;
  --dx: 12px;
  --dy: -11px;
  --dz: 38px;
}

.variant-float .page-3d {
  transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.3s ease;
  animation: deck-bob 2.8s ease-in-out infinite alternate paused;
  animation-delay: calc(var(--i) * -0.7s);
}

.cta-card:is(:hover, :focus-visible) .deck.variant-float .page-3d {
  animation-play-state: running;
}

.cta-card:is(:hover, :focus-visible) .deck.variant-float .page {
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.10),
      0 2px 4px rgba(16, 24, 40, 0.06),
      0 18px 28px -8px rgba(16, 24, 40, 0.3);
}

@keyframes deck-bob {
  from { --deck-bob: -4px; }
  to { --deck-bob: 4px; }
}


/* Compact: below 700px, keep it simple in the lab: the pile scaled into the tile */
@media screen and (max-width: 700px) {
  .deck {
    width: 72px;
    height: 72px;
    min-height: 0;
  }

  .deck-3d {
    --deck-scale: 0.3;
  }
}


/* Reduced motion: the pile in its pose, nothing moves */
@media (prefers-reduced-motion: reduce) {
  .deck .deck-3d,
  .deck .page-3d,
  .deck-shadow,
  .tab,
  .shape {
    transition: none;
    animation: none;
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
}

</style>

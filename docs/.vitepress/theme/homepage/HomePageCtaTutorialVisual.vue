<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { reducedMotion, Timeline } from "./ctaTimeline";

/* The invoice-tutorial card's visual, standing in for HomePageCtaBuildVisual.vue until the video ships: the same
   invoice page in 3D, assembled section by section as the tutorial builds it; a section lands in the accent colour
   and settles to ink. A pass runs on hover (and again after a rest while the pointer stays) and once when the card
   comes into view on a device without hover; it always finishes. Reduced motion: the finished page, nothing moves. */

const props = defineProps<{ active: boolean; visible: boolean }>();
const playing = computed(() => props.active || props.visible);
const root = ref<HTMLElement>();

/* the sections in page coordinates (148 x 200): where each sits, its delay after the first, and its bars */
interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Bar extends Box {
  tone?: "strong" | "soft" | "accent";
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
  /* the title block; the logo keeps the accent */
  {
    x: 10, y: 12, w: 128, h: 30, delay: 0,
    bars: [
      { x: 2, y: 4, w: 14, h: 14, tone: "accent" },
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

function box(item: Box) {
  return { left: `${item.x}px`, top: `${item.y}px`, width: `${item.w}px`, height: `${item.h}px` };
}

/* a pass: the content fades out (0.2s), then the sections land one after another (0.7s each, the last starting
   0.95s in), each in a soft tint of the accent that fades to ink once it is half way down, so only a few are tinted
   at a time; while hovered, the next pass follows a rest; see ctaTimeline.ts for the waits */
const FADE = 200;
const LAND = 700;
const TINT = 850;
const TINT_HOLD = 350;
const TINT_COLOR = "color-mix(in srgb, var(--accent-secondary) 55%, var(--ink))";
const REST = 2600;
const LAND_EASING = "cubic-bezier(0.3, 0.6, 0.15, 1)";

const timeline = new Timeline();
let busy = false;

async function pass() {
  busy = true;

  const targets = [...root.value!.querySelectorAll(".section")];

  const fades = targets.map(section => timeline.animate(section, [{ opacity: 1 }, { opacity: 0 }], { duration: FADE, easing: "ease-out", fill: "both" }));

  if (!await Timeline.settled(fades))
    return;

  const landings = targets.flatMap((section, index) => [
    timeline.animate(section, [
      { transform: "translateZ(var(--lift))", opacity: 0, easing: LAND_EASING },
      { opacity: 1, offset: 0.4, easing: LAND_EASING },
      { transform: "translateZ(0)", opacity: 1 }
    ], { duration: LAND, delay: sections[index].delay * 1000, fill: "both" }),
    timeline.animate(section, [
      { color: TINT_COLOR },
      { color: TINT_COLOR, offset: TINT_HOLD / TINT, easing: "ease-out" },
      { color: "var(--ink)" }
    ], { duration: TINT, delay: sections[index].delay * 1000, fill: "both" })
  ]);

  fades.forEach(fade => fade.cancel()); /* each landing holds its section invisible until its turn */

  if (!await Timeline.settled(landings))
    return;

  landings.forEach(landing => landing.cancel()); /* their end state is the page's own */
  busy = false;

  if (props.active)
    rest();
}

async function rest() {
  const wait = timeline.wait(root.value!, REST);

  if (await Timeline.settled([wait]) && props.active && !busy)
    pass();
}

watch(playing, isPlaying => {
  if (isPlaying && !busy && !reducedMotion())
    pass();
});

onBeforeUnmount(() => timeline.cancel());
</script>

<template>
  <div ref="root" class="scene tutorial" :class="{ active: playing }">
    <div class="stage">
      <div class="model">
        <div class="shadow" />
        <div class="paper page" />

        <div v-for="(section, index) of sections" :key="index" class="section" :style="box(section)">
          <span v-for="(bar, barIndex) of section.bars" :key="barIndex" class="shape" :class="bar.tone" :style="box(bar)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./ctaVisual.css"></style>

<style scoped>

/* the pose; the rest is shared, see ctaVisual.css */
.tutorial {
  --tilt-y: 26deg;
  --tilt-z: -2deg;
  --lift: 56px; /* how far in front of the page a section starts */
}

.section {
  position: absolute;
  color: var(--ink);
}

/* set outright, so a section's colour animation leaves it alone */
.shape.accent {
  color: var(--accent-secondary);
  opacity: 1;
}

/* Hover */
@media (prefers-reduced-motion: no-preference) {
  .tutorial.active {
    --tilt-x: 4deg;
    --tilt-y: 14deg;
    --tilt-z: -1deg;
    --rise: -4px;
  }
}

</style>

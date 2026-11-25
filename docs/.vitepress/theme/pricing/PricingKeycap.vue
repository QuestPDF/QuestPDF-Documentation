<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId } from "vue";
import { observeOnScreen, reducedMotion } from "../homepage/ctaTimeline";

/* A single key with a question mark, in the materials of the homepage's stacked slabs. The key is a rounded square
   drawn flat and laid down by `plane`, so its corners and its glyph follow the projection: turned a little to the
   left and seen from above, which keeps the glyph close to upright. Angles in degrees, sizes in plane units. The
   figure is as wide as its container. */
const id = useId();

const side = 132, corner = 22, height = 34, travel = 9;
const centre = 90, top = 58;

const turn = 20 * Math.PI / 180, pitch = 42 * Math.PI / 180;
const a = Math.cos(turn), b = Math.sin(turn) * Math.sin(pitch);
const c = -Math.sin(turn), d = Math.cos(turn) * Math.sin(pitch);
const rise = Math.cos(pitch); /* screen units per unit of height */

const plane = (y: number) => `matrix(${a.toFixed(4)} ${b.toFixed(4)} ${c.toFixed(4)} ${d.toFixed(4)} ${centre} ${y.toFixed(2)})`;

/* the key's rightmost point on screen, from its centre: on the far right corner's rounding. The leftmost mirrors it. */
const flat = side / 2 - corner;
const reach = {
  x: a * (flat + corner * a) + c * (corner * c - flat),
  y: b * (flat + corner * a) + d * (corner * c - flat)
};

/* the walls between two levels: a band from the leftmost point to the rightmost, under the top and over the base */
const wall = (from: number, to: number) => [
  [centre - reach.x, from - reach.y], [centre + reach.x, from + reach.y],
  [centre + reach.x, to + reach.y], [centre - reach.x, to - reach.y]
].map(point => point.map(value => value.toFixed(2)).join(",")).join(" ");

/* in two parts: the collar travels with the top, the rest stays, and they overlap by a unit */
const pressed = top + travel * rise, base = top + height * rise;
const collar = wall(top, pressed + 1);
const body = wall(pressed, base);

/* where the front wall turns into the side wall, as a share of the key's width */
const turnAt = ((a + c) * side / 2 + reach.x) / (2 * reach.x);

/* the walls' shading runs across the screen. A shape laid down by `plane` reads a gradient in its own flat
   coordinates, so the base gets the same gradient restated there: along (a, c), the direction that is horizontal on
   screen. */
const across = { x1: centre - reach.x, y1: 0, x2: centre + reach.x, y2: 0 };
const acrossFlat = { x1: -reach.x * a, y1: -reach.x * c, x2: reach.x * a, y2: reach.x * c };

const square = { x: -side / 2, y: -side / 2, width: side, height: side, rx: corner };
const inset = 14;
const dish = { x: inset - side / 2, y: inset - side / 2, width: side - 2 * inset, height: side - 2 * inset, rx: corner - 8 };

const root = ref<HTMLElement>();
const running = ref(false);
let visibility: IntersectionObserver | undefined;

onMounted(() => {
  if (reducedMotion()) return;
  visibility = observeOnScreen(root.value!, onScreen => running.value = onScreen);
});

onBeforeUnmount(() => visibility?.disconnect());
</script>

<template>
  <div ref="root" class="keycap" :class="{ running }" :style="{ '--travel': `${(travel * rise).toFixed(2)}px` }" aria-hidden="true">
    <svg viewBox="0 0 180 150">
      <defs>
        <linearGradient :id="`${id}-wall`" gradientUnits="userSpaceOnUse" v-bind="across">
          <stop class="wall-front" :offset="turnAt - 0.05" />
          <stop class="wall-side" :offset="turnAt + 0.05" />
        </linearGradient>
        <linearGradient :id="`${id}-wall-flat`" gradientUnits="userSpaceOnUse" v-bind="acrossFlat">
          <stop class="wall-front" :offset="turnAt - 0.05" />
          <stop class="wall-side" :offset="turnAt + 0.05" />
        </linearGradient>
        <linearGradient :id="`${id}-dish`" x1="0" y1="0" x2="1" y2="1">
          <stop class="dish-far" offset="0" />
          <stop class="dish-near" offset="1" />
        </linearGradient>
      </defs>

      <rect class="shadow" v-bind="square" :transform="plane(base + 10)" />

      <!-- the outline is a stroke drawn under the fills, so only its outer half shows; the group carries the opacity,
           so the three shapes do not darken each other where they overlap -->
      <g class="outline">
        <rect v-bind="square" :transform="plane(base)" />
        <polygon :points="body" />
        <polygon class="cap" :points="collar" />
      </g>

      <rect v-bind="square" :transform="plane(base)" :fill="`url(#${id}-wall-flat)`" />
      <polygon :points="body" :fill="`url(#${id}-wall)`" />

      <g class="cap">
        <polygon :points="collar" :fill="`url(#${id}-wall)`" />

        <g :transform="plane(top)">
          <rect class="face" v-bind="square" />
          <rect class="dish" v-bind="dish" :fill="`url(#${id}-dish)`" />
          <text class="glyph" x="0" y="3" text-anchor="middle" dominant-baseline="central">?</text>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>

.keycap {
  user-select: none;
}

svg {
  display: block;
  width: 100%;
  overflow: visible;
}

.outline {
  fill: var(--vp-c-text-1);
  stroke: var(--vp-c-text-1);
  stroke-width: 2;
  stroke-linejoin: round;
  opacity: 0.26;
}

html.dark .outline {
  opacity: 0.16;
}

.wall-front {
  stop-color: light-dark(#DCE2EB, #2B2D34);
}

.wall-side {
  stop-color: light-dark(#C3CCD9, #23252B);
}

.face {
  fill: light-dark(#FFFFFF, #353740);
  stroke: light-dark(
      color-mix(in srgb, var(--vp-c-text-1) 26%, transparent),
      color-mix(in srgb, var(--vp-c-text-1) 16%, transparent));
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.dish {
  stroke: color-mix(in srgb, var(--vp-c-text-1) 10%, transparent);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.dish-far {
  stop-color: light-dark(#E9EDF3, #2F3138);
}

.dish-near {
  stop-color: light-dark(#FFFFFF, #3A3C46);
}

.glyph {
  fill: light-dark(#1976D2, #64B5F6);
  font-family: var(--vp-font-family-base);
  font-size: 84px;
  font-weight: 700;
}

.shadow {
  fill: light-dark(rgba(16, 24, 40, 0.24), rgba(0, 0, 0, 0.26));
  filter: blur(8px);
}


/* Motion: one press every few seconds, while the key is on screen */

.cap {
  animation: key-press 5.2s 1.2s infinite;
  animation-play-state: paused;
}

.running .cap {
  animation-play-state: running;
}

@keyframes key-press {
  0%, 60%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.3, 0, 0.7, 0.4); }
  62.5%, 66% { transform: translateY(var(--travel)); animation-timing-function: cubic-bezier(0.2, 0.9, 0.3, 1.4); }
  72% { transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .cap {
    animation: none;
  }
}

</style>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { featureCategories } from "../features";
import { observeOnScreen, reducedMotion } from "./ctaTimeline";

const featureCount = featureCategories.reduce((count, category) => count + category.features.length, 0);

/* Tilted orbits around a sun half-sunk in the card's bottom edge. Each orbit turns at its own, very slow pace
   (seconds per turn); its planets sit at uneven but fixed gaps. */
const squash = 0.55;
const orbits = [
  { radius: 130, planets: 6, period: 240 },
  { radius: 220, planets: 9, period: 360 },
  { radius: 310, planets: 11, period: 480 },
  { radius: 400, planets: 14, period: 600 }
];

const noise = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const planets = orbits.flatMap((orbit, o) => Array.from({ length: orbit.planets }, (_, i) => ({
  orbit,
  start: o * 29 + (i + (noise(o * 7 + i + 5) - 0.5) * 0.7) * 360 / orbit.planets
})));

const card = ref<HTMLElement>();
const text = ref<HTMLElement>();
const dots: HTMLElement[] = [];
const fade = ref<number>();
const scale = ref(1); /* narrow cards shrink the orbits so more planets fit */

let frame = 0;
let elapsed = 0;
let last = 0;
let visibility: IntersectionObserver | undefined;
let resize: ResizeObserver | undefined;

function place(seconds: number) {
  planets.forEach((planet, index) => {
    const angle = (planet.start + seconds / planet.orbit.period * 360) * Math.PI / 180;
    const x = planet.orbit.radius * scale.value * Math.cos(angle);
    const y = planet.orbit.radius * scale.value * squash * Math.sin(angle);
    dots[index].style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  });
}

function tick(now: number) {
  if (last) elapsed += Math.min(now - last, 100) / 1000;
  last = now;
  place(elapsed);
  frame = requestAnimationFrame(tick);
}

function stop() {
  cancelAnimationFrame(frame);
  frame = 0;
  last = 0;
}

onMounted(() => {
  place(0);

  resize = new ResizeObserver(() => {
    fade.value = text.value!.offsetTop + text.value!.offsetHeight;
    scale.value = Math.min(1, Math.max(0.78, card.value!.offsetWidth / 520));
    place(elapsed);
  });
  resize.observe(card.value!);

  if (reducedMotion()) return;

  /* moves only while the card is mostly on screen */
  visibility = observeOnScreen(card.value!, onScreen => {
    if (!onScreen) stop();
    else if (!frame) frame = requestAnimationFrame(tick);
  });
});

onBeforeUnmount(() => {
  visibility?.disconnect();
  resize?.disconnect();
  stop();
});
</script>

<template>
  <article ref="card" class="panel api-orbit-card" :style="fade ? { '--fade': `${fade}px`, '--sun-size': `${72 * scale}px` } : undefined">
    <div ref="text" class="orbit-text">
      <h2 class="card-title">{{ featureCount }}+ document features</h2>
      <p class="card-description">Precise typography, flexible layouts, rich visual content and fine control over every page. Everything you need to build professional documents.</p>
      <a class="action primary" href="/features-overview.html">Explore features</a>
    </div>

    <div class="sky" aria-hidden="true">
      <span class="glow"></span>

      <svg class="orbits" width="1" height="1" viewBox="0 0 1 1">
        <ellipse v-for="orbit of orbits" :key="orbit.radius" cx="0" cy="0" :rx="orbit.radius * scale" :ry="orbit.radius * scale * squash" />
      </svg>

      <span v-for="(planet, index) of planets" :key="index" :ref="el => dots[index] = el as HTMLElement" class="planet"></span>
    </div>

    <span class="sun" aria-hidden="true"></span>
  </article>
</template>

<style scoped>

.api-orbit-card {
  /* the light theme's planets are paler, so they are larger */
  --planet-size: 11px;
  --wash: light-dark(color-mix(in srgb, #64B5F6 9%, transparent), color-mix(in srgb, #2196F3 9%, transparent));
  --ring: light-dark(color-mix(in srgb, #64B5F6 55%, transparent), color-mix(in srgb, #64B5F6 38%, transparent));
  --rim: light-dark(rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.22));
  --edge: light-dark(rgba(16, 24, 40, 0.08), rgba(255, 255, 255, 0.14));
  --shadow-near: light-dark(rgba(16, 24, 40, 0.04), transparent);
  --planet: light-dark(#8FC6F4, #64B5F6);
  --sun-far: light-dark(rgba(25, 118, 210, 0.35), rgba(0, 0, 0, 0.55));
  --sun-light: light-dark(#A8D5F8, #6DB5F4);
  --sun: light-dark(#74B6F0, #3690E6);
  --sun-deep: light-dark(#5CA5E8, #2374C8);

  min-width: 0;
  min-height: 400px;
  overflow: clip;
}

html.dark .api-orbit-card {
  --planet-size: 8px;
}

.orbit-text {
  position: relative;
  z-index: 1;
}

.card-description {
  text-wrap: pretty;
}

.orbit-text .action {
  margin-top: 24px;
}

/* the orbit layer fills the card and fades out above the text's bottom edge */
.sky {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mask-image: linear-gradient(to bottom, transparent calc(var(--fade, 220px) - 8px), #000 calc(var(--fade, 220px) + 72px));
}

/* a faint wash rising from the bottom edge */
.glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--wash), transparent 55%);
}

.orbits {
  position: absolute;
  left: 50%;
  top: 100%;
  overflow: visible;
}

.orbits ellipse {
  fill: none;
  stroke: var(--ring);
  stroke-width: 2;
  stroke-dasharray: 0 7;
  stroke-linecap: round;
}

.planet {
  position: absolute;
  left: 50%;
  top: 100%;
  width: var(--planet-size);
  height: var(--planet-size);
  margin: calc(var(--planet-size) / -2) 0 0 calc(var(--planet-size) / -2);
  border-radius: 50%;
  background-color: var(--planet);
}

.sun {
  position: absolute;
  left: 50%;
  top: 100%;
  width: var(--sun-size, 72px);
  height: var(--sun-size, 72px);
  translate: -50% -50%;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, var(--sun-light), var(--sun) 58%, var(--sun-deep));
  box-shadow:
      inset 0 1px 0 var(--rim),
      0 0 0 1px var(--edge),
      0 2px 4px var(--shadow-near),
      0 24px 56px -16px var(--sun-far);
}

</style>

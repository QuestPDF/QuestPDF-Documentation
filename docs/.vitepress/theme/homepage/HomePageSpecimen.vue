<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId } from "vue";
import HomePageSeal from "./HomePageSeal.vue";
import { observeOnScreen, reducedMotion } from "./ctaTimeline";

/* A rendered page with the seal stamped on its top corner: the validated output itself, with no accent on the page.
   Width in px, the seal scales with it. With `scan`, a validator's laser sweeps down the sheet and tints what it has
   checked, and the seal stamps once the beam has passed the page. */
const id = useId();

const props = withDefaults(defineProps<{ width?: number; scan?: boolean }>(), { width: 150, scan: false });

const rows = [0, 1, 2, 3, 4];

const root = ref<HTMLElement>();
const running = ref(false);
let visibility: IntersectionObserver | undefined;

onMounted(() => {
  if (!props.scan || reducedMotion()) return;

  /* a third of the sheet is enough: on phones the card clips nearly half of it */
  visibility = observeOnScreen(root.value!, onScreen => running.value = onScreen, 0.35);
});

onBeforeUnmount(() => visibility?.disconnect());
</script>

<template>
  <div ref="root" class="specimen" :class="{ running, scanning: scan }" :style="{ '--w': `${width}px` }" aria-hidden="true">
    <svg class="sheet" viewBox="0 0 148 200">
      <defs>
        <linearGradient :id="`${id}-paper`" x1="0" y1="0" x2="0" y2="1">
          <stop class="paper-top" offset="0" />
          <stop class="paper-bottom" offset="1" />
        </linearGradient>
        <linearGradient :id="`${id}-glow`" x1="0" y1="0" x2="0" y2="1">
          <stop class="glow-stop" offset="0" stop-opacity="0" />
          <stop class="glow-stop" offset="0.5" stop-opacity="0.4" />
          <stop class="glow-stop" offset="1" stop-opacity="0" />
        </linearGradient>
        <clipPath :id="`${id}-page`">
          <rect x="0.5" y="0.5" width="147" height="199" rx="3" />
        </clipPath>
      </defs>

      <rect class="paper" x="0.5" y="0.5" width="147" height="199" rx="3" :fill="`url(#${id}-paper)`" />

      <rect class="bar strong" x="14" y="16" width="48" height="7" rx="1.5" />
      <rect class="bar soft" x="14" y="28" width="30" height="3" rx="1" />
      <rect class="bar" x="100" y="16" width="34" height="3" rx="1" />
      <rect class="bar soft" x="100" y="23" width="28" height="3" rx="1" />
      <rect class="bar soft" x="100" y="30" width="30" height="3" rx="1" />

      <rect class="bar strong" x="14" y="48" width="26" height="4" rx="1" />
      <rect class="bar soft" x="14" y="56" width="42" height="3" rx="1" />
      <rect class="bar soft" x="14" y="62" width="38" height="3" rx="1" />
      <rect class="bar strong" x="82" y="48" width="26" height="4" rx="1" />
      <rect class="bar soft" x="82" y="56" width="46" height="3" rx="1" />
      <rect class="bar soft" x="82" y="62" width="36" height="3" rx="1" />

      <rect class="bar strong" x="14" y="80" width="120" height="9" rx="1.5" />
      <template v-for="row of rows" :key="row">
        <rect class="bar" x="18" :y="97 + row * 12" width="44" height="3.5" rx="1" />
        <rect class="bar soft" x="76" :y="97 + row * 12" width="14" height="3.5" rx="1" />
        <rect class="bar soft" x="96" :y="97 + row * 12" width="14" height="3.5" rx="1" />
        <rect class="bar" x="116" :y="97 + row * 12" width="18" height="3.5" rx="1" />
        <line class="rule" x1="14" :y1="106 + row * 12" x2="134" :y2="106 + row * 12" />
      </template>

      <rect class="bar soft" x="86" y="170" width="20" height="3" rx="1" />
      <rect class="bar strong" x="112" y="169" width="22" height="5" rx="1" />

      <!-- the laser: a wash over everything already checked, a soft glow and a crisp line, all moving together -->
      <g v-if="scan" class="scan" :clip-path="`url(#${id}-page)`">
        <g class="beam">
          <rect class="checked" x="0" y="-200" width="148" height="200" />
          <rect class="glow" x="0" y="-12" width="148" height="24" :fill="`url(#${id}-glow)`" />
          <line class="laser" x1="0" y1="0" x2="148" y2="0" />
          <line class="laser-core" x1="0" y1="0" x2="148" y2="0" />
        </g>
      </g>

      <!-- the stamp's ripple, centred on the seal (top 0.12w, right -0.15w, size 0.49w, in page units) -->
      <circle v-if="scan" class="ripple" cx="133.9" cy="54" r="30.5" />
    </svg>

    <HomePageSeal class="seal" />
  </div>
</template>

<style scoped>

.specimen {
  --bone: light-dark(
      color-mix(in srgb, var(--vp-c-text-1) 13%, transparent),
      color-mix(in srgb, var(--vp-c-text-1) 15%, transparent));
  --bone-strong: light-dark(
      color-mix(in srgb, var(--vp-c-text-1) 26%, transparent),
      color-mix(in srgb, var(--vp-c-text-1) 30%, transparent));
  --hairline: color-mix(in srgb, var(--vp-c-text-1) 8%, transparent);
  --shadow-near: light-dark(rgba(16, 24, 40, 0.04), rgba(0, 0, 0, 0.14));
  --shadow-far: light-dark(rgba(16, 24, 40, 0.09), rgba(0, 0, 0, 0.24));
  --laser: light-dark(#3A93E8, #64B5F6);
  --cycle: 8s;

  position: relative;
  width: var(--w);
  height: calc(var(--w) * 200 / 148);
}

.sheet {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  filter:
      drop-shadow(0 1px 2px var(--shadow-near))
      drop-shadow(0 14px 22px var(--shadow-far));
}

.paper {
  stroke: light-dark(rgba(16, 24, 40, 0.06), rgba(255, 255, 255, 0.07));
}

.paper-top {
  stop-color: light-dark(#FFFFFF, rgba(255, 255, 255, 0.06));
}

.paper-bottom {
  stop-color: light-dark(#F9FAFC, rgba(255, 255, 255, 0.035));
}

.bar {
  fill: var(--bone);
}

.bar.strong {
  fill: var(--bone-strong);
}

.bar.soft {
  opacity: 0.7;
}

.rule {
  stroke: var(--hairline);
  stroke-width: 0.75;
}


/* Scan: the beam group translates in page units (CSS px on SVG elements are user units); it fades in at the top
   edge and out past the bottom so the wash never snaps back. Paused until the sheet is on screen. */
.scan {
  opacity: 0;
  animation: scan-fade var(--cycle) linear infinite;
  animation-play-state: paused;
}

.beam {
  animation: scan-sweep var(--cycle) linear infinite;
  animation-play-state: paused;
}

.specimen.running .scan,
.specimen.running .beam,
.specimen.running .ripple,
.specimen.running.scanning .seal {
  animation-play-state: running;
}

.checked {
  fill: var(--laser);
  opacity: 0.06;
}

.glow-stop {
  stop-color: var(--laser);
}

.laser {
  stroke: var(--laser);
  stroke-width: 1.4;
  opacity: 0.9;
}

.laser-core {
  stroke: light-dark(#FFFFFF, #E3F2FD);
  stroke-width: 0.45;
  opacity: 0.8;
}

@keyframes scan-sweep {
  0% { transform: translateY(-4px); }
  40.3% { transform: translateY(204px); }
  100% { transform: translateY(204px); }
}

@keyframes scan-fade {
  0% { opacity: 0; }
  2.6% { opacity: 1; }
  37.7% { opacity: 1; }
  44.2% { opacity: 0; }
  100% { opacity: 0; }
}

/* Stamp: when the beam has left the visible page (35.75%), the seal presses (up, then a small settle) and a ring
   spreads from it */
.scanning .seal {
  animation: seal-stamp var(--cycle) ease-in-out infinite;
  animation-play-state: paused;
}

.ripple {
  fill: none;
  stroke: var(--laser);
  stroke-width: 1.4;
  vector-effect: non-scaling-stroke;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: seal-ripple var(--cycle) linear infinite;
  animation-play-state: paused;
}

@keyframes seal-stamp {
  0%, 35.75% { transform: rotate(8deg) scale(1); }
  37.12% { transform: rotate(8deg) scale(1.1); }
  38.48% { transform: rotate(8deg) scale(1); }
  40.24% { transform: rotate(8deg) scale(0.97); }
  41.99%, 100% { transform: rotate(8deg) scale(1); }
}

@keyframes seal-ripple {
  0%, 36.98% { opacity: 0; transform: scale(1); animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1); }
  37.05% { opacity: 0.5; transform: scale(1); animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1); }
  48.23% { opacity: 0; transform: scale(1.72); }
  100% { opacity: 0; transform: scale(1.72); }
}

@media (prefers-reduced-motion: reduce) {
  .scan,
  .ripple {
    display: none;
  }

  .scanning .seal {
    animation: none;
  }
}

.seal {
  position: absolute;
  top: calc(var(--w) * 0.12);
  right: calc(var(--w) * -0.15);
  width: calc(var(--w) * 0.49);
  height: calc(var(--w) * 0.49);
  transform: rotate(8deg);
}

</style>

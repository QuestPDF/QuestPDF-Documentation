<template>
  <div ref="root" class="companion-screens">
    <div class="frame">
      <div
        v-for="(screen, index) of screens"
        :key="screen.name"
        class="screen"
        :class="{ current: index === current }"
        :aria-hidden="index !== current">
        <img :src="`/companion/${screen.name}-light.webp`" :alt="screen.alt" class="light" width="1917" height="1328" loading="lazy" />
        <img :src="`/companion/${screen.name}-dark.webp`" :alt="screen.alt" class="dark" width="1917" height="1328" loading="lazy" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { observeOnScreen, reducedMotion } from "./ctaTimeline";

/* the order of docs/companion/features.md; all share the 1917×1328 frame, so the window chrome stays put between slides */
const screens = [
  { name: "application", alt: "QuestPDF Companion App" },
  { name: "selection", alt: "Inspecting a selected element" },
  { name: "search", alt: "Searching the document structure" },
  { name: "magnifier", alt: "Magnifying the preview" },
  { name: "measurement-point", alt: "Measuring a position" },
  { name: "measurement-vertical", alt: "Measuring along the vertical axis" },
  { name: "measurement-horizontal", alt: "Measuring along the horizontal axis" }
];

const holdMs = 3000;

const current = ref(0);
const root = ref<HTMLElement>();

let timer: number | undefined;
let visible = false;
let observer: IntersectionObserver | undefined;

function schedule() {
  window.clearTimeout(timer);
  timer = undefined;

  if (!visible || document.hidden || reducedMotion())
    return;

  timer = window.setTimeout(() => {
    current.value = (current.value + 1) % screens.length;
    schedule();
  }, holdMs);
}

onMounted(() => {
  observer = observeOnScreen(root.value!, onScreen => {
    visible = onScreen;
    schedule();
  });
  document.addEventListener("visibilitychange", schedule);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  document.removeEventListener("visibilitychange", schedule);
  window.clearTimeout(timer);
});
</script>

<style scoped>

.frame {
  position: relative;
  aspect-ratio: 1.62;
  overflow: hidden;
  border-radius: 14px;
  background-color: var(--vp-c-bg);
  box-shadow:
      0 0 0 1px light-dark(color-mix(in srgb, var(--vp-c-text-1) 10%, transparent), rgba(255, 255, 255, 0.08)),
      0 16px 40px -16px light-dark(rgba(16, 24, 40, 0.22), rgba(0, 0, 0, 0.6));
}

.screen {
  position: absolute;
  inset: 0;
  opacity: 0;
}

.screen.current {
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .screen {
    transition: opacity 0.6s ease;
  }
}

.screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
}

html:not(.dark) .screen .dark,
html.dark .screen .light {
  display: none;
}

</style>

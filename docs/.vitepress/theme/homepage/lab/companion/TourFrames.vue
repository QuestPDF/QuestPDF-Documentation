<template>
  <!-- the screenshots of a live-shortcut tour, stacked and cross-fading, in the reader's theme. Every
       frame is cropped from the top left to one proportion (the error screenshots are squarer). Hot
       reload passes a faint refresh down the page each time it comes round. Overlays go in the slot. -->
  <div class="tour-frames" :style="{ aspectRatio: String(aspect) }">
    <template v-for="frame of frames" :key="frame">
      <img :src="`/companion/${frame}-light.webp`" :alt="frame === current ? 'QuestPDF Companion App' : ''" class="tour-frame light" :class="{ shown: frame === current }" loading="lazy" />
      <img :src="`/companion/${frame}-dark.webp`" :alt="frame === current ? 'QuestPDF Companion App' : ''" class="tour-frame dark" :class="{ shown: frame === current }" loading="lazy" />
    </template>
    <span v-if="refresh ?? current === 'application'" :key="stepKey" class="tour-refresh" aria-hidden="true"></span>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { tourFrames } from "./shortcutTour";

/* refresh: whether the hot-reload sweep plays; by default whenever the main screenshot shows */
withDefaults(defineProps<{ current: string; stepKey: number; aspect?: number; frames?: string[]; refresh?: boolean | null }>(), {
  aspect: 1917 / 1328,
  frames: () => tourFrames,
  refresh: null
});
</script>

<style scoped>

.tour-frames {
  position: relative;
  overflow: hidden;
  background-color: var(--vp-c-bg);
}

.tour-frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: left top;
  opacity: 0;
  transition: opacity 0.45s ease;
}

.tour-frame.shown {
  opacity: 1;
}

html:not(.dark) .tour-frame.dark,
html.dark .tour-frame.light {
  display: none;
}

.tour-refresh {
  position: absolute;
  top: 7%;
  bottom: 0;
  left: 43%;
  width: 46%;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent) 46%, color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent) 50%, transparent 52%);
  background-size: 100% 220%;
  background-position: 0 100%;
  opacity: 0;
  animation: tour-refresh 1.2s ease-in-out 0.35s;
}

@keyframes tour-refresh {
  0% { opacity: 1; background-position: 0 100%; }
  85% { opacity: 1; background-position: 0 -10%; }
  100% { opacity: 0; background-position: 0 -10%; }
}

@media (prefers-reduced-motion: reduce) {
  .tour-frame {
    transition: none;
  }

  .tour-refresh {
    animation: none;
  }
}

</style>

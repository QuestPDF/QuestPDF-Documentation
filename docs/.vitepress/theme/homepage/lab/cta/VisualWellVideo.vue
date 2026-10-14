<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Pairing 1, video: an inset "well" (the page's chip and icon-tile surface) holding the head of the tutorial
   invoice as a sheet of paper, cropped so the title and the dates read at this size; the play button sits on
   the sheet. Entrance: the sheet rises into the well, the button follows. Hover: the sheet drifts up a few
   pixels, as if the reader were about to scroll it. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);
</script>

<template>
  <div ref="root" class="vis-well vis-well-video" :class="{ entered }">
    <div class="well">
      <div class="paper sheet">
        <img src="/homepage/lab-cta/invoice-head.webp" alt="" width="630" height="490" loading="eager" />
      </div>
      <span class="play-button"><i class="fa-solid fa-play"></i></span>
    </div>

    <div class="thumb">
      <img src="/homepage/lab-cta/invoice-head.webp" alt="" />
      <span class="play-button"><i class="fa-solid fa-play"></i></span>
    </div>
  </div>
</template>

<style>

.vis-well {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 196px;
}

.vis-well .well {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 16px;
  background-color: var(--home-surface-inner);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 6%, transparent);
}

html.dark .vis-well .well {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.vis-well-video .sheet {
  position: absolute;
  left: 14px;
  top: 14px;
  right: 14px;
  bottom: -20px;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.08),
      0 8px 20px -8px rgba(0, 0, 0, 0.18);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
}

.vis-well-video .sheet img {
  display: block;
  width: 100%;
  height: auto;
}

.vis-well-video .play-button {
  left: calc(50% - 26px);
  top: calc(50% - 26px);
}

/* motion: entrance once, a small drift on hover */
.cta-lab:not(.reduce-motion) .vis-well-video:not(.entered) .sheet {
  transform: translateY(14px);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-well-video:not(.entered) .play-button {
  transform: scale(0.6);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-well-video.entered .play-button {
  transition-delay: 0.15s;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-well-video.entered .sheet {
  transform: translateY(-6px);
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-well-video.entered .play-button {
  transition-delay: 0s;
}

</style>

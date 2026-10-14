<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Pairing 5, video: the still alternative. One sheet, the head of the invoice at a legible scale, a
   hairline and a soft shadow, the play button, nothing else: no well, no frame, no glow. Entrance: a
   300ms fade. Hover: the play button grows and the sheet's shadow deepens. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);
</script>

<template>
  <div ref="root" class="vis-quiet vis-quiet-video" :class="{ entered }">
    <div class="paper sheet">
      <img src="/homepage/lab-cta/invoice-head.webp" alt="" width="630" height="490" loading="eager" />
    </div>
    <span class="play-button"><i class="fa-solid fa-play"></i></span>

    <div class="thumb">
      <img src="/homepage/lab-cta/invoice-head.webp" alt="" />
      <span class="play-button"><i class="fa-solid fa-play"></i></span>
    </div>
  </div>
</template>

<style>

.vis-quiet {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 196px;
}

.vis-quiet-video .sheet {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.09),
      0 10px 24px -10px rgba(0, 0, 0, 0.22);
  transition: box-shadow 0.3s ease, opacity 0.3s ease;
}

.vis-quiet-video .sheet img {
  display: block;
  width: 100%;
  height: auto;
}

.vis-quiet-video .play-button {
  left: calc(50% - 26px);
  top: calc(50% - 26px);
}

.cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-quiet-video .sheet {
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.09),
      0 16px 32px -12px rgba(0, 0, 0, 0.28);
}

.cta-lab:not(.reduce-motion) .vis-quiet-video:not(.entered) .sheet,
.cta-lab:not(.reduce-motion) .vis-quiet-video:not(.entered) .play-button {
  opacity: 0;
}

</style>

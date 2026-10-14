<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Round two, G, video: a camera move. The invoice starts a little too close and out of focus, then pulls
   into focus and settles to its size over 1.6s, the play button lands as it sharpens. Hover: a slow
   dolly down the page (the sheet pans 40px over 2.4s) that returns on leave. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);
</script>

<template>
  <div ref="root" class="vis-well vis-focus" :class="{ entered }">
    <div class="well">
      <div class="paper sheet">
        <img src="/homepage/lab-cta/invoice-top.webp" alt="" width="1060" height="830" />
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

.vis-focus .sheet {
  position: absolute;
  left: 14px;
  top: 14px;
  width: calc(100% - 28px);
  border-radius: 6px;
  overflow: hidden;
  transform-origin: 30% 20%;
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.08),
      0 8px 20px -8px rgba(0, 0, 0, 0.18);
  transition:
      transform 1.6s cubic-bezier(0.2, 0.6, 0.2, 1),
      filter 1.4s cubic-bezier(0.2, 0.6, 0.2, 1),
      opacity 0.8s ease;
}

/* the crop is wider than the head crop so the dolly has somewhere to go: the sheet is scaled so that
   the title still reads, and its left half is what shows */
.vis-focus .sheet img {
  display: block;
  width: 168%;
  max-width: none;
  height: auto;
}

.vis-focus .play-button {
  left: calc(50% - 26px);
  top: calc(50% - 26px);
}

.cta-lab:not(.reduce-motion) .vis-focus:not(.entered) .sheet {
  transform: scale(1.12);
  filter: blur(5px);
  opacity: 0.4;
}

.cta-lab:not(.reduce-motion) .vis-focus:not(.entered) .play-button {
  transform: scale(0.6);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-focus.entered .play-button {
  transition-delay: 1s;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-focus.entered .sheet {
  transform: translateY(-40px);
  transition: transform 2.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-focus.entered .play-button {
  transition-delay: 0s;
}

</style>

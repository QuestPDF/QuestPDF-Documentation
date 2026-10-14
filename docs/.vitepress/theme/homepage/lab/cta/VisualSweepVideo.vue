<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Pairing 4, video: process, once. A hairline frame holds the head of the invoice; when the card enters,
   the page is drawn in from the top down behind a thin accent line (1.2s), the way a renderer paints a
   page, and the play button appears when the line reaches the bottom. Rest: the finished page. Hover: the
   play button only. Under reduced motion the page is finished from the start. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);
</script>

<template>
  <div ref="root" class="vis-sweep vis-sweep-video" :class="{ entered }">
    <div class="frame">
      <div class="paper page">
        <img src="/homepage/lab-cta/invoice-head.webp" alt="" width="630" height="490" loading="eager" />
      </div>
      <div class="scan" />
      <span class="play-button"><i class="fa-solid fa-play"></i></span>
    </div>

    <div class="thumb">
      <img src="/homepage/lab-cta/invoice-head.webp" alt="" />
      <span class="play-button"><i class="fa-solid fa-play"></i></span>
    </div>
  </div>
</template>

<style>

.vis-sweep {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 196px;
}

.vis-sweep .frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 7%, transparent);
}

html.dark .vis-sweep .frame {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.vis-sweep-video .page {
  position: absolute;
  inset: 0;
  box-shadow: none;
}

.vis-sweep-video .page img {
  display: block;
  width: 100%;
  height: auto;
}

.vis-sweep-video .scan {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent) 20%, var(--accent) 80%, transparent);
  box-shadow: 0 0 12px 2px color-mix(in srgb, var(--accent) 35%, transparent);
  opacity: 0;
}

.vis-sweep-video .play-button {
  left: calc(50% - 26px);
  top: calc(50% - 26px);
}

.cta-lab:not(.reduce-motion) .vis-sweep-video:not(.entered) .page {
  clip-path: inset(0 0 100% 0);
}

.cta-lab:not(.reduce-motion) .vis-sweep-video.entered .page {
  animation: vis-sweep-reveal 1.2s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.cta-lab:not(.reduce-motion) .vis-sweep-video.entered .scan {
  animation: vis-sweep-line 1.2s cubic-bezier(0.4, 0, 0.2, 1) both;
}

.cta-lab:not(.reduce-motion) .vis-sweep-video:not(.entered) .play-button {
  transform: scale(0.6);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-sweep-video.entered .play-button {
  transition-delay: 1.1s;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-sweep-video.entered .play-button {
  transition-delay: 0s;
}

@keyframes vis-sweep-reveal {
  from { clip-path: inset(0 0 100% 0); }
  to { clip-path: inset(0 0 0 0); }
}

@keyframes vis-sweep-line {
  0% { top: 0; opacity: 0; }
  8% { opacity: 1; }
  92% { opacity: 1; }
  100% { top: calc(100% - 2px); opacity: 0; }
}

</style>

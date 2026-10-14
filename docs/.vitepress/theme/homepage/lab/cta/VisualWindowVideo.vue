<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Pairing 3, video: the page's own window chrome (HomePageWindowContainer: three dots and a file name)
   used as a document viewer titled invoice.pdf, showing the head of the tutorial invoice zoomed in, the
   way a PDF viewer shows a page at 150%. The play button sits in the viewer. Entrance: the page settles
   from a slightly larger scale (one slow Ken Burns, 2.4s). Hover: the dots take their colours, the page
   pans up a few pixels. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);
</script>

<template>
  <div ref="root" class="vis-window vis-window-video" :class="{ entered }">
    <div class="window">
      <div class="window-header">
        <span class="dot red" /><span class="dot yellow" /><span class="dot green" />
        <span class="file-name">invoice.pdf</span>
      </div>
      <div class="window-body">
        <div class="paper page">
          <img src="/homepage/lab-cta/invoice-head.webp" alt="" width="630" height="490" loading="eager" />
        </div>
        <span class="play-button"><i class="fa-solid fa-play"></i></span>
      </div>
    </div>

    <div class="thumb">
      <img src="/homepage/lab-cta/invoice-head.webp" alt="" />
      <span class="play-button"><i class="fa-solid fa-play"></i></span>
    </div>
  </div>
</template>

<style>

.vis-window {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 196px;
}

.vis-window .window {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

html.dark .vis-window .window {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.vis-window .window-header {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
}

.vis-window .file-name {
  padding-left: 5px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.vis-window .dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #8883;
  transition: background-color 0.1s ease-in-out;
}

.cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-window .dot.red { background-color: #F44336CC; }
.cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-window .dot.yellow { background-color: #FFC107CC; }
.cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-window .dot.green { background-color: #4CAF50CC; }

.vis-window .window-body {
  position: relative;
  flex: 1;
  overflow: hidden;
  background-color: var(--vp-c-bg-alt);
}

.vis-window-video .page {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transform-origin: 20% 10%;
  transition: transform 2.4s cubic-bezier(0.2, 0.6, 0.2, 1), opacity 0.5s ease;
}

.vis-window-video .page img {
  display: block;
  width: 100%;
  height: auto;
}

.vis-window-video .play-button {
  left: calc(50% - 26px);
  top: calc(50% - 26px);
}

.cta-lab:not(.reduce-motion) .vis-window-video:not(.entered) .page {
  transform: scale(1.05);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-window-video:not(.entered) .play-button {
  transform: scale(0.6);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-window-video.entered .play-button {
  transition-delay: 0.3s;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-window-video.entered .page {
  transform: translateY(-6px);
  transition-duration: 0.5s;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-window-video.entered .play-button {
  transition-delay: 0s;
}

</style>

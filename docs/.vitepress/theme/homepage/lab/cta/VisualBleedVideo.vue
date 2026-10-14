<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Pairing 2, video: the invoice runs off the card. The head of the tutorial invoice is placed so that its
   top-left corner lies outside the card and the card's rounded corner cuts it: a large document seen
   through the card, at a scale where "Invoice #4048" and the dates read. The play button sits on it.
   Entrance: the sheet slides in from the corner. Hover: it drifts 3px towards the pointer. Where the
   browser supports scroll-driven animations, the sheet also moves 6px while the card travels through the
   viewport, which is too slow to notice and stops by itself when the card is off screen. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);
</script>

<template>
  <div ref="root" class="vis-bleed vis-bleed-video" :class="{ entered }">
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

.vis-bleed {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 196px;
}

/* the sheet is positioned against the card's padding box: 32px of padding lie to the left and above the
   visual column, so negative offsets put the sheet's corner outside the card, where overflow clips it */
.vis-bleed-video .sheet {
  position: absolute;
  left: -36px;
  top: -42px;
  width: calc(100% + 44px);
  border-radius: 0 0 8px 0;
  overflow: hidden;
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.08),
      0 12px 28px -10px rgba(0, 0, 0, 0.22);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s ease;
}

.vis-bleed-video .sheet img {
  display: block;
  width: 100%;
  height: auto;
}

/* on the visible part of the sheet, which ends about 80% down the column */
.vis-bleed-video .play-button {
  left: calc(50% - 20px);
  top: calc(38% - 26px);
}

.cta-lab:not(.reduce-motion) .vis-bleed-video:not(.entered) .sheet {
  transform: translate(-14px, -14px);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-bleed-video:not(.entered) .play-button {
  transform: scale(0.6);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-bleed-video.entered .play-button {
  transition-delay: 0.2s;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-bleed-video.entered .sheet {
  transform: translate(3px, 3px);
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-bleed-video.entered .play-button {
  transition-delay: 0s;
}

/* ambient: 6px of travel bound to the card's position in the viewport (no JS, no timers, nothing off screen) */
@supports (animation-timeline: view()) {
  .cta-lab:not(.reduce-motion) .vis-bleed-video.entered .sheet {
    animation: vis-bleed-travel linear both;
    animation-timeline: view();
    animation-range: entry 0% exit 100%;
  }

  @keyframes vis-bleed-travel {
    from { translate: 0 6px; }
    to { translate: 0 -6px; }
  }
}

</style>

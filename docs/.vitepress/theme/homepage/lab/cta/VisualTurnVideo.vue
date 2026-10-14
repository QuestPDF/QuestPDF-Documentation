<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Round two, J, video: the invoice as a two-page object in perspective. On entrance the pair lays
   down onto the well like a sheet placed on a desk (rotateX 16° → 0, with its shadow settling). While
   the pointer rests on the card, page one turns 72° around its spine, the way a page is lifted to look
   at the next one, and page two shows through: the table continuing to the totals. A shadow at the
   fold moves with the page. On leave the page lies back down. Reduced motion: the pages lie flat. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);
</script>

<template>
  <div ref="root" class="vis-well vis-turn" :class="{ entered }">
    <div class="well">
      <div class="book">
        <div class="paper page page2">
          <img src="/homepage/lab-cta/invoice2-top.webp" alt="" width="1060" height="690" />
          <div class="fold-shadow" />
        </div>
        <div class="paper page page1">
          <img src="/homepage/lab-cta/invoice-head.webp" alt="" width="630" height="490" />
          <div class="sheen" />
        </div>
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

.vis-turn .well {
  perspective: 900px;
  perspective-origin: 50% 40%;
}

.vis-turn .book {
  position: absolute;
  left: 14px;
  top: 14px;
  right: 14px;
  bottom: -20px;
  transform-style: preserve-3d;
  transform-origin: 50% 100%;
  transition: transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.5s ease;
}

.vis-turn .page {
  position: absolute;
  inset: 0;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.vis-turn .page img {
  display: block;
  width: 100%;
  height: auto;
}

/* page two is the same width as page one but a wider crop, so its left half (the table and totals) shows */
.vis-turn .page2 img {
  width: 168%;
  max-width: none;
}

.vis-turn .page1 {
  transform-origin: 0% 50%;
  transition: transform 0.9s cubic-bezier(0.3, 0.1, 0.2, 1), box-shadow 0.9s ease;
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.08),
      0 8px 20px -8px rgba(0, 0, 0, 0.18);
}

/* a light that moves across page one as it lifts, and a shadow page one throws on page two near the spine */
.vis-turn .sheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent 30%, rgba(255, 255, 255, 0.55) 50%, transparent 70%);
  opacity: 0;
  transition: opacity 0.9s ease;
  pointer-events: none;
}

.vis-turn .fold-shadow {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.06) 40%, transparent 70%);
  opacity: 0;
  transition: opacity 0.9s ease;
  pointer-events: none;
}

.vis-turn .play-button {
  left: calc(50% - 26px);
  top: calc(50% - 26px);
}

.cta-lab:not(.reduce-motion) .vis-turn:not(.entered) .book {
  transform: rotateX(16deg) translateY(16px);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-turn:not(.entered) .play-button {
  transform: scale(0.6);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-turn.entered .play-button {
  transition-delay: 0.5s;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-turn.entered .page1 {
  transform: rotateY(-72deg);
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.08),
      18px 10px 30px -10px rgba(0, 0, 0, 0.35);
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-turn.entered .sheen,
.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-turn.entered .fold-shadow {
  opacity: 1;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-turn.entered .play-button {
  transition-delay: 0s;
}

</style>

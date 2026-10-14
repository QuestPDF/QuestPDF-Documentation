<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Round two, H, video: the hover tells the story. At rest the well shows the head of the invoice under
   the play disc, a plain poster. While the pointer rests on the card, the disc widens into a labelled
   pill ("Watch") and the camera reads down the page: the tall sheet pans up through the parties and
   the table to the last rows over 3.2s, then holds. On leave both return. Entrance: a 300ms fade. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);
</script>

<template>
  <div ref="root" class="vis-well vis-story" :class="{ entered }">
    <div class="well">
      <div class="paper sheet">
        <img src="/homepage/lab-cta/invoice-tall.webp" alt="" width="630" height="1090" />
      </div>
      <span class="play-button pill">
        <i class="fa-solid fa-play"></i>
        <span class="pill-label">Watch</span>
      </span>
    </div>

    <div class="thumb">
      <img src="/homepage/lab-cta/invoice-head.webp" alt="" />
      <span class="play-button"><i class="fa-solid fa-play"></i></span>
    </div>
  </div>
</template>

<style>

.vis-story .sheet {
  position: absolute;
  left: 14px;
  top: 14px;
  width: calc(100% - 28px);
  border-radius: 6px;
  overflow: hidden;
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.08),
      0 8px 20px -8px rgba(0, 0, 0, 0.18);
  transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}

.vis-story .sheet img {
  display: block;
  width: 100%;
  height: auto;
}

/* the pill: the disc keeps its height and grows to the right; the label fades in once there is room */
.vis-story .play-button.pill {
  left: calc(50% - 26px);
  top: calc(50% - 26px);
  width: auto;
  min-width: 52px;
  padding: 0 0 0 0;
  border-radius: 26px;
  gap: 0;
  overflow: hidden;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), padding 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.3s ease;
}

.vis-story .pill-label {
  max-width: 0;
  opacity: 0;
  color: #FFF;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  transition: max-width 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.25s ease, margin 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.cta-lab:not(.reduce-motion) .vis-story:not(.entered) :is(.sheet, .play-button) {
  opacity: 0;
}

.cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-story .play-button.pill {
  transform: none;
  padding-right: 18px;
}

.cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-story .pill-label {
  max-width: 80px;
  opacity: 1;
  margin-left: 10px;
}

/* the read-down: 34% of the tall sheet's height brings the last rows into the well without running past its bottom */
.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-story.entered .sheet {
  transform: translateY(-34%);
  transition: transform 3.2s cubic-bezier(0.45, 0.05, 0.3, 1);
}

</style>

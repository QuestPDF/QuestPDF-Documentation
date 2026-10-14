<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Round two, F, video: the invoice assembles the way the layout engine places it. Inside the well from A,
   a sheet of paper fills band by band: the title block slides in from the left and sharpens, the parties
   rise into place, the table's header rule draws itself from left to right, then four rows deal in from
   below; the play button lands last. One pass, 1.5s, on entrance. Hover: the sheet drifts up 6px. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);
</script>

<template>
  <div ref="root" class="vis-well vis-assembly" :class="{ entered }">
    <div class="well">
      <div class="paper sheet">
        <img class="band title" src="/homepage/lab-cta/band-title.webp" alt="" />
        <div class="gap gap1" />
        <img class="band parties" src="/homepage/lab-cta/band-parties.webp" alt="" />
        <div class="gap gap2" />
        <img class="band head" src="/homepage/lab-cta/band-head.webp" alt="" />
        <img class="band row" style="--i: 0" src="/homepage/lab-cta/band-row1.webp" alt="" />
        <img class="band row" style="--i: 1" src="/homepage/lab-cta/band-row2.webp" alt="" />
        <img class="band row" style="--i: 2" src="/homepage/lab-cta/band-row3.webp" alt="" />
        <img class="band row" style="--i: 3" src="/homepage/lab-cta/band-row4.webp" alt="" />
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

.vis-assembly .sheet {
  position: absolute;
  left: 14px;
  top: 14px;
  right: 14px;
  bottom: -20px;
  display: flex;
  flex-direction: column;
  border-radius: 6px 6px 0 0;
  overflow: hidden;
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.08),
      0 8px 20px -8px rgba(0, 0, 0, 0.18);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.vis-assembly .band {
  display: block;
  width: 100%;
  height: auto;
}

.vis-assembly .gap1 { aspect-ratio: 630 / 70; }
.vis-assembly .gap2 { aspect-ratio: 630 / 40; }

.vis-assembly .play-button {
  left: calc(50% - 26px);
  top: calc(50% - 26px);
}

/* the choreography: every band has a resting pose; before the entrance it is displaced, and the
   transitions back are staggered so the page builds from the top down */
.vis-assembly .title {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, filter 0.6s ease;
}

.vis-assembly .parties {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, opacity 0.5s ease 0.25s;
}

.vis-assembly .head {
  transition: clip-path 0.45s cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
}

.vis-assembly .row {
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) calc(0.7s + var(--i) * 90ms), opacity 0.4s ease calc(0.7s + var(--i) * 90ms);
}

.cta-lab:not(.reduce-motion) .vis-assembly:not(.entered) .title {
  transform: translateX(-10px);
  opacity: 0;
  filter: blur(3px);
}

.cta-lab:not(.reduce-motion) .vis-assembly:not(.entered) .parties {
  transform: translateY(10px);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-assembly:not(.entered) .head {
  clip-path: inset(0 100% 0 0);
}

.cta-lab:not(.reduce-motion) .vis-assembly:not(.entered) .row {
  transform: translateY(8px);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-assembly:not(.entered) .play-button {
  transform: scale(0.6);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-assembly.entered .play-button {
  transition-delay: 1.15s;
}

/* once built, the bands no longer wait on each other */
.cta-lab:not(.reduce-motion) .vis-assembly.entered :is(.title, .parties, .head, .row) {
  transition-delay: 0s;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-assembly.entered .sheet {
  transform: translateY(-6px);
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-assembly.entered .play-button {
  transition-delay: 0s;
}

</style>

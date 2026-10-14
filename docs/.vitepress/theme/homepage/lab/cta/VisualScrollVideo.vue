<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Round two, I, video: no timers. The invoice builds as the card travels up the viewport: the bands
   of the page (title, parties, the table rule, the rows) are bound to the card's position between its
   entry at the bottom edge and its arrival at the centre, so scrolling slowly builds the page and
   scrolling back takes it apart. Browsers without scroll-driven animations (and reduced motion) show
   the finished page. Hover: the sheet drifts up 6px. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);
</script>

<template>
  <div ref="root" class="vis-well vis-scroll" :class="{ entered }">
    <div class="well">
      <div class="paper sheet">
        <img class="band title" src="/homepage/lab-cta/band-title.webp" alt="" />
        <div class="gap gap1" />
        <img class="band parties" src="/homepage/lab-cta/band-parties.webp" alt="" />
        <div class="gap gap2" />
        <img class="band head" src="/homepage/lab-cta/band-head.webp" alt="" />
        <img class="band row r0" src="/homepage/lab-cta/band-row1.webp" alt="" />
        <img class="band row r1" src="/homepage/lab-cta/band-row2.webp" alt="" />
        <img class="band row r2" src="/homepage/lab-cta/band-row3.webp" alt="" />
        <img class="band row r3" src="/homepage/lab-cta/band-row4.webp" alt="" />
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

.vis-scroll {
  view-timeline-name: --cta-visual;
  view-timeline-axis: block;
}

.vis-scroll .sheet {
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

.vis-scroll .band { display: block; width: 100%; height: auto; }
.vis-scroll .gap1 { aspect-ratio: 630 / 70; }
.vis-scroll .gap2 { aspect-ratio: 630 / 40; }

.vis-scroll .play-button {
  left: calc(50% - 26px);
  top: calc(50% - 26px);
}

@supports (animation-timeline: view()) {
  .cta-lab:not(.reduce-motion) .vis-scroll .title {
    animation: vis-scroll-slide linear both;
    animation-timeline: --cta-visual;
    animation-range: entry 0% entry 70%;
  }

  .cta-lab:not(.reduce-motion) .vis-scroll .parties {
    animation: vis-scroll-rise linear both;
    animation-timeline: --cta-visual;
    animation-range: entry 30% cover 32%;
  }

  .cta-lab:not(.reduce-motion) .vis-scroll .head {
    animation: vis-scroll-draw linear both;
    animation-timeline: --cta-visual;
    animation-range: entry 70% cover 38%;
  }

  .cta-lab:not(.reduce-motion) .vis-scroll .row {
    animation: vis-scroll-rise linear both;
    animation-timeline: --cta-visual;
  }

  .cta-lab:not(.reduce-motion) .vis-scroll .r0 { animation-range: entry 90% cover 40%; }
  .cta-lab:not(.reduce-motion) .vis-scroll .r1 { animation-range: cover 30% cover 43%; }
  .cta-lab:not(.reduce-motion) .vis-scroll .r2 { animation-range: cover 33% cover 46%; }
  .cta-lab:not(.reduce-motion) .vis-scroll .r3 { animation-range: cover 36% cover 49%; }

  .cta-lab:not(.reduce-motion) .vis-scroll .play-button {
    animation: vis-scroll-pop linear both;
    animation-timeline: --cta-visual;
    animation-range: cover 42% cover 52%;
  }
}

@keyframes vis-scroll-slide {
  from { transform: translateX(-10px); opacity: 0; filter: blur(3px); }
  to { transform: none; opacity: 1; filter: none; }
}

@keyframes vis-scroll-rise {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: none; opacity: 1; }
}

@keyframes vis-scroll-draw {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0); }
}

@keyframes vis-scroll-pop {
  from { transform: scale(0.6); opacity: 0; }
  to { transform: none; opacity: 1; }
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-scroll .sheet {
  transform: translateY(-6px);
}

</style>

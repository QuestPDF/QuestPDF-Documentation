<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Round two, I, gallery: the three columns of tiles rise into the well at three different speeds as
   the card travels up the viewport, the way layers at different depths move past a window, and settle
   as the card reaches the centre. Scroll-bound, no timers; browsers without scroll-driven animations
   show the settled sheet. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);

const columns = [
  ["qr", "donut-sq", "map"],
  ["house", "seal-iso", "notary"],
  ["stamp-paid", "avatar", "barcode"]
];
const positions: Record<string, string> = { avatar: "top", map: "left" };
</script>

<template>
  <div ref="root" class="vis-well vis-parallax" :class="{ entered }">
    <div class="well">
      <div class="columns">
        <div v-for="(column, c) of columns" :key="c" class="column" :class="`c${c}`">
          <div v-for="src of column" :key="src" class="paper tile">
            <img :src="`/homepage/lab-cta/tile-${src}.webp`" alt="" :style="{ objectPosition: positions[src] ?? 'center' }" />
          </div>
        </div>
      </div>
    </div>

    <div class="thumb">
      <img src="/homepage/lab-cta/tile-house.webp" alt="" style="object-position: center" />
    </div>
  </div>
</template>

<style>

.vis-parallax {
  view-timeline-name: --cta-visual;
  view-timeline-axis: block;
}

.vis-parallax .columns {
  position: absolute;
  inset: 10px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
}

.vis-parallax .column {
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 6px;
  min-height: 0;
}

.vis-parallax .tile {
  border-radius: 6px;
  overflow: hidden;
  min-height: 0;
}

.vis-parallax .tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@supports (animation-timeline: view()) {
  .cta-lab:not(.reduce-motion) .vis-parallax .column {
    animation: vis-parallax-rise linear both;
    animation-timeline: --cta-visual;
  }

  .cta-lab:not(.reduce-motion) .vis-parallax .c0 { --lift: 48px; animation-range: entry 0% cover 44%; }
  .cta-lab:not(.reduce-motion) .vis-parallax .c1 { --lift: 84px; animation-range: entry 0% cover 50%; }
  .cta-lab:not(.reduce-motion) .vis-parallax .c2 { --lift: 64px; animation-range: entry 0% cover 47%; }
}

@keyframes vis-parallax-rise {
  from { transform: translateY(var(--lift, 60px)); opacity: 0.2; }
  to { transform: none; opacity: 1; }
}

</style>

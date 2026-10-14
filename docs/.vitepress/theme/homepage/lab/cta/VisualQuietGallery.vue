<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Pairing 5, gallery: four larger element tiles in a 2x2, each with a hairline and a soft shadow, on the
   card surface. Entrance: a 300ms fade. Hover: the shadows deepen. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);

const tiles = [
  { src: "house", pos: "center" },
  { src: "qr", pos: "center" },
  { src: "donut", pos: "left" },
  { src: "stamp-paid", pos: "center" }
];
</script>

<template>
  <div ref="root" class="vis-quiet vis-quiet-gallery" :class="{ entered }">
    <div class="grid">
      <div v-for="tile of tiles" :key="tile.src" class="paper tile">
        <img :src="`/homepage/lab-cta/tile-${tile.src}.webp`" alt="" :style="{ objectPosition: tile.pos }" loading="eager" />
      </div>
    </div>

    <div class="thumb">
      <img src="/homepage/lab-cta/tile-house.webp" alt="" style="object-position: center" />
    </div>
  </div>
</template>

<style>

.vis-quiet-gallery .grid {
  position: absolute;
  inset: 8px 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 10px;
  transition: opacity 0.3s ease;
}

.vis-quiet-gallery .tile {
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.09),
      0 8px 20px -10px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease;
}

.vis-quiet-gallery .tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-quiet-gallery .tile {
  box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.09),
      0 14px 28px -12px rgba(0, 0, 0, 0.26);
}

.cta-lab:not(.reduce-motion) .vis-quiet-gallery:not(.entered) .grid {
  opacity: 0;
}

</style>

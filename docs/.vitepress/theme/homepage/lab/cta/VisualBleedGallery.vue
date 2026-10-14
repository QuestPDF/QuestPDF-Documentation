<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Pairing 2, gallery: a mosaic of larger element crops (a house listing, a QR payment block, a donut
   chart, an approval stamp, a map, a signature) that runs off the top and the left of the card, so the
   collection reads as bigger than the card. A short fade on the right edge keeps the mosaic from butting
   against the text. Entrance: the tiles slide in from the corner, staggered. Hover: the mosaic drifts 3px. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);

/* grid areas (row-start / col-start / row-end / col-end) in the mosaic's 2x3 grid */
const tiles = [
  { src: "house", area: "1 / 1 / 3 / 2", pos: "left top" },
  { src: "stamp-approved", area: "1 / 2 / 2 / 3", pos: "center" },
  { src: "qr", area: "2 / 2 / 3 / 3", pos: "center" },
  { src: "map", area: "3 / 1 / 4 / 2", pos: "left" },
  { src: "signature", area: "3 / 2 / 4 / 3", pos: "left" }
];
</script>

<template>
  <div ref="root" class="vis-bleed vis-bleed-gallery" :class="{ entered }">
    <div class="mosaic">
      <div v-for="(tile, index) of tiles" :key="tile.src" class="paper tile" :style="{ gridArea: tile.area, '--i': index }">
        <img :src="`/homepage/lab-cta/tile-${tile.src}.webp`" alt="" :style="{ objectPosition: tile.pos }" loading="eager" />
      </div>
    </div>

    <div class="thumb">
      <img src="/homepage/lab-cta/tile-house.webp" alt="" style="object-position: center" />
    </div>
  </div>
</template>

<style>

.vis-bleed-gallery .mosaic {
  position: absolute;
  left: -46px;
  top: -46px;
  width: calc(100% + 62px);
  height: calc(100% + 78px);
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 8px;
  mask-image: linear-gradient(90deg, #000 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, #000 92%, transparent 100%);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.vis-bleed-gallery .tile {
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
  transition-delay: calc(var(--i) * 50ms);
}

.vis-bleed-gallery .tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta-lab:not(.reduce-motion) .vis-bleed-gallery:not(.entered) .tile {
  transform: translate(-12px, -12px);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-bleed-gallery.entered .mosaic {
  transform: translate(3px, 3px);
}

</style>

<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Pairing 1, gallery: the same well holding a 3x3 sheet of element tiles cut from the gallery renders (a QR
   code, a stamp, a photo card, a donut chart, a seal, a portrait, a map, a notary seal, a barcode): nine
   kinds of content in one glance. Entrance: the tiles fade up in reading order. Hover: nothing inside;
   the card's own ring and halo answer the pointer. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);

const tiles = [
  { src: "qr", pos: "center" },
  { src: "house", pos: "center" },
  { src: "stamp-paid", pos: "center" },
  { src: "donut-sq", pos: "center" },
  { src: "seal-iso", pos: "center" },
  { src: "avatar", pos: "top" },
  { src: "map", pos: "left" },
  { src: "notary", pos: "center" },
  { src: "barcode", pos: "center" }
];
</script>

<template>
  <div ref="root" class="vis-well vis-well-gallery" :class="{ entered }">
    <div class="well">
      <div class="grid">
        <div v-for="(tile, index) of tiles" :key="tile.src" class="paper tile" :style="{ '--i': index }">
          <img :src="`/homepage/lab-cta/tile-${tile.src}.webp`" alt="" :style="{ objectPosition: tile.pos }" loading="eager" />
        </div>
      </div>
    </div>

    <div class="thumb">
      <img src="/homepage/lab-cta/tile-house.webp" alt="" style="object-position: center" />
    </div>
  </div>
</template>

<style>

.vis-well-gallery .grid {
  position: absolute;
  inset: 10px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 6px;
}

.vis-well-gallery .tile {
  border-radius: 6px;
  overflow: hidden;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
  transition-delay: calc(var(--i) * 40ms);
}

.vis-well-gallery .tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta-lab:not(.reduce-motion) .vis-well-gallery:not(.entered) .tile {
  transform: translateY(10px);
  opacity: 0;
}

</style>

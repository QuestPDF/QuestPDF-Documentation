<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Pairing 4, gallery: the same hairline frame with a 3x3 sheet of element tiles that "develop" once on
   entrance: each tile starts as a blank light block and its content fades in, in reading order, 80ms
   apart, so the sheet fills in over about a second. Rest: the finished sheet. */
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
  <div ref="root" class="vis-sweep vis-sweep-gallery" :class="{ entered }">
    <div class="frame">
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

.vis-sweep-gallery .grid {
  position: absolute;
  inset: 10px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 6px;
}

.vis-sweep-gallery .tile {
  border-radius: 6px;
  overflow: hidden;
}

.vis-sweep-gallery .tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta-lab:not(.reduce-motion) .vis-sweep-gallery:not(.entered) .tile img {
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-sweep-gallery.entered .tile img {
  animation: vis-sweep-develop 0.5s ease both;
  animation-delay: calc(var(--i) * 80ms + 150ms);
}

@keyframes vis-sweep-develop {
  from { opacity: 0; }
  to { opacity: 1; }
}

</style>

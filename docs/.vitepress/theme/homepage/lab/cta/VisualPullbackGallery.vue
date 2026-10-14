<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Round two, G, gallery: the camera starts on one tile (the ISO seal fills the well) and pulls back
   over 1.4s until all nine are in frame: one to many. Hover: the camera leans in 4% towards the centre. */
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
  <div ref="root" class="vis-well vis-pullback" :class="{ entered }">
    <div class="well">
      <div class="grid">
        <div v-for="tile of tiles" :key="tile.src" class="paper tile">
          <img :src="`/homepage/lab-cta/tile-${tile.src}.webp`" alt="" :style="{ objectPosition: tile.pos }" />
        </div>
      </div>
    </div>

    <div class="thumb">
      <img src="/homepage/lab-cta/tile-seal-iso.webp" alt="" style="object-position: center" />
    </div>
  </div>
</template>

<style>

.vis-pullback .grid {
  position: absolute;
  inset: 10px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 6px;
  transform-origin: 50% 50%;
  transition: transform 1.4s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.vis-pullback .tile {
  border-radius: 6px;
  overflow: hidden;
}

.vis-pullback .tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta-lab:not(.reduce-motion) .vis-pullback:not(.entered) .grid {
  transform: scale(3.1);
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-pullback.entered .grid {
  transform: scale(1.04);
  transition-duration: 0.7s;
}

</style>

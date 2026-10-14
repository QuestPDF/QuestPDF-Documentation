<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Round two, J, gallery: the tiles in three dimensions. On entrance each tile stands up from lying flat
   (rotateX −90° about its bottom edge → 0), in a wave from the top-left, 60ms apart. While the pointer
   rests on the card the whole sheet tilts 8° in perspective and the tiles lift to three depths (centre,
   ring, corners), so they parallax against each other; on leave the sheet lies flat again. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);

const tiles = [
  { src: "qr", z: 18, pos: "center" },
  { src: "house", z: 10, pos: "center" },
  { src: "stamp-paid", z: 18, pos: "center" },
  { src: "donut-sq", z: 10, pos: "center" },
  { src: "seal-iso", z: 0, pos: "center" },
  { src: "avatar", z: 10, pos: "top" },
  { src: "map", z: 18, pos: "left" },
  { src: "notary", z: 10, pos: "center" },
  { src: "barcode", z: 18, pos: "center" }
];
</script>

<template>
  <div ref="root" class="vis-well vis-depth" :class="{ entered }">
    <div class="well">
      <div class="grid">
        <div v-for="(tile, index) of tiles" :key="tile.src" class="cell" :style="{ '--i': index, '--z': tile.z + 'px' }">
          <div class="paper tile">
            <img :src="`/homepage/lab-cta/tile-${tile.src}.webp`" alt="" :style="{ objectPosition: tile.pos }" />
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

.vis-depth .well {
  perspective: 800px;
  perspective-origin: 50% 50%;
}

.vis-depth .grid {
  position: absolute;
  inset: 10px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 6px;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.vis-depth .cell {
  position: relative;
  min-height: 0;
  transform-style: preserve-3d;
  transform-origin: 50% 100%;
  transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.4s ease;
  transition-delay: calc(var(--i) * 60ms);
}

.vis-depth .tile {
  position: absolute;
  inset: 0;
  border-radius: 6px;
  overflow: hidden;
  transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.8s ease;
}

.vis-depth .tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta-lab:not(.reduce-motion) .vis-depth:not(.entered) .cell {
  transform: rotateX(-90deg);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .vis-depth.entered .cell {
  transition-delay: 0s;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-depth.entered .grid {
  transform: rotateX(8deg) rotateY(-9deg);
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-depth.entered .tile {
  transform: translateZ(var(--z));
  box-shadow: 0 10px 18px -10px rgba(0, 0, 0, 0.35);
}

</style>

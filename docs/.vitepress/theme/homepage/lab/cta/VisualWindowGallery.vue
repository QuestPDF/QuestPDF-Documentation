<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Pairing 3, gallery: the same window chrome, titled like a folder, showing four element tiles with a
   small caption each; the captions are the real page names of the Component Variants document the tiles
   come from. Entrance: tiles rise in reading order. Hover: the dots take their colours. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);

const tiles = [
  { src: "donut", caption: "Charts", pos: "left" },
  { src: "map", caption: "Maps", pos: "left" },
  { src: "stamp-paid", caption: "Stamps", pos: "center" },
  { src: "qr-pay", caption: "Codes", pos: "left" }
];
</script>

<template>
  <div ref="root" class="vis-window vis-window-gallery" :class="{ entered }">
    <div class="window">
      <div class="window-header">
        <span class="dot red" /><span class="dot yellow" /><span class="dot green" />
        <span class="file-name">samples</span>
      </div>
      <div class="window-body">
        <div class="grid">
          <figure v-for="(tile, index) of tiles" :key="tile.src" class="item" :style="{ '--i': index }">
            <div class="paper tile">
              <img :src="`/homepage/lab-cta/tile-${tile.src}.webp`" alt="" :style="{ objectPosition: tile.pos }" loading="eager" />
            </div>
            <figcaption>{{ tile.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </div>

    <div class="thumb">
      <img src="/homepage/lab-cta/tile-donut.webp" alt="" style="object-position: left" />
    </div>
  </div>
</template>

<style>

.vis-window-gallery .grid {
  position: absolute;
  inset: 10px 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 8px 10px;
}

.vis-window-gallery .item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  min-height: 0;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
  transition-delay: calc(var(--i) * 60ms);
}

.vis-window-gallery .tile {
  flex: 1;
  min-height: 0;
  border-radius: 6px;
  overflow: hidden;
}

.vis-window-gallery .tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vis-window-gallery figcaption {
  font-size: 0.6875rem;
  line-height: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.cta-lab:not(.reduce-motion) .vis-window-gallery:not(.entered) .item {
  transform: translateY(8px);
  opacity: 0;
}

</style>

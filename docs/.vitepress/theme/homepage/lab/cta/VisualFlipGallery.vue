<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Round two, H, gallery: the nine tiles have a second element on their back. While the pointer rests on
   the card they flip in a wave, reading order, 40ms apart, to show nine more kinds of content, and hold;
   on leave they flip back the same way. Eighteen elements, no loop, nothing without intent.
   Entrance: the tiles fade up, staggered. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);

const tiles = [
  { front: "qr", back: "price-tag", pos: "center", backPos: "left" },
  { front: "house", back: "product", pos: "center", backPos: "top" },
  { front: "stamp-paid", back: "stamp-approved", pos: "center", backPos: "center" },
  { front: "donut-sq", back: "linechart", pos: "center", backPos: "left" },
  { front: "seal-iso", back: "seal-pass", pos: "center", backPos: "center" },
  { front: "avatar", back: "heatmap", pos: "top", backPos: "left" },
  { front: "map", back: "tracker", pos: "left", backPos: "left" },
  { front: "notary", back: "signature", pos: "center", backPos: "left" },
  { front: "barcode", back: "danger", pos: "center", backPos: "left" }
];
</script>

<template>
  <div ref="root" class="vis-well vis-flip" :class="{ entered }">
    <div class="well">
      <div class="grid">
        <div v-for="(tile, index) of tiles" :key="tile.front" class="flip" :style="{ '--i': index }">
          <div class="flipper">
            <div class="paper face front">
              <img :src="`/homepage/lab-cta/tile-${tile.front}.webp`" alt="" :style="{ objectPosition: tile.pos }" />
            </div>
            <div class="paper face back">
              <img :src="`/homepage/lab-cta/tile-${tile.back}.webp`" alt="" :style="{ objectPosition: tile.backPos }" />
            </div>
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

.vis-flip .grid {
  position: absolute;
  inset: 10px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 6px;
  perspective: 700px;
}

.vis-flip .flip {
  position: relative;
  min-height: 0;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
  transition-delay: calc(var(--i) * 40ms);
}

.vis-flip .flipper {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: calc(var(--i) * 40ms);
}

.vis-flip .face {
  position: absolute;
  inset: 0;
  border-radius: 6px;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.vis-flip .face.back {
  transform: rotateY(180deg);
}

.vis-flip .face img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta-lab:not(.reduce-motion) .vis-flip:not(.entered) .flip {
  transform: translateY(10px);
  opacity: 0;
}

.cta-lab:not(.reduce-motion) .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-flip.entered .flipper {
  transform: rotateY(180deg);
}

/* without motion the hover shows the backs at once, so the second set is still reachable */
.cta-lab.reduce-motion .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-flip .flipper {
  transform: rotateY(180deg);
  transition: none;
}

@media (prefers-reduced-motion: reduce) {
  .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .vis-flip .flipper {
    transform: rotateY(180deg);
    transition: none;
  }
}

</style>

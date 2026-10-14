<script setup lang="ts">
import { ref } from "vue";
import { useEntrance } from "./ctaLab";

/* Round two, F, gallery: the nine tiles start as a deck in the centre of the well, each turned a few
   degrees, and are dealt to their cells, straightening as they land, centre first and then the ring
   around it. One pass, about 1s. Hover: nothing inside the well. */
const root = ref<HTMLElement>();
const { entered } = useEntrance(root);

/* col, row, resting rotation while in the deck, deal order */
const tiles = [
  { src: "qr", c: 0, r: 0, rot: -7, order: 5 },
  { src: "house", c: 1, r: 0, rot: 4, order: 1 },
  { src: "stamp-paid", c: 2, r: 0, rot: -3, order: 6 },
  { src: "donut-sq", c: 0, r: 1, rot: 6, order: 2 },
  { src: "seal-iso", c: 1, r: 1, rot: 0, order: 0 },
  { src: "avatar", c: 2, r: 1, rot: -5, order: 3 },
  { src: "map", c: 0, r: 2, rot: 3, order: 7 },
  { src: "notary", c: 1, r: 2, rot: -4, order: 4 },
  { src: "barcode", c: 2, r: 2, rot: 5, order: 8 }
];
</script>

<template>
  <div ref="root" class="vis-well vis-deal" :class="{ entered }">
    <div class="well">
      <div class="grid">
        <div
            v-for="tile of tiles"
            :key="tile.src"
            class="paper tile"
            :style="{ '--c': tile.c, '--r': tile.r, '--rot': tile.rot + 'deg', '--o': tile.order, zIndex: 9 - tile.order }">
          <img :src="`/homepage/lab-cta/tile-${tile.src}.webp`" alt="" :style="{ objectPosition: tile.src === 'avatar' ? 'top' : tile.src === 'map' ? 'left' : 'center' }" />
        </div>
      </div>
    </div>

    <div class="thumb">
      <img src="/homepage/lab-cta/tile-house.webp" alt="" style="object-position: center" />
    </div>
  </div>
</template>

<style>

.vis-deal .grid {
  position: absolute;
  inset: 10px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 6px;
}

.vis-deal .tile {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.7s ease;
  transition-delay: calc(var(--o) * 55ms);
}

.vis-deal .tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* the deck: every tile sits on the centre cell (one cell plus the gap per step), turned a little */
.cta-lab:not(.reduce-motion) .vis-deal:not(.entered) .tile {
  transform:
      translate(calc((1 - var(--c)) * (100% + 6px)), calc((1 - var(--r)) * (100% + 6px)))
      rotate(var(--rot))
      scale(0.96);
  box-shadow: 0 6px 16px -6px rgba(0, 0, 0, 0.25);
}

</style>

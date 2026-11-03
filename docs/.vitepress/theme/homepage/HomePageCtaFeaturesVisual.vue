<script setup lang="ts">
import { faChartMixed, faImage, faQrcode, faTable, faText } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";
import { computed } from "vue";

/* The features-overview card's visual, standing in for HomePageCtaDeckVisual.vue until the sample gallery ships:
   a page in 3D with a tile beside it for each kind of content on it, joined to that content by a leader line. On
   hover (or in view on a device without hover) the tiles lift and take the accent one after another in reading
   order, each leader draws across and the content it names lights up inside an outline; the tiles float while the
   pointer stays. The poses are CSS transitions, so a change of state is never cut short. Reduced motion: the tiles
   stay down, only the colours change. */

const props = defineProps<{ active: boolean; visible: boolean }>();
const lit = computed(() => props.active || props.visible);

/* a shape on the page, in page coordinates (148 x 200): a placeholder bar, a photo (block) or a QR code (qr);
   `region` names the tile it belongs to, so it takes the accent with it */
interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Shape extends Box {
  kind?: "block" | "qr";
  tone?: "strong" | "soft" | "accent";
  region?: number;
}

function box(item: Box) {
  return { left: `${item.x}px`, top: `${item.y}px`, width: `${item.w}px`, height: `${item.h}px` };
}

const chartHeights = [18, 30, 22, 40, 32];

const shapes: Shape[] = [
  { x: 10, y: 12, w: 64, h: 8, tone: "strong", region: 0 },
  { x: 10, y: 24, w: 40, h: 4, tone: "soft" },
  { x: 108, y: 13, w: 30, h: 4, tone: "soft" },
  { x: 10, y: 36, w: 128, h: 4 },
  { x: 10, y: 43, w: 118, h: 4, tone: "soft" },
  { x: 10, y: 50, w: 96, h: 4 },

  ...chartHeights.map((h, index): Shape => ({ x: 10 + index * 12, y: 106 - h, w: 9, h, tone: index === 3 ? "accent" : "strong", region: 1 })),
  { x: 10, y: 106, w: 58, h: 1.5, tone: "soft" },
  { kind: "block", x: 80, y: 62, w: 60, h: 44, region: 2 },

  { x: 10, y: 118, w: 128, h: 9, tone: "strong", region: 3 },
  ...[132, 141, 150, 159].flatMap(y => [[12, 36], [60, 20], [90, 16], [116, 20]].map(([x, w], index): Shape => ({ x, y, w, h: 4, tone: index === 1 || index === 2 ? "soft" : undefined }))),

  { x: 10, y: 176, w: 70, h: 3.5, tone: "soft" },
  { x: 10, y: 183, w: 54, h: 3.5, tone: "soft" },
  { kind: "qr", x: 116, y: 172, w: 22, h: 22, region: 4 }
];

/* the outline around each region, by tile */
const frames: Box[] = [
  { x: 7, y: 9, w: 70, h: 14 },
  { x: 7, y: 59, w: 66, h: 51 },
  { x: 77, y: 59, w: 66, h: 50 },
  { x: 7, y: 115, w: 134, h: 51 },
  { x: 113, y: 169, w: 28, h: 28 }
];

/* the tiles (34 x 34) beside the page in reading order; a leader runs from a tile's near edge to its outline */
const TILE = 34;

const tiles = [
  { icon: faText, side: "left", y: 2 },
  { icon: faChartMixed, side: "left", y: 66 },
  { icon: faImage, side: "right", y: 66 },
  { icon: faTable, side: "left", y: 124 },
  { icon: faQrcode, side: "right", y: 166 }
].map((tile, index) => {
  const frame = frames[index];
  const x = tile.side === "left" ? -42 : 156;
  const leader = tile.side === "left" ? frame.x - (x + TILE) : x - (frame.x + frame.w);
  return { ...tile, index, style: { left: `${x}px`, top: `${tile.y}px`, "--n": index, "--leader": `${leader}px` } };
});
</script>

<template>
  <div class="scene features" :class="{ active: lit }">
    <div class="stage">
      <div class="model">
        <div class="shadow" />

        <div class="paper page">
          <span
              v-for="(shape, index) of shapes"
              :key="index"
              class="shape"
              :class="[shape.kind, shape.tone, { lit: lit && shape.region !== undefined }]"
              :style="{ ...box(shape), '--n': shape.region }" />

          <span v-for="(frame, index) of frames" :key="index" class="frame" :class="{ lit }" :style="{ ...box(frame), '--n': index }" />
        </div>

        <div v-for="tile of tiles" :key="tile.index" class="tile" :class="tile.side" :style="tile.style">
          <span class="leader" />
          <span class="tile-face" :class="{ lit }"><Icon :icon="tile.icon" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./ctaVisual.css"></style>

<style scoped>

/* the pose, the mirror of the invoice beside it, a little flatter as the tiles hang out to the sides */
.features {
  --tilt-y: -20deg;
  --tilt-z: 2deg;
  --ink-strong: #5A6472;
  /* the lit colour is the card's link colour, so on the dark theme it is the same lifted violet */
  --lit: light-dark(var(--accent-secondary), var(--accent-text));
}

.page {
  overflow: hidden;
  color: var(--ink);
}


/* Shapes */
.shape {
  transition: color 0.45s ease, opacity 0.45s ease, background-color 0.45s ease;
}

.shape.accent {
  color: var(--lit);
  opacity: 0.55;
}

.shape.block {
  opacity: 0.32;
  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 60%);
}

/* two checkerboards of different periods make the modules look irregular; the inset ring is the finder pattern */
.shape.qr {
  opacity: 0.85;
  border-radius: 1px;
  background-color: transparent;
  background-image:
      conic-gradient(currentColor 25%, transparent 0 50%, currentColor 0 75%, transparent 0),
      conic-gradient(currentColor 25%, transparent 0 50%, currentColor 0 75%, transparent 0);
  background-size: 4px 4px, 6px 6px;
  background-position: 0 0, 1px 1px;
  box-shadow: inset 0 0 0 1.5px currentColor;
}

.shape.lit {
  color: var(--lit);
  transition-delay: calc(var(--n) * 140ms + 220ms);
}

.shape.lit.accent {
  opacity: 1;
}

.shape.lit.block {
  background-color: color-mix(in srgb, var(--accent) 45%, #C9D0DB);
  opacity: 0.55;
}

.frame {
  position: absolute;
  border-radius: 3px;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--lit) 55%, transparent);
  background-color: color-mix(in srgb, var(--lit) 6%, transparent);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.frame.lit {
  opacity: 1;
  transition-delay: calc(var(--n) * 140ms + 220ms);
}


/* Tiles: --lift is the height above the page; the face carries the look and, while hovered, the float */
.tile {
  --lift: 6px;
  position: absolute;
  width: 34px;
  height: 34px;
  transform: translateZ(var(--lift));
  transition: transform 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) calc((4 - var(--n)) * 50ms);
}

.features.active .tile {
  --lift: 30px;
  transition-delay: calc(var(--n) * 140ms);
}

.tile-face {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 9px;
  background-image: linear-gradient(180deg, #FFFFFF, #F5F6FA);
  color: var(--ink-strong);
  box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      0 0 0 1px rgba(16, 24, 40, 0.1),
      0 2px 4px rgba(16, 24, 40, 0.1);
  transform: scale(0.94);
  transition: transform 0.55s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.55s ease, color 0.4s ease;
}

.tile-face.lit {
  color: var(--lit);
  transform: scale(1);
  box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      0 0 0 1px color-mix(in srgb, var(--lit) 45%, transparent),
      0 12px 20px -8px color-mix(in srgb, var(--lit) 55%, rgba(16, 24, 40, 0.35));
  transition-delay: calc(var(--n) * 140ms);
}

/* 16px once the scene's scale is applied */
.tile .icon {
  font-size: 1.375rem;
}

/* the leader: drawn from the tile's side to the outline, with a dot at the far end */
.leader {
  position: absolute;
  top: 16.5px;
  width: var(--leader);
  height: 1px;
  background-color: var(--lit);
  transform: scaleX(0);
  transition: transform 0.35s ease;
}

.tile.left .leader {
  left: 34px;
  transform-origin: left;
}

.tile.right .leader {
  right: 34px;
  transform-origin: right;
}

.leader::after {
  content: "";
  position: absolute;
  top: -1.5px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--lit);
}

.tile.left .leader::after {
  right: -2px;
}

.tile.right .leader::after {
  left: -2px;
}

.features.active .leader {
  transform: scaleX(1);
  transition-delay: calc(var(--n) * 140ms + 140ms);
}


/* Hover */
@media (prefers-reduced-motion: no-preference) {
  .features.active {
    --tilt-x: 4deg;
    --tilt-y: -12deg;
    --tilt-z: 1deg;
    --rise: -4px;
  }

  /* `translate`, not transform, so the float and the scale transition never fight */
  .features.active .tile-face {
    animation: tile-float 3.4s ease-in-out calc(var(--n) * -0.65s + 1s) infinite;
  }
}

@keyframes tile-float {
  0%, 100% {
    translate: 0 0;
  }

  50% {
    translate: 0 -2.5px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .features.active .tile {
    --lift: 6px;
  }

  .tile,
  .tile-face,
  .leader,
  .shape,
  .frame {
    transition: none;
  }
}

</style>

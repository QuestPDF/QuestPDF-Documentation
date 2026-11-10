<script setup lang="ts">
import {
  faBezierCurve, faChartMixed, faImage, faLayerGroup, faList, faNewspaper, faQrcode, faTable, faText
} from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { reducedMotion, Timeline } from "./ctaTimeline";

/* The features-overview card's visual: a paper page, the mirror of the invoice beside it, with one slot that shows
   nine kinds of content from the Features Overview in turn, each entering its own way; the chip on the corner flips
   to the kind's icon. It steps while hovered and for a few steps when the card comes into view on a device without
   hover; leaving stops on the current kind and the next visit carries on from there. Reduced motion: no steps. */

const props = defineProps<{ active: boolean; visible: boolean }>();
const lit = computed(() => props.active || props.visible);
const root = ref<HTMLElement>();

/* Charts first, so the first view does not repeat the invoice's table */
const kinds = [
  { name: "charts", icon: faChartMixed },
  { name: "tables", icon: faTable },
  { name: "text", icon: faText },
  { name: "images", icon: faImage },
  { name: "lists", icon: faList },
  { name: "columns", icon: faNewspaper },
  { name: "layers", icon: faLayerGroup },
  { name: "codes", icon: faQrcode },
  { name: "vector", icon: faBezierCurve }
];

const FIRST = 300;
const HOLD = 1350;
const STEPS_IN_VIEW = 6;

const step = ref(0);
const previous = ref(-1);
const timeline = new Timeline();

let token = 0;
let running = false;

/* the waits run on the document timeline (see ctaTimeline.ts); a cancelled wait ends the run */
async function play() {
  const mine = ++token;
  running = true;

  let remaining = STEPS_IN_VIEW;
  let delay = FIRST;

  while (await Timeline.settled([timeline.wait(root.value!, delay)]) && mine === token) {
    if (!props.active && !(props.visible && remaining > 0)) {
      running = false;
      return;
    }

    previous.value = step.value;
    step.value = (step.value + 1) % kinds.length;
    remaining--;
    delay = HOLD;
  }
}

watch(lit, isLit => {
  if (isLit) {
    if (!running && !reducedMotion())
      play();

    return;
  }

  token++;
  running = false;
  timeline.cancel();
});

onBeforeUnmount(() => timeline.cancel());

const kind = (name: string) => {
  const index = kinds.findIndex(item => item.name === name);
  return index === step.value ? "current" : index === previous.value ? "leaving" : "waiting";
};

/* the chip: two faces, the hidden one takes the next icon and the chip turns half way */
const faces = ref([kinds[0].icon, kinds[0].icon]);
const flips = ref(0);

watch(step, now => {
  faces.value[(flips.value + 1) % 2] = kinds[now].icon;
  flips.value++;
});

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

const box = (item: Box) => ({ left: `${item.x}px`, top: `${item.y}px`, width: `${item.w}px`, height: `${item.h}px` });

/* charts: bars on a baseline, a trend line through their tops */
const heights = [20, 32, 26, 42, 34, 48];
const bars = heights.map((h, i) => ({ x: 2 + i * 14, y: 58 - h, w: 9, h }));
const points = bars.map(bar => [bar.x + 4.5, bar.y - 7]);
const trend = points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");

/* tables: a tinted header, four rows with zebra stripes */
const rows = [13, 25, 37, 49];
const cells = [{ x: 5, w: 28 }, { x: 42, w: 12, soft: true }, { x: 64, w: 16 }];

/* rich text: word bars, one highlighted, one bold, one underlined */
const words = [
  { x: 0, y: 42, w: 18 },
  { x: 22, y: 42, w: 20, style: "highlight" },
  { x: 46, y: 42, w: 24 },
  { x: 74, y: 42, w: 10, soft: true },
  { x: 0, y: 52, w: 12, style: "bold" },
  { x: 16, y: 52, w: 30 },
  { x: 50, y: 52, w: 18, style: "underline" },
  { x: 72, y: 52, w: 12, soft: true }
];

/* lists: two levels */
const items = [
  { level: 1, y: 3, w: 58 },
  { level: 1, y: 15.5, w: 44 },
  { level: 2, y: 28, w: 46 },
  { level: 2, y: 40.5, w: 36 },
  { level: 1, y: 53, w: 52 }
];

/* multi-column text: a headline across, then the text flows down the first column and on into the second */
const columnA = [38, 38, 38, 38, 28, 38, 24].map((w, i) => ({ x: 0, y: 16 + i * 7, w, h: 4 }));
const columnB = [38, 38, 32, 20].map((w, i) => ({ x: 46, y: 37 + i * 7, w, h: 4 }));

/* barcodes and QR codes: a 4px module grid and a barcode */
const modules = [
  [17, 1], [21, 5], [17, 9], [25, 9], [29, 13], [17, 17], [21, 21], [33, 17], [37, 21], [41, 17],
  [5, 17], [1, 21], [9, 25], [13, 21], [25, 25], [17, 29], [29, 29], [21, 33], [37, 29], [41, 37],
  [33, 37], [25, 41], [17, 41], [37, 41]
].map(([x, y]) => ({ x, y, w: 4, h: 4 }));
const barcode = [2, 3, 2, 4, 2, 3, 2].reduce<Box[]>((list, w) => {
  const last = list[list.length - 1];
  return [...list, { x: last ? last.x + last.w + 2 : 52, y: 10, w, h: 34 }];
}, []);

/* vector graphics: a curve through three anchors, the middle one with its handles */
const anchors = [[4, 50], [42, 31], [80, 12]];
const handles = [[34, 5], [50, 57]];
</script>

<template>
  <div ref="root" class="scene features" :class="{ active: lit }">
    <div class="stage">
      <div class="model">
        <div class="shadow" />

        <div class="paper page">
          <span class="shape strong" :style="box({ x: 10, y: 12, w: 46, h: 7 })" />
          <span class="shape soft" :style="box({ x: 10, y: 23, w: 70, h: 4 })" />
          <span class="shape" :style="box({ x: 10, y: 108, w: 84, h: 4 })" />
          <span class="shape soft" :style="box({ x: 10, y: 116, w: 62, h: 4 })" />
          <span class="shape soft" :style="box({ x: 10, y: 126, w: 30, h: 3 })" />

          <div class="slot" :class="{ lit }">
            <!-- Charts -->
            <div class="variant chart" :class="kind('charts')">
              <span class="baseline" />
              <span v-for="(bar, i) of bars" :key="i" class="bar" :style="{ ...box(bar), '--i': i }" />
              <svg class="drawing" viewBox="0 0 84 62" aria-hidden="true">
                <path class="trend" :d="trend" pathLength="1" />
                <circle v-for="([x, y], i) of points" :key="i" class="dot" :cx="x" :cy="y" r="2.4" :style="{ '--i': i }" />
              </svg>
            </div>

            <!-- Tables -->
            <div class="variant table" :class="kind('tables')">
              <span class="header">
                <span class="cell" :style="box({ x: 5, y: 3.5, w: 22, h: 4 })" />
                <span class="cell" :style="box({ x: 42, y: 3.5, w: 14, h: 4 })" />
                <span class="cell" :style="box({ x: 64, y: 3.5, w: 15, h: 4 })" />
              </span>
              <span v-for="(y, r) of rows" :key="r" class="row" :class="{ striped: r % 2 === 1 }" :style="{ top: `${y}px`, '--i': r }">
                <span v-for="(cell, c) of cells" :key="c" class="cell" :class="{ soft: cell.soft }" :style="box({ x: cell.x, y: 3.5, w: cell.w, h: 4 })" />
              </span>
            </div>

            <!-- Rich text -->
            <div class="variant text" :class="kind('text')">
              <span class="glyphs">Aa</span>
              <span class="word strong" :style="{ ...box({ x: 44, y: 6, w: 40, h: 6 }), '--i': 0 }" />
              <span class="word soft" :style="{ ...box({ x: 44, y: 17, w: 32, h: 4 }), '--i': 1 }" />
              <span class="word soft" :style="{ ...box({ x: 44, y: 25, w: 36, h: 4 }), '--i': 2 }" />
              <template v-for="(word, i) of words" :key="i">
                <span v-if="word.style === 'highlight'" class="marker" :style="{ ...box({ x: word.x - 2, y: word.y - 3, w: word.w + 4, h: 10 }), '--i': i + 3 }" />
                <span class="word" :class="[word.style, { soft: word.soft }]" :style="{ ...box({ x: word.x, y: word.y, w: word.w, h: word.style === 'bold' ? 5 : 4 }), '--i': i + 3 }" />
                <span v-if="word.style === 'underline'" class="underline" :style="{ ...box({ x: word.x, y: word.y + 6, w: word.w, h: 1.5 }), '--i': i + 3 }" />
              </template>
            </div>

            <!-- Images -->
            <div class="variant photo" :class="kind('images')">
              <span class="photo-inner">
                <span class="sun" />
                <span class="hills back" />
                <span class="hills front" />
              </span>
            </div>

            <!-- Lists -->
            <div class="variant list" :class="kind('lists')">
              <template v-for="(item, i) of items" :key="i">
                <span class="bullet" :class="`level-${item.level}`" :style="{ ...box({ x: item.level === 1 ? 1 : 13, y: item.y, w: 5, h: 5 }), '--i': i }" />
                <span class="word" :class="{ soft: item.level === 2 }" :style="{ ...box({ x: item.level === 1 ? 11 : 23, y: item.y + 0.5, w: item.w, h: 4 }), '--i': i }" />
              </template>
            </div>

            <!-- Multi-column text -->
            <div class="variant columns" :class="kind('columns')">
              <span class="headline" :style="box({ x: 0, y: 0, w: 66, h: 7 })" />
              <span class="rule" :style="box({ x: 0, y: 11, w: 84, h: 1 })" />
              <span class="column-rule" :style="box({ x: 41.5, y: 16, w: 1, h: 46 })" />
              <span v-for="(line, i) of columnA" :key="`a${i}`" class="word" :style="{ ...box(line), '--i': i }" />
              <span class="figure" :style="box({ x: 46, y: 16, w: 38, h: 17 })" />
              <span v-for="(line, i) of columnB" :key="`b${i}`" class="word later" :style="{ ...box(line), '--i': i }" />
            </div>

            <!-- Layers -->
            <div class="variant layers" :class="kind('layers')">
              <span class="layer layer-back" />
              <span class="layer layer-mid">
                <span class="word strong" :style="box({ x: 6, y: 6, w: 30, h: 5 })" />
                <span class="word" :style="box({ x: 6, y: 15, w: 42, h: 4 })" />
                <span class="word soft" :style="box({ x: 6, y: 23, w: 36, h: 4 })" />
                <span class="word soft" :style="box({ x: 6, y: 31, w: 40, h: 4 })" />
              </span>
              <span class="layer layer-top"><span class="stamp-bar" /></span>
            </div>

            <!-- Barcodes and QR codes -->
            <div class="variant codes" :class="kind('codes')">
              <span class="finder" style="left: 0; top: 8px" />
              <span class="finder" style="left: 33px; top: 8px" />
              <span class="finder" style="left: 0; top: 41px" />
              <span v-for="(module, i) of modules" :key="i" class="module" :style="{ ...box({ ...module, y: module.y + 8 }), '--d': module.x + module.y }" />
              <span v-for="(line, i) of barcode" :key="`b${i}`" class="code-bar" :style="{ ...box(line), '--i': i }" />
              <span class="shape soft" :style="box({ x: 53, y: 48, w: 26, h: 3.5 })" />
            </div>

            <!-- Vector graphics -->
            <div class="variant vector" :class="kind('vector')">
              <svg class="drawing" viewBox="0 0 84 62" aria-hidden="true">
                <path class="curve" d="M4 50 C18 4 34 4 42 31 C50 58 66 58 80 12" pathLength="1" />
                <line class="handle" :x1="handles[0][0]" :y1="handles[0][1]" :x2="handles[1][0]" :y2="handles[1][1]" />
                <circle v-for="([x, y], i) of handles" :key="`h${i}`" class="control" :cx="x" :cy="y" r="2.8" />
                <rect v-for="([x, y], i) of anchors" :key="`a${i}`" class="anchor" :x="x - 3.5" :y="y - 3.5" width="7" height="7" rx="1" :style="{ '--i': i }" />
              </svg>
            </div>
          </div>
        </div>

        <div class="chip" :class="{ lit }">
          <div class="chip-spin" :style="{ transform: `rotateY(${flips * 180}deg)` }">
            <span class="tile face" :class="{ lit }"><Icon :icon="faces[0]" /></span>
            <span class="tile face back" :class="{ lit }"><Icon :icon="faces[1]" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./ctaVisual.css"></style>

<style scoped>

/* the pose, the mirror of the invoice beside it; at 0.9 the page is about the invoice's size */
.features {
  --scale: 0.9;
  --tilt-y: -20deg;
  --tilt-z: 2deg;
  --ink-strong: #5A6472;
  --on-paper: light-dark(var(--accent-secondary), var(--accent));
  min-height: 148px;
}

@media (prefers-reduced-motion: no-preference) {
  .features.active {
    --tilt-x: 4deg;
    --tilt-y: -12deg;
    --tilt-z: 1deg;
    --rise: -4px;
  }
}

.model {
  width: 104px;
  height: 136px;
  margin: -68px 0 0 -56px;
}

.page {
  color: var(--ink);
}


/* the slot: framed in the accent while lit */
.slot {
  position: absolute;
  left: 7px;
  top: 33px;
  width: 90px;
  height: 68px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px transparent;
  transition: box-shadow 0.35s ease, background-color 0.35s ease;
}

.slot.lit {
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--on-paper) 45%, transparent);
  background-color: color-mix(in srgb, var(--on-paper) 4%, transparent);
}

.slot span {
  position: absolute;
  display: block;
}


/* a kind shows while current, fades out while leaving and resets unseen while waiting; its parts carry their own
   entrance, played only on the way in and done within 0.8s */
.variant {
  position: absolute;
  inset: 3px;
  opacity: 0;
}

.variant.current {
  opacity: 1;
  transition: opacity 0.2s ease;
}

.variant.leaving {
  transition: opacity 0.25s ease;
}

.variant.waiting,
.variant.waiting * {
  transition: none !important;
}

.current {
  --ease: cubic-bezier(0.2, 0.75, 0.2, 1);
}

.drawing {
  position: absolute;
  inset: 0;
  overflow: visible;
}

.word {
  border-radius: 2px;
  background-color: #A7AEBB;
  transform-origin: left;
}

.word.strong,
.word.bold {
  background-color: var(--ink-strong);
}

.word.soft {
  opacity: 0.55;
}


/* Charts */
.baseline {
  left: 0;
  top: 58px;
  width: 84px;
  height: 1px;
  background-color: var(--ink);
}

.bar {
  border-radius: 2px 2px 0 0;
  background-color: #B9C0CB;
  transform-origin: bottom;
}

.trend {
  fill: none;
  stroke: var(--on-paper);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
}

.dot {
  fill: var(--on-paper);
  stroke: #FFF;
  stroke-width: 1.2;
  transform-box: fill-box;
  transform-origin: center;
}

.chart.waiting .bar {
  transform: scaleY(0);
}

.chart.waiting .trend {
  stroke-dashoffset: 1;
}

.chart.waiting .dot {
  transform: scale(0);
}

.chart.current .bar {
  transition: transform 0.45s var(--ease) calc(var(--i) * 45ms + 60ms);
}

.chart.current .trend {
  transition: stroke-dashoffset 0.55s ease-in-out 0.2s;
}

.chart.current .dot {
  transition: transform 0.3s cubic-bezier(0.3, 1.5, 0.5, 1) calc(var(--i) * 55ms + 0.2s);
}


/* Tables */
.table .header {
  left: 0;
  top: 0;
  width: 84px;
  height: 11px;
  border-radius: 2px;
  background-color: color-mix(in srgb, var(--on-paper) 14%, transparent);
}

.table .header .cell {
  background-color: var(--on-paper);
  opacity: 0.8;
}

.table .row {
  left: 0;
  width: 84px;
  height: 11px;
  border-radius: 2px;
}

.table .row.striped {
  background-color: #EEF1F5;
}

.table .cell {
  border-radius: 2px;
  background-color: #A7AEBB;
}

.table .cell.soft {
  opacity: 0.55;
}

.table.waiting .header {
  opacity: 0;
  transform: translateY(-4px);
}

.table.waiting .row {
  opacity: 0;
  transform: translateX(-8px);
}

.table.current .header {
  transition: opacity 0.25s ease 0.06s, transform 0.35s var(--ease) 0.06s;
}

.table.current .row {
  transition: opacity 0.25s ease calc(var(--i) * 70ms + 0.12s), transform 0.4s var(--ease) calc(var(--i) * 70ms + 0.12s);
}


/* Rich text: the specimen, then the words write out left to right */
.glyphs {
  left: 0;
  top: -1px;
  font-size: 32px;
  line-height: 38px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink-strong);
}

.marker {
  border-radius: 2px;
  background-color: color-mix(in srgb, var(--on-paper) 24%, transparent);
  transform-origin: left;
}

.word.highlight {
  background-color: var(--on-paper);
  opacity: 0.85;
}

.underline {
  border-radius: 1px;
  background-color: var(--on-paper);
  transform-origin: left;
}

.text.waiting .glyphs {
  opacity: 0;
  transform: scale(0.85);
}

.text.waiting :is(.word, .marker, .underline) {
  transform: scaleX(0);
}

.text.current .glyphs {
  transition: opacity 0.25s ease 0.05s, transform 0.35s var(--ease) 0.05s;
}

.text.current .word {
  transition: transform 0.25s ease-out calc(var(--i) * 40ms + 0.1s);
}

.text.current :is(.marker, .underline) {
  transition: transform 0.25s ease-out calc(var(--i) * 40ms + 0.22s);
}


/* Images: wiped in from the left while the picture settles */
.photo {
  overflow: hidden;
  border-radius: 3px;
  clip-path: inset(0 0 0 0 round 3px);
}

.photo-inner {
  inset: 0;
  background-image: linear-gradient(170deg, #E1E7F1, #C7D0DE);
}

.sun {
  left: 56px;
  top: 9px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #FFF;
}

.hills {
  inset: 0;
}

.hills.back {
  top: 20px;
  background-color: #C0C7D3;
  clip-path: polygon(0 100%, 0 55%, 18% 30%, 40% 60%, 62% 18%, 84% 48%, 100% 34%, 100% 100%);
}

.hills.front {
  top: 30px;
  background-color: #9AA3B2;
  clip-path: polygon(0 100%, 0 52%, 24% 16%, 46% 58%, 70% 30%, 100% 74%, 100% 100%);
  transition: background-color 0.4s ease;
}

.slot.lit .hills.front {
  background-color: color-mix(in srgb, var(--on-paper) 50%, #9AA3B2);
}

.photo.waiting {
  clip-path: inset(0 100% 0 0 round 3px);
}

.photo.waiting .photo-inner {
  transform: scale(1.18);
}

.photo.current {
  transition: opacity 0.2s ease, clip-path 0.6s cubic-bezier(0.6, 0, 0.2, 1) 0.05s;
}

.photo.current .photo-inner {
  transition: transform 0.8s var(--ease) 0.05s;
}


/* Lists: each bullet pops, then its line writes out */
.bullet {
  border-radius: 50%;
}

.bullet.level-1 {
  background-color: var(--on-paper);
}

.bullet.level-2 {
  box-shadow: inset 0 0 0 1.5px var(--ink-strong);
}

.list.waiting .bullet {
  transform: scale(0);
}

.list.waiting .word {
  transform: scaleX(0);
}

.list.current .bullet {
  transition: transform 0.25s cubic-bezier(0.3, 1.5, 0.5, 1) calc(var(--i) * 80ms + 0.06s);
}

.list.current .word {
  transition: transform 0.3s ease-out calc(var(--i) * 80ms + 0.12s);
}


/* Multi-column text: the headline, then the text flows down the first column and on into the second */
.headline {
  border-radius: 2px;
  background-color: var(--ink-strong);
  transform-origin: left;
}

.rule,
.column-rule {
  background-color: var(--ink);
  opacity: 0.7;
}

.rule {
  transform-origin: left;
}

.column-rule {
  opacity: 0.4;
}

.figure {
  border-radius: 2px;
  background-image: linear-gradient(160deg, #DCE2EC, #C2CAD6);
}

.columns.waiting :is(.headline, .rule, .word) {
  transform: scaleX(0);
}

.columns.waiting :is(.figure, .column-rule) {
  opacity: 0;
}

.columns.current .headline {
  transition: transform 0.3s ease-out 0.04s;
}

.columns.current .rule {
  transition: transform 0.3s ease-out 0.1s;
}

.columns.current .column-rule {
  transition: opacity 0.3s ease 0.14s;
}

.columns.current .word {
  transition: transform 0.22s ease-out calc(var(--i) * 35ms + 0.14s);
}

.columns.current .figure {
  transition: opacity 0.3s ease 0.38s;
}

.columns.current .word.later {
  transition: transform 0.22s ease-out calc(var(--i) * 35ms + 0.42s);
}


/* Layers: a background, the content and a stamp, each arriving from its own side and settling on the last */
.layer {
  position: absolute;
}

.layer-back {
  inset: 0;
  border-radius: 4px;
  background-color: #E8ECF3;
  background-image: repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0 3px, transparent 3px 7px);
}

.layer-mid {
  left: 8px;
  top: 8px;
  width: 56px;
  height: 41px;
  border-radius: 3px;
  background-color: #FFF;
  box-shadow: 0 0 0 1px rgba(16, 24, 40, 0.06), 0 3px 6px -2px rgba(16, 24, 40, 0.2);
}

.layer-top {
  left: 44px;
  top: 34px;
  width: 36px;
  height: 19px;
  border-radius: 4px;
  box-shadow: inset 0 0 0 2px var(--on-paper);
  background-color: color-mix(in srgb, var(--on-paper) 8%, #FFF);
  transform: rotate(-10deg);
}

.stamp-bar {
  left: 7px;
  top: 7.5px;
  width: 22px;
  height: 4px;
  border-radius: 2px;
  background-color: var(--on-paper);
}

.layers.waiting .layer-back {
  opacity: 0;
  transform: translate(-6px, 6px);
}

.layers.waiting .layer-mid {
  opacity: 0;
  transform: translate(6px, -6px);
}

.layers.waiting .layer-top {
  opacity: 0;
  transform: rotate(-10deg) scale(1.6);
}

.layers.current .layer-back {
  transition: opacity 0.3s ease 0.04s, transform 0.4s var(--ease) 0.04s;
}

.layers.current .layer-mid {
  transition: opacity 0.3s ease 0.16s, transform 0.4s var(--ease) 0.16s;
}

.layers.current .layer-top {
  transition: opacity 0.2s ease 0.42s, transform 0.32s cubic-bezier(0.3, 1.3, 0.5, 1) 0.42s;
}


/* Barcodes and QR codes: finders first, modules in a diagonal wave, then the barcode prints top down */
.finder {
  width: 13px;
  height: 13px;
  border-radius: 1px;
  box-shadow: inset 0 0 0 3px var(--ink-strong);
  background-image: linear-gradient(var(--ink-strong) 0 0);
  background-size: 5px 5px;
  background-position: center;
  background-repeat: no-repeat;
}

.module {
  background-color: var(--ink-strong);
  opacity: 0.85;
}

.code-bar {
  background-color: var(--ink-strong);
  transform-origin: top;
}

.codes.waiting .finder {
  opacity: 0;
  transform: scale(0.5);
}

.codes.waiting .module {
  opacity: 0;
}

.codes.waiting .code-bar {
  transform: scaleY(0);
}

.codes.current .finder {
  transition: opacity 0.2s ease 0.05s, transform 0.35s cubic-bezier(0.3, 1.4, 0.5, 1) 0.05s;
}

.codes.current .module {
  transition: opacity 0.2s ease calc(var(--d) * 4ms + 0.15s);
}

.codes.current .code-bar {
  transition: transform 0.3s var(--ease) calc(var(--i) * 35ms + 0.26s);
}


/* Vector graphics: the curve draws, its anchors land, then the middle anchor's handles show */
.curve {
  fill: none;
  stroke: var(--ink-strong);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
}

.handle {
  stroke: var(--on-paper);
  stroke-width: 1;
  opacity: 0.7;
}

.control {
  fill: #FFF;
  stroke: var(--on-paper);
  stroke-width: 1.5;
}

.anchor {
  fill: #FFF;
  stroke: var(--on-paper);
  stroke-width: 1.5;
  transform-box: fill-box;
  transform-origin: center;
}

.vector.waiting .curve {
  stroke-dashoffset: 1;
}

.vector.waiting .anchor {
  transform: scale(0);
}

.vector.waiting :is(.handle, .control) {
  opacity: 0;
}

.vector.current .curve {
  transition: stroke-dashoffset 0.55s ease-in-out 0.04s;
}

.vector.current .anchor {
  transition: transform 0.25s cubic-bezier(0.3, 1.5, 0.5, 1) calc(var(--i) * 120ms + 0.2s);
}

.vector.current :is(.handle, .control) {
  transition: opacity 0.25s ease 0.5s;
}


/* the chip on the page's corner: two faces, turned half a turn per kind */
.chip {
  position: absolute;
  left: 76px;
  top: -14px;
  width: 38px;
  height: 38px;
  transform: translateZ(16px);
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.chip.lit {
  transform: translateZ(26px);
}

.chip-spin {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.35, 0.1, 0.2, 1);
}

.tile {
  position: absolute;
  overflow: hidden;
  border-radius: 10px;
  background-image: linear-gradient(180deg, #FFFFFF, #F4F5F9);
  color: var(--ink-strong);
  box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      0 0 0 1px rgba(16, 24, 40, 0.1),
      0 2px 4px rgba(16, 24, 40, 0.1);
  transition: box-shadow 0.45s ease, color 0.35s ease;
}

.tile.lit {
  color: var(--on-paper);
  box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      0 0 0 1px color-mix(in srgb, var(--on-paper) 40%, transparent),
      0 12px 20px -8px color-mix(in srgb, var(--on-paper) 50%, rgba(16, 24, 40, 0.35));
}

.face {
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
}

.face.back {
  transform: rotateY(180deg);
}

.face .icon {
  font-size: 1.125rem;
}

@media (prefers-reduced-motion: reduce) {
  .slot,
  .slot *,
  .chip,
  .chip-spin,
  .tile {
    transition: none !important;
  }
}

</style>

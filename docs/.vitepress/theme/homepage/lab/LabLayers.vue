<script setup lang="ts">
import { ref } from "vue";
import { useInView, useLoop } from "./labAnimation";
import LabPanel from "./LabPanel.vue";

/* 09 Exploded layers: a document as a stack of transparent layers seen from an angle, like an
   exploded drawing. Each layer is one family of capabilities: the page itself, the text, the media,
   the tables, the operations on top, and the file-level properties. The stack opens up when it
   comes into view, floats gently, and the layers take turns to lift and glow while the legend on the
   right names them. Hovering a legend row lifts its layer. */

const stage = ref<HTMLElement>();
const { animate, inView } = useInView(stage);

const layers = [
  { key: "page", name: "Page & styling", icons: ["fa-palette", "fa-page-break", "fa-hashtag", "fa-newspaper"], tags: "Styling, page breaks, page numbers, multi-column" },
  { key: "text", name: "Text & lists", icons: ["fa-text", "fa-list", "fa-link"], tags: "Rich text, lists, hyperlinks" },
  { key: "media", name: "Images & graphics", icons: ["fa-image", "fa-bezier-curve", "fa-chart-simple", "fa-qrcode", "fa-map"], tags: "Images, SVG, charts, barcodes, maps" },
  { key: "tables", name: "Tables", icons: ["fa-table"], tags: "Tables with spans, headers and footers" },
  { key: "operations", name: "Document operations", icons: ["fa-object-union", "fa-scissors", "fa-clone"], tags: "Merging, page extraction, overlays" },
  { key: "file", name: "File properties", icons: ["fa-lock", "fa-paperclip", "fa-tags", "fa-universal-access"], tags: "Encryption, attachments, metadata, accessibility" }
];

const active = ref(-1);
const hovered = ref(-1);
useLoop(animate, 1900, () => active.value = (active.value + 1) % layers.length);
</script>

<template>
  <lab-panel>
    <div ref="stage" class="exploded" :class="{ open: inView }">
      <div class="scene">
        <div class="stack" :class="{ floating: animate }">
          <div
              v-for="(layer, index) of layers"
              :key="layer.key"
              class="layer"
              :class="[layer.key, { on: (hovered >= 0 ? hovered : active) === index }]"
              :style="{ '--i': index }">
            <template v-if="layer.key === 'page'">
              <div class="band" />
              <div class="number">1</div>
            </template>

            <template v-else-if="layer.key === 'text'">
              <div class="line title" />
              <div class="line" />
              <div class="line" />
              <div class="line short" />
            </template>

            <template v-else-if="layer.key === 'media'">
              <div class="picture" />
              <div class="bars"><span /><span /><span /><span /></div>
              <div class="qr" />
            </template>

            <template v-else-if="layer.key === 'tables'">
              <div class="grid"><span v-for="cell in 12" :key="cell" /></div>
            </template>

            <template v-else-if="layer.key === 'operations'">
              <div class="stamp">COPY</div>
            </template>

            <template v-else>
              <i class="fa-solid fa-lock" />
              <i class="fa-solid fa-tags" />
            </template>
          </div>
        </div>
      </div>

      <div class="legend">
        <div
            v-for="(layer, index) of layers"
            :key="layer.key"
            class="row"
            :class="{ on: (hovered >= 0 ? hovered : active) === index }"
            @mouseenter="hovered = index"
            @mouseleave="hovered = -1">
          <span class="row-icons">
            <i v-for="icon of layer.icons" :key="icon" class="fa-regular" :class="icon" />
          </span>
          <span class="row-text">
            <span class="row-name">{{ layer.name }}</span>
            <span class="row-tags">{{ layer.tags }}</span>
          </span>
        </div>
      </div>
    </div>
  </lab-panel>
</template>

<style scoped>

.exploded {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  column-gap: 24px;
  align-items: center;
}

.scene {
  height: 320px;
  perspective: 1200px;
  perspective-origin: 50% 40%;
}

.stack {
  position: relative;
  width: 300px;
  height: 320px;
  margin-top: 36px;
  transform-style: preserve-3d;
  transform: rotateX(58deg) rotateZ(-34deg);
}

.stack.floating {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: rotateX(58deg) rotateZ(-34deg) translateZ(0); }
  50% { transform: rotateX(58deg) rotateZ(-34deg) translateZ(14px); }
}

.layer {
  --lift: 0px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150px;
  height: 200px;
  margin: -100px 0 0 -75px;
  padding: 14px 12px;
  border-radius: 4px;
  transform: translateZ(calc(var(--i) * 4px + var(--lift)));
  transition: transform 0.9s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, background-color 0.4s ease;
  transform-style: preserve-3d;
}

.open .layer {
  transform: translateZ(calc(var(--i) * 22px + var(--lift)));
}

.layer.on {
  --lift: 14px;
}

/* the lowest layer is the opaque sheet, the ones above are glass with a faint outline */
.layer.page {
  background: white;
  border: 1px solid #0002;
  box-shadow: 0 30px 40px -20px rgba(0, 0, 0, 0.35);
}

.layer:not(.page) {
  background-color: rgba(255, 255, 255, 0.35);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-2) 30%, transparent);
  box-shadow: 0 10px 20px -14px rgba(0, 0, 0, 0.25);
}

.layer.on:not(.page) {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 10%, rgba(255, 255, 255, 0.5));
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 10px 30px -10px color-mix(in srgb, var(--vp-c-brand-2) 70%, transparent);
}

.layer.page.on {
  border-color: var(--vp-c-brand-1);
}

html.dark .layer.page {
  background: #22262c;
  border-color: #fff2;
}

html.dark .layer:not(.page) {
  background-color: rgba(255, 255, 255, 0.05);
}

html.dark .layer.on:not(.page) {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 14%, rgba(255, 255, 255, 0.08));
}

/* layer content */

.band {
  height: 12px;
  margin: -14px -12px 0;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(100deg, #00c6ff, #2979ff);
}

.number {
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 8px;
  color: var(--vp-c-text-3);
}

.line {
  height: 5px;
  margin-top: 6px;
  margin-left: 0;
  width: 100%;
  border-radius: 2px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 35%, transparent);
}

.line.title {
  height: 9px;
  width: 65%;
  margin-top: 4px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 60%, transparent);
}

.line.short {
  width: 55%;
}

.picture {
  position: absolute;
  top: 58px;
  left: 12px;
  width: 58px;
  height: 42px;
  border-radius: 3px;
  background: linear-gradient(135deg, #B3E5FC, #4FC3F7);
}

.bars {
  position: absolute;
  top: 58px;
  right: 12px;
  display: flex;
  align-items: flex-end;
  gap: 3px;
  width: 58px;
  height: 42px;
  border-bottom: 1px solid color-mix(in srgb, var(--vp-c-text-1) 40%, transparent);
}

.bars span {
  flex: 1;
  background: linear-gradient(180deg, #42A5F5, #1E88E5);
  border-radius: 1px 1px 0 0;
}

.bars span:nth-child(1) { height: 45%; }
.bars span:nth-child(2) { height: 80%; }
.bars span:nth-child(3) { height: 60%; }
.bars span:nth-child(4) { height: 95%; }

.qr {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 26px;
  height: 26px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 85%, transparent);
  background-image:
      linear-gradient(90deg, white 50%, transparent 50%),
      linear-gradient(0deg, white 50%, transparent 50%);
  background-size: 8px 8px;
  background-blend-mode: multiply;
}

.grid {
  position: absolute;
  top: 112px;
  left: 12px;
  right: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 35%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-text-1) 35%, transparent);
}

.grid span {
  height: 10px;
  background-color: color-mix(in srgb, white 70%, transparent);
}

.grid span:nth-child(-n + 3) {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 35%, white);
}

html.dark .grid span {
  background-color: color-mix(in srgb, #22262c 80%, transparent);
}

.stamp {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 3px 10px;
  border: 3px solid #E53935;
  border-radius: 4px;
  color: #E53935;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.15em;
  line-height: 1;
  opacity: 0.8;
  transform: translate(-50%, -50%) rotate(-18deg);
}

.layer.file i {
  position: absolute;
  font-size: 18px;
  color: var(--vp-c-brand-1);
}

.layer.file .fa-lock {
  top: 12px;
  right: 12px;
}

.layer.file .fa-tags {
  bottom: 12px;
  left: 12px;
}

/* legend */

.legend {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: 14px;
  align-items: center;
  padding: 8px 12px;
  border-radius: 12px;
  transition: background-color 0.3s ease;
}

.row.on {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 12%, transparent);
}

.row-icons {
  display: flex;
  gap: 6px;
  min-width: 90px;
  color: var(--vp-c-text-3);
  font-size: 14px;
  transition: color 0.3s ease;
}

.row.on .row-icons {
  color: var(--vp-c-brand-1);
}

.row-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.row-name {
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.25rem;
  color: var(--vp-c-text-1);
}

.row-tags {
  font-size: 0.8125rem;
  line-height: 1.125rem;
  color: var(--vp-c-text-3);
}

@media screen and (max-width: 760px) {
  .exploded {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 16px;
    justify-items: center;
  }

  .legend {
    width: 100%;
  }
}

</style>

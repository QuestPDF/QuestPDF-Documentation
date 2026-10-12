<script setup lang="ts">
import { ref } from "vue";
import { useInView, useLoop } from "./labAnimation";
import LabPanel from "./LabPanel.vue";

/* 04 Operations theatre: the generation tags stay as they are; the six document operations get a
   small stage of their own. One operation is acted out at a time with a few CSS pages: two files
   slide together and merge, a page is pulled out of a stack, a stamp lands on a page, a file is
   clipped to a corner, a lock closes over the text, metadata lines are written beside the file.
   The acted operation is highlighted in the list on the right. */

const stage = ref<HTMLElement>();
const { animate } = useInView(stage);

const operations = [
  { key: "merge", icon: "fa-object-union", title: "Merging", description: "Combine several PDFs into one" },
  { key: "extract", icon: "fa-scissors", title: "Page extraction", description: "Pick the pages you need" },
  { key: "overlay", icon: "fa-clone", title: "Overlays", description: "Stamp, watermark or underlay" },
  { key: "attach", icon: "fa-paperclip", title: "Attachments", description: "Embed files inside the PDF" },
  { key: "encrypt", icon: "fa-lock", title: "Encryption", description: "Passwords and permissions" },
  { key: "metadata", icon: "fa-tags", title: "Metadata", description: "Title, author, keywords" }
];

const active = ref(0);
useLoop(animate, 2800, () => active.value = (active.value + 1) % operations.length);
</script>

<template>
  <lab-panel>
    <div ref="stage" class="theatre">
      <div class="scene-box">
        <!-- the key remounts the scene on every switch, so its keyframes start from the beginning -->
        <div :key="active" class="scene" :class="operations[active].key">
          <template v-if="operations[active].key === 'merge'">
            <div class="sheet doc left"><div class="text" /></div>
            <div class="sheet doc right"><div class="text" /></div>
          </template>

          <template v-else-if="operations[active].key === 'extract'">
            <div class="sheet doc stack back"><div class="text" /></div>
            <div class="sheet doc stack middle picked"><div class="text" /></div>
            <div class="sheet doc stack front"><div class="text" /></div>
          </template>

          <template v-else-if="operations[active].key === 'overlay'">
            <div class="sheet doc single"><div class="text" /><span class="stamp">PAID</span></div>
          </template>

          <template v-else-if="operations[active].key === 'attach'">
            <div class="sheet doc single"><div class="text" /></div>
            <div class="file"><i class="fa-regular fa-file-code" /></div>
            <i class="fa-regular fa-paperclip clip" />
          </template>

          <template v-else-if="operations[active].key === 'encrypt'">
            <div class="sheet doc single"><div class="text" /><div class="text scrambled" /></div>
            <span class="lock">
              <i class="fa-regular fa-unlock open" />
              <i class="fa-regular fa-lock closed" />
            </span>
          </template>

          <template v-else>
            <div class="sheet doc single aside"><div class="text" /></div>
            <div class="meta">
              <div class="meta-line" style="--i: 0"><span class="key">Title</span><span class="ink" style="width: 44px" /></div>
              <div class="meta-line" style="--i: 1"><span class="key">Author</span><span class="ink" style="width: 32px" /></div>
              <div class="meta-line" style="--i: 2"><span class="key">Keywords</span><span class="ink" style="width: 52px" /></div>
            </div>
          </template>
        </div>
      </div>

      <div class="operations">
        <button v-for="(operation, index) of operations" :key="operation.key" type="button" class="operation" :class="{ on: active === index }" @click="active = index">
          <span class="operation-icon"><i class="fa-regular" :class="[operation.icon]" /></span>
          <span class="operation-text">
            <span class="operation-title">{{ operation.title }}</span>
            <span class="operation-description">{{ operation.description }}</span>
          </span>
        </button>
      </div>
    </div>
  </lab-panel>
</template>

<style scoped>

.theatre {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  column-gap: 32px;
  align-items: center;
}

/* the stage: an inset box in the chip colour, a page or two acting in the middle */
.scene-box {
  position: relative;
  height: 306px;
  border-radius: 16px;
  background-color: var(--home-surface-inner);
  overflow: hidden;
}

html.dark .scene-box {
  background-color: #0004;
}

.scene {
  position: absolute;
  inset: 0;
}

.doc {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 76px;
  height: 100px;
  margin: -50px 0 0 -38px;
  padding: 10px 8px;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* text as a few grey bars */
.text {
  height: 100%;
  background-image: repeating-linear-gradient(
      180deg,
      color-mix(in srgb, var(--vp-c-text-1) 24%, transparent) 0 4px,
      transparent 4px 9px);
  background-size: 100% 100%;
  mask-image: linear-gradient(90deg, #000 70%, #000 70%);
}


/* Merge: two files slide together into one */

.merge .left { animation: merge-left 2.4s; }
.merge .right { animation: merge-right 2.4s; }

@keyframes merge-left {
  0%, 15% { transform: translateX(-60px); }
  60%, 100% { transform: translate(-5px, 5px) rotate(-3deg); }
}

@keyframes merge-right {
  0%, 15% { transform: translateX(60px); }
  60%, 100% { transform: translate(5px, -5px) rotate(3deg); }
}


/* Extract: the middle page of a stack is pulled out to the right */

.stack.back { transform: translate(10px, -10px) rotate(4deg); }
.stack.middle { transform: translate(0, 0); }
.stack.front { transform: translate(-10px, 10px) rotate(-4deg); }

.extract .picked {
  z-index: 2;
  animation: extract-page 2.4s;
}

.extract .front {
  animation: extract-close 2.4s;
}

@keyframes extract-page {
  0%, 20% { transform: translate(0, 0); box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 8px 12px -3px rgba(0, 0, 0, 0.08); }
  60%, 100% { transform: translate(78px, -24px) rotate(8deg); box-shadow: 0 0 0 2px var(--vp-c-brand-2), 0 12px 24px -6px rgba(0, 0, 0, 0.25); }
}

@keyframes extract-close {
  0%, 35% { transform: translate(-10px, 10px) rotate(-4deg); }
  75%, 100% { transform: translate(-5px, 5px) rotate(-2deg); }
}


/* Overlay: a stamp drops onto the page */

.stamp {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 2px 6px;
  border: 2.5px solid #43A047;
  border-radius: 3px;
  color: #43A047;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.1em;
  line-height: 1;
  transform: translate(-50%, -50%) rotate(-16deg);
  animation: stamp-drop 2.4s both cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes stamp-drop {
  0%, 30% { opacity: 0; transform: translate(-50%, -50%) rotate(-16deg) scale(2.4); }
  50%, 100% { opacity: 0.9; transform: translate(-50%, -50%) rotate(-16deg) scale(1); }
}


/* Attach: a small file flies in and is clipped to the corner */

.file {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 42px;
  margin: -50px 0 0 -38px;
  border-radius: 3px;
  background-color: #FFF8E1;
  border: 1px solid #FFB300;
  color: #FF8F00;
  font-size: 16px;
  animation: file-in 2.4s both cubic-bezier(0.4, 0, 0.2, 1);
}

html.dark .file {
  background-color: #3b3220;
}

@keyframes file-in {
  0%, 15% { opacity: 0; transform: translate(70px, 60px) rotate(20deg); }
  55%, 100% { opacity: 1; transform: translate(44px, -14px) rotate(8deg); }
}

.clip {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -62px 0 0 24px;
  font-size: 22px;
  color: var(--vp-c-text-1);
  animation: clip-in 2.4s both cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes clip-in {
  0%, 55% { opacity: 0; transform: rotate(-60deg) scale(0.5); }
  75%, 100% { opacity: 1; transform: rotate(-20deg) scale(1); }
}


/* Encrypt: the text scrambles and a lock closes */

.encrypt .text {
  animation: text-out 2.4s both;
}

.encrypt .scrambled {
  position: absolute;
  inset: 10px 8px;
  height: auto;
  background-image: repeating-linear-gradient(
      90deg,
      color-mix(in srgb, var(--vp-c-text-1) 35%, transparent) 0 3px,
      transparent 3px 6px);
  mask-image: repeating-linear-gradient(180deg, #000 0 4px, transparent 4px 9px);
  animation: text-in 2.4s both;
}

@keyframes text-out {
  0%, 35% { opacity: 1; }
  55%, 100% { opacity: 0; }
}

@keyframes text-in {
  0%, 35% { opacity: 0; }
  55%, 100% { opacity: 1; }
}

.lock {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin: 24px 0 0 20px;
  border-radius: 10px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 6px 14px -6px rgba(0, 0, 0, 0.3);
  color: var(--vp-c-brand-1);
  font-size: 16px;
  animation: lock-in 2.4s both cubic-bezier(0.34, 1.56, 0.64, 1);
}

.lock i {
  position: absolute;
  animation-duration: 2.4s;
  animation-fill-mode: both;
}

.lock .open { animation-name: lock-open; }
.lock .closed { animation-name: lock-closed; }

@keyframes lock-in {
  0%, 10% { opacity: 0; transform: scale(0.5); }
  30%, 100% { opacity: 1; transform: scale(1); }
}

@keyframes lock-open {
  0%, 45% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes lock-closed {
  0%, 45% { opacity: 0; }
  50%, 100% { opacity: 1; }
}


/* Metadata: the file moves aside and three key-value lines are written next to it */

.doc.aside {
  animation: aside 2.4s;
}

@keyframes aside {
  0%, 15% { transform: translateX(0); }
  40%, 100% { transform: translateX(-52px); }
}

.meta {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: -30px 0 0 6px;
}

.meta-line {
  display: flex;
  flex-direction: column;
  gap: 3px;
  animation: meta-in 2.4s both;
  animation-delay: calc(var(--i) * 0.18s);
}

.meta-line .key {
  font-size: 9px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-brand-1);
}

.meta-line .ink {
  display: block;
  height: 5px;
}

@keyframes meta-in {
  0%, 35% { opacity: 0; transform: translateX(-10px); }
  55%, 100% { opacity: 1; transform: none; }
}


/* The list of operations, the acted one highlighted */

.operations {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
}

.operation {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: 12px;
  align-items: center;
  padding: 8px 10px;
  border: 0;
  border-radius: 12px;
  background: none;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.operation.on {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 12%, transparent);
}

.operation-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background-color: var(--home-surface-inner);
  color: var(--vp-c-text-1);
  font-size: 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

html.dark .operation-icon {
  background-color: #0004;
}

.operation.on .operation-icon {
  background-color: var(--vp-c-brand-1);
  color: white;
}

.operation-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.operation-title {
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.25rem;
  color: var(--vp-c-text-1);
}

.operation-description {
  font-size: 0.8125rem;
  line-height: 1.125rem;
  color: var(--vp-c-text-3);
}

@media screen and (max-width: 760px) {
  .theatre {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 24px;
  }

}

</style>

<script setup lang="ts">
import { ref, watch } from "vue";
import { generateFeatures, modifyFeatures } from "./features";
import { useInView, useLoop } from "./labAnimation";
import LabPanel from "./LabPanel.vue";

/* 03 Two acts: the headline already says "generate and modify", so the stage says it too. A small
   switch at the top alternates between the two words every few seconds, and the tags below swap
   with a staggered cross-fade: generation tags out, operation tags in. A thin line under the active
   word shows how long until the next switch. Clicking a word switches at once. */

const stage = ref<HTMLElement>();
const { animate } = useInView(stage);

const ACT_DURATION = 4200;

const acts = [
  { key: "generate", name: "Generate", caption: "Build new documents from scratch with layout, styling and rich content.", features: generateFeatures },
  { key: "modify", name: "Modify", caption: "Merge, split, overlay, attach and encrypt the PDFs you already have.", features: modifyFeatures }
];

const act = ref(0);
const cycle = ref(0); /* bumps on every switch so the progress line restarts */

function switchTo(index: number) {
  act.value = index;
  cycle.value++;
}

useLoop(animate, ACT_DURATION, () => switchTo((act.value + 1) % acts.length));

/* restart the progress line when the panel comes into view */
watch(animate, on => { if (on) cycle.value++; });
</script>

<template>
  <lab-panel>
    <div ref="stage" class="acts" :class="{ running: animate }">
      <div class="switch" :style="{ '--act': act }">
        <span class="pill" />
        <button v-for="(item, index) of acts" :key="item.key" type="button" class="word" :class="{ on: act === index }" @click="switchTo(index)">
          {{ item.name }}
          <span class="count">{{ item.features.length }}</span>
        </button>
        <span :key="cycle" class="progress" :style="{ '--duration': ACT_DURATION + 'ms' }" />
      </div>

      <div class="sets">
        <div v-for="(item, index) of acts" :key="item.key" class="chips set" :class="act === index ? 'on' : 'off'">
          <span v-for="(feature, position) of item.features" :key="feature.label" class="chip" :style="{ '--i': position }">
            <i class="fa-regular" :class="[feature.icon]" />
            {{ feature.label }}
          </span>
        </div>
      </div>

      <p class="caption" :key="act">{{ acts[act].caption }}</p>
    </div>
  </lab-panel>
</template>

<style scoped>

.acts {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
}

/* the switch: two words on a chip-coloured track, a white pill sliding under the active one */
.switch {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 4px;
  border-radius: 14px;
  background-color: var(--home-surface-inner);
  overflow: hidden;
}

html.dark .switch {
  background-color: #0004;
}

.pill {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc(50% - 4px);
  border-radius: 10px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  transform: translateX(calc(var(--act) * 100%));
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

html.dark .pill {
  background-color: #fff2;
}

.word {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 132px;
  padding: 8px 18px;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.25rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: color 0.3s ease;
}

.word.on {
  color: var(--vp-c-brand-1);
}

.count {
  padding: 1px 7px;
  border-radius: 999px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 8%, transparent);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.word.on .count {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 18%, transparent);
  color: var(--vp-c-brand-1);
}

/* the time until the next switch, as a line that fills the track along the bottom */
.progress {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 70%, transparent);
  transform-origin: left;
  transform: scaleX(0);
}

.running .progress {
  animation: fill var(--duration) linear forwards;
}

@keyframes fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* both sets occupy the same cell, so the panel keeps the height of the taller one */
.sets {
  display: grid;
  width: 100%;
}

.set {
  grid-area: 1 / 1;
  align-content: flex-start;
}

.set .chip {
  transition-property: opacity, transform;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.set.on .chip {
  transition-delay: calc(80ms + var(--i) * 35ms);
}

.set.off {
  pointer-events: none;
}

.set.off .chip {
  opacity: 0;
  transform: translateY(-8px);
  transition-delay: calc(var(--i) * 12ms);
}

.caption {
  margin: 0;
  padding: 0 4px;
  font-size: 0.9375rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
  animation: caption-in 0.5s ease both;
}

@keyframes caption-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
}

@media screen and (max-width: 1280px) {
  .acts {
    align-items: flex-start;
  }
}

</style>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import { features } from "./features";
import { useInView, useLoop } from "./labAnimation";
import LabPanel from "./LabPanel.vue";

/* 08 Flip wall: the twenty tags as a wall of square icon tiles. Every so often a random tile turns
   over to reveal its name on a brand-coloured back, stays a moment, and turns back, so at any time
   a few names are showing. Hovering a tile turns it over at once. Quieter than a list of labels,
   and the icons alone already read as "many kinds of things". */

const stage = ref<HTMLElement>();
const { animate } = useInView(stage);

const flipped = ref<Set<number>>(new Set());
const hovered = ref(-1);
const timers = new Map<number, ReturnType<typeof setTimeout>>();

function flip(index: number, duration: number) {
  flipped.value = new Set([...flipped.value, index]);

  clearTimeout(timers.get(index));
  timers.set(index, setTimeout(() => {
    const next = new Set(flipped.value);
    next.delete(index);
    flipped.value = next;
    timers.delete(index);
  }, duration));
}

useLoop(animate, 650, () => {
  const candidates = features.map((_, index) => index).filter(index => !flipped.value.has(index) && index !== hovered.value);
  if (candidates.length === 0) return;

  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  flip(pick, 2400 + Math.random() * 800);
});

onBeforeUnmount(() => timers.forEach(timer => clearTimeout(timer)));
</script>

<template>
  <lab-panel>
    <div ref="stage" class="wall">
      <div
          v-for="(feature, index) of features"
          :key="feature.label"
          class="tile"
          :class="{ flipped: flipped.has(index) || hovered === index }"
          @mouseenter="hovered = index"
          @mouseleave="hovered = -1">
        <div class="faces">
          <div class="face front">
            <i class="fa-regular" :class="[feature.icon]" />
          </div>
          <div class="face back">
            {{ feature.label }}
          </div>
        </div>
      </div>
    </div>
  </lab-panel>
</template>

<style scoped>

.wall {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 10px;
}

.tile {
  aspect-ratio: 1;
  perspective: 600px;
}

.faces {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
}

.tile.flipped .faces {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 12px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.front {
  background-color: var(--home-surface-inner);
  color: var(--vp-c-text-1);
  font-size: 22px;
}

html.dark .front {
  background-color: #0004;
}

.back {
  background-color: var(--vp-c-brand-1);
  color: white;
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.1;
  text-align: center;
  transform: rotateY(180deg);
}

@media screen and (max-width: 1280px) {
  .wall {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }
}

@media screen and (max-width: 760px) {
  .wall {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .front {
    font-size: 18px;
  }

  .back {
    font-size: 0.6875rem;
  }
}

</style>

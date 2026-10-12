<script setup lang="ts">
import { ref } from "vue";
import { features } from "./features";
import { useInView } from "./labAnimation";
import LabPanel from "./LabPanel.vue";

/* 07 Conveyor: three belts of tags drifting sideways at slightly different speeds, the middle one
   the other way, fading out at both edges. The belts stop while the pointer rests on them and the
   tag under it lifts. The classic "logo wall", applied to capabilities: it reads as "a lot", takes
   no vertical space and never ends. Each belt holds its tags twice, so the loop is seamless. */

const stage = ref<HTMLElement>();
const { animate } = useInView(stage);

const belts = [
  { items: features.slice(0, 7), duration: "34s", reverse: false },
  { items: features.slice(7, 14), duration: "40s", reverse: true },
  { items: features.slice(14), duration: "30s", reverse: false }
];
</script>

<template>
  <lab-panel>
    <div ref="stage" class="conveyor" :class="{ paused: !animate }">
      <div v-for="(belt, index) of belts" :key="index" class="belt">
        <div class="track" :style="{ '--duration': belt.duration, animationDirection: belt.reverse ? 'reverse' : 'normal' }">
          <div v-for="copy in 2" :key="copy" class="set" :aria-hidden="copy === 2">
            <span v-for="feature of belt.items" :key="feature.label" class="chip">
              <i class="fa-regular" :class="[feature.icon]" />
              {{ feature.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </lab-panel>
</template>

<style scoped>

.conveyor {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 -16px; /* the fade reaches a little beyond the stage, under the panel padding */
}

.belt {
  overflow: hidden;
  padding: 4px 0; /* room for the hover lift */
  mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
}

.track {
  display: flex;
  width: max-content;
  animation: slide var(--duration) linear infinite;
}

.set {
  display: flex;
  gap: 10px;
  padding-right: 10px;
}

@keyframes slide {
  to { transform: translateX(-50%); }
}

.conveyor.paused .track,
.conveyor:hover .track {
  animation-play-state: paused;
}

.chip:hover {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 16%, var(--home-surface-inner));
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .track {
    animation: none;
  }
}

</style>

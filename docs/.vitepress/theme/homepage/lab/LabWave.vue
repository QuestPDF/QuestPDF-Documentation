<script setup lang="ts">
import { computed, ref } from "vue";
import { features } from "./features";
import { useInView, useLoop } from "./labAnimation";
import LabPanel from "./LabPanel.vue";

/* 01 Spotlight wave: the tags stay exactly where they are; a light travels through them one by one,
   leaving a short fading trail, as if a finger ran along the list. The pointer takes the light over:
   hovering any tag moves the head of the wave there. */

const stage = ref<HTMLElement>();
const { animate } = useInView(stage);

const head = ref(-1);
const hovered = ref(-1);

useLoop(animate, 380, () => head.value = (head.value + 1) % features.length);

const chipClass = computed(() => features.map((_, index) => {
  const current = hovered.value >= 0 ? hovered.value : head.value;
  if (current < 0) return "";

  const distance = (current - index + features.length) % features.length;
  if (distance === 0) return "lit";
  if (distance === 1) return "trail-1";
  if (distance === 2) return "trail-2";
  return "";
}));
</script>

<template>
  <lab-panel>
    <div ref="stage" class="tags">
      <div class="chips">
        <span
            v-for="(feature, index) of features"
            :key="feature.label"
            class="chip"
            :class="chipClass[index]"
            @mouseenter="hovered = index"
            @mouseleave="hovered = -1">
          <i class="fa-regular" :class="[feature.icon]" />
          {{ feature.label }}
        </span>
      </div>

      <p class="more">and many more</p>
    </div>
  </lab-panel>
</template>

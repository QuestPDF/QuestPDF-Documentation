<script setup lang="ts">
  import { defineProps } from 'vue'

  const props = defineProps({
      value: Number,
      length: Number
  })
</script>

<template>
  <div class="progress-indicator">
    <div v-for="indicator of Array.from({ length: props.length }, (v, i) => i + 1)"
         class="progress-indicator-step"
         :class="{ 'completed': indicator < props.value, 'current': indicator == props.value, 'future': indicator > props.value }"></div>
  </div>
</template>

<style scoped>
.progress-indicator {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.progress-indicator-step {
  height: 12px;
  width: 12px;

  border-radius: 50%;
}

.progress-indicator-step.completed {
  background-color: var(--vp-c-brand);
  opacity: 0.66;
}

.progress-indicator-step.current {
  background-color: var(--vp-c-brand);
  font-size: 15px;
}

.progress-indicator-step.future {
  background-color: var(--vp-c-mute-lighter);
}

.progress-indicator-step.future {
  background-color: var(--vp-c-mute-darker);
}

html.dark .progress-indicator-step.future {
  background-color: var(--vp-c-mute-lighter);
}
</style>
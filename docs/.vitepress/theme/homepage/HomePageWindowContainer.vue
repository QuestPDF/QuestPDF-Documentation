<script setup lang="ts">

const props = defineProps<{
  fileName: String
}>();

</script>

<template>
  <div class="file-container">
    <div class="file-container-header">
      <div class="dot red" />
      <div class="dot yellow" />
      <div class="dot green" />
      <span class="file-name">{{ fileName }}</span>
    </div>

    <div class="file-content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  filter: drop-shadow(0 16px 16px rgba(0,  0, 0, 0.1));
  height: fit-content;
  overflow: hidden;
  max-width: 100%;
}

.file-container-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;

  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
}

.file-container-header .file-name {
  padding-left: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.file-container-header .dot {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #8883;
  transition: all 100ms ease-in-out;
}

.file-container:hover {
  .dot.red {
    background-color: #F44336CC;
  }

  .dot.yellow {
    background-color: #FFC107CC;
  }

  .dot.green {
    background-color: #4CAF50CC;
  }
}

.file-content {
  background-color: var(--vp-c-bg);
}

</style>

<style>

</style>
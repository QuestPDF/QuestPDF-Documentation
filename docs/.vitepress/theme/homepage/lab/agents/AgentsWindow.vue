<script setup lang="ts">
/* Lab copy of HomePageWindowContainer with one addition: a `meta` slot at the right end of the
   header, for a status word ("proposed change", "main") or the play / replay button. */
defineProps<{ fileName: string }>();
</script>

<template>
  <div class="file-container">
    <div class="file-container-header">
      <div class="dot red" />
      <div class="dot yellow" />
      <div class="dot green" />
      <span class="file-name">{{ fileName }}</span>
      <span class="file-meta"><slot name="meta" /></span>
    </div>

    <div class="file-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.file-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
  min-height: 41px;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
}

.file-name {
  padding-left: 6px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.file-meta {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #8883;
  transition: all 100ms ease-in-out;
}

.file-container:hover .dot.red { background-color: #F44336CC; }
.file-container:hover .dot.yellow { background-color: #FFC107CC; }
.file-container:hover .dot.green { background-color: #4CAF50CC; }

.file-content {
  background-color: var(--vp-c-bg);
}
</style>

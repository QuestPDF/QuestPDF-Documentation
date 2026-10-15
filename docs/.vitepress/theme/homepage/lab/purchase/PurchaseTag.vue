<template>
  <!-- today's green confirmation tag, unchanged: the shared section tag with a check, tinted green -->
  <div class="section-tag status-tag">
    <i class="fa-regular fa-check" aria-hidden="true"></i>
    Order completed
  </div>
</template>

<style scoped>

.status-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: color-mix(in srgb, #43A047 14%, transparent);
  color: #2E7D32;
}

html.dark .status-tag {
  color: #A5D6A7;
}

.status-tag i {
  font-size: 16px;
}

</style>

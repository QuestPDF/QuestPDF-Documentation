<script setup lang="ts">

const props = defineProps<{
  fileName: String,
  highlightedCode: String
}>();

</script>

<template>
  <div class="code-container">
    <div class="code-container-header">
      <div class="dot red" />
      <div class="dot yellow" />
      <div class="dot green" />
      <span>{{ fileName }}</span>
    </div>
    <div class="code-source" v-html="highlightedCode" />
  </div>
</template>

<style scoped lang="scss">
.code-container {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  filter: drop-shadow(0 16px 16px rgba(0,  0, 0, 0.1));
  height: fit-content;
  overflow: hidden;
}

.code-container-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;

  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
}

.code-container-header span {
  padding-left: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #8883;
  transition: all 100ms ease-in-out;
}

.code-container:hover {
  .dot.red {
    background-color: #F44336;
  }

  .dot.yellow {
    background-color: #FFC107;
  }

  .dot.green {
    background-color: #4CAF50;
  }
}

</style>

<style>
.code-source {
  background-color: #FFFFFF; /* from shiki light-plus */
  font-size: 14px;
  line-height: 1.5;
  padding: 8px 0;

  tab-size: 4;
}

.code-source pre {
  overflow: hidden;
}

html.dark .code-source {
  background-color: #1E1E1E; /* from shiki dark-plus */
}


@media screen and (max-width: 1000px) {
  .code-source pre {
    tab-size: 2;
  }
}

@media screen and (max-width: 700px) {
  .code-source {
    font-size: 12px;
    line-height: 1.25;
    overflow: scroll;
  }
}

.code-source .line {
  display: inline-block;
  padding: 0 16px;
  width: calc(100% + 2 * 16px);
}

.code-source .line-highlighted {
  background-color: #2196F322;
  border-left: 3px solid #2196F3AA;
  padding-left: calc(1rem - 3px);
}

.code-source .line-removed {
  background-color: #F4433622;
  border-left: 3px solid #F44336AA;
  padding-left: calc(1rem - 3px);
}

.code-source .line-added {
  background-color: #4CAF5022;
  border-left: 3px solid #4CAF50AA;
  padding-left: calc(1rem - 3px);
}
</style>
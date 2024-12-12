<template>
  <section class="content">
    <div class="details">
      <h2>Companion App</h2>

      <p class="sub-header">Accelerate your development with live document preview powered by the hot-reload capability, eliminating the need for code recompilation.</p>

      <div class="summary-list">
        <article v-for="summary of SummaryContent" class="summary-item">
          <img src="/homepage/tick.svg" width="20" alt="" />
          <p>{{ summary }}</p>
        </article>
      </div>

      <a class="action" href="/companion/features">Read more</a>
    </div>

    <img :src="`/companion/application-${mode}.png`" alt="Companion App" />
  </section>
</template>

<script setup>

import {computed} from "vue";
import {useData} from "vitepress";

const { isDark } = useData();

const mode = computed(() => isDark.value ? "dark" : "light");

const SummaryContent = [
    "Explore document structure and hierarchy",
    "Quickly magnify and measure content",
    "Debug runtime exceptions with stack traces and code snippets",
    "Identify, understand and solve layout errors",
]

</script>

<style scoped>

.content {
  display: grid;
  grid-template-columns: 1fr minmax(200px, 1fr);
  grid-gap: 64px;
  align-content: stretch;
}

@media screen and (max-width: 800px) {
  .content {
    grid-template-columns: 1fr;
    grid-gap: 32px;
  }
}

img {
  filter: drop-shadow(0 16px 16px rgba(0,  0, 0, 0.1));
}

.action {
  margin-top: 32px;
}

/* Summary */

.summary-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-item {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 12px;
  align-items: center;
}

</style>
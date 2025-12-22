<template>
  <section class="content">
    <div class="details">
      <div class="section-tag">Development Tool</div>

      <h2>Companion App</h2>

      <p class="sub-header">Accelerate development with live document preview and hot-reload capability. See your changes instantly without recompiling.</p>

      <div class="summary-list">
        <article v-for="summary of SummaryContent" class="summary-item">
          <img src="/homepage/square-check.svg" width="24" alt="" />
          <p>{{ summary }}</p>
        </article>
      </div>

      <a class="action" href="/companion/features">Read more</a>
    </div>

    <ClientOnly>
      <img :src="`/companion/application-${mode}.png`" alt="Companion App" class="companion-image" />
    </ClientOnly>
  </section>
</template>

<script setup>

import {computed} from "vue";
import {useData} from "vitepress";

const { isDark } = useData();

const mode = computed(() => isDark.value ? "dark" : "light");

const SummaryContent = [
    "Explore PDF document structure and hierarchy",
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

.companion-image {
  border-radius: 8px;
  border: 1px solid #8884;
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
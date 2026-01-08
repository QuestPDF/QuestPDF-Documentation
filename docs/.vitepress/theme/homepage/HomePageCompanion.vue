<template>
  <section class="content">
    <div class="section-tag">Development Tool</div>

    <h2>Companion App</h2>
    <p class="sub-header">Accelerate development with live document preview and hot-reload capability. See your changes instantly without recompiling.</p>

    <div class="image-container">
      <img :src="`/companion/application-light.png`" alt="Companion App" class="companion-image light" />
      <img :src="`/companion/application-dark.png`" alt="Companion App" class="companion-image dark" />
    </div>


    <div class="summary-list">
      <article v-for="summary of summaryContent" class="summary-item">
        <i class="fa-duotone fa-square-check"></i>
        <p>{{ summary }}</p>
      </article>
    </div>

    <a class="action primary" href="/companion/features">Read more</a>
  </section>
</template>

<script setup>

const summaryContent = [
    "Explore PDF document structure and hierarchy",
    "Quickly magnify and measure content",
    "Debug runtime exceptions with stack traces and code snippets",
    "Identify, understand and solve layout errors",
]

</script>

<style scoped>

.content {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: start;
}

@media screen and (max-width: 800px) {
  .content {
    grid-template-columns: 1fr;
    grid-gap: 32px;
  }
}

.image-container {
  padding: 64px;
  background: linear-gradient(120deg, #00E5FF22, #2979FF22);
  border-radius: 64px;
  margin: 32px -64px 48px;
}

.companion-image {
  border-radius: 8px;
  border: 1px solid #8884;
  filter: drop-shadow(0 16px 16px rgba(0,  0, 0, 0.1));
  place-self: end;
}

html:not(.dark) .companion-image.dark {
  display: none;
}

html.dark .companion-image.light {
  display: none;
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
}

</style>
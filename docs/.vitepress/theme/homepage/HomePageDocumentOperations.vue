<script setup lang="ts">
import documentOperationCode from './documentOperationCodeExample.cs?raw';
import HomePageCodeContainer from "./HomePageCodeContainer.vue";

const SummaryContent = [
    "Merge documents",
    "Attach files",
    "Extract pages",
    "Encrypt / decrypt",
    "Extend metadata",
    "Limit access",
    "Optimize for Web",
    "Overlay / underlay"
]

</script>

<template>
  <section class="content">
    <div class="description">
      <h2>Perform common PDF operations</h2>

      <p class="sub-header">Go beyond generation. Merge, encrypt, extract, and manipulate existing PDF documents with a powerful fluent C# API.</p>

      <div class="summary-list">
        <article v-for="summary of SummaryContent" class="summary-item">
          <img src="/homepage/square-check.svg" width="24" alt="" />
          <p>{{ summary }}</p>
        </article>
      </div>

      <a class="action" href="/concepts/document-operations">Read more</a>
    </div>

    <home-page-code-container file-name="DocumentOperation.cs" :code="documentOperationCode" />
  </section>
</template>

<style scoped>

.content {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 96px;
  align-content: stretch;
}

@media screen and (max-width: 800px) {
  .content {
    grid-template-columns: 1fr;
    grid-gap: 32px;
  }
}

.description {
  align-self: center;
  justify-self: start;
  display: flex;
  flex-direction: column;
}

.action {
  align-self: start;
  margin-top: 32px;
}

/* Summary */

.summary-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  grid-gap: 16px;
}

.summary-item {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 12px;
  align-items: center;
}

</style>

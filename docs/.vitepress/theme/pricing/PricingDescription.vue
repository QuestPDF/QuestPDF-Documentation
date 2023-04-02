<template>
  <article class="content">
    <h1><span class="highlight-foreground">QuestPDF</span> Licenses and Pricing</h1>

    <div class="details">
      <p class="description">Nowadays, we are building upon the work of giants, creating more impactful software than ever before. Regardless of its size and purpose, every project deserves well-maintained dependencies. We are here to offer you a stable and high-quality PDF generation library for efficient development and ease of mind.</p>

      <div class="summary-list">
        <article class="summary-item">
          <img src="/homepage/tick.svg" width="28" alt="" />
          <p>Buying the commercial license ensures the stability and quality of the library in the upcoming years.</p>
        </article>

        <article class="summary-item">
          <img src="/homepage/tick.svg" width="28" alt="" />
          <p>Use the library that scales with your use-case and offers best quality possible.</p>
        </article>

        <article class="summary-item">
          <img src="/homepage/tick.svg" width="28" alt="" />
          <p>Create and deploy unlimited closed-source projects and applications.</p>
        </article>

        <article class="summary-item">
          <img src="/homepage/tick.svg" width="28" alt="" />
          <p>Redistribute the compiled library, royalty-free, with your applications.</p>
        </article>
      </div>
    </div>
  </article>
</template>

<script setup>

</script>

<style scoped>

.details {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.description {
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  line-height: 2rem;
  margin-bottom: 16px;
}

/* Summary */

.summary-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px 64px;
}

@media screen and (max-width: 800px) {
  .questions {
    grid-template-columns: 1fr;
  }
}

.summary-item {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 16px;
}
</style>
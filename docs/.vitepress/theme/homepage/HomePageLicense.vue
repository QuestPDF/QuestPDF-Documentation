<script setup>
const SummaryContent = [
    "Long-term and sustainable development",
    "Regular feature, performance, quality and security updates",
    "Active community and enterprise support"
]
</script>

<template>
  <section class="content">

    <img src="/homepage/license.svg" class="license-icon" alt="Example invoice document implemented and generated with QuestPDF using C# language." />

    <div class="description">
      <h2>Fair and Sustainable License</h2>

      <p class="sub-header">By offering free access to most users and premium licenses for larger organizations, the project maintains its commitment to excellence:</p>

      <div class="summary-list">
        <article v-for="summary of SummaryContent" class="summary-item">
          <img src="/homepage/tick-license.svg" width="20" alt="" />
          <p>{{ summary }}</p>
        </article>
      </div>

      <div class="license-warning">
        Free for individuals, non-profits, and businesses under $1M in annual revenue, as well as all FOSS projects.
      </div>

      <a class="action license" href="/license">Check Pricing</a>
    </div>

  </section>
</template>

<style scoped>
  .content {
    max-width: 800px !important;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 64px;
    justify-items: start;
  }

  .description {
    place-self: center;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .license-icon {
    place-self: center;
    width: 128px;
  }

  .license-warning {
    border-radius: 12px;
    padding: 12px 16px;
    color: var(--vp-custom-block-warning-text);
    background-color: #67B84D33;
    margin-top: 1.25rem;
  }

  .action {
    margin-top: 1.25rem;
  }

  @media screen and (max-width: 700px) {
    .content {
      grid-template-columns: 1fr;
      grid-gap: 32px;
    }

    .license-icon {
      place-self: center;
      width: 72px;
    }
  }

  /* Summary */

  .summary-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .summary-item {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 12px;
    align-items: center;
  }



  /* License button */

  .action.license {
    background-color: #66BB6A;
    color: var(--vp-button-brand-text);
    font-weight: bold;
  }

  .action.license:hover {
    background-color: #4CAF50;
  }

  html.dark .action.license {
    background-color: #4CAF50;
  }

  html.dark .action.license:hover {
    background-color: #66BB6A;
  }
</style>
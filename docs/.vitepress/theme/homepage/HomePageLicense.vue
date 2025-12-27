<script setup>
const SummaryContent = [
  "Actively maintained with regular feature, quality, and security updates.",
  "Full source code available on GitHub",
  "All features included in every tier without restrictions",
  "Predictable pricing: no per-seat, per-server, or usage fees"
]
</script>

<template>
  <section class="content">

    <img src="/homepage/license.svg" class="license-icon" alt="Example invoice document implemented and generated with QuestPDF using C# language." />

      <div class="section-header">
        <h2>Fair and Sustainable License</h2>
        <p class="sub-header">A model that benefits everyone. Commercial licensing provides businesses with legal safety and long-term stability, while funding a feature-complete, unrestricted library for the open-source community.</p>
      </div>

      <div class="summary-list">
        <article v-for="summary of SummaryContent" class="summary-item">
          <img src="/homepage/square-check-license.svg" width="24" alt="" />
          <p>{{ summary }}</p>
        </article>
      </div>

      <div class="license-description">
        Free for individuals, non-profits, all FOSS projects, and organizations under $1M in annual revenue.
      </div>

      <div style="display: flex; flex-direction: row; gap: 16px; justify-content: center">
        <a class="action pricing-button" href="/license">View Pricing</a>
        <a class="action" href="/license/guide">License terms</a>
      </div>

  </section>
</template>

<style scoped>

  .license-icon {
    place-self: center;
    width: 64px;
    margin-bottom: 32px;
  }

  .license-description {
    border-radius: 12px;
    padding: 12px 16px;
    color: var(--vp-custom-block-warning-text);
    background-color: #67B84D33;
    margin-top: 1.25rem;

    max-width: 500px;
    place-self: center;
  }

  .action {
    margin-top: 1.25rem;
  }

  @media screen and (max-width: 400px) {
    .license-icon {
      width: 48px;
    }
  }

  @media screen and (max-width: 650px) {
    .sub-header {
      text-align: justify;
    }
  }

  /* Summary */

  .summary-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    place-self: center;
    margin: 32px 0;
  }

  .summary-item {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 12px;
    align-items: center;
  }



  /* License button */

  .action.pricing-button {
    background-color: #66BB6A;
    color: var(--vp-button-brand-text);
    font-weight: bold;
  }

  .action.pricing-button:hover {
    background-color: #4CAF50;
  }

  html.dark .action.pricing-button {
    background-color: #4CAF50;
  }

  html.dark .action.pricing-button:hover {
    background-color: #66BB6A;
  }
</style>
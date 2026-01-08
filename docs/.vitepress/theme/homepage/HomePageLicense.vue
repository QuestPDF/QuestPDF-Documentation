w<script setup>
const SummaryContent = [
  "Actively maintained with regular feature, quality, and security updates",
  "Full source code available on GitHub",
  "All features included in every tier without restrictions",
  "Predictable pricing: no per-seat, per-server, or usage fees"
]
</script>

<template>
  <div class="background-gradient" />

  <section class="content">

    <i class="fa-duotone fa-file-certificate license-icon"></i>

    <div class="section-header">
      <h2>Fair and Sustainable License</h2>
      <p class="sub-header">A model that benefits everyone. Commercial licensing provides businesses with legal safety and long-term stability, while funding a feature-complete, unrestricted library for the open-source community.</p>
    </div>

    <div class="summary-list">
      <article v-for="summary of SummaryContent" class="summary-item">
        <i class="fa-duotone fa-square-check license-check-icon"></i>
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

  .content {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .license-background {
    content: "";
    position: absolute;
    place-self: center;
    align-self: center;

    top: -50%;
    width: 150%;
    height: 100%;
    background: radial-gradient(ellipse, rgba(103, 184, 77, 0.1) 0%, transparent 50%);
  }

  .background-gradient {
    position: absolute;
    pointer-events: none;
    inset: 0;
    background-image:
        radial-gradient(ellipse 75% 500px at 75% 100%, color-mix(in srgb, #4CAF50 15%, transparent), transparent),
        radial-gradient(ellipse 600px 100px at 50% 100%, color-mix(in srgb, #00BCD4 5%, transparent), transparent);
  }

  .license-icon {
    font-size: 64px;
    margin-bottom: 32px;
    color: #67B84D;
  }

  .license-check-icon {
    font-size: 24px;
    color: #4CAF50;
  }

  .license-description {
    border-radius: 12px;
    padding: 12px 16px;
    color: #1B5E20;
    background-color: #67B84D33;
    margin-top: 32px;

    max-width: 500px;
    place-self: center;
  }

  html.dark .license-description {
    color: #A5D6A7;
  }

  .action {
    margin-top: 32px;
  }

  @media screen and (max-width: 400px) {
    .license-icon {
      font-size: 48px;
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
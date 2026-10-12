<script setup>
const tiers = [
  {
    name: "Community",
    price: "Free",
    description: "For individuals, FOSS projects, charities, academic institutions and businesses under $1M in annual revenue."
  },
  {
    name: "Professional",
    price: "$1,999 / year",
    description: "For one legal entity shipping PDFs in production. Every developer covered at one flat price, with no seat counting or usage fees."
  },
  {
    name: "Enterprise",
    price: "$4,999 / year",
    description: "For corporate groups that need affiliate-wide coverage, priority support, reduced risk and procurement-friendly terms."
  }
]

const includes = [
  "Perpetual license, not a subscription: keep your version forever",
  "All features included in every tier without restrictions",
  "Royalty-free redistribution in SaaS, desktop, and on-premises apps",
  "Full source code available on GitHub"
]
</script>

<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag license-tag">Licensing</div>
      <h2>Fair and Sustainable License</h2>
      <p class="sub-header">A model that benefits everyone. Commercial licensing provides businesses with legal safety and long-term stability, while funding a feature-complete, unrestricted library for the open-source community.</p>
    </div>

    <!-- two cards side by side: what every tier includes with the calls to action, and the tiers stacked -->
    <div class="layout">
      <div class="card includes">
        <h3 class="includes-title">Every tier includes</h3>

        <ul class="includes-list">
          <li v-for="item of includes" :key="item">
            <i class="fa-duotone fa-square-check"></i>
            <span>{{ item }}</span>
          </li>
        </ul>

        <div class="actions">
          <a class="action pricing-button" href="/pricing.html">View Pricing</a>
          <a class="action" href="/license/guide.html">License Selection Guide</a>
        </div>
      </div>

      <div class="card tiers">
        <article v-for="tier of tiers" :key="tier.name" class="tier" :class="tier.name.toLowerCase()">
          <h3 class="tier-name">{{ tier.name }}</h3>
          <p class="tier-description">{{ tier.description }} <span class="tier-price">{{ tier.price }}.</span></p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .license-tag {
    color: #2E7D32;
    background-color: #67B84D33;
  }

  html.dark .license-tag {
    color: #A5D6A7;
  }


  /* Two cards of equal height */

  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
    width: 100%;
    margin-top: 32px;
  }

  @media screen and (max-width: 960px) {
    .layout {
      grid-template-columns: minmax(0, 1fr);
    }
  }


  /* "Every tier includes": title, the points, and the calls to action pinned to the bottom */

  .includes {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .includes-title {
    margin: 0;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .includes-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-grow: 1;
    margin: 24px 0 0;
    padding: 0;
    list-style: none;
  }

  /* the same row shape as the pricing page details: a 24px icon column, then the text */
  .includes-list li {
    display: grid;
    grid-template-columns: 24px 1fr;
    gap: 12px;
    color: var(--vp-c-text-2);
    font-size: 1rem;
    line-height: 1.5rem;
  }

  /* the same duotone square tick as the pricing page, at its size, in the Community tier's green */
  .includes-list i {
    width: 24px;
    --fa-primary-color: #67B84D;
    --fa-secondary-color: #67B84D;
  }

  html.dark .includes-list i {
    --fa-primary-color: #81C784;
    --fa-secondary-color: #81C784;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 32px;
  }


  /* Tiers: stacked rows. Each row is a coloured name badge in a fixed left column
     and the description to its right, with the price closing the sentence. The badge carries its
     tier's colour from the pricing page: green for Community, solid blue for Professional, black
     for Enterprise (inverted to light grey in dark mode) */

  .tiers {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
  }

  .tier {
    display: grid;
    grid-template-columns: 124px minmax(0, 1fr);
    gap: 16px;
    align-items: start;
    padding: 14px 0;
  }

  .tier:first-child {
    padding-top: 0;
  }

  .tier:last-child {
    padding-bottom: 0;
  }

  .tier-name {
    margin: 0;
    padding: 7px 12px;
    border-radius: 10px;
    background-color: var(--home-surface-inner);
    text-align: center;

    font-size: 0.9375rem;
    line-height: 1.25rem;
    font-weight: 600;
    color: var(--vp-c-text-2);
  }

  .tier.community .tier-name {
    color: #2E7D32;
    background-color: #67B84D33;
  }

  .tier.professional .tier-name {
    color: white;
    background-color: #2196F3;
  }

  .tier.enterprise .tier-name {
    color: white;
    background-color: #212121;
  }

  html.dark .tier.community .tier-name {
    color: #A5D6A7;
  }

  html.dark .tier.professional .tier-name {
    background-color: #1976D2;
  }

  html.dark .tier.enterprise .tier-name {
    color: #212121;
    background-color: #EEEEEE;
  }

  .tier-description {
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.375rem;
    color: var(--vp-c-text-2);
  }

  .tier-price {
    font-weight: 600;
    color: var(--vp-c-text-1);
    white-space: nowrap;
  }

  @media screen and (max-width: 560px) {
    .tier {
      grid-template-columns: minmax(0, 1fr);
      gap: 8px;
    }

    .tier-name {
      justify-self: start;
    }
  }


  /* Pricing button */

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

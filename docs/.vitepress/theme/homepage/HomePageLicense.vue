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
    <!-- two cards side by side: the section heading, what every tier includes and the calls to action
         on the left; the tiers stacked on the right -->
    <div class="layout">
      <div class="card includes">
        <div class="background-gradient" />

        <h2 class="card-title">Fair and Sustainable License</h2>
        <p class="card-description">A model that benefits everyone. Commercial licensing provides businesses with legal safety and long-term stability, while funding a feature-complete, unrestricted library for the community.</p>

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
          <div class="tier-head">
            <h3 class="tier-name">{{ tier.name }}</h3>
            <span class="tier-price">{{ tier.price }}</span>
          </div>
          <p class="tier-description">{{ tier.description }}</p>
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

  /* Two cards of equal height */

  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
    width: 100%;
  }

  @media screen and (max-width: 960px) {
    .layout {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  /* the same inset as the homepage panels (HomePage.vue), not the 40px of the shared card, so the
     text lines up with the panels above; the selector outweighs the shared card rule */
  .content .layout > .card {
    padding: 48px;
  }

  @media screen and (max-width: 700px) {
    .content .layout > .card {
      padding: 32px 24px;
    }
  }


  /* Left card: the section heading and its lead, left-aligned like the Companion App card, then
     the points every tier includes, and the calls to action pinned to the bottom */

  .includes {
    position: relative;
    isolation: isolate; /* keeps the glow (z-index: -1) above the card background but below the content */
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  /* the same glow and faint rays as the showcase cards (HomePageShowcaseCard.vue), in the Community
     tier's green, but from the top-left corner, behind the heading, rather than from the top centre */
  .includes {
    --accent: #67B84D;
    --accent-secondary: #4CAF50;
    --rays-x: 0%;
    --rays-centre: -90px;
  }

  .background-gradient {
    position: absolute;
    pointer-events: none;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    overflow: hidden;
    background-image:
        radial-gradient(ellipse 90% 55% at 0% 0%, color-mix(in srgb, var(--accent) 11%, transparent), transparent),
        radial-gradient(ellipse 50% 30% at 0% 0%, color-mix(in srgb, var(--accent-secondary) 5%, transparent), transparent);
  }

  .background-gradient::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: repeating-conic-gradient(
        from 0deg at var(--rays-x) var(--rays-centre),
        transparent 0deg,
        color-mix(in srgb, var(--accent) 2.5%, transparent) 9deg,
        transparent 18deg);
    mask-image: radial-gradient(circle 480px at var(--rays-x) var(--rays-centre), #000, transparent 100%);
    -webkit-mask-image: radial-gradient(circle 480px at var(--rays-x) var(--rays-centre), #000, transparent 100%);
  }

  html.dark .background-gradient::before {
    background-image: repeating-conic-gradient(
        from 0deg at var(--rays-x) var(--rays-centre),
        transparent 0deg,
        color-mix(in srgb, var(--accent) 2%, transparent) 9deg,
        transparent 18deg);
  }

  .includes-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    flex-grow: 1;
    margin: 32px 0 0;
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


  /* Tiers: stacked blocks spread to fill the card's height. Each block opens
     with the tier's name badge followed by the price, then the description below.
     The badge carries its tier's colour from the pricing page: green for Community, solid blue for
     Professional, black for Enterprise (inverted to light grey in dark mode) */

  .tiers {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
  }

  .tier {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0;
  }

  .tier:first-child {
    padding-top: 0;
  }

  .tier:last-child {
    padding-bottom: 0;
  }

  /* the price sits right after the badge, in the primary text colour, so badge and price read as one strong row */
  .tier-head {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .tier-name {
    margin: 0;
    padding: 7px 14px;
    border-radius: 10px;
    background-color: var(--home-surface-inner);

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

  .tier-price {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 600;
    color: var(--vp-c-text-1);
    white-space: nowrap;
  }

  .tier-description {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5rem;
    color: var(--vp-c-text-2);
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

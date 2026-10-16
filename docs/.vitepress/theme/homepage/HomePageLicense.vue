<script setup lang="ts">
import { licensePrices } from "../pricing/prices";

const perYear = (price: number) => `$${price.toLocaleString("en-US")} / year`;

const tiers = [
  {
    name: "Community",
    price: "Free",
    description: "For individuals, FOSS projects, charities, academic institutions and businesses under $1M in annual revenue."
  },
  {
    name: "Professional",
    price: perYear(licensePrices.professional),
    description: "For one legal entity shipping PDFs in production. Every developer covered at one flat price, with no seat counting or usage fees."
  },
  {
    name: "Enterprise",
    price: perYear(licensePrices.enterprise),
    description: "For corporate groups that need affiliate-wide coverage, priority support, reduced risk and procurement-friendly terms."
  }
]

const includes = [
  { icon: "fa-infinity", text: "Perpetual license, not a subscription: keep your version forever" },
  { icon: "fa-layer-group", text: "All features included in every tier without restrictions" },
  { icon: "fa-users", text: "Unlimited developers, projects, servers, and deployments" },
  { icon: "fa-box-open", text: "Royalty-free redistribution in SaaS, desktop, and on-premises apps" },
  { icon: "fa-lock-open", text: "No registration, watermarks, or time limits" },
  { icon: "fa-code", text: "Full source code available on GitHub" }
]
</script>

<template>
  <div class="panel license-panel">
    <div class="includes">
      <h2 class="card-title">Fair and Sustainable License</h2>

      <ul class="includes-list">
        <li v-for="item of includes" :key="item.text">
          <i class="fa-regular" :class="item.icon" aria-hidden="true"></i>
          <span>{{ item.text }}</span>
        </li>
      </ul>

      <div class="actions">
        <a class="action pricing-button" href="/pricing.html">View Pricing</a>
        <a class="action" href="/license/guide.html">License Selection Guide</a>
      </div>
    </div>

    <div class="divider" aria-hidden="true"></div>

    <div class="tiers">
      <article v-for="tier of tiers" :key="tier.name" class="tier" :class="tier.name.toLowerCase()">
        <div class="tier-head">
          <h3 class="tier-name">{{ tier.name }}</h3>
          <span class="tier-price">{{ tier.price }}</span>
        </div>
        <p class="tier-description">{{ tier.description }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>

/* two halves split by a hairline; a glow in the Community green from the left edge, behind the heading,
   over the panel's own sheen */

.license-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 48px;
  background-image:
      radial-gradient(ellipse 90% 55% at 0% 64px, color-mix(in srgb, #67B84D 11%, transparent), transparent),
      radial-gradient(ellipse 50% 30% at 0% 64px, color-mix(in srgb, #4CAF50 5%, transparent), transparent),
      var(--surface-sheen);
}

.divider {
  align-self: stretch;
  width: 1px;
  background-color: var(--vp-c-divider);
}

@media screen and (max-width: 960px) {
  .license-panel {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }

  .divider {
    width: auto;
    height: 1px;
  }
}


.includes {
  display: flex;
  flex-direction: column;
}

.includes-list {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex-grow: 1;
  margin: 32px 0 0;
}

/* rows like the Companion App's list of views */
.includes-list li {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 36px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.includes-list i {
  flex-shrink: 0;
  width: 18px;
  text-align: center;
  font-size: 1rem;
}

/* on phones the labels wrap, so the icon sits on the first line instead of the middle of the label */
@media screen and (max-width: 700px) {
  .includes-list li {
    align-items: flex-start;
    min-height: 0;
    padding: 6px 0;
  }

  .includes-list i {
    line-height: 1.5rem;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}


/* Tiers: spread over the panel's height; each badge takes its tier's colour from the pricing page */

.tiers {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
}

.tier {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tier-head {
  display: flex;
  align-items: center;
  gap: 14px;
}

.tier-name {
  padding: 7px 14px;
  border-radius: 10px;
  background-color: var(--surface-inner);

  font-size: 0.9375rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.tier.community .tier-name {
  color: light-dark(#2E7D32, #A5D6A7);
  background-color: #67B84D33;
}

.tier.professional .tier-name {
  color: white;
  background-color: light-dark(#2196F3, #1976D2);
}

.tier.enterprise .tier-name {
  color: light-dark(white, #212121);
  background-color: light-dark(#212121, #EEEEEE);
}

.tier-price {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.tier-description {
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}


.action.pricing-button {
  background-color: light-dark(#66BB6A, #4CAF50);
  color: var(--vp-button-brand-text);
  font-weight: bold;
}

.action.pricing-button:hover {
  background-color: light-dark(#4CAF50, #66BB6A);
}

</style>

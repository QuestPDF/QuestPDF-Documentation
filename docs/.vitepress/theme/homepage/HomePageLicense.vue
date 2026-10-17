<script setup lang="ts">
import { licensePrices } from "../pricing/prices";

const perYear = (price: number) => `$${price.toLocaleString("en-US")} / year`;

const tiers = [
  {
    name: "Community",
    price: "Free",
    description: "For individuals, FOSS projects, charities, academic institutions and businesses under $1M in annual revenue. Public-sector bodies and publicly traded companies need a paid license."
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
  { icon: "fa-infinity", text: "Perpetual license, not a subscription: keep every version you received" },
  { icon: "fa-layer-group", text: "Full feature set in every tier, including the free Community License" },
  { icon: "fa-users", text: "Unlimited developers, projects, servers and deployments" },
  { icon: "fa-box-open", text: "Royalty-free redistribution in SaaS, desktop and on-premises apps" },
  { icon: "fa-lock-open", text: "No registration, license keys, watermarks or time limits" },
  { icon: "fa-rotate-left", text: "30-day money-back guarantee on every paid license" },
  { icon: "fa-tag", text: "Locked renewal price: it never increases while you keep renewing" }
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
      <!-- each tier links to its card on the pricing page -->
      <a v-for="tier of tiers" :key="tier.name" class="tier" :class="tier.name.toLowerCase()" href="/pricing.html">
        <span class="tier-head">
          <span class="tier-name">{{ tier.name }}</span>
          <span class="tier-price">
            <span class="tier-price-text">{{ tier.price }}</span>
            <i class="fa-regular fa-arrow-right tier-arrow" aria-hidden="true"></i>
          </span>
        </span>
        <span class="tier-description">{{ tier.description }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>

/* two halves split by a hairline; a glow in the Community green over the panel's own sheen. On white it falls
   from the top-left corner in a cooler green (the yellow-green of the dark glow reads as a stain there); in dark
   mode it spreads from the left edge, behind the heading. */

.license-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 48px;
  background-image:
      radial-gradient(ellipse 70% 100% at 0% 0%, color-mix(in srgb, #4CAF50 7.5%, transparent), transparent),
      radial-gradient(ellipse 35% 45% at 0% 0%, color-mix(in srgb, #66BB6A 4%, transparent), transparent),
      var(--surface-sheen);
}

html.dark .license-panel {
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
  font-weight: 500;
  color: var(--vp-c-text-1);
}

/* green on white ties the list to the glow and the button; white in dark mode, like the labels */
.includes-list i {
  flex-shrink: 0;
  width: 18px;
  text-align: center;
  font-size: 1rem;
  color: light-dark(#43A047, var(--vp-c-text-1));
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


/* Tiers: spread over the panel's height; each badge takes its tier's colour from the pricing page. A tier is
   a link that reads like plain content until pointed at: then its price underlines and an arrow slides in. */

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
  border-radius: 4px;
}

.tier:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 6px;
}

/* the price drops under the name when a narrow phone has no room for both */
.tier-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 14px;
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
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.tier-price-text {
  text-decoration: underline transparent;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: text-decoration-color 0.2s;
}

.tier:is(:hover, :focus-visible) .tier-price-text {
  text-decoration-color: currentColor;
}

.tier-arrow {
  font-size: 1rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s, transform 0.25s ease;
}

.tier:is(:hover, :focus-visible) .tier-arrow {
  opacity: 1;
  transform: translateX(0);
}

.tier-description {
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

/* a touch screen never hovers, so there the cues show at rest */
@media (hover: none) {
  .tier-price-text {
    text-decoration-color: currentColor;
  }

  .tier-arrow {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tier:is(:hover, :focus-visible) .tier-arrow {
    transform: none;
  }
}


/* on white the green is a step deeper, so the white label holds; hover darkens it there and lightens it in dark
   mode */
.action.pricing-button {
  background-color: light-dark(#43A047, #4CAF50);
  color: var(--vp-button-brand-text);
  font-weight: bold;
}

.action.pricing-button:hover {
  background-color: light-dark(#388E3C, #66BB6A);
}

</style>

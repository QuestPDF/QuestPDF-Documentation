<script setup lang="ts">
/* A · Refined split. Today's panel, halves, glow, ticks and buttons; what changes is the copy (the
   perpetual wording, unlimited developers, the Community exclusions) and the right half: the tiers
   become hairline rows that link to their licence, with the price as the strongest thing in the row
   and the three name badges at one weight. */
import { communityExclusion, links, prices, usd } from "./licenseFacts";

const tiers = [
  {
    id: "community",
    name: "Community",
    price: "Free",
    per: "",
    href: links.community,
    description: "For individuals, open-source projects, charities, academia and companies whose group earns under $1M a year.",
    note: communityExclusion
  },
  {
    id: "professional",
    name: "Professional",
    price: usd(prices.professional),
    per: "per year of updates",
    href: links.paid,
    description: "For one company. Every developer covered at one flat price, with a year of updates and direct email support."
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: usd(prices.enterprise),
    per: "per year of updates",
    href: links.paid,
    description: "For a group of affiliated companies, with next-business-day priority support, continuity terms and purchase orders."
  }
];

const includes = [
  "Every feature in every tier, the free one included",
  "Unlimited developers, servers and deployments",
  "Versions you receive stay yours, even if you stop renewing",
  "Royalty-free redistribution in SaaS, desktop and on-premises apps",
  "Source code on GitHub, no license keys, nothing to activate"
];
</script>

<template>
  <section class="content">
    <div class="panel la-panel">
      <div class="la-glow" aria-hidden="true"></div>

      <div class="la-includes">
        <h2 class="card-title">Fair and Sustainable License</h2>
        <p class="card-description">
          Free for individuals, open source and small businesses. Larger companies pay one flat price,
          which funds full-time development of the same complete library for everyone.
        </p>

        <ul class="la-list">
          <li v-for="item of includes" :key="item">
            <i class="fa-duotone fa-square-check" aria-hidden="true"></i>
            <span>{{ item }}</span>
          </li>
        </ul>

        <div class="la-actions">
          <a class="action la-pricing" :href="links.pricing">View Pricing</a>
          <a class="action" :href="links.guide">License Selection Guide</a>
        </div>
      </div>

      <div class="la-divider" aria-hidden="true"></div>

      <div class="la-tiers">
        <a v-for="tier of tiers" :key="tier.id" :href="tier.href" class="la-tier" :class="tier.id">
          <span class="la-head">
            <span class="la-name">{{ tier.name }}</span>
            <span class="la-price">
              <span class="la-amount">{{ tier.price }}</span>
              <span v-if="tier.per" class="la-per">{{ tier.per }}</span>
            </span>
          </span>
          <span class="la-description">{{ tier.description }}</span>
          <span v-if="tier.note" class="la-note">{{ tier.note }}</span>
          <i class="fa-regular fa-arrow-right la-arrow" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
}

.la-panel {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1.1fr);
  gap: 48px;
  --accent: #67B84D;
  --accent-secondary: #4CAF50;
}

/* today's glow, unchanged */
.la-glow {
  position: absolute;
  pointer-events: none;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  overflow: hidden;
  background-image:
      radial-gradient(ellipse 90% 55% at 0% 64px, color-mix(in srgb, var(--accent) 11%, transparent), transparent),
      radial-gradient(ellipse 50% 30% at 0% 64px, color-mix(in srgb, var(--accent-secondary) 5%, transparent), transparent);
}

.la-divider {
  width: 1px;
  background-color: var(--vp-c-divider);
}

.la-includes {
  display: flex;
  flex-direction: column;
}

.la-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex-grow: 1;
  margin: 32px 0 0;
  padding: 0;
  list-style: none;
}

.la-list li {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 12px;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.5rem;
}

.la-list i {
  width: 24px;
  --fa-primary-color: #67B84D;
  --fa-secondary-color: #67B84D;
}

html.dark .la-list i {
  --fa-primary-color: #81C784;
  --fa-secondary-color: #81C784;
}

.la-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.action.la-pricing {
  background-color: #66BB6A;
  color: var(--vp-button-brand-text);
  font-weight: bold;
}

.action.la-pricing:hover {
  background-color: #4CAF50;
}

html.dark .action.la-pricing {
  background-color: #4CAF50;
}

/* Tiers: three rows split by hairlines, each a link to its licence. The head row is the name badge
   on the left and the price on the right, so the three prices form one column a reader can scan. */

.la-tiers {
  display: flex;
  flex-direction: column;
  margin: -20px 0;
}

.la-tier {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 40px 20px 0;
  border-top: 1px solid var(--vp-c-divider);
  color: inherit;
  text-decoration: none;
}

.la-tier:first-child {
  border-top: none;
}

.la-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

/* one weight for all three badges: a tint of the tier colour with the tier colour as text */
.la-name {
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  font-weight: 600;
}

.community .la-name { color: #2E7D32; background-color: #67B84D2E; }
.professional .la-name { color: #1565C0; background-color: #2196F324; }
.enterprise .la-name { color: var(--vp-c-text-1); background-color: var(--home-surface-inner); }

html.dark .community .la-name { color: #A5D6A7; background-color: #67B84D33; }
html.dark .professional .la-name { color: #90CAF9; background-color: #2196F333; }

.la-price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  white-space: nowrap;
}

.la-amount {
  font-size: 1.375rem;
  line-height: 1.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.community .la-amount {
  color: #2E7D32;
}

html.dark .community .la-amount {
  color: #A5D6A7;
}

.la-per {
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.la-description {
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

/* the homepage keeps running text at 1rem or more, so the exclusion is set apart by colour only */
.la-note {
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-3);
}

.la-arrow {
  position: absolute;
  right: 4px;
  top: 50%;
  translate: 0 -50%;
  color: var(--vp-c-text-3);
  transition: translate 0.2s ease, color 0.2s ease;
}

.la-tier:hover .la-arrow {
  translate: 4px -50%;
  color: var(--vp-c-brand-1);
}

.la-tier:hover .la-description {
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 960px) {
  .la-panel {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }

  .la-divider {
    width: auto;
    height: 1px;
  }

  .la-tiers {
    margin: -20px 0 -20px;
  }
}

@media screen and (max-width: 480px) {
  .la-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .la-tier {
    padding-right: 28px;
  }
}

</style>

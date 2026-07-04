<template>
  <article class="content">
    <header class="section-header">
      <h1>Perpetual Licensing</h1>
    </header>

    <div class="license-tiers">
      <section v-for="license of licenses" :key="license.name" class="license-tier card" :class="license.name">
        <div class="tag"><i class="fa-solid fa-star"></i>Most Popular</div>

        <header>
          <div class="tier-name">{{ license.name }}</div>

          <div v-if="license.price">
            <span class="price-value">${{ license.price.toLocaleString("en-US") }}</span>
            <span class="price-tax">+ local tax</span>
          </div>

          <div v-else>
            <p class="price-value price-free">Free forever</p>
          </div>

          <div class="tier-description" v-html="license.description" />
        </header>

        <hr>

        <div class="details">
          <div v-for="detail of license.details" :key="detail" class="details-item">
            <i class="fa-duotone fa-square-check"></i>
            <p>{{ detail }}</p>
          </div>
        </div>

        <a v-if="license.price" class="action" @click="paddle.startCheckout(license.paddlePriceId)">
          Purchase License
        </a>
        <a v-else class="action" href="/quick-start.html">Get Started</a>

        <p class="footnote" v-html="license.footnote" />
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">

import {usePaddle} from "../paddle";

const paddle = usePaddle();

interface License {
  name: string;
  description: string;

  price: number | null;
  paddlePriceId: string | null;

  details: string[];
  footnote: string;
}

const CommunityLicense: License = {
  name: "community",
  description: "For individuals, FOSS-compatible projects, charities, academic institutions, and businesses <b>under</b> 1M&nbsp;USD annual gross revenue",
  price: null,
  paddlePriceId: null,
  details: [
    "Full feature set — same core product as paid tiers",
    "Commercial use allowed",
    "Unlimited developers, projects, servers, and deployments",
    "Royalty-free redistribution inside your own apps",
    "No registration, license keys, or watermarks",
    "Source-available — full source code on GitHub",
    "Community support via GitHub"
  ],
  footnote: "From package install to first PDF in minutes"
};

const ProfessionalLicense: License = {
  name: "professional",
  description: "For one legal entity shipping PDFs in production — every developer covered at one flat, predictable price, with no seat counting or usage fees",
  price: 1999,
  paddlePriceId: paddle.professionalLicensePriceId,
  details: [
    "Perpetual license for entire company",
    "Unlimited developers, projects, servers, and deployments",
    "One year of feature updates, fixes, and security patches included",
    "Direct email support",
    "Royalty-free redistribution — SaaS, desktop, on-prem; end users need no license",
    "Runs fully offline and air-gapped",
    "Price Lock — your renewal price never increases while you renew continuously",
    "30-day money-back guarantee"
  ],
  footnote: "Renews annually at today's price — cancel anytime, keep your version forever"
};

const EnterpriseLicense: License = {
  name: "enterprise",
  description: "For corporate groups that need affiliate-wide coverage, priority support, reduced risk, and procurement-friendly terms",
  price: 4999,
  paddlePriceId: paddle.enterpriseLicensePriceId,
  details: [
    "Everything in Professional",
    "One license covers all your affiliates",
    "Next-business-day dedicated, priority email support",
    "Priority handling for business-critical issues with off-schedule releases",
    "12-month notice before any general end-of-life, with critical fixes and migration assistance throughout",
    "Order Forms, purchase orders, direct invoicing, supplier onboarding, and multi-year terms"
  ],
  footnote: `Buy online, through resellers, or <a href="mailto:contact@questpdf.com">request a quote</a>`
};

const licenses = [
  CommunityLicense,
  ProfessionalLicense,
  EnterpriseLicense
];

</script>

<style scoped lang="scss">

/* Page layout */

.content {
  padding-top: 48px;
}

@media screen and (max-width: 450px) {
  h1 {
    font-size: 2rem;
  }
}

@media screen and (max-width: 400px) {
  h1 {
    font-size: 1.75rem;
  }
}


/* Tier grid
   Desktop: three equal columns; each card is a subgrid spanning six shared
   row tracks, so every section starts at the same height across all cards.
   Children are pinned to their rows explicitly because the tag is rendered
   only on the professional card — auto-placement would shift the rows of
   the other two. */

.license-tiers {
  margin-top: 16px;

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(6, auto); // tag, header, divider, details, action, footnote
}

.license-tiers .license-tier {
  position: relative;
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 6;
  justify-items: start;
  align-items: start;
}

.license-tier .tag { grid-row: 1; }
.license-tier header { grid-row: 2; }
.license-tier hr { grid-row: 3; }
.license-tier .details { grid-row: 4; }
.license-tier a.action { grid-row: 5; }
.license-tier .footnote { grid-row: 6; }


/* Card frames
   The three cards read as one joined unit: the outer cards drop their inner
   corner radii and are inset vertically, while the professional card in the
   middle stays full height and elevated. */

.license-tier.professional {
  border: 3px solid #2196F355;
  border-radius: 24px;
  box-shadow: 0 4px 16px rgba(33, 150, 243, 0.2) !important;
  z-index: 1;
}

.license-tier.community {
  border-radius: 24px 0 0 24px;
  margin: 32px 0;
}

.license-tier.enterprise {
  border-radius: 0 24px 24px 0;
  margin: 32px 0;
}


/* "Most Popular" tag */

.license-tier:not(.professional) .tag {
  display: none;
}

.license-tier.professional .tag {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 32px;
  transform: translateY(-8px);

  color: #2196F3;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  word-spacing: 3px;
}

.license-tier.professional .tag .fa-star {
  color: #2196F3;
  font-size: 0.875rem;
}

html.dark .license-tier.professional .tag,
html.dark .license-tier.professional .tag .fa-star {
  color: #64B5F6;
}


/* Card header: tier name, price, description */

.license-tier header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.license-tier .tier-name {
  border-radius: 128px;
  padding: 6px 24px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.875rem;
}

.license-tier.community .tier-name {
  background-color: #67B84D33;
  color: #1B5E20;
}

.license-tier.professional .tier-name {
  background-color: #2196F3;
  color: white;
}

.license-tier.enterprise .tier-name {
  background-color: #212121;
  color: white;
}

html.dark {
  .license-tier.community .tier-name {
    background-color: #4CAF5022;
    color: #A5D6A7;
  }

  .license-tier.professional .tier-name {
    background-color: #1976D2;
    color: white;
  }

  .license-tier.enterprise .tier-name {
    background-color: #EEEEEE;
    color: #212121;
  }
}

.license-tier .price-value {
  font-size: 2.25rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1) !important;
}

.license-tier .price-tax {
  margin-left: 8px;
  font-weight: 400;
  color: var(--vp-c-text-1) !important;
}

.license-tier .price-free {
  opacity: 0.9;
}

.license-tier .tier-description {
  color: var(--vp-c-text-2);
  font-size: 0.9375rem;
  line-height: 1.5rem;
}


/* Details list */

.details {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
}

.details-item {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 12px;
}

.details-item i.fa-square-check {
  width: 24px;
}

.details-item p {
  color: var(--vp-c-text-1) !important;
  line-height: 1.5rem;
  font-size: 1rem;
}

.license-tier.community .fa-square-check {
  --fa-primary-color: #67B84D;
  --fa-secondary-color: #67B84D;
}

.license-tier.enterprise .fa-square-check {
  --fa-primary-color: transparent;
  --fa-secondary-color: #444;
  --fa-secondary-opacity: 1.0;
}

html.dark {
  .license-tier.community .fa-square-check {
    --fa-primary-color: #81C784;
    --fa-secondary-color: #81C784;
  }

  .license-tier.enterprise .fa-square-check {
    --fa-primary-color: #444;
    --fa-secondary-color: white;
  }
}


/* Action button */

.license-tier a.action {
  justify-self: stretch;
  text-align: center;
  margin-top: 32px;
}

.license-tier.professional .action {
  background-color: #2196F3;
  color: white;
}

.license-tier.professional .action:hover {
  background-color: #42A5F5;
  color: white;
}

.license-tier.enterprise .action {
  background-color: #212121;
  color: white;
}

html.dark {
  .license-tier.enterprise .action {
    background-color: #EEEEEE;
    color: #212121;
  }

  .license-tier.enterprise .action:hover {
    background-color: white;
  }
}


/* Footnote */

.license-tier .footnote {
  place-self: normal; // stretch across the column so the centered text aligns with the button above
  text-align: center;
  margin-top: 16px;

  font-size: 0.8125em;
  line-height: 1.5;
  color: var(--vp-c-text-2);

  :deep(a) {
    color: var(--vp-c-text-2);
    text-decoration: underline;
  }

  :deep(a):hover {
    color: var(--vp-c-text-1);
  }
}


/* Stacked layout: below the width where three cards fit comfortably,
   cards form a single centered column and the joined-card styling
   (flat inner corners, vertical inset margins) is reset. */

@media screen and (max-width: 960px) {
  .license-tiers {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  .license-tiers .license-tier {
    grid-template-rows: auto; // subgrid has no parent grid here
    width: 100%;
    max-width: 560px;
  }

  .license-tier.community,
  .license-tier.enterprise {
    margin: 0;
    border-radius: 24px;
  }
}

</style>

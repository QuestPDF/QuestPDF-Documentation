<template>
  <article class="content">
    <header class="section-header">
      <h1>Perpetual Licensing</h1>
    </header>

    <div class="license-tiers">
      <section class="license-tier card" :class="license.name" v-for="license of licenses">

        <div class="tag"><i class="fa-solid fa-star"></i>Most Popular</div>

        <header style="display: flex; flex-direction: column; align-items: start;">
          <div class="tier-name">{{ license.name }}</div>

          <div v-if="license.price">
            <span class="price-value">${{ license.price.toLocaleString("en-US") }}</span>
            <span v-if="license.pricePer" class="price-per">+ local tax</span>
          </div>

          <div v-else>
            <p class="price-value price-free">Free forever</p>
          </div>

          <div class="tier-description" v-html="license.description" />
        </header>

        <hr>

        <div class="details">
          <div v-for="detail of license.details" class="details-item">
            <i class="fa-duotone fa-square-check"></i>
            <p>{{ detail }}</p>
          </div>
        </div>

        <a v-if="license.price" class="action" @click="paddle.startCheckout(license.paddlePriceId)">
          Purchase License
        </a>
        <a v-else class="action" href="/quick-start.html">Get Started</a>

        <p class="renewal-info" v-html="license.footnote" />
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

  price: number;
  pricePer: string | null,
  paddlePriceId: string;

  details: string[];

  footnote: string;
}

const CommunityLicense: License = {
  name: "community",
  description: "For individuals, FOSS-compatible projects, charities, academic institutions, and businesses <b>under</b> 1M&nbsp;USD annual gross revenue",
  price: null,
  pricePer: null,
  paddlePriceId: null,
  details: [
    "Full feature set — identical to paid tiers",
    "Commercial use allowed",
    "Unlimited projects, servers, and deployments",
    "Royalty-free redistribution inside your own apps",
    "No registration, license keys, or watermarks",
    "Source-available with source code available on GitHub",
    "Community support via GitHub"
  ],
  footnote: "From package install to first PDF in minutes"
};

const ProfessionalLicense: License = {
  name: "professional",
  description: "For one legal entity shipping PDFs in production — every developer covered at one flat, predictable price, with no seat counting or usage fees",
  price: 1999,
  pricePer: "team",
  paddlePriceId: paddle.professionalLicensePriceId,
  details: [
    "Perpetual license for entire company",
    "Unlimited developers, projects, servers, and deployments",
    "Includes one year of feature updates, fixes and security patches",
    "Direct e-mail support",
    "30-day money-back guarantee",
    "Royalty-free redistribution including OEM and SaaS",
    "Support for air-gapped environments",
    "Renewal price locked while you renew continuously",
  ],
  footnote: "Renews annually at today's price — cancel anytime, keep your version forever"
};

const EnterpriseLicense: License = {
  name: "enterprise",
  description: "For corporate groups that need affiliate-wide coverage, priority support, reduced risk, and procurement-friendly terms",
  price: 4999,
  pricePer: "org",
  paddlePriceId: paddle.enterpriseLicensePriceId,
  details: [
    "Everything in Professional",
    "One license covers all your affiliates enabling world-wide teams",
    "Next-business-day dedicated, priority email support",
    "Priority handling for business-critical issues with off-schedule releases",
    "12-month notice before any discontinuation, with continued critical fixes and migration support",
    "Order Forms, purchase orders, direct invoicing, and multi-year terms"
  ],
  footnote: `Purchase via reseller or <a href="mailto:contact@questpdf.com">request a quote</a>`
};

const licenses = [
  CommunityLicense,
  ProfessionalLicense,
  EnterpriseLicense
];

</script>

<style scoped lang="scss">

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

.license-tiers {
  margin-top: 16px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));

  // shared row tracks: tag, header, divider, details, action, renewal note
  grid-template-rows: repeat(6, auto);
}

.license-tiers .license-tier {
  position: relative;
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 6;
  justify-items: start;
  align-items: start;
}

.license-tier .tag {
  grid-row: 1;
}

.license-tier header {
  grid-row: 2;
}

.license-tier hr {
  grid-row: 3;
}

.license-tier .details {
  grid-row: 4;
}

.license-tier a.action {
  grid-row: 5;
}

.license-tier .renewal-info {
  grid-row: 6;
}

.license-tier.professional {
  //padding-top: 64px;

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


/* Tag highlight */

.license-tier.professional {
  border: 3px solid #2196F355;
  box-shadow: 0 4px 16px rgba(33, 150, 243, 0.2) !important;
  z-index: 1;
}

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
  letter-spacing: 1.5px;
}

.license-tier.professional .tag .fa-star {
  color: #2196F3;
  font-size: 0.875rem;
}

html.dark .license-tier.professional .tag,
html.dark .license-tier.professional .tag .fa-star {
  color: #64B5F6;
}

.license-tier.professional {
  border-radius: 24px;
}

.license-tier.community {
  border-radius: 24px 0 0 24px;
  margin: 32px 0;
}

.license-tier.enterprise {
  border-radius: 0 24px 24px 0;
  margin: 32px 0;
}





/* Tier name */

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


/* Tier price */

.license-tier header {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 24px;
}

.license-tier header h3 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 8px;
}

.license-tier .price-value {
  line-height: 2.25rem;
  font-size: 2.25rem;

  color: var(--vp-c-text-1) !important;
  font-weight: 700;
}

.license-tier .tier-description {
  color: var(--vp-c-text-2);
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.license-tier .price-per {
  margin-left: 8px;

  color: var(--vp-c-text-1) !important;
  font-weight: 400;
}

.license-tier .price-free {
  opacity: 0.9;
}


/* Tier details */

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


/* Tier action */

.license-tier a.action {
  justify-self: stretch;
  text-align: center;
  margin-top: 32px;
}

.license-tier.professional .action {
  background-color: #2196F3;
  color: white;
}

.license-tier.enterprise .action {
  background-color: #212121;
  color: white;
}

.license-tier.professional .action:hover {
  background-color: #42A5F5;
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

.license-tier .renewal-info {
  place-self: normal;
  text-align: center;
  margin-top: 16px;

  font-size: 0.8125em;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  opacity: 0.85;
}

</style>
<template>
  <article class="content">
    <license-header />

    <div class="license-tiers">
      <section class="license-tier card" :class="license.name" v-for="license of licenses">

        <div class="tag" />

        <header style="display: flex; flex-direction: column; align-items: start;">
          <div class="tier-name">{{ license.name }}</div>

          <div v-if="license.price">
            <span class="price-value">${{ license.price }}</span>
            <span v-if="license.pricePer" class="price-per">+ local tax</span>
          </div>

          <div v-else>
            <p class="price-value price-free">Free forever</p>
          </div>

          <div v-html="license.description " />
        </header>

        <hr>

        <div class="details">
          <div v-for="detail of license.details" class="details-item">
            <i class="fa-duotone fa-square-check"></i>
            <p>{{ detail }}</p>
          </div>
        </div>

        <div style="flex-grow: 1"></div>

        <a v-if="license.price" class="action" @click="paddle.startCheckout(license.paddlePriceId)">
          Purchase License
        </a>
        <a v-else class="action" href="/quick-start.html">Get Started</a>

        <p v-if="license.price" class="renewal-info">
          Updates renew annually<br> License never expires
        </p>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">

import {usePaddle} from "../../paddle";
import LicenseHeader from "./LicenseHeader.vue";

const paddle = usePaddle();

interface License {
  name: string;
  description: string;

  price: number;
  pricePer: string | null,
  paddlePriceId: string;

  details: string[];
}

const CommunityLicense: License = {
  name: "community",
  description: "For individuals, open-source projects, non-profits, and companies <b>under</b> 1M&nbsp;USD annual gross revenue",
  price: null,
  pricePer: null,
  paddlePriceId: null,
  details: [
    "Full feature set",
    "Allows for commercial usage",
    "MIT license terms",
    "No registration or license key",
    "No watermarks or limits",
    "Community support via GitHub"
  ]
};

const ProfessionalLicense: License = {
  name: "professional",
  description: "Required commercial license for teams with up to 10 developers working on QuestPDF-dependent projects",
  price: 999,
  pricePer: "team",
  paddlePriceId: paddle.professionalLicensePriceId,
  details: [
    "Perpetual license for entire team",
    "Includes 1 year of feature updates and security patches",
    "Unlimited projects, servers, and deployments",
    "Direct e-mail support",
    "30-day money-back guarantee",
  ]
};

const EnterpriseLicense: License = {
  name: "enterprise",
  description: "Organization-wide commercial license with no developer counting, priority support, and full future-proof coverage",
  price: 2999,
  pricePer: "org",
  paddlePriceId: paddle.enterpriseLicensePriceId,
  details: [
    "Perpetual with 1 year of updates",
    "Covers every developer and project in your organization",
    "Premium e-mail support with next business day response",
    "30-day money-back guarantee",
    "Supports vendor onboarding and procurement workflows"
  ]
};

const licenses = [
  CommunityLicense,
  ProfessionalLicense,
  EnterpriseLicense
];

</script>

<style scoped lang="scss">

.license-tiers {
  margin-top: 64px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  grid-gap: 36px;
}

.license-tier {
  padding-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
}

.license-tier.community .fa-square-check {
  --fa-primary-color: #212121;
  --fa-secondary-color: #212121;
}

.license-tier.enterprise .fa-square-check {
  --fa-primary-color: transparent;
  --fa-secondary-color: #444;
  --fa-secondary-opacity: 1.0;
}

html.dark {
  .license-tier.community .fa-square-check {
    --fa-primary-color: #DDD;
    --fa-secondary-color: #888;
  }

  .license-tier.enterprise .fa-square-check {
    --fa-primary-color: #444;
    --fa-secondary-color: white;
  }
}


/* Tag highlight */

.license-tier.enterprise {
  border: 1px solid #888;
  box-shadow: 0 8px 16px #8883 !important;
}

.license-tier:not(.enterprise) .tag {
  display: none;
}

.license-tier.enterprise .tag:before {
  content: 'RECOMMENDED';

  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  transform: translateY(-50%);
  margin: 0 auto;
  width: fit-content;
  padding: 4px 12px;
  border-radius: 128px;
  background-color: var(--vp-c-bg);
  border: 1px solid #888;
  color: #444;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 1px;
}

.license-tier.enterprise {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

html.dark .license-tier.enterprise .tag:before {
  color: #DDD;
}


/* Tier name */

.license-tier .tier-name {
  border-radius: 128px;
  padding: 6px 18px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.875rem;
}

.license-tier.community .tier-name {
  background-color: #8884;
  color: #212121;
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
    color: #F5F5F5;
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
  line-height: 2rem;
  font-size: 2rem;

  color: var(--vp-c-text-1) !important;
  font-weight: 700;
}

.license-tier .price-per {
  margin-top: 8px;

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
  gap: 16px;
}

.details-item {
  break-inside: avoid-column;

  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: start;
}

.details-item p {
  color: var(--vp-c-text-1) !important;
  line-height: 1.5rem;
  font-size: 1rem;
}


/* Tier action */

.license-tier a.action {
  align-self: end;
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
  font-size: 0.875em;
  place-self: end;
  text-align: end;
  line-height: 1rem;
  margin-top: 8px;
}

</style>
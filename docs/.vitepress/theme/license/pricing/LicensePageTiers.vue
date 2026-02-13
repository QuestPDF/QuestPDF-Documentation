<template>
  <article class="content">
    <license-header />

    <div class="license-tiers">
      <section class="license-tier card" :class="license.name" v-for="license of licenses">

        <div class="popular" />

        <header style="display: flex; flex-direction: column; align-items: start;">
          <div class="tier-name">{{ license.name }}</div>

          <div v-if="license.price">
            <span class="price-value">${{ license.price }}</span>
            <span v-if="license.pricePer" class="price-per">per {{ license.pricePer }} + tax</span>
          </div>

          <div v-else>
            <p class="price-value">Free forever</p>
          </div>

          <div>{{ license.description }}</div>
        </header>

        <hr>

        <div class="details">
          <div v-for="detail of license.details" class="details-item">
            <i class="fa-duotone fa-square-check"></i>
            <p>{{ detail }}</p>
          </div>
        </div>

        <div style="flex-grow: 1"></div>

        <a v-if="license.price" class="action" @click="paddle.startCheckout(license.paddlePriceId)">Purchase License</a>
        <a v-else class="action" href="/quick-start.html">Start Creating</a>
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
  description: "Ideal for individuals, open-source projects and early-stage startups",
  price: null,
  pricePer: null,
  paddlePriceId: null,
  details: [
    "Full feature set access",
    "For individuals and non-profits",
    "For open-source projects",
    "Commercial usage allowed for companies under $1M annual gross revenue"
  ]
};

const ProfessionalLicense: License = {
  name: "professional",
  description: "Essential commercial license for teams up to 10 developers",
  price: 999,
  pricePer: "team/year",
  paddlePriceId: paddle.professionalLicensePriceId,
  details: [
    "Full commercial usage rights",
    "Covers up to 10 developers",
    "Perpetual license with 1 year of updates and maintenance",
    "Unlimited server and cloud deployments"
  ]
};

const EnterpriseLicense: License = {
  name: "enterprise",
  description: "Audit-proof, frictionless licensing for growing organizations",
  price: 2999,
  pricePer: "org/year",
  paddlePriceId: paddle.enterpriseLicensePriceId,
  details: [
    "Perpetual license with 1 year of updates and maintenance",
    "Single license covers your entire organization",
    "Unlimited projects, developers and server deployments",
    "Dedicated priority e-mail support with next business day response"
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
  grid-gap: 48px;
}

.license-tier {
  padding-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
}

html.dark {
  .license-tier.professional {
    background-color: #1c1c22;
  }
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


/* Popular highlight */

.license-tier.enterprise {
  border: 1px solid #888;
  box-shadow: 0 8px 16px #8883 !important;
}

.license-tier:not(.enterprise) .popular {
  display: none;
}

.license-tier.enterprise .popular:before {
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

html.dark .license-tier.enterprise .popular:before {
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
  margin-left: 8px;
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
  margin-top: 24px;
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

</style>
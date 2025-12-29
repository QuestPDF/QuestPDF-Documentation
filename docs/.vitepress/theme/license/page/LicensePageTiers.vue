<template>
  <article class="content">
    <license-header />

    <div class="licenses">
      <section class="license-tier card" :class="license.name" v-for="license of licenses">

        <div class="popular">
          POPULAR
        </div>

        <header style="display: flex; flex-direction: column; align-items: start;">
          <div class="tier-name">{{ license.name }}</div>

          <div v-if="license.price">
            <span class="price-value">${{ license.price }}</span>
            <span class="price-per">per team/year</span>
          </div>

          <div v-else>
            <p class="price-value">Free forever</p>
          </div>

          <div>{{ license.description }}</div>
        </header>

        <hr>

        <div class="details">
          <div v-for="detail of license.details" class="details-item">
            <img src="/homepage/square-check-lite.svg" width="24" alt="" />
            <p>{{ detail }}</p>
          </div>
        </div>

        <div style="flex-grow: 1"></div>

        <a v-if="license.price" class="action" @click="paddle.startCheckout(license.paddlePriceId)">Purchase license</a>
        <a v-else class="action" href="/getting-started.html">Start creating</a>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">

import {usePaddle} from "../../paddle";
import LicenseHeader from "./LicenseHeader.vue";

const paddle = usePaddle();

interface License {
  icon: string;
  name: string;
  description: string;

  price: number;
  paddlePriceId: string;

  details: string[];
}

const CommunityLicense: License = {
  icon: "/license/community.svg",
  name: "community",
  description: "Ideal for startups, open-source, and individual developers building the next big thing",
  price: null,
  paddlePriceId: null,
  details: [
    "All features available",
    "For individuals and non-profits",
    "For open-source projects",
    "Commercial usage allowed for businesses with less than $1M USD annual gross revenue"
  ]
};

const ProfessionalLicense: License = {
  icon: "/license/professional.svg",
  name: "professional",
  description: "Compliance and stability for established small businesses and agencies",
  price: 999, // Consider clarifying if this is USD in the UI
  paddlePriceId: paddle.professionalLicensePriceId,
  details: [
    "Full commercial usage rights",
    "Covers up to 10 developers",
    "Includes 1 year of updates & maintenance",
    "Funds ongoing development"
  ]
};

const EnterpriseLicense: License = {
  icon: "/license/enterprise.svg",
  name: "enterprise",
  description: "Maximum flexibility and priority support for large teams and mission-critical systems",
  price: 1999,
  paddlePriceId: paddle.enterpriseLicensePriceId,
  details: [
    "Unlimited developers & server deployments",
    "Dedicated priority e-mail support",
    "Frictionless company-wide licensing",
    "Perpetual license with 1 year of updates & maintenance"
  ]
};

const licenses = [
  CommunityLicense,
  ProfessionalLicense,
  EnterpriseLicense
];

</script>

<style scoped>

.licenses {
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

.license-tier.professional {
  border: 1px solid #2196F3;
  filter: drop-shadow(0 16px 16px #2196F322) !important;
}

.license-tier:not(.professional) .popular {
  display: none;
}

.license-tier.professional .popular {
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
  border: 1px solid #2196F3;
  color: #2196F3;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 1px;
}

.license-tier header {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 24px;
}

.license-tier header img {
  width: 48px;
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

.license-tier a.action {
  align-self: flex-end;
  margin-top: 32px;
}

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



.license-tier.professional {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}



.license-tier .tier-name {
  border-radius: 128px;
  padding: 6px 16px;
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

html.dark .license-tier.community .tier-name {
  color: #F5F5F5;
}

html.dark .license-tier.professional .tier-name {
  background-color: #1976D2;
  color: white;
}

html.dark .license-tier.enterprise .tier-name {
  background-color: #EEEEEE;
  color: #212121;
}


.license-tier.professional .action {
  background-color: #2196F3;
  color: white;
}

.license-tier.enterprise .action {
  background-color: #F5F5F5;
  color: #212121;
  border: 1px solid #212121;
}

html.dark .license-tier.enterprise .action {
  background-color: #EEEEEE;
  color: #212121;
}


.license-tier.professional .action:hover {
  background-color: #42A5F5;
  color: white;
}

.license-tier.enterprise .action:hover {
  background-color: white;
}

html.dark .license-tier.enterprise .action:hover {
  background-color: white;
}

</style>
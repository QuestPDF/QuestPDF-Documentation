<template>
  <article class="content">
    <header class="section-header">
      <h1>Perpetual Licensing</h1>
    </header>

    <div class="license-tiers">
      <section v-for="license of licenses" :key="license.name" class="license-tier panel" :class="license.name">
        <div v-if="license.name === 'professional'" class="tag"><i class="fa-solid fa-star" aria-hidden="true"></i>Most Popular</div>

        <header>
          <div class="tier-name">{{ license.name }}</div>

          <div v-if="license.price">
            <span class="price-value">${{ license.price.toLocaleString("en-US") }}</span>
            <span class="price-tax">+ local tax</span>
          </div>

          <p v-else class="price-value price-free">Free forever</p>

          <div class="tier-description" v-html="license.description" />
        </header>

        <hr>

        <div class="details">
          <div v-for="detail of license.details" :key="detail" class="details-item">
            <i class="fa-duotone fa-square-check" aria-hidden="true"></i>
            <p>{{ detail }}</p>
          </div>
        </div>

        <!-- a button: it opens the checkout overlay, it does not go anywhere -->
        <button v-if="license.price" type="button" class="action" @click="paddle.startCheckout(license.paddlePriceId)">
          Purchase License
        </button>
        <a v-else class="action" href="/quick-start.html">Get Started</a>

        <p class="footnote" v-html="license.footnote" />
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">

import {usePaddle} from "../paddle";
import {licensePrices} from "./prices";

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
  price: licensePrices.professional,
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
  price: licensePrices.enterprise,
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

<style scoped>

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


/* Each card is a subgrid spanning six shared row tracks, so every section starts at the same height across
   the cards. The children are pinned to their rows because only the professional card has the tag:
   auto-placement would shift the rows of the other two. */

.license-tiers {
  margin-top: 28px;

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(6, auto); /* tag, header, divider, details, action, footnote */
  gap: 0 32px;
}

/* 48px from 1280px, wider than the shared panel inset; on a narrower window, where the three cards share less
   room, it gives way down to 24px at 961px */
.license-tier {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 6;
  justify-items: start;
  align-items: start;
  padding: clamp(24px, 7.5vw - 48px, 48px);
}

.license-tier .tag { grid-row: 1; }
.license-tier header { grid-row: 2; }
.license-tier hr { grid-row: 3; }
.license-tier .details { grid-row: 4; }
.license-tier .action { grid-row: 5; }
.license-tier .footnote { grid-row: 6; }

.license-tier hr {
  margin: 32px 0;
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  width: 100%
}


/* The three cards read as one unit: the outer cards drop their inner corners and are inset vertically; the
   professional card in the middle stays full height, framed and tinted blue. */

.license-tier.professional {
  border: 3px solid light-dark(#2196F388, #2196F355);
  z-index: 1;
  background-color: color-mix(in srgb, #2196F3 5%, var(--surface));
}

/* the glass rim sits inside the 3px border, so its corners are 3px tighter than the card's */
.license-tier.professional::before {
  border-radius: 29px;
}

.license-tier.community {
  border-radius: 32px 0 0 32px;
  margin: 48px 0;
}

.license-tier.enterprise {
  border-radius: 0 32px 32px 0;
  margin: 48px 0;
}


.license-tier .tag {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 32px;
  transform: translateY(-8px);

  color: light-dark(#2196F3, #64B5F6);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  word-spacing: 3px;
}

.license-tier .tag .fa-star {
  font-size: 1rem;
}


.license-tier header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.license-tier .tier-name {
  border-radius: 12px;
  padding: 6px 24px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.875rem;
}

.license-tier.community .tier-name {
  background-color: light-dark(#67B84D33, #4CAF5022);
  color: light-dark(#1B5E20, #A5D6A7);
}

.license-tier.professional .tier-name {
  background-color: light-dark(#2196F3, #1976D2);
  color: white;
}

.license-tier.enterprise .tier-name {
  background-color: light-dark(#212121, #EEEEEE);
  color: light-dark(white, #212121);
}

.license-tier .price-value {
  font-size: 2.25rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

/* when the price and the tax note do not fit one line, the note moves down whole */
.license-tier .price-tax {
  margin-left: 8px;
  font-weight: 400;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.license-tier .price-free {
  opacity: 0.9;
}

.license-tier .tier-description {
  color: var(--vp-c-text-2);
  font-size: 0.9375rem;
  line-height: 1.5rem;
}


.details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.details-item {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 12px;
}

/* a duotone tick on a faint square, in the tier's colour; the professional and enterprise ticks sit on
   a solid square instead */
.fa-square-check {
  width: 24px;
  font-size: 24px;
  --fa-secondary-opacity: 0.2;
}

.details-item p {
  color: var(--vp-c-text-1);
}

.license-tier.community .fa-square-check {
  --fa-primary-color: light-dark(#67B84D, #81C784);
  --fa-secondary-color: light-dark(#67B84D, #81C784);
}

/* white tick on a solid blue square, the same blue as the tier name badge */
.license-tier.professional .fa-square-check {
  --fa-primary-color: white;
  --fa-secondary-color: light-dark(#2196F3, #1976D2);
  --fa-secondary-opacity: 1.0;
}

.license-tier.enterprise .fa-square-check {
  --fa-primary-color: light-dark(transparent, #444);
  --fa-secondary-color: light-dark(#444, white);
  --fa-secondary-opacity: 1.0;
}


.license-tier .action {
  justify-self: stretch;
  margin-top: 32px;
}

.license-tier.professional .action {
  background-color: #2196F3;
  color: white;
}

.license-tier.professional .action:hover {
  background-color: #42A5F5;
}

.license-tier.enterprise .action {
  background-color: light-dark(#212121, #EEEEEE);
  color: light-dark(white, #212121);
}

.license-tier.enterprise .action:hover {
  background-color: light-dark(#212121, white);
}


.license-tier .footnote {
  place-self: normal; /* stretch across the column so the centered text aligns with the button above */
  text-align: center;
  margin-top: 16px;

  font-size: 0.8125em;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.license-tier .footnote :deep(a) {
  color: var(--vp-c-text-2);
  text-decoration: underline;
}

.license-tier .footnote :deep(a:hover) {
  color: var(--vp-c-text-1);
}


/* below 960px: one centred column, without the joined-card styling */

@media screen and (max-width: 960px) {
  .license-tiers {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  /* the shared panel inset, which narrows to 32px by 24px on phones */
  .license-tier {
    grid-template-rows: auto; /* subgrid has no parent grid here */
    width: 100%;
    max-width: 560px;
    padding: var(--panel-padding);
  }

  .license-tier.community,
  .license-tier.enterprise {
    margin: 0;
    border-radius: 32px;
  }
}

</style>

<template>
  <div ref="root" class="custom-page pricing-page texture-dots">
    <div class="container">
      <pricing-tiers />
    </div>

    <div class="dotted-divider"></div>

    <div class="container">
      <pricing-buying />
    </div>

    <div class="dotted-divider"></div>

    <div class="container">
      <pricing-faq />
    </div>

    <div class="dotted-divider"></div>

    <div class="container">
      <pricing-contact />
    </div>
  </div>
</template>

<script setup lang="ts">

import PricingTiers from "./PricingTiers.vue";
import PricingBuying from "./PricingBuying.vue";
import PricingFaq from "./PricingFaq.vue";
import PricingContact from "./PricingContact.vue";
import { ref } from "vue";
import { useDotWings } from "../dotWings";

const root = ref<HTMLElement>();
useDotWings(root);

</script>

<style>

.pricing-page {
  --dots-height: 224px; /* the Community tier card */
}

.custom-page.pricing-page > .dotted-divider {
  width: calc(100% - 2 * var(--custom-page-gutter));
  max-width: 1040px;
  margin: 0 auto;
}

/* the page padding stays at the top and the bottom; next to a divider the contents keep the section gap (adjacency,
   not :first-child, because the dot wings are prepended to the page) */
.pricing-page > .dotted-divider + .container > .content {
  padding-top: var(--section-gap);
}

.pricing-page > .container:has(+ .dotted-divider) > .content {
  padding-bottom: var(--section-gap);
}

</style>

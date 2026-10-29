<template>
  <div class="custom-page pricing-page">
    <div class="container texture-dots">
      <pricing-tiers />
    </div>

    <div class="dotted-divider"></div>

    <div class="container texture-dots">
      <pricing-faq />
    </div>

    <div class="dotted-divider"></div>

    <div class="container texture-dots">
      <pricing-contact />
    </div>
  </div>
</template>

<script setup lang="ts">

import PricingTiers from "./PricingTiers.vue";
import PricingFaq from "./PricingFaq.vue";
import PricingContact from "./PricingContact.vue";

</script>

<style>

.custom-page.pricing-page > .dotted-divider {
  width: calc(100% - 2 * var(--custom-page-gutter));
  max-width: calc(var(--custom-page-width) - 2 * var(--custom-page-gutter));
  margin: 0 auto;
}

.pricing-page .content {
  padding-top: 48px;
  padding-bottom: 48px;
}

.pricing-page > .container:first-child .content {
  padding-top: 64px;
}

.pricing-page > .container:last-child .content {
  padding-bottom: 64px;
}

</style>

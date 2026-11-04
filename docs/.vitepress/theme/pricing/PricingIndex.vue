<template>
  <div class="custom-page pricing-page texture-dots">
    <div class="container">
      <pricing-tiers />
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
import PricingFaq from "./PricingFaq.vue";
import PricingContact from "./PricingContact.vue";

</script>

<style>

.custom-page.pricing-page > .dotted-divider {
  width: calc(100% - 2 * var(--custom-page-gutter));
  max-width: 1040px;
  margin: 0 auto;
}

.pricing-page .content {
  padding-top: 64px;
  padding-bottom: 64px;
}

@media screen and (max-width: 767px) {
  .pricing-page .content {
    padding-top: 48px;
    padding-bottom: 48px;
  }
}

</style>

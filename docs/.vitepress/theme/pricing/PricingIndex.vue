<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <pricing-page-tiers />
    </div>

    <div class="container">
      <pricing-resellers />
    </div>

    <div class="container reverse-background">
      <pricing-terms />
    </div>

    <div class="container">
      <pricing-contact />
    </div>
  </div>
</template>

<script setup lang="ts">

import PricingPageTiers from "./PricingPageTiers.vue";
import PricingTerms from "./PricingTerms.vue";
import PricingContact from "./PricingContact.vue";
import PricingResellers from "./PricingResellers.vue";

</script>

<style scoped>

</style>

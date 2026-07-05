<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <pricing-tiers />
    </div>

    <div class="container">
      <pricing-resellers />
    </div>

    <div class="container reverse-background">
      <pricing-faq />
    </div>

    <div class="container">
      <pricing-contact />
    </div>
  </div>
</template>

<script setup lang="ts">

import PricingTiers from "./PricingTiers.vue";
import PricingContact from "./PricingContact.vue";
import PricingResellers from "./PricingResellers.vue";
import PricingFaq from "./PricingFaq.vue";

</script>

<style scoped>

</style>

<template>
  <div class="custom-page">
    <div class="container no-border">
      <PricingDescription />
    </div>

    <div class="container reverse-background">
      <PricingManifesto />
    </div>

    <div class="container" id="license">
      <PricingLicense />
    </div>

    <div class="container reverse-background" id="tiers">
      <PricingTiers />
    </div>

    <div class="container">
      <PricingFrequentlyAskedQuestions />
    </div>

    <div class="container reverse-background">
      <PricingProvider />
    </div>
  </div>
</template>

<script setup>
import PricingTiers from "./PricingTiers.vue";
import PricingDescription from "./PricingDescription.vue";
import PricingFrequentlyAskedQuestions from "./PricingFrequentlyAskedQuestions.vue";
import PricingProvider from "./PricingProvider.vue";
import PricingLicense from "./PricingLicense.vue";
import PricingManifesto from "./PricingManifesto.vue";
</script>

<style scoped>

</style>

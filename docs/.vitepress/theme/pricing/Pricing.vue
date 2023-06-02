<template>
  <div class="custom-page">
    <div class="container no-border">
      <PricingDescription />
    </div>

    <div class="container reverse-background" id="license">
      <PricingTiers />
    </div>

<!--    <div class="container reverse-background">-->
<!--      <PricingFrequentlyAskedQuestions />-->
<!--    </div>-->
  </div>
</template>

<script setup>

import { onMounted } from "vue";
import { scrollToAnchor } from "../helpers";

import PricingTiers from "./PricingTiers.vue";
import PricingDescription from "./PricingDescription.vue";
import PricingFrequentlyAskedQuestions from "./PricingFrequentlyAskedQuestions.vue";
import PricingProvider from "./PricingProvider.vue";
import PricingLicense from "./PricingLicense.vue";
import PricingManifesto from "./PricingManifesto.vue";

onMounted(scrollToAnchor);

</script>

<style scoped>

</style>

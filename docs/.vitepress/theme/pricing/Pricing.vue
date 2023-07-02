<template>
  <div class="custom-page">
    <div class="container no-border">
      <PricingDescription />
    </div>

    <div class="container reverse-background">
      <div class="content">
        <pricing-tiers />
      </div>

      <div class="content">
        <pricing-menu />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import PricingDescription from "./PricingHeader.vue";
import PricingMenu from "./PricingMenu.vue";
import PricingTiers from "./PricingTiers.vue";

</script>

<style scoped>

</style>

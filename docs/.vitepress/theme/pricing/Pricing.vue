<template>
  <div class="custom-page">
    <div class="container no-border">
      <PricingDescription />
    </div>

    <div class="container reverse-background" id="license">
      <PricingTiers />
    </div>
  </div>
</template>

<script setup>

import { onMounted } from "vue";
import { scrollToAnchor } from "../helpers";

import PricingTiers from "./PricingTiers.vue";
import PricingDescription from "./PricingHeader.vue";

onMounted(scrollToAnchor);

</script>

<style scoped>

</style>

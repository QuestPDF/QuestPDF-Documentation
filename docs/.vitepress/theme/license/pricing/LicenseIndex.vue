<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <license-page-tiers />
    </div>

    <div class="container">
      <license-resellers />
    </div>

    <div class="container reverse-background">
      <license-general-description />
    </div>

    <div class="container">
      <license-help />
    </div>
  </div>
</template>

<script setup lang="ts">

import LicensePageTiers from "./LicensePageTiers.vue";
import LicenseGeneralDescription from "./LicenseTerms.vue";
import LicenseHelp from "./LicenseHelp.vue";
import LicenseResellers from "./LicenseResellers.vue";

</script>

<style scoped>

</style>

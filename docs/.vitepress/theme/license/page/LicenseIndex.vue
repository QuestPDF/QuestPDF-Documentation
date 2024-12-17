<template>
  <div class="custom-page">
    <div class="container no-border">
      <license-header />
    </div>

    <div class="container reverse-background">
      <ClientOnly>
        <license-page-tiers />
      </ClientOnly>
    </div>

    <div class="container">
      <license-general-description />
    </div>

    <div class="container reverse-background">
      <license-help />
    </div>
  </div>
</template>

<script setup lang="ts">

import LicenseHeader from "./LicenseHeader.vue";
import LicensePageTiers from "./LicensePageTiers.vue";
import LicenseGeneralDescription from "./LicenseTerms.vue";
import LicenseHelp from "./LicenseHelp.vue";

</script>

<style scoped>

</style>

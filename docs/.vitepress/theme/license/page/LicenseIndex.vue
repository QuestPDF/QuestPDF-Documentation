<template>
  <div class="custom-page">
    <div class="container no-border">
      <license-header />
    </div>

    <div class="container reverse-background">
      <div class="content">
        <ClientOnly>
          <license-page-tiers />
        </ClientOnly>
      </div>

      <div class="content">
        <ClientOnly>
          <license-page-menu />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import LicenseHeader from "./LicenseHeader.vue";
import LicensePageMenu from "./LicensePageMenu.vue";
import LicensePageTiers from "./LicensePageTiers.vue";

</script>

<style scoped>

</style>

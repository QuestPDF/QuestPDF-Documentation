<script setup>
/* 0 · Today: a copy of the header in LicensePurchaseSuccess.vue */
import PurchaseTag from "./PurchaseTag.vue";
import { inboxToday } from "./purchase";
</script>

<template>
  <header class="section-header purchase-header">
    <PurchaseTag />
    <h1>Thank you!</h1>
    <p class="sub-header"><b>Please check your inbox.</b> {{ inboxToday }}</p>
  </header>
</template>

<style scoped>

.purchase-header {
  max-width: 820px;
}

.purchase-header h1 {
  margin-bottom: 1rem;
}

.purchase-header .sub-header {
  margin-bottom: 8px;
  text-wrap: balance;
}

.purchase-header .sub-header b {
  color: #2E7D32;
  font-weight: 600;
}

html.dark .purchase-header .sub-header b {
  color: #A5D6A7;
}

</style>

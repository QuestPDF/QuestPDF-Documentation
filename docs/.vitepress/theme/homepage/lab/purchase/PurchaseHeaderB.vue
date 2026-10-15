<script setup>
/* B · Two-tone headline: the thanks and the inbox note become one title, its second half in green;
   what the email holds drops to one quiet line under it */
import PurchaseTag from "./PurchaseTag.vue";
import { inboxLead } from "./purchase";
</script>

<template>
  <header class="section-header pb-header">
    <PurchaseTag />
    <h1>Thank you! <span class="pb-green">{{ inboxLead }}.</span></h1>
    <p class="pb-line">We have sent your license confirmation PDF and setup instructions.</p>
  </header>
</template>

<style scoped>

.pb-header {
  max-width: 980px;
}

.pb-header h1 {
  margin-bottom: 0.75rem;
  text-wrap: balance;
}

.pb-green {
  color: #2E7D32;
}

html.dark .pb-green {
  color: #A5D6A7;
}

.pb-line {
  margin: 0 0 8px;
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: var(--vp-c-text-2);
}

@media screen and (max-width: 450px) {
  .pb-header h1 {
    font-size: 2rem;
    line-height: 2.5rem;
  }
}

</style>

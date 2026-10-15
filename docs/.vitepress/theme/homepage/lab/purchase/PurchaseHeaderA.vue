<script setup>
/* A · Trimmed stack: today's tag, title and layout; the inbox sentence cut from 21 words to 12 so it
   fits on one line, and the gaps tightened a little */
import PurchaseTag from "./PurchaseTag.vue";
import { inboxLead, inboxShort } from "./purchase";
</script>

<template>
  <header class="section-header pa-header">
    <PurchaseTag />
    <h1>Thank you!</h1>
    <p class="sub-header"><b>{{ inboxLead }}</b> {{ inboxShort }}</p>
  </header>
</template>

<style scoped>

.pa-header {
  max-width: 900px;
}

.pa-header .status-tag {
  margin-bottom: 20px;
}

.pa-header h1 {
  margin-bottom: 0.75rem;
}

.pa-header .sub-header {
  margin-bottom: 8px;
  text-wrap: balance;
}

.pa-header .sub-header b {
  color: #2E7D32;
  font-weight: 600;
}

html.dark .pa-header .sub-header b {
  color: #A5D6A7;
}

</style>

<script setup>
/* D · Title with a status badge: left-aligned with the cards, the green tag sits right after the title
   like a status badge (a merged pull request, a paid invoice), the inbox sentence under both. No dot
   wings: they frame a centred header */
import PurchaseTag from "./PurchaseTag.vue";
import { inboxLead, inboxShort } from "./purchase";
</script>

<template>
  <header class="pd-header">
    <div class="pd-title-row">
      <h1>Thank you!</h1>
      <PurchaseTag />
    </div>
    <p class="pd-line"><b>{{ inboxLead }}</b> {{ inboxShort }}</p>
  </header>
</template>

<style scoped>

.pd-header {
  align-self: stretch;
  padding: 0 4px;
}

.pd-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 20px;
}

.pd-title-row h1 {
  margin: 0;
}

.pd-title-row .status-tag {
  margin-bottom: 0;
}

.pd-line {
  margin: 12px 0 8px;
  font-size: 1.25rem;
  line-height: 2rem;
  color: var(--vp-c-text-2);
}

.pd-line b {
  color: #2E7D32;
  font-weight: 600;
}

html.dark .pd-line b {
  color: #A5D6A7;
}

@media screen and (max-width: 450px) {
  .pd-title-row h1 {
    font-size: 2rem;
    line-height: 2.5rem;
  }

  .pd-line {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
}

</style>

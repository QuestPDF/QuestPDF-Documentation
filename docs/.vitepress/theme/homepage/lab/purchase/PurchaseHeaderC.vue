<script setup>
/* C · Quiet title: no display-size headline. The tag, then one line that thanks, points to the inbox
   (in green) and says what is in it; the cards become the page's main content */
import PurchaseTag from "./PurchaseTag.vue";
import { inboxLead, inboxShort } from "./purchase";
</script>

<template>
  <header class="section-header pc-header">
    <PurchaseTag />
    <h1 class="pc-title">Thank you! <b>{{ inboxLead }}</b> <span>{{ inboxShort }}</span></h1>
  </header>
</template>

<style scoped>

.pc-header {
  max-width: 980px;
}

.pc-header .status-tag {
  margin-bottom: 16px;
}

/* still the page's h1 for screen readers and search, set at the size of a lead */
.pc-title {
  margin: 0 0 8px;
  font-size: 1.5rem;
  line-height: 2.125rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-wrap: balance;
}

.pc-title b {
  font-weight: 600;
  color: #2E7D32;
}

html.dark .pc-title b {
  color: #A5D6A7;
}

.pc-title span {
  font-weight: 400;
  color: var(--vp-c-text-2);
}

@media screen and (max-width: 700px) {
  .pc-title {
    font-size: 1.25rem;
    line-height: 1.875rem;
  }
}

</style>

<script setup>
/* E · One green notice: the title alone on top, then the confirmation and the inbox note merged into
   one green notice with a check, the way an app confirms a finished action. The tag becomes the notice */
import { inboxLead, inboxShort } from "./purchase";
</script>

<template>
  <header class="section-header pe-header">
    <h1>Thank you!</h1>
    <div class="pe-notice" role="status">
      <span class="pe-check" aria-hidden="true"><i class="fa-regular fa-check"></i></span>
      <p><b>Order completed. {{ inboxLead }}</b> {{ inboxShort }}</p>
    </div>
  </header>
</template>

<style scoped>

.pe-header {
  max-width: 980px;
}

.pe-header h1 {
  margin-bottom: 1.25rem;
}

.pe-notice {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 8px;
  padding: 12px 22px 12px 14px;
  border: 1px solid color-mix(in srgb, #43A047 28%, transparent);
  border-radius: 16px;
  background-color: color-mix(in srgb, #43A047 10%, transparent);
}

.pe-check {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #43A047;
  color: #FFF;
  font-size: 15px;
}

html.dark .pe-check {
  background-color: #66BB6A;
  color: #102A12;
}

.pe-notice p {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: var(--vp-c-text-2);
  text-align: left;
}

.pe-notice b {
  font-weight: 600;
  color: #2E7D32;
}

html.dark .pe-notice b {
  color: #A5D6A7;
}

@media screen and (max-width: 700px) {
  .pe-notice {
    align-items: flex-start;
  }
}

</style>

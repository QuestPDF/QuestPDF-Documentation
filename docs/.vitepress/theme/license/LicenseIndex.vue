<script setup lang="ts">

import LicenseContact from "./LicenseContact.vue";
import LicenseDocumentsList from "./LicenseDocumentsList.vue";
import LicenseFaq from "./LicenseFaq.vue";

</script>

<template>
  <div class="custom-page">
    <div v-if="false" class="container reverse-background">
      <div class="content content-center">
        <header class="section-header" style="margin-bottom: 24px;">
          <h1>Understanding your license</h1>
          <p class="sub-header">Most licensing questions have simple answers, so we've written them out plainly below. When you need the precise wording — for your legal team, procurement, or your own peace of mind — the complete documents are linked at the end.</p>
        </header>

        <license-documents-list />
        <license-faq v-if="false" />
      </div>
    </div>

    <div v-if="false" class="container">
      <license-contact />
    </div>

    <div class="container reverse-background">

      <license-documents-list />
    </div>

  </div>
</template>

<style scoped>
.section-header {
  max-width: 750px;
}
</style>
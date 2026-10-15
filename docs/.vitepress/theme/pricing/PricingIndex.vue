<template>
  <div class="custom-page pricing-page textured-page">
    <div class="container texture-dots">
      <pricing-tiers />
    </div>

    <div class="section-divider dotted-divider" aria-hidden="true"></div>

    <div class="container texture-dots">
      <pricing-faq />
    </div>

    <div class="section-divider dotted-divider" aria-hidden="true"></div>

    <div class="container texture-dots">
      <pricing-contact />
    </div>
  </div>
</template>

<script setup lang="ts">

import PricingTiers from "./PricingTiers.vue";
import PricingFaq from "./PricingFaq.vue";
import PricingContact from "./PricingContact.vue";

</script>

<style>

/* Section seams
   The shared dotted divider (CustomPages.css) between the sections, as wide as the content
   column (the page width minus the content's side padding). The sections sit 48px from the seam
   on either side, as on the homepage; the title keeps the usual 64px under the navbar and the
   contact card keeps 64px above the footer. */

.pricing-page .section-divider {
  width: calc(100% - 64px);
  max-width: calc(var(--custom-page-width) - 64px);
  margin: 0 auto;
}

.pricing-page .content {
  padding-top: 48px;
  padding-bottom: 48px;
}

.pricing-page > .container:first-child .content {
  padding-top: 64px;
}

.pricing-page > .container:last-child .content {
  padding-bottom: 64px;
}

@media screen and (max-width: 768px) {
  .pricing-page .section-divider {
    width: calc(100% - 48px);
  }
}

</style>

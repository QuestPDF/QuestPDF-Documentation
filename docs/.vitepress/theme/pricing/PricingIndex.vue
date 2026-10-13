<template>
  <div class="custom-page pricing-page textured-page">
    <div class="container texture-dots">
      <pricing-tiers />
    </div>

    <div class="container texture-dots">
      <pricing-faq />
    </div>

    <div class="container texture-dots">
      <pricing-resellers />
    </div>

    <div class="container">
      <pricing-contact />
    </div>
  </div>
</template>

<script setup lang="ts">

import PricingTiers from "./PricingTiers.vue";
import PricingContact from "./PricingContact.vue";
import PricingResellers from "./PricingResellers.vue";
import PricingFaq from "./PricingFaq.vue";

</script>

<style>

/* Background
   The same continuous canvas as the homepage (see HomePage.vue): the grain tile over soft colour
   washes, painted on <body> so the page, the strip under the navbar and the footer share it.
   Washes sit in page-height percentages: a sky-blue glow top right and a violet glow top left
   behind the title, like the hero; a cyan wash at the foot of the tier cards; a teal wash on the
   left and a tall blue glow on the right along the questions. None sit in the last stretch, so
   the reseller and contact cards and the footer stay calm. */

body:has(.custom-page.pricing-page) {
  background-color: var(--custom-page-bg);
  background-image:
      url("/homepage/grain.png"),
      radial-gradient(ellipse 1400px 700px at 92% 0%, color-mix(in srgb, #2196F3 22%, transparent), transparent 70%),
      radial-gradient(ellipse 800px 450px at 0% 2%, color-mix(in srgb, #5C6BC0 13%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 500px at 100% 24%, color-mix(in srgb, #00BCD4 9%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 900px at 0% 48%, color-mix(in srgb, #26C6DA 8%, transparent), transparent 70%),
      radial-gradient(ellipse 600px 1400px at 100% 66%, color-mix(in srgb, #1E88E5 11%, transparent), transparent 70%);
  background-size: 256px 256px, auto, auto, auto, auto, auto;
  background-repeat: repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
}

html.dark body:has(.custom-page.pricing-page) {
  background-image:
      url("/homepage/grain.png"),
      radial-gradient(ellipse 1400px 700px at 92% 0%, color-mix(in srgb, #2196F3 24%, transparent), transparent 70%),
      radial-gradient(ellipse 800px 450px at 0% 2%, color-mix(in srgb, #5C6BC0 12%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 500px at 100% 24%, color-mix(in srgb, #00ACC1 9%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 900px at 0% 48%, color-mix(in srgb, #26A69A 11%, transparent), transparent 70%),
      radial-gradient(ellipse 600px 1400px at 100% 66%, color-mix(in srgb, #1E88E5 15%, transparent), transparent 70%);
}

</style>

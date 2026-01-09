<template>
  <div class="custom-page home-page">
    <div class="container hero-container">
      <HomePageHero />
    </div>

    <div class="container">
      <HomePageAdoption />
    </div>

    <div class="container reverse-background">
      <HomePageCodeAnimation />

    </div>

    <div class="container">
      <HomePageFeatures />
    </div>

    <div class="container reverse-background">
      <HomePageCodeFocusedApproach />
    </div>

    <div class="container">
      <HomePageCompanion />
    </div>

    <div class="container reverse-background">
      <HomePageOverview />
    </div>

    <div class="container">
      <HomePageMultiplatform />
    </div>

    <div class="container reverse-background">
      <HomePageStandardCompliance />
    </div>

    <div class="container footer-container">
      <HomePageLicense />
    </div>

    <div class="container footer-container">
      <HomePageGettingStarted />
    </div>
  </div>
</template>

<script setup lang="ts">

import HomePageOverview from "./HomePageOverview.vue";
import HomePageGettingStarted from "./HomePageGettingStarted.vue";
import HomePageLicense from "./HomePageLicense.vue";
import HomePageMultiplatform from "./HomePageMultiplatform.vue";
import HomePageCodeFocusedApproach from "./HomePageCodeFocusedApproach.vue";
import HomePageCompanion from "./HomePageCompanion.vue";
import HomePageHero from "./HomePageHero.vue";
import HomePageStandardCompliance from "./HomePageStandardCompliance.vue";
import HomePageAdoption from "./HomePageAdoption.vue";
import HomePageCodeAnimation from "./HomePageCodeAnimation.vue";
import HomePageFeatures from "./HomePageFeatures.vue";

</script>

<style>

.VPNavBar .container {
  max-width: 1152px;
}

.VPNavBar.top .VPNavBarAppearance {
  --vp-c-divider: var(--vp-c-text-3);
  --vp-input-border-color: var(--vp-c-text-3);
}

.VPNavBar.top #local-search {
  display: none !important;
}

.hero-container .action.primary {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))
}

html:not(.dark):has(.home-page) .VPNavBar.home.top {
  .VPNavBarMenuLink *,
  .VPNavBarMenuGroup span.text {
    color: black !important;
  }
}


/* Background */

.hero-container {
  position: relative;
}

.footer-container {
  position: relative;
}


/* Common styles */

.section-tag {
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-2), transparent 70%);
  background-color: color-mix(in srgb, var(--vp-c-brand-2), transparent 90%);
  border-radius: 32px;
  padding: 6px 18px;
  word-spacing: 2px;
  font-size: 0.8125rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--vp-c-brand-1);
  width: fit-content;
  text-transform: uppercase;
}


</style>

<template>
  <div class="custom-page home-page">
    <div class="container hero-container">
      <HomePageHero />
    </div>

    <div class="container reverse-background">
      <HomePageCodeAnimation />
    </div>

    <div class="container reveal-animation">
      <HomePageStatistics />
    </div>

    <div class="container reverse-background reveal-animation">
      <HomePageCodeFocusedApproach />
    </div>

    <div class="container reveal-animation">
      <HomePageCompanion />
    </div>

    <div class="container reverse-background reveal-animation">
      <HomePageFeatures />
    </div>

    <div class="container reveal-animation">
      <HomePageMultiplatform />
    </div>

    <div class="container reverse-background reveal-animation">
      <HomePageDocumentOperations />
    </div>

    <div class="container reveal-animation">
      <HomePageStandardCompliance />
    </div>

    <div class="container reverse-background reveal-animation" style="padding: 128px;">
      <HomePageLicense />
    </div>

    <div class="container reverse-background reveal-animation" style="padding: 128px;">
      Section about data safety
    </div>

    <div class="container footer-container reveal-animation">
      <HomePageGettingStarted />
    </div>
  </div>
</template>

<script setup>

import HomePageFeatures from "./HomePageFeatures.vue";
import HomePageGettingStarted from "./HomePageGettingStarted.vue";
import HomePageStatistics from "./HomePageStatistics.vue";
import HomePageLicense from "./HomePageLicense.vue";
import HomePageMultiplatform from "./HomePageMultiplatform.vue";
import HomePageDocumentOperations from "./HomePageDocumentOperations.vue";
import HomePageCodeFocusedApproach from "./HomePageCodeFocusedApproach.vue";
import HomePageCompanion from "./HomePageCompanion.vue";
import HomePageCodeAnimation from "./HomePageCodeAnimation.vue";
import HomePageHero from "./HomePageHero.vue";
import {onMounted} from "vue";
import HomePageStandardCompliance from "./HomePageStandardCompliance.vue";

/* Reveal animation */

onMounted(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
        for (let entry of entries.filter(x => x.isIntersecting)) {
            entry.target.classList.add('is-visible');
            intersectionObserver.unobserve(entry.target);
        }
    });

    const observableElements = document.querySelectorAll('.reveal-animation > *');
    observableElements.forEach(x => intersectionObserver.observe(x));
})

</script>

<style>

.VPNavBar .container {
  max-width: 1152px;;
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


/* Background */

.home-page {
  margin-top: -64px;
}

.hero-container {
  padding-top: 64px;
  position: relative;
  overflow: hidden;
}

.hero-container {
  border-top: none !important;
}

.footer-container {
  position: relative;
  overflow: hidden;
}

/* Reveal section animation */

.reveal-animation > * {
  opacity: 0;
  transform: translateY(16px) scale(0.95);

  transition: opacity 0.75s ease-out, transform 0.75s ease-out;
  transition-delay: 0.25s;
  will-change: opacity, transform;
}

.reveal-animation > *.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.action.primary {
  border-radius: 12px;
  border-width: 1px;

  background-color: transparent;
  filter: drop-shadow(0 4px 12px rgba(14, 165, 233, 0.25));

  color: #ffffff;
  background: var(--hp-accent-gradient);
  box-shadow: 0 4px 16px rgba(14, 165, 233, 0.2);
}

.section-tag {
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-2), transparent 70%);
  background-color: color-mix(in srgb, var(--vp-c-brand-2), transparent 90%);
  border-radius: 32px;
  padding: 6px 18px;
  font-size: 0.8125rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--vp-c-brand-1);
  width: fit-content;
}

</style>

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
      <HomePageLicense />
    </div>

    <div class="container reverse-background reveal-animation">
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
}

.hero-container {
  background: radial-gradient(circle at 75% 50%, #2979ff60, #0098ff40, #00b4ff20, #00ceff10, #00e5ff08);
  border-top: none !important;
}

@media screen and (max-width: 1440px) {
  .hero-container {
    background: radial-gradient(circle at 80% 50%, #2979ff60, #0098ff40, #00b4ff20, #00ceff10, #00e5ff08);
  }
}

@media screen and (max-width: 768px) {
  .hero-container {
    background: radial-gradient(circle at 85% 50%, #2979ff60, #0098ff40, #00b4ff20, #00ceff10, #00e5ff08);
  }
}

@media screen and (max-width: 600px) {
  .hero-container {
    background: radial-gradient(circle at 50% 200px, #2979ff60, #0098ff40, #00b4ff20, #00ceff10, #00e5ff08);
    border-top: none !important;
  }
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

</style>

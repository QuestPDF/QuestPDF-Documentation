<template>
  <div class="custom-page home-page">
    <div class="container hero-container">
      <HomePageHero @play-code-animation="startCodeAnimation" />
    </div>

    <div v-if="showCodingAnimation" ref="codeAnimationContainer" class="container reverse-background">
      <HomePageCodeAnimation />
    </div>

    <div class="container reverse-background">
      <HomePageCodeFocusedApproach />
    </div>

    <div class="container">
      <HomePageCompanion />
    </div>

    <div class="container reverse-background">
      <HomePageFeatures />
    </div>

    <div class="container">
      <HomePageMultiplatform />
    </div>

    <div class="container reverse-background">
      <HomePageDocumentOperations />
    </div>

    <div class="container">
      <HomePageStandardCompliance />
    </div>

    <div class="container reverse-background" style="overflow: hidden;">
      <HomePageLicense />
    </div>

    <div class="container footer-container">
      <HomePageGettingStarted />
    </div>
  </div>
</template>

<script setup lang="ts">

import HomePageFeatures from "./HomePageFeatures.vue";
import HomePageGettingStarted from "./HomePageGettingStarted.vue";
import HomePageLicense from "./HomePageLicense.vue";
import HomePageMultiplatform from "./HomePageMultiplatform.vue";
import HomePageDocumentOperations from "./HomePageDocumentOperations.vue";
import HomePageCodeFocusedApproach from "./HomePageCodeFocusedApproach.vue";
import HomePageCompanion from "./HomePageCompanion.vue";
import HomePageCodeAnimation from "./HomePageCodeAnimation.vue";
import HomePageHero from "./HomePageHero.vue";
import {nextTick, onMounted, ref} from "vue";
import HomePageStandardCompliance from "./HomePageStandardCompliance.vue";

const showCodingAnimation = ref(false);

const codeAnimationContainer = ref<Element>();

async function startCodeAnimation() {
  if (!window)
    return;

  showCodingAnimation.value = true;
  await nextTick();

  const itemVerticalPosition = codeAnimationContainer.value.getBoundingClientRect().y;

  window.scrollTo({
    top: itemVerticalPosition,
    behavior: "auto"
  });
}

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

hr {
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  margin: 48px 0;
}

</style>

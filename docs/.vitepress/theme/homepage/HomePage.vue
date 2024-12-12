<template>
  <div class="custom-page">
    <div class="container video-container">
      <HomePageDescription />
    </div>

    <div class="container">
      <HomePageStatistics />
    </div>

    <div class="container reverse-background">
      <HomePageCompanion />
    </div>

    <div class="container">
      <HomePageFeatures />
    </div>

    <div class="container reverse-background">
      <HomePageCodeFocusedApproach />
    </div>

    <div class="container">
      <HomePageMultiplatform />
    </div>

    <div class="container reverse-background">
      <HomePageDocumentOperations />
    </div>

    <div class="container">
      <HomePageLicense />
    </div>

    <div class="container reverse-background">
      <HomePageGettingStarted />
    </div>
  </div>
</template>

<script setup>

import HomePageFeatures from "./HomePageFeatures.vue";
import HomePageDescription from "./HomePageDescription.vue";
import HomePageGettingStarted from "./HomePageGettingStarted.vue";
import HomePageStatistics from "./HomePageStatistics.vue";
import HomePageLicense from "./HomePageLicense.vue";
import HomePageMultiplatform from "./HomePageMultiplatform.vue";
import HomePageDocumentOperations from "./HomePageDocumentOperations.vue";
import HomePageCodeFocusedApproach from "./HomePageCodeFocusedApproach.vue";
import HomePageCompanion from "./HomePageCompanion.vue";

</script>

<style>

.video-container {
  background-image: conic-gradient(#F8F8F8 0deg, #DDD 90deg, #2979FF55 135deg, #DDD 180deg, #F8F8F8 270deg, #F8F8F8 360deg);
}

html.dark .video-container {
  background-image: conic-gradient(#222 0deg, #111 90deg, #2979FF33 135deg, #111 180deg, #222 270deg, #222 360deg);
}

</style>

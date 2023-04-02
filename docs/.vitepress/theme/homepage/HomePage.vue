<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <HomePageDescription />
    </div>

    <div class="container">
      <HomePageUsers />
    </div>

    <div class="container reverse-background">
      <HomePageFeatures />
    </div>

    <div class="container">
      <HomePageRecommendation />
    </div>

    <div class="container reverse-background">
      <HomePageGettingStarted />
    </div>
  </div>
</template>

<script setup>

import HomePageFeatures from "./HomePageFeatures.vue";
import HomePageUsers from "./HomePageUsers.vue";
import HomePageDescription from "./HomePageDescription.vue";
import HomePageRecommendation from "./HomePageRecommendation.vue";
import HomePageGettingStarted from "./HomePageGettingStarted.vue";

</script>

<style>

</style>

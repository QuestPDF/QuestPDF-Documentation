<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <HomePageDescription />
    </div>

    <div class="container">
      <HomePageFeatures />
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

</script>

<style>

</style>

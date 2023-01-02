<template>
  <div class="custom-homepage">
    <div class="reverse-background">
      <HomePageDescription />
    </div>

    <HomePageUsers />

    <div class="reverse-background">
      <HomePageFeatures />
    </div>

    <HomePageRecommendation />
  </div>
</template>

<script setup>

import HomePageFeatures from "./HomePageFeatures.vue";
import HomePageUsers from "./HomePageUsers.vue";
import HomePageDescription from "./HomePageDescription.vue";
import HomePageRecommendation from "./HomePageRecommendation.vue";
</script>

<style>

.custom-homepage .container {
  padding: 96px 32px;
  margin: 0 auto;
  max-width: 1216px;
}

.custom-homepage .reverse-background {
  background-color: var(--vp-c-bg-soft);
}

.custom-homepage h2 {
  font-family: var(--vp-font-family-base);
  font-size: 2rem;
  font-weight: 600;
  line-height: 2.5rem;
  margin-bottom: 2rem;
}

.custom-homepage h3 {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.5rem;
  margin: 18px 0 4px 0;
}

.custom-homepage p {
  color: var(--vp-c-text-2);

  line-height: 1.5rem;
  font-size: 1rem;
}

</style>

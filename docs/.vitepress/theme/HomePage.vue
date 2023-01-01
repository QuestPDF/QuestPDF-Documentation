<template>
  <div class="custom-homepage">
    <div class="reverse">
      <HomePageDescription />
    </div>

    <HomePageUsers />

    <div class="reverse">
      <HomePageFeatures />
    </div>

    <HomePageRecommendation />
  </div>
</template>

<script setup>

import HomePageFeatures from "./homepage/HomePageFeatures.vue";
import HomePageUsers from "./homepage/HomePageUsers.vue";
import HomePageDescription from "./homepage/HomePageDescription.vue";
import HomePageRecommendation from "./homepage/HomePageRecommendation.vue";
</script>

<style>

.custom-homepage h2.title {
  font-family: var(--vp-font-family-base);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.5rem;
  margin-bottom: 2rem;
}

.custom-homepage h3.title {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.5rem;
  margin: 18px 0 4px 0;
}

.custom-homepage p.details {
  color: var(--vp-c-text-2);

  line-height: 24px;
  font-size: 1rem;
}

</style>

<style scoped>




.container {
  padding: 96px 0;
  margin: 0 auto;
  max-width: 1152px;
}


.reverse {
  background-color: var(--vp-c-bg-soft);
}

.reverse .card {
  background-color: var(--vp-c-bg);
}



</style>
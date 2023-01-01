<template>
    <div class="container">
      <h2 class="title">Library that truly helps</h2>

      <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 64px;">
        <div class="recommendation" v-for="recommendation of RecommendationsContent" :key="recommendation.author">
          <p class="recommendation--quote">{{ recommendation.quote }}</p>
          <p class="recommendation--author">{{ recommendation.author }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>

import { RecommendationsContent } from './configuration';

</script>

<style scoped>

.recommendation--quote {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
  line-height: 1.5rem;
  margin: 18px 0 4px 0;
}


.recommendation--author {
  color: var(--vp-c-text-1);
  padding-top: 8px;
  line-height: 24px;
  font-size: 1rem;
}

</style>
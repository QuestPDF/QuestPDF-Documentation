<template>
    <div class="container">
      <h2>Library that truly helps</h2>

      <div class="recommendations">
        <div class="recommendation" v-for="recommendation of RecommendationsContent" :key="recommendation.author">
          <p class="quote">{{ recommendation.quote }}</p>
          <p class="author">{{ recommendation.author }}</p>
        </div>
      </div>
    </div>
</template>

<script setup>

import { RecommendationsContent } from './configuration';

</script>

<style scoped>

.recommendations {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 96px;
}

@media screen and (max-width: 700px) {
  .recommendations {
    grid-template-columns: 1fr;
  }
}

.recommendation .quote {
  color: var(--vp-c-text-2);
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
  line-height: 1.5rem;
  margin: 18px 0 4px 0;
}


.recommendation .author {
  color: var(--vp-c-text-1);
  padding-top: 8px;
  line-height: 24px;
  font-size: 1rem;
}

</style>
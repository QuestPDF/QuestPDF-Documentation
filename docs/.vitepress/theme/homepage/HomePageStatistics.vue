<template>
  <div class="statistics">
    <article class="statistic" v-for="statistic in StatisticsContent" :key="statistic.label">
      <img class="icon" :src="statistic.icon" alt="" />
      <span class="value">{{ statistic.value }}</span>
      <span class="label">{{ statistic.label }}</span>
    </article>
  </div>
</template>

<script setup>

import { StatisticsContent } from './configuration';

</script>

<style scoped>

.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 64px;
}

.statistic {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 4px 24px;
}

.statistic img.icon {
  grid-column: 1;
  grid-row: 1 / span 2;

  justify-self: start;
  align-self: start;
  height: 48px;
  width: 48px;
}

.statistic span.value {
  grid-column: 2;
  grid-row: 1;
  margin: 0;

  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
  font-weight: 500;
}

.statistic span.label {
  grid-column: 2;
  grid-row: 2;
  justify-self: start;
  align-self: start;

  color: var(--vp-c-text-2);
  font-size: 1rem;
}

</style>
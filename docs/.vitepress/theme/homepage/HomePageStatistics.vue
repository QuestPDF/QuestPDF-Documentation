<template>
  <div class="statistics">
    <article class="statistic" v-for="statistic in StatisticsContent" :key="statistic.label">
      <img class="icon" :src="statistic.icon" alt="" />

      <div class="title">
        <span class="value">{{ statistic.value }}</span>
        <span class="label">{{ statistic.label }}</span>
      </div>
    </article>
  </div>
</template>

<script setup>

import { StatisticsContent } from './configuration';

</script>

<style scoped>

.statistics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 64px;
}

.statistic {
  display: flex;
  flex-direction: row;
  justify-items: center;
  gap: 24px;
}

.statistic img.icon {
  height: 64px;
  width: 64px;
}

.statistic .title {
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: center;
  gap: 4px;
  margin-bottom: -4px;
}

.statistic span.value {
  margin: 0;

  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.75rem;
  font-weight: 600;
}

.statistic span.label {
  justify-self: start;
  align-self: start;

  color: var(--vp-c-text-2);
  font-size: 1rem;
}

</style>
<template>
  <section class="content">
    <div>
      <div class="section-header">
        <h2>You're in a good company</h2>
        <p class="sub-header">Thousands of teams trust QuestPDF in production</p>
      </div>
    </div>

    <div class="statistics">
      <template v-for="statistic in statistics" :key="statistic.label">
        <a :href="statistic.link" target="_blank">
          <article class="statistic">
            <i class="fa-2xl" :class="[statistic.icon]"></i>

            <div class="title">
              <span class="value">{{ statistic.value }}</span>
              <span class="label">{{ statistic.label }}</span>
            </div>
          </article>
        </a>
      </template>
    </div>
  </section>
</template>

<script setup>

import { statistics } from "../../statistics";

</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.section-header {
  margin: 0;
}

.statistics {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-items: center;
  gap: 128px;
  justify-content: center;
}

.statistic {
  display: flex;
  flex-direction: row;
  justify-items: center;
  gap: 24px;
}

.statistic i.fa-2xl {
  width: 56px;
}

.statistic .title {
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: -4px;
}

.statistic span.value {
  margin: 0;

  color: var(--vp-c-text-1);
  font-size: 1.75rem;
  font-weight: 600;
}

.statistic span.label {
  justify-self: start;
  align-self: start;

  color: var(--vp-c-text-2);
  font-size: 1.2rem;
}

@media screen and (max-width: 700px) {
  .statistic span.value {
    font-size: 1.5rem;
  }

  .statistic span.label {
    font-size: 1rem;
  }
}

</style>

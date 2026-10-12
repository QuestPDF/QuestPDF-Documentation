<template>
  <section class="panel adoption">
    <div class="statistics">
      <template v-for="statistic in statistics" :key="statistic.label">
        <a :href="statistic.link" target="_blank">
          <article class="statistic">
            <i class="fa-2xl fa-duotone" :class="[statistic.icon]"></i>

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

<script setup lang="ts">

import { data as statistics } from "../statistics.data";

</script>

<style scoped>

.adoption {
  display: flex;
  align-items: center;
  justify-content: center;
}

.statistics {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px 64px;
}

.statistic {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.statistic .title {
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: center;
  gap: 4px;
}

.statistic span.value {
  margin: 0;

  color: var(--vp-c-text-1);
  font-size: 1.75rem;
  line-height: 2.25rem;
  font-weight: 600;
}

.statistic span.label {
  justify-self: start;
  align-self: start;

  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.25rem;
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

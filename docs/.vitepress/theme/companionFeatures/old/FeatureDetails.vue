<script setup lang="ts">
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../../Icon.vue";
import type { Feature } from "./features";

/* PROTOTYPE: a feature's body: description, bullets, layout statuses and the warning. The shortcuts are shown by the
   clip, as captions, and listed once, in the sheet at the end of the page. Each option wraps it
   in its own title and frame. Compact keeps the statuses to a row of dots and names. */
defineProps<{
  feature: Feature;
  compact?: boolean;
}>();
</script>

<template>
  <div class="details" :class="{ compact }">
    <p v-for="(paragraph, index) of feature.description" :key="index" class="text">{{ paragraph }}</p>

    <ul v-if="feature.bullets" class="bullets">
      <li v-for="bullet of feature.bullets" :key="bullet">{{ bullet }}</li>
    </ul>

    <ul v-if="feature.statuses" class="statuses" aria-label="Layout status colors">
      <li v-for="status of feature.statuses" :key="status.name">
        <span class="dot" :style="{ backgroundColor: status.color }"></span>
        <span class="status-name">{{ status.name }}</span>
        <span v-if="!compact" class="status-description">{{ status.description }}</span>
      </li>
    </ul>

    <p v-if="feature.warning" class="warning">
      <Icon :icon="faCircleInfo" />
      <span>{{ feature.warning }}</span>
    </p>
  </div>
</template>

<style scoped>

.details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.details > * {
  margin: 0;
}

.text {
  font-size: 1rem;
  line-height: 1.625rem;
  color: var(--vp-c-text-2);
  text-wrap: pretty;
}

.bullets {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0;
  list-style: none;
}

.bullets li {
  position: relative;
  padding-left: 18px;
  color: var(--vp-c-text-2);
}

.bullets li::before {
  content: "";
  position: absolute;
  left: 2px;
  top: 0.625rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: light-dark(#1976D2, var(--vp-c-brand-1));
}


.statuses {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 8px 10px;
  padding: 0;
  list-style: none;
  font-size: 0.875rem;
  line-height: 1.375rem;
}

.statuses li {
  display: contents;
}

.dot {
  width: 10px;
  height: 10px;
  margin-top: 0.375rem;
  border-radius: 50%;
  box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 0%, transparent);
}

.status-name {
  font-weight: 600;
  white-space: nowrap;
  color: var(--vp-c-text-1);
}

/* a column of its own, clear of the names */
.status-description {
  margin-left: 24px;
  color: var(--vp-c-text-2);
}

.compact .statuses {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
}

.compact .statuses li {
  display: flex;
  align-items: center;
  gap: 6px;
}

.compact .dot {
  margin-top: 0;
}

.compact .status-name {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

@container (max-width: 520px) {
  .statuses {
    grid-template-columns: auto 1fr;
  }

  .status-description {
    grid-column: 2;
    margin-left: 0;
    margin-top: -6px;
  }
}


.warning {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-1);
  background-color: color-mix(in srgb, #FF9800 12%, transparent);
}

.warning .icon {
  flex-shrink: 0;
  margin-top: 0.1875rem;
  color: light-dark(#E65100, #FFB74D);
}

</style>

<script setup lang="ts">
import { reasons } from "./agentsDemo";

/* The four reasons as a list. `layout`: a four-column strip, a vertical column or a two-by-two
   grid; `compact` shrinks the icon tile and the type; `short` uses the one-line descriptions. */

withDefaults(defineProps<{ layout?: "strip" | "vertical" | "grid"; compact?: boolean; short?: boolean }>(), {
  layout: "strip",
  compact: false,
  short: false
});
</script>

<template>
  <div class="reasons" :class="[layout, { compact }]">
    <article v-for="reason of reasons" :key="reason.title" class="reason">
      <div class="reason-icon">
        <i class="fa-regular" :class="[reason.icon]"></i>
      </div>
      <div>
        <h3 class="row-title">{{ reason.title }}</h3>
        <p class="row-description">{{ short ? reason.short : reason.text }}</p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.reasons {
  display: grid;
  gap: 32px;
}

.reasons.strip { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.reasons.grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 28px; }
.reasons.vertical { grid-template-columns: minmax(0, 1fr); gap: 16px; }

.reason {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  column-gap: 14px;
  align-items: start;
}

.reason-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
}

.reason-icon i {
  font-size: 1.0625rem;
  color: var(--vp-c-text-1);
}

.reason .row-title { font-size: 1rem; line-height: 1.375rem; }
.reason .row-description { font-size: 0.9375rem; line-height: 1.375rem; }

.compact .reason { grid-template-columns: 32px minmax(0, 1fr); column-gap: 12px; }
.compact .reason-icon { width: 32px; height: 32px; border-radius: 10px; }
.compact .reason-icon i { font-size: 0.9375rem; }
.compact .row-title { font-size: 0.9375rem; line-height: 1.25rem; }
.compact .row-description { font-size: 0.875rem; line-height: 1.25rem; margin-top: 2px; }

@media screen and (max-width: 1100px) {
  .reasons.strip { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
}

@media screen and (max-width: 560px) {
  .reasons.strip, .reasons.grid { grid-template-columns: minmax(0, 1fr); }
}
</style>

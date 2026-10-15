<template>
  <!-- the question rows of one group, exactly as in PricingFaq.vue; the container (the card or a cell
       of it) belongs to the direction -->
  <details
      v-for="(item, index) of items"
      :key="item.question"
      class="faq-item"
      :open="index === openIndex">
    <summary class="faq-question">
      <span>{{ item.question }}</span>
      <i class="fa-solid fa-chevron-down faq-chevron"></i>
    </summary>
    <p class="faq-answer" v-html="item.answer"></p>
  </details>
</template>

<script setup lang="ts">
import type { FaqItem } from "../../../pricing/faq";

defineProps<{ items: FaqItem[]; openIndex?: number }>();
</script>

<style scoped>

.faq-item {
  --faq-accent: #2196F3;

  transition: background-color 0.2s ease;
}

.faq-item:not(:last-child) {
  border-bottom: 1px solid var(--vp-c-divider);
}

.faq-item:hover,
.faq-item[open] {
  background-color: color-mix(in srgb, var(--faq-accent) 5%, transparent);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 24px 32px;
  cursor: pointer;
  list-style: none;

  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.2s ease;
}

.faq-item[open] .faq-question {
  color: var(--faq-accent);
  font-weight: 600;
}

.faq-chevron {
  flex-shrink: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  transition: transform 0.2s ease;
}

.faq-item[open] .faq-chevron {
  color: var(--faq-accent);
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 32px 24px 32px;
  margin: 0;
  max-width: 85ch;
  color: var(--vp-c-text-1);
}

.faq-answer :deep(a) {
  color: var(--vp-c-brand-1);
}

@media screen and (max-width: 700px) {
  .faq-question {
    padding: 24px 20px;
  }

  .faq-answer {
    padding: 0 20px 20px 20px;
  }
}

</style>

<script setup lang="ts">
import faqCategories from "./faq.json";
</script>

<template>
  <article class="faq">
    <div v-for="category of faqCategories" :key="category.category" class="faq-category">

      <div class="faq-list card">
        <h3 class="faq-category-title">{{ category.category }}</h3>

        <details v-for="item of category.items" :key="item.question" class="faq-item">
          <summary class="faq-question">
            <span>{{ item.question }}</span>
            <i class="fa-solid fa-chevron-down faq-chevron"></i>
          </summary>
          <p class="faq-answer">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </article>
</template>

<style scoped>

.faq {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

.faq-category {
  margin-bottom: 32px;
}

.faq-category:last-child {
  margin-bottom: 0;
}

.faq-category-title {
  padding: 0 32px 0;
  margin-bottom: 16px;
  font-size: 1.25rem;
  font-weight: 700;
  color: #2196F3;
}

.faq-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  overflow: hidden;
}

.faq-item {
  padding: 0;
}

.faq-item:hover {
  background-color: #2196F311;
}

.faq-item:not(:last-child) {
  border-bottom: 1px solid var(--vp-c-divider);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 16px 32px;
  cursor: pointer;
  list-style: none;

  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.faq-chevron {
  flex-shrink: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  transition: transform 0.2s ease;
}

.faq-item[open] .faq-chevron {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 32px 24px 32px;
  margin: 0;
}

@media screen and (max-width: 700px) {
  .faq-category-title {
    padding: 0 20px;
  }

  .faq-question {
    padding: 20px;
    font-size: 1rem;
  }

  .faq-answer {
    padding: 0 20px 20px 20px;
  }
}

</style>
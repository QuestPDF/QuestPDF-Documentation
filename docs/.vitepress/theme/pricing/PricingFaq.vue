<script setup lang="ts">
import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";
import Icon from "../Icon.vue";

import { faqCategories as categories } from "./faq";

</script>

<template>
  <article id="faq" class="content">
    <div class="faq-categories">
      <section v-for="category of categories" :key="category.title" class="faq-category">
        <h2 class="faq-category-title">{{ category.title }}</h2>

        <div class="panel faq-list">
          <details v-for="item of category.items" :key="item.question" class="faq-item">
            <summary class="faq-question">
              <span>{{ item.question }}</span>
              <Icon class="faq-chevron" :icon="faChevronDown" />
            </summary>
            <p class="faq-answer" v-html="item.answer"></p>
          </details>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>

.faq-categories {
  --faq-accent: light-dark(#1976D2, #2196F3);

  display: flex;
  flex-direction: column;
  gap: 64px;

  width: 100%;
  max-width: 860px;
  margin: 0 auto;
}

.faq-category {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.faq-category-title {
  margin: 0;
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: center;
}

.faq-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  overflow: hidden;
}

.faq-item:not(:last-child) {
  border-bottom: 1px solid var(--vp-c-divider);
}

/* a shadow, so opening an item does not push its text sideways; positioned to paint above the panel's rim */
.faq-item[open] {
  position: relative;
  box-shadow: inset 4.5px 0 0 var(--faq-accent);
}

html.dark .faq-item[open] {
  box-shadow: inset 3px 0 0 var(--faq-accent);
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
  transition: background-color 0.2s ease;
}

/* a tap leaves :hover stuck on touch screens, which would keep the row tinted */
@media (hover: hover) {
  .faq-question:hover {
    background-color: color-mix(in srgb, var(--faq-accent) 5%, transparent);
  }
}

/* older Safari draws its disclosure triangle through this pseudo-element, whatever the display */
.faq-question::-webkit-details-marker {
  display: none;
}

.faq-item[open] .faq-question {
  color: var(--faq-accent);
  font-weight: 600;
}

.faq-chevron {
  flex-shrink: 0;
  font-size: 1rem;
  color: var(--vp-c-text-2);
  transition: transform 0.2s ease;
}

.faq-item[open] .faq-chevron {
  color: var(--faq-accent);
  transform: rotate(180deg);
}

/* the answers in faq.ts separate their paragraphs with a blank line, which is kept */
.faq-answer {
  padding: 0 32px 24px 32px;
  max-width: 85ch;
  color: var(--vp-c-text-1);
  white-space: pre-line;
}

.faq-answer :deep(a:hover) {
  text-decoration: underline;
}

@media screen and (max-width: 700px) {
  .faq-categories {
    gap: 48px;
  }

  .faq-question {
    padding: 24px 20px;
  }

  .faq-answer {
    padding: 0 20px 20px 20px;
  }
}

</style>

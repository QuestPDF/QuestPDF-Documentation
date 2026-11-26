<script setup lang="ts">
import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
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

/* #faq is a link target: keep the section padding visible under the fixed navbar */
.content {
  scroll-margin-top: var(--vp-nav-height);
}

.faq-categories {
  --accent: light-dark(#1976D2, oklch(0.78 0.10 245));

  display: flex;
  flex-direction: column;
  gap: 80px;

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
  font-weight: 600;
  text-align: center;
  color: var(--accent);
}

/* a ruled list without fills: the lines stay in every state */
.faq-list {
  --pad-x: 36px;

  padding: 0;
}

.faq-item + .faq-item {
  border-top: 1px solid var(--vp-c-divider);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 26px var(--pad-x);
  cursor: pointer;
  list-style: none;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 400;
  color: var(--vp-c-text-1);
}

/* dark text on white reads lighter than light on dark */
html:not(.dark) .faq-question {
  font-weight: 450;
}

/* older Safari draws its disclosure triangle through this pseudo-element, whatever the display */
.faq-question::-webkit-details-marker {
  display: none;
}

/* the ring sits 8px inside the card and follows its corners, as on the legal documents list */
.faq-question:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -10px;
  border-radius: 32px;
}

.faq-chevron {
  flex-shrink: 0;
  font-size: 1rem;
  color: var(--vp-c-text-3);
}

/* an open question keeps the hover colour */
.faq-item[open] .faq-question {
  padding-bottom: 22px;
  font-weight: 600;
  color: var(--accent);
}

.faq-item[open] .faq-chevron {
  color: var(--accent);
  transform: rotate(180deg);
}

@media (hover: hover) {
  .faq-question:hover,
  .faq-question:hover .faq-chevron {
    color: var(--accent);
  }
}

/* the answers in faq.ts separate their paragraphs with a blank line, which is kept */
.faq-answer {
  max-width: calc(68ch + 2 * var(--pad-x));
  padding: 0 var(--pad-x) 32px;
  font-size: 1rem;
  line-height: 1.875rem;
  color: color-mix(in srgb, var(--vp-c-text-1), var(--vp-c-text-2));
  white-space: pre-line;
}

/* the part of an answer that settles the question, marked in faq.ts */
.faq-answer :deep(strong) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* the brand colour is under 4.5:1 in the light theme, and the pages' hover colour is lighter still;
   :any-link outranks that hover rule */
.faq-answer :deep(a:any-link) {
  color: color-mix(in srgb, var(--vp-c-brand-1), var(--vp-c-text-1) 20%);
}

.faq-answer :deep(a:hover) {
  text-decoration: underline;
}

@media screen and (max-width: 700px) {
  .faq-categories {
    gap: 56px;
  }

  .faq-list {
    --pad-x: 20px;
  }

  .faq-question {
    padding-block: 20px;
  }

  .faq-item[open] .faq-question {
    padding-bottom: 16px;
  }

  .faq-answer {
    padding-bottom: 24px;
  }
}

</style>

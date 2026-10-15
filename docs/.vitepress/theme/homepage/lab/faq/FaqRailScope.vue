<template>
  <!-- D1 · Rail with a scope line: round one's per-group rail, filled: the title, one line naming what
       the group covers and the count, sticky beside the group's card -->
  <article class="content faq-rail-scope">
    <div class="section-header">
      <h2>Frequently Asked Questions</h2>
    </div>

    <div class="faq-groups">
      <section v-for="(category, index) of faqCategories" :key="category.title" class="faq-group">
        <div class="faq-rail">
          <h3 class="faq-rail-title">{{ category.title }}</h3>
          <p class="faq-rail-scope-line">{{ groupScopes[category.title] }}</p>
          <span class="faq-rail-count">{{ category.items.length }} questions</span>
        </div>

        <div class="faq-list">
          <faq-questions :items="category.items" :open-index="index === 0 ? 1 : undefined" />
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { faqCategories } from "../../../pricing/faq";
import { groupScopes } from "./faqLab";
import FaqQuestions from "./FaqQuestions.vue";
</script>

<style scoped>

.faq-groups {
  display: flex;
  flex-direction: column;
  gap: 32px;

  width: 100%;
  max-width: 1180px;
  margin: 40px auto 0;
}

.faq-group {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 56px;
}

/* level with the first question's text, and held under the navbar while the group scrolls past */
.faq-rail {
  position: sticky;
  top: calc(var(--vp-nav-height) + 32px);
  align-self: start;
  display: flex;
  flex-direction: column;
  padding-top: 22px;
}

.faq-rail-title {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.faq-rail-scope-line {
  margin: 6px 0 0;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
}

.faq-rail-count {
  margin-top: 10px;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

/* the card keeps its own height when the rail is the taller of the two (Client Work) */
.faq-list {
  align-self: start;
  display: flex;
  flex-direction: column;

  border-radius: 32px;
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge);
  overflow: hidden;
}

/* below 960px the rail stacks above its card, indented to the question text */
@media screen and (max-width: 960px) {
  .faq-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .faq-rail {
    position: static;
    padding: 0 32px;
  }
}

@media screen and (max-width: 700px) {
  .faq-rail {
    padding: 0 20px;
  }
}

</style>

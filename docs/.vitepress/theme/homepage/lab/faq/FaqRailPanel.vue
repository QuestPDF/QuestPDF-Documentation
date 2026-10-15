<template>
  <!-- D3 · Rail inside the panel: each group is one panel split by a hairline, the rail cell (icon
       tile, title, count) on the left and the questions on the right; the cell's content is sticky
       while the panel scrolls past -->
  <article class="content faq-rail-panel">
    <div class="section-header">
      <h2>Frequently Asked Questions</h2>
    </div>

    <div class="faq-groups">
      <section v-for="(category, index) of faqCategories" :key="category.title" class="faq-list faq-panel">
        <div class="faq-cell">
          <div class="faq-cell-inner">
            <div class="faq-icon-tile">
              <i class="fa-regular" :class="groupIcons[category.title]"></i>
            </div>
            <h3 class="faq-cell-title">{{ category.title }}</h3>
            <span class="faq-cell-count">{{ category.items.length }} questions</span>
          </div>
        </div>

        <div class="faq-questions">
          <faq-questions :items="category.items" :open-index="index === 0 ? 1 : undefined" />
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { faqCategories } from "../../../pricing/faq";
import { groupIcons } from "./faqLab";
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

/* the cell's content (20px inset, 40px tile) fits beside two collapsed questions, so the
   shortest group (Client Work) does not grow its panel.
   `overflow: clip` rounds the corners like `hidden` but is not a scroll container, so the cell's
   sticky content still follows the page */
.faq-panel {
  display: grid;
  grid-template-columns: 296px minmax(0, 1fr);

  border-radius: 32px;
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge);
  overflow: clip;
}

.faq-cell {
  border-right: 1px solid var(--vp-c-divider);
  background-color: color-mix(in srgb, var(--home-surface-inner) 35%, transparent);
}

.faq-cell-inner {
  position: sticky;
  top: calc(var(--vp-nav-height) + 12px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 32px;
}

.faq-icon-tile {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
}

.faq-icon-tile i {
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
}

.faq-cell-title {
  margin: 14px 0 0;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.faq-cell-count {
  margin-top: 2px;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.faq-questions {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* below 960px the cell becomes the panel's first row (round one's C) */
@media screen and (max-width: 960px) {
  .faq-panel {
    display: flex;
    flex-direction: column;
  }

  .faq-cell {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .faq-cell-inner {
    position: static;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    column-gap: 16px;
  }

  .faq-icon-tile {
    grid-row: span 2;
  }

  .faq-cell-title {
    margin: 0;
  }

  .faq-cell-count {
    margin: 0;
  }
}

@media screen and (max-width: 700px) {
  .faq-cell-inner {
    padding: 20px;
  }
}

</style>

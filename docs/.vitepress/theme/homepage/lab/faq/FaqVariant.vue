<template>
  <!-- one direction for the pricing FAQ's group headers: the section as it would sit on the pricing
       page (PricingFaq.vue), minus the subheader, with the first `groups` groups and the second question
       of the first group open, so each direction shows the open state next to its header -->
  <article class="content faq-variant" :class="`faq-variant-${variant}`">
    <div class="section-header">
      <h2>Frequently Asked Questions</h2>
    </div>

    <!-- E: every group as a chip under the title, a plain in-page link to the group below -->
    <nav v-if="variant === 'e'" class="faq-index" aria-label="Question topics">
      <a v-for="category of faqCategories" :key="category.title" class="faq-index-link" :href="`#${anchor(category)}`">
        {{ category.title }}<span class="faq-index-count">{{ category.items.length }}</span>
      </a>
    </nav>

    <div class="faq-categories">
      <section
          v-for="(category, categoryIndex) of shown"
          :key="category.title"
          class="faq-category"
          :id="variant === 'e' ? anchor(category) : undefined">

        <div v-if="variant !== 'c'" class="faq-category-head">
          <h3 class="faq-category-title">{{ category.title }}</h3>
          <span v-if="variant === 'b'" class="faq-rule" aria-hidden="true"></span>
          <span v-if="variant === 'b' || variant === 'd'" class="faq-count">{{ category.items.length }} questions</span>
        </div>

        <div class="faq-list">
          <!-- C: the group's title is the card's first row, above the first hairline -->
          <div v-if="variant === 'c'" class="faq-list-head">
            <div class="faq-icon-tile">
              <i class="fa-regular" :class="icons[category.title]"></i>
            </div>
            <h3 class="faq-category-title">{{ category.title }}</h3>
            <span class="faq-count">{{ category.items.length }} questions</span>
          </div>

          <details
              v-for="(item, itemIndex) of category.items"
              :key="item.question"
              class="faq-item"
              :open="categoryIndex === 0 && itemIndex === 1">
            <summary class="faq-question">
              <span>{{ item.question }}</span>
              <i class="fa-solid fa-chevron-down faq-chevron"></i>
            </summary>
            <p class="faq-answer" v-html="item.answer"></p>
          </details>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { faqCategories, type FaqCategory } from "../../../pricing/faq";

const props = withDefaults(defineProps<{ variant: string; groups?: number }>(), { groups: 3 });

const shown = computed(() => faqCategories.slice(0, props.groups));

/* C only: one regular-weight icon per group, in the homepage icon tile */
const icons: Record<string, string> = {
  "Choosing Your License": "fa-signs-post",
  "Professional vs Enterprise": "fa-building",
  "Pricing & Renewals": "fa-arrows-rotate",
  "Deployment & Security": "fa-shield-check",
  "Client Work": "fa-handshake",
  "Purchasing & Legal Review": "fa-file-signature"
};

function anchor(category: FaqCategory) {
  return "faq-" + category.title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
</script>

<style scoped>

/* Shared: today's FAQ (PricingFaq.vue), unchanged */

.faq-categories {
  --faq-accent: #2196F3;

  display: flex;
  flex-direction: column;
  gap: 48px;

  width: 100%;
  max-width: 880px;
  margin: 40px auto 0;
}

.faq-category {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-category-title {
  margin: 0;
}

.faq-category-head {
  padding-left: 32px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  width: 100%;

  border-radius: 32px;
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge);
  overflow: hidden;
}

.faq-item {
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

.faq-count {
  flex-shrink: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

/* 0 · Today: the accent blue */

.faq-variant-0 .faq-category-title {
  color: var(--faq-accent);
}

/* A · Neutral title: today's size and place, in the text colour (near-white in dark, near-black in
   light), so blue is left to what is open or clickable */

.faq-variant-a .faq-category-title,
.faq-variant-e .faq-category-title {
  color: var(--vp-c-text-1);
}

/* B · Eyebrow and rule: the homepage's uppercase label (HomePageTrust.vue), a hairline running to the
   card's right edge and the count above the chevron column */

.faq-variant-b .faq-category-head {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-right: 32px;
}

.faq-variant-b .faq-category-title {
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}

.faq-variant-b .faq-rule {
  flex: 1;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.faq-variant-b .faq-category {
  gap: 12px;
}

/* C · Title inside the card: the group is one panel whose first row is the icon tile, the title and
   the count; consecutive panels sit 32px apart, as cards do elsewhere */

.faq-variant-c .faq-categories {
  gap: 32px;
}

.faq-variant-c .faq-list-head {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 32px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.faq-variant-c .faq-icon-tile {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
}

.faq-variant-c .faq-icon-tile i {
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
}

.faq-variant-c .faq-category-title {
  flex: 1;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

/* D · Side rail: the title and count in a column of their own, level with the first question and
   sticky while the group scrolls past; the column is wider than today's */

.faq-variant-d .faq-categories {
  max-width: 1120px;
  gap: 32px;
}

.faq-variant-d .faq-category {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 48px;
}

.faq-variant-d .faq-category-head {
  position: sticky;
  top: calc(var(--vp-nav-height) + 32px);
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 22px 0 0;
}

.faq-variant-d .faq-category-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

/* E · Jump index: the six groups as chips where the subheader was, each linking to its group; the
   group titles are A's */

.faq-index {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  max-width: 880px;
  margin: 8px auto 0;
}

.faq-index-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 8px 8px 16px;
  border-radius: 999px;
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge), inset 0 0 0 1px var(--vp-c-divider);
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: box-shadow 0.2s ease, color 0.2s ease;
}

.faq-index-link:hover {
  color: var(--faq-accent, #2196F3);
  box-shadow: var(--home-surface-edge), inset 0 0 0 1px color-mix(in srgb, #2196F3 50%, transparent);
}

.faq-index-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background-color: var(--home-surface-inner);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.faq-variant-e .faq-category {
  scroll-margin-top: calc(var(--vp-nav-height) + 32px);
}

@media screen and (max-width: 960px) {
  .faq-variant-d .faq-category {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .faq-variant-d .faq-category-head {
    position: static;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    padding: 0 32px;
  }
}

@media screen and (max-width: 700px) {
  .faq-category-head,
  .faq-variant-d .faq-category-head {
    padding-left: 20px;
  }

  .faq-variant-b .faq-category-head,
  .faq-variant-d .faq-category-head {
    padding-right: 20px;
  }

  .faq-question {
    padding: 24px 20px;
  }

  .faq-answer {
    padding: 0 20px 20px 20px;
  }

  .faq-variant-c .faq-list-head {
    padding: 20px;
  }

  .faq-variant-c .faq-count {
    display: none;
  }
}

</style>

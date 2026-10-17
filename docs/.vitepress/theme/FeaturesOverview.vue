<script setup lang="ts">
import { featureChapters, type FeatureCategory } from "./features";

/* A chapter's categories split into two columns of near-equal height, measured in lines: a title with the gap
   above it counts as three, each feature as one. Every split that keeps the first category top left is tried
   (a chapter has at most six categories), and each column keeps the data order, so the masonry reads the same
   way every time instead of wherever the browser balances it. */
function balance(categories: FeatureCategory[]): FeatureCategory[][] {
  const height = (list: FeatureCategory[]) => list.reduce((sum, category) => sum + 3 + category.features.length, 0);
  const total = height(categories);

  let best = { difference: Infinity, columns: [categories] };

  for (let mask = 1; mask < 1 << categories.length; mask += 2) {
    const left = categories.filter((_, index) => mask & (1 << index));
    const right = categories.filter((_, index) => !(mask & (1 << index)));
    const difference = Math.abs(total - 2 * height(left));

    if (difference < best.difference)
      best = { difference, columns: [left, right] };
  }

  return best.columns.filter(column => column.length > 0);
}

const chapters = featureChapters.map(chapter => ({ ...chapter, columns: balance(chapter.categories) }));
</script>

<template>
  <div class="custom-page features-page texture-dots">
    <div class="content">
      <header class="section-header features-header">
        <h1>Features Overview</h1>
        <p class="sub-header">
          Explore the full capabilities of QuestPDF. A mature, production-ready toolkit designed to handle every aspect of document generation, from versatile layouts to real-time developer tooling.
        </p>
      </header>

      <div class="chapters">
        <section v-for="chapter in chapters" :key="chapter.name" class="panel chapter">
          <h2 class="chapter-title">{{ chapter.name }}</h2>

          <div class="columns">
            <div v-for="(column, index) in chapter.columns" :key="index" class="column">
              <section v-for="category in column" :key="category.name" class="category" :style="{ order: chapter.categories.indexOf(category) }">
                <h3 class="category-title">
                  <i class="fa-regular category-icon" :class="category.icon" aria-hidden="true"></i>
                  {{ category.name }}
                </h3>

                <ul class="features">
                  <li v-for="feature in category.features" :key="feature.link">
                    <a :href="feature.link" class="feature">{{ feature.name }}</a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>

.features-header {
  margin-bottom: 48px; /* the same 48px as on the contact page */
}

.features-header .sub-header {
  max-width: 750px;
  margin-bottom: 0;
}


/* one card per chapter, about the width of a document page: its name over a hairline, then its categories in
   two balanced columns (see balance above) */

.chapters {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.chapter {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.chapter-title {
  margin: 0 0 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 1.375rem;
  line-height: 1.75rem;
}

.columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 48px 64px;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

/* one column on a phone: the column wrappers step aside and every category takes its data order again */
@media screen and (max-width: 560px) {
  .columns {
    grid-template-columns: minmax(0, 1fr);
  }

  .column {
    display: contents;
  }
}


/* a category: its icon on an inset tile and its name, then every feature as a plain link */

.category-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 12px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.category-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background-color: var(--surface-inner);
  font-size: 1rem;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
}

/* a feature reads as plain text until pointed at: then it darkens and underlines */
.feature {
  display: inline-block;
  padding: 3px 0;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
  text-decoration: underline transparent;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: color 0.2s, text-decoration-color 0.2s;
}

.feature:hover {
  color: var(--vp-c-text-1);
  text-decoration-color: currentColor;
}

.feature:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
  border-radius: 3px;
}

/* touch: each link a 44px row */
@media (pointer: coarse) {
  .feature {
    padding: 8px 0;
  }
}

</style>

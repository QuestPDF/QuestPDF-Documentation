<script setup lang="ts">
import Icon from "./Icon.vue";
import { featureChapters } from "./features";
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
        <template v-for="chapter in featureChapters" :key="chapter.name">
          <div class="dotted-divider"></div>

          <section class="chapter">
            <h2 class="chapter-title">{{ chapter.name }}</h2>

            <section v-for="category in chapter.categories" :key="category.name" class="panel category">
              <h3 class="category-title">{{ category.name }}</h3>

              <div class="features">
                <a v-for="feature in category.features" :key="feature.link" :href="feature.link" class="feature">
                  <span class="icon-tile">
                    <Icon :icon="feature.icon" />
                  </span>

                  <span class="feature-text">
                    <strong class="row-title">{{ feature.name }}</strong>
                    <span class="row-description">{{ feature.description }}</span>
                  </span>
                </a>
              </div>
            </section>
          </section>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* the first chapter's divider follows at the same distance as the ones between chapters */
.features-header {
  margin-bottom: 32px;
}

.features-header .sub-header {
  max-width: 750px;
  margin-bottom: 0;
}


.chapters {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.chapter,
.chapters .dotted-divider {
  width: 100%;
  max-width: 1040px;
  margin-inline: auto;
}

.chapter {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.chapter-title {
  margin: 0 0 8px;
  text-align: center;
}

.category-title {
  margin: 0 0 28px;
}

.features {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px 48px;
}

@media screen and (max-width: 760px) {
  .features {
    grid-template-columns: minmax(0, 1fr);
  }
}


/* the whole row is the link; it pads outwards into the grid gap, so the hover surface wraps the row without moving it */

.feature {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin: -12px;
  padding: 12px;
  color: inherit;
  border-radius: 16px;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.feature:is(:hover, :focus-visible) {
  background-color: color-mix(in srgb, #2196F3 8%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, #2196F3 35%, transparent);
}

.feature:focus-visible {
  outline: none;
}

.feature .icon-tile {
  transition: background-color 0.2s;
}

.feature .icon-tile .icon {
  transition: color 0.2s;
}

.feature:is(:hover, :focus-visible) .icon-tile {
  background-color: color-mix(in srgb, #2196F3 16%, transparent);
}

.feature:is(:hover, :focus-visible) .icon-tile .icon {
  color: light-dark(#1976D2, #64B5F6);
}

.feature:is(:hover, :focus-visible) .row-title {
  color: var(--vp-c-brand-1);
}

.feature-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding-top: 2px;
}

.feature .row-title {
  display: block;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  transition: color 0.2s;
}

.feature .row-description {
  display: block;
  margin-top: 4px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

</style>

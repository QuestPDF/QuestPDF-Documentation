<script setup lang="ts">
import { featureCategories as categories } from "./features";
</script>

<template>
  <div class="custom-page features-page">
    <div class="container texture-dots">
      <div class="content">

        <header class="section-header features-header">
          <h1>Features Overview</h1>
          <p class="sub-header">
            Explore the full capabilities of QuestPDF. A mature, production-ready toolkit designed to handle every aspect of document generation, from versatile layouts to real-time developer tooling.
          </p>
        </header>

        <section v-for="category in categories" :key="category.name" class="panel category">
          <header class="category-header">
            <h2 class="card-title">{{ category.name }}</h2>
            <p class="card-description">{{ category.description }}</p>
          </header>

          <!-- the summary is only transparent until the row is hovered, so screen readers read it either way -->
          <ul class="feature-list">
            <li v-for="item in category.items" :key="item.name">
              <component :is="item.link ? 'a' : 'div'" :href="item.link" class="feature-row">
                <i class="feature-icon fa-regular" :class="item.icon" aria-hidden="true" />
                <span class="feature-name">{{ item.name }}</span>
                <span class="feature-summary">{{ item.summary }}</span>
                <i v-if="item.link" class="feature-arrow fa-regular fa-arrow-right" aria-hidden="true" />
              </component>

              <ul v-if="item.children">
                <li v-for="child in item.children" :key="child.name" class="feature-child">
                  <a :href="child.link" class="feature-row child">
                    <span class="feature-name">{{ child.name }}</span>
                    <span class="feature-summary">{{ child.summary }}</span>
                    <i class="feature-arrow fa-regular fa-arrow-right" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </section>

      </div>
    </div>
  </div>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.features-header {
  margin-bottom: 16px; /* with the 32px gap, the same 48px as on the contact page */
}

.features-header .sub-header {
  max-width: 750px;
  margin-bottom: 0;
}


.category {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 960px; /* a one-line row reads best at about the width of a document page */
  margin: 0 auto;
  padding: 48px;
}

/* the list is pulled out by the rows' own 8px inset, so at rest the icons line up with the category
   title above and only the hover background reaches into the panel's margin */
.feature-list {
  margin: 0 -8px;
}

@media screen and (max-width: 700px) {
  .category {
    padding: 32px 16px;
    gap: 24px;
  }

  .category-header {
    padding: 0 8px;
  }

  /* the panel's 16px inset leaves room for only 4px of overhang: the icons still meet the title at 24px */
  .feature-list {
    margin: 0 -4px;
  }
}


.feature-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 6px 8px;
  border-radius: 12px;
  color: var(--vp-c-text-1);
}

/* only a row with a page of its own is a link */
a.feature-row:hover,
a.feature-row:focus-visible {
  background-color: var(--surface-inner);
}

.feature-row:focus-visible {
  outline: 2px solid #2196F3;
  outline-offset: -2px;
}

.feature-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 1rem;
  border-radius: 8px;

  color: var(--vp-c-text-1);
  background-color: var(--surface-inner);
}

a.feature-row:hover .feature-icon {
  color: #2196F3;
  background-color: #2196F322;
}

.feature-name {
  flex-shrink: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
}

a.feature-row:hover .feature-name {
  color: #2196F3;
}

.feature-summary {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

/* with a pointer, a row shows its summary only while hovered or focused, so the list reads as a calm column
   of names */
@media (hover: hover) and (min-width: 1025px) {
  .feature-summary {
    opacity: 0;
  }

  .feature-row:hover .feature-summary,
  .feature-row:focus-visible .feature-summary {
    opacity: 1;
  }
}

.feature-arrow {
  flex-shrink: 0;
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  opacity: 0;
}

.feature-row:hover .feature-arrow,
.feature-row:focus-visible .feature-arrow {
  opacity: 1;
}


/* a sub-page of the feature above, hung on a tree line instead of carrying an icon */

.feature-row.child {
  min-height: 36px;
  padding-left: 48px;
}

.feature-row.child .feature-name {
  font-weight: 500;
}

.feature-row.child::before,
.feature-row.child::after {
  content: "";
  position: absolute;
  left: 23px;
  border-left: 1px solid var(--vp-c-divider);
}

.feature-row.child::before {
  top: -6px;
  bottom: calc(100% - 18px);
  width: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  border-bottom-left-radius: 6px;
}

.feature-child:not(:last-child) .feature-row.child::after {
  top: 18px;
  bottom: -6px;
}


/* narrower windows: the summary wraps under the name and the hover arrow goes */

@media screen and (max-width: 1024px) {
  .feature-row {
    flex-wrap: wrap;
    row-gap: 0;
    padding: 8px;
  }

  .feature-summary {
    width: 100%;
    padding-left: 44px;
    white-space: normal;
  }

  .feature-row.child {
    padding-left: 36px;
  }

  .feature-row.child .feature-summary {
    padding-left: 0;
  }

  .feature-row.child::before,
  .feature-row.child::after {
    left: 16px;
  }

  .feature-arrow {
    display: none;
  }
}

</style>

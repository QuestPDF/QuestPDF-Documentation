<template>
  <!-- C2 · Contact sheet: C's crops in one card. A header band across the top (title and lead left,
       calls to action right), then the four capabilities as one row of cells divided by hairlines,
       each opening on its crop edge to edge with the name and the explanation under it.
       2x2 below 1300px, so the text inside the crops stays legible; one column on phones. -->
  <section class="content">
    <div class="panel c2-panel">
      <div class="c2-header">
        <div>
          <h2 class="card-title">{{ title }}</h2>
          <p class="card-description">{{ description }}</p>
        </div>
        <CompanionActions layout="stack" menu-end class="c2-actions" />
      </div>

      <ul class="c2-cells" aria-label="What the Companion App does">
        <li v-for="cell of cells" :key="cell.capability.key" class="c2-cell">
          <div class="c2-frame">
            <CompanionCrop v-bind="cell.crop" />
          </div>
          <div class="c2-caption">
            <strong><i class="fa-regular" :class="cell.capability.icon" aria-hidden="true"></i>{{ cell.capability.title }}</strong>
            <p>{{ cell.capability.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import CompanionActions from "./CompanionActions.vue";
import CompanionCrop from "./CompanionCrop.vue";
import { capabilities, description, title } from "./companion";

const [reload, hierarchy, measure, debug] = capabilities;

/* crops: x, y = top-left corner, w = visible width, all as fractions of the screenshot */
const cells = [
  { capability: reload, crop: { name: "application", x: 0.43, y: 0.085, w: 0.34, aspect: 1.3 } },
  { capability: hierarchy, crop: { name: "selection", x: 0, y: 0.27, w: 0.34, aspect: 1.3 } },
  { capability: measure, crop: { name: "measurement-vertical", x: 0.37, y: 0.1, w: 0.34, aspect: 1.3 } },
  { capability: debug, crop: { name: "layout-error", x: 0, y: 0.056, w: 0.38, aspect: 1.3 } }
];
</script>

<style scoped>

/* the cells run to the panel's edges, so the panel keeps its padding only in the header band */
.custom-page.home-page .c2-panel {
  width: 100%;
  padding: 0;
  overflow: hidden;
}

.c2-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px 64px;
  padding: 48px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.c2-header > div:first-child {
  max-width: 620px;
}

.c2-actions {
  flex-shrink: 0;
  align-items: flex-end !important;
}

.c2-cells {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}

.c2-cell {
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--vp-c-divider);
}

.c2-cell:first-child {
  border-left: 0;
}

/* the crop fills the cell's width; a hairline separates it from the caption */
.c2-frame {
  border-bottom: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

/* hovering a cell leans into its crop a little */
.c2-frame :deep(.companion-crop) {
  transition: transform 0.5s ease;
  transform-origin: 30% 30%;
}

.c2-cell:hover .c2-frame :deep(.companion-crop) {
  transform: scale(1.025);
}

.c2-caption {
  padding: 28px 32px 36px;
}

.c2-caption strong {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.c2-caption i {
  font-size: 16px;
  color: var(--vp-c-brand-1);
}

.c2-caption p {
  margin: 6px 0 0;
}

@media (prefers-reduced-motion: reduce) {
  .c2-cell:hover .c2-frame :deep(.companion-crop) {
    transform: none;
  }
}

@media screen and (max-width: 1300px) {
  .c2-cells {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .c2-cell:nth-child(odd) {
    border-left: 0;
  }

  .c2-cell:nth-child(n + 3) {
    border-top: 1px solid var(--vp-c-divider);
  }
}

@media screen and (max-width: 760px) {
  .c2-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 32px 24px;
  }

  .c2-actions {
    align-items: flex-start !important;
  }

  .c2-cells {
    grid-template-columns: minmax(0, 1fr);
  }

  .c2-cell {
    border-left: 0;
  }

  .c2-cell:nth-child(n + 2) {
    border-top: 1px solid var(--vp-c-divider);
  }

  .c2-caption {
    padding: 24px 24px 28px;
  }
}

</style>

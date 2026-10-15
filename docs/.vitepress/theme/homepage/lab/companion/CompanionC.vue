<template>
  <!-- C · Bento: no single panel. An intro card with the calls to action, and one card per capability,
       each opening on the part of the app that does it: a crop of a real screenshot, zoomed until the
       text in it is legible. Hot reload, the headline feature, gets the wide card. -->
  <section class="content">
    <div class="c-grid">
      <article class="card c-intro">
        <h2 class="card-title">{{ title }}</h2>
        <p class="card-description">{{ description }}</p>
        <CompanionActions layout="stack" class="c-actions" />
      </article>

      <article v-for="tile of tiles" :key="tile.capability.key" class="card c-tile" :class="`c-${tile.capability.key}`">
        <div class="c-well">
          <CompanionCrop v-bind="tile.crop" />
          <span v-if="tile.capability.key === 'reload'" class="c-sweep" aria-hidden="true"></span>
        </div>
        <h3 class="row-title"><i class="fa-regular" :class="tile.capability.icon" aria-hidden="true"></i>{{ tile.capability.title }}</h3>
        <p class="row-description">{{ tile.capability.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import CompanionActions from "./CompanionActions.vue";
import CompanionCrop from "./CompanionCrop.vue";
import { capabilities, description, title } from "./companion";

const [reload, hierarchy, measure, debug] = capabilities;

/* crops: x, y = top-left corner, w = visible width, all as fractions of the screenshot */
const tiles = [
  { capability: reload, crop: { name: "application", x: 0.405, y: 0.075, w: 0.575, aspect: 3 } },
  { capability: hierarchy, crop: { name: "selection", x: 0, y: 0.285, w: 0.34, aspect: 2 } },
  { capability: measure, crop: { name: "measurement-vertical", x: 0.375, y: 0.1, w: 0.36, aspect: 2 } },
  { capability: debug, crop: { name: "layout-error", x: 0, y: 0.056, w: 0.4, aspect: 2 } }
];
</script>

<style scoped>

.c-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 24px;
  width: 100%;
}

.custom-page.textured-page .c-grid .card {
  display: flex;
  flex-direction: column;
  align-items: stretch; /* the shared .card aligns its children to the start, the wells need the full width */
  padding: 32px;
  border-radius: 28px;
}

.c-intro {
  grid-column: span 5;
}

.c-reload {
  grid-column: span 7;
}

.c-hierarchy,
.c-measure,
.c-debug {
  grid-column: span 4;
}

/* the calls to action sit at the foot of the intro card */
.c-actions {
  margin-top: auto;
  padding-top: 32px;
}

/* the well: an inset window onto the app */
.c-well {
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
  border-radius: 14px;
  background-color: var(--home-surface-inner);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 8%, transparent);
}

.c-well :deep(.companion-crop) {
  border-radius: inherit;
}

html.dark .c-well {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

/* the hairline sits over the crop */
.c-well::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 9%, transparent);
  pointer-events: none;
}

.c-tile .row-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.c-tile .row-title i {
  font-size: 16px;
  color: var(--vp-c-brand-1);
}

/* hot reload: on hover a faint band passes down the page, the preview refreshing */
.c-sweep {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--vp-c-brand-1) 16%, transparent) 45%, color-mix(in srgb, var(--vp-c-brand-1) 22%, transparent) 50%, transparent 52%);
  background-size: 100% 200%;
  background-position: 0 100%;
  opacity: 0;
}

.c-reload:hover .c-sweep {
  animation: c-refresh 1.1s ease-in-out;
}

@keyframes c-refresh {
  0% { opacity: 1; background-position: 0 100%; }
  85% { opacity: 1; background-position: 0 -10%; }
  100% { opacity: 0; background-position: 0 -10%; }
}

@media (prefers-reduced-motion: reduce) {
  .c-reload:hover .c-sweep {
    animation: none;
  }
}

@media screen and (max-width: 1100px) {
  .c-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .c-intro {
    grid-column: 1 / -1;
  }

  .c-reload,
  .c-hierarchy,
  .c-measure,
  .c-debug {
    grid-column: span 1;
  }

  .c-reload .c-well :deep(.companion-crop) {
    aspect-ratio: 2 !important;
  }
}

@media screen and (max-width: 640px) {
  .c-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .custom-page.textured-page .c-grid .card {
    padding: 24px;
  }
}

</style>

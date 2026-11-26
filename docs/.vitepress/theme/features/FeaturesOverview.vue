<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import Icon from "../Icon.vue";
import { useDotWings } from "../dotWings";
import FeatureTreeNode from "./FeatureTreeNode.vue";
import IndexFilter from "./IndexFilter.vue";
import { useFeaturePath } from "./featurePath";
import { featureTree } from "./featureTree";
import { Marked, slugOf, useTreeFilter } from "./treeFilter";

/* The library's features as one open tree per area: names only, each a link to where the documentation describes
   it. While the tree scrolls, a line under the navbar names the place: Text › Style › Text style. A page of its own,
   like Pricing: no documentation menu beside it. */
const { query, finding, visible, matches, openFirst } = useTreeFilter(featureTree);

const summary = computed(() => finding.value ? `${matches.value} ${matches.value === 1 ? "match" : "matches"}` : "");

const path = useFeaturePath(useTemplateRef("root"), visible);

const page = ref<HTMLElement>();
useDotWings(page);
</script>

<template>
  <div ref="page" class="custom-page features-page texture-dots">
    <div class="content">
      <header class="section-header with-lead">
        <h1>Features Overview</h1>
        <p class="sub-header">Precise typography, flexible layouts, rich visual content and fine control over every page. Everything you need to build professional documents.</p>
      </header>

      <div ref="root" class="features-overview">
        <IndexFilter v-model="query" :summary="summary" @open="openFirst" />

        <section v-for="area in visible" :key="area.name">
          <div class="path-anchor" aria-hidden="true">
            <div class="path-line" :class="{ 'is-shown': path[0] === area }">
              <template v-if="path[0] === area">
                <Icon :icon="area.icon" class="path-icon" />
                <template v-for="(node, index) in path" :key="index">
                  <span v-if="index" class="path-step">›</span>
                  <span class="path-name" :class="{ 'is-area': !index }">{{ node.name }}</span>
                </template>
              </template>
            </div>
          </div>

          <h2 :id="slugOf(area.name)" class="area" tabindex="-1">
            <Icon :icon="area.icon" class="area-icon" />
            <span><Marked :text="area.name" /></span>
            <a class="header-anchor" :href="`#${slugOf(area.name)}`" :aria-label="`Permalink to ${area.name}`">&#8203;</a>
          </h2>

          <ul>
            <FeatureTreeNode v-for="node in area.items" :key="node.name" :node="node" :depth="1" />
          </ul>
        </section>

        <p v-if="!visible.length" class="no-match">Nothing matches “{{ query }}”. Try a shorter word.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.features-page {
  --dots-clear: 888px; /* the column and 100px of air on each side */
}

.features-page p.sub-header {
  margin-bottom: 2.5rem;
}

/* the column of a documentation article */
.features-overview {
  margin: 0 auto;
  max-width: 43rem;

  /* what stays at the top of the window while the page scrolls: the navbar, and on narrow screens, where the navbar
     scrolls away, the 48px "Return to top" bar */
  --bar: 48px;

  /* how far a level stands right of the one above, and where under the upper name its trunk runs: the first level
     starts under its area's name, on a trunk under the middle of the area's icon */
  --step: 36px;
  --stem: 11.5px;
  --row: 6px;
  --branch: var(--doc-line-strong);

  /* the areas' icons: the blue of the Companion page's shortcut sheet */
  --area-tint: light-dark(#1976D2, var(--vp-c-brand-1));
}

@media (min-width: 60rem) {
  .features-overview {
    --bar: var(--vp-nav-height);
  }
}

.features-overview h2.area {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px; /* with the 24px icon, one --step: keep the two in sync so the name lines up with the first level */
  margin: 48px 0 6px;
  font-size: 1.375rem;
  line-height: calc(4 / 3);
  scroll-margin-top: calc(var(--bar) + 1.5rem); /* a jump to the area lands its heading below where the line takes over */
  outline: none; /* a jump to the area gives its heading the focus */
}

/* the permalink sign in the margin, as beside a documentation heading */
.area .header-anchor {
  position: absolute;
  inset-inline-start: 0;
  margin-inline-start: -0.87em;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  opacity: 0;
  user-select: none;
}

.area .header-anchor::before {
  content: var(--vp-header-anchor-symbol);
}

.area:hover .header-anchor,
.area .header-anchor:focus {
  opacity: 1;
}

.area-icon {
  flex: none;
  font-size: 1.5rem;
  color: var(--area-tint);
}

/* the filter's words in the names: Marked (treeFilter.ts) renders the marks without a scope id */
.features-overview :deep(mark) {
  border-radius: 3px;
  padding: 1px 0;
  color: inherit;
  background-color: color-mix(in srgb, #2196F3 22%, transparent);
  box-decoration-break: clone;
}

.no-match {
  margin: 32px 0;
}


/* Path line: stays under the navbar and takes no room in the page. Each area has its own, kept inside the area by
   position: sticky, so the end of the area carries it away under the navbar. The anchor is the line's bottom edge. */

.path-anchor {
  position: sticky;
  top: calc(var(--bar) + 56px);
  z-index: 4;
  height: 0;
}

.path-line {
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  visibility: hidden;
  height: 56px;
  border-bottom: 1px solid var(--doc-line);
  font-size: 1rem;
  line-height: 1.5rem;
  white-space: nowrap;
  color: var(--vp-c-text-1);
}

/* the cover over the rows passing under the line. Near the top of the page it lies on the canvas glow, so it runs on
   past the column and fades out: no edge shows against the glow */
.path-line::before {
  --overhang: var(--custom-page-gutter);
  content: "";
  position: absolute;
  inset: 0 calc(-1 * var(--overhang));
  z-index: -1;
  background-image: linear-gradient(to right, transparent, var(--custom-page-bg) var(--overhang), var(--custom-page-bg) calc(100% - var(--overhang)), transparent);
}

@media (min-width: 60rem) {
  .path-line::before {
    --overhang: 96px;
  }
}

.path-line.is-shown {
  visibility: visible;
}

/* as wide as the heading's icon and gap, so the area's name stays above the first level's names */
.path-icon {
  flex: none;
  margin-inline-end: 4px;
  font-size: 1.5rem;
  color: var(--area-tint);
}

/* on a narrow screen the names in the middle give way first: the last one says where the reader is */
.path-name {
  flex-shrink: 100;
  overflow: hidden;
  min-width: 2em;
  text-overflow: ellipsis;
}

.path-name:last-child {
  flex-shrink: 1;
  min-width: 0;
}

.path-name.is-area {
  flex: none;
  font-weight: 600;
  color: var(--doc-menu-strong);
}

.path-step {
  flex: none;
  color: var(--vp-c-text-3);
}
</style>

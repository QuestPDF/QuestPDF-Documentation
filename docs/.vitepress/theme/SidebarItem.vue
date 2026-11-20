<script setup lang="ts">
import { computed, ref, useTemplateRef, watch, watchPostEffect } from "vue";
import { useRoute } from "vitepress";
import { VPLink } from "vitepress/theme";
import { useSidebarControl } from "vitepress/dist/client/theme-default/composables/sidebar.js";
import Icon from "./Icon.vue";
import { sidebarChapter, splitLink } from "./sidebarChapter";
import type { SidebarItem } from "./themeConfig";

/* One entry of the documentation menu: a section (top level, with an icon and a fold button), a sub-section (a label
   over its pages) or a link to a page or to a chapter of one ("/page#chapter"). It takes the place of VitePress's
   VPSidebarItem through the alias in config.ts. */
const { item, depth } = defineProps<{ item: SidebarItem; depth: number }>();

const route = useRoute();
const page = computed(() => `/${route.data.relativePath.replace(/\.md$/, "")}`);

const holdsPage = (entry: SidebarItem): boolean =>
    splitLink(entry.link).path === page.value || !!entry.items?.some(holdsPage);

/* on a page whose chapters are listed, the current entry is the chapter being read; the page's own entry is current
   above the first of them */
function isAt(entry: SidebarItem) {
  const { path, chapter } = splitLink(entry.link);
  return path === page.value && chapter === sidebarChapter.value;
}

const holdsCurrent = (entry: SidebarItem): boolean => isAt(entry) || !!entry.items?.some(holdsCurrent);

const isCurrent = computed(() => isAt(item));
const hasCurrent = computed(() => holdsCurrent(item));
const hasItems = computed(() => !!item.items?.length);
const foldable = computed(() => item.collapsed != null && hasItems.value);
const kind = computed(() => depth === 0 ? "is-section" : hasItems.value ? "is-subsection" : "is-page");

/* a folding section is open on the pages it holds and in its configured state on every other page; its button
   overrides that until the next page */
const collapsed = ref(false);
watch(page, () => collapsed.value = !!item.collapsed && !holdsPage(item), { immediate: true });

function toggle() {
  if (foldable.value)
    collapsed.value = !collapsed.value;
}

/* the menu follows the reader: the current entry is brought into view when the page opens and whenever it changes,
   as it does while reading down a page whose chapters are listed */
const row = useTemplateRef("row");

watchPostEffect(() => {
  if (isCurrent.value)
    row.value?.scrollIntoView({ block: "nearest" });
});

/* on phones the menu is a drawer over the page; VitePress closes it when the page changes, which a link to a chapter
   of the page being read does not do */
const { close: closeDrawer } = useSidebarControl();
</script>

<template>
  <component
      :is="hasItems ? 'section' : 'div'"
      class="sidebar-item"
      :class="[kind, { 'is-collapsed': collapsed, 'is-current': isCurrent, 'has-current': hasCurrent }]">
    <div ref="row" class="row" @click="!item.link && toggle()">
      <VPLink
          v-if="item.link"
          class="page-link"
          no-icon
          :href="item.link"
          :rel="item.rel"
          :target="item.target"
          :aria-current="isCurrent ? 'page' : undefined"
          @click="closeDrawer">
        <span class="marker" />
        <p class="text"><bdi v-html="item.text" /></p>
      </VPLink>

      <template v-else>
        <Icon v-if="item.icon" class="section-icon" :icon="item.icon" />
        <component :is="`h${Math.min(depth + 2, 6)}`" class="text"><bdi v-html="item.text" /></component>
      </template>

      <button
          v-if="foldable"
          type="button"
          class="caret"
          aria-label="toggle section"
          :aria-expanded="!collapsed"
          @click.stop="toggle">
        <span class="vpi-chevron-right caret-icon" />
      </button>
    </div>

    <ul v-if="hasItems" class="items">
      <li v-for="child in item.items" :key="child.link ?? child.text">
        <SidebarItem :item="child" :depth="depth + 1" />
      </li>
    </ul>
  </component>
</template>

<style scoped>
.row {
  position: relative;
  display: flex;
  /* an entry scrolled into view stays clear of the navbar over the top of the menu, with two entries around it */
  scroll-margin-block: calc(var(--vp-nav-height) + 4rem) 4rem;
}

.text {
  flex-grow: 1;
  padding: 0.25rem 0;
  font-size: 0.875rem;
  line-height: 1.7142857;
  /* a little air between letters and words: Inter sets tight at 14px */
  letter-spacing: 0.015em;
  word-spacing: 0.1em;
  transition: color 0.25s;
}


/* Sections */

.is-section {
  padding-bottom: 10px;
}

.is-section > .row {
  align-items: center;
  gap: 10px;
  min-height: 36px;
  margin-inline: -12px;
  padding-inline: 12px 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
}

.is-section > .row:hover {
  background-color: var(--doc-hover);
}

.section-icon {
  flex: none;
  width: 1.25rem;
  height: 1.25rem;
  margin-inline-end: 2px;
  color: var(--doc-menu-strong);
}

/* section names look the same whether or not the section holds the current page */
.is-section > .row .text {
  padding: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.25rem;
  letter-spacing: 0.03em;
  color: var(--doc-menu-strong);
  text-transform: uppercase;
}

.caret {
  display: flex;
  flex: none;
  justify-content: center;
  align-items: center;
  width: 1rem;
  height: 1rem;
  color: var(--vp-c-text-3);
  cursor: pointer;
}

.caret-icon {
  font-size: 1rem;
  transform: rotate(90deg);
}

.is-collapsed > .row .caret-icon {
  transform: none;
}


/* Lists of pages: on a guide line, every level indented by the same step */

.items {
  --indent: 22px;
  border-inline-start: 1px solid var(--doc-line);
  padding-inline-start: var(--indent);
}

/* a section's line runs under the middle of its icon */
.is-section > .items {
  margin: 2px 0 10px 9px;
}

.is-collapsed > .items {
  display: none;
}


/* Sub-section names: always bright, so they read as labels among the links; heavier on the current path */

.is-subsection > .row .text {
  font-weight: 400;
  color: var(--doc-menu-strong);
}

.is-subsection.has-current > .row .text {
  font-weight: 500;
}


/* Page links; the current page is a stretch of its list's guide line */

.page-link {
  display: flex;
  flex-grow: 1;
  align-items: center;
}

.is-page > .row .text {
  font-weight: 400;
  color: var(--doc-menu-item);
}

.is-page > .row:hover .text {
  color: var(--vp-c-text-1);
}

.is-page.is-current > .row .text {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.marker {
  position: absolute;
  top: 4px;
  bottom: 4px;
  inset-inline-start: calc(-1px - var(--indent));
  width: 1px;
  transition: background-color 0.25s;
}

.row:hover .marker {
  background-color: var(--doc-line-strong);
}

.is-current > .row .marker {
  width: 2px;
  background-color: var(--vp-c-brand-1);
}


/* Light theme: one weight step heavier, dark text on white reads thinner; the current page keeps its weight */

html:not(.dark) .is-section > .row .text {
  font-weight: 600;
}

html:not(.dark) .is-subsection > .row .text {
  font-weight: 500;
}

html:not(.dark) .is-subsection.has-current > .row .text {
  font-weight: 600;
}

html:not(.dark) .is-page:not(.is-current) > .row .text {
  font-weight: 500;
}
</style>

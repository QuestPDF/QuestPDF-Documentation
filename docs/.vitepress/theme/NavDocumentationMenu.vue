<script setup lang="ts">
import {
  faBadgeCheck,
  faBookOpenCover,
  faGift,
  faObjectsColumn,
  faRocketLaunch,
  faSignsPost,
  faWindowRestore
} from "@fortawesome/pro-light-svg-icons";
import { useRoute } from "vitepress";
import { VPLink } from "vitepress/theme";
import Icon from "./Icon.vue";

/* VitePress passes `menu` in the navbar dropdown and the ⋯ overflow menu (rendered straight into a <ul>), and
   `screenMenu` in the mobile menu (already wrapped in an <li>) */
const { screenMenu } = defineProps<{ menu?: boolean; screenMenu?: boolean }>();

const route = useRoute();

/* learning the library, project news; each group is its own list, separated by a divider */
const groups = [
  [
    { icon: faRocketLaunch, title: "Quick start", link: "/quick-start" },
    { icon: faBookOpenCover, title: "In-depth invoice tutorial", link: "/invoice-tutorial" },
    { icon: faBadgeCheck, title: "License configuration", link: "/license/configuration" },
    { icon: faObjectsColumn, title: "Features overview", link: "/features-overview" },
    { icon: faWindowRestore, title: "Companion app", link: "/companion" }
  ],
  [
    { icon: faGift, title: "Releases", link: "https://github.com/QuestPDF/QuestPDF/releases" },
    { icon: faSignsPost, title: "Roadmap", link: "/roadmap" }
  ]
];

const isCurrent = (link: string) => route.data.relativePath === `${link.slice(1)}.md`;
</script>

<template>
  <component :is="screenMenu ? 'div' : 'li'" class="nav-documentation-menu" :class="{ screen: screenMenu }">
    <ul v-for="(entries, index) in groups" :key="index" class="entries">
      <li v-for="entry in entries" :key="entry.link">
        <VPLink
          :href="entry.link"
          no-icon
          class="entry"
          :class="{ current: isCurrent(entry.link) }"
          :aria-current="isCurrent(entry.link) ? 'page' : undefined"
        >
          <Icon v-if="!screenMenu" :icon="entry.icon" />
          {{ entry.title }}
        </VPLink>
      </li>
    </ul>
  </component>
</template>

<style scoped>
/* one glyph and one line per entry, the glyph in the colour of its title; the panel is as wide as the longest title */
.entries {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  white-space: nowrap;
}

.entries + .entries {
  margin: 0.5rem -0.5rem 0;
  border-top: 1px solid var(--vp-c-divider);
  padding: 0.5rem 0.5rem 0;
}

/* the rows sit 8px inside the panel, with corners that follow the panel's */
.entry {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.5rem 0.875rem;
  border-radius: 16px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.entry .icon {
  flex: 0 0 auto;
  font-size: 1.25rem;
}

.entry:is(:hover, :focus-visible) {
  background-color: var(--surface-hover);
}

/* the current page: the navbar button's blue on a pale blue pill in light, a pill a step stronger than the hover in
   dark */
.entry.current {
  color: light-dark(#1976D2, var(--vp-c-text-1));
  background-color: var(--surface-current);
}


/* Phone menu: plain links, as VitePress draws the entries of a group, on 40px rows that are easier to tap */

.screen .entries {
  display: block;
  white-space: normal;
}

.screen .entries + .entries {
  margin: 0;
  border-top: none;
  padding: 0;
}

.screen .entry {
  display: block;
  margin-inline-start: 1.25rem;
  padding: 0.5rem 0;
  border-radius: 0;
  font-size: 0.875rem;
  font-weight: 400;
}

.screen .entry:is(:hover, :focus-visible) {
  background-color: transparent;
}

.screen .entry:hover {
  color: var(--vp-c-brand-1);
}

.screen .entry.current {
  background-color: transparent;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
</style>

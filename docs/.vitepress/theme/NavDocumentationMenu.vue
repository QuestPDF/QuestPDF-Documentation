<script setup lang="ts">
import {
  faBadgeCheck,
  faBookOpenCover,
  faPlanetRinged,
  faGift,
  faObjectsColumn,
  faRocketLaunch,
  faSignsPost
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
    { icon: faPlanetRinged, title: "Companion app", link: "/companion/usage" }
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
          <Icon :icon="entry.icon" />
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

.entry {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
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
  background-color: var(--vp-c-default-soft);
}

.entry.current {
  color: var(--vp-c-brand-1);
}

.screen .entries {
  gap: 0;
  white-space: normal;
}

.screen .entries + .entries {
  margin: 0.5rem 0 0;
  padding: 0.5rem 0 0;
}

.screen .entry {
  padding: 0.625rem 0;
}

.screen .entry:hover {
  background-color: transparent;
}
</style>

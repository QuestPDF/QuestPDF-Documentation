<script setup lang="ts">
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

/* A Font Awesome icon as inline SVG from its typed definition, so nothing is fetched at runtime. Duotone definitions
   carry two paths, the secondary layer first; the --fa-* variables keep Font Awesome's names so existing styles apply. */
const { icon } = defineProps<{ icon: IconDefinition }>();
</script>

<template>
  <svg class="icon" :viewBox="`0 0 ${icon.icon[0]} ${icon.icon[1]}`" aria-hidden="true" focusable="false">
    <template v-if="Array.isArray(icon.icon[4])">
      <path class="secondary" :d="icon.icon[4][0]" />
      <path class="primary" :d="icon.icon[4][1]" />
    </template>
    <path v-else :d="icon.icon[4]" />
  </svg>
</template>

<style scoped>
/* zero-specificity base, so any parent rule on .icon wins regardless of style order */
:where(.icon) {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
  fill: currentColor;
}

.primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}
</style>

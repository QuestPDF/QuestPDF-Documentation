<template>
  <!-- a window onto part of a Companion screenshot: x and y are the top-left corner and w the width
       of the visible part, all as fractions of the screenshot; the box keeps the given aspect ratio,
       which CSS may override (the anchor stays the top-left corner) -->
  <span class="companion-crop" :style="{ aspectRatio: String(aspect) }">
    <img v-if="theme !== 'dark'" :src="`/companion/${name}-light.webp`" alt="" class="crop-light" :class="{ forced: theme === 'light' }" :style="imageStyle" loading="lazy" />
    <img v-if="theme !== 'light'" :src="`/companion/${name}-dark.webp`" alt="" class="crop-dark" :class="{ forced: theme === 'dark' }" :style="imageStyle" loading="lazy" />
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ name: string; x: number; y: number; w: number; aspect: number; theme?: "auto" | "light" | "dark" }>(), {
  theme: "auto"
});

/* the width is a share of the box; the shift is a share of the image itself (translate percentages
   refer to the element), so the anchor does not depend on the box's height */
const imageStyle = computed(() => ({
  width: `${100 / props.w}%`,
  transform: `translate(${-props.x * 100}%, ${-props.y * 100}%)`
}));
</script>

<style scoped>

.companion-crop {
  position: relative;
  display: block;
  overflow: hidden;
}

.companion-crop img {
  position: absolute;
  top: 0;
  left: 0;
  max-width: none; /* VitePress caps images at 100%, a zoomed crop is wider than its box */
  height: auto;
}

html:not(.dark) .crop-dark:not(.forced),
html.dark .crop-light:not(.forced) {
  display: none;
}

</style>

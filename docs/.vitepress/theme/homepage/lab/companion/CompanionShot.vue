<template>
  <!-- one Companion screenshot in the reader's theme (or a fixed one), as a block image -->
  <span class="companion-shot" :class="`theme-${theme}`">
    <img v-if="theme !== 'dark'" :src="`/companion/${name}-light.webp`" :alt="alt" class="shot-light" loading="lazy" />
    <img v-if="theme !== 'light'" :src="`/companion/${name}-dark.webp`" :alt="alt" class="shot-dark" loading="lazy" />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ name: string; alt?: string; theme?: "auto" | "light" | "dark" }>(), {
  alt: "QuestPDF Companion App",
  theme: "auto"
});
</script>

<style scoped>

.companion-shot {
  display: block;
}

.companion-shot img {
  display: block;
  width: 100%;
  height: auto;
}

html:not(.dark) .theme-auto .shot-dark,
html.dark .theme-auto .shot-light {
  display: none;
}

</style>

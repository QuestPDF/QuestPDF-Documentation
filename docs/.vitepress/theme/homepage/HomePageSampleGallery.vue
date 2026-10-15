<script setup lang="ts">
import HomePageCtaCard from "./HomePageCtaCard.vue";
import HomePageCtaDeckVisual from "./HomePageCtaDeckVisual.vue";
</script>

<template>
  <!-- the right call to action under the hero, next to the intro video card (HomePageGettingStarted.vue).
       The href is a placeholder until the gallery page exists (see roadmap.md); the indigo accent is the
       one the page background uses next to the brand blue. The visual is the 3D pile of sample pages. -->
  <home-page-cta-card
      title="Explore the sample gallery"
      description="Explore complete document examples, reusable components and layout ideas. Each includes C# source code you can copy and adapt to your own projects."
      label="Browse the examples"
      href="/sample-gallery.html"
      accent="#5C6BC0"
      accent-secondary="#3F51B5">
    <template #visual>
      <home-page-cta-deck-visual />
    </template>
  </home-page-cta-card>
</template>

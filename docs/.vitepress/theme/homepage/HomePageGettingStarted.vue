<script setup lang="ts">
import HomePageCtaCard from "./HomePageCtaCard.vue";

const pages = [
  "/homepage/getting-started/invoice1.webp",
  "/homepage/getting-started/invoice2.webp"
];
</script>

<template>
  <!-- the left call to action under the hero; the sample gallery card next to it is HomePageSampleGallery.vue.
       Links to the Quick Start page, where the intro video lives. -->
  <home-page-cta-card
      title="Watch the 10-minute intro"
      description="A short video introduces the library and its core concepts, then builds a production-ready invoice in fewer than 200 lines of C#."
      label="Watch the intro"
      detail="10 min"
      badge="10 min"
      href="/quick-start.html"
      :images="pages"
      variant="video" />
</template>

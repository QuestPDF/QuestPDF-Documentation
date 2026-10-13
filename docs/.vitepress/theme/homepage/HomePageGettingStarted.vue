<script setup lang="ts">
import HomePageShowcaseCard from "./HomePageShowcaseCard.vue";

const pages = [
  "/homepage/getting-started/invoice1.webp",
  "/homepage/getting-started/invoice2.webp"
];
</script>

<template>
  <!-- the getting-started card of the bento; the sample gallery card next to it is HomePageSampleGallery.vue.
       The href is a placeholder until the video is published. -->
  <home-page-showcase-card
      title="Get started in 10 minutes"
      description="Watch a short video that introduces the library, explains its core concepts, and builds a production-ready invoice in fewer than 200 lines of C# code."
      action-label="Watch the Video"
      href="/getting-started-video.html"
      :images="pages"
      :shuffle="false"
      image-alt="Sample invoice" />
</template>

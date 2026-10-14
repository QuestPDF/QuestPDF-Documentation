<script setup lang="ts">
import HomePageCtaCard from "./HomePageCtaCard.vue";
import HomePageCtaBuildVisual from "./HomePageCtaBuildVisual.vue";
</script>

<template>
  <!-- the left call to action under the hero; the sample gallery card next to it is HomePageSampleGallery.vue.
       Links to the Quick Start page, where the intro video lives. The visual is the 3D invoice build. -->
  <home-page-cta-card
      title="Build an invoice in 10 minutes"
      description="Learn the core concepts of QuestPDF, then build a complete invoice step by step. Go from a blank page to a finished PDF in fewer than 200 lines of C#."
      label="Watch the tutorial"
      href="/quick-start.html"
      variant="video">
    <template #visual>
      <home-page-cta-build-visual />
    </template>
  </home-page-cta-card>
</template>

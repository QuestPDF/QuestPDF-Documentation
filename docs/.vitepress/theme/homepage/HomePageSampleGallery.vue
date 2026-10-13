<script setup lang="ts">
import HomePageCtaCard from "./HomePageCtaCard.vue";

/* pages rendered from the Component Variants gallery document, shown as a coverflow row with the
   first one in the centre, then slid through while the card is hovered. Fifteen pages, so that a page
   which has left on the left does not come back from the right for a long while */
const pages = [
  "/homepage/sample-gallery/page-25.webp", // product cards with photos
  "/homepage/sample-gallery/page-21.webp", // charts
  "/homepage/sample-gallery/page-12.webp", // section heading bands
  "/homepage/sample-gallery/page-16.webp", // tables
  "/homepage/sample-gallery/page-30.webp", // stamps and seals
  "/homepage/sample-gallery/page-24.webp", // images and photos
  "/homepage/sample-gallery/page-23.webp", // maps
  "/homepage/sample-gallery/page-14.webp", // invoice totals
  "/homepage/sample-gallery/page-08.webp", // document headers
  "/homepage/sample-gallery/page-28.webp", // callouts and badges
  "/homepage/sample-gallery/page-20.webp", // rich table cells with heat map
  "/homepage/sample-gallery/page-22.webp", // QR codes and barcodes
  "/homepage/sample-gallery/page-26.webp", // real-estate listing with photos
  "/homepage/sample-gallery/page-34.webp", // signatures and notary stamp
  "/homepage/sample-gallery/page-03.webp"  // metric tiles
];
</script>

<template>
  <!-- the right call to action under the hero, next to the intro video card (HomePageGettingStarted.vue).
       The href is a placeholder until the gallery page exists (see roadmap.md); the indigo accent is the
       one the page background uses next to the brand blue. -->
  <home-page-cta-card
      title="Browse the sample gallery"
      description="Explore complete documents such as invoices, reports and certificates, plus reusable components and layout ideas. Each comes with source code you can copy and adapt."
      label="Open the gallery"
      detail="40+ samples"
      href="/sample-gallery.html"
      :images="pages"
      variant="gallery"
      accent="#5C6BC0"
      accent-secondary="#3F51B5" />
</template>

<script setup lang="ts">
import HomePageShowcaseCard from "./HomePageShowcaseCard.vue";

/* pages rendered from the Component Variants gallery document, shown as a coverflow row with the
   first one in the centre, then slid through on hover. Fifteen pages, so that a page which has left on the
   left does not come back from the right for several seconds */
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
  <!-- the sample gallery card of the bento, next to the getting-started card (HomePageGettingStarted.vue).
       The href is a placeholder until the gallery page exists. -->
  <home-page-showcase-card
      title="Browse the sample gallery"
      description="Explore complete documents such as invoices, reports and certificates, plus reusable components and layout ideas, each with source code you can copy and adapt."
      action-label="Open Sample Gallery"
      href="/sample-gallery.html"
      :images="pages"
      layout="row"
      image-alt="Page from the Component Variants sample document"
      accent="#00B0FF"
      accent-secondary="#0094F9" />
</template>

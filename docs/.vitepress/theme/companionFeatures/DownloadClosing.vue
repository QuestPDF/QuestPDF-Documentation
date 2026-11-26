<script setup lang="ts">
import DownloadButton from "./DownloadButton.vue";

/* PROTOTYPE: the end of the page, the download once more for those who read it all */
</script>

<template>
  <section class="closing">
    <h2 class="closing-title">Try it with your own document</h2>
    <DownloadButton up />
  </section>
</template>

<style scoped>

.closing {
  padding: 24px 0;
  text-align: center;
}

.closing-title {
  margin: 0 0 24px;
}

</style>

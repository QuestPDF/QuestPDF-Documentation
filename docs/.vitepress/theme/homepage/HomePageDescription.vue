<template>
  <section class="content">
    <h2>Designed to be efficient</h2>

    <div class="details video-container">
      <video class="video" autoplay controls muted loop>
        <source src="/previewer/video-compressed.mp4" type="video/mp4">
      </video>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>

.video {
  border-radius: 12px;
  filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));
}

@media screen and (max-width: 500px) {
  .video-container {
    padding: 0;
    margin: 0 -24px;
  }

  .video {
    border-radius: 0;
  }
}

</style>
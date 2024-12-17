<template>
  <article class="content license-header">
    <div>
      <h1><span class="highlight-foreground">QuestPDF</span> License and Pricing</h1>

      <p class="sub-header" style="max-width: 700px">By offering free access to most users and premium licenses for larger organizations, the project maintains its commitment to excellence while ensuring sustainable, long-term development for all.</p>
    </div>

    <img src="/homepage/license.svg" alt="" class="license-icon" />
  </article>
</template>

<script setup>

</script>

<style scoped>

.license-header {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  grid-gap: 128px;
}

.license-icon {
  width: 128px;
}

@media screen and (max-width: 1000px) {
  .license-header {
    grid-gap: 64px;
  }
}

@media screen and (max-width: 700px) {
  .license-header {
    grid-template-columns: 1fr;
  }

  .license-icon {
    display: none;
  }
}

</style>
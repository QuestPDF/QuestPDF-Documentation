<template>
  <article class="content license-header">
    <h1><span class="highlight-foreground">QuestPDF</span> License and Pricing</h1>

    <p class="sub-header">QuestPDF is free for individual developers, open-source projects, and small organizations.
      Commercial licenses are available for teams and companies that require long-term stability, compliance, and professional support.</p>
  </article>
</template>

<script setup>

</script>

<style scoped>

.license-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.license-header .sub-header {
  text-align: center;
  max-width: 720px;
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
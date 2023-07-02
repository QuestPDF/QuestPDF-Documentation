<template>
  <article class="content license-header">
    <div>
      <h1><span class="highlight-foreground">QuestPDF</span> License and Pricing</h1>

      <div class="details">
        <p>Nowadays, we are creating more impactful software than ever before. Regardless of its size and purpose, every project deserves well-maintained dependencies. We identify the importance of the QuestPDF library in your projects, and therefore want to ensure you can safely and confidently continue the development.</p>

        <p>We strongly believe that a dual-licensing model is the best solution for all users: providing the best development experience and feature set for everybody and every project, but also offering stability for every professional and enterprise product.</p>
      </div>
    </div>

    <img src="/homepage/license.svg" alt="" class="license-icon" />
  </article>
</template>

<script setup>

</script>

<style scoped>

.license-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  grid-gap: 128px;
}

.license-icon {
  width: 160px;
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

.details {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

</style>
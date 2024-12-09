<template>
  <article class="content license-header">
    <div>
      <h1><span class="highlight-foreground">QuestPDF</span> License and Pricing</h1>

      <div class="details">
        <p>QuestPDF is an open-source library committed to long-term sustainability and continuous improvement.</p>

        <p>To maintain high-quality development and support while keeping the library free for most users, we use a fair pricing model where only larger organizations help by providing necessary funding for the project.</p>

        <a class="action" href="/license/guide" style="margin-top: 16px;">License selection guide</a>
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
  align-items: start;
  flex-direction: column;
  gap: 32px;
}

.details p {
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  line-height: 2rem;
}

</style>
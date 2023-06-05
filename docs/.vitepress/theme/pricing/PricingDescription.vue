<template>
  <article class="content license-header">
    <div>
      <h1><span class="highlight-foreground">QuestPDF</span> Meets Professionalism</h1>

      <div class="details">
        <p>Nowadays, we are building upon the work of giants, creating more impactful software than ever before. Regardless of its size and purpose, every project deserves well-maintained dependencies. We identify the importance of the QuestPDF library in your projects, and therefore want to make sure you can safely and confidently continue the development.</p>

        <p>We strongly believe that a dual-licensing model is the best solution for all users: providing the best development experience and feature set for everybody and every project, but also offering stability for every professional and enterprise product.</p>

        <p>Being a healthy and growing community is our primary goal that motivates us to pursue professionalism.</p>
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
  grid-template-columns: 1fr 192px;
  align-items: center;
  grid-gap: 128px;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.description {
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  line-height: 2rem;
  margin-bottom: 16px;
}

/* Summary */

.summary-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px 64px;
}

@media screen and (max-width: 800px) {
  .summary-list {
    grid-template-columns: 1fr;
  }
}

.summary-item {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 16px;
}
</style>
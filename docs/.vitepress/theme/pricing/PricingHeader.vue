<template>
  <article class="content pricing-header">
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

.pricing-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  grid-gap: 128px;
}

.license-icon {
  width: 192px;
}

@media screen and (max-width: 1000px) {
  .pricing-header {
    grid-gap: 64px;
  }
}

@media screen and (max-width: 700px) {
  .pricing-header {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2.25rem;
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
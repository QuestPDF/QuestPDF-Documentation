<template>
  <section class="content getting-started">
    <div class="description">
      <h2 style="margin-bottom: 0;">Let's get started</h2>

      <p>Begin exploring the QuestPDF library today. You are 250 lines of C# code away from creating a fully functional PDF invoice implementation.</p>

      <p>Read the Getting Started tutorial to familiarize yourself with general library architecture, important layout structures as well as to better understand helpful patterns and practices.</p>

      <a class="action primary" href="quick-start.html">Get started</a>
    </div>

    <img src="/invoice.png" alt="Example invoice document implemented and generated with QuestPDF using C# language." />
  </section>
</template>

<script setup>

</script>

<style scoped>
  .getting-started {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 64px 96px;
  }

  @media screen and (max-width: 700px) {
    .getting-started {
      grid-template-columns: 1fr;
    }
  }

  .getting-started .description {
    place-self: center;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 32px;
  }

  .getting-started img {
    place-self: center;
    max-width: min(350px, 80%);
  }
</style>
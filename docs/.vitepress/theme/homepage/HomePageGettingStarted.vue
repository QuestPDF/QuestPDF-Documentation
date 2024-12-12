<template>
  <section class="content">
    <div class="description">
      <h2>Let's get started</h2>

      <p class="sub-header">Follow our detailed tutorial, and see how easy it is to produce a fully functional invoice with fewer than 250 lines of C# code.</p>

      <a class="action primary" href="getting-started.html">Get started</a>
    </div>

    <img src="/invoice.png" alt="Example invoice document implemented and generated with QuestPDF using C# language." />
  </section>
</template>

<script setup>

</script>

<style scoped>
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 64px 96px;
  }

  @media screen and (max-width: 700px) {
    .content {
      grid-template-columns: 1fr;
    }
  }

  .description {
    place-self: center;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  img {
    place-self: center;
    max-width: min(350px, 75%);
  }

  html.dark img {
    opacity: 0.8;
  }
</style>
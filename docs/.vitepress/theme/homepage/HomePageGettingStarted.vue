<template>
  <div class="background-gradient" />
  <div class="background-grid" />

  <section class="content">
    <div class="description">
      <h2>Ready to get started?</h2>

      <p class="sub-header">Follow our detailed tutorial, and see how easy it is to generate a fully functional invoice with fewer than 250 lines of C# code.</p>

      <a class="action primary" href="getting-started.html">Read tutorial</a>
    </div>

    <img src="/invoice.png" alt="Example invoice document implemented and generated with QuestPDF using C# language." />
  </section>
</template>

<script setup>

</script>

<style scoped>
  .content {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 64px 128px;

    overflow: visible;
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

  /* Background */

  .background-gradient {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(ellipse 75% 100% at 50% 100%, color-mix(in srgb, var(--vp-c-brand-2) 15%, transparent), transparent);
  }

  .background-grid {
    position: absolute;
    inset: 0;
    --grid-thickness: 2px;
    --grid-color: var(--vp-c-brand-1);

    background-image:
        linear-gradient(var(--vp-c-brand-3) var(--grid-thickness), transparent var(--grid-thickness)),
        linear-gradient(90deg, var(--vp-c-brand-3) var(--grid-thickness), transparent var(--grid-thickness));
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 75% 75% at 50% 100%, #0001 25%, transparent 100%);
  }

  html.dark .background-grid {
    --grid-thickness: 1px;
    --grid-color: var(--vp-c-brand-3);
  }
</style>
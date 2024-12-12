<script setup>

</script>

<template>
  <section class="content getting-started">

    <img src="/homepage/license.svg" alt="Example invoice document implemented and generated with QuestPDF using C# language." />

    <div class="description">
      <h2 style="margin-bottom: 0;">Sustainable License</h2>

      <p class="sub-header">To maintain high-quality development and support while keeping the library free for most users, we use a fair pricing model where only larger organizations help by providing necessary funding for the project.</p>

      <div class="license-warning">
        The library is free to use for any individual or business with less than 1 million USD annual gross revenue, or operates as a non-profit organization, or is a FOSS project.
      </div>

      <a class="action" href="/license">Read more</a>
    </div>

  </section>
</template>

<style scoped>
  .getting-started {
    max-width: 800px;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 64px;
    justify-items: start;
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
    width: 128px;
  }

  .license-warning {
    border-radius: 12px;
    padding: 12px 16px;
    border-color: var(--vp-custom-block-warning-border);
    color: var(--vp-custom-block-warning-text);
    background-color: var(--vp-custom-block-warning-bg);
  }

  @media screen and (max-width: 700px) {
    .getting-started {
      grid-template-columns: 1fr;
      grid-gap: 32px;
    }

    .getting-started img {
      place-self: center;
      width: 72px;
    }
  }
</style>
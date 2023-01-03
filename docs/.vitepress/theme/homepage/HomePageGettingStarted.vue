<template>
  <div class="container">

    <section class="getting-started">
      <div class="description">
        <h2>Let's get started</h2>

        <p>Begin exploring the QuestPDF library today. You are 250 lines of C# code away from creating a fully functional PDF invoice implementation.</p>

        <p>Read the Getting Started tutorial to familiarize yourself with general library architecture, important layout structures as well as to better understand helpful patterns and practices.</p>

        <a class="action" href="/getting-started">Get started</a>
      </div>

      <img src="/invoice.png" />
    </section>
  </div>
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

  a.action {
    display: inline-block;
    border: 1px solid var(--vp-button-brand-border);
    text-align: center;
    font-weight: 500;
    white-space: nowrap;
    transition: color 0.25s, border-color 0.25s, background-color 0.25s;

    border-radius: 20px;
    padding: 0 20px;
    line-height: 38px;

    background-color: var(--vp-button-brand-bg);

    color: white;
    font-size: 1rem;
  }

  a.action:hover {
    background-color: var(--vp-button-brand-hover-bg);
    border-color: var(--vp-button-brand-hover-bg);
  }
</style>
<template>
  <article class="content license-content">
    <img src="/homepage/license.svg" alt="" class="license-icon" />

    <div>
      <h2>What license do you need?</h2>

      <div class="details">
        <p class="description">If you are consuming the QuestPDF library as a Direct Package Dependency for usage in a Closed Source software in the capacity of a for-profit company/individual with more than 1M USD annual gross revenue, you must purchase the <span class="highlight-background">QuestPDF Professional or Enterprise</span> License, depending on number of software developers.</p>

        <a class="action" href="/license-commercial.html" style="margin-top: 16px;">Read more</a>

        <p class="description" style="margin-top: 64px;">We love and highly appreciate the .NET Community and therefore the vast majority of users are welcome to use the library completely for free. If you do not meet the criteria described above, you are eligible to use the <span class="highlight-background">QuestPDF Community MIT</span> License, without any limitations, even for commercial usage.</p>

        <p class="description" style="margin-top: 16px;">If you still want to support library development, please consider purchasing the Professional License.</p>

        <a class="action" href="/license-community.html" style="margin-top: 16px;">Read more</a>
      </div>
    </div>
  </article>
</template>

<script setup>

</script>

<style scoped>

.license-content {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 64px;
}

.license-icon {
    width: 128px;
    place-self: center;
}

.description {
    color: var(--vp-c-text-1);
}

@media screen and (max-width: 800px) {
  .license-content {
    grid-template-columns: 1fr;
  }

  .license-icon {
    width: 64px;
    justify-self: start;
  }
}

</style>
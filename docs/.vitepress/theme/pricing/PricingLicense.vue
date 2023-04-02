<template>
  <article class="content">
    <img src="/homepage/license.svg" alt="" class="license-icon" />

    <div>
      <h2>What license do you need?</h2>

      <div class="details">
        <p class="description">If you are consuming the QuestPDF library as a Direct Package Dependency for usage in a Closed Source software in the capacity of a for-profit company/individual with more than 1M USD annual gross revenue, you must purchase the <span class="highlight-background">QuestPDF Professional or Enterprise</span> License, depending on number of software developers.</p>

        <a class="action" href="/license-commercial" style="margin-top: 16px;">Read more</a>

        <p class="description" style="margin-top: 64px;">If you do not meet the criteria described above, you are eligible to use the <span class="highlight-background">QuestPDF Community MIT</span> License, completely for free, including the commercial usage.</p>

        <a class="action" href="/license-community" style="margin-top: 16px;">Read more</a>
      </div>
    </div>
  </article>
</template>

<script setup>

</script>

<style scoped>
.license-icon {
  width: 128px;
  place-self: center;
}

.content {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 0 64px;
}

.description {
  color: var(--vp-c-text-1);
}
</style>
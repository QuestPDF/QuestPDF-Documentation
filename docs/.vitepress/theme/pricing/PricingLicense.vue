<template>
  <article class="content license-content">
    <div>
      <h2>What license do you need?</h2>

      <div class="details">
        <p class="description">Answer a couple of questions to find the perfect license for your project.</p>

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
<template>

  <div class="container">
    <h2 class="title">What you need is here</h2>

    <div class="targets">

      <section class="target-card">
        <img class="icon" src="/custom/community2.svg" />
        <h3 class="title">Loved by developers</h3>
        <p class="details">This library is created specifically for designing and arranging document layouts, with full paging support. Alternative solutions, such as HTML-based converters, are not designed for this purpose and therefore are often unpredictable and do not produce desired results.</p>
      </section>

      <section class="target-card">
        <img class="icon" src="/custom/success2.svg" />
        <h3 class="title">Trusted by business</h3>
        <p class="details">The entire process of implementing PDF document, takes place in your code. Free yourself from slow visual designers and strange technological limitations. Follow simple yet highly effective approaches to create maintainable, high-quality code.</p>
      </section>

    </div>

  </div>

</template>

<script setup>

</script>

<style scoped>

.targets {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 96px;

  margin-top: 64px;
}

.target-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  /*background-color: var(--vp-c-bg-soft);*/
  /*border: 1px solid var(--vp-c-divider-light);*/
  /*border-radius: 12px;*/
  /*padding: 32px;*/
}

.target-card img.icon {
  align-self: center;
  height: 96px;

  /*filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));*/
}

.target-card h3 {
  text-align: center;
}

.target-card p.details {
  text-align: justify;
}


</style>
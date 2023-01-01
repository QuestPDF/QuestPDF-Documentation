<template>

  <div class="container">
    <h2>What you need is here</h2>

    <div class="targets">

      <section class="target-card">
        <img class="icon" src="/custom/community.svg" />
        <h3 class="title">Loved by developers</h3>
        <p class="details">This library is created specifically for designing and arranging document layouts, with full paging support. Alternative solutions, such as HTML-based converters, are not designed for this purpose and therefore are often unpredictable and do not produce desired results.</p>
      </section>

      <section class="target-card">
        <img class="icon" src="/custom/business.svg" />
        <h3>Trusted by business</h3>
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
  grid-gap: 64px 96px;

  margin-top: 64px;
}

@media screen and (max-width: 700px) {
  .targets {
    grid-template-columns: 1fr;
  }
}

.target-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.target-card img.icon {
  align-self: center;
  height: 96px;
}

.target-card h3 {
  text-align: center;
}

.target-card p.details {
  text-align: justify;
}

@media screen and (max-width: 700px) {
  .target-card img.icon {
    height: 72px;
  }
}


</style>
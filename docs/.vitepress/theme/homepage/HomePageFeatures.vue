<template>
  <section class="content">
    <h2>What you need is here</h2>

    <div class="features">

      <article class="feature" v-for="feature of features" :key="feature.title">
        <img class="icon" :src="feature.icon" alt="" />
        <h3 class="title">{{ feature.title }}</h3>
        <p class="description">{{ feature.description }}</p>
      </article>

    </div>
  </section>
</template>

<script setup>

const features = [
    {
        icon: "homepage/engine.svg",
        title: "Comprehensive Layout Engine",
        description: "A layout engine tailored for document generation, offering advanced paging and precise content control."
    },
    {
        icon: "homepage/puzzle.svg",
        title: "Rich Toolkit",
        description: "Craft documents with intuitive, reusable components and over 50 layout elements for complex designs."
    },
    {
        icon: "homepage/performance.svg",
        title: "High Performance",
        description: "Generate thousands of pages per second with minimal CPU and memory usage."
    },
    {
        icon: "homepage/multilingual.svg",
        title: "Advanced Language Support",
        description: "Seamlessly create multilingual documents with support for RTL, text shaping, and bi-directional content."
    }
];

</script>

<style scoped>

.features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 96px;

  margin-top: 64px;
}

@media screen and (max-width: 700px) {
  .features {
    grid-template-columns: 1fr;
  }
}

.feature {
  display: grid;
  grid-template-areas:
      "icon title"
      "icon description";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 8px 24px;
}

@media screen and (max-width: 1000px) {
  .feature {
    grid-template-areas:
      "icon"
      "title"
      "description";
    grid-template-columns: auto;
    grid-template-rows: auto auto auto;
    grid-gap: 12px 0;
  }
}

.feature img.icon {
  grid-area: icon;

  justify-self: start;
  align-self: start;
  height: 48px;
  width: 48px;
}

.feature h3.title {
  grid-area: title;

  margin: 0;
}

.feature p.description {
  grid-area: description;

  justify-self: start;
  align-self: start;
}

</style>
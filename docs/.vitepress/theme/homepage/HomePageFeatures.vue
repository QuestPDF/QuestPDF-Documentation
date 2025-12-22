<template>
  <section class="content">
    <div class="section-header">
      <h2>Everything you need to generate PDFs</h2>
      <p class="sub-header">A comprehensive toolkit designed for professional PDF document generation in .NET applications</p>
    </div>

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
        description: "A powerful layout engine built specifically for PDF generation. Gain full control over document structure, precise content positioning, and automatic pagination."
    },
    {
        icon: "homepage/puzzle.svg",
        title: "Rich Toolkit",
        description: "Accelerate development with 50+ layout elements and reusable components. Easily implement data-driven documents using a fluent C# API."
    },
    {
        icon: "homepage/performance.svg",
        title: "High Performance",
        description: "Generate thousands of pages per second while maintaining minimal CPU and memory usage. Perfect for high-throughput enterprise applications."
    },
    {
        icon: "homepage/multilingual.svg",
        title: "Advanced Language Support",
        description: "Create multilingual documents with full RTL language support, advanced text shaping, and bi-directional layout handling."
    }
];

</script>

<style scoped>

.features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;

  margin-top: 64px;
}

@media screen and (max-width: 700px) {
  .features {
    grid-template-columns: 1fr;
    grid-gap: 64px;
  }
}

.feature {
  display: flex;
  flex-direction: column;

  background-color: var(--vp-c-bg);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  border-radius: 16px;
  padding: 32px;
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

  margin-top: 24px;
  margin-bottom: 8px;
}

.feature p.description {
  grid-area: description;

  justify-self: start;
  align-self: start;
}

</style>
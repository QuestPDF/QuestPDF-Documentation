<template>
  <section class="content">
    <h2>Exactly what you need</h2>

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
        description: "A powerful layout engine built specifically for PDF generation. Gain full control over document structure, precise content positioning, and automatic pagination for complex reports and invoices."
    },
    {
        icon: "homepage/puzzle.svg",
        title: "Rich Toolkit",
        description: "Accelerate your PDF development workflow with a rich set of reusable components and over 50 layout elements. Easily implement data-driven documents using a Fluent C# API."
    },
    {
        icon: "homepage/performance.svg",
        title: "High Performance",
        description: "Generate PDF files at scale with up to thousands of pages per second - while maintaining minimal CPU and memory usage. Perfect for high-throughput .NET applications."
    },
    {
        icon: "homepage/multilingual.svg",
        title: "Advanced Language Support",
        description: "Create multilingual PDF documents with full support for right-to-left (RTL) languages, advanced text shaping, and bi-directional layout handling."
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
    grid-gap: 64px;
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
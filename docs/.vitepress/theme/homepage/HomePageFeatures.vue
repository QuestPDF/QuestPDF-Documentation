<template>
  <section class="content">
    <div class="section-header">
      <h2>Everything you need to generate PDFs</h2>
      <p class="sub-header">A comprehensive toolkit designed for professional PDF document generation in .NET applications</p>
    </div>

    <div class="features">

      <article class="card" v-for="feature of features" :key="feature.title">
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
        icon: "homepage/features/layout-engine.svg",
        title: "Comprehensive Layout Engine",
        description: "A powerful layout engine built specifically for PDF generation. Gain full control over document structure, precise content positioning, and automatic pagination."
    },
    {
        icon: "homepage/features/rich-toolkit.svg",
        title: "Rich Toolkit",
        description: "Accelerate development with 50+ layout elements and reusable components. Easily implement data-driven documents using a fluent C# API."
    },
    {
        icon: "homepage/features/performance.svg",
        title: "High Performance",
        description: "Generate thousands of pages per second while maintaining minimal CPU and memory usage. Perfect for high-throughput enterprise applications."
    },
    {
        icon: "homepage/features/multilingual.svg",
        title: "Advanced Language Support",
        description: "Create multilingual documents with full RTL language support, advanced text shaping, and bi-directional layout handling."
    },
    {
        icon: "homepage/features/data-privacy.svg",
        title: "Complete Data Privacy",
        description: "QuestPDF runs entirely within your infrastructure with no external API calls, internet requirement, or background data collection. As a company, we do not access, collect, store, or process your private data.",
    },
    {
        icon: "homepage/features/small-document-size.svg",
        title: "Optimized File Size",
        description: "Drastically reduce file sizes without compromising quality. Benefit from automatic font subsetting, optimal image compression, and efficient file compression."
    }
];

</script>

<style scoped>

.features {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 32px;

  margin-top: 64px;
}

@media screen and (max-width: 1100px) {
  .features {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 700px) {
  .features {
    grid-template-columns: 1fr;
  }
}

</style>
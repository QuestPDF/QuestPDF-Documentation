<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Foundations</div>
      <h2>Enterprise-grade foundations</h2>
      <p class="sub-header">A robust layout engine engineered for high performance, complete data privacy, and seamless integration into your infrastructure.</p>
    </div>

    <!-- one card, six cells divided by hairlines, in the same style as the compliance card -->
    <div class="panel foundations">
      <article class="foundation" v-for="feature of features" :key="feature.title">
        <div class="foundation-icon">
          <i class="fa-regular" :class="[feature.icon]"></i>
        </div>

        <h3 class="foundation-title">{{ feature.title }}</h3>
        <p class="foundation-description">{{ feature.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>

const features = [
    {
        icon: "fa-code",
        title: "Source-available",
        description: "Entire QuestPDF source code is available for review and customization, ensuring transparency and compliance with your organization's requirements."
    },
    {
        icon: "fa-shield-check",
        title: "Complete Data Privacy",
        description: "QuestPDF runs entirely within your infrastructure with no external API calls, internet requirement, or background data collection. As a company, we do not access, collect, store, or process your private data."
    },
    {
        icon: "fa-gear-complex",
        title: "Comprehensive Layout Engine",
        description: "A powerful layout engine built specifically for PDF generation. Gain full control over document structure, precise content positioning, and automatic pagination."
    },
    {
        icon: "fa-language",
        title: "Advanced Language Support",
        description: "Create multilingual documents with full RTL language support, advanced text shaping, and bi-directional layout handling."
    },
    {
        icon: "fa-gauge-high",
        title: "High Performance",
        description: "Generate thousands of pages per second while maintaining minimal CPU and memory usage. Perfect for high-throughput enterprise applications."
    },
    {
        icon: "fa-file-zipper",
        title: "Optimized File Size",
        description: "Drastically reduce file sizes without compromising quality. Benefit from automatic font subsetting, optimal image compression, and efficient file compression."
    }
];

</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Three columns, two rows; vertical hairlines between columns, a horizontal one between rows */

.foundations {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  margin-top: 32px;
}

.foundation {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 40px;
}

.foundation:nth-child(3n + 1) {
  padding-left: 0;
}

.foundation:nth-child(3n) {
  padding-right: 0;
}

.foundation:nth-child(-n + 3) {
  padding-top: 0;
}

.foundation:nth-child(n + 4) {
  padding-bottom: 0;
  border-top: 1px solid var(--vp-c-divider);
}

.foundation:not(:nth-child(3n + 1)) {
  border-left: 1px solid var(--vp-c-divider);
}

.foundation-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 4px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
}

.foundation-icon i {
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
}

.foundation-title {
  margin: 0;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.foundation-description {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

/* two columns: the hairlines move with the cells */
@media screen and (max-width: 1100px) {
  .foundations {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .foundation {
    padding: 32px;
  }

  .foundation:nth-child(n) {
    border: none;
  }

  .foundation:nth-child(odd) {
    padding-left: 0;
  }

  .foundation:nth-child(even) {
    padding-right: 0;
    border-left: 1px solid var(--vp-c-divider);
  }

  .foundation:nth-child(-n + 2) {
    padding-top: 0;
  }

  .foundation:nth-child(n + 3) {
    border-top: 1px solid var(--vp-c-divider);
  }

  .foundation:nth-child(n + 5) {
    padding-bottom: 0;
  }
}

/* one column: stacked rows */
@media screen and (max-width: 700px) {
  .foundations {
    grid-template-columns: minmax(0, 1fr);
  }

  .foundation:nth-child(n) {
    padding: 24px 0;
    border: none;
    border-top: 1px solid var(--vp-c-divider);
  }

  .foundation:first-child {
    padding-top: 0;
    border-top: none;
  }

  .foundation:last-child {
    padding-bottom: 0;
  }
}

</style>

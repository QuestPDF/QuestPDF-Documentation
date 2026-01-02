<script setup lang="ts">
import helloWorldExample from './codeExamples/helloWorld.cs?raw';
import HomePageCodeContainer from "./HomePageCodeContainer.vue";

const emit = defineEmits<{
  (e: 'playCodeAnimation'): void
}>()

</script>

<template>
  <section class="content">
    <div class="background-gradient" />
    <div class="background-grid" />

    <div>
      <h1>
        <span class="highlight-foreground">Code-first</span> PDF generation for C#
      </h1>

      <div class="tagline">
        QuestPDF is a production-ready library that lets you design documents the way you design software with clean, maintainable C# code.
      </div>

      <div class="cta-buttons">
        <a class="action primary" @click="emit('playCodeAnimation')">
          <i class="fa-solid fa-play" style="color: white;" />
          Watch Live Demo
          <div class="divider"></div>
          <span style="font-weight: 400;">~90 sec</span>
        </a>

        <a class="action" href="/quick-start">
          Quick Start
        </a>
      </div>

      <div class="trust-items">
        <div class="trust-item">
          <i class="fa-solid fa-star fa-lg"></i>
          <span><strong>14K</strong> GitHub stars</span>
        </div>

        <div class="trust-item">
          <i class="fa-solid fa-download fa-lg"></i>
          <span><strong>15M</strong> NuGet downloads</span>
        </div>
      </div>
    </div>

    <home-page-code-container file-name="HelloWorld.cs" :code="helloWorldExample" />
  </section>
</template>


<style scoped>

/* Layout */

.content {
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-template-rows: auto;

  grid-gap: 64px;
}

@media screen and (max-width: 1023px) {
  .content {
    grid-template-columns: 1fr auto;
  }
}

@media screen and (max-width: 600px) {
  .content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
}

@media screen and (max-width: 400px) {
  h1 br {
    display: none;
  }
}


/* Content styles */

h1 {
  font-size: 3.5rem !important;
  line-height: 4rem !important;
  font-weight: 800 !important;
}

.tagline {
  max-width: 650px;
  font-size: 1.5rem !important;
  line-height: 2rem !important;
  color: var(--vp-c-text-2) !important;
}

@media screen and (max-width: 1024px) {
  h1 {
    font-size: 3rem !important;
    line-height: 3.5rem !important;
  }

  .tagline {
    font-size: 1.25rem !important;
    line-height: 1.5rem !important;
  }
}

@media screen and (max-width: 821px) {
  h1 {
    font-size: 2.5rem !important;
    line-height: 3rem !important;
  }

  .tagline {
    font-size: 1.25rem !important;
    line-height: 1.5rem !important;
  }
}


/* Call To Action Button */

.cta-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
  z-index: 10000;
}

.cta-buttons .action {
  padding: 4px 24px;
}

.cta-buttons .action.primary {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: fit-content;
}

.cta-buttons .action.primary .divider {
  border-left: 1px solid #FFF8;
  margin: 8px 0;
  height: 20px;
}

/* Background */

.background-gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(ellipse 75% 100% at 50% 0%, color-mix(in srgb, var(--vp-c-brand-2) 15%, transparent), transparent);
}

.background-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  --grid-thickness: 2px;
  --grid-color: var(--vp-c-brand-1);

  background-image:
      linear-gradient(var(--vp-c-brand-3) var(--grid-thickness), transparent var(--grid-thickness)),
      linear-gradient(90deg, var(--vp-c-brand-3) var(--grid-thickness), transparent var(--grid-thickness));
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 75% 75% at 50% 0%, #0001 25%, transparent 100%);
}

html.dark .background-grid {
  --grid-thickness: 1px;
  --grid-color: var(--vp-c-brand-3);
}


/* Trust Indicators */

.trust-items {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px 64px;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid color-mix(in srgb, var(--vp-c-brand-2) 10%, transparent);
  width: fit-content;
}

.trust-item {
  width: max-content;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
}

.trust-item strong {
  color: var(--vp-c-text-1);
  font-weight: 700;
}

</style>
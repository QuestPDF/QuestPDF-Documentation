<script setup lang="ts">
import helloWorldExample from './codeExamples/helloWorld.cs?raw';
import HomePageCodeContainer from "./HomePageCodeContainer.vue";
</script>

<template>
  <div class="background-gradient" />
  <div class="background-gradient-noise" />

  <section class="content">
    <div style="z-index: 10; display: flex; flex-direction: column; gap: 16px;">
      <h1>
        <span class="highlight-foreground">Code-first</span> PDF generation for C#
      </h1>

      <div class="tagline">
        QuestPDF is a production-ready library that lets you design documents the way you design software with clean, maintainable C# code.
      </div>

      <div class="cta-buttons">
        <a class="action primary" href="/quick-start">Quick Start</a>
        <a class="action" href="/features-overview">Features Overview</a>
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

  margin-top: -64px;
  padding-top: 128px;
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
  line-height: 2.5rem !important;
  font-weight: 400;
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
  gap: 24px;
  margin-top: 32px;
  z-index: 10000;
  text-transform: uppercase;
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


html.dark .action:not(.primary) {
  background-color: #FFF2;

  &:hover {
    background-color: #FFF3;
  }
}

html:not(.dark) .action:not(.primary) {
  background-color: #FFF;
  border: 1px solid #0004;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));

  &:hover {
    border: 1px solid #0008;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
  }
}


/* Background */

.background-gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
      radial-gradient(ellipse 75% 75% at 50% 100%, color-mix(in srgb, #2196F3 25%, transparent), transparent),
      radial-gradient(ellipse 1500px 300px at 50% 100%, color-mix(in srgb, #00BCD4 10%, transparent), transparent),
      radial-gradient(ellipse 1000px 200px at 40% 100%, color-mix(in srgb, #FFEB3B 15%, transparent), transparent),
      radial-gradient(ellipse 500px 100px at 60% 100%, color-mix(in srgb, #FF9800 20%, transparent), transparent);
}

.background-gradient-noise {
  position: absolute;
  inset: 0;
  background-image: url("/homepage/noise.svg");
  opacity: 0.25;
  pointer-events: none;
  mix-blend-mode: overlay;
}

html:not(.dark) .background-gradient {
  background-image:
      radial-gradient(ellipse 100% 75% at 50% 0%, color-mix(in srgb, #2196F3 25%, transparent), transparent),
      radial-gradient(ellipse 1500px 600px at 100% 0%, color-mix(in srgb, #81D4FA 40%, transparent), transparent),
      radial-gradient(ellipse 1000px 200px at 20% 0%, color-mix(in srgb, #64B5F6 20%, transparent), transparent),
      radial-gradient(ellipse 800px 100px at 60% 100%, color-mix(in srgb, #FF9800 15%, transparent), transparent);
}

</style>
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
        <a class="action primary" href="/quick-start.html">Quick Start</a>
        <a class="action" href="/features-overview.html">Features Overview</a>
      </div>
    </div>

    <home-page-code-container file-name="HelloWorld.cs" :code="helloWorldExample" />
  </section>
</template>


<style scoped>

/* Layout */

.content {
  position: relative;

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
  font-weight: 700 !important;
  max-width: 500px;
  word-spacing: 4px;
}

h1 .highlight-foreground {
  color: #298dff;
  font-weight: 750;
}

html.dark .highlight-foreground {
  color: #32c6ff;
}

.tagline {
  max-width: 600px;
  font-size: 1.5rem !important;
  line-height: 2.25rem !important;
  font-weight: 400;
  word-spacing: 2px;
  color: #000B;
}

html.dark .tagline {
  color: #FFFB;
}

@media screen and (max-width: 1024px) {
  h1 {
    font-size: 3rem !important;
    line-height: 3.5rem !important;
    max-width: 100%;
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

@media screen and (min-width: 1024px) {
  .cta-buttons a.action {
    padding: 16px 24px;
  }
}

html.dark .action:not(.primary) {
  background-color: #FFF2;

  &:hover {
    background-color: #FFF3;
  }
}

html:not(.dark) .action:not(.primary) {
  background-color: #00000014;
  color: var(--vp-c-text-1);
  font-weight: 600;
  box-shadow: none;

  &:hover {
    background-color: #00000022;
  }
}

.action {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}



/* Background */

.background-gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;

  background-image:
      radial-gradient(ellipse 100% 75% at 50% 0%, color-mix(in srgb, #2196F3 15%, transparent), transparent),
      radial-gradient(ellipse 1500px 600px at 100% 0%, color-mix(in srgb, #81D4FA 50%, transparent), transparent),
      radial-gradient(ellipse 1000px 200px at 20% 0%, color-mix(in srgb, #64B5F6 10%, transparent), transparent),
      radial-gradient(ellipse 800px 100px at 60% 100%, color-mix(in srgb, #FF9800 10%, transparent), transparent);
}

.background-gradient-noise {
  position: absolute;
  inset: 0;
  background-image: url("/homepage/noise.svg");
  opacity: 0.25;
  pointer-events: none;
  mix-blend-mode: overlay;
}

html.dark .background-gradient {
  background-image:
      radial-gradient(ellipse 75% 75% at 50% 100%, color-mix(in srgb, #2196F3 20%, transparent), transparent),
      radial-gradient(ellipse 1500px 300px at 50% 100%, color-mix(in srgb, #00BCD4 5%, transparent), transparent),
      radial-gradient(ellipse 1000px 200px at 40% 100%, color-mix(in srgb, #FFEB3B 10%, transparent), transparent),
      radial-gradient(ellipse 500px 100px at 65% 100%, color-mix(in srgb, #FF9800 15%, transparent), transparent);
}

</style>
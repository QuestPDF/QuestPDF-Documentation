<template>
  <section class="content gradient">
    <div class="content-text">
      <h1>
        Modern <span class="highlight-foreground">PDF library</span><br>
        for C# developers
      </h1>

      <div class="tagline">
        Generate and manipulate PDF documents in your .NET applications<br>
        using the open-source QuestPDF library and its C# Fluent API.
      </div>

      <a class="action primary" style="margin-top: 32px" href="#introduction">Show introduction</a>
    </div>

    <div class="content-icon">
      <div class="content-icon-background-static"></div>
      <div class="content-icon-background-rays"></div>

      <div class="animation-scene">
        <div class="animation-translate-y">
          <div class="animation-rotate-y">
            <div class="animation-rotation-scale">
              <div ref="page" v-html="pdfPage" id="homepage-hero-pdf"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import pdfPage from './pdf-pages.svg?raw';

const page = ref<HTMLElement | null>(null);

async function randomizePdf() {
  if (page.value == null)
    return;

  const types = page.value.querySelector("#types");
  const children = Array.from(types?.children || []) as SVGElement[];
  children.sort(() => Math.random() - 0.5);

  let currentImageIndex = 0;

  while (true) {
    for (const child of children)
      (child as SVGGElement).style.opacity = (child == children[currentImageIndex]) ? 1 : 0;

    currentImageIndex++;

    if (currentImageIndex >= children.length)
      currentImageIndex = 0;

    await new Promise(resolve => setTimeout(resolve, 3500));
  }
}

onMounted(randomizePdf);

</script>

<style scoped>

/* Layout */

.content {
  display: grid;
  grid-template-columns: 1fr 180px;
  grid-template-rows: auto;
  grid-template-areas: "text icon";
  grid-gap: 64px;
}

.content-text {
  grid-area: text;
  z-index: 2;
}

.content-icon {
  grid-area: icon;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 1024px) {
  .content {
    grid-template-columns: 1fr 150px;
  }
}

@media screen and (max-width: 768px) {
  .content {
    grid-template-columns: 1fr 120px;
  }
}

@media screen and (max-width: 600px) {
  .content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
        "icon"
        "text";
  }

  .content-icon {
    max-width: 120px;
    justify-self: center;
  }
}

@media screen and (max-width: 400px) {
  h1 br {
    display: none;
  }
}

@media screen and (max-width: 900px) {
  .tagline br {
    display: none;
  }
}


/* Background gradient */

.content-icon-background-static {
  content: "";
  position: absolute;
  width: 150vmax;
  height: 150vmax;
  border-radius: 50%;
  background: radial-gradient(circle farthest-side, #2979ff60, #0098ff40, #00b4ff20, #00ceff10, #00e5ff08, #00e5ff00);
}

@keyframes content-icon-background-rays-animation {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.content-icon-background-rays {
  content: "";
  position: absolute;
  width: 200vmax;
  height: 200vmax;
  border-radius: 50%;
  opacity: 0.125;
  background: repeating-conic-gradient(#FFF0 0deg 30deg, #FFFF 30deg 60deg);
  animation: content-icon-background-rays-animation 120s linear infinite;
}

html.dark .content-icon-background-rays {
  opacity: 0.015;
}



/* Content styles */

h1 {
  font-size: 3.5rem !important;
  line-height: 4rem !important;
  font-weight: 700 !important;
}

.tagline {
  font-size: 1.5rem !important;
  line-height: 2rem !important;
  color: var(--vp-c-text-1) !important;
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

@media screen and (max-width: 768px) {
  h1 {
    font-size: 2.5rem !important;
    line-height: 3rem !important;
  }

  .tagline {
    font-size: 1.25rem !important;
    line-height: 1.5rem !important;
  }
}


/* PDF Animation */

.animation-scene {
  perspective: 800px;
}

@keyframes animated-pdf-translate-y {
  0%   { transform: translateY(-16px); }
  100% { transform: translateY(16px); }
}

@keyframes animated-pdf-rotate-y {
  0%   { transform: rotateY(-24deg); }
  100% { transform: rotateY(-16deg);  }
}

@keyframes animated-pdf-scale {
  0%   { transform: scale(1); }
  100% { transform: scale(1.05);  }
}

.animation-translate-y {
  transform-style: preserve-3d;
  animation: animated-pdf-translate-y 7s ease-in-out infinite alternate;
}

.animation-rotate-y {
  transform-style: preserve-3d;
  animation: animated-pdf-rotate-y 11s ease-in-out infinite alternate;
}

.animation-rotation-scale {
  transform-style: preserve-3d;
  animation: animated-pdf-scale 19s ease-in-out infinite alternate;
}

#homepage-hero-pdf {
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25));
}

html.dark #homepage-hero-pdf {
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3));
}

</style>
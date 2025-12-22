<script setup>
import HomePageHeroImage from "./HomePageHeroImage.vue";
</script>
<template>
  <section class="content">
    <div class="background-gradient" />
    <div class="background-grid" />

    <div class="content-text">
      <h1>
        <span class="highlight-foreground">Code-first</span> PDF<br> generation library
      </h1>

      <div class="tagline">
        Design PDFs the way you design software - with clean code, instant preview, and predictable layouts.
      </div>

      <a class="action primary" style="margin-top: 32px" href="#introduction">Show introduction</a>

      <div class="hero-trust">
        <div class="trust-item">
          <img src="/homepage/stargazers-small.svg" width="24" height="24" alt="" />
          <span><strong>14K</strong> GitHub stars</span>
        </div>
        <div class="trust-divider"></div>
        <div class="trust-item">
          <img src="/homepage/downloads-small.svg" width="24" height="24" alt="" />
          <span><strong>15M</strong> NuGet downloads</span>
        </div>
      </div>
    </div>

    <home-page-hero-image />
  </section>
</template>


<style scoped>

/* Layout */

.content {
  display: grid;
  grid-template-columns: 1fr 400px;
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
    max-width: 100px;
    justify-self: center;
  }
}

@media screen and (max-width: 400px) {
  h1 br {
    display: none;
  }
}

/* Background gradient */

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
  opacity: 0.1;
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


/* Background */

.background-gradient {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(ellipse 75% 100% at 50% 0%, color-mix(in srgb, var(--vp-c-brand-2) 15%, transparent), transparent);
}

.background-grid {
  position: absolute;
  inset: 0;
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

.hero-trust {
  display: flex;
  block-size: min-content;
  align-items: center;
  gap: 32px;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid color-mix(in srgb, var(--vp-c-brand-2) 10%, transparent);
  width: fit-content;

  --icon-color: var(--vp-c-brand-3);
}

@media screen and (max-width: 768px) {
  .hero-trust {
    width: initial;
  }
}

html.dark .hero-trust {
  --icon-color: var(--vp-c-brand-1);
}

@media screen and (max-width: 600px) {
  .hero-trust {
    flex-direction: column;
    gap: 0.75rem;
  }

  .trust-divider {
    display: none;
  }
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  color: var(--hp-text-muted);
}

.trust-item svg {
  color: var(--icon-color);
  flex-shrink: 0;
}

.trust-item strong {
  color: var(--vp-c-text-1);
  font-weight: 700;
}

</style>
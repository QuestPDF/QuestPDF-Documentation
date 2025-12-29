<script setup>

</script>

<template>
  <div class="hero-image" ref="heroImage">
    <div class="hero-image-page">
      <!-- Header section -->
      <div class="skeleton-row">
        <div class="skeleton skeleton-logo" style="--delay: 0"></div>
        <div class="skeleton-header-right">
          <div class="skeleton skeleton-text-header" style="--delay: 1; width: 60%"></div>
          <div class="skeleton skeleton-text-header" style="--delay: 2; width: 45%"></div>
        </div>
      </div>

      <!-- Title section -->
      <div class="skeleton-section">
        <div class="skeleton skeleton-text-title" style="--delay: 3"></div>
      </div>

      <!-- Invoice details - two columns -->
      <div style="display: grid; grid-template-columns: 1fr 1fr;">
        <div class="skeleton-details-col">
          <div class="skeleton skeleton-text-header" style="--delay: 4; width: 40%"></div>
          <div class="skeleton skeleton-text" style="--delay: 5; width: 70%"></div>
          <div class="skeleton skeleton-text" style="--delay: 6; width: 55%"></div>
        </div>
        <div class="skeleton-details-col">
          <div class="skeleton skeleton-text-header" style="--delay: 7; width: 35%"></div>
          <div class="skeleton skeleton-text" style="--delay: 8; width: 65%"></div>
          <div class="skeleton skeleton-text" style="--delay: 9; width: 50%"></div>
        </div>
      </div>

      <!-- Table header -->
      <div style="display: grid; grid-template-columns: 1fr 4fr 6fr 2fr; gap: 12px 16px;">
        <div v-for="c of 4" class="skeleton skeleton-text-header" :style="{ '--delay': 11 + c }" />

        <template v-for="r of 4">
          <div v-for="c of 4" class="skeleton skeleton-text" :style="{ '--delay': 11 + r + c }" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* PDF Animation */

.hero-image {
  display: flex;
  align-content: center;
  flex-direction: column;
  margin-bottom: -350px;
  position: relative;
}

/* Decorative gradient orb behind the page */
.hero-image::before {
  content: "";
  position: absolute;
  width: 120%;
  height: 80%;
  top: 15%;
  left: -10%;
  background: radial-gradient(
      ellipse 50% 50% at 50% 50%,
      color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent) 0%,
      color-mix(in srgb, var(--vp-c-brand-2) 8%, transparent) 40%,
      transparent 70%
  );
  filter: blur(40px);
  z-index: -1;
  animation: hero-orb-pulse 6s ease-in-out infinite;
}

@keyframes hero-orb-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.hero-image-page {
  position: relative;
  aspect-ratio: 7 / 10;
  border-radius: 12px;
  overflow: hidden;
  padding: 7%;
  display: flex;
  flex-direction: column;
  gap: 5%;

  /* Modern layered background */
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);

  /* Subtle inner border */
  box-shadow:
    /* Inner highlight */
      inset 0 1px 0 0 rgba(255, 255, 255, 0.8),
      inset 0 0 0 1px rgba(0, 0, 0, 0.04),
        /* Layered outer shadows */
      0 1px 2px rgba(0, 0, 0, 0.02),
      0 2px 4px rgba(0, 0, 0, 0.02),
      0 4px 8px rgba(0, 0, 0, 0.02),
      0 8px 16px rgba(0, 0, 0, 0.02),
      0 16px 32px rgba(0, 0, 0, 0.03),
      0 32px 64px rgba(0, 0, 0, 0.04),
        /* Brand color glow */
      0 8px 32px color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent),
      0 16px 48px color-mix(in srgb, var(--vp-c-brand-2) 6%, transparent);

  /* Parallax 3D effect */
  transform-style: preserve-3d;
  will-change: transform;
}

/* Decorative corner accents */
.hero-image-page::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  height: 3px;
  background: linear-gradient(
      90deg,
      transparent 0%,
      color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent) 20%,
      var(--vp-c-brand-1) 50%,
      color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent) 80%,
      transparent 100%
  );
  border-radius: 12px 12px 0 0;
  opacity: 0.6;
}

html.dark .hero-image-page {
  opacity: 0.75;
  box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
      inset 0 0 0 1px rgba(0, 0, 0, 0.08),
      0 1px 2px rgba(0, 0, 0, 0.04),
      0 2px 4px rgba(0, 0, 0, 0.04),
      0 4px 8px rgba(0, 0, 0, 0.04),
      0 8px 16px rgba(0, 0, 0, 0.05),
      0 16px 32px rgba(0, 0, 0, 0.06),
      0 32px 64px rgba(0, 0, 0, 0.08),
      0 8px 32px color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent),
      0 16px 48px color-mix(in srgb, var(--vp-c-brand-2) 10%, transparent);
}

html.dark .hero-image-page::before {
  opacity: 0.8;
}

/* Skeleton Styles */

@keyframes skeleton-fade-in {
  0% {
    opacity: 0;
    transform: translateY(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.skeleton {
  border-radius: 8px;

  animation: skeleton-fade-in 0.25s ease-out calc(var(--delay, 0) * 50ms) backwards;
}

.skeleton-logo {
  width: 40px;
  aspect-ratio: 1;
  background-color: #C8C8C8;
}

.skeleton-text-title {
  height: 20px;
  background-color: #C8C8C8;
}

.skeleton-text-header {
  height: 8px;
  background-color: #C8C8C8;
}

.skeleton-text {
  height: 8px;
  background-color: #E0E0E0;
}

/* Layout components */
.skeleton-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.skeleton-header {
  justify-content: space-between;
}

.skeleton-header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex: 1;
}

.skeleton-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.skeleton-details {
  display: flex;
  gap: 10%;
}

.skeleton-details-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

</style>
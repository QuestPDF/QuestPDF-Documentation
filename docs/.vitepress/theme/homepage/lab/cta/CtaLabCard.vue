<script setup lang="ts">
import { ref } from "vue";
import { useLabState } from "./ctaLab";

/* The card frame of HomePageCtaCard.vue (surface, grid, copy, link row, hover ring, halo, glow), copied so
   that each pairing can put a different visual into the left column without touching production. The only
   differences: the visual is a slot, the glow has three strengths, and the hover state can be forced from
   the lab toolbar through a .lab-hover class (every :hover rule below also matches it). */

withDefaults(defineProps<{
  title: string;
  description: string;
  label: string;
  detail?: string;
  href: string;
  accent?: string;
  accentSecondary?: string;

  /* full: the production glow plus the rays; soft: the glow only; none: a flat surface */
  glow?: "full" | "soft" | "none";
}>(), {
  accent: "#0094F9",
  accentSecondary: "#2979FF",
  glow: "soft"
});

const lab = useLabState();
const root = ref<HTMLElement>();
defineExpose({ root });
</script>

<template>
  <a
      ref="root"
      class="panel cta-card cta-lab-card"
      :class="[`glow-${glow}`, { 'lab-hover': lab.forceHover }]"
      :style="{ '--accent': accent, '--accent-secondary': accentSecondary }"
      :href="href">
    <div v-if="glow !== 'none'" class="background-gradient" />

    <div class="visual" aria-hidden="true">
      <slot />
    </div>

    <div class="cta-text">
      <h2 class="card-title">{{ title }}</h2>
      <p class="card-description">{{ description }}</p>

      <span class="cta-link">
        <span class="link-label">{{ label }}</span>
        <span v-if="detail" class="separator">·</span>
        <span class="link-detail">
          <template v-if="detail">{{ detail }}</template>
          <i class="fa-solid fa-arrow-right arrow-icon"></i>
        </span>
      </span>
    </div>
  </a>
</template>

<style>

/* Card */

.custom-page.home-page .panel.cta-lab-card {
  position: relative;
  isolation: isolate;
  overflow: hidden;

  display: grid;
  grid-template-columns: 38% minmax(0, 1fr);
  column-gap: 32px;
  align-items: center;
  min-height: 256px;
  padding: 32px;

  color: var(--vp-c-text-1);
  text-decoration: none;

  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.custom-page.home-page .panel.cta-lab-card:is(:hover, .lab-hover) {
  color: var(--vp-c-text-1);
  transform: translateY(-3px);
  box-shadow: var(--accent-halo);
  background-color: color-mix(in srgb, var(--home-surface), #FFF 20%);
}

html.dark .custom-page.home-page .panel.cta-lab-card:is(:hover, .lab-hover) {
  box-shadow: var(--elevation-hover), var(--accent-halo);
  background-color: rgba(255, 255, 255, 0.07);
}

.cta-lab-card:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}


/* Hover ring and halo (as in production) */

@property --cta-lab-ring-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.cta-lab-card {
  --accent-halo:
      0 1px 2px rgba(16, 24, 40, 0.04),
      0 13px 27px -5px color-mix(in srgb, var(--accent) 18%, transparent),
      0 8px 16px -8px color-mix(in srgb, var(--accent) 24%, transparent);
  --accent-text: color-mix(in srgb, var(--accent-secondary) 85%, #000);
}

html.dark .cta-lab-card {
  --accent-halo: 0 0 48px -16px color-mix(in srgb, var(--accent) 50%, transparent);
  --accent-text: color-mix(in srgb, var(--accent) 75%, #FFF);
}

.cta-lab-card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 20;
  border-radius: inherit;
  padding: 2px;
  pointer-events: none;

  --ring-base: color-mix(in srgb, var(--accent) 22%, transparent);
  --ring-peak: var(--accent);
  background: conic-gradient(
      from var(--cta-lab-ring-angle),
      var(--ring-base) 0deg,
      var(--accent-secondary) 24deg,
      var(--ring-peak) 40deg,
      var(--ring-base) 72deg,
      var(--ring-base) 120deg,
      var(--accent-secondary) 144deg,
      var(--ring-peak) 160deg,
      var(--ring-base) 192deg,
      var(--ring-base) 240deg,
      var(--accent-secondary) 264deg,
      var(--ring-peak) 280deg,
      var(--ring-base) 312deg,
      var(--ring-base) 360deg);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;

  opacity: 0;
  transition: opacity 0.35s ease;
}

html.dark .cta-lab-card::after {
  --ring-peak: color-mix(in srgb, var(--accent) 80%, #FFF);
}

.cta-lab-card:is(:hover, .lab-hover, :focus-visible)::after {
  opacity: 0.75;
  animation: cta-lab-ring-spin 12s linear infinite;
}

@keyframes cta-lab-ring-spin {
  to {
    --cta-lab-ring-angle: 360deg;
  }
}


/* Text column */

.cta-lab-card .cta-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.cta-lab-card .cta-text .card-description {
  text-wrap: pretty;
}

.cta-lab-card .cta-link {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 8px;
  margin-top: 20px;

  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--accent-text);
}

.cta-lab-card .link-label,
.cta-lab-card .link-detail {
  white-space: nowrap;
}

.cta-lab-card .link-detail {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.cta-lab-card .cta-link .separator {
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.cta-lab-card .arrow-icon {
  font-size: 14px;
  transition: transform 0.25s ease;
}

.cta-lab-card:is(:hover, .lab-hover, :focus-visible) .arrow-icon {
  transform: translateX(4px);
}


/* Visual column: the slot fills it; each visual decides what it draws */

.cta-lab-card .visual {
  position: relative;
  min-width: 0;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
}


/* Glow: the production glow from the top-left corner; "full" adds the rays, "soft" leaves them out */

.cta-lab-card {
  --rays-centre: -90px;
}

.cta-lab-card .background-gradient {
  position: absolute;
  pointer-events: none;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  overflow: hidden;
  background-image:
      radial-gradient(ellipse 70% 90% at 18% 0%, color-mix(in srgb, var(--accent) 13%, transparent), transparent),
      radial-gradient(ellipse 40% 50% at 18% 0%, color-mix(in srgb, var(--accent-secondary) 6%, transparent), transparent);
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.cta-lab-card:is(:hover, .lab-hover, :focus-visible) .background-gradient {
  opacity: 1;
}

.cta-lab-card.glow-full .background-gradient::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: repeating-conic-gradient(
      from 0deg at 20% var(--rays-centre),
      transparent 0deg,
      color-mix(in srgb, var(--accent) 2.5%, transparent) 9deg,
      transparent 18deg);
  mask-image: radial-gradient(circle 420px at 20% var(--rays-centre), #000, transparent 100%);
  -webkit-mask-image: radial-gradient(circle 420px at 20% var(--rays-centre), #000, transparent 100%);
}


/* Play button shared by the video visuals: the production button, without the fan offset */

.cta-lab-card .play-button {
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;

  background-color: var(--accent-secondary);
  color: #FFF;
  box-shadow:
      0 0 0 6px color-mix(in srgb, var(--accent-secondary) 22%, transparent),
      0 8px 20px -4px color-mix(in srgb, var(--accent-secondary) 60%, transparent);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.cta-lab-card .play-button i {
  font-size: 18px;
  margin-left: 3px;
  color: #FFF;
}

.cta-lab-card:is(:hover, .lab-hover, :focus-visible) .play-button {
  transform: scale(1.08);
}

/* a sheet of paper: white, a hairline, dimmed a little on the dark theme so it is not the brightest thing on the page */
.cta-lab-card .paper {
  background: #FFF;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.10);
}

html.dark .cta-lab-card .paper {
  background: #F4F4F6;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06);
}

html.dark .cta-lab-card .paper img {
  opacity: 0.92;
}


/* Narrow desktop and compact */

@media screen and (max-width: 1280px) and (min-width: 901px) {
  .custom-page.home-page .panel.cta-lab-card {
    grid-template-columns: 34% minmax(0, 1fr);
    column-gap: 24px;
    padding: 28px;
  }
}

@media screen and (max-width: 700px) {
  .custom-page.home-page .panel.cta-lab-card {
    grid-template-columns: 72px minmax(0, 1fr);
    grid-template-areas:
        "visual title"
        "text text"
        "link link";
    column-gap: 16px;
    row-gap: 12px;
    align-items: center;
    min-height: 0;
    padding: 20px;
  }

  .cta-lab-card .visual {
    grid-area: visual;
    align-self: center;
    width: 72px;
    height: 72px;
  }

  .cta-lab-card .cta-text {
    display: contents;
  }

  .cta-lab-card .cta-text .card-title {
    grid-area: title;
    font-size: 1.25rem;
    line-height: 1.625rem;
  }

  .cta-lab-card .cta-text .card-description {
    grid-area: text;
    margin-top: 0;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .cta-lab-card .cta-link {
    grid-area: link;
    margin-top: 0;
    font-size: 0.9375rem;
  }

  .cta-lab-card .background-gradient {
    background-image:
        radial-gradient(ellipse 70% 90% at 0% 0%, color-mix(in srgb, var(--accent) 13%, transparent), transparent);
  }

  .cta-lab-card .background-gradient::before {
    content: none;
  }

  /* every visual carries a .thumb for this state: one 72px tile, nothing else */
  .cta-lab-card .visual > * {
    min-height: 0;
  }

  .cta-lab-card .visual > * > :not(.thumb) {
    display: none !important;
  }

  .cta-lab-card .visual .thumb {
    position: relative;
  }

  .cta-lab-card .visual .thumb {
    display: block;
    width: 72px;
    height: 72px;
    border-radius: 12px;
    overflow: hidden;
  }

  .cta-lab-card .visual .thumb img {
    display: block;
    width: 72px;
    height: 72px;
    object-fit: cover;
    object-position: top left;
  }

  .cta-lab-card .thumb .play-button {
    width: 28px;
    height: 28px;
    top: 22px;
    left: 22px;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-secondary) 22%, transparent);
  }

  .cta-lab-card .thumb .play-button i {
    font-size: 10px;
    margin-left: 2px;
  }
}

@media screen and (min-width: 701px) {
  .cta-lab-card .visual .thumb {
    display: none;
  }
}


/* Reduced motion, real or simulated: the frame stops moving; each visual handles its own motion */

@media (prefers-reduced-motion: reduce) {
  .custom-page.home-page .panel.cta-lab-card,
  .custom-page.home-page .panel.cta-lab-card:is(:hover, .lab-hover) {
    transform: none;
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
  }

  .cta-lab-card:is(:hover, .lab-hover, :focus-visible)::after {
    animation: none;
  }

  .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .arrow-icon,
  .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .play-button {
    transform: none;
  }
}

.cta-lab.reduce-motion .custom-page.home-page .panel.cta-lab-card,
.cta-lab.reduce-motion .custom-page.home-page .panel.cta-lab-card:is(:hover, .lab-hover) {
  transform: none;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
}

.cta-lab.reduce-motion .cta-lab-card:is(:hover, .lab-hover, :focus-visible)::after {
  animation: none;
}

.cta-lab.reduce-motion .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .arrow-icon,
.cta-lab.reduce-motion .cta-lab-card:is(:hover, .lab-hover, :focus-visible) .play-button {
  transform: none;
}

</style>

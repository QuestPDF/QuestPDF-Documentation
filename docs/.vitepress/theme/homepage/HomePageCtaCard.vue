<script setup lang="ts">
import { computed, ref } from "vue";

/* A call to action under the hero: one link with a visual (the "visual" slot) and the pitch. It is `active`
   while hovered or keyboard-focused (a click's focus does not count: the click navigates anyway); the slot
   gets `active` too, so the visual plays its hover. */

withDefaults(defineProps<{
  title: string;
  description: string;

  /* the link row at the bottom: "label →" */
  label: string;
  href: string;

  /* the glow behind the visual and the colour of the link row */
  accent?: string;
  accentSecondary?: string;
}>(), {
  accent: "#0094F9",
  accentSecondary: "#2979FF"
});

const hovered = ref(false);
const focused = ref(false);
const active = computed(() => hovered.value || focused.value);

function onFocus(event: FocusEvent) {
  focused.value = (event.target as Element).matches(":focus-visible");
}
</script>

<template>
  <a
      class="panel cta-card"
      :class="{ active }"
      :style="{ '--accent': accent, '--accent-secondary': accentSecondary }"
      :href="href"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
      @focus="onFocus"
      @blur="focused = false">
    <div class="background-gradient" />

    <!-- the visual is decoration: the link is named by its text -->
    <div class="visual" aria-hidden="true">
      <slot name="visual" :active="active" />
    </div>

    <div class="cta-text">
      <h2 class="card-title">{{ title }}</h2>
      <p class="card-description">{{ description }}</p>

      <span class="cta-link">
        {{ label }}
        <i class="fa-solid fa-arrow-right arrow-icon"></i>
      </span>
    </div>
  </a>
</template>

<style scoped>

.cta-card {
  isolation: isolate; /* keeps the gradient (z-index: -1) above the panel background but below the content */
  overflow: hidden; /* a visual that runs past its column is clipped at the card's rounded edge */

  display: grid;
  grid-template-columns: 38% minmax(0, 1fr);
  column-gap: 32px;
  align-items: center;
  min-height: 256px;
  padding: 32px;

  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.cta-card.active {
  transform: translateY(-3px);
  box-shadow: var(--accent-halo);
  background-color: color-mix(in srgb, var(--surface), #FFF 20%);
}

html.dark .cta-card.active {
  box-shadow: var(--elevation-hover), var(--accent-halo);
  background-color: rgba(255, 255, 255, 0.07);
}

.cta-card:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}


/* Hover ring: an ::after over the card, its conic gradient masked to the outer 2px (like the panel rim), with
   three highlights travelling round. The start angle is a registered property so it can be animated; without
   @property the ring just stands still. */

@property --cta-ring-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.cta-card {
  /* light theme: an accent-tinted lift shadow replaces the resting edge (a grey shadow under a blue glow reads
     muddy, and the grey hairline would show through the ring) */
  --accent-halo:
      0 1px 2px rgba(16, 24, 40, 0.04),
      0 13px 27px -5px color-mix(in srgb, var(--accent) 18%, transparent),
      0 8px 16px -8px color-mix(in srgb, var(--accent) 24%, transparent);

  /* the accent is a glow colour: as text it is darkened on the light theme and lightened on the dark one */
  --accent-text: color-mix(in srgb, var(--accent-secondary) 85%, #000);
}

html.dark .cta-card {
  /* dark theme: a soft glow of the accent over the usual lift shadow */
  --accent-halo: 0 0 48px -16px color-mix(in srgb, var(--accent) 50%, transparent);
  --accent-text: color-mix(in srgb, var(--accent) 75%, #FFF);
}

.cta-card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 20;
  border-radius: inherit;
  padding: 2px;
  pointer-events: none;

  /* a faint tint all round and three accent arcs, 120deg apart; the peaks lighten on the dark theme */
  --ring-base: color-mix(in srgb, var(--accent) 22%, transparent);
  --ring-peak: light-dark(var(--accent), color-mix(in srgb, var(--accent) 80%, #FFF));
  background: conic-gradient(
      from var(--cta-ring-angle),
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
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;

  opacity: 0;
  transition: opacity 0.35s ease;
}

/* the ring never reaches full strength: it should invite, not shout */
.cta-card.active::after {
  opacity: 0.75;
  animation: cta-ring-spin 12s linear infinite;
}

@keyframes cta-ring-spin {
  to {
    --cta-ring-angle: 360deg;
  }
}


.cta-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.cta-text .card-description {
  text-wrap: pretty;
}

.cta-link {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  margin-top: 20px;

  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--accent-text);
}

.arrow-icon {
  font-size: 14px;
  transition: transform 0.25s ease;
}

.cta-card.active .arrow-icon {
  transform: translateX(4px);
}


.visual {
  position: relative;
  min-width: 0;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
}


/* a glow in the accent colour behind the visual, a little brighter on hover */

.background-gradient {
  position: absolute;
  pointer-events: none;
  inset: 0;
  z-index: -1;
  background-image:
      radial-gradient(ellipse 70% 90% at 18% 0%, color-mix(in srgb, var(--accent) 13%, transparent), transparent),
      radial-gradient(ellipse 40% 50% at 18% 0%, color-mix(in srgb, var(--accent-secondary) 6%, transparent), transparent);
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.cta-card.active .background-gradient {
  opacity: 1;
}

/* light theme: centred behind the visual, whose column is 38% of the width after the 32px padding: its
   centre is at 32px + 19% of (width - 64px) = 19% + 20px */
html:not(.dark) .background-gradient {
  background-image:
      radial-gradient(ellipse 28% 60% at calc(19% + 20px) 50%, color-mix(in srgb, var(--accent) 16%, transparent), transparent),
      radial-gradient(ellipse 18% 36% at calc(19% + 20px) 50%, color-mix(in srgb, var(--accent-secondary) 7%, transparent), transparent);
}


/* narrow cards between the stacking point (HomePage.vue) and the full width: more room for the text */
@media screen and (max-width: 1280px) and (min-width: 1181px) {
  .cta-card {
    grid-template-columns: 34% minmax(0, 1fr);
    column-gap: 24px;
    padding: 28px;
  }
}


/* Compact: below 700px the visual is a thumbnail beside the title, so the card stays short */

@media screen and (max-width: 700px) {
  .cta-card {
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

  .visual {
    grid-area: visual;
    align-self: center;
  }

  /* the text column dissolves, so the title can sit beside the thumbnail */
  .cta-text {
    display: contents;
  }

  .cta-text .card-title {
    grid-area: title;
    font-size: 1.25rem;
    line-height: 1.625rem;
  }

  .cta-text .card-description {
    grid-area: text;
    margin-top: 0;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .cta-link {
    grid-area: link;
    margin-top: 0;
    font-size: 0.9375rem;
  }

  .background-gradient {
    background-image:
        radial-gradient(ellipse 70% 90% at 0% 0%, color-mix(in srgb, var(--accent) 13%, transparent), transparent);
  }

  /* the thumbnail is 72px wide after 20px of padding */
  html:not(.dark) .background-gradient {
    background-image:
        radial-gradient(ellipse 80px 80px at 56px 50%, color-mix(in srgb, var(--accent) 16%, transparent), transparent);
  }
}


/* Reduced motion: hover changes colour, opacity and shadow only */

@media (prefers-reduced-motion: reduce) {
  .cta-card,
  .cta-card.active {
    transform: none;
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
  }

  /* the ring still lights up, but its highlights stay where they are */
  .cta-card.active::after {
    animation: none;
  }

  .cta-card.active .arrow-icon {
    transform: none;
  }
}

</style>

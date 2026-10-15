<script setup lang="ts">
/* One of the two calls to action right under the hero: a card that is a single link, with an animated
   visual on the left and the pitch on the right, ending in a text link row in the card's accent colour.

   The visual comes from the "visual" slot: the intro-video card fills it with the 3D invoice build
   (HomePageCtaBuildVisual.vue), the sample-gallery card with the 3D pile of sample pages
   (HomePageCtaDeckVisual.vue). Each runs its own entrance and hover and listens for them on this card. */

withDefaults(defineProps<{
  title: string;
  description: string;

  /* the link row at the bottom: "label · detail →"; the detail (duration, sample count) is optional */
  label: string;
  detail?: string;
  href: string;
  external?: boolean;

  /* the glow behind the visual and the colour of the link row */
  accent?: string;
  accentSecondary?: string;
}>(), {
  external: false,
  accent: "#0094F9",
  accentSecondary: "#2979FF"
});
</script>

<template>
  <a
      class="panel cta-card"
      :style="{ '--accent': accent, '--accent-secondary': accentSecondary }"
      :href="href"
      :target="external ? '_blank' : undefined"
      :rel="external ? 'noopener' : undefined">
    <div class="background-gradient" />

    <!-- the visual is decoration: the link is named by its text -->
    <div class="visual" aria-hidden="true">
      <slot name="visual" />
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

<style scoped>

/* Card: a link styled as a panel; the visual takes the left 38%, the text the rest */

.custom-page.home-page .panel.cta-card {
  position: relative;
  isolation: isolate; /* keeps the gradient (z-index: -1) above the panel background but below the content */
  overflow: hidden; /* a visual that runs past its column is clipped at the card's rounded edge */

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

/* the generic link hover (.custom-page a:not(.action):hover) would recolour the whole card */
.custom-page.home-page .panel.cta-card:hover {
  color: var(--vp-c-text-1);
  transform: translateY(-3px);
  box-shadow: var(--accent-halo);
  background-color: color-mix(in srgb, var(--home-surface), #FFF 20%);
}

html.dark .custom-page.home-page .panel.cta-card:hover {
  box-shadow: var(--elevation-hover), var(--accent-halo);
  background-color: rgba(255, 255, 255, 0.07);
}

.cta-card:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}


/* Hover ring: the card's edge lights up in the accent colours while the pointer rests on it, with three
   brighter highlights travelling around the edge, and a soft halo in the same colour spreads under the
   card. The ring is an ::after covering the card, its conic gradient masked to the outer 2px (the same
   technique as the glass rim in CustomPages.css); it sits above the visual, so a visual reaching the
   card's edge runs under it. The gradient's start angle is a registered property, so it can be animated;
   a browser without @property shows the ring without the motion. */

@property --cta-ring-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.cta-card {
  /* light theme: the lift shadow itself is tinted with the accent and replaces the resting edge; the grey
     lift shadow and a blue glow stacked on the pale page turned into a muddy smear under the card, and the
     1px grey inset line showed through the ring. The upward part of --elevation-hover is left out. */
  --accent-halo:
      0 1px 2px rgba(16, 24, 40, 0.04),
      0 13px 27px -5px color-mix(in srgb, var(--accent) 18%, transparent),
      0 8px 16px -8px color-mix(in srgb, var(--accent) 24%, transparent);
}

html.dark .cta-card {
  /* dark theme: a soft glow of the accent, over the usual lift shadow */
  --accent-halo: 0 0 48px -16px color-mix(in srgb, var(--accent) 50%, transparent);
}

.cta-card::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 20;
  border-radius: inherit;
  padding: 2px;
  pointer-events: none;

  /* a faint tint all the way round, and three arcs of the accent colours spaced evenly (every 120deg);
     the peak of each arc is lightened a little on the dark theme, where a tint of white reads as light */
  --ring-base: color-mix(in srgb, var(--accent) 22%, transparent);
  --ring-peak: var(--accent);
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
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;

  opacity: 0;
  transition: opacity 0.35s ease;
}

html.dark .cta-card::after {
  --ring-peak: color-mix(in srgb, var(--accent) 80%, #FFF);
}

/* the ring never reaches full strength: it should invite, not shout */
.cta-card:hover::after,
.cta-card:focus-visible::after {
  opacity: 0.75;
  animation: cta-ring-spin 12s linear infinite;
}

@keyframes cta-ring-spin {
  to {
    --cta-ring-angle: 360deg;
  }
}


/* Text column: the title, the pitch, then the link row in the accent colour */

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
  flex-wrap: wrap; /* on a narrow card the detail moves to its own line; the arrow stays with it */
  align-items: center;
  column-gap: 8px;
  margin-top: 20px;

  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--accent-text);
}

.link-label,
.link-detail {
  white-space: nowrap;
}

.link-detail {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* the accent is a glow colour; as text it is darkened on the light theme and lightened on the dark
   one, so the link row stays readable on both */
.cta-card {
  --accent-text: color-mix(in srgb, var(--accent-secondary) 85%, #000);
}

html.dark .cta-card {
  --accent-text: color-mix(in srgb, var(--accent) 75%, #FFF);
}

.cta-link .separator {
  color: var(--vp-c-text-3);
  font-weight: 400;
}

/* .custom-page .fa-solid paints every icon brand blue (CustomPages.css); the arrow must follow the
   card's own accent, like the label next to it */
.cta-card .arrow-icon {
  font-size: 14px;
  color: var(--accent-text);
  transition: transform 0.25s ease;
}

.cta-card:hover .arrow-icon,
.cta-card:focus-visible .arrow-icon {
  transform: translateX(4px);
}


/* Visual: the slot's content, centred in its column */

.visual {
  position: relative;
  min-width: 0;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
}


/* Background: a glow in the accent colour from the top-left corner, behind the visual. The glow
   brightens a little on hover. */

.background-gradient {
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

.cta-card:hover .background-gradient,
.cta-card:focus-visible .background-gradient {
  opacity: 1;
}

/* light theme: the glow is centred behind the visual rather than in the card's top-left corner.
   The visual's column is 38% of the content width after the 32px padding, so its centre sits at
   32px + 19% of (width - 64px) = 19% + 20px */
html:not(.dark) .background-gradient {
  background-image:
      radial-gradient(ellipse 28% 60% at calc(19% + 20px) 50%, color-mix(in srgb, var(--accent) 16%, transparent), transparent),
      radial-gradient(ellipse 18% 36% at calc(19% + 20px) 50%, color-mix(in srgb, var(--accent-secondary) 7%, transparent), transparent);
}


/* Between the stacking point and the full width the cards are narrow, so the visual gives the text
   a little more room */
@media screen and (max-width: 1280px) and (min-width: 901px) {
  .custom-page.home-page .panel.cta-card {
    grid-template-columns: 34% minmax(0, 1fr);
    column-gap: 24px;
    padding: 28px;
  }
}


/* Compact: below 700px the visual shrinks to an icon-sized thumbnail beside the title, so the card
   stays short and the code panel is not pushed too far down */

@media screen and (max-width: 700px) {
  .custom-page.home-page .panel.cta-card {
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

  /* the title leaves the text column to sit beside the thumbnail; the rest of the column follows below */
  .cta-text {
    display: contents;
  }

  .cta-text .card-title {
    grid-area: title;
  }

  .cta-text .card-description {
    grid-area: text;
    margin-top: 0;
  }

  .cta-link {
    grid-area: link;
    margin-top: 0;
  }

  .cta-text .card-title {
    font-size: 1.25rem;
    line-height: 1.625rem;
  }

  .cta-text .card-description {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .cta-link {
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


/* Reduced motion: nothing moves; hover and entrance change colour, opacity and shadow only */

@media (prefers-reduced-motion: reduce) {
  .custom-page.home-page .panel.cta-card,
  .custom-page.home-page .panel.cta-card:hover {
    transform: none;
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
  }

  /* the ring still lights up, but its highlights stay where they are */
  .cta-card:hover::after,
  .cta-card:focus-visible::after {
    animation: none;
  }

  .arrow-icon {
    transition: opacity 0.3s ease, box-shadow 0.3s ease;
  }

  .cta-card:hover .arrow-icon,
  .cta-card:focus-visible .arrow-icon {
    transform: none;
  }
}

</style>

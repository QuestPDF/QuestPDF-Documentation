<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

/* One of the two calls to action right under the hero: a card that is a single link, with an animated
   set of document pages on the left and the pitch on the right, ending in a text link row in the card's
   accent colour. Two visuals:

   - "video": a fan of pages with a play button and a duration badge on top, for the intro video.
     The fan opens a little further while the pointer rests on the card and the play button grows.
   - "gallery": a coverflow row of three pages, the centre one largest. While the pointer rests on the
     card, the row slides one page to the left every few seconds, as if the reader were browsing;
     the leftmost page fades out, the next one slides in from the right. Needs at least four pages.

   Both visuals rest closed (pages stacked on top of each other) until the card scrolls into view, then
   open once, through the same transitions as the hover spread. Under prefers-reduced-motion nothing
   moves: the pages sit open from the start and hover only changes colours and shadows. */

const props = withDefaults(defineProps<{
  title: string;
  description: string;

  /* the link row at the bottom: "label · detail →"; the detail (duration, sample count) is optional */
  label: string;
  detail?: string;
  href: string;
  external?: boolean;

  /* pages shown, first one in front (video) or in the centre (gallery); at least two */
  images: string[];
  variant?: "video" | "gallery";

  /* the badge on the video thumbnail, e.g. "10 min" */
  badge?: string;

  /* the glow behind the pages and the colour of the link row */
  accent?: string;
  accentSecondary?: string;
}>(), {
  variant: "video",
  external: false,
  accent: "#0094F9",
  accentSecondary: "#2979FF"
});

/* the first step follows the pointer quickly, so the card reacts to being hovered, the later ones
   keep a browsing pace */
const FIRST_STEP_DELAY = 350;
const STEP_INTERVAL = 2500;

const root = ref<HTMLElement>();
const entered = ref(false);
const active = ref(0);

/* whether the row has moved at least once; the leave animation only makes sense for a page that
   has just left, not for the ones hidden from the start */
const stepped = ref(false);

let timer: ReturnType<typeof setTimeout> | undefined;
let observer: IntersectionObserver | undefined;

/* video: slot 0 is the front page, slots 1 to 3 fan out behind it, the rest stay hidden.
   gallery: the centre page and one to each side; the page that just left on the left fades out, then
   jumps (invisible) to the right end, where it waits to slide in again */
const FAN_VISIBLE_PAGES = 4;
const ROW_REACH = 1;

const slotClass = computed(() => props.images.map((_, index) => {
  const count = props.images.length;
  const slot = (index - active.value + count) % count;

  if (props.variant === "gallery") {
    const signed = slot > count / 2 ? slot - count : slot;
    if (Math.abs(signed) <= ROW_REACH) return `row-slot-${signed < 0 ? "m" : ""}${Math.abs(signed)}`;
    return "row-hidden";
  }

  return slot < FAN_VISIBLE_PAGES ? `fan-slot-${slot}` : "fan-hidden";
}));

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function startBrowsing() {
  if (props.variant !== "gallery" || props.images.length < 4 || timer || reducedMotion())
    return;

  const step = () => {
    active.value = (active.value + 1) % props.images.length;
    stepped.value = true;
    timer = setTimeout(step, STEP_INTERVAL);
  };

  timer = setTimeout(step, FIRST_STEP_DELAY);
}

function stopBrowsing() {
  if (!timer)
    return;

  clearTimeout(timer);
  timer = undefined;
}

onMounted(() => {
  /* no entrance animation without motion, or without the observer: the pages sit open from the start */
  if (reducedMotion() || !("IntersectionObserver" in window) || !root.value) {
    entered.value = true;
    return;
  }

  /* a card already on screen (the usual case right under the hero) opens on the next frame, so the
     entrance does not wait for the observer's first callback; the observer covers cards further down */
  const rect = root.value.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
    requestAnimationFrame(() => requestAnimationFrame(() => entered.value = true));
    return;
  }

  observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting))
      return;

    entered.value = true;
    observer?.disconnect();
    observer = undefined;
  }, { threshold: 0.4 });

  observer.observe(root.value);
});

onBeforeUnmount(() => {
  stopBrowsing();
  observer?.disconnect();
});
</script>

<template>
  <a
      ref="root"
      class="panel cta-card"
      :class="[`variant-${variant}`, { entered, stepped }]"
      :style="{ '--accent': accent, '--accent-secondary': accentSecondary }"
      :href="href"
      :target="external ? '_blank' : undefined"
      :rel="external ? 'noopener' : undefined"
      @mouseenter="startBrowsing"
      @mouseleave="stopBrowsing"
      @focus="startBrowsing"
      @blur="stopBrowsing">
    <div class="background-gradient" />

    <!-- the pages are decoration: the link is named by its text -->
    <div class="visual" aria-hidden="true">
      <div class="page-stack">
        <div
            v-for="(image, index) of images"
            :key="image"
            class="page-card"
            :class="slotClass[index]">
          <img :src="image" alt="" loading="lazy" />
        </div>

        <template v-if="variant === 'video'">
          <span class="play-button">
            <i class="fa-solid fa-play"></i>
          </span>

          <span v-if="badge" class="badge">{{ badge }}</span>
        </template>
      </div>
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

/* Card: a link styled as a panel; the pages take the left 38%, the text the rest */

.custom-page.home-page .panel.cta-card {
  position: relative;
  isolation: isolate; /* keeps the gradient (z-index: -1) above the panel background but below the content */
  overflow: hidden; /* the gallery row runs past its column; it is clipped at the card's rounded edge */

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
  box-shadow: var(--home-surface-edge), var(--elevation-hover);
  background-color: color-mix(in srgb, var(--home-surface), #FFF 20%);
}

html.dark .custom-page.home-page .panel.cta-card:hover {
  box-shadow: var(--elevation-hover);
  background-color: rgba(255, 255, 255, 0.07);
}

.cta-card:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
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

.arrow-icon {
  font-size: 14px;
  transition: transform 0.25s ease;
}

.cta-card:hover .arrow-icon,
.cta-card:focus-visible .arrow-icon {
  transform: translateX(4px);
}


/* Pages, shared by both visuals */

.visual {
  position: relative;
  min-width: 0;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-stack {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 192px;
  perspective: 1000px;
}

.page-card {
  position: absolute;
  background: white;
  border-radius: 6px;
  overflow: hidden;

  box-shadow:
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      0 8px 12px -3px rgba(0, 0, 0, 0.06),
      0 16px 20px -6px rgba(0, 0, 0, 0.05);
  transition:
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.4s ease,
      box-shadow 0.3s ease;
}

html:not(.dark) .page-card {
  border: 1px solid #0004;
}

.page-card img {
  display: block;
  width: 118px;
  height: auto;
}

.cta-card:hover .page-card {
  box-shadow:
      0 4px 8px -2px rgba(0, 0, 0, 0.07),
      0 12px 18px -4px rgba(0, 0, 0, 0.07),
      0 20px 28px -8px rgba(0, 0, 0, 0.06);
}


/* Video: a fan of pages; the places a page can be, four fanned out from the front, the rest hidden
   exactly behind the last fanned page. Before the card has scrolled into view every page sits on the
   front one, so the fan opens once as the card enters. */

.variant-video .page-card {
  transform: translateX(-8px) translateY(4px) rotate(0deg);
}

.variant-video.entered {
  .fan-slot-0 {
    transform: translateX(-34px) translateY(17px) rotate(-4deg);
  }

  .fan-slot-1 {
    transform: translateX(-7px) translateY(3px) rotate(1deg);
  }

  .fan-slot-2 {
    transform: translateX(20px) translateY(-10px) rotate(6deg);
  }

  .fan-slot-3,
  .fan-hidden {
    transform: translateX(45px) translateY(-23px) rotate(11deg);
  }
}

/* with only two pages there is no fan to hide behind, so the second page peeks out properly */
.variant-video.entered .fan-slot-1:nth-last-child(1 of .page-card) {
  transform: translateX(25px) translateY(-12px) rotate(6deg);
}

.fan-slot-0 { z-index: 5; }
.fan-slot-1 { z-index: 4; }
.fan-slot-2 { z-index: 3; }
.fan-slot-3 { z-index: 2; }

.fan-hidden {
  opacity: 0;
  z-index: 0;
  pointer-events: none;
}

/* on hover the fan opens a little further */
.variant-video.entered:is(:hover, :focus-visible) {
  .fan-slot-0 {
    transform: translateX(-45px) translateY(22px) rotate(-6deg);
  }

  .fan-slot-1 {
    transform: translateX(-11px) translateY(6px) rotate(1deg);
  }

  .fan-slot-2 {
    transform: translateX(27px) translateY(-14px) rotate(8deg);
  }

  .fan-slot-3,
  .fan-hidden {
    transform: translateX(59px) translateY(-30px) rotate(14deg);
  }

  .fan-slot-1:nth-last-child(1 of .page-card) {
    transform: translateX(38px) translateY(-19px) rotate(8deg);
  }
}

/* the play button sits on the front page, the badge in its corner; both follow the front page's
   resting offset, not its hover offset, so they stay put while the fan opens */
.play-button {
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

  transform: translateX(-34px) translateY(17px) scale(0.6);
  opacity: 0;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s, opacity 0.3s ease 0.2s;
}

/* the colour is set on the glyph itself: the page-wide rule that paints every solid icon brand blue
   (.custom-page .fa-solid in CustomPages.css) would otherwise hide the triangle on the blue disc */
.play-button i {
  font-size: 18px;
  margin-left: 3px; /* optical centring of the triangle */
  color: #FFF;
}

.variant-video.entered .play-button {
  transform: translateX(-34px) translateY(17px) scale(1);
  opacity: 1;
}

.variant-video.entered:is(:hover, :focus-visible) .play-button {
  transform: translateX(-34px) translateY(17px) scale(1.08);
  transition-delay: 0s;
}

.badge {
  position: absolute;
  z-index: 10;
  right: calc(50% - 59px + 34px - 6px); /* the front page's right edge (118px wide, shifted 34px left), inset 6px */
  bottom: calc(50% - 83px - 17px + 6px); /* its bottom edge (167px tall, shifted 17px down), inset 6px */
  padding: 3px 7px;
  border-radius: 6px;

  background-color: rgba(0, 0, 0, 0.72);
  color: #FFF;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  letter-spacing: 0.01em;

  opacity: 0;
  transition: opacity 0.3s ease 0.4s;
}

.variant-video.entered .badge {
  opacity: 1;
}


/* Gallery: a coverflow of three pages. The centre page stands upright and largest; the pages to each
   side are smaller, turned towards the centre and pushed back. Positions are driven by custom
   properties so that the entrance and the hover spread only change the numbers. The pages are not in
   a shared 3D context (no preserve-3d), so z-index, not depth, decides what is in front. */

.variant-gallery {
  --row-step: 0px; /* closed until the card enters the viewport */
  --row-lift: 0px;
  --row-ease: cubic-bezier(0.65, 0, 0.35, 1);
}

.variant-gallery.entered {
  --row-step: 76px;
}

.variant-gallery.entered:is(:hover, :focus-visible) {
  --row-step: 88px;
  --row-lift: -8px;
}

/* opacity eases in, so a page sliding in from the right stays a faint ghost only briefly and
   becomes solid as it reaches its place */
.variant-gallery .page-card {
  transition:
      transform 0.5s var(--row-ease),
      opacity 0.5s ease-in,
      box-shadow 0.3s ease;
}

.variant-gallery .page-card img {
  width: 104px;
}

.row-slot-0 {
  transform: translateY(var(--row-lift)) scale(1);
  z-index: 5;
}

.row-slot-m1 {
  transform: translateX(calc(-1 * var(--row-step))) translateY(8px) scale(0.82) rotateY(24deg);
  z-index: 4;
}

.row-slot-1 {
  transform: translateX(var(--row-step)) translateY(8px) scale(0.82) rotateY(-24deg);
  z-index: 4;
}

/* a page past the left end keeps sliding left while it shrinks and fades (the keyframes below,
   which override the transition while they run), then jumps, now invisible, to the mirror position
   past the right end, from where it slides and fades back in the next time it is due */
.variant-gallery .row-hidden {
  transform: translateX(calc(var(--row-step) + 60px)) translateY(14px) scale(0.6) rotateY(-36deg);
  opacity: 0;
  z-index: 0;
  pointer-events: none;
  transition:
      opacity 0.3s ease-out,
      transform 0s linear 0.35s;
}

.variant-gallery.stepped .row-hidden {
  animation: row-leave 0.35s ease-in;
}

@keyframes row-leave {
  from {
    transform: translateX(calc(-1 * var(--row-step))) translateY(8px) scale(0.82) rotateY(24deg);
    opacity: 1;
  }

  to {
    transform: translateX(calc(-1 * var(--row-step) - 60px)) translateY(14px) scale(0.6) rotateY(36deg);
    opacity: 0;
  }
}

.variant-gallery.entered:is(:hover, :focus-visible) .row-slot-0 {
  transform: translateY(var(--row-lift)) scale(1.05);
  box-shadow:
      0 6px 12px -4px rgba(0, 0, 0, 0.08),
      0 16px 24px -6px rgba(0, 0, 0, 0.08),
      0 24px 40px -12px rgba(0, 0, 0, 0.07);
}


/* Dark mode */

html.dark {
  .page-card {
    background: #1e1e1e;
    box-shadow:
        0 2px 4px -1px rgba(0, 0, 0, 0.2),
        0 8px 12px -3px rgba(0, 0, 0, 0.2),
        0 16px 20px -6px rgba(0, 0, 0, 0.18);
  }

  .page-card img {
    opacity: 0.9;
  }

  .cta-card:hover .page-card {
    box-shadow:
        0 4px 8px -2px rgba(0, 0, 0, 0.25),
        0 12px 18px -4px rgba(0, 0, 0, 0.25),
        0 20px 28px -8px rgba(0, 0, 0, 0.22);
  }

  .variant-gallery.entered:is(:hover, :focus-visible) .row-slot-0 {
    box-shadow:
        0 6px 12px -4px rgba(0, 0, 0, 0.28),
        0 16px 24px -6px rgba(0, 0, 0, 0.28),
        0 24px 40px -12px rgba(0, 0, 0, 0.25);
  }
}


/* Background: a glow in the accent colour from the top-left corner, behind the pages, and faint rays
   radiating from a point just above the card, so they fan down behind the pages and fade out before
   the text. The glow brightens a little on hover. */

.cta-card {
  --rays-centre: -90px;
}

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

.background-gradient::before {
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

html.dark .background-gradient::before {
  background-image: repeating-conic-gradient(
      from 0deg at 20% var(--rays-centre),
      transparent 0deg,
      color-mix(in srgb, var(--accent) 2%, transparent) 9deg,
      transparent 18deg);
}


/* Between the stacking point and the full width the cards are narrow, so the pages give the text
   a little more room */
@media screen and (max-width: 1280px) and (min-width: 901px) {
  .custom-page.home-page .panel.cta-card {
    grid-template-columns: 34% minmax(0, 1fr);
    column-gap: 24px;
    padding: 28px;
  }
}


/* Compact: below 700px the pages shrink to an icon-sized thumbnail of the front page beside the
   title, so the card stays short and the code panel is not pushed too far down */

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

  .page-stack {
    width: 72px;
    height: 72px;
    min-height: 0;
    border-radius: 12px;
    overflow: hidden;
    perspective: none;
  }

  .page-card {
    display: none;
  }

  /* only the front page, filling the thumbnail from its top edge, with no fan or row offsets */
  .page-stack .fan-slot-0,
  .page-stack .row-slot-0 {
    display: block;
    inset: 0;
    border-radius: 12px;
    transform: none !important;
    box-shadow: none !important;
  }

  .page-card img,
  .variant-gallery .page-card img {
    width: 72px;
  }

  .play-button,
  .variant-video.entered .play-button,
  .variant-video.entered:is(:hover, :focus-visible) .play-button {
    width: 28px;
    height: 28px;
    transform: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-secondary) 22%, transparent);
  }

  .play-button i {
    font-size: 10px;
    margin-left: 2px;
  }

  .badge {
    display: none;
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

  .background-gradient::before {
    content: none;
  }
}


/* Reduced motion: nothing moves; hover and entrance change colour, opacity and shadow only */

@media (prefers-reduced-motion: reduce) {
  .custom-page.home-page .panel.cta-card,
  .custom-page.home-page .panel.cta-card:hover {
    transform: none;
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
  }

  .page-card,
  .variant-gallery .page-card,
  .variant-gallery .row-hidden,
  .play-button,
  .arrow-icon {
    transition: opacity 0.3s ease, box-shadow 0.3s ease;
  }

  .variant-gallery.stepped .row-hidden {
    animation: none;
  }

  .cta-card:hover .arrow-icon,
  .cta-card:focus-visible .arrow-icon {
    transform: none;
  }

  .variant-video.entered:is(:hover, :focus-visible) .play-button {
    transform: translateX(-34px) translateY(17px) scale(1);
  }

  .variant-video.entered:is(:hover, :focus-visible) {
    .fan-slot-0 { transform: translateX(-34px) translateY(17px) rotate(-4deg); }
    .fan-slot-1 { transform: translateX(-7px) translateY(3px) rotate(1deg); }
    .fan-slot-2 { transform: translateX(20px) translateY(-10px) rotate(6deg); }
    .fan-slot-3, .fan-hidden { transform: translateX(45px) translateY(-23px) rotate(11deg); }
    .fan-slot-1:nth-last-child(1 of .page-card) { transform: translateX(25px) translateY(-12px) rotate(6deg); }
  }

  .variant-gallery.entered:is(:hover, :focus-visible) {
    --row-step: 76px;
    --row-lift: 0px;
  }

  .variant-gallery.entered:is(:hover, :focus-visible) .row-slot-0 {
    transform: translateY(var(--row-lift)) scale(1);
  }
}

</style>

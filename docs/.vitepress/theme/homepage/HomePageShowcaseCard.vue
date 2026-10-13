<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";

/* Bento card with a set of document pages on top, then a short pitch with a primary action. Used for
   the getting-started video and the sample gallery. Two page layouts:

   - "fan": a stack fanned out from the front page, like papers dropped on a desk. While the pointer
     rests on the card, the front page fades out where it lies, the pages behind it step forward,
     and the next one appears at the back of the fan.
   - "row": a coverflow row of three pages, the centre one largest and the two beside it receding.
     While the pointer rests on the card, the row slides one page to the left on every tick:
     the leftmost page fades out, and the next one slides in from the right. Needs at least four pages
     so that the page re-entering on the right starts hidden, and the more pages it gets, the longer
     a page stays away before it comes back from the right.

   Either card can opt out of the cycling and keep only the hover spread, which it does when its
   pages are not worth flipping through. */

const props = withDefaults(defineProps<{
  title: string;
  description: string;
  actionLabel: string;
  href: string;

  /* pages shown, first one in front (fan) or in the centre (row); at least two */
  images: string[];
  imageAlt: string;

  layout?: "fan" | "row";

  /* colour of the glow behind the pages; the two cards side by side use the two blues of the logo */
  accent?: string;
  accentSecondary?: string;

  /* whether the pages cycle while the pointer rests on the card; the layout always spreads on hover */
  shuffle?: boolean;
}>(), {
  layout: "fan",
  accent: "#0094F9",
  accentSecondary: "#2979FF",
  shuffle: true
});

/* the first step follows the pointer quickly, so the card reacts to being hovered, but only once
   the hover spread has (nearly) settled, so the two moves do not fight; the later ones keep a
   steady pace */
const FIRST_STEP_DELAY = 400;
const SHUFFLE_INTERVAL = 1000;

const active = ref(0);

/* whether the pages have moved at least once; the leave animation of the row layout only makes
   sense for a page that has just left, not for the ones hidden from the start */
const stepped = ref(false);

let timer: ReturnType<typeof setTimeout> | undefined;

/* fan: slot 0 is the front page, slots 1 to 3 fan out behind it, the rest wait hidden behind the last
   fanned page; the page that just left the front fades out in place before it joins them */
const FAN_VISIBLE_PAGES = 4;

/* row: the centre page and one to each side; the page that just left on the left fades out, then
   jumps (invisible) to the right end, where it waits to slide in again */
const ROW_REACH = 1;

const slotClass = computed(() => props.images.map((_, index) => {
  const count = props.images.length;
  const slot = (index - active.value + count) % count;

  if (props.layout === "row") {
    const signed = slot > count / 2 ? slot - count : slot;
    if (Math.abs(signed) <= ROW_REACH) return `row-slot-${signed < 0 ? "m" : ""}${Math.abs(signed)}`;
    return "row-hidden";
  }

  if (slot < FAN_VISIBLE_PAGES) return `fan-slot-${slot}`;
  if (slot === count - 1) return "fan-leaving";
  return "fan-hidden";
}));

function startShuffle() {
  if (!props.shuffle || props.images.length < 2 || timer)
    return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;

  const step = () => {
    active.value = (active.value + 1) % props.images.length;
    stepped.value = true;
    timer = setTimeout(step, SHUFFLE_INTERVAL);
  };

  timer = setTimeout(step, FIRST_STEP_DELAY);
}

function stopShuffle() {
  if (!timer)
    return;

  clearTimeout(timer);
  timer = undefined;
}

onBeforeUnmount(stopShuffle);
</script>

<template>
  <section
      class="panel showcase-panel"
      :class="[`layout-${layout}`, { stepped }]"
      :style="{ '--accent': accent, '--accent-secondary': accentSecondary }"
      @mouseenter="startShuffle"
      @mouseleave="stopShuffle">
    <div class="background-gradient" />

    <div class="page-stack" :class="{ 'two-pages': images.length === 2 }">
      <div
          v-for="(image, index) of images"
          :key="image"
          class="page-card"
          :class="slotClass[index]">
        <img :src="image" :alt="`${imageAlt}, page ${index + 1}`" loading="lazy" />
      </div>
    </div>

    <div class="showcase-text">
      <h2 class="card-title">{{ title }}</h2>
      <p class="card-description">{{ description }}</p>

<!--      <div class="actions">-->
<!--        <a class="action primary" :href="href">-->
<!--          {{ actionLabel }}-->
<!--          <i class="fa-solid fa-arrow-right arrow-icon"></i>-->
<!--        </a>-->
<!--      </div>-->
    </div>
  </section>
</template>

<style scoped>
  .showcase-panel {
    position: relative;
    isolation: isolate; /* keeps the gradient (z-index: -1) above the panel background but below the content */

    /* pages on top, text and the action below; the fanned pages hang below their box,
       so the gap is wider than it looks */
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 64px;
  }

  /* the pitch is centred under the page stack; the paragraph fills the card up to its padding and
     is justified, so its block edges line up with the card on phones, and it is capped so that
     it does not run across the whole width once the cards stack below 1280px */
  .showcase-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .showcase-text .card-description {
    width: 100%;
    max-width: 34rem;
    text-align: justify;
    text-wrap: pretty;
  }

  .actions {
    margin-top: 8px;
  }


  /* Action button */

  .action.primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .arrow-icon {
    font-size: 16px;
    transition: transform 0.2s ease;
    color: white;
  }

  .action.primary:hover .arrow-icon {
    transform: translateX(4px);
  }


  /* Page stack, shared by both layouts */

  .page-stack {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 208px;
    perspective: 1000px;
  }

  .page-card {
    position: absolute;
    background: white;
    border-radius: 6px;

    box-shadow:
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      0 8px 12px -3px rgba(0, 0, 0, 0.06),
      0 16px 20px -6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
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

  .showcase-panel:hover .page-card {
    box-shadow:
        0 4px 8px -2px rgba(0, 0, 0, 0.07),
        0 12px 18px -4px rgba(0, 0, 0, 0.07),
        0 20px 28px -8px rgba(0, 0, 0, 0.06);
  }


  /* Fan layout: the places a page can be, four fanned out from the front, one fading out where the
     front page was, the rest waiting hidden exactly behind the last fanned page, so they appear where
     nothing shows */

  .fan-slot-0 {
    transform: translateX(-34px) translateY(17px) rotate(-4deg);
    z-index: 5;
  }

  .fan-slot-1 {
    transform: translateX(-7px) translateY(3px) rotate(1deg);
    z-index: 4;
  }

  .fan-slot-2 {
    transform: translateX(20px) translateY(-10px) rotate(6deg);
    z-index: 3;
  }

  .fan-slot-3 {
    transform: translateX(45px) translateY(-23px) rotate(11deg);
    z-index: 2;
  }

  .fan-leaving {
    transform: translateX(-34px) translateY(17px) rotate(-4deg);
    opacity: 0;
    z-index: 6;
    pointer-events: none;
  }

  .fan-hidden {
    transform: translateX(45px) translateY(-23px) rotate(11deg);
    opacity: 0;
    z-index: 0;
    pointer-events: none;
  }

  /* with only two pages there is no fan to hide behind, so the second page peeks out properly */
  .two-pages .fan-slot-1 {
    transform: translateX(25px) translateY(-12px) rotate(6deg);
  }

  /* on hover the fan opens a little further */
  .showcase-panel:hover {
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

    .fan-leaving {
      transform: translateX(-45px) translateY(22px) rotate(-6deg);
    }

    .two-pages .fan-slot-1 {
      transform: translateX(38px) translateY(-19px) rotate(8deg);
    }
  }


  /* Row layout: a coverflow of three pages. The centre page stands upright and largest; the pages to
     each side are smaller, turned towards the centre and pushed back. Positions are driven by two
     custom properties so that the hover spread only has to change the numbers. The pages are not in
     a shared 3D context (no preserve-3d), so z-index, not depth, decides what is in front. Every step
     is one quick slide that eases in and out, so the row seems to settle after each move. */

  .layout-row {
    --row-step-1: 92px;
    --row-lift: 0px;
    --row-ease: cubic-bezier(0.65, 0, 0.35, 1);
  }

  /* opacity eases in, so a page sliding in from the right stays a faint ghost only briefly and
     becomes solid as it reaches its place */
  .layout-row .page-card {
    transition:
      transform 0.5s var(--row-ease),
      opacity 0.5s ease-in,
      box-shadow 0.3s ease;
  }

  .layout-row .page-card img {
    width: 120px;
  }

  .row-slot-0 {
    transform: translateY(var(--row-lift)) scale(1);
    z-index: 5;
  }

  .row-slot-m1 {
    transform: translateX(calc(-1 * var(--row-step-1))) translateY(8px) scale(0.82) rotateY(24deg);
    z-index: 4;
  }

  .row-slot-1 {
    transform: translateX(var(--row-step-1)) translateY(8px) scale(0.82) rotateY(-24deg);
    z-index: 4;
  }

  /* a page past the left end keeps sliding left while it shrinks and fades (the keyframes below,
     which override the transition while they run), then jumps, now invisible, to the mirror position
     past the right end, from where it slides and fades back in the next time it is due. The exit is
     quicker than a step and fades out fast, so the page is gone before the next one slides onto its
     place; the transform transition is delayed so that the jump happens only once the exit has
     finished. The selector carries .layout-row so that it beats the shared .layout-row .page-card
     transition. */
  .layout-row .row-hidden {
    transform: translateX(calc(var(--row-step-1) + 70px)) translateY(14px) scale(0.6) rotateY(-36deg);
    opacity: 0;
    z-index: 0;
    pointer-events: none;
    transition:
      opacity 0.3s ease-out,
      transform 0s linear 0.35s;
  }

  .layout-row.stepped .row-hidden {
    animation: row-leave 0.35s ease-in;
  }

  @keyframes row-leave {
    from {
      transform: translateX(calc(-1 * var(--row-step-1))) translateY(8px) scale(0.82) rotateY(24deg);
      opacity: 1;
    }

    to {
      transform: translateX(calc(-1 * var(--row-step-1) - 70px)) translateY(14px) scale(0.6) rotateY(36deg);
      opacity: 0;
    }
  }

  /* on hover the row spreads, the centre page lifts and comes forward */
  .layout-row:hover {
    --row-step-1: 106px;
    --row-lift: -8px;
  }

  .layout-row:hover .row-slot-0 {
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

    .showcase-panel:hover .page-card {
      box-shadow:
          0 4px 8px -2px rgba(0, 0, 0, 0.25),
          0 12px 18px -4px rgba(0, 0, 0, 0.25),
          0 20px 28px -8px rgba(0, 0, 0, 0.22);
    }

    .layout-row:hover .row-slot-0 {
      box-shadow:
          0 6px 12px -4px rgba(0, 0, 0, 0.28),
          0 16px 24px -6px rgba(0, 0, 0, 0.28),
          0 24px 40px -12px rgba(0, 0, 0, 0.25);
    }
  }


  /* Background: a glow in the accent colour from the top edge, and faint rays radiating from a point
     just above the card, so they fan down behind the page stack and fade out before the text */

  .showcase-panel {
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
        radial-gradient(ellipse 90% 55% at 50% 0%, color-mix(in srgb, var(--accent) 11%, transparent), transparent),
        radial-gradient(ellipse 50% 30% at 50% 0%, color-mix(in srgb, var(--accent-secondary) 5%, transparent), transparent);
  }

  .background-gradient::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: repeating-conic-gradient(
        from 0deg at 50% var(--rays-centre),
        transparent 0deg,
        color-mix(in srgb, var(--accent) 2.5%, transparent) 9deg,
        transparent 18deg);
    mask-image: radial-gradient(circle 480px at 50% var(--rays-centre), #000, transparent 100%);
    -webkit-mask-image: radial-gradient(circle 480px at 50% var(--rays-centre), #000, transparent 100%);
  }

  html.dark .background-gradient::before {
    background-image: repeating-conic-gradient(
        from 0deg at 50% var(--rays-centre),
        transparent 0deg,
        color-mix(in srgb, var(--accent) 2%, transparent) 9deg,
        transparent 18deg);
  }
</style>

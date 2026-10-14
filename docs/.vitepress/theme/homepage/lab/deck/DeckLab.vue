<script setup lang="ts">
import HomePageCtaCard from "../../HomePageCtaCard.vue";
import HomePageSampleGallery from "../../HomePageSampleGallery.vue";
import DeckLabVisual from "./DeckLabVisual.vue";

/* Lab page, not linked from anywhere: hover ideas for the sample-gallery card's pile of documents, each in
   the real card with the real copy, after today's card (with the magnifying glass) as the baseline.
   Delete this folder and docs/deck-lab.md once one ships. */

const ideas = [
  {
    id: "pickup",
    letter: "1",
    name: "Pick one up",
    variant: "pickup",
    gesture: "The front page lifts 64px off the pile, tilts back and turns a little towards the reader, with a deep shadow; the camera comes closer (a shorter perspective) so the lift reads as depth. The pages left behind shrink, sink and dim. The pile browses beneath, and each new front page rises in turn.",
    why: "It acts out the card's offer: take one and have a look. Unmistakable now, still one gesture.",
    tradeoffs: "Bigger motion than before; the receded pages lose a little legibility while a page is in hand."
  },
  {
    id: "spread",
    letter: "2a",
    name: "Spread: contact sheet",
    variant: "spread",
    gesture: "The pile turns almost flat and the six pages slide out into a three-by-two sheet, front page first; they restack from the back on leave. No browsing.",
    why: "Says \"there are many kinds here\" at a glance, and echoes the grid of the gallery page.",
    tradeoffs: "The pages end up small (about 70px wide) and nothing overlaps, so it reads as a grid, not a pile."
  },
  {
    id: "fan",
    letter: "2b",
    name: "Spread: hand of cards",
    variant: "fan",
    gesture: "The pages pivot about a point well below the pile and fan out like a hand of cards, overlapping; the pile flattens towards the reader so the fan reads.",
    why: "Keeps the pages large and the overlap keeps it a pile; the fan is a familiar \"here is what I have\" gesture.",
    tradeoffs: "Only the top strip of each page shows, so the kinds are told apart by their headers."
  },
  {
    id: "cascade",
    letter: "2c",
    name: "Spread: cascade",
    variant: "cascade",
    gesture: "The pile slides open diagonally like a stack of windows: each page peeks out above and to the left of the one in front, the front page stays in hand at the bottom right.",
    why: "Every page shows a corner, enough to tell the kinds apart, and the stack order stays legible.",
    tradeoffs: "A slightly office-like image (cascaded windows); the diagonal needs the taller column it gets at the lab width."
  },
  {
    id: "carousel",
    letter: "2d",
    name: "Spread: coverflow",
    variant: "carousel",
    gesture: "The pile opens into a coverflow row: the front page faces the reader, the others recede to each side at an angle. The browse slides the row one page to the left.",
    why: "Both at once: a spread to see the variety and a browse to move through it.",
    tradeoffs: "The row is wide for the column, so the pages are small; coverflow is a well-worn pattern."
  },
  {
    id: "riffle",
    letter: "3",
    name: "Riffle",
    variant: "riffle",
    gesture: "The browse step is a flip: the front page's left edge lifts and the page turns over on its right edge, past edge-on, and lands at the back. A quicker cadence than the fade.",
    why: "The most literal \"browsing\": thumbing through a stack.",
    tradeoffs: "Busier than the fade, and the flip passes close to the reader; it needs the slower cadence to stay calm."
  },
  {
    id: "colour",
    letter: "4",
    name: "Colour prints on",
    variant: "colour",
    gesture: "The pages are grey skeletons at rest. While the pointer rests, colour arrives page by page from the front: headings darken, the accent element brightens, photos take a tint, a seal fills in. The browse continues as usual.",
    why: "Cheap and quiet, and it says something true: these are rendered documents, not placeholders.",
    tradeoffs: "Subtle enough to miss on the back pages. Pairs well with 1 (see 7)."
  },
  {
    id: "tabs",
    letter: "5",
    name: "Folder tabs",
    variant: "tabs",
    gesture: "The pile opens a little further and a coloured filing tab slides out of each page's right edge, staggered from the front, one colour per document kind.",
    why: "Communicates variety without text, which would be illegible at this size anyway.",
    tradeoffs: "Six new colours on a card that has one accent; the tabs may fight the page's palette."
  },
  {
    id: "pointer",
    letter: "6",
    name: "Follow the pointer",
    variant: "pointer",
    gesture: "The pile tilts with the pointer's place on the card, and the pages behind the front one shift by depth, so the stack reads as solid. The browse continues as usual.",
    why: "Tactile, and it shows off the 3D.",
    tradeoffs: "A common trick; it needs a mousemove handler and does nothing on touch. Kept subtle on purpose."
  },
  {
    id: "pickup-colour",
    letter: "7",
    name: "Pick one up + colour",
    variant: "pickup colour",
    gesture: "1 and 4 together: the front page comes up to meet the reader while the pile comes to life in colour beneath it.",
    why: "One clear gesture plus one quiet reveal, matched in weight to the intro card.",
    tradeoffs: "None beyond those of 1 and 4."
  },
  {
    id: "ring",
    letter: "8",
    name: "Ring",
    variant: "ring",
    gesture: "The six pages stand up on a ring around a vertical axis, seen from slightly above, the front one facing the reader. Each browse step turns the whole ring by a sixth, so the next document swings round to the front while the last one goes round the back.",
    why: "A proper 3D object that the browse turns, rather than a pile that reshuffles; the whole collection is visible at once, in motion.",
    tradeoffs: "The most elaborate; the pages are at about half size; the ring reverts to a pile on leave, which is a big change of shape."
  },
  {
    id: "pullout",
    letter: "9",
    name: "Pull one out",
    variant: "pullout",
    gesture: "The browse step draws the front page sideways out of the pile, turned slightly to the reader, holds it for a moment, then slips it in at the back while the pile closes up. Like pulling a sheet from a folder.",
    why: "A browse that shows each document on its own for a beat, which the fade never does; a natural hand gesture.",
    tradeoffs: "The drawn page reaches towards the text column; the step is long (1.3s), so the cadence is slow."
  },
  {
    id: "float",
    letter: "10",
    name: "Float apart",
    variant: "float",
    gesture: "The pile comes apart in depth, the pages hovering a little apart from each other and each bobbing gently on its own beat, with softer, wider shadows. No browsing: the pile just lives while the pointer rests.",
    why: "Calm and premium, the exploded-view feel of a product reveal; shows the pile is made of separate documents without any reshuffling.",
    tradeoffs: "Loops while hovered (the only one here that does); says \"many\" but not \"browse\"."
  }
];
</script>

<template>
  <div class="custom-page home-page textured-page deck-lab">
    <div class="container">
      <section class="content lab-intro">
        <h1>Gallery card hover lab</h1>
        <p class="lab-lead">
          Hover ideas for the pile of documents on the sample-gallery card, each in the real card with the real copy,
          after today's card (with the magnifying glass) as the baseline. Rest the pointer on a card to play its hover;
          nothing plays on its own.
        </p>
        <p class="lab-jump">
          Jump to
          <a href="#today">0 Today</a>
          <a v-for="idea of ideas" :key="idea.id" :href="`#${idea.id}`">{{ idea.letter }} {{ idea.name }}</a>
        </p>
      </section>
    </div>

    <div class="container" id="today">
      <section class="content pairing">
        <div class="lab-row">
          <div class="lab-note">
            <div class="lab-note-title">
              <span class="lab-letter">0</span>
              <h2>Today: browse + magnifying glass</h2>
            </div>
            <p><strong>Gesture.</strong> The production card, untouched: the pile turns towards the reader, browses a page at a time, and a magnifying glass descends onto the front page and roams over it.</p>
          </div>
          <HomePageSampleGallery />
        </div>
      </section>
    </div>

    <div v-for="idea of ideas" :key="idea.id" class="container" :id="idea.id">
      <section class="content pairing">
        <div class="lab-row">
          <div class="lab-note">
            <div class="lab-note-title">
              <span class="lab-letter">{{ idea.letter }}</span>
              <h2>{{ idea.name }}</h2>
            </div>
            <p><strong>Gesture.</strong> {{ idea.gesture }}</p>
            <p><strong>Why.</strong> {{ idea.why }}</p>
            <p><strong>Trade-offs.</strong> {{ idea.tradeoffs }}</p>
          </div>

          <home-page-cta-card
              title="Explore the sample gallery"
              description="Explore complete document examples, reusable components and layout ideas. Each includes C# source code you can copy and adapt to your own projects."
              label="Browse the examples"
              href="/sample-gallery.html"
              variant="gallery"
              accent="#5C6BC0"
              accent-secondary="#3F51B5">
            <template #visual>
              <deck-lab-visual :variant="idea.variant" />
            </template>
          </home-page-cta-card>
        </div>
      </section>
    </div>
  </div>
</template>

<style>

.deck-lab .lab-intro { padding-bottom: 0; }
.deck-lab .lab-intro h1 { margin-bottom: 1rem; }

.deck-lab .lab-lead {
  max-width: 880px;
  font-size: 1.0625rem;
  line-height: 1.6rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.deck-lab .lab-jump { display: flex; flex-wrap: wrap; gap: 8px 14px; margin: 1rem 0 0.5rem; font-size: 0.9375rem; }
.deck-lab .lab-jump a { color: var(--vp-c-brand-1); }

/* each idea: the note on the left, the card at its homepage width on the right */
.deck-lab .content.pairing { padding-top: 32px; padding-bottom: 32px; }

.deck-lab .lab-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 32px;
  align-items: start;
}

@media screen and (max-width: 900px) {
  .deck-lab .lab-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }
}

.deck-lab .lab-note-title {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 10px;
}

.deck-lab .lab-note-title h2 {
  margin: 0;
  font-size: 1.5rem;
  line-height: 2rem;
  border: 0;
  padding: 0;
}

.deck-lab .lab-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 10px;
  background-color: var(--home-surface-inner);
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--vp-c-text-1);
}

.deck-lab .lab-note p {
  margin: 0 0 6px;
  font-size: 0.9375rem;
  line-height: 1.45rem;
  color: var(--vp-c-text-2);
}

.deck-lab .lab-note p strong { color: var(--vp-c-text-1); }

</style>

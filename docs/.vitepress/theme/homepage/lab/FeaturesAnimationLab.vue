<script setup lang="ts">
import LabWave from "./LabWave.vue";
import LabPageBuilder from "./LabPageBuilder.vue";
import LabTwoActs from "./LabTwoActs.vue";
import LabOperations from "./LabOperations.vue";
import LabMagnetic from "./LabMagnetic.vue";
import LabTypewriter from "./LabTypewriter.vue";
import LabConveyor from "./LabConveyor.vue";
import LabFlipTiles from "./LabFlipTiles.vue";
import LabLayers from "./LabLayers.vue";
import LabRollingWord from "./LabRollingWord.vue";

/* Ten proposals for animating the "All you need to generate and modify PDFs" card. Each one is the
   real card with a different right-hand side, so they can be compared in place. Everything runs only
   while on screen and stops for visitors who prefer reduced motion. */

const proposals = [
  {
    id: "wave",
    title: "Spotlight wave",
    component: LabWave,
    concept: "The tags stay exactly as they are. A light runs through them one by one with a short fading trail, as if a finger traced the list. Hovering a tag moves the head of the wave there.",
    trigger: "Autoplays while visible, pointer takes over",
    effort: "Small",
    note: "The safest step up from the static card: no new layout, no new assets, one timer. It makes the card feel alive without asking for attention. On its own it says little about what the tags mean."
  },
  {
    id: "builder",
    title: "Self-assembling page",
    component: LabPageBuilder,
    concept: "A blank sheet beside the tags. Each tag lights up in turn and adds its piece: header band, text, image, table, chart, QR code, page number. Then the operations take over: a file merges in, a page is pulled out, a stamp lands, a lock closes.",
    trigger: "Autoplays while visible (about 15 s per loop)",
    effort: "Large",
    note: "The strongest story: it literally shows a document being built and then worked on, and the 'generate, then modify' split falls out of the order of the tags. Costs the most CSS and needs tuning so the sheet stays legible at the end."
  },
  {
    id: "acts",
    title: "Two acts: Generate, Modify",
    component: LabTwoActs,
    concept: "The headline says 'generate and modify', so the stage says it too. A switch alternates between the two words every few seconds and the tags cross-fade in a stagger between the two sets. A thin line shows the time until the next switch; clicking a word switches at once.",
    trigger: "Autoplays while visible, clickable",
    effort: "Medium",
    note: "Gives the two links on the left a visual counterpart and explains the two groups of tags, which the flat list hides today. Shows only part of the inventory at a time, so the card looks a little emptier in the Modify act."
  },
  {
    id: "operations",
    title: "Operations theatre",
    component: LabOperations,
    concept: "The six document operations get a small stage: two files slide together and merge, a page is pulled out of a stack, a stamp drops, a file is clipped to a corner, a lock closes over the text, metadata is written beside the file. The acted operation is highlighted in the list.",
    trigger: "Autoplays while visible, clickable list",
    effort: "Medium",
    note: "Document operations are the newer and lesser-known half of the pitch; this makes them concrete in a way words cannot. It drops the generation tags from this card, so it works best if the generation side is told elsewhere (or the two halves alternate)."
  },
  {
    id: "magnetic",
    title: "Magnetic tags",
    component: LabMagnetic,
    concept: "A soft light follows the pointer and the tags under it lean towards it, lift and take the brand colour, fading with distance. Without a pointer, the light wanders by itself along a slow figure, so the tags sway as if a hand passed over them.",
    trigger: "Autoplays while visible, pointer takes over",
    effort: "Small",
    note: "Pure feel: tactile, playful, and it rewards exploring the list. The idle wander keeps it from looking dead on first scroll. Says nothing new about the features, and it is one of the few variants that needs a per-frame script."
  },
  {
    id: "typewriter",
    title: "Fluent API typewriter",
    component: LabTypewriter,
    concept: "A small code window types one Fluent API call after another, and as each call lands, its tag lights up: .Text() lights Text, .Table() lights Tables, .Encrypt() lights Encryption. One generation snippet, one document-operations snippet, then it starts over.",
    trigger: "Autoplays while visible (about 25 s per loop)",
    effort: "Medium",
    note: "Echoes the live demo and the Quick Start window above, and ties every tag to the one thing the homepage is about: the C# API. The strongest fit with 'with the same fluent C# API' in the copy. Two code windows on one page may be one too many."
  },
  {
    id: "conveyor",
    title: "Conveyor belts",
    component: LabConveyor,
    concept: "Three belts of tags drift sideways at slightly different speeds, the middle one the other way, fading at both edges. They stop under the pointer and the tag under it lifts.",
    trigger: "Always moving while visible, pauses on hover",
    effort: "Small",
    note: "The logo-wall pattern applied to capabilities: it reads as 'a lot' and takes little height. Pure CSS. It is the most generic of the ten and constant motion next to the text can tire; some visitors dislike marquees."
  },
  {
    id: "wall",
    title: "Flip wall",
    component: LabFlipTiles,
    concept: "The tags as a wall of square icon tiles. Every so often a random tile turns over to show its name on a brand-coloured back, stays a moment, and turns back, so a few names are always showing. Hovering a tile turns it over at once.",
    trigger: "Autoplays while visible, hover flips",
    effort: "Small",
    note: "Quieter and more graphic than a list of labels; the icons alone already say 'many kinds of things'. Works only if the icons are self-explanatory, which some are not (SVG, merging), and random flips mean a visitor may never see the label they wanted."
  },
  {
    id: "layers",
    title: "Exploded layers",
    component: LabLayers,
    concept: "A document as a stack of glass layers seen from an angle, like an exploded drawing: the page, the text, the graphics, the tables, the operations on top, the file properties. The stack opens when it scrolls into view, floats gently, and the layers take turns to lift while the legend names them.",
    trigger: "Opens on scroll, cycles while visible, hover lifts",
    effort: "Medium",
    note: "The most 'designed' of the ten and a genuinely different image for the homepage. It explains the architecture (content, layout, operations, file) rather than listing features. Replaces the tags with six families, so the vocabulary changes; the 3D needs checking across browsers."
  },
  {
    id: "rolling",
    title: "Rolling headline",
    component: LabRollingWord,
    concept: "Above the tags, one short sentence in large type whose ending rolls like a split-flap display: 'Lay out tables', 'Plot charts', 'Encrypt output', one phrase per tag, in the hero's brand gradient. The matching tag lights up underneath.",
    trigger: "Autoplays while visible",
    effort: "Small",
    note: "Keeps the full inventory and gives every tag a verb and a moment; the gradient ties it to the hero headline. Simple and robust. The sentence needs good copy for all twenty phrases, and the card grows by one line."
  }
];
</script>

<template>
  <div class="custom-page home-page textured-page features-lab">
    <div class="container">
      <section class="content">
        <div class="section-header">
          <div class="section-tag">Design lab</div>
          <h2>Ten ways to animate the features card</h2>
          <p class="sub-header">
            The "All you need to generate and modify PDFs" card from the homepage, ten times, each with a different animation
            on its right-hand side. Scroll through them in place; each one runs while it is on screen.
          </p>
        </div>

        <nav class="jump">
          <a v-for="(proposal, index) of proposals" :key="proposal.id" :href="`#${proposal.id}`" class="jump-item">
            <span class="jump-number">{{ String(index + 1).padStart(2, "0") }}</span>
            {{ proposal.title }}
          </a>
        </nav>
      </section>
    </div>

    <div v-for="(proposal, index) of proposals" :key="proposal.id" :id="proposal.id" class="container">
      <section class="content proposal">
        <header class="proposal-header">
          <div class="proposal-title">
            <span class="proposal-number">{{ String(index + 1).padStart(2, "0") }}</span>
            <h3>{{ proposal.title }}</h3>
          </div>

          <p class="proposal-concept">{{ proposal.concept }}</p>

          <dl class="proposal-facts">
            <div><dt>Trigger</dt><dd>{{ proposal.trigger }}</dd></div>
            <div><dt>Effort</dt><dd>{{ proposal.effort }}</dd></div>
            <div class="wide"><dt>Notes</dt><dd>{{ proposal.note }}</dd></div>
          </dl>
        </header>

        <component :is="proposal.component" />
      </section>
    </div>
  </div>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.jump {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  max-width: 900px;
  margin-top: 32px;
}

.jump-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px 8px 10px;
  border-radius: 10px;
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: transform 0.2s ease;
}

.jump-item:hover {
  transform: translateY(-2px);
  color: var(--vp-c-text-1);
}

.jump-number,
.proposal-number {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.proposal {
  align-items: stretch;
  gap: 28px;
  padding-top: 32px;
  padding-bottom: 32px;
}

.proposal-header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  column-gap: 48px;
  row-gap: 8px;
  align-items: start;
}

.proposal-title {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.proposal-title h3 {
  margin: 0;
  font-size: 1.5rem;
  line-height: 2rem;
}

.proposal-concept {
  grid-column: 1;
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.625rem;
}

.proposal-facts {
  grid-column: 2;
  grid-row: 1 / span 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  margin: 0;
  padding: 20px 24px;
  border-radius: 16px;
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge);
}

.proposal-facts .wide {
  grid-column: 1 / -1;
}

.proposal-facts dt {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.proposal-facts dd {
  margin: 2px 0 0;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
}

@media screen and (max-width: 960px) {
  .proposal-header {
    grid-template-columns: minmax(0, 1fr);
  }

  .proposal-facts {
    grid-column: 1;
    grid-row: auto;
  }
}

</style>

<style>

/* the homepage canvas, so the panels sit on the same background as on the homepage */
body:has(.features-lab) {
  background-color: var(--vp-c-bg);
  background-image:
      url("/homepage/grain.png"),
      radial-gradient(ellipse 1400px 700px at 92% 0%, color-mix(in srgb, #2196F3 18%, transparent), transparent 70%),
      radial-gradient(ellipse 800px 450px at 0% 2%, color-mix(in srgb, #5C6BC0 10%, transparent), transparent 70%),
      radial-gradient(ellipse 900px 1200px at 0% 40%, color-mix(in srgb, #26C6DA 7%, transparent), transparent 70%),
      radial-gradient(ellipse 700px 1600px at 100% 70%, color-mix(in srgb, #1E88E5 9%, transparent), transparent 70%);
  background-size: 256px 256px, auto, auto, auto, auto;
  background-repeat: repeat, no-repeat, no-repeat, no-repeat, no-repeat;
}

.custom-page.features-lab .panel h2 {
  font-size: 1.5rem;
  line-height: 2rem;
}

</style>

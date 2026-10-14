<template>
  <!-- Lab page, not linked from anywhere: the two call-to-action cards under the homepage hero with five
       different visuals each, plus today's cards as the baseline. The frame, copy, link row and hover ring
       are the production ones (copied into CtaLabCard.vue); only the visual column changes. Research,
       brainstorm and proposals: design-explorations/cta-card-visuals/. Delete this folder, docs/cta-visuals-lab.md
       and docs/public/homepage/lab-cta/ once a pairing ships. -->
  <div ref="root" class="custom-page home-page textured-page cta-lab" :class="{ 'reduce-motion': lab.reduceMotion, embed, still }">
    <div v-if="!embed" class="container">
      <section class="content lab-intro">
        <h1>CTA card visuals lab</h1>
        <p class="lab-lead">
          Five pairings for the visual column of the two cards under the hero, each at the real size on the real
          canvas, after today's cards as the baseline. Every document shown is a real QuestPDF render: the tutorial
          invoice, and element crops cut from the Component Variants pages that the shipped gallery card uses.
          The crops are upscaled from the 640px renders; production would re-render them at 2x.
        </p>
        <p class="lab-lead">
          Each visual plays its entrance once when the card scrolls into view (or on <em>Replay entrance</em>), then
          rests. Hover is the only other trigger. Nothing loops.
        </p>
        <p class="lab-jump">
          Jump to
          <a v-for="p of pairings" :key="p.id" :href="`#${p.id}`">{{ p.letter }} {{ p.name }}</a>
          <span class="lab-jump-sep">round two</span>
          <a v-for="p of roundTwo" :key="p.id" :href="`#${p.id}`">{{ p.letter }} {{ p.name }}</a>
          <span class="lab-jump-sep">round three</span>
          <a v-for="p of roundThree" :key="p.id" :href="`#${p.id}`">{{ p.letter }} {{ p.name }}</a>
        </p>

        <div class="lab-note lab-note-wide">
          <h3>Round two: more choreography, 3D on intent</h3>
          <p>
            After the first five, the owner asked for more creative, sophisticated animation, including 3D. Five more
            pairings at the bottom of the page, all inside A's well so the row stays in the family: <strong>F Assembly +
            Deal</strong> (the page builds band by band, the tiles are dealt from a deck), <strong>G Focus + Pull-back</strong>
            (camera moves: focus pull, one-to-many pull-back, a slow dolly on hover), <strong>H Hover story</strong> (a
            labelled pill, the camera reading down the invoice, tiles flipping in a wave to show nine more elements),
            <strong>I Scroll-bound</strong> (the page builds and the columns parallax with the scroll, no timers), and
            <strong>J 3D</strong> (a page turn to page two on hover, tiles that stand up and then lift to three depths on
            a tilted sheet). Everything still plays once or on intent and holds; nothing loops.
          </p>
        </div>

        <div class="lab-toolbar" role="group" aria-label="Lab controls">
          <button type="button" class="action small" :class="{ primary: lab.forceHover }" @click="lab.forceHover = !lab.forceHover">
            Force hover
          </button>
          <button type="button" class="action small" :class="{ primary: lab.reduceMotion }" @click="lab.reduceMotion = !lab.reduceMotion">
            Reduced motion
          </button>
          <button type="button" class="action small" @click="lab.epoch++">
            Replay entrance
          </button>
          <button type="button" class="action small" :class="{ primary: frozen }" @click="toggleFreeze">
            {{ frozen ? "Resume" : "Freeze" }}
          </button>
          <label class="lab-scrub">
            <span>Scrub</span>
            <input type="range" min="0" max="1000" v-model.number="scrub" @input="onScrub" />
          </label>
          <button type="button" class="action small" :class="{ primary: phone }" @click="phone = !phone">
            Phone width
          </button>
        </div>

        <div v-if="phone" class="lab-phones">
          <figure>
            <iframe :src="`/cta-visuals-lab.html?embed=1&t=${lab.epoch}`" width="390" height="1800" title="390px wide"></iframe>
            <figcaption>390px</figcaption>
          </figure>
          <figure>
            <iframe :src="`/cta-visuals-lab.html?embed=1&t=${lab.epoch}`" width="1100" height="1800" title="1100px wide"></iframe>
            <figcaption>1100px</figcaption>
          </figure>
        </div>
      </section>
    </div>

    <!-- V0: today's cards, the production components untouched -->
    <div class="container" id="v0">
      <section class="content pairing">
        <div v-if="!embed" class="lab-note">
          <div class="lab-note-title">
            <span class="lab-letter">V0</span>
            <h2>Today: fan and coverflow</h2>
          </div>
          <p><strong>What it is.</strong> The production components, untouched. Two tilted invoice pages with a play button and a badge; a coverflow of three gallery pages that steps while hovered.</p>
          <p><strong>Note.</strong> Force hover does not reach these cards (their hover is CSS :hover only); rest the pointer on them.</p>
        </div>
        <div class="cta-row">
          <HomePageGettingStarted />
          <HomePageSampleGallery />
        </div>
      </section>
    </div>

    <cta-pairing v-bind="pairings[0]" :embed="embed">
      <template #video><VisualWellVideo /></template>
      <template #gallery><VisualWellGallery /></template>
    </cta-pairing>

    <cta-pairing v-bind="pairings[1]" :embed="embed">
      <template #video><VisualBleedVideo /></template>
      <template #gallery><VisualBleedGallery /></template>
    </cta-pairing>

    <cta-pairing v-bind="pairings[2]" :embed="embed">
      <template #video><VisualWindowVideo /></template>
      <template #gallery><VisualWindowGallery /></template>
    </cta-pairing>

    <cta-pairing v-bind="pairings[3]" :embed="embed">
      <template #video><VisualSweepVideo /></template>
      <template #gallery><VisualSweepGallery /></template>
    </cta-pairing>

    <cta-pairing v-bind="pairings[4]" :embed="embed">
      <template #video><VisualQuietVideo /></template>
      <template #gallery><VisualQuietGallery /></template>
    </cta-pairing>

    <cta-pairing v-bind="roundTwo[0]" :embed="embed">
      <template #video><VisualAssemblyVideo /></template>
      <template #gallery><VisualDealGallery /></template>
    </cta-pairing>

    <cta-pairing v-bind="roundTwo[1]" :embed="embed">
      <template #video><VisualFocusVideo /></template>
      <template #gallery><VisualPullbackGallery /></template>
    </cta-pairing>

    <cta-pairing v-bind="roundTwo[2]" :embed="embed">
      <template #video><VisualStoryVideo /></template>
      <template #gallery><VisualFlipGallery /></template>
    </cta-pairing>

    <cta-pairing v-bind="roundTwo[3]" :embed="embed">
      <template #video><VisualScrollVideo /></template>
      <template #gallery><VisualParallaxGallery /></template>
    </cta-pairing>

    <cta-pairing v-bind="roundTwo[4]" :embed="embed">
      <template #video><VisualTurnVideo /></template>
      <template #gallery><VisualDepthGallery /></template>
    </cta-pairing>

    <!-- round three: the video card only; the gallery slot repeats J's depth tiles so the row is complete -->
    <cta-pairing v-bind="roundThree[0]" :embed="embed">
      <template #video><VisualBuildVideo /></template>
      <template #gallery><VisualDeckGallery /></template>
    </cta-pairing>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import HomePage from "../../HomePage.vue";
import HomePageGettingStarted from "../../HomePageGettingStarted.vue";
import HomePageSampleGallery from "../../HomePageSampleGallery.vue";
import CtaPairing from "./CtaPairing.vue";
import VisualWellVideo from "./VisualWellVideo.vue";
import VisualWellGallery from "./VisualWellGallery.vue";
import VisualBleedVideo from "./VisualBleedVideo.vue";
import VisualBleedGallery from "./VisualBleedGallery.vue";
import VisualWindowVideo from "./VisualWindowVideo.vue";
import VisualWindowGallery from "./VisualWindowGallery.vue";
import VisualSweepVideo from "./VisualSweepVideo.vue";
import VisualSweepGallery from "./VisualSweepGallery.vue";
import VisualQuietVideo from "./VisualQuietVideo.vue";
import VisualQuietGallery from "./VisualQuietGallery.vue";
import VisualAssemblyVideo from "./VisualAssemblyVideo.vue";
import VisualDealGallery from "./VisualDealGallery.vue";
import VisualFocusVideo from "./VisualFocusVideo.vue";
import VisualPullbackGallery from "./VisualPullbackGallery.vue";
import VisualStoryVideo from "./VisualStoryVideo.vue";
import VisualFlipGallery from "./VisualFlipGallery.vue";
import VisualScrollVideo from "./VisualScrollVideo.vue";
import VisualParallaxGallery from "./VisualParallaxGallery.vue";
import VisualTurnVideo from "./VisualTurnVideo.vue";
import VisualDepthGallery from "./VisualDepthGallery.vue";
import VisualBuildVideo from "./VisualBuildVideo.vue";
import VisualDeckGallery from "./VisualDeckGallery.vue";
import { provideLabState } from "./ctaLab";

/* HomePage.vue is imported for its page-level styles (canvas washes, panel padding, .cta-row); not rendered */
void HomePage;

const lab = provideLabState();
const root = ref<HTMLElement>();
const embed = ref(false);
const phone = ref(false);
const still = ref(false); /* ?still=1: every transition and animation jumps to its end state (for captures) */
const frozen = ref(false);
const scrub = ref(0);

const pairings = [
  {
    id: "well", letter: "A", name: "Well", glow: "soft" as const,
    why: "The visual column becomes an inset tile, the same surface as the page's chips and icon squares, and the document sits inside it like a photo in a frame. The invoice head is large enough to read, so the video card says \"a real invoice gets built\"; nine element tiles say \"many kinds of content\" before a word is read. One against many.",
    motion: "Entrance once: the sheet rises into the well (500ms), the play button follows; the nine tiles fade up in reading order (40ms apart). Hover: the sheet drifts up 6px, the play button grows 8%; the tiles stay still.",
    tradeoffs: "The quietest of the five in daylight; the well is a second container inside a container, which the page already does with chips. Nine tiles at 66px are iconic rather than legible: the QR, stamp, seal and map read, the chart and signature need a second look."
  },
  {
    id: "bleed", letter: "B", name: "Bleed", glow: "soft" as const,
    why: "The document is bigger than the card: its corner lies outside and the card's rounded edge cuts it, the way product crops run off the edge on Linear or Vercel's template cards. The invoice title is the largest text in the row after the headline. The mosaic runs off two edges, so the gallery reads as a collection that continues.",
    motion: "Entrance once: the sheet and the tiles slide in from the cut corner (600ms, tiles 50ms apart). Hover: a 3px drift towards the pointer. Where the browser supports scroll-driven animations the invoice travels 12px while the card crosses the viewport, with no JS and nothing running off screen.",
    tradeoffs: "The boldest pairing and the least symmetrical; at 34% column width the cut becomes tight. Bleeding into the padding breaks the 32px inset every other panel keeps, which is the one house rule it bends. The right-edge fade on the mosaic must stay short or it reads as a gradient blob."
  },
  {
    id: "window", letter: "C", name: "Window", glow: "soft" as const,
    why: "The page's own window chrome, used as a document viewer titled invoice.pdf, with the page zoomed the way a PDF viewer shows it. The gallery is a second window with four captioned tiles; the captions are the real page names of the Component Variants document. Both cards use a vocabulary the code window below already established, so the row and the code panel read as one family.",
    motion: "Entrance once: the invoice settles from 105% to 100% over 2.4s (one slow Ken Burns), the tiles rise 60ms apart. Hover: the three dots take their colours (as the code window does), the page pans up 6px.",
    tradeoffs: "Three windows above the fold (two here, the code window below). The viewer chrome costs 32px of the 228px column. A window titled invoice.pdf implies a viewer; the click leads to a page, which is honest only while the quick-start page actually holds the video."
  },
  {
    id: "sweep", letter: "D", name: "Render once", glow: "full" as const,
    why: "Process against range. The invoice is painted in from the top behind a thin accent line, once, as a renderer paints a page, and the play button appears when the line reaches the bottom. The nine tiles develop in reading order. The rest state is identical to A; the entrance is what sells the library's job: it renders.",
    motion: "Entrance once: a 1.2s top-to-bottom reveal with the accent line; the tiles' content fades in 80ms apart over about a second. Hover: the play button only. Under reduced motion both rest states show from the start. Keeps today's rays.",
    tradeoffs: "The most motion of the five, and the only one where the entrance carries meaning, which means a visitor who scrolls past at speed sees a half-painted page. The accent line is one more glowing thing on a page that already has a ring and a halo."
  },
  {
    id: "quiet", letter: "E", name: "Quiet", glow: "none" as const,
    why: "The still alternative: one sheet with a hairline and a soft shadow, the play button, and four larger tiles. No well, no frame, no glow, no rays. Everything the card says, it says at rest; the hover ring and the halo are the only effects.",
    motion: "Entrance: a 300ms fade. Hover: the play button grows, the shadows deepen. Nothing else, ever.",
    tradeoffs: "The least \"designed\" and the easiest to ship. Without a container the white sheet in dark mode is again the brightest object in the row, softened only by the dimmed paper. Four tiles show range but not depth."
  }
];

const roundTwo = [
  {
    id: "assembly", letter: "F", name: "Assembly + Deal", glow: "soft" as const,
    why: "Motion with a meaning. The invoice assembles the way the layout engine places it: the title block slides in and sharpens, the parties rise, the table's header rule draws itself left to right, four rows deal in from below, the play button lands last. The nine tiles start as a deck in the centre of the well and are dealt to their cells, straightening as they land, centre first. One against many, both built in front of you.",
    motion: "Entrance once, 1.5s: title 0–0.6s (slide, blur 3px → 0), parties 0.25–0.85s, rule 0.5–0.95s (clip-path), rows from 0.7s at 90ms steps, play at 1.15s. Deck: 0.7s per tile, 55ms apart in deal order. Hover: the sheet drifts 6px. Nothing loops.",
    tradeoffs: "Nine image bands instead of one (the same bytes, more requests, or one sprite). A visitor who arrives mid-scroll sees the second half only. The deal reads as cards being dealt, which is a metaphor, though a quieter one than fanned paper."
  },
  {
    id: "focus", letter: "G", name: "Focus + Pull-back", glow: "soft" as const,
    why: "Camera language instead of object language. The invoice starts too close and out of focus and pulls into focus over 1.6s as the play button lands; on hover the camera dollies slowly down the page. The gallery starts on one tile, the ISO seal filling the well, and pulls back until all nine are in frame: one to many in one move; on hover the camera leans in 4%.",
    motion: "Entrance once: scale 1.12 → 1 and blur 5px → 0 over 1.6s, ease-out; the gallery grid scale 3.1 → 1 over 1.4s. Hover: a 40px dolly over 2.4s (video), a 4% lean over 0.7s (gallery). Both return on leave.",
    tradeoffs: "Blur filters cost a GPU layer for the first 1.6s. The pull-back is the most cinematic entrance here and the one most likely to be called an effect. The dolly needs the pointer to rest for two seconds to be seen at all."
  },
  {
    id: "story", letter: "H", name: "Hover story", glow: "soft" as const,
    why: "The rest state is a plain poster; the hover is where the sophistication lives. On the video card the play disc widens into a labelled pill (Watch) and the camera reads down the whole invoice over 3.2s, parties, table, last rows, then holds. On the gallery card the nine tiles flip in a wave to show nine more kinds of content on their backs (eighteen elements), and hold; on leave they flip back. Everything on intent.",
    motion: "Entrance: a 300ms fade. Hover: pill 0.35s with overshoot; read-down 3.2s ease-in-out; flips 0.6s each, 40ms apart in reading order. Leave: the same in reverse. Under reduced motion the pill still widens and the backs show at once.",
    tradeoffs: "Touch users and the approver never see any of it; the rest state has to carry the row (it is A's). The pill repeats the link row's verb. 3D flips are a known device; the wave and the hold are what keep them from looking like a widget."
  },
  {
    id: "scroll", letter: "I", name: "Scroll-bound", glow: "soft" as const,
    why: "No timers at all. The invoice builds as the row travels up the viewport (title, parties, rule, rows, play button, bound to the card's position between entering at the bottom and reaching the centre), so scrolling slowly builds the page and scrolling back takes it apart. The three columns of tiles rise at three speeds, like layers at different depths past a window, and settle at the centre. The motion is exactly as fast as the reader.",
    motion: "CSS scroll-driven animations (animation-timeline: view()). Chrome, Edge and Safari 26 play it; Firefox and reduced motion show the finished state. At 1440×900 the row is already most of the way in at load, so the last rows and the play button arrive on the first scroll.",
    tradeoffs: "A visitor who never scrolls (the row is above the fold) sees a nearly finished page with the last rows missing until they move; on short viewports it plays fully. Not every browser plays it. Scroll-bound motion is loved and hated in equal measure."
  },
  {
    id: "turn", letter: "J", name: "3D: page turn + depth", glow: "soft" as const,
    why: "The invoice as a two-page object. On entrance the pair lays down onto the well in perspective, like a sheet placed on a desk. On hover page one turns 72° around its spine, the way you lift a page to look at the next, and page two shows through: the table continuing to the totals, which is the part of the video a developer most wants to see (it pages). A light moves across the lifting page and a shadow at the fold moves with it. The tiles stand up from flat in a wave on entrance; on hover the whole sheet tilts 8° in perspective and the tiles lift to three depths, so they parallax against each other.",
    motion: "Entrance once: book rotateX 16° → 0 over 0.9s; tiles rotateX −90° → 0, 0.7s, 60ms apart. Hover: page turn 0.9s with the sheen and fold shadow; sheet tilt 0.8s with translateZ 0/10/18px. Leave returns. Reduced motion: flat pages, flat sheet.",
    tradeoffs: "Perspective is the device the benchmark calls dated when it is static decoration (tilted walls, rotateX panels). Here it only appears on intent and returns, which is the argument for it. Page two is a real render but the turn hides the title while it plays. The depth hover needs preserve-3d, which disables the well's overflow clipping on some engines (checked in Chrome)."
  }
];

const roundThree = [
  {
    id: "build", letter: "K", name: "3D build + 3D pile", glow: "soft" as const,
    why: "Both visuals act out their card's promise in the same 3D language, facing each other. Video: an invoice gets implemented in front of you. A blank sheet stands on the card in perspective, and the invoice's sections fade in a little in front of it and move onto it, one after another; the play button lands with the totals, before the footer. Gallery: a pile of six sample documents, every one a different kind (a report with a bar chart, a certificate with a seal, a product catalogue, a dashboard, a letter, a long table), each with one touch of the card's accent. Both are pure CSS skeletons, no images, so they never look like screenshots and never need re-rendering.",
    motion: "No entrance on either card: the finished page and the pile show from the start (owner's call). Video hover: the play button goes at once, the finished content fades out in place (0.2s), the sheet tilts 10° towards the reader and the build replays once; then only the play button moves (it breathes, a ring spreads out of it every 1.8s). Gallery hover: the pile turns towards the reader and fans open (0.6s), then browses: the front page lifts off towards the reader and dissolves (0.3s), the pile advances, and the page reappears at the back; one page every 1.6s while the pointer rests, the step in progress finishes on leave. Each page throws a soft shadow onto the one behind it. Reduced motion: nothing moves.",
    tradeoffs: "Both cards run a continuous animation while hovered (the play button's pulse, the browsing), nowhere else. Placeholders instead of real renders: the cards no longer show what QuestPDF output looks like, only what kinds of documents exist. The perspective poses are static decoration between passes, the thing round two argued against; the hover turns are what keep them from being tilted walls. The gallery's lift-off dissolves rather than flying round the pile, because a page crossing the pile's depth would cut through the other pages."
  }
];

onMounted(() => {
  embed.value = new URLSearchParams(location.search).has("embed");

  const params = new URLSearchParams(location.search);
  if (params.get("hover") === "1") lab.forceHover = true;
  if (params.get("reduce") === "1") lab.reduceMotion = true;
  if (params.get("still") === "1") still.value = true;

  /* ?only=<id>: for captures, hide every pairing but one */
  const only = params.get("only");
  if (only) root.value?.querySelectorAll<HTMLElement>(":scope > .container").forEach(c => { if (c.id !== only) c.style.display = "none"; });

  /* ?t=<ms>: for captures, pause every animation and transition under the lab at that moment of its own
     timeline (entrances start about 60ms after mount; the wait lets the hover loop start too when ?hover=1) */
  const at = params.get("t");
  if (at !== null) {
    setTimeout(() => {
      frozen.value = true;
      animations().forEach(a => {
        a.pause();
        if (a.effect?.getTiming().iterations !== Infinity) a.currentTime = Number(at);
      });
    }, Number(params.get("after") ?? 400));
  }
});

function animations() {
  return root.value ? root.value.getAnimations({ subtree: true }) : [];
}

function toggleFreeze() {
  frozen.value = !frozen.value;
  animations().forEach(a => frozen.value ? a.pause() : a.play());
}

/* scrubbing sets every running animation and transition under the lab to the same fraction of its own
   delay + duration; the ring spin is left alone (it is infinite) */
function onScrub() {
  if (!frozen.value) toggleFreeze();

  const fraction = scrub.value / 1000;
  animations().forEach(a => {
    const timing = a.effect?.getTiming();
    if (!timing || timing.iterations === Infinity) return;
    const total = Number(timing.delay ?? 0) + Number(timing.duration ?? 0);
    a.currentTime = fraction * total;
  });
}
</script>

<style>

.cta-lab .lab-intro { padding-bottom: 0; }
.cta-lab .lab-intro h1 { margin-bottom: 1rem; }

.cta-lab .lab-lead {
  max-width: 880px;
  font-size: 1.0625rem;
  line-height: 1.6rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.cta-lab .lab-jump { display: flex; flex-wrap: wrap; gap: 8px 14px; margin: 1rem 0 1.5rem; font-size: 0.9375rem; }
.cta-lab .lab-jump a { color: var(--vp-c-brand-1); }

.cta-lab .lab-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 16px;
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge);
}

/* a real <button> that mirrors a.action: the router captures <a> clicks */
.cta-lab button.action {
  display: inline-block;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 12px;
  padding: 12px 24px;
  line-height: 1;
  background-color: #8883;
  color: var(--vp-c-text-1);
  font-size: 1rem;
  border: 0;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.cta-lab button.action:hover { background-color: #8885; }
.cta-lab button.action:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.cta-lab button.action.primary { color: #FFF; background-color: #2196F3; font-weight: 700; }
.cta-lab button.action.primary:hover { background-color: #1E88E5; }
.cta-lab button.action.small { padding: 8px 14px; font-size: 0.875rem; border-radius: 10px; }

.cta-lab .lab-scrub {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.cta-lab .lab-scrub input { width: 160px; }

.cta-lab .lab-phones {
  display: flex;
  gap: 24px;
  margin-top: 24px;
  overflow-x: auto;
}

.cta-lab .lab-phones figure { margin: 0; flex: none; }
.cta-lab .lab-phones iframe { border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--custom-page-bg); }
.cta-lab .lab-phones figcaption { font-size: 0.8125rem; color: var(--vp-c-text-3); margin-top: 6px; }

.cta-lab .lab-note-wide { max-width: 980px; margin: 24px 0 0; }
.cta-lab .lab-note-wide h3 { margin: 0 0 6px; font-size: 1.125rem; }
.cta-lab .lab-jump-sep { color: var(--vp-c-text-3); margin-left: 8px; }

/* the note strip above each pairing */
.cta-lab .lab-note {
  max-width: 980px;
  margin-bottom: 28px;
}

.cta-lab .lab-note-title {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 10px;
}

.cta-lab .lab-note-title h2 {
  margin: 0;
  font-size: 1.5rem;
  line-height: 2rem;
  border: 0;
  padding: 0;
}

.cta-lab .lab-letter {
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

.cta-lab .lab-note p {
  margin: 0 0 6px;
  font-size: 0.9375rem;
  line-height: 1.45rem;
  color: var(--vp-c-text-2);
}

.cta-lab .lab-note p strong { color: var(--vp-c-text-1); }

/* capture mode: end states only */
.cta-lab.still *,
.cta-lab.still *::before,
.cta-lab.still *::after {
  transition-duration: 0s !important;
  transition-delay: 0s !important;
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  animation-timeline: auto !important;
}

/* the row sits on 48px of section padding like the homepage; pairings keep a seam between them */
.cta-lab .content.pairing { padding-top: 40px; padding-bottom: 40px; }
.cta-lab.embed .content.pairing { padding-top: 16px; padding-bottom: 16px; }

</style>

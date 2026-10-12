<template>
  <!-- Lab page, not linked from anywhere. Part 1: treatments for the active link in the navbar,
       each rendered with the light and the dark tokens side by side. Part 2: what the dark bar is
       painted with, each shown at the top of a dark home canvas and of a plain docs page. The bars
       are mock-ups at the real bar's sizes (see NavbarLabBar.vue); the real bar's CSS lives in
       VitepressAdjustments.css. Delete the lab (this folder's Navbar* files and docs/navbar-lab.md)
       once both choices ship. -->
  <div class="custom-page home-page textured-page navbar-lab">
    <div class="container">
      <section class="content lab-intro">
        <h1>Navbar lab</h1>
        <p class="lab-lead">
          <strong>Part 1</strong> (0 to H): nine treatments for the current-section link. In every bar <strong>Pricing</strong> is
          active and <strong>Features</strong> is frozen in its hover state, so active and hover can be compared at a glance.
          <strong>D is chosen and already on the real bar above.</strong>
        </p>
        <p class="lab-lead">
          <strong>Part 2</strong> (S0 to S5): what the bar is painted with in dark mode. Today it is the page colour, #101010,
          which is as dark as the bar can be. Each option is shown twice: at the top of the dark home canvas (where the
          colour washes sit right under the bar) and at the top of a plain docs page (where there is nothing to show through).
          D is the active link in all of them.
        </p>

        <div class="lab-grid">
          <div class="lab-note">
            <h3>What the dark bar has to do</h3>
            <ul>
              <li><strong>Separate from the page</strong> once the visitor scrolls, so the bar reads as a fixed surface and not as page content that stopped moving.</li>
              <li><strong>Not fight the home canvas.</strong> The hero's blue wash starts directly under the bar; an opaque bar cuts it off with a hard edge, a translucent one lets it continue.</li>
              <li><strong>Hold the D pill.</strong> The white pill is the brightest thing in the bar, so the bar colour sets how loud it is: the darker the bar, the louder the pill.</li>
              <li><strong>Work on docs pages too,</strong> which are 95% of the site. There the bar sits on a flat #101010 page beside a sidebar; a lifted bar there means a visible step at the sidebar top.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>Shade notes</h3>
            <ul>
              <li><strong>S0 flat, #101010:</strong> today. The bar and the page are one colour; only the 1px divider separates them.</li>
              <li><strong>S1 lifted, #161618:</strong> the site's existing bg-alt token, one step up. Barely visible as a step, noticeable as a surface.</li>
              <li><strong>S2 elevated, #1B1B1F:</strong> close to the VitePress default dark elevated surface. A clear step.</li>
              <li><strong>S3 frosted, 72% black over blur:</strong> the canvas washes show through, dimmed. The usual "app bar" treatment.</li>
              <li><strong>S4 glass, 4.5% white over blur:</strong> the same recipe as the homepage panels, so the bar becomes one more pane of the same glass.</li>
              <li><strong>S5 cool, #121418:</strong> flat, but a touch of blue in the black so it sits with the brand washes.</li>
            </ul>
          </div>
        </div>

        <div class="lab-note lab-note-wide lab-recommendation">
          <h3>Recommendation for the surface</h3>
          <p>
            <strong>S3, frosted.</strong> Over the home canvas the blue wash continues through the bar instead of being cut off,
            and on a docs page it is indistinguishable from today's flat bar, so nothing changes where nothing should.
            The dimming keeps the D pill at the same loudness as on the flat bar. <strong>S1</strong> is the smallest honest step up if
            blur is unwanted: it reads as a surface without reading as a different colour. <strong>S4</strong> is the most
            "designed" and the riskiest, because the bar then changes brightness with whatever scrolls under it.
          </p>
        </div>
      </section>
    </div>

    <!-- Part 1: active link -->
    <lab-direction v-for="direction of directions" :key="direction.id" :id="direction.letter.toLowerCase()" :letter="direction.letter" :name="direction.name" :dots="false">
      <template #why>{{ direction.why }}</template>
      <template #tradeoffs>{{ direction.tradeoffs }}</template>

      <section class="content lab-bars">
        <div v-for="mode of ['light', 'dark']" :key="mode" class="lab-bar-frame">
          <div class="lab-caption">{{ mode }}</div>
          <navbar-lab-bar :mode="mode" :direction="direction.id" />
        </div>

        <div class="lab-swatches">
          <span v-for="swatch of direction.swatches" :key="swatch.label" class="lab-swatch">
            <span class="lab-swatch-chip" :style="{ background: swatch.value }"></span>
            <span>{{ swatch.label }}</span>
            <code>{{ swatch.value }}</code>
          </span>
        </div>
      </section>
    </lab-direction>

    <!-- Part 2: dark bar surface -->
    <div class="container lab-part">
      <section class="content">
        <h2>Part 2: the dark bar surface</h2>
        <p class="lab-lead">Six surfaces, each over the home canvas and over a docs page. Active link is D everywhere.</p>
      </section>
    </div>

    <lab-direction v-for="surface of surfaces" :key="surface.id" :id="surface.letter.toLowerCase()" :letter="surface.letter" :name="surface.name" :dots="false">
      <template #why>{{ surface.why }}</template>
      <template #tradeoffs>{{ surface.tradeoffs }}</template>

      <section class="content lab-bars">
        <div class="lab-bar-frame">
          <div class="lab-caption">home canvas</div>
          <div class="lab-stage home">
            <navbar-lab-bar mode="dark" direction="inverted" :surface="surface.id" flush active="Documentation" />
            <div class="stage-hero">
              <div class="stage-hero-title"><span>Code-first</span> PDF generation for C#</div>
              <div class="stage-hero-text">Design documents the way you design software, in readable C# that renders to precise, standards-compliant PDFs on every platform.</div>
              <div class="stage-hero-actions"><span class="stage-button primary">Quick Start</span><span class="stage-button">Features Overview</span></div>
            </div>
          </div>
        </div>

        <div class="lab-bar-frame">
          <div class="lab-caption">docs page</div>
          <div class="lab-stage docs">
            <navbar-lab-bar mode="dark" direction="inverted" :surface="surface.id" flush active="Documentation" />
            <div class="stage-docs">
              <div class="stage-sidebar">
                <div class="stage-sidebar-group">Introduction</div>
                <div class="stage-sidebar-item current">Quick start</div>
                <div class="stage-sidebar-item">Invoice tutorial</div>
                <div class="stage-sidebar-item">Roadmap</div>
                <div class="stage-sidebar-group">Concepts</div>
                <div class="stage-sidebar-item">Document structure</div>
                <div class="stage-sidebar-item">Layout engine</div>
              </div>
              <div class="stage-article">
                <div class="stage-article-title">Quick start</div>
                <div class="stage-line w80"></div>
                <div class="stage-line w95"></div>
                <div class="stage-line w60"></div>
                <div class="stage-code"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="lab-swatches">
          <span v-for="swatch of surface.swatches" :key="swatch.label" class="lab-swatch">
            <span class="lab-swatch-chip" :style="{ background: swatch.value }"></span>
            <span>{{ swatch.label }}</span>
            <code>{{ swatch.value }}</code>
          </span>
        </div>
      </section>
    </lab-direction>
  </div>
</template>

<script setup lang="ts">
import LabDirection from "./LabDirection.vue";
import NavbarLabBar from "./NavbarLabBar.vue";

const directions = [
  {
    id: "current", letter: "0", name: "Before: brand tint",
    why: "The baseline. Brand text on a 14% brand tint. Quiet, and in light mode it is only a shade away from the grey hover pill, which was the complaint.",
    tradeoffs: "Hover and active are too close in weight. On the home canvas the tint almost vanishes.",
    swatches: [{ label: "light fill", value: "#0091EA24" }, { label: "light text", value: "#0277BD" }, { label: "dark fill", value: "#0091EA24" }, { label: "dark text", value: "#4FC3F7" }]
  },
  {
    id: "solid", letter: "A", name: "Solid fill, as proposed",
    why: "The pill is filled with #1976D2 and the text turns white, in both themes. Impossible to miss, and the blue is the one the site's primary buttons already use.",
    tradeoffs: "In dark mode the same blue is mid-luminance on a near-black bar, so the pill reads as a heavy block rather than a highlight. It also looks like a button next to the search field.",
    swatches: [{ label: "fill", value: "#1976D2" }, { label: "text", value: "#FFFFFF" }]
  },
  {
    id: "solid-tuned", letter: "B", name: "Solid fill, tuned per theme",
    why: "Same device as A, with the dark theme inverted the way Material does it: a pale blue pill with dark text. Both bars get a pill that is lighter than its surroundings, so both read as a highlight rather than a block.",
    tradeoffs: "Two colours to maintain instead of one. The dark pill is the brightest thing in the bar, so it pulls the eye more than the light one does.",
    swatches: [{ label: "light fill", value: "#1976D2" }, { label: "light text", value: "#FFFFFF" }, { label: "dark fill", value: "#90CAF9" }, { label: "dark text", value: "#0B1F33" }]
  },
  {
    id: "tint", letter: "C", name: "Stronger tint, heavier text",
    why: "Keeps the old idea and turns the dials: tint from 14% to 24%, weight from 500 to 600. The smallest change that separates active from hover.",
    tradeoffs: "Still a tint, so still the quietest of the pronounced options. The heavier weight makes the active link a few pixels wider than at rest.",
    swatches: [{ label: "light fill", value: "#039BE53D" }, { label: "light text", value: "#0277BD" }, { label: "dark fill", value: "#4FC3F733" }, { label: "dark text", value: "#81D4FA" }]
  },
  {
    id: "inverted", letter: "D", name: "Inverted neutral pill (chosen)",
    why: "A black pill with white text in light mode, a white pill with black text in dark mode. Maximum contrast with no colour, the Vercel and Linear pattern. Brand blue stays reserved for actions.",
    tradeoffs: "The strongest contrast in the bar lands on navigation instead of on content or on the primary action. Can feel stark next to the soft site palette.",
    swatches: [{ label: "light fill", value: "#1C1C1E" }, { label: "light text", value: "#FFFFFF" }, { label: "dark fill", value: "#F5F5F7" }, { label: "dark text", value: "#111111" }]
  },
  {
    id: "outlined", letter: "E", name: "Outlined pill",
    why: "A one-pixel brand ring with a faint tint. The ring gives the active pill a hard edge the hover pill does not have, which is what makes it read as a state and not a hover that stuck.",
    tradeoffs: "Thin rings are fragile at 1px on low-DPI screens, and the outlined look can read as an input field next to the bordered search box.",
    swatches: [{ label: "light ring", value: "#0277BD99" }, { label: "light fill", value: "#039BE514" }, { label: "dark ring", value: "#4FC3F799" }, { label: "dark fill", value: "#4FC3F714" }]
  },
  {
    id: "underline", letter: "F", name: "Tab underline",
    why: "No pill. A 2px brand bar sits on the bottom edge of the navbar under the active link, like a browser tab or the GitHub repo tabs. The link text takes the brand colour. Hover keeps its grey pill, so the two states use different devices and never compete.",
    tradeoffs: "The indicator is at the bar edge, 14px below the text, so it is easy to miss at a glance. Does not help on the ⋯ overflow button.",
    swatches: [{ label: "light bar", value: "#0277BD" }, { label: "dark bar", value: "#4FC3F7" }]
  },
  {
    id: "tint-underline", letter: "G", name: "Tint plus marker",
    why: "The old tinted pill with a short brand bar tucked inside its bottom edge. The marker adds a second cue without a new fill colour, so it stays within the current palette.",
    tradeoffs: "Two devices on one element is busier than either alone. The marker is small and needs a careful offset so it does not look like a rendering glitch.",
    swatches: [{ label: "light fill", value: "#0091EA24" }, { label: "light marker", value: "#0277BD" }, { label: "dark fill", value: "#0091EA24" }, { label: "dark marker", value: "#4FC3F7" }]
  },
  {
    id: "text", letter: "H", name: "Colour and weight only",
    why: "No fill at all. Brand colour and 700 weight on the text. The least decorated option; the active link is the only coloured word in the bar, which is enough on a text-led site.",
    tradeoffs: "Hover (grey pill) becomes visually heavier than active (no pill), which inverts the hierarchy the moment the pointer moves. Weight change shifts neighbouring links.",
    swatches: [{ label: "light text", value: "#0277BD" }, { label: "dark text", value: "#4FC3F7" }]
  }
];

const surfaces = [
  {
    id: "flat", letter: "S0", name: "Flat: the page colour (today)",
    why: "Bar and page are the same #101010; a 1px divider is the only edge. The quietest possible bar, and the one that makes the white D pill loudest.",
    tradeoffs: "Over the home canvas the bar cuts the blue wash off with a hard line. Once scrolled, the bar only reads as a surface because content disappears under it.",
    swatches: [{ label: "bar", value: "#101010" }, { label: "divider", value: "rgba(82, 82, 89, 0.32)" }]
  },
  {
    id: "lifted", letter: "S1", name: "Lifted one step",
    why: "The site's bg-alt token, #161618, which the sidebar and code blocks already use. The bar becomes a surface in its own right without introducing a new colour.",
    tradeoffs: "On docs pages the bar is now lighter than the article but the same as the sidebar, so the sidebar's top edge disappears. Small enough that some screens will not show the step.",
    swatches: [{ label: "bar", value: "#161618" }, { label: "divider", value: "rgba(82, 82, 89, 0.32)" }]
  },
  {
    id: "elevated", letter: "S2", name: "Elevated",
    why: "#1B1B1F, close to the VitePress default elevated surface. An unmistakable step up from the page, the conventional app-bar look.",
    tradeoffs: "The lightest opaque option, so the D pill loses some punch. On the home canvas it is a grey band across a blue wash, the least integrated of the six.",
    swatches: [{ label: "bar", value: "#1B1B1F" }, { label: "divider", value: "rgba(255, 255, 255, 0.08)" }]
  },
  {
    id: "frosted", letter: "S3", name: "Frosted",
    why: "72% black over a 16px blur. The canvas continues through the bar, dimmed, so the hero wash is not cut off; on a docs page nothing is under the bar and it looks exactly like S0. Text contrast stays safe because the fill is mostly black.",
    tradeoffs: "Backdrop blur costs a little on scroll on weak machines. The bar's exact colour depends on what is under it, which some find unsettling in screenshots.",
    swatches: [{ label: "bar", value: "rgba(16, 16, 16, 0.72)" }, { label: "blur", value: "#8884" }]
  },
  {
    id: "glass", letter: "S4", name: "Glass, like the panels",
    why: "The same recipe as the homepage panels in dark mode: 4.5% white over a blur. The bar becomes one more pane of the glass the page is built from, and the hero wash shows through nearly undimmed.",
    tradeoffs: "The brightest, most changeable bar: its tone follows whatever scrolls under it, and over a white screenshot or code block it turns light grey. Needs the divider lightened to stay visible.",
    swatches: [{ label: "bar", value: "rgba(255, 255, 255, 0.045)" }, { label: "divider", value: "rgba(255, 255, 255, 0.08)" }]
  },
  {
    id: "cool", letter: "S5", name: "Cool black",
    why: "Flat and opaque like S0, but #121418 instead of neutral black: a hint of blue so the bar belongs to the brand washes instead of sitting on top of them. The divider is tinted to match.",
    tradeoffs: "On docs pages the tint is visible against the neutral #101010 article, which can look like a mistake rather than a choice unless the page tokens move with it.",
    swatches: [{ label: "bar", value: "#121418" }, { label: "divider", value: "rgba(120, 140, 170, 0.22)" }]
  }
];
</script>

<style scoped>

.navbar-lab .lab-intro h1 {
  margin: 0 0 16px;
  font-size: 2.5rem;
  line-height: 3rem;
}

.lab-lead {
  max-width: 820px;
  font-size: 1.0625rem;
  line-height: 1.75rem;
  color: var(--vp-c-text-2);
}

.lab-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.lab-note {
  padding: 24px 28px;
  border-radius: 20px;
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge);
}

.lab-note h3 {
  margin: 0 0 12px;
  font-size: 1rem;
  font-weight: 600;
}

.lab-note ul {
  margin: 0;
  padding-left: 20px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.lab-note li + li {
  margin-top: 6px;
}

.lab-note p {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.lab-note-wide {
  margin-top: 24px;
}

.lab-recommendation {
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent);
}

.lab-part {
  margin-top: 96px;
}

.lab-part h2 {
  margin: 0 0 8px;
  font-size: 2rem;
  line-height: 2.5rem;
}

@media screen and (max-width: 768px) {
  .lab-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}


/* One direction: the bars and the swatches used */

.lab-bars {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 24px;
}

.lab-caption {
  margin-bottom: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.lab-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

.lab-swatch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.lab-swatch-chip {
  width: 16px;
  height: 16px;
  border-radius: 5px;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 20%, transparent);
}

.lab-swatch code {
  font-size: 0.75rem;
}


/* Stages for part 2: a dark page top, with the bar flush at its top edge.
   The home stage repeats the top of the dark home canvas (grain plus the first washes, see HomePage.vue);
   the docs stage is the flat page with a sidebar sketch. Both are painted here with fixed colours, so
   they look the same whatever theme the lab itself is viewed in. */

.lab-stage {
  --stage-text-1: rgba(255, 255, 245, 0.86);
  --stage-text-2: rgba(235, 235, 245, 0.6);
  --stage-text-3: rgba(235, 235, 245, 0.38);

  border: 1px solid rgba(82, 82, 89, 0.32);
  border-radius: 14px;
  overflow: hidden;
  background-color: #101010;
  color: var(--stage-text-1);
}

.lab-stage.home {
  background-image:
      url("/homepage/grain.png"),
      radial-gradient(ellipse 900px 420px at 92% 0%, color-mix(in srgb, #2196F3 24%, transparent), transparent 70%),
      radial-gradient(ellipse 700px 320px at 30% 0%, color-mix(in srgb, #00BCD4 7%, transparent), transparent 70%),
      radial-gradient(ellipse 600px 320px at 0% 2%, color-mix(in srgb, #5C6BC0 12%, transparent), transparent 70%),
      radial-gradient(ellipse 700px 300px at 55% 30%, color-mix(in srgb, #00ACC1 9%, transparent), transparent 70%);
  background-size: 256px 256px, auto, auto, auto, auto;
  background-repeat: repeat, no-repeat, no-repeat, no-repeat, no-repeat;
}

.stage-hero {
  padding: 36px 40px 40px;
}

.stage-hero-title {
  font-size: 2.5rem;
  line-height: 3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.stage-hero-title span {
  background: linear-gradient(90deg, #4FC3F7, #2979FF);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.stage-hero-text {
  max-width: 560px;
  margin-top: 16px;
  font-size: 1.0625rem;
  line-height: 1.625rem;
  color: var(--stage-text-2);
}

.stage-hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.stage-button {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
  background-color: #8883;
  color: var(--stage-text-1);
}

.stage-button.primary {
  background-color: #2196F3;
  color: #ffffff;
  font-weight: 600;
}

.stage-docs {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
}

.stage-sidebar {
  padding: 24px 24px 32px;
  background-color: #161618;
  border-right: 1px solid rgba(82, 82, 89, 0.32);
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.stage-sidebar-group {
  margin-top: 12px;
  font-weight: 700;
  color: var(--stage-text-1);
}

.stage-sidebar-group:first-child {
  margin-top: 0;
}

.stage-sidebar-item {
  color: var(--stage-text-2);
}

.stage-sidebar-item.current {
  color: #4FC3F7;
}

.stage-article {
  padding: 32px 40px 40px;
}

.stage-article-title {
  font-size: 1.75rem;
  line-height: 2.25rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.stage-line {
  height: 10px;
  margin-bottom: 12px;
  border-radius: 5px;
  background-color: rgba(235, 235, 245, 0.12);
}

.stage-line.w80 { width: 80%; }
.stage-line.w95 { width: 95%; }
.stage-line.w60 { width: 60%; }

.stage-code {
  height: 56px;
  margin-top: 20px;
  border-radius: 8px;
  background-color: #161618;
}

@media screen and (max-width: 700px) {
  .stage-docs {
    grid-template-columns: minmax(0, 1fr);
  }

  .stage-sidebar {
    display: none;
  }

  .stage-hero-title {
    font-size: 1.75rem;
    line-height: 2.25rem;
  }
}

</style>

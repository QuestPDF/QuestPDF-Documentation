<script setup lang="ts">
import HomePageAgentDemo from "./HomePageAgentDemo.vue";

/* Three cards in two columns, replacing the former "Enterprise-grade foundations" and "Industry-standard
   PDF compliance" sections. Each card carries its own heading, like the Companion App and license cards.
   Left column, two cards stacked: the compliance story (the promise and the independent validators, then
   the supported conformance levels as chips grouped by purpose) above the foundations as a two-by-two grid
   of short labels and concrete facts, one per thing a manager, product owner or programmer checks before
   buying; a cell with a supporting page is a link to it. Right column,
   one card the full height of the pair: how AI agents develop documents with the library, shown as a looped
   simulation of one round (prompt, status, diff). */

interface StandardsCategory {
  title: string;
  levels: string[];
}

/* every conformance level the library can produce, grouped by what the buyer needs it for; the
   description names no standards, so both the purposes and the standard names live here.
   Each inner array is one row: archiving alone (six chips), the two short groups side by side */
const standardsRows : StandardsCategory[][] = [
  [
    {
      title: "Archiving",
      levels: ["PDF/A-2b", "PDF/A-2u", "PDF/A-2a", "PDF/A-3b", "PDF/A-3u", "PDF/A-3a"]
    }
  ],
  [
    {
      title: "Accessibility",
      levels: ["PDF/UA-1"]
    },
    {
      title: "E-invoicing",
      levels: ["EN 16931", "ZUGFeRD", "Factur-X"]
    }
  ]
];

interface Fact {
  label: string;
  text: string;
  /* the page that backs the claim; a fact without one renders as plain text */
  href?: string;
}

/* the four strongest enterprise arguments, a short label and concrete facts each; the frameworks and
   operating systems repeat the support matrix of the NuGet package README (.NET 6+ and .NET Framework
   4.6.2+; the package ships net6.0, net8.0 and net10.0 builds, Windows, Linux and macOS natives). No
   measured benchmark is published, so the performance line stays qualitative and unlinked */
const facts : Fact[] = [
  {
    label: "Data privacy",
    text: "No network calls, no telemetry, no license server. Works air-gapped.",
    href: "/security-policy"
  },
  {
    label: "Platforms and runtimes",
    text: "Windows, Linux and macOS. .NET 6 to .NET 10 and .NET Framework 4.6.2+. Docker, AWS Lambda, Azure Functions."
  },
  {
    label: "Performance",
    text: "Thousands of pages per second with low CPU and memory usage."
  },
  {
    label: "Languages and scripts",
    text: "Arabic, Hebrew, CJK, emoji and 100+ scripts. Bi-directional layout and advanced text shaping.",
    href: "/api-reference/text/font-management#covering-additional-languages"
  }
];

</script>

<template>
  <section class="content">
    <div class="layout">
      <div class="column">
        <!-- the compliance story; the promise and validators in the description, the conformance levels as grouped chips -->
        <div class="panel compliance">
          <h2 class="card-title">Industry-standard output</h2>
          <!-- the promise and the evidence in one breath: standards out of the box, validated independently on every build -->
          <p class="card-description">
            Generate PDFs that meet industry standards out of the box.
            Every build is automatically validated with the independent, open-source
            <a href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> and
            <a href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a> validators.
          </p>

          <div class="standards">
            <div v-for="(row, index) of standardsRows" :key="index" class="standards-row">
              <section v-for="category of row" :key="category.title" class="standards-category">
                <h3 class="standards-category-title">{{ category.title }}</h3>
                <div class="standards-badges">
                  <span v-for="level in category.levels" :key="level">{{ level }}</span>
                </div>
              </section>
            </div>
          </div>
        </div>

        <!-- the foundations as a two-by-two grid of short labels and concrete facts, no icons; a cell
             backed by a page is one link, the label underlines and grows an arrow on hover -->
        <div class="panel foundations">
          <h2 class="card-title">Enterprise-grade foundations</h2>

          <div class="facts">
            <component
                v-for="fact of facts"
                :key="fact.label"
                :is="fact.href ? 'a' : 'div'"
                :href="fact.href"
                class="fact"
                :class="{ linked: fact.href }">
              <span class="fact-label">
                <span class="fact-label-text">{{ fact.label }}</span>
                <i v-if="fact.href" class="fa-regular fa-arrow-right fact-arrow" aria-hidden="true"></i>
              </span>
              <span class="fact-text">{{ fact.text }}</span>
            </component>
          </div>
        </div>
      </div>

      <!-- the AI story: one simulated round with an agent -->
      <div class="panel agents">
        <div class="background-gradient" />

        <h2 class="card-title">Develop with AI agents</h2>
        <p class="card-description">
          Describe the document you need and let your AI agent write, refine and fix the layout code,
          while you review the result. QuestPDF gives agents what they need to get it right.
        </p>

        <home-page-agent-demo />
      </div>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Two equal columns: a stack of two cards on the left, one card the full height of the stack on the
   right; everything in one column on narrow screens */

.layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.layout .panel {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

@media screen and (max-width: 960px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }
}


/* Conformance levels: one group per purpose, each a wrapped set of chips under a quiet one-word
   label; the label is small uppercase secondary text, so the chips stay the thing the eye lands on.
   Groups in the same row sit side by side and wrap under each other when the card gets narrow */

.standards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
}

.standards-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 40px;
}

.standards-category-title {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.standards-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

/* same white-on-grey style as the chips in the other homepage cards */
.standards-badges > span {
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  line-height: 1;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: var(--home-surface-inner);
}


/* The validator names in the description are linked to the tools' sites */

.compliance .card-description a {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  text-underline-offset: 3px;
  transition: text-decoration-color 0.2s;
}

.compliance .card-description a:hover {
  text-decoration-color: var(--vp-c-text-1);
}


/* Facts: two columns of label-plus-text cells. The column gap alone separates the columns; one
   hairline in the panel's divider colour separates the rows. The cells carry the row spacing as
   padding, so the line runs the full width of the grid; the outer edges stay open.
   The label is the scanning anchor: the same small uppercase style as the chip categories above,
   in the primary text colour, over a smaller, quieter line of facts */

.facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 32px;
  margin: 32px 0 0; /* the same distance the chips keep from the description in the card above */
}

.fact {
  min-width: 0;
  padding: 12px 0;
}

.fact:nth-child(-n + 2) {
  padding-top: 0;
}

.fact:nth-last-child(-n + 2) {
  padding-bottom: 0;
}

.fact:nth-child(n + 3) {
  border-top: 1px solid var(--vp-c-divider);
}

/* one column: every cell after the first gets a line above */
@media screen and (max-width: 500px) {
  .facts {
    grid-template-columns: minmax(0, 1fr);
  }

  .fact:nth-child(2) {
    padding-top: 12px;
  }

  .fact:nth-last-child(2) {
    padding-bottom: 12px;
  }

  .fact:nth-child(n + 2) {
    border-top: 1px solid var(--vp-c-divider);
  }
}

.fact-label {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}

.fact-text {
  display: block;
  margin: 4px 0 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-2);
}


/* A linked cell reads like the plain ones until pointed at: then the label underlines and a small
   arrow slides in beside it, the same arrow as the links in the Companion card; the text below does
   not change. The focus ring is the one the CTA cards use */

.fact.linked {
  color: inherit;
  text-decoration: none;
  border-radius: 4px;
}

.fact.linked:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

.fact-label-text {
  text-decoration: underline transparent;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: text-decoration-color 0.2s;
}

.fact.linked:is(:hover, :focus-visible) .fact-label-text {
  text-decoration-color: currentColor;
}

.fact-arrow {
  font-size: 0.6875rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s, transform 0.25s ease;
}

.fact.linked:is(:hover, :focus-visible) .fact-arrow {
  opacity: 1;
  transform: translateX(0);
}


/* The foundations card takes the column's spare height, so the stack ends level with the AI card */

.column .foundations {
  flex-grow: 1;
}


/* AI card: a faint purple glow from the top-left corner behind the heading, the same device as the
   license card's green, in the accent the simulation inside uses; no rays, to keep it quiet */

.agents {
  --accent: #7E57C2;
  --accent-secondary: #AB47BC;
  position: relative;
  isolation: isolate; /* keeps the glow (z-index: -1) above the panel background but below the content */
}

.agents .background-gradient {
  position: absolute;
  pointer-events: none;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  overflow: hidden;
  background-image:
      radial-gradient(ellipse 90% 55% at 0% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent),
      radial-gradient(ellipse 50% 30% at 0% 0%, color-mix(in srgb, var(--accent-secondary) 4%, transparent), transparent);
}

</style>

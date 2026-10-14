<script setup lang="ts">
/* Two cards side by side, replacing the former "Enterprise-grade foundations" and "Industry-standard
   PDF compliance" sections. Each card carries its own heading, like the Companion App and license cards.
   Left, the compliance story: the promise and the independent validators, then the supported conformance
   levels as chips grouped by purpose. Right, no heading: the foundations fill the card as a two-by-two
   grid of short labels and concrete facts divided by hairlines, one cell per thing a manager, product
   owner or programmer checks before buying; a cell with a supporting page is a link to it. */

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

      <!-- the foundations as a two-by-two grid of short labels and concrete facts, no heading and no
           icons; a cell backed by a page is one link, the label underlines and grows an arrow on hover -->
      <section class="panel foundations" aria-label="Enterprise-grade foundations">
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
      </section>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Two equal columns, one card each, the same height; everything in one column on narrow screens */

.layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  width: 100%;
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


/* Facts: four cells in a two-by-two grid that fills the card, divided by a cross of hairlines in
   the panel's divider colour: one vertical line between the columns, one horizontal line between
   the rows. The cells carry the spacing as padding, so both lines run edge to edge of the grid
   while the outer edges stay open; the content sits in the middle of each quadrant.
   The label is the scanning anchor: the same small uppercase style as the chip categories in the
   card beside it, in the primary text colour, over a quieter line of facts */

.facts {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: minmax(0, 1fr);
}

.fact {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 32px;
}

/* left column: open on the left; right column: open on the right, the vertical line on its left */
.fact:nth-child(odd) {
  padding-left: 0;
}

.fact:nth-child(even) {
  padding-right: 0;
  border-left: 1px solid var(--vp-c-divider);
}

/* first row: open on top; second row: open at the bottom, the horizontal line on its top */
.fact:nth-child(-n + 2) {
  padding-top: 0;
}

.fact:nth-child(n + 3) {
  padding-bottom: 0;
  border-top: 1px solid var(--vp-c-divider);
}

/* one column: no vertical line, every cell after the first gets a line above */
@media screen and (max-width: 500px) {
  .facts {
    grid-template-columns: minmax(0, 1fr);
  }

  .fact {
    padding: 20px 0;
    border-left: none;
  }

  .fact:first-child {
    padding-top: 0;
  }

  .fact:last-child {
    padding-bottom: 0;
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
  margin: 6px 0 0;
  font-size: 1rem;
  line-height: 1.5rem;
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

</style>

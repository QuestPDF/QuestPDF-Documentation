<script setup lang="ts">
/* Two cards side by side, replacing the former "Enterprise-grade foundations", "Industry-standard
   PDF compliance" and platform sections. Left, with a heading like the Companion App and license cards,
   the compliance story: the promise and the independent validators, then the supported conformance
   levels as chips grouped by purpose. Right, no heading: a two-by-two grid of cells divided by a cross
   of hairlines, one per thing a manager, product owner or programmer checks before buying. The first
   cell is the data privacy fact, linked to its page; the other three answer whether the library runs
   in the buyer's environment: the runtimes as text, the operating systems and the deployment
   environments as small monochrome logos with labels. Everything is visible at once. */

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
  /* the page that backs the claim */
  href: string;
}

const privacy : Fact = {
  label: "Data privacy",
  text: "No network calls, no telemetry, no license server. Works air-gapped.",
  href: "/security-policy"
};

interface Platform {
  name: string;
  /* logo in /homepage/supported-platforms, painted in the text colour through a CSS mask; a runtime has none */
  src?: string;
  /* rendered logo height in px, inside a slot of fixed width so the labels line up; the marks differ
     in proportion (the Windows flag is nearly square, the Docker whale and the AWS smile are wide),
     so each gets its own height for an even optical weight */
  height?: number;
}

interface PlatformGroup {
  label: string;
  platforms: Platform[];
}

const platformGroups : PlatformGroup[] = [
  {
    /* as the package README states them: .NET 6 and later, .NET Framework 4.6.2 and later */
    label: "Runtimes",
    platforms: [
      { name: ".NET 6+" },
      { name: ".NET Framework 4.6.2+" }
    ]
  },
  {
    label: "Operating systems",
    platforms: [
      { name: "Windows", src: "windows.svg", height: 17 },
      { name: "Linux", src: "linux.svg", height: 18 },
      { name: "macOS", src: "apple.svg", height: 18 }
    ]
  },
  {
    label: "Deployment",
    platforms: [
      { name: "Docker", src: "docker.svg", height: 17 },
      { name: "Azure", src: "azure.svg", height: 17 },
      { name: "AWS", src: "aws.svg", height: 18 }
    ]
  }
];

</script>

<template>
  <section class="content">
    <div class="layout">
      <!-- the compliance story; the promise and validators in the description, the conformance levels as grouped chips -->
      <div class="panel compliance">
        <h2 class="card-title">Industry-standard output</h2>
        <!-- the evidence: validated independently on every build -->
        <p class="card-description">
          Every build is automatically validated with the independent, trusted and open-source
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

      <!-- the foundations as a two-by-two grid of cells, no heading and no icons: the privacy fact
           (one link, the label underlines and grows an arrow on hover) and the three platform groups -->
      <section class="panel foundations" aria-label="Enterprise-grade foundations">
        <div class="cells">
          <a :href="privacy.href" class="cell fact">
            <span class="cell-label">
              <span class="cell-label-text">{{ privacy.label }}</span>
              <i class="fa-regular fa-arrow-right fact-arrow" aria-hidden="true"></i>
            </span>
            <span class="fact-text">{{ privacy.text }}</span>
          </a>

          <section v-for="group of platformGroups" :key="group.label" class="cell group">
            <h3 class="cell-label">{{ group.label }}</h3>

            <ul class="platforms">
              <li v-for="platform of group.platforms" :key="platform.name" class="platform">
                <span
                    v-if="platform.src"
                    class="platform-logo"
                    aria-hidden="true"
                    :style="{
                      '--logo': `url(/homepage/supported-platforms/${platform.src})`,
                      height: `${platform.height}px`
                    }"></span>
                <span>{{ platform.name }}</span>
              </li>
            </ul>
          </section>
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

.layout > .panel {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

@media screen and (max-width: 960px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }
}


/* Conformance levels: one group per purpose, each a wrapped set of chips under a one-word label in
   the same small uppercase style as the cell labels in the card beside it.
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

/* the same label style as the cells in the card beside it */
.standards-category-title {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}

.standards-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

/* small labels on the inset layer of the surface (--home-surface-inner, see CustomPages.css) */
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


/* Cells: four in a two-by-two grid that fills the card, divided by a cross of hairlines in the
   panel's divider colour: one vertical line between the columns, one horizontal line between the
   rows. The cells carry the spacing as padding, so both lines run edge to edge of the grid while
   the outer edges stay open; the content sits in the middle of each quadrant.
   The label is the scanning anchor: the same small uppercase style as the chip categories in the
   card beside it, in the primary text colour, over quieter secondary text */

.cells {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: minmax(0, 1fr);
}

.cell {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 32px;
}

/* left column: open on the left; right column: open on the right, the vertical line on its left */
.cell:nth-child(odd) {
  padding-left: 0;
}

.cell:nth-child(even) {
  padding-right: 0;
  border-left: 1px solid var(--vp-c-divider);
}

/* first row: open on top; second row: open at the bottom, the horizontal line on its top */
.cell:nth-child(-n + 2) {
  padding-top: 0;
}

.cell:nth-child(n + 3) {
  padding-bottom: 0;
  border-top: 1px solid var(--vp-c-divider);
}

/* one column: no vertical line, every cell after the first gets a line above */
@media screen and (max-width: 500px) {
  .cells {
    grid-template-columns: minmax(0, 1fr);
  }

  .cell,
  .cell:nth-child(even) {
    padding: 20px 0;
    border-left: none;
  }

  .cell:first-child {
    padding-top: 0;
  }

  .cell:last-child {
    padding-bottom: 0;
  }

  .cell:nth-child(n + 2) {
    border-top: 1px solid var(--vp-c-divider);
  }
}

.cell-label {
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


/* The platform groups: the items in a vertical list, a logo and a label each, in the fact text style */

.platforms {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
}

.platform {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

/* the logos are painted through a mask in the text colour, inside a slot of one fixed width so the
   labels line up in a column; the height comes from the data, see the Platform interface */

.platform-logo {
  flex-shrink: 0;
  display: inline-block;
  width: 24px;
  background-color: color-mix(in srgb, var(--vp-c-text-2) 90%, transparent);
  mask: var(--logo) center / contain no-repeat;
  -webkit-mask: var(--logo) center / contain no-repeat;
}


/* The linked cell reads like the plain ones until pointed at: then the label underlines and a small
   arrow slides in beside it, the same arrow as the links in the Companion card; the text below does
   not change. The focus ring is the one the CTA cards use */

.fact {
  color: inherit;
  text-decoration: none;
  border-radius: 4px;
}

.fact:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

.cell-label-text {
  text-decoration: underline transparent;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: text-decoration-color 0.2s;
}

.fact:is(:hover, :focus-visible) .cell-label-text {
  text-decoration-color: currentColor;
}

.fact-arrow {
  font-size: 0.6875rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s, transform 0.25s ease;
}

.fact:is(:hover, :focus-visible) .fact-arrow {
  opacity: 1;
  transform: translateX(0);
}

</style>

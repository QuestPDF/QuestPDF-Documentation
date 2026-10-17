<script setup lang="ts">
/* Two panels: the compliance story (the validators, then the conformance levels as chips grouped by
   purpose), and a two-by-two grid of what buyers check first: data privacy (linked to its policy), the
   runtimes, the operating systems and the deployment environments. */

interface StandardsCategory {
  title: string;
  levels: string[];
}

/* every conformance level the library produces, grouped by purpose */
const standards : StandardsCategory[] = [
  {
    title: "Archiving",
    levels: ["PDF/A-2b", "PDF/A-2u", "PDF/A-2a", "PDF/A-3b", "PDF/A-3u", "PDF/A-3a"]
  },
  {
    title: "Accessibility",
    levels: ["PDF/UA-1"]
  },
  {
    title: "E-invoicing",
    levels: ["EN 16931", "ZUGFeRD", "Factur-X"]
  }
];

interface PlatformGroup {
  label: string;
  platforms: string[];
}

const platformGroups : PlatformGroup[] = [
  {
    /* as the package README states them: .NET 6 and later, .NET Framework 4.6.2 and later; Native AOT as
       listed under "Recently delivered" on the roadmap */
    label: "Runtimes",
    platforms: [".NET 6+", ".NET Framework 4.6.2+", "Native AOT"]
  },
  {
    label: "Operating systems",
    platforms: ["Windows", "Linux", "macOS"]
  },
  {
    label: "Deployment",
    platforms: ["Docker", "Azure", "AWS"]
  }
];

/* the Font Awesome brand mark beside a name; the runtimes have none, and Azure takes Microsoft's (Font Awesome
   has no Azure mark) */
const platformIcons : Record<string, string> = {
  Windows: "fa-windows",
  Linux: "fa-linux",
  macOS: "fa-apple",
  Docker: "fa-docker",
  Azure: "fa-microsoft",
  AWS: "fa-aws"
};

</script>

<template>
  <div class="trust">
    <div class="panel compliance">
      <h2 class="card-title">Industry-standard output</h2>
      <p class="card-description">
        Every build is automatically validated with the independent, trusted and open-source
        <a href="https://verapdf.org/" target="_blank">veraPDF</a> and
        <a href="https://www.mustangproject.org/" target="_blank">Mustang</a> validators.
      </p>

      <div class="standards">
        <section v-for="category of standards" :key="category.title" class="standards-category">
          <h3 class="label">{{ category.title }}</h3>
          <div class="standards-badges">
            <span v-for="level in category.levels" :key="level">{{ level }}</span>
          </div>
        </section>
      </div>
    </div>

    <section class="panel cells" aria-label="Enterprise-grade foundations">
      <a href="/security-policy" class="cell fact">
        <span class="label">
          <span class="label-text">Data privacy</span>
          <i class="fa-regular fa-arrow-right fact-arrow" aria-hidden="true"></i>
        </span>
        <span class="fact-text">No network calls, no telemetry, no license server. Works air-gapped.</span>
      </a>

      <section v-for="group of platformGroups" :key="group.label" class="cell">
        <h3 class="label">{{ group.label }}</h3>

        <ul class="platforms">
          <li v-for="platform of group.platforms" :key="platform" class="platform">
            <i v-if="platformIcons[platform]" class="fa-brands platform-icon" :class="platformIcons[platform]" aria-hidden="true"></i>
            {{ platform }}
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<style scoped>

/* side by side from 1181px; narrower, the facts in the two-by-two grid would be squeezed to a few words a line */
.trust {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

@media screen and (max-width: 1180px) {
  .trust {
    grid-template-columns: minmax(0, 1fr);
  }
}


/* the label over each group and cell, the scanning anchor of both panels */

.label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}


/* the first group (archiving) fills a row; the others share the next one and wrap when narrow */

.standards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 40px;
  margin-top: 32px;
}

.standards-category:first-child {
  flex-basis: 100%;
}

.standards-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.standards-badges > span {
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  line-height: 1;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: var(--surface-inner);
}


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


/* Cells: a two-by-two grid divided by a cross of hairlines. The cells pad only their inner sides, so the
   lines run edge to edge while the outer edges stay open. */

.cells {
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

/* one column below 541px, where two would not fit ".NET Framework 4.6.2+": no vertical line, every cell after
   the first gets a line above; :nth-child(n) matches every cell and weighs as much as the two-column rules
   above, so it replaces their paddings */
@media screen and (max-width: 540px) {
  .cells {
    grid-template-columns: minmax(0, 1fr);
  }

  .cell:nth-child(n) {
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

.fact-text {
  display: block;
  margin: 6px 0 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}


.platforms {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 6px 0 0;
}

.platform {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

/* a fixed-width slot, so the names line up whatever the mark's shape */
.platform-icon {
  flex-shrink: 0;
  width: 24px;
  text-align: center;
  font-size: 1.0625rem;
  color: var(--vp-c-text-2);
}


/* the linked cell reads like the others until pointed at: then its label underlines and an arrow slides in */

.fact {
  border-radius: 4px;
}

.fact:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

.label-text {
  text-decoration: underline transparent;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: text-decoration-color 0.2s;
}

.fact:is(:hover, :focus-visible) .label-text {
  text-decoration-color: currentColor;
}

.fact-arrow {
  font-size: 1rem;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s, transform 0.25s ease;
}

.fact:is(:hover, :focus-visible) .fact-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* a touch screen never hovers, so there the cues show at rest, or the link would read as plain text */
@media (hover: none) {
  .label-text {
    text-decoration-color: currentColor;
  }

  .fact-arrow {
    opacity: 1;
    transform: none;
  }
}

</style>

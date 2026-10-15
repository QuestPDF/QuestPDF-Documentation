<script setup lang="ts">
/* D · Same library, every tier. The licence as a short table of terms in which every row that is the
   same for all three tiers is one cell spanning the three columns. The shape of the table is the
   message ("License Equality" in the Selection Guide): most rows are one long bar, and only scope,
   support and continuity split into columns. Written for the reader who has to approve the purchase. */
import { communityExclusion, links, prices, revenueNote, usd } from "./licenseFacts";

const tiers = [
  { id: "community", name: "Community", price: "Free", per: "", href: links.community },
  { id: "professional", name: "Professional", price: usd(prices.professional), per: "/ year", href: links.paid },
  { id: "enterprise", name: "Enterprise", price: usd(prices.enterprise), per: "/ year", href: links.paid }
];

/* `all` spans the three tier columns; `cells` has one entry per column, and an entry with `span: 2`
   covers the two paid columns */
interface Row {
  label: string;
  all?: string;
  cells?: { text: string; span?: number }[];
}

/* the column names a split cell belongs to, shown above the cell on phones */
function columnName(index: number, span?: number) {
  if (span === 2)
    return "Professional and Enterprise";
  return tiers[index]?.name ?? "";
}

const rows: Row[] = [
  {
    label: "Who it covers",
    cells: [
      { text: "Individuals, open source, charities, academia, companies under $1M revenue" },
      { text: "One legal entity" },
      { text: "A group of affiliated companies" }
    ]
  },
  { label: "Features", all: "Every feature, identical in every tier" },
  { label: "Developers", all: "Unlimited, with no seat counting; servers, projects and deployments too" },
  { label: "Redistribution", all: "Royalty-free inside your SaaS, desktop and on-premises apps" },
  { label: "License checks", all: "None: no keys, no activation, no telemetry, no routine audits" },
  {
    label: "Versions you keep",
    cells: [
      { text: "Every release, while you qualify" },
      { text: "Every release from your paid years, forever, with renewals at a locked price", span: 2 }
    ]
  },
  {
    label: "Support",
    cells: [
      { text: "GitHub community" },
      { text: "Direct email" },
      { text: "Next business day, priority fixes, 12-month end-of-life notice" }
    ]
  }
];
</script>

<template>
  <section class="content">
    <div class="panel ld-panel">
      <div class="ld-head">
        <div>
          <h2 class="card-title">One library, three licenses</h2>
          <p class="card-description">The same product in every tier. The tiers differ only in whom they cover, which releases you keep and how you get support.</p>
        </div>
        <div class="ld-actions">
          <a class="action primary" :href="links.pricing">View Pricing</a>
          <a class="action" :href="links.guide">License Selection Guide</a>
        </div>
      </div>

      <div class="ld-table" role="table" aria-label="License terms by tier">
        <div class="ld-row ld-row-head" role="row">
          <span class="ld-corner" role="columnheader"></span>
          <a v-for="tier of tiers" :key="tier.id" :href="tier.href" class="ld-tier" :class="tier.id" role="columnheader">
            <span class="ld-tier-name">{{ tier.name }}</span>
            <span class="ld-tier-price">{{ tier.price }}<span v-if="tier.per" class="ld-tier-per"> {{ tier.per }}</span></span>
          </a>
        </div>

        <div v-for="row of rows" :key="row.label" class="ld-row" :class="{ shared: row.all }" role="row">
          <span class="ld-label" role="rowheader">{{ row.label }}</span>
          <span v-if="row.all" class="ld-cell ld-all" role="cell">
            <i class="fa-regular fa-equals" aria-hidden="true"></i>
            {{ row.all }}
          </span>
          <template v-else>
            <span
                v-for="(cell, index) of row.cells"
                :key="index"
                class="ld-cell"
                :class="{ 'ld-span-2': cell.span === 2 }"
                :data-tier="columnName(index, cell.span)"
                role="cell">{{ cell.text }}</span>
          </template>
        </div>
      </div>

      <p class="ld-exclusion">{{ revenueNote }} {{ communityExclusion }}</p>

      <p class="ld-documents">
        The full terms:
        <a :href="links.community">Community License</a>,
        <a :href="links.paid">Professional / Enterprise License</a>,
        <a :href="links.documents">all legal documents</a>.
      </p>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
}

.ld-panel {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.ld-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px 48px;
}

.ld-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  flex-shrink: 0;
}

/* The table: a label column and three tier columns on one grid, rows split by hairlines */

.ld-table {
  display: flex;
  flex-direction: column;
}

.ld-row {
  display: grid;
  grid-template-columns: 200px repeat(3, minmax(0, 1fr));
  column-gap: 8px;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.ld-row-head {
  align-items: start;
  padding: 0 0 14px;
  border-top: none;
}

.ld-tier {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 16px;
  color: inherit;
  text-decoration: none;
}

.ld-tier-name {
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-1);
}

.community .ld-tier-name { color: #2E7D32; }
.professional .ld-tier-name { color: #1E88E5; }
html.dark .community .ld-tier-name { color: #A5D6A7; }
html.dark .professional .ld-tier-name { color: #64B5F6; }

.ld-tier-price {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.ld-tier-per {
  margin-left: 4px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.ld-tier:hover .ld-tier-name {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.ld-label {
  font-size: 0.9375rem;
  line-height: 1.375rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.ld-cell {
  padding: 8px 16px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

/* a shared term is one bar across the three columns: the equality is visible before it is read */
.ld-all {
  grid-column: 2 / span 3;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  background-color: var(--home-surface-inner);
  color: var(--vp-c-text-1);
}

.ld-all i {
  width: 16px;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.ld-span-2 {
  grid-column: span 2;
}

.ld-exclusion {
  margin: -16px 0 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-3);
}

.ld-documents {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.ld-documents a {
  color: var(--vp-c-text-1);
  font-weight: 500;
  text-decoration: underline;
  text-decoration-color: var(--vp-c-divider);
  text-underline-offset: 3px;
}

.ld-documents a:hover {
  text-decoration-color: currentColor;
}

@media screen and (max-width: 1100px) {
  .ld-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .ld-row {
    grid-template-columns: 150px repeat(3, minmax(0, 1fr));
  }
}

/* Phones: the label becomes a heading over its row; shared bars stay one line, split cells stack and
   each carries its column's name, since the header row is too far away to read across */
@media screen and (max-width: 760px) {
  .ld-row.ld-row-head {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .ld-corner {
    display: none;
  }

  .ld-tier {
    padding: 0 4px 0 0;
  }

  .ld-tier-name {
    font-size: 0.6875rem;
    letter-spacing: 0.02em;
  }

  .ld-tier-price {
    font-size: 1.125rem;
    line-height: 1.5rem;
  }

  .ld-tier-per {
    display: block;
    margin-left: 0;
    font-size: 0.8125rem;
  }

  .ld-row {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 6px;
    padding: 14px 0;
  }

  .ld-all,
  .ld-span-2 {
    grid-column: 1;
  }

  .ld-cell {
    padding: 0;
  }

  .ld-cell[data-tier]::before {
    content: attr(data-tier);
    display: block;
    font-size: 0.6875rem;
    line-height: 1.125rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--vp-c-text-3);
  }

  .ld-all {
    padding: 8px 12px;
  }
}

</style>

<script setup lang="ts">
import type { Region } from "./agentsDemo";

/* The rendered invoice, drawn in HTML so the before and after states need no build and the
   credit line can turn red in place. In production this is two real renders (light and dark
   variants) cross-faded; the lab keeps the HTML page so the concepts can be compared now.

   `active` tints one region of the page (the header row, the item rows, the total column);
   `markers` adds numbered badges on those regions; the `callout` slot renders a bubble anchored
   to the credit line. Only the Page Callouts concept uses these. */

withDefaults(defineProps<{
  after: boolean;
  width?: number;
  caption?: boolean;
  active?: Region | null;
  markers?: boolean;
}>(), { width: 300, caption: true, active: null, markers: false });

const items: [string, number, number][] = [
  ["Thermal printer, 80 mm", 2, 118],
  ["Receipt paper, 50 rolls", 1, 42.5],
  ["USB-C cable, 2 m", 3, 24],
  ["Returned: USB-C cable, 2 m", 1, -24],
  ["Barcode scanner", 1, 89],
  ["On-site setup, 1 h", 1, 60]
];

const total = items.reduce((sum, item) => sum + item[2], 0);

function money(value: number) {
  const absolute = Math.abs(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${value < 0 ? "-" : ""}$${absolute}`;
}
</script>

<template>
  <figure class="document" :style="{ '--page-w': `${width}px` }">
    <div class="page" :class="{ after }" role="img" :aria-label="`Invoice page rendered by QuestPDF${after ? ', the credit line in red' : ''}`">
      <div class="p-head">
        <div>
          <div class="p-title">Invoice #5327</div>
          <div class="p-meta">Issue date: 06.10.2026<br>Due date: 20.10.2026</div>
        </div>
        <div class="p-logo"></div>
      </div>

      <div class="p-addr">
        <div><strong>From</strong><div>Northwind Hardware<br>14 Harbour Street<br>Gdańsk, PL</div></div>
        <div><strong>For</strong><div>Blue Ridge Café<br>22 Market Lane<br>Kraków, PL</div></div>
      </div>

      <table>
        <thead>
          <tr class="region" :class="{ on: active === 'header' }">
            <th><span v-if="markers" class="marker">1</span>Product</th>
            <th class="r">Quantity</th>
            <th class="r region" :class="{ on: active === 'total' }"><span v-if="markers" class="marker marker-right">3</span>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of items" :key="item[0]" class="region" :class="{ on: active === 'rows' }">
            <td><span v-if="markers && index === 0" class="marker">2</span>{{ item[0] }}</td>
            <td class="r">{{ item[1] }}</td>
            <td class="r region cell" :class="{ neg: item[2] < 0, on: active === 'total' }">
              {{ money(item[2]) }}
              <slot v-if="item[2] < 0" name="callout" />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="p-total">Grand total: {{ money(total) }}</div>
      <div class="p-foot">Page 1</div>
    </div>

    <figcaption v-if="caption">invoice.pdf</figcaption>
  </figure>
</template>

<style scoped>
.document {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0;
  max-width: 100%;
}

.document figcaption {
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.page {
  position: relative;
  width: var(--page-w);
  max-width: 100%;
  aspect-ratio: 1 / 1.4142;
  background: #fff;
  color: #222;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  box-shadow:
      0 8px 12px -2px rgba(0, 0, 0, 0.12),
      0 16px 24px -4px rgba(0, 0, 0, 0.12),
      0 24px 32px -8px rgba(0, 0, 0, 0.12);
  font-family: var(--vp-font-family-base);
  font-size: calc(var(--page-w) * 0.027);
  line-height: 1.45;
  padding: calc(var(--page-w) * 0.09);
  display: flex;
  flex-direction: column;
}

/* the page is white, so it is toned down on the dark canvas, like the quick-start image */
html.dark .page {
  opacity: 0.85;
  box-shadow:
      0 8px 12px -2px rgba(0, 0, 0, 0.4),
      0 16px 24px -4px rgba(0, 0, 0, 0.4),
      0 24px 32px -8px rgba(0, 0, 0, 0.4);
}

.p-title { font-size: 2.4em; line-height: 1.1; font-weight: 500; }
.p-meta { color: #555; margin-top: 0.4em; }
.p-head { display: flex; justify-content: space-between; align-items: flex-start; }
.p-logo { width: 5.5em; height: 3.2em; background: #c9c9c9; border-radius: 2px; }
.p-addr { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5em; margin-top: 2.4em; }
.p-addr strong { display: block; border-bottom: 1px solid #333; padding-bottom: 0.3em; margin-bottom: 0.4em; font-weight: 500; }
.p-addr div div { color: #333; }

table { width: 100%; border-collapse: collapse; margin-top: 2.4em; }
th { text-align: left; font-weight: 600; border-bottom: 1px solid #222; padding: 0.4em 0; position: relative; }
td { border-bottom: 1px solid #ddd; padding: 0.45em 0; position: relative; }
th.r, td.r { text-align: right; }

.p-total { text-align: right; margin-top: 1.2em; font-size: 1.25em; }
.p-foot { margin-top: auto; text-align: center; color: #555; }

.neg { transition: color 0.4s ease; }
.page.after .neg { color: #D32F2F; }

/* regions: a soft blue tint on the active one; cells in the total column tint individually */
.region { transition: background-color 0.25s ease; }
.region.on { background-color: rgba(33, 150, 243, 0.14); }
td.region.on, th.region.on { box-shadow: inset 0 0 0 1px rgba(33, 150, 243, 0.35); }

/* numbered badges, outside the table's left edge, or right of the Total header */
.marker {
  position: absolute;
  left: -1.9em;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4em;
  height: 1.4em;
  border-radius: 50%;
  background: #2196F3;
  color: #fff;
  font-size: 0.85em;
  font-weight: 700;
  line-height: 1;
}

.marker-right { left: auto; right: -1.9em; }

.cell { position: relative; }

@media (prefers-reduced-motion: reduce) {
  .neg, .region { transition: none; }
}
</style>

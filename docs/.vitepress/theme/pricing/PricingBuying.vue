<script setup lang="ts">
import { licensePrices } from "./prices";

/* the quote request opens as an email that already asks for what a quote needs */
const quoteSubject = "Quote request: QuestPDF license";

const quoteBody = [
  "Company legal name:",
  "Country:",
  "License: Professional / Enterprise",
  "New purchase or renewal (license ID if renewal):",
  "PO number required on the invoice: yes / no"
].join("\n");

const quoteMail = `mailto:contact@questpdf.com?subject=${encodeURIComponent(quoteSubject)}&body=${encodeURIComponent(quoteBody)}`;

const price = `$${licensePrices.professional.toLocaleString("en-US")}`;

/* size: the height at which the logo's letters are as tall as the others' (about 29px). shift: moves the logo so that
   the letters stand on one baseline; QBS is stacked, so it is centred on the letters instead. Both are multiplied by
   the row's --unit. */
const resellers = [
  { name: "SoftwareOne", link: "https://www.softwareone.com/", src: "software-one.svg", size: 30, shift: 0.4 },
  { name: "Insight", link: "https://www.insight.com/", src: "insight.svg", size: 38, shift: 4.6 },
  { name: "SHI", link: "https://www.shi.com/", src: "shi.svg", size: 40, shift: -5.1 },
  { name: "QBS Software", link: "https://www.qbssoftware.com/", src: "qbs-software.svg", size: 45, shift: 0 }
];
</script>

<template>
  <article class="content">
    <div class="routes">
      <section class="panel quote-card">
        <div class="layout">
          <div class="text">
            <h3 class="card-title">Need a Formal Quote?</h3>
            <p class="card-description">Get a quote your procurement team can approve, then pay by invoice against your purchase order.</p>
            <a class="action" :href="quoteMail">Request a Quote</a>
          </div>

          <div class="figure">
            <div class="sheet fragment" aria-hidden="true">
              <div class="head">
                <div class="brand">
                  <span class="bone strong" style="width: 6.5em; height: 0.9em"></span>
                  <span class="bone" style="width: 4.5em"></span>
                </div>
                <div class="kind">
                  <span class="label">Quote</span>
                  <span class="bone" style="width: 4em"></span>
                </div>
              </div>

              <div class="block">
                <span class="label">Licensee</span>
                <span class="bone strong" style="width: 58%"></span>
                <span class="bone" style="width: 44%"></span>
                <span class="bone" style="width: 36%"></span>
              </div>

              <div class="item">
                <div>
                  <strong>Professional License</strong>
                  <span>12 months of updates and support</span>
                </div>
                <strong class="price">{{ price }}</strong>
              </div>

              <!-- long enough to run out of the card at every width -->
              <div v-for="label of ['Payment', 'Invoice', 'Terms']" :key="label" class="block">
                <span class="label">{{ label }}</span>
                <span class="bone" style="width: 48%"></span>
                <span class="bone" style="width: 32%"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="panel reseller-card">
        <h3 class="card-title">Purchasing via a Software Reseller?</h3>
        <p class="card-description">Licenses can be ordered through any software reseller. No partner agreement is required, and the license is issued to your company.</p>

        <div class="resellers">
          <a v-for="reseller of resellers" :key="reseller.name" :href="reseller.link" target="_blank">
            <img :src="'/license/resellers/' + reseller.src" :alt="reseller.name"
                 :style="{ '--size': reseller.size, '--shift': reseller.shift }" />
          </a>
        </div>
      </section>
    </div>
  </article>
</template>

<style scoped>

.routes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  width: 100%;
  margin: 0 auto;
}

@media screen and (max-width: 1240px) {
  .routes {
    grid-template-columns: minmax(0, 1fr);
    max-width: 1040px;
  }
}

.card-description {
  text-wrap: pretty;
}

.action {
  margin-top: auto;
}


/* Quote card: the sheet starts under the title's line and runs out of the card's bottom edge, which crops it */

.quote-card {
  container-type: inline-size;
  overflow: clip;
}

/* the sizes live on the layout, not on the card: a container query can restyle only what is inside the container */
.layout {
  --figure: 240px;
  --sheet: 10px;

  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--figure);
  gap: 32px;
  height: 100%;
}

.text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.text .card-description {
  margin-bottom: 24px;
}

.figure {
  position: relative;
}

.sheet {
  --bone: color-mix(in srgb, var(--vp-c-text-1) 13%, transparent);
  --bone-strong: color-mix(in srgb, var(--vp-c-text-1) 26%, transparent);
  --rule: color-mix(in srgb, var(--vp-c-text-1) 10%, transparent);

  position: absolute;
  top: 32px;
  right: 0;
  width: 24em;
  padding: 2em 2em 1.75em;
  border-radius: 0.6em;
  font-size: var(--sheet);
  line-height: 1.5;
  color: var(--vp-c-text-1);
  transform: rotate(4deg);
  transform-origin: top right;
}

.bone {
  display: block;
  height: 0.5em;
  border-radius: 0.2em;
  background-color: var(--bone);
}

.bone.strong {
  background-color: var(--bone-strong);
}

.label {
  font-size: 0.77em;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.brand,
.kind {
  display: flex;
  flex-direction: column;
  gap: 0.55em;
}

.kind {
  align-items: flex-end;
}

.kind .label {
  font-size: 1em;
  letter-spacing: 0.12em;
  color: var(--vp-c-text-1);
}

.block {
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  margin-top: 2em;
}

.item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1em;
  margin-top: 1.6em;
  padding: 1em 0;
  border-block: 1px solid var(--rule);
}

.item + .block {
  margin-top: 1.2em;
}

.item div {
  display: flex;
  flex-direction: column;
}

.item strong {
  font-weight: 600;
}

.item span {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.price {
  font-variant-numeric: tabular-nums;
}

/* no room for the whole sheet: it runs off the corner, so the title keeps its line. The width is the card's content
   box, which is what a container query measures. */
@container (max-width: 556px) {
  .layout {
    --figure: 160px;
    --sheet: 11px;
  }

  .sheet {
    top: 16px;
    right: auto;
    left: 0;
    transform-origin: top left;
  }
}

/* a phone: the sheet under the text */
@container (max-width: 420px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 1fr auto;
    gap: 28px;
  }

  .figure {
    height: 96px;
  }

  .sheet {
    top: 0;
    transform: rotate(3deg);
  }
}


/* Reseller card */

.reseller-card {
  container-type: inline-size;
  display: flex;
  flex-direction: column;
}

.reseller-card .card-description {
  margin-bottom: 32px;
}

/* The row is as tall as a button and sits at the card's bottom, so the logos share a line with Request a Quote in the
   card beside it; the taller logos overflow the row evenly. The padding around each logo is its click area, and the
   negative margin puts the logos back on the card's edges. 387 is the width of the four logos at 1x and 108px keeps
   at least 36px between them, so in a narrower card they shrink instead of wrapping. */
.resellers {
  --inset: 0px;
  --unit: clamp(0.9px, calc((100cqw - 108px - var(--inset)) / 387), 1px);

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  gap: 4px;
  height: 40px;
  margin: auto calc(var(--inset) - 14px) 0 -14px;
}

/* beside the quote card, the last logo stops short of the card's edge, nearer to where the text ends */
@media screen and (min-width: 1241px) {
  .resellers {
    --inset: 24px;
  }
}

.resellers a {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  padding: 12px 14px;
}

.resellers a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/* the files are a mid grey (#888); the filter brings them close to the tone of the text in each theme */
.resellers img {
  display: block;
  height: calc(var(--size) * var(--unit));
  max-width: 100%;
  object-fit: contain;
  translate: 0 calc(var(--shift) * var(--unit));
  filter: brightness(0.9);
  transition: filter 0.2s ease-in-out, transform 0.2s ease-in-out;
}

html.dark .resellers img {
  filter: brightness(1.1);
}

@media (hover: hover) {
  .resellers a:hover img {
    filter: brightness(0.5);
    transform: scale(1.08);
  }

  html.dark .resellers a:hover img {
    filter: brightness(1.6);
  }
}

/* too narrow for one row: two logos to a line, in columns. 232 is the width of the two columns at 1x, so on the
   narrowest phones the logos shrink a little instead of leaving the card. */
@container (max-width: 449px) {
  .resellers {
    --unit: clamp(0.72px, calc((100cqw - 40px) / 232), 0.9px);

    display: grid;
    grid-template-columns: repeat(2, max-content);
    justify-content: start;
    justify-items: start;
    gap: 4px 12px;
    height: auto;
    margin-block: -12px;
  }
}

</style>

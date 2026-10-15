<template>
  <!-- G · Engineering sheet: B's technical drawing taken literally. The panel is a drawing sheet: a faint
       drafting grid (a blueprint in dark mode), a frame with zone markers, the app as the main view
       with a dimension line across the A4 page (595 pt wide, QuestPDF's default page) and two detail
       circles, the details drawn larger below it. The capabilities are the parts list (item, name,
       keys) and the version, platforms and price sit in a title block, the way a drawing is filed. -->
  <section class="content">
    <div class="panel g-sheet">
      <div class="g-zones" aria-hidden="true">
        <span v-for="n of 6" :key="`c${n}`" class="g-zone col" :style="{ left: `${(n - 0.5) * 100 / 6}%` }">{{ n }}</span>
        <span v-for="(letter, i) of ['A', 'B', 'C', 'D']" :key="letter" class="g-zone row" :style="{ top: `${(i + 0.5) * 25}%` }">{{ letter }}</span>
      </div>

      <div class="g-body">
        <div class="g-views">
          <figure class="g-main">
            <!-- dimension line across the page in the preview: QuestPDF's default A4 page, 595 pt wide -->
            <div class="g-dimension" aria-hidden="true">
              <span class="g-dimension-line"></span>
              <span class="g-dimension-label">595 pt · A4</span>
            </div>

            <div class="g-shot">
              <CompanionShot name="application" />
            </div>

            <!-- detail circles, drawn larger below -->
            <span class="g-detail-circle" style="--x: 0.515; --y: 0.155; --r: 0.072" aria-hidden="true"><b>A</b></span>
            <span class="g-detail-circle" style="--x: 0.095; --y: 0.66; --r: 0.075" aria-hidden="true"><b>B</b></span>

            <!-- balloons: the leader runs from the balloon to a dot on the part -->
            <svg class="g-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <line v-for="b of balloons" :key="b.n" :x1="b.bx * 100" :y1="b.by * 100" :x2="b.tx * 100" :y2="b.ty * 100" />
            </svg>
            <template v-for="b of balloons" :key="`b${b.n}`">
              <span class="g-target" :style="{ '--x': b.tx, '--y': b.ty }" aria-hidden="true"></span>
              <span class="g-balloon" :style="{ '--x': b.bx, '--y': b.by, '--tx': b.tx, '--ty': b.ty }">{{ b.n }}</span>
            </template>
          </figure>

          <div class="g-details">
            <figure class="g-detail">
              <div class="g-detail-frame">
                <CompanionCrop name="measurement-vertical" :x="0.38" :y="0.135" :w="0.3" :aspect="1.9" />
              </div>
              <figcaption><span class="g-balloon static">3</span>Detail A</figcaption>
            </figure>
            <figure class="g-detail">
              <div class="g-detail-frame">
                <CompanionCrop name="layout-error" :x="0" :y="0.056" :w="0.38" :aspect="1.9" />
              </div>
              <figcaption><span class="g-balloon static">4</span>Detail B</figcaption>
            </figure>
          </div>
        </div>

        <div class="g-side">
          <h2 class="card-title">{{ title }}</h2>
          <p class="card-description">{{ description }}</p>

          <table class="g-parts">
            <thead>
              <tr><th>Item</th><th>Capability</th><th>Keys</th></tr>
            </thead>
            <tbody>
              <tr v-for="(capability, index) of capabilities" :key="capability.key">
                <td><span class="g-balloon static">{{ index + 1 }}</span></td>
                <td>
                  <strong>{{ capability.title }}</strong>
                  <p>{{ capability.description }}</p>
                </td>
                <td><CompanionKeys :capability="capability" class="g-keys" /></td>
              </tr>
            </tbody>
          </table>

          <dl class="g-title-block">
            <div><dt>Price</dt><dd>Free</dd></div>
            <div><dt>Version</dt><dd>{{ version }}</dd></div>
            <div class="wide"><dt>Platforms</dt><dd>Windows · macOS · Linux</dd></div>
          </dl>

          <CompanionActions layout="row" :show-platforms="false" class="g-actions" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CompanionActions from "./CompanionActions.vue";
import CompanionCrop from "./CompanionCrop.vue";
import CompanionKeys from "./CompanionKeys.vue";
import CompanionShot from "./CompanionShot.vue";
import { capabilities, description, title, version } from "./companion";

/* balloons on the main view, as fractions of the screenshot: b = the balloon, t = the part.
   1 hot reload: the page; 2 hierarchy: the tree. 3 and 4 are the detail views below. */
const balloons = [
  { n: 1, bx: 1.045, by: 0.34, tx: 0.79, ty: 0.42 },
  { n: 2, bx: -0.045, by: 0.3, tx: 0.135, ty: 0.3 }
];
</script>

<style scoped>

/* The sheet: the drafting grid is two pairs of gradients, 24px minor and 120px major lines, both
   faint; in dark mode the sheet turns blueprint blue */
.custom-page.textured-page .g-sheet {
  --g-ink: color-mix(in srgb, var(--vp-c-text-1) 70%, transparent);
  --g-line: color-mix(in srgb, var(--vp-c-text-1) 20%, transparent);
  --g-grid-minor: color-mix(in srgb, #1E88E5 3.5%, transparent);
  --g-grid-major: color-mix(in srgb, #1E88E5 7%, transparent);

  position: relative;
  width: 100%;
  background-image:
      linear-gradient(var(--g-grid-major) 1px, transparent 1px),
      linear-gradient(90deg, var(--g-grid-major) 1px, transparent 1px),
      linear-gradient(var(--g-grid-minor) 1px, transparent 1px),
      linear-gradient(90deg, var(--g-grid-minor) 1px, transparent 1px);
  background-size: 120px 120px, 120px 120px, 24px 24px, 24px 24px;
  background-position: 23px 23px;
}

html.dark .custom-page.textured-page .g-sheet {
  --g-grid-minor: rgba(100, 181, 246, 0.05);
  --g-grid-major: rgba(100, 181, 246, 0.1);
  background-color: #0C1A30;
}

/* the drawing frame, 16px in from the panel's edge */
.g-sheet::after {
  content: "";
  position: absolute;
  inset: 22px;
  border: 1px solid var(--g-line);
  border-radius: 14px;
  pointer-events: none;
}

.g-zones {
  position: absolute;
  inset: 22px;
  pointer-events: none;
}

.g-zone {
  position: absolute;
  font-family: var(--vp-font-family-mono);
  font-size: 0.625rem;
  line-height: 1;
  color: var(--vp-c-text-3);
}

.g-zone.col {
  top: -16px;
  transform: translateX(-50%);
}

.g-zone.row {
  left: -15px;
  transform: translateY(-50%);
}

.g-body {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 56px;
  align-items: start;
  padding: 8px 8px 8px 28px;
}

/* Main view */

.g-main {
  position: relative;
  margin: 44px 0 0;
}

.g-shot {
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid var(--g-line);
}

/* the dimension line sits 26px above the screenshot, with extension lines down to the page's top edge
   (the page spans 43% to 88.5% of the screenshot's width and starts 8.5% down) */
.g-dimension {
  position: absolute;
  left: 43%;
  width: 45.5%;
  top: -26px;
  height: calc(26px + 8.5%); /* percentages here are of the screenshot's height */
  border-left: 1px solid var(--g-ink);
  border-right: 1px solid var(--g-ink);
  pointer-events: none;
}

.g-dimension-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--g-ink);
}

.g-dimension-line::before,
.g-dimension-line::after {
  content: "";
  position: absolute;
  top: -3.5px;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}

.g-dimension-line::before {
  left: 0;
  border-right: 8px solid var(--g-ink);
}

.g-dimension-line::after {
  right: 0;
  border-left: 8px solid var(--g-ink);
}

.g-dimension-label {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 4px;
  background-color: var(--home-surface);
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

html.dark .g-dimension-label {
  background-color: #0C1A30;
}

/* detail circles: dashed, with the detail's letter on the rim */
.g-detail-circle {
  position: absolute;
  left: calc(var(--x) * 100%);
  top: calc(var(--y) * 100%);
  width: calc(var(--r) * 200%);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border: 1.5px dashed color-mix(in srgb, var(--vp-c-brand-1) 75%, transparent);
  border-radius: 50%;
  pointer-events: none;
}

.g-detail-circle b {
  position: absolute;
  bottom: -4px;
  right: -4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.6875rem;
  color: #FFF;
}

/* balloons: the engineering callout, a numbered circle with a thin ring */
.g-leaders {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.g-leaders line {
  stroke: var(--g-ink);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.g-target {
  position: absolute;
  left: calc(var(--x) * 100%);
  top: calc(var(--y) * 100%);
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--vp-c-text-1);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 2px var(--vp-c-bg);
}

.g-balloon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1;
  color: var(--vp-c-text-1);
}

html.dark .g-balloon,
html.dark .g-target {
  background-color: #0C1A30;
}

html.dark .g-target {
  background-color: var(--vp-c-text-1);
  box-shadow: 0 0 0 2px #0C1A30;
}

.g-balloon:not(.static) {
  position: absolute;
  left: calc(var(--x) * 100%);
  top: calc(var(--y) * 100%);
  transform: translate(-50%, -50%);
  z-index: 1;
}

/* Detail views */

.g-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  margin-top: 32px;
}

.g-detail {
  margin: 0;
}

.g-detail-frame {
  overflow: hidden;
  border-radius: 6px;
  border: 1.5px dashed color-mix(in srgb, var(--vp-c-brand-1) 75%, transparent);
}

.g-detail figcaption {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.g-detail figcaption .g-balloon {
  width: 24px;
  height: 24px;
  font-size: 0.75rem;
  letter-spacing: 0;
}

/* Side: title, parts list, title block, actions */

.g-side {
  display: flex;
  flex-direction: column;
}

.g-parts {
  display: table;
  width: 100%;
  margin: 32px 0 0;
  border-collapse: collapse;
  border: 0;
}

.g-parts tr {
  background: none;
  border: 0;
}

.g-parts th,
.g-parts td {
  padding: 14px 12px;
  border: 0;
  border-top: 1px solid var(--g-line);
  text-align: left;
  vertical-align: top;
  background: none;
}

.g-parts tr:last-child td {
  border-bottom: 1px solid var(--g-line);
}

.g-parts th {
  padding-top: 0;
  padding-bottom: 8px;
  border-top: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.g-parts th:first-child,
.g-parts td:first-child {
  width: 1%;
  padding-left: 0;
}

.g-parts th:last-child,
.g-parts td:last-child {
  width: 1%;
  padding-right: 0;
  text-align: right;
  white-space: nowrap;
}

.g-parts strong {
  display: block;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.g-parts p {
  margin: 2px 0 0;
}

/* the title block: labelled facts in a ruled box */
.g-title-block {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 28px 0 0;
  border: 1px solid var(--g-line);
  border-radius: 8px;
  overflow: hidden;
}

.g-title-block > div {
  padding: 10px 14px;
  border-left: 1px solid var(--g-line);
}

.g-title-block > div:nth-child(odd) {
  border-left: 0;
}

.g-title-block > div.wide {
  grid-column: 1 / -1;
  border-left: 0;
  border-top: 1px solid var(--g-line);
}

.g-title-block dt {
  font-family: var(--vp-font-family-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.g-title-block dd {
  margin: 2px 0 0;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.g-actions {
  margin-top: 28px;
}

@media screen and (max-width: 1200px) {
  .g-body {
    grid-template-columns: minmax(0, 1fr);
    gap: 48px;
  }

  /* the title and the parts list first, the drawing after them */
  .g-views {
    order: 2;
    max-width: 760px;
  }
}

@media screen and (max-width: 760px) {
  .g-zones {
    display: none;
  }

  .g-sheet::after {
    inset: 10px;
  }

  .g-body {
    padding: 0;
  }

  /* no room outside the screenshot: the balloons sit on their parts */
  .g-leaders {
    display: none;
  }

  .g-target {
    display: none;
  }

  .g-balloon:not(.static) {
    left: calc(var(--tx) * 100%);
    top: calc(var(--ty) * 100%);
    width: 24px;
    height: 24px;
    font-size: 0.75rem;
  }

  .g-details {
    gap: 16px;
  }

  .g-parts td:last-child,
  .g-parts th:last-child {
    display: none;
  }
}

</style>

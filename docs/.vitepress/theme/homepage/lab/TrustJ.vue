<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Enterprise</div>
      <h2>Enterprise-ready, at a glance</h2>
      <p class="sub-header">The facts a security review, a compliance audit and a capacity plan each need, sized by how often they come up.</p>
    </div>

    <!-- a bento of tinted tiles: one large dark tile for the security fact, tinted tiles for the standards, plain tiles for the rest -->
    <div class="bento">
      <article class="tile tile-dark tile-large">
        <div class="tile-value">0</div>
        <h3 class="tile-title">network calls</h3>
        <p class="tile-text">QuestPDF runs inside your application process. No telemetry, no license server, no internet requirement. Document data never leaves your infrastructure.</p>
        <a class="tile-link" href="/security-policy.html">Security policy <i class="fa-regular fa-arrow-right"></i></a>
      </article>

      <article class="tile tile-blue">
        <div class="tile-eyebrow">ISO 19005 · archival</div>
        <h3 class="tile-title">PDF/A</h3>
        <div class="t-badges"><span v-for="b of ['2b','2u','2a','3b','3u','3a']" :key="b" class="t-badge">{{ b }}</span></div>
      </article>

      <article class="tile tile-indigo">
        <div class="tile-eyebrow">ISO 14289 · accessibility</div>
        <h3 class="tile-title">PDF/UA</h3>
        <div class="t-badges"><span class="t-badge">UA-1</span></div>
      </article>

      <article class="tile tile-cyan">
        <div class="tile-eyebrow">EN 16931 · e-invoicing</div>
        <h3 class="tile-title">ZUGFeRD, Factur-X</h3>
        <div class="t-badges"><span class="t-badge">XML in PDF/A-3</span></div>
      </article>

      <article class="tile tile-green">
        <div class="tile-eyebrow">On every build</div>
        <h3 class="tile-title">Validated</h3>
        <p class="tile-text">veraPDF and Mustang check every release before it ships.</p>
      </article>

      <article class="tile tile-wide">
        <div class="t-icon"><i class="fa-regular fa-code"></i></div>
        <h3 class="tile-title">Full source on GitHub</h3>
        <p class="tile-text">Native dependencies built from source in CI.</p>
      </article>

      <article class="tile tile-wide">
        <div class="t-icon"><i class="fa-regular fa-gauge-high"></i></div>
        <h3 class="tile-title">Thousands of pages per second</h3>
        <p class="tile-text">Low CPU and memory on a single server.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bento {
  width: 100%;
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: minmax(200px, auto);
  gap: 20px;
}

.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 28px;
  border-radius: 24px;
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge);
}

.tile-large {
  grid-column: span 2;
  grid-row: span 2;
  padding: 36px;
}

/* the two plain tiles share the last row, so the grid has no empty corner */
.tile-wide {
  grid-column: span 2;
}

.tile .t-icon {
  margin-bottom: 16px;
}

.tile-value {
  font-size: 5rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.tile-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.75;
}

.tile-title {
  margin: 6px 0 0;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: inherit;
}

.tile-large .tile-title {
  font-size: 1.5rem;
  margin-top: 2px;
}

.tile-text {
  margin: 10px 0 0;
  flex-grow: 1;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: inherit;
  opacity: 0.85;
}

.tile .t-badges {
  margin-top: auto;
  padding-top: 16px;
}

/* tinted tiles: a brand hue each, white text, badges as translucent white */
.tile-dark { background: linear-gradient(160deg, #1F2A44, #0F172A); color: #fff; box-shadow: none; }
.tile-blue { background: linear-gradient(160deg, #1E88E5, #1565C0); color: #fff; box-shadow: none; }
.tile-indigo { background: linear-gradient(160deg, #5C6BC0, #3F51B5); color: #fff; box-shadow: none; }
.tile-cyan { background: linear-gradient(160deg, #00ACC1, #00838F); color: #fff; box-shadow: none; }
.tile-green { background: linear-gradient(160deg, #43A047, #2E7D32); color: #fff; box-shadow: none; }

:is(.tile-dark, .tile-blue, .tile-indigo, .tile-cyan, .tile-green) .t-badge {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.18);
}

.tile-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}

.tile-link i {
  font-size: 0.75rem;
}

@media screen and (max-width: 1100px) {
  .bento { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media screen and (max-width: 600px) {
  .bento { grid-template-columns: minmax(0, 1fr); grid-auto-rows: auto; }
  .tile-large, .tile-wide { grid-column: auto; grid-row: auto; }
  .tile-value { font-size: 4rem; }
}

</style>

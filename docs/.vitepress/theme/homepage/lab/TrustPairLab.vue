<template>
  <!-- Lab page, not linked from anywhere: five variations of one homepage section that replaces
       "Enterprise-grade foundations" and "Industry-standard PDF compliance" with a pair of cards.
       Left card: the standards as chips. Right card: the foundations, cut to what buyers ask about.
       Delete this file, the TrustPair components and docs/trust-pair-lab.md once a variation ships. -->
  <div class="custom-page home-page textured-page trust-pair-lab">
    <div class="container">
      <section class="content lab-intro">
        <h1>Trust pair lab</h1>
        <p class="lab-lead">
          One section, two cards, half the width each. The left card keeps the compliance story with the
          standards as chips. The right card keeps the foundations story, cut down to what the people who
          email before buying actually ask. Five variations, same facts, different card mechanics.
        </p>
        <p class="lab-jump">
          Jump to
          <a v-for="n of 5" :key="n" :href="`#v${n}`">{{ n }}</a>
        </p>

        <div class="lab-grid">
          <div class="lab-note">
            <h3>Right card: what survives from the six foundations</h3>
            <ul>
              <li><strong>Complete data privacy</strong>, rewritten as the three things buyers email about: no network calls, no telemetry, no license server. Offline and air-gapped named explicitly. The strongest fact on the page; every variation leads with it.</li>
              <li><strong>Source-available</strong>, as "full source on GitHub", plus the native dependencies built from source in CI. This is what a developer or a security reviewer can actually verify.</li>
              <li><strong>High performance</strong>, kept as one line because managers size servers from it. No benchmark link exists, so it never gets the headline.</li>
              <li><strong>Dropped</strong>: layout engine (the quick start above already shows it), language support and file size (features, they belong with the feature chips). Nobody has ever emailed about them before buying.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>Left card: what survives from the compliance section</h3>
            <ul>
              <li><strong>The chips</strong>: PDF/A-2b, 2u, 2a, 3b, 3u, 3a; PDF/UA-1; ZUGFeRD and Factur-X. A compliance officer scans for the exact level they need, so the chips are the content.</li>
              <li><strong>The standard numbers</strong>: ISO 19005, ISO 14289, EN 16931. Kept as small labels, because tenders quote them.</li>
              <li><strong>Validation on every build</strong> with veraPDF and Mustang. The one piece of evidence; it becomes the card footer in every variation.</li>
              <li><strong>Dropped</strong>: the three descriptive paragraphs. "Remain readable and visually identical for decades" is what PDF/A means; the reader who needs PDF/A knows.</li>
            </ul>
          </div>
        </div>

        <div class="lab-note lab-note-wide">
          <h3>Brainstorm: card mechanics considered, and the five kept</h3>
          <p class="lab-para">
            Twelve ways to present the same facts in a half-width card were sketched: a spec sheet (key, value), headline facts with icons,
            a ticked checklist with a count, metric tiles with a big number, a single bold statement with proofs, a comparison against a hosted
            API, a settings panel with switches, a short FAQ, a signed note, a timeline of releases, a dependency stack, and a questionnaire
            with a copy button. The last seven were dropped for a half-width card: they need the full row, or they repeat a device the first
            lab already explored at full width. The five kept are the ones that stay legible at 600px wide and read in under ten seconds.
          </p>
          <ul>
            <li><strong>1 · Spec sheet.</strong> Seven key-value rows. The fastest to scan; the answer to each buyer email is one word.</li>
            <li><strong>2 · Headline facts.</strong> Three facts as bold headlines with an icon. The direction C voice the first lab preferred, at half width.</li>
            <li><strong>3 · Checklist.</strong> Six ticked statements under a header with a count. Reads as a review already done.</li>
            <li><strong>4 · Metric tiles.</strong> Four numbers in tinted tiles. The most visual; two zeros say "no telemetry" better than a sentence.</li>
            <li><strong>5 · Statement.</strong> One claim in large type, three proofs below. Both cards share this shape, so the pair reads as one thought.</li>
          </ul>
        </div>

        <div class="lab-note lab-note-wide">
          <h3>Note on the right card's style</h3>
          <p class="lab-para">
            The reference screenshot for the right card did not survive the session's context reset, so each variation gives the right card
            a different, deliberate style instead of a guess at one. Re-attach the image and the chosen variation can be restyled to match it;
            the content and the left card do not change.
          </p>
        </div>
      </section>
    </div>

    <lab-direction letter="1" id="v1" name="Spec sheet">
      <template #why>A reviewer with a questionnaire finds the row they need and copies the one-word answer. The standards rows mirror the spec rows, so both cards scan the same way: label left, answer right.</template>
      <template #tradeoffs>The least emotional of the five; it does not sell, it answers. The 170px label column needs the card to stay above 560px wide, below that rows stack.</template>
      <TrustPair1 />
    </lab-direction>

    <lab-direction letter="2" id="v2" name="Headline facts">
      <template #why>Every fact is the heading, so a skim of bold text alone tells the whole story. Each card opens with a one-line claim that frames its list.</template>
      <template #tradeoffs>Three facts on the right against three groups on the left leaves the right card slightly shorter; the footer link absorbs the difference. Headlines in the first person plural were avoided on purpose.</template>
      <TrustPair2 />
    </lab-direction>

    <lab-direction letter="3" id="v3" name="Checklist">
      <template #why>The count in the corner ("6 of 6", "9 supported") promises that nothing is missing before the reader starts. Ticks on every chip make the standards feel verified, not just listed.</template>
      <template #tradeoffs>Green ticks everywhere can look like a sales device; the ticks only hold if the claims stay checkable. The count on the left is a count of chips, not of standards, so the label says "supported", not "standards".</template>
      <TrustPair3 />
    </lab-direction>

    <lab-direction letter="4" id="v4" name="Metric tiles">
      <template #why>Numbers stop a scroll. Two zeros and a 100% answer the three buyer emails at a glance; the family lead chips on the left do the same for the standards.</template>
      <template #tradeoffs>"1000s pages per second" is the weakest tile because no benchmark backs it; it could become a fourth zero ("0 external services") if the claim should go. Tiles are the heaviest right card visually.</template>
      <TrustPair4 />
    </lab-direction>

    <lab-direction letter="5" id="v5" name="Statement">
      <template #why>Each card is one sentence a leader can repeat in a meeting: "Passes the audits." and "Nothing leaves your infrastructure." The proofs underneath are for the developer who reads on.</template>
      <template #tradeoffs>The chip cloud loses the grouping by standard; the lead line above it carries the family names instead. The statements need to stay short to hold their size at phone width.</template>
      <TrustPair5 />
    </lab-direction>
  </div>
</template>

<script setup lang="ts">
import LabDirection from "./LabDirection.vue";
import TrustPair1 from "./TrustPair1.vue";
import TrustPair2 from "./TrustPair2.vue";
import TrustPair3 from "./TrustPair3.vue";
import TrustPair4 from "./TrustPair4.vue";
import TrustPair5 from "./TrustPair5.vue";
</script>

<style>

/* Lab notes */

.trust-pair-lab .lab-intro {
  align-items: stretch;
}

.trust-pair-lab .lab-intro h1 {
  margin-bottom: 1rem;
}

.trust-pair-lab .lab-lead {
  max-width: 820px;
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-bottom: 32px;
}

.trust-pair-lab .lab-jump {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: -16px 0 32px;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.trust-pair-lab .lab-jump a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  color: var(--vp-c-text-1);
  background-color: var(--home-surface-inner);
  text-decoration: none;
}

.trust-pair-lab .lab-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.trust-pair-lab .lab-note {
  padding: 24px 28px;
  border: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  border-radius: 16px;
}

.trust-pair-lab .lab-note-wide {
  margin-top: 24px;
}

.trust-pair-lab .lab-note h3 {
  margin: 0 0 12px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.trust-pair-lab .lab-note ul {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.trust-pair-lab .lab-note strong {
  color: var(--vp-c-text-1);
}

.trust-pair-lab .lab-para {
  margin: 0 0 12px;
  max-width: 1000px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

@media screen and (max-width: 960px) {
  .trust-pair-lab .lab-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}


/* The pair: two cards of equal width and height, stacked below 1000px */

.trust-pair-lab .content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.trust-pair-lab .pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  width: 100%;
  margin-top: 32px;
}

.trust-pair-lab .pair .card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

@media screen and (max-width: 1000px) {
  .trust-pair-lab .pair {
    grid-template-columns: minmax(0, 1fr);
  }
}


/* Shared card pieces: head with an icon, eyebrow, headline, statement, lead, chips, verified footer, link */

.trust-pair-lab .p-head {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.trust-pair-lab .p-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
}

.trust-pair-lab .p-icon i {
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
}

.trust-pair-lab .p-title {
  margin: 0;
  font-size: 1.375rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.trust-pair-lab .p-eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.trust-pair-lab .p-headline {
  margin: 10px 0 0;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.trust-pair-lab .p-statement {
  margin: 12px 0 0;
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

.trust-pair-lab .p-lead {
  margin: 6px 0 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.trust-pair-lab .p-head .p-lead {
  margin-top: 2px;
  font-size: 0.9375rem;
}

.trust-pair-lab .p-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.trust-pair-lab .p-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 12px;
  line-height: 1;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  color: var(--vp-c-text-1);
  background-color: var(--home-surface-inner);
}

.trust-pair-lab .p-chip.lead {
  font-weight: 700;
  color: var(--vp-c-bg);
  background-color: var(--vp-c-text-1);
}

.trust-pair-lab .p-verified {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 0;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.trust-pair-lab .p-verified i {
  margin-top: 4px;
  color: #2E7D32;
}

html.dark .trust-pair-lab .p-verified i {
  color: #A5D6A7;
}

.trust-pair-lab .p-link {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  text-decoration: none;
}

.trust-pair-lab .p-link:hover {
  text-decoration: underline;
}

.trust-pair-lab .p-footer-link {
  margin-top: 0;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.trust-pair-lab .p-footer-link i {
  font-size: 0.75rem;
  margin-left: 2px;
}

@media screen and (max-width: 560px) {
  .trust-pair-lab .p-statement {
    font-size: 1.625rem;
    line-height: 2.125rem;
  }
}

</style>

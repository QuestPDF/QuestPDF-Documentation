<template>
  <!-- Lab page, not linked from anywhere: the validation line at the foot of the compliance card,
       five times, each more pronounced than the line that ships today. Delete this file, the
       Validation* components and docs/validation-lab.md once a direction ships. -->
  <div class="custom-page home-page textured-page validation-lab">
    <div class="container">
      <section class="content lab-intro">
        <h1>Validation line lab</h1>
        <p class="lab-lead">
          The sentence at the foot of the compliance card is the one piece of evidence on the page: independent,
          open-source validators run on every build. Today it reads as a footnote. Five directions give it the
          weight of a verdict, each building trust, maturity and confidence through a different device.
        </p>
        <p class="lab-jump">
          Jump to
          <a v-for="n of 6" :key="n" :href="`#v${n - 1}`">{{ n - 1 }}</a>
        </p>

        <div class="lab-grid">
          <div class="lab-note">
            <h3>What the line has to carry</h3>
            <ul>
              <li><strong>Independence.</strong> The validators are not ours. That is the whole argument, so every direction names them and links out.</li>
              <li><strong>Continuity.</strong> "Every build", not "tested once". The claim is about process, so it should read like a process: a status, a seal, a report.</li>
              <li><strong>Coverage.</strong> Which tool covers which family. A compliance officer matches the validator to the standard they need.</li>
              <li><strong>Checkability.</strong> Two links, two names, nothing a reviewer cannot verify in a minute.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>The five devices</h3>
            <ul>
              <li><strong>1 · Evidence bar.</strong> The same sentence, in a tinted inset with a title and a filled badge. The smallest change.</li>
              <li><strong>2 · Validator tiles.</strong> One tile per validator, each a link. Reads like a list of references.</li>
              <li><strong>3 · Check report.</strong> A CI status list with "Passed" on every row. The developer's own trust signal.</li>
              <li><strong>4 · Seal.</strong> A ring seal, an eyebrow, a headline claim. The most institutional.</li>
              <li><strong>5 · Statement.</strong> The claim in large type, the validators as outlined chips. The most typographic.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <lab-direction letter="0" id="v0" name="Today, for comparison" :dots="false">
      <template #why>One sentence in secondary colour with a small brand-blue badge. It is correct and quiet; the eye reads the chips above it and stops.</template>
      <template #tradeoffs>The strongest fact on the card has the weakest style on the card.</template>
      <ValidationPair><template #validation><ValidationV0 /></template></ValidationPair>
    </lab-direction>

    <lab-direction letter="1" id="v1" name="Evidence bar" :dots="false">
      <template #why>The sentence is unchanged, but it now sits in its own tinted inset under a bold title and a filled badge in a tinted circle. The inset reads as a stamped box at the foot of the card, and the title gives the skimmer the verdict before the sentence gives the detail.</template>
      <template #tradeoffs>The inset uses the same grey as the chips above, so the two blocks need the 32px gap to stay distinct. Adds about 40px to the card.</template>
      <ValidationPair><template #validation><ValidationV1 /></template></ValidationPair>
    </lab-direction>

    <lab-direction letter="2" id="v2" name="Validator tiles" :dots="false">
      <template #why>The claim becomes one bold line, and each validator gets its own tile with its name, the families it covers and an "open source" label. Two named third parties side by side look like a references section, which is what a security or compliance reviewer is used to trusting.</template>
      <template #tradeoffs>The tallest direction, about 90px more than today, so the left card overtakes the right one at 1440px. The copy is restructured rather than kept verbatim.</template>
      <ValidationPair><template #validation><ValidationV2 /></template></ValidationPair>
    </lab-direction>

    <lab-direction letter="3" id="v3" name="Check report" :dots="false">
      <template #why>Borrowed from the pull-request checks every developer reads daily: a green "All validations passing" header, one row per validator, a "Passed" pill on the right. It says maturity without a single adjective, because it shows the process instead of describing it.</template>
      <template #tradeoffs>"Passing" implies a live status; the block is static, so the header says "on every build" to keep it honest. Green is a new colour on the card. The "Independent, open source" column hides below 560px.</template>
      <ValidationPair><template #validation><ValidationV3 /></template></ValidationPair>
    </lab-direction>

    <lab-direction letter="4" id="v4" name="Seal" :dots="false">
      <template #why>A double-ring seal in brand blue, an uppercase eyebrow and a headline that states the result: "Every build passes veraPDF and Mustang." The sentence below becomes the supporting proof. The seal and the eyebrow are the vocabulary of certificates, so the block borrows their authority.</template>
      <template #tradeoffs>A seal can read as decoration if the headline ever softens; the claim has to stay a plain fact. The headline names both tools, so the sentence repeats them once.</template>
      <ValidationPair><template #validation><ValidationV4 /></template></ValidationPair>
    </lab-direction>

    <lab-direction letter="5" id="v5" name="Statement with proof chips" :dots="false">
      <template #why>The claim in 20px bold, the same size as a card subtitle, and the validators as two outlined chips with a badge icon and the families they cover. Confidence comes from type weight alone, and the chips make the validators feel like credentials rather than a parenthesis.</template>
      <template #tradeoffs>The outlined chips sit next to nine filled chips above; the outline is what keeps them apart, so it must not be filled in later. The statement wraps to two lines below about 1180px.</template>
      <ValidationPair><template #validation><ValidationV5 /></template></ValidationPair>
    </lab-direction>
  </div>
</template>

<script setup lang="ts">
import LabDirection from "./LabDirection.vue";
import ValidationPair from "./ValidationPair.vue";
import ValidationV0 from "./ValidationV0.vue";
import ValidationV1 from "./ValidationV1.vue";
import ValidationV2 from "./ValidationV2.vue";
import ValidationV3 from "./ValidationV3.vue";
import ValidationV4 from "./ValidationV4.vue";
import ValidationV5 from "./ValidationV5.vue";
</script>

<style>

.validation-lab .lab-intro h1 {
  margin-bottom: 1rem;
}

.validation-lab .lab-lead {
  max-width: 820px;
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-bottom: 32px;
}

.validation-lab .lab-jump {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: -16px 0 32px;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.validation-lab .lab-jump a {
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

.validation-lab .lab-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

.validation-lab .lab-note {
  padding: 24px 28px;
  border: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  border-radius: 16px;
}

.validation-lab .lab-note h3 {
  margin: 0 0 12px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.validation-lab .lab-note ul {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.validation-lab .lab-note strong {
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 960px) {
  .validation-lab .lab-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

</style>

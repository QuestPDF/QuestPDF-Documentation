<template>
  <!-- Lab page, not linked from anywhere: five simpler headers for the purchase success page
       (LicensePurchaseSuccess.vue). The audit, the reader, the measurements, the brainstorm and the
       recommendation come first; then today's header (0) and A-E, each above a copy of today's cards.
       `?only=<id>` (0, a-e) shows one direction with the full cards, as on the real page.
       Round 2 (PurchaseTagRound.vue, the tag's style) renders first; `?only=tag` shows it alone.
       Delete this folder and docs/purchase-lab.md once a direction ships. -->
  <div class="custom-page purchase-page textured-page purchase-lab">
    <PurchaseTagRound v-if="show('tag')" />

    <div v-if="!only" class="container">
      <section class="content lab-intro">
        <h1>Purchase page lab</h1>
        <p class="lab-lead">
          The header of the page a buyer lands on after checkout: kept are the green confirmation and the inbox
          sentence that opens in green; everything else is up for simplification. Each direction below sits above the
          same cards (shown up to the first screen; open <code>?only=b</code> for the full page).
        </p>
        <div class="lab-jump">
          <a v-for="id of ['0', 'A', 'B', 'C', 'D', 'E']" :key="id" :href="`#purchase-${id.toLowerCase()}`">{{ id }}</a>
        </div>

        <div class="lab-note lab-recommendation">
          <h3>Recommendation</h3>
          <p class="lab-para" v-html="recommendation"></p>
        </div>

        <div class="lab-grid">
          <div class="lab-note">
            <h3>Why today's header feels busy</h3>
            <ul>
              <li><strong>It says "it worked" three times</strong> before saying anything new: the "Order completed" tag, the "Thank you!" title and the green "Please check your inbox."</li>
              <li><strong>Four type styles in one centred stack</strong>: an uppercase 13px tag, a 44px title, a 20px green semibold phrase and 20px grey text.</li>
              <li><strong>A 21-word sentence</strong> lists three things in a run ("license details, license confirmation PDF, and developer setup instructions", "license" twice) and wraps to two lines.</li>
              <li><strong>Texture around it</strong>: the dot wings and the page's strongest sky-blue wash sit right behind the header.</li>
              <li><strong>Kept in every direction</strong> (owner): the green confirmation and the inbox sentence that opens in green. Only E changes the tag's form (into a notice), and says so.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>Who reads it</h3>
            <ul>
              <li><strong>The buyer, seconds after paying</strong> in Paddle's checkout: a developer with the company card or the manager who approved it.</li>
              <li><strong>They want three answers</strong>: did it work, where is the license (the inbox), and what do I tell my team (the Forward button in the first card). The header only has to answer the first two; the cards answer the rest.</li>
              <li><strong>Nothing personal is known here.</strong> The checkout's success URL is fixed (<code>paddle.ts</code>), so no direction shows an email address or an order number.</li>
              <li><strong>No external benchmark</strong> this time: other vendors' post-checkout pages cannot be reached without buying.</li>
            </ul>
          </div>
        </div>

        <h2 class="lab-round">Measurements at 1440px</h2>
        <div class="lab-table-wrap">
          <table class="lab-table">
            <thead>
              <tr><th></th><th>Elements</th><th>Words</th><th>Type styles</th><th>Header height</th><th>Cards start at</th></tr>
            </thead>
            <tbody>
              <tr v-for="row of metrics" :key="row.id" :class="{ 'lab-today': row.id === '0' }">
                <td>{{ row.id }} · {{ row.name }}</td>
                <td>{{ row.elements }}</td>
                <td>{{ row.words }}</td>
                <td>{{ row.styles }}</td>
                <td>{{ row.height }}</td>
                <td>{{ row.cards }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="lab-source">Elements: separate pieces in the header (tag, title, sentence, notice). Words: all words in the header. "Cards start at": distance from the top of the header to the top of the cards. Type styles: distinct combinations of size, weight and case; a change of colour alone (B's green half) does not count.</p>

        <h2 class="lab-round">Brainstorm: eleven ideas, five built</h2>
        <div class="lab-grid">
          <div class="lab-note">
            <h3>Kept</h3>
            <ul>
              <li><strong>A · Trimmed stack</strong>: same layout and tag; the sentence cut to twelve words on one line.</li>
              <li><strong>B · Two-tone headline</strong>: thanks and inbox in one title, the second half green; contents in one quiet line.</li>
              <li><strong>C · Quiet title</strong>: no display-size title; the tag and one line, so the cards lead.</li>
              <li><strong>D · Title with a status badge</strong>: left-aligned with the cards, the tag next to the title like a status.</li>
              <li><strong>E · One green notice</strong>: the title, then the confirmation and the inbox merged into one green notice.</li>
            </ul>
          </div>
          <div class="lab-note">
            <h3>Dropped, and why</h3>
            <ul>
              <li><strong>Step strip</strong> (Order completed, Check your inbox, Share with your team): adds three elements to a header that has too many; the Forward button already covers the third step.</li>
              <li><strong>A picture of the email</strong> with the PDF attached: adds an object, and would have to invent a sender and subject line.</li>
              <li><strong>The buyer's email address or order number</strong>: the success URL carries no data; it needs Paddle's checkout event and storage, a feature rather than a header change.</li>
              <li><strong>A large animated check or confetti</strong>: celebration noise on what is really a receipt; moves for everyone, including reduced-motion readers.</li>
              <li><strong>The header in its own card</strong>: adds a surface right above two more; E's notice groups the same things with less.</li>
              <li><strong>Only removing the dot wings</strong>: helps a little, but the busy part is the text. It is a lever on top of any direction (D already drops them).</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <purchase-direction v-if="show('0')" letter="0" id="purchase-0" name="Today" :metrics="metricLine('0')">
      <template #why>The starting point: the green tag, "Thank you!", and a two-line, 21-word sentence that opens with the green "Please check your inbox."</template>
      <template #tradeoffs>Three confirmations in a row, four type styles, a long sentence and the dot wings around it.</template>
      <PurchaseHeader0 />
      <PurchaseCards :clip="!only" />
    </purchase-direction>

    <purchase-direction v-if="show('a')" letter="A" id="purchase-a" name="Trimmed stack" :metrics="metricLine('a')">
      <template #why>Nothing moves; the sentence loses half its words and fits on one line, and the gaps tighten. The smallest change that still reads calmer, because the long grey tail was most of the visual weight.</template>
      <template #tradeoffs>Still says "it worked" three times and keeps four type styles; the difference is volume, not structure. The tag, the title and the dot wings stay as they are.</template>
      <template #copy>"Please check your inbox for your license confirmation PDF and setup instructions." (12 words, was 21.) "License details" is dropped: the confirmation PDF carries them.</template>
      <PurchaseHeaderA />
      <PurchaseCards :clip="!only" />
    </purchase-direction>

    <purchase-direction v-if="show('b')" letter="B" id="purchase-b" name="Two-tone headline" :metrics="metricLine('b')">
      <template #why>The two things a buyer needs become one title: "Thank you!" and, in green, "Please check your inbox." The green that the owner likes moves up to the size where it is read first; what the email holds drops to one quiet line. Two messages instead of three.</template>
      <template #tradeoffs>A long title (35 characters) on a short page; green at 44px is loud and must stay the darker green. The tag still says "Order completed" above it.</template>
      <template #copy>Title: "Thank you! Please check your inbox." Line: "We have sent your license confirmation PDF and setup instructions."</template>
      <PurchaseHeaderB />
      <PurchaseCards :clip="!only" />
    </purchase-direction>

    <purchase-direction v-if="show('c')" letter="C" id="purchase-c" name="Quiet title" :metrics="metricLine('c')">
      <template #why>No display-size title: the tag and one sentence at lead size, "Thank you!" in the text colour, the inbox in green, the rest in grey. The header becomes a caption over the cards, which carry the page; the cards move up by 72px.</template>
      <template #tradeoffs>The quietest and the least celebratory: no big moment after a purchase. Three colours in one line. Works best if the page should feel like a receipt.</template>
      <template #copy>"Thank you! Please check your inbox for your license confirmation PDF and setup instructions." as the page's h1 at 1.5rem.</template>
      <PurchaseHeaderC />
      <PurchaseCards :clip="!only" />
    </purchase-direction>

    <purchase-direction v-if="show('d')" letter="D" id="purchase-d" name="Title with a status badge" :dots="false" :metrics="metricLine('d')">
      <template #why>Left-aligned with the cards, the header reads as the page's own title rather than a banner floating above it. The green tag sits right after "Thank you!" the way a status badge sits next to a pull request or an invoice number, so the title and the confirmation read as one line; the inbox sentence follows. No dot wings: they frame centred headers. The cards move up by 96px.</template>
      <template #tradeoffs>Breaks with the centred headers on the pricing and contact pages. The tag reads as a label rather than an opener; on phones it wraps under the title.</template>
      <template #copy>Same sentence as A (12 words). Title and tag unchanged.</template>
      <PurchaseHeaderD />
      <PurchaseCards :clip="!only" />
    </purchase-direction>

    <purchase-direction v-if="show('e')" letter="E" id="purchase-e" name="One green notice" :metrics="metricLine('e')">
      <template #why>The title on its own, then one green notice with a check that holds both the confirmation and the inbox note: "Order completed. Please check your inbox" in green, the rest in grey. Two elements, and the green confirmation becomes the thing to read rather than a label above the title.</template>
      <template #tradeoffs>Changes the tag the owner likes into a notice box (same green, same check, different shape). A notice reads like a system message; on phones it wraps to three lines.</template>
      <template #copy>"Order completed. Please check your inbox for your license confirmation PDF and setup instructions."</template>
      <PurchaseHeaderE />
      <PurchaseCards :clip="!only" />
    </purchase-direction>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
/* imported for its global styles only (the page's canvas washes): in dev mode a component's CSS loads
   only on pages that import it */
import "../../../license/LicensePurchaseSuccess.vue";
import PurchaseDirection from "./PurchaseDirection.vue";
import PurchaseCards from "./PurchaseCards.vue";
import PurchaseHeader0 from "./PurchaseHeader0.vue";
import PurchaseHeaderA from "./PurchaseHeaderA.vue";
import PurchaseHeaderB from "./PurchaseHeaderB.vue";
import PurchaseHeaderC from "./PurchaseHeaderC.vue";
import PurchaseHeaderD from "./PurchaseHeaderD.vue";
import PurchaseHeaderE from "./PurchaseHeaderE.vue";
import PurchaseTagRound from "./PurchaseTagRound.vue";

const recommendation = `<strong>B · Two-tone headline.</strong> It is the only direction that removes a message rather than shortening one:
  "Thank you!" and "Please check your inbox." become one title, so the header says two things (it worked, go to your inbox) instead of three,
  with one type style fewer. It keeps both things you liked and gives the green part more weight, not less. If green at title size feels
  loud, use today's darker green or drop the full stop. Runner-up: <strong>A · Trimmed stack</strong>, the safe change (same layout as the pricing
  and contact headers, half the words). <strong>D</strong> is the most compact (cards 96px higher) if the page should read like a receipt
  rather than a moment.`;

/* measured on the dev server at 1440px */
const metrics = [
  { id: "0", name: "Today", elements: 3, words: 25, styles: 4, height: "200px", cards: "232px" },
  { id: "A", name: "Trimmed stack", elements: 3, words: 16, styles: 4, height: "160px", cards: "192px" },
  { id: "B", name: "Two-tone headline", elements: 3, words: 18, styles: 3, height: "160px", cards: "192px" },
  { id: "C", name: "Quiet title", elements: 2, words: 16, styles: 3, height: "128px", cards: "160px" },
  { id: "D", name: "Title with a status badge", elements: 3, words: 16, styles: 4, height: "104px", cards: "136px" },
  { id: "E", name: "One green notice", elements: 2, words: 16, styles: 3, height: "138px", cards: "170px" }
];

function metricLine(id: string) {
  const row = metrics.find(m => m.id.toLowerCase() === id);
  return row ? `${row.elements} elements · ${row.words} words · ${row.styles} styles · ${row.height}` : "";
}

/* ?only=<id> renders one direction with the full cards */
const only = ref<string | null>(null);

onMounted(() => {
  only.value = new URLSearchParams(window.location.search).get("only")?.toLowerCase() ?? null;
});

function show(id: string) {
  return !only.value || only.value === id;
}
</script>

<style>

.purchase-lab .lab-intro {
  align-items: stretch;
}

.purchase-lab .lab-intro h1 {
  margin-bottom: 1rem;
}

.purchase-lab .lab-lead {
  max-width: 880px;
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-bottom: 24px;
}

.purchase-lab .lab-jump {
  display: flex;
  gap: 6px;
  margin: 0 0 32px;
}

.purchase-lab .lab-jump a {
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

.purchase-lab .lab-round {
  margin: 48px 0 20px;
  font-size: 1.5rem;
  line-height: 2rem;
}

.purchase-lab .lab-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.purchase-lab .lab-note {
  padding: 24px 28px;
  border: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  border-radius: 16px;
}

.purchase-lab .lab-note h3 {
  margin: 0 0 12px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.purchase-lab .lab-note ul {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.purchase-lab .lab-note strong {
  color: var(--vp-c-text-1);
}

.purchase-lab .lab-para {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.purchase-lab .lab-recommendation {
  border-style: solid;
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent);
}

.purchase-lab .lab-source {
  margin: 12px 0 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.purchase-lab .lab-table-wrap {
  overflow-x: auto;
}

.purchase-lab .lab-table {
  display: table;
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  font-size: 0.9375rem;
  line-height: 1.375rem;
}

.purchase-lab .lab-table tr {
  background: none;
}

.purchase-lab .lab-table th,
.purchase-lab .lab-table td {
  padding: 8px 12px;
  border: none;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: left;
  background: none;
}

.purchase-lab .lab-table th {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.purchase-lab .lab-table td:first-child {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.purchase-lab .lab-today td {
  color: var(--vp-c-text-3);
}

@media screen and (max-width: 768px) {
  .purchase-lab .lab-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

</style>

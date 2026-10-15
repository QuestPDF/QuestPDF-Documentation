<template>
  <!-- Lab page, not linked from anywhere: directions for the group headers of the pricing FAQ
       (PricingFaq.vue), on the pricing page's own canvas. Round two (D1-D3, around round one's side
       rail) comes first, then round one (0, A-E). `?only=<id>` (d1-d3, 0, a-e) shows one direction;
       `&scroll=<px>` scrolls the page after load, for captures of the sticky states.
       Delete this folder and docs/pricing-faq-lab.md once a direction ships. -->
  <div class="custom-page pricing-page textured-page faq-lab">
    <div v-if="!only" class="container">
      <section class="content lab-intro">
        <h1>Pricing FAQ: group headers lab</h1>
        <p class="lab-lead">
          The subheader under "Frequently Asked Questions" is gone from the pricing page. This page looks at the six group
          headers that follow it ("Choosing Your License", "Pricing &amp; Renewals", …), today a blue h3 floating above each
          card. Round one tried five directions; round two takes the one you picked, D · Side rail, three ways. Every
          direction has the same question open, so the header and the open state can be judged together. Round two
          and D show all six groups (the short Client Work group is where a rail gets tested); A, B and C show three.
        </p>
        <p class="lab-jump">
          <a v-for="id of ['D1', 'D2', 'D3', '0', 'A', 'B', 'C', 'D', 'E']" :key="id" :href="`#faq-direction-${id.toLowerCase()}`">{{ id }}</a>
          <span class="lab-jump-hint">or open <code>?only=d2</code> to see one direction</span>
        </p>

        <div class="lab-note lab-recommendation">
          <h3>Recommendation, round two</h3>
          <p class="lab-para">
            <strong>D2 · Contents rail</strong>. It is the rail that earns its column: one look shows what the FAQ covers and
            how much (six topics, 30 questions), the marker shows where you are, and a click takes a buyer with one
            question straight to its group, all while the cards stay exactly as today. It is also the only take whose rail is
            never empty, because it does not depend on a group being long. The price is one small scroll listener and cards
            without visible titles on wide screens. If every card should name itself, take <strong>D1 · Rail with a scope line</strong>:
            pure CSS, and the scope lines help even without navigation (they are draft copy, to be checked). <strong>D3</strong>
            is the strongest object but the heaviest page; keep it in mind if the FAQ ever gets fewer, longer groups.
          </p>
          <h3 class="lab-subhead">Recommendation, round one</h3>
          <p class="lab-para">
            <strong>A · Neutral title</strong> now: one line of CSS, and it fixes the real problem (blue meaning two things).
            If the groups should read as things in their own right, go one step further to <strong>C · Title inside the card</strong>:
            each group becomes a panel that names itself, with an icon to scan by and its question count, and the
            cards stack 32px apart like every other run of cards on the site. <strong>E</strong>'s chip index is
            worth adding to either if the FAQ keeps growing: it is the only direction that helps someone who
            arrives with one question find its group without scrolling 30 rows.
          </p>
        </div>

        <div class="lab-note lab-note-wide">
          <h3>Round two: three takes on the side rail</h3>
          <ul>
            <li><strong>D1 · Rail with a scope line</strong>: D's rail per group, filled with one line naming what the group covers. Answers "the rail is mostly empty".</li>
            <li><strong>D2 · Contents rail</strong>: one rail for the whole FAQ, all six groups and their counts, a marker on the group being read, a click to jump. Answers "nothing to navigate by" (the dropped scroll-spy idea from round one, now that the rail exists).</li>
            <li><strong>D3 · Rail inside the panel</strong>: each group is one panel split by a hairline, the rail a tinted cell with C's icon tile. Answers "a title outside, a card below".</li>
            <li><strong>Shared</strong>: the cards keep about today's width (824–884px) and the rail takes the room the wide layout already has (1180px in all, under the page's 1376px). Titles stay in the text colour, so blue is only the open question and, in D2, the marker. Every rail is sticky 32px under the navbar; below 960px each folds back to a single column. On wide screens all four rails are the same height, 2560px for all six groups, about 320px shorter than titles above the cards (A), because the six title rows move into the rail.</li>
          </ul>
        </div>

        <div class="lab-grid">
          <div class="lab-note">
            <h3>What is wrong with today's headers</h3>
            <ul>
              <li><strong>Blue means two things.</strong> Everywhere else on the page blue marks what is open or clickable: the open question, its chevron, the hover tint, the links inside answers. A blue group title reads as a link, and with a question open right under it the card shows two blues of equal weight (see 0).</li>
              <li><strong>Weak in light mode.</strong> #2196F3 on the light canvas is 3.0:1, the bare minimum for large text; the title is 20px at weight 600, which is not clearly "large". The open question uses the same blue at 16px, so it has the same problem; that is left out of this lab, and every direction keeps it as it is.</li>
              <li><strong>A title outside, a card below.</strong> The title floats 16px above its card and 48px below the previous one. That proximity works, but the group is two objects, and on a long page six floating labels look like six more subheaders.</li>
              <li><strong>Nothing to navigate by.</strong> 30 questions in six groups, about 2,600px of rows; the groups are only found by scrolling past them.</li>
            </ul>
          </div>

          <div class="lab-note">
            <h3>Brainstorm: five built, six dropped</h3>
            <ul>
              <li><strong>Built</strong>: A neutral title (the simplest answer), B eyebrow and rule (the homepage's uppercase label), C title inside the card (one panel per group), D side rail (sticky titles in a column), E jump index (chips where the subheader was).</li>
              <li><strong>Tabs or a filter</strong> (one group at a time): the shortest page, but hides 24 of 30 questions from scanning and from Ctrl+F. Rejected in the earlier labs for the same reason.</li>
              <li><strong>Sticky table of contents with scroll-spy</strong>: needs JavaScript and a side column for all six; D gets most of it with CSS alone.</li>
              <li><strong>Numbered chapters</strong> ("01 Choosing Your License"): numbers suggest a reading order, and FAQ groups are entered at random. Could be added to B.</li>
              <li><strong>Blue tick before a neutral title</strong>: keeps a trace of brand colour, but puts blue next to the title again.</li>
              <li><strong>A one-line description per group</strong>: would fill D's rail, but means six new lines of copy; not written without your call.</li>
              <li><strong>Search field</strong>: 30 questions is below the point where search pays off; browser find works.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <lab-direction v-if="show('d1')" letter="D1" id="faq-direction-d1" name="Rail with a scope line">
      <template #why>Round one's rail, filled: the title, one line naming the topics the group covers, and the count, level with the first question and sticky while the group scrolls past. The scope line lets a reader pick the group before reading any question, which the bare title could not do for "Choosing Your License" or "Client Work". ({{ heights.d1 }})</template>
      <template #tradeoffs>Six lines of new copy (draft here: topics only, no claims) to keep in step with the questions. More text on a page that already has a lot. The two-question Client Work group is the tightest fit: its 130px rail sits beside a 145px card.</template>
      <faq-rail-scope />
    </lab-direction>

    <lab-direction v-if="show('d2')" letter="D2" id="faq-direction-d2" name="Contents rail">
      <template #why>One rail for the whole FAQ: all six groups with their counts on a hairline track, a blue marker that slides to the group being read, and a click that jumps to a group. The reader sees the whole FAQ's shape at once and always knows where they are; the cards keep today's 880px. On a phone the rail becomes a row of chips that scrolls sideways. ({{ heights.d2 }})</template>
      <template #tradeoffs>The only direction with JavaScript (a scroll listener for the marker; the links themselves are plain). On wide screens the cards carry no visible title, so the boundary between two groups is only a 32px gap and the rail. The rail only lists; it does not say what a group covers. A third blue on the page (the marker), though it means "you are here", which is close to "open".</template>
      <faq-rail-contents />
    </lab-direction>

    <lab-direction v-if="show('d3')" letter="D3" id="faq-direction-d3" name="Rail inside the panel">
      <template #why>The group is one panel, split by a hairline: a faintly tinted cell with the icon tile, the title and the count on the left, the questions on the right. The rail and its questions can no longer be read as two things, and the panels stack 32px apart like the page's other cards. The cell's content stays in view while a long group scrolls past. ({{ heights.d3 }})</template>
      <template #tradeoffs>The heaviest: six panels with a tinted column read as a table more than a list. Six icons to choose. Long titles wrap in the 296px cell ("Purchasing &amp; Legal Review"). The cell is sized (20px inset, 40px tile) so the two-question Client Work panel stays 145px. Under 960px the cell becomes round one's C header row.</template>
      <faq-rail-panel />
    </lab-direction>

    <div v-if="!only" class="container lab-round-head">
      <div class="content">
        <h2>Round one</h2>
      </div>
    </div>

    <lab-direction v-if="show('0')" letter="0" id="faq-direction-0" name="Today, without the subheader">
      <template #why>What ships now: the h2, then a blue h3 indented to the question text and 16px above each card, 48px between groups. ({{ heights['0'] }})</template>
      <template #tradeoffs>The two blues: the group title and the open question carry the same colour and nearly the same weight. In light mode the title sits at 3.0:1.</template>
      <faq-variant variant="0" />
    </lab-direction>

    <lab-direction v-if="show('a')" letter="A" id="faq-direction-a" name="Neutral title">
      <template #why>The title keeps its size and place and takes the text colour: near-white in dark mode, near-black in light. Blue is left to what is open or clickable, so the open question is the only accent in view. One line of CSS. ({{ heights.a }})</template>
      <template #tradeoffs>The quietest. With the questions also in the text colour, size and weight alone separate the levels (20px/600 against 16px/500), so the groups are found less quickly on a fast scroll. Nothing new to navigate by.</template>
      <faq-variant variant="a" />
    </lab-direction>

    <lab-direction v-if="show('b')" letter="B" id="faq-direction-b" name="Eyebrow and rule">
      <template #why>The homepage's own label for a group (the uppercase 12px label in the trust section), a hairline that runs to the card's right edge, and the question count above the chevron column. Reads as a divider between chapters rather than one more heading, which suits a page whose h2 now stands alone. ({{ heights.b }})</template>
      <template #tradeoffs>Small: on a fast scroll the label is easy to miss next to 16px questions. Uppercase titles are a little slower to read, and "Professional vs Enterprise" loses its capital-letter rhythm. The count adds a fact the page does not need.</template>
      <faq-variant variant="b" />
    </lab-direction>

    <lab-direction v-if="show('c')" letter="C" id="faq-direction-c" name="Title inside the card">
      <template #why>Each group is one panel whose first row names it: the homepage icon tile, the title and the count, above the first hairline. Nothing floats; the cards stack 32px apart like every other run of cards on the site, and the icons give six landmarks to scan by. The title is in the text colour, so blue is again only the open question. ({{ heights.c }})</template>
      <template #tradeoffs>The tallest of the single-column directions: a 93px header row in place of a floating title, about 40px more per group and 250px over all six. Six icons to choose and keep honest. The header row sits in the card but cannot be clicked, which may surprise someone who tries.</template>
      <faq-variant variant="c" />
    </lab-direction>

    <lab-direction v-if="show('d')" letter="D" id="faq-direction-d" name="Side rail">
      <template #why>The title moves into a column of its own, level with the first question and sticky while its group scrolls past, so the reader always sees which group they are in. Uses the page's wide layout (1120px instead of 880px); the classic docs-site FAQ. All six groups here, to compare with round two. ({{ heights.d }})</template>
      <template #tradeoffs>A layout change, not a restyle: the FAQ column gets wider than the other sections' text and the rail is mostly empty without a description per group (new copy). Under 960px it collapses to a title above the card, i.e. A.</template>
      <faq-variant variant="d" :groups="6" />
    </lab-direction>

    <lab-direction v-if="show('e')" letter="E" id="faq-direction-e" name="Jump index">
      <template #why>The six groups as chips under the h2, where the subheader was, each with its count and linking to its group; below, A's neutral titles. The reader who arrives with one question ("can we pay by invoice?") jumps to its group instead of scrolling 30 rows, and the chips also say what the FAQ covers, which the subheader used to do. ({{ heights.e }})</template>
      <template #tradeoffs>One more row of controls on a page full of buttons; the chips must not look like the tier buttons above. The chips add 92px; on a phone they stack one per row and add 276px. Plain in-page links, so no JavaScript, but the page has no "back to topics" link.</template>
      <faq-variant variant="e" :groups="6" />
    </lab-direction>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
/* imported for its global styles only (the pricing canvas and its section padding): in dev mode a
   component's CSS loads only on pages that import it */
import "../../../pricing/PricingIndex.vue";
import LabDirection from "../LabDirection.vue";
import FaqVariant from "./FaqVariant.vue";
import FaqRailScope from "./FaqRailScope.vue";
import FaqRailContents from "./FaqRailContents.vue";
import FaqRailPanel from "./FaqRailPanel.vue";

/* from the h2 to the bottom of the third (or last) card, one question open, measured on the dev
   server at 1440px and at 390px */
const heights: Record<string, string> = {
  "0": "three groups: 1597px, 2225px at 390",
  a: "three groups: 1597px, 2225px at 390",
  b: "three groups: 1573px, 2221px at 390",
  c: "three groups: 1724px, 2340px at 390",
  d: "six groups: 2560px, 3924px at 390",
  d1: "six groups: 2560px, 4292px at 390",
  d2: "six groups: 2560px, 3948px at 390",
  d3: "six groups: 2560px, 4138px at 390",
  e: "first three groups: 1689px, 2501px at 390"
};

const only = ref<string | null>(null);

onMounted(() => {
  const query = new URLSearchParams(window.location.search);
  only.value = query.get("only");

  /* capture switch: scroll after the directions have rendered, then tell D2's marker, since a
     headless capture may not deliver the scroll event */
  const scroll = Number(query.get("scroll"));

  if (scroll) {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "instant" });
      window.dispatchEvent(new Event("faq-lab-scrolled"));
    }, 1500);
  }
});

function show(id: string) {
  return !only.value || only.value === id;
}
</script>

<style>

.faq-lab .lab-intro {
  align-items: stretch;
}

.faq-lab .lab-intro h1 {
  margin-bottom: 1rem;
}

.faq-lab .lab-lead {
  max-width: 880px;
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin-bottom: 32px;
}

.faq-lab .lab-jump {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: -16px 0 32px;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

.faq-lab .lab-jump a {
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

.faq-lab .lab-jump-hint {
  margin-left: 10px;
}

.faq-lab .lab-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.faq-lab .lab-note {
  padding: 24px 28px;
  border: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  border-radius: 16px;
}

.faq-lab .lab-note h3 {
  margin: 0 0 12px;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.faq-lab .lab-note ul {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.faq-lab .lab-note strong {
  color: var(--vp-c-text-1);
}

.faq-lab .lab-para {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.faq-lab .lab-note-wide {
  margin-top: 24px;
}

.faq-lab .lab-subhead {
  margin-top: 20px !important;
}

.faq-lab .lab-round-head {
  margin-top: 96px;
}

.faq-lab .lab-round-head .content {
  padding-bottom: 0;
}

.faq-lab .lab-round-head h2 {
  margin: 0;
}

.faq-lab .lab-recommendation {
  border-style: solid;
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent);
}

@media screen and (max-width: 960px) {
  .faq-lab .lab-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

</style>

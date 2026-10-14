<template>
  <!-- Lab page, not linked from anywhere: five concepts for one homepage panel that merges the
       quick start (install, four reasons, code sample, rendered page) and "Develop with AI agents".
       Every concept uses the same sample, the same request and the same 3-line diff, with the real
       homepage canvas, panels and tokens. Research, brainstorm and proposals live in
       design-explorations/quick-start-agents/. Delete the lab (this folder and docs/agents-lab.md)
       once a concept is chosen and built into the homepage. -->
  <div class="custom-page home-page textured-page agents-lab">
    <div class="container">
      <section class="content lab-intro">
        <h1>Quick start + agents lab</h1>
        <p class="lab-lead">
          Five concepts for one panel that does three things, in this order: shows real code and its rendered page,
          explains why code-first matters, and shows the agent loop as a consequence of code-first. Same sample
          (<code>ComposeTable</code> from the invoice tutorial), same request ("Show negative amounts in red."),
          same diff (−1 +2 lines), same visible change (one credit line turns red).
        </p>
        <p class="lab-lead">
          Concepts 1, 2 and 5 autoplay once, four seconds after the panel is at least 40% in view, and have a
          Replay button. Concept 4 plays only on its button. Concept 3 never plays by itself; drag its slider.
          Under <em>prefers-reduced-motion</em> nothing autoplays and the buttons step through stills.
          Scroll slowly: the four-second delay counts continuous visibility.
        </p>
        <p class="lab-jump">
          Jump to
          <a v-for="c of concepts" :key="c.id" :href="`#${c.id}`">{{ c.number }} {{ c.name }}</a>
          <span class="lab-jump-sep">round two</span>
          <a v-for="c of roundTwo" :key="c.id" :href="`#${c.id}`">{{ c.number }} {{ c.name }}</a>
        </p>

        <div class="lab-note lab-note-wide">
          <h3>Round two</h3>
          <p>
            Built on what worked in 1, 4 and 5: the loop happens inside an artefact developers already trust (a review
            thread, the page itself, the file's history, the spec), never in a chat box. Five more at the bottom of the
            page: <strong>6 Suggestion</strong> (a review comment with a suggested-change block), <strong>7 Page
            Callouts</strong> (markers on the invoice map regions to code; the request lands on the credit line),
            <strong>8 Blame Gutter</strong> (who wrote which lines), <strong>9 Spec to Page</strong> (the product
            owner's sentences, each highlighting its lines), and <strong>10 Notes + Pull Request</strong>, the hybrid
            recommended after round one.
          </p>
        </div>

        <div class="lab-note lab-note-wide lab-recommendation">
          <h3>Recommendation</h3>
          <p>
            <strong>The hybrid of 4 and 1:</strong> Margin Notes as the resting layout (the shortest, and the best static
            read for developers and tech leads), with the live note in the gutter acting as the pull-request card when
            the demo plays, autoplay after four seconds plus Run and Replay. Document First is the most exciting for
            product owners but the only concept where the developer's first read is not the code.
          </p>
        </div>
      </section>
    </div>

    <template v-for="c of [...concepts, ...roundTwo]" :key="c.id">
      <div class="container">
        <section class="content lab-heading" :id="c.id">
          <div class="lab-title">
            <span class="lab-number">{{ c.number }}</span>
            <h2>{{ c.name }}</h2>
            <span class="lab-height">{{ c.height }} at 1440 px</span>
          </div>
          <p class="lab-lead">{{ c.text }}</p>
        </section>
      </div>

      <div class="container">
        <component :is="c.component" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
/* HomePage.vue is imported for its page-level styles (the canvas washes, the section seams, the
   panel padding), so the lab looks like the homepage it is designed for; it is not rendered. */
import HomePage from "../../HomePage.vue";
import AgentsPullRequest from "./AgentsPullRequest.vue";
import AgentsFourSteps from "./AgentsFourSteps.vue";
import AgentsScrub from "./AgentsScrub.vue";
import AgentsMarginNotes from "./AgentsMarginNotes.vue";
import AgentsDocumentFirst from "./AgentsDocumentFirst.vue";
import AgentsSuggestion from "./AgentsSuggestion.vue";
import AgentsPageCallouts from "./AgentsPageCallouts.vue";
import AgentsBlame from "./AgentsBlame.vue";
import AgentsSpec from "./AgentsSpec.vue";
import { h } from "vue";

void HomePage;

const concepts = [
  {
    id: "pull-request", number: "1", name: "Pull Request", component: AgentsPullRequest, height: "893 px",
    text: "The request is handled as a pull request. A fixed-height review card above the code carries the request as its title; the diff lands in the file, the checks turn green one by one, the page re-renders and the card settles as Merged. Speaks to the tech lead and the manager: the change is small, reviewed and merged."
  },
  {
    id: "four-steps", number: "2", name: "Four Steps", component: AgentsFourSteps, height: "917 px",
    text: "A Request → Change → Review → Document strip above the code and the page explains the loop in words at rest and lights up step by step during the demo. The four reasons are folded into the step descriptions, which loses Reusable components and the IDE sentence; the trade-off of the concept."
  },
  {
    id: "scrub", number: "3", name: "Scrub", component: AgentsScrub, height: "915 px",
    text: "Nothing autoplays. A slider with five positions, Code, Request, Change, Review, Document, lets the reader drag through the loop at their own pace; every position is a still. The most honest about motion and the least likely to be noticed."
  },
  {
    id: "margin-notes", number: "4", name: "Margin Notes", component: AgentsMarginNotes, height: "833 px",
    text: "A static, annotated layout: the four reasons pinned to the lines they describe, the page on the right, one Run button under it. No autoplay. During the demo the note at the Total line becomes the live note and the other three dim. The best static trust and the shortest panel; the loop is opt-in."
  },
  {
    id: "document-first", number: "5", name: "Document First", component: AgentsDocumentFirst, height: "908 px",
    text: "The rendered page is the subject, large, with the request directly above it in the product owner's words. The code beside it is the evidence that the change was small. The strongest concept for product owners; the only one where the developer's first read is not the code."
  }
];

const roundTwo = [
  {
    id: "suggestion", number: "6", name: "Suggestion", component: AgentsSuggestion, height: "~900 px",
    text: "The request is a review comment on the Total line, inside the code window, the way a reviewer comments on a pull request. The agent answers in the thread with a suggested change, the diff as a suggestion block, and Apply suggestion is the human's click. The code is untouched until it is applied; the thread resolves. Every developer who has used GitHub knows this UI."
  },
  {
    id: "page-callouts", number: "7", name: "Page Callouts", component: AgentsPageCallouts, height: "~860 px",
    text: "Numbered markers on the rendered invoice (header row, item rows, total column, and the file tab) with a legend that explains each in terms of the code; hovering an entry highlights the region on the page and the lines in the code. The request lands as a callout on the credit line itself, where the product owner would point. Document First and Margin Notes merged: the reasons are pinned to the page, not to the code."
  },
  {
    id: "blame", number: "8", name: "Blame Gutter", component: AgentsBlame, height: "~900 px",
    text: "An authorship gutter in the code window, like git blame. At rest every block says you. The request types into a bar under the window header; the agent's two lines arrive with agent · now in the gutter, and after review the gutter says reviewed by you. The cost argument is in the gutter: two lines out of twenty-seven, both reviewed."
  },
  {
    id: "spec", number: "9", name: "Spec to Page", component: AgentsSpec, height: "~900 px",
    text: "The product owner's list on the left in plain sentences, the code in the middle, the page on the right. Hovering a sentence highlights the lines that implement it. The request is simply a new sentence on the list: it types in, the agent proposes the lines, you review, the sentence gets its check mark. The reasons sit under the list, where the column has room."
  },
  {
    id: "hybrid", number: "10", name: "Notes + Pull Request", component: () => h(AgentsMarginNotes, { autoplay: true, pullRequest: true }), height: "833 px",
    text: "The hybrid recommended after round one: Margin Notes as the resting layout, the live note styled as the review card (Merged, 1 file, the four checks), autoplay four seconds after the panel is in view plus Play and Replay."
  }
];
</script>

<style>
/* Shared pieces the five concepts use: a real <button> that mirrors a.action (the router captures
   <a> clicks), the small chips from the trust card, the check lines, the typing caret and the
   panel header with the install chip on the right. Unscoped on purpose, limited to the lab root. */

.agents-lab button.action {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border: 0;
  border-radius: 12px;
  font: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  color: var(--vp-c-text-1);
  background-color: #8883;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.agents-lab button.action:hover { transform: translateY(-2px); background-color: #8885; box-shadow: var(--elevation); }
.agents-lab button.action:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.agents-lab button.action.primary { color: #FFF; background-color: #2196F3; font-weight: 700; }
.agents-lab button.action.primary:hover { background-color: #1E88E5; }
.agents-lab button.action.small { padding: 8px 14px; font-size: 0.875rem; border-radius: 10px; }
.agents-lab button.action .meta { font-weight: 400; opacity: 0.8; }
.agents-lab button.action i { font-size: 0.8125rem; }

.agents-lab .chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.8125rem;
  line-height: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: var(--home-surface-inner);
  white-space: nowrap;
}

.agents-lab .chip.merged { color: #fff; background: #4CAF50; }
html:not(.dark) .agents-lab .chip.merged { background: #43A047; }

.agents-lab .minus { color: #F44336; font-variant-numeric: tabular-nums; }
.agents-lab .plus { color: #4CAF50; font-variant-numeric: tabular-nums; }

.agents-lab .check {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-2);
}

.agents-lab .check i { width: 15px; font-size: 0.875rem; text-align: center; color: var(--vp-c-brand-1); }
.agents-lab .check.ok i { color: #4CAF50; }
.agents-lab .check.pending i { color: var(--vp-c-text-3); }

.agents-lab .label {
  font-size: 0.75rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.agents-lab .caret {
  display: inline-block;
  width: 2px;
  height: 1em;
  margin-left: 1px;
  vertical-align: -0.15em;
  background: currentColor;
  animation: agents-blink 1s step-end infinite;
}

@keyframes agents-blink {
  50% { opacity: 0; }
}

.agents-lab .panel-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 32px;
  align-items: start;
}

.agents-lab .panel-head .lead { max-width: 880px; }

@media screen and (max-width: 900px) {
  .agents-lab .panel-head { grid-template-columns: minmax(0, 1fr); gap: 20px; }
}

@media (prefers-reduced-motion: reduce) {
  .agents-lab .caret { animation: none; }
  .agents-lab button.action { transition: none; }
}


/* Lab chrome */

.agents-lab .lab-intro { padding-bottom: 0; }
.agents-lab .lab-intro h1 { margin-bottom: 1rem; }

.agents-lab .lab-lead {
  max-width: 880px;
  font-size: 1.0625rem;
  line-height: 1.625rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
}

.agents-lab .lab-jump { display: flex; flex-wrap: wrap; gap: 8px 14px; margin: 1rem 0 1.5rem; font-size: 0.9375rem; }
.agents-lab .lab-jump a { color: var(--vp-c-brand-1); }
.agents-lab .lab-jump-sep { color: var(--vp-c-text-3); margin-left: 8px; }
.agents-lab .lab-note + .lab-note { margin-top: 16px; }

.agents-lab .lab-note {
  max-width: 880px;
  padding: 20px 24px;
  border-radius: 16px;
  background: var(--home-surface);
  box-shadow: var(--home-surface-edge);
}

.agents-lab .lab-note h3 { margin: 0 0 8px; font-size: 1.0625rem; }
.agents-lab .lab-note p { margin: 0; font-size: 0.9375rem; line-height: 1.5rem; }

.agents-lab .lab-heading { padding-bottom: 0; }
.agents-lab .lab-heading + .container .content { padding-top: 24px; }

.agents-lab .lab-title { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; }
.agents-lab .lab-title h2 { margin: 0; }
.agents-lab .lab-number { font-size: 2rem; font-weight: 700; color: var(--vp-c-text-3); }
.agents-lab .lab-height { font-size: 0.875rem; color: var(--vp-c-text-3); }
.agents-lab .lab-heading .lab-lead { margin-top: 8px; margin-bottom: 0; }

/* the seam sits above a concept heading, not between the heading and its panel */
.agents-lab > .container:has(.lab-heading) + .container .content::before { content: none; }
</style>

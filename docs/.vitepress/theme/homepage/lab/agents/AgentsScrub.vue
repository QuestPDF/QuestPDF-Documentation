<script setup lang="ts">
import { computed, ref } from "vue";
import HomePageInstallCommand from "../../HomePageInstallCommand.vue";
import AgentsCode from "./AgentsCode.vue";
import AgentsPage from "./AgentsPage.vue";
import AgentsReasons from "./AgentsReasons.vue";
import { buildLines, type CodeMode } from "./agentsDemo";

/* Concept 3, Scrub: nothing plays by itself. A slider under the code and the page has five
   positions, Code · Request · Change · Review · Document; every position is a still, so reduced
   motion is the default behaviour. Keyboard arrows and Home/End work natively on the range input;
   the labels are buttons that jump to their position. */

interface Position {
  label: string;
  mode: CodeMode;
  after: boolean;
  caption: string;
}

const positions: Position[] = [
  { label: "Code", mode: "plain", after: false, caption: "<strong>Code.</strong> The table from the invoice tutorial: three columns, a header and a loop over the items. Drag the slider, or press →, to follow one request." },
  { label: "Request", mode: "plain", after: false, caption: "<strong>Request.</strong> The product owner writes: <strong>“Show negative amounts in red.”</strong> No ticket for a designer, no template editor." },
  { label: "Change", mode: "diff", after: false, caption: "<strong>Change.</strong> Your agent proposes <span class=\"minus\">−1</span> <span class=\"plus\">+2</span> lines in <code>InvoiceDocument.cs</code>. The API is typed, so the compiler checks the proposal before anyone reads it." },
  { label: "Review", mode: "diff", after: false, caption: "<strong>Review.</strong> You read three lines in a pull request and approve. That is the whole review." },
  { label: "Document", mode: "accepted", after: true, caption: "<strong>Document.</strong> <code>invoice.pdf</code> is rendered again: the credit line is red. One request, three lines, reviewed by you." }
];

const index = ref(0);
const current = computed(() => positions[index.value]);
const lines = computed(() => buildLines(current.value.mode));
const meta = computed(() => current.value.mode === "diff" ? "proposed change" : (current.value.mode === "accepted" ? "main" : ""));

function onInput(event: Event) {
  index.value = Number((event.target as HTMLInputElement).value);
}
</script>

<template>
  <section class="content">
    <div class="panel sc-panel">
      <div class="panel-head">
        <div class="lead">
          <h2 class="card-title">Documents as code, changes as diffs</h2>
          <p class="card-description">A C# file that renders to a PDF, lives in version control and changes by small reviewed diffs.</p>
        </div>
        <home-page-install-command />
      </div>

      <div class="sc-body">
        <agents-reasons class="left-reasons" layout="vertical" compact />

        <agents-code :lines="lines">
          <template #meta>{{ meta }}</template>
        </agents-code>

        <div class="side">
          <agents-page :after="current.after" :width="300" />
        </div>
      </div>

      <div class="scrubber">
        <div class="track">
          <div class="ticks" aria-hidden="true">
            <span v-for="(position, i) of positions" :key="position.label" class="tick" :class="{ passed: i <= index }" :style="{ left: `${i * 25}%` }"></span>
          </div>
          <input
              type="range"
              min="0"
              :max="positions.length - 1"
              step="1"
              :value="index"
              aria-label="Step through one request: code, request, change, review, document"
              :aria-valuetext="current.label"
              title="Drag, or use the arrow keys"
              @input="onInput">
          <div class="tick-labels">
            <button
                v-for="(position, i) of positions"
                :key="position.label"
                type="button"
                class="tick-label label"
                :class="{ current: i === index }"
                :aria-pressed="i === index"
                @click="index = i">
              {{ position.label }}
            </button>
          </div>
        </div>

        <p class="scrub-caption" aria-live="polite" v-html="current.caption"></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content { padding-bottom: 0; }

.sc-panel { padding: 48px; }

.sc-body {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr) 300px;
  gap: 32px;
  margin-top: 28px;
  align-items: start;
}

.side { display: flex; flex-direction: column; align-items: center; }

.scrubber {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 12px 32px;
  align-items: center;
  margin-top: 20px;
  padding: 14px 20px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--home-surface-inner);
}

.track { position: relative; margin: 6px 6px 0; }

.track input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  height: 2px;
  margin: 0;
  background: var(--vp-c-divider);
  outline: none;
  cursor: pointer;
}

.track input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--vp-c-brand-2);
  border: 3px solid var(--vp-c-bg);
  box-shadow: 0 0 0 1px var(--vp-c-brand-2);
}

.track input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-brand-2);
  border: 3px solid var(--vp-c-bg);
  box-shadow: 0 0 0 1px var(--vp-c-brand-2);
}

.track input[type="range"]:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-c-brand-2) 40%, transparent);
}

.ticks { position: absolute; left: 0; right: 0; top: 0; height: 2px; pointer-events: none; }
.tick { position: absolute; top: -3px; width: 8px; height: 8px; border-radius: 50%; background: var(--vp-c-divider); transform: translateX(-50%); }
.tick.passed { background: var(--vp-c-brand-2); }

.tick-labels { display: flex; justify-content: space-between; margin-top: 12px; }

.tick-label {
  width: 20%;
  padding: 0;
  border: 0;
  background: none;
  text-align: center;
  cursor: pointer;
  font: inherit;
}

.tick-label:first-child { text-align: left; }
.tick-label:last-child { text-align: right; }
.tick-label.current { color: var(--vp-c-brand-1); }
.tick-label:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; border-radius: 4px; }

.scrub-caption { margin: 0; font-size: 0.9375rem; line-height: 1.375rem; color: var(--vp-c-text-2); }
.scrub-caption :deep(strong) { color: var(--vp-c-text-1); font-weight: 600; }
.scrub-caption :deep(code) { font-size: 0.875rem; }

@media screen and (max-width: 1100px) {
  .sc-body { grid-template-columns: minmax(0, 1fr) 280px; }
  .left-reasons { grid-column: 1 / -1; }
  .left-reasons :deep(.reasons.vertical) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
}

@media screen and (max-width: 760px) {
  .sc-body { grid-template-columns: minmax(0, 1fr); }
  .left-reasons :deep(.reasons.vertical) { grid-template-columns: minmax(0, 1fr); }
  .scrubber { grid-template-columns: minmax(0, 1fr); }
}

@media screen and (max-width: 700px) {
  .sc-panel { padding: 32px 24px; }
}

@media screen and (max-width: 560px) {
  /* one label at a time on phones: the current step, centred */
  .tick-labels { justify-content: center; }
  .tick-label { display: none; }
  .tick-label.current { display: block; width: auto; text-align: center; }
}
</style>

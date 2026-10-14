<script setup lang="ts">
import { computed, ref } from "vue";
import HomePageInstallCommand from "../../HomePageInstallCommand.vue";
import AgentsCode from "./AgentsCode.vue";
import AgentsPage from "./AgentsPage.vue";
import AgentsReasons from "./AgentsReasons.vue";
import { diffStats, highlightRegion, useAgentDemo, type Region } from "./agentsDemo";

/* Concept 9, Spec to Page: the product owner's list on the left, in plain sentences; the code in
   the middle; the page on the right. Hovering a sentence highlights the lines of C# that implement
   it. The request is just a new sentence on the list: it types in, the agent proposes the lines,
   you review, the sentence gets its check mark and the page follows. The four reasons sit under
   the list, where the left column has room. */

const root = ref<HTMLElement | null>(null);
const demo = useAgentDemo({ root, autoplayDelay: 4000 });
const phase = demo.phase;

interface SpecLine {
  text: string;
  region: Region;
}

const spec: SpecLine[] = [
  { text: "A table with product, quantity and total", region: "columns" },
  { text: "A bold header row", region: "header" },
  { text: "One row per item", region: "rows" },
  { text: "Quantities and totals right-aligned", region: "aligned" }
];

const hovered = ref<Region | null>(null);
const lines = computed(() => highlightRegion(demo.lines.value, hovered.value));
</script>

<template>
  <section class="content">
    <div ref="root" class="panel sp-panel">
      <div class="panel-head">
        <div class="lead">
          <h2 class="card-title">Every sentence of the spec is a few lines of C#</h2>
          <p class="card-description">What the product owner asked for, the code that does it, the page it renders. Point at a sentence to see its lines. Add a sentence and watch the diff.</p>
        </div>
        <home-page-install-command />
      </div>

      <div class="sp-body">
        <div class="spec-column">
          <div class="label">What the product owner asked for</div>
          <ul class="spec" aria-label="The spec">
            <li
                v-for="line of spec"
                :key="line.text"
                class="spec-line done"
                :class="{ on: hovered === line.region }"
                tabindex="0"
                @mouseenter="hovered = line.region"
                @mouseleave="hovered = null"
                @focus="hovered = line.region"
                @blur="hovered = null">
              <i class="fa-regular fa-circle-check" aria-hidden="true"></i>
              <span>{{ line.text }}</span>
            </li>

            <!-- the new sentence -->
            <li class="spec-line new" :class="{ done: demo.reviewed.value, on: demo.started.value && !demo.reviewed.value }" aria-live="polite">
              <template v-if="phase === 'rest'">
                <i class="fa-regular fa-plus" aria-hidden="true"></i>
                <button type="button" class="spec-add" @click="demo.play()">Add a sentence <span class="meta">15 s</span></button>
              </template>
              <template v-else>
                <i v-if="demo.reviewed.value" class="fa-regular fa-circle-check" aria-hidden="true"></i>
                <i v-else-if="phase === 'typing'" class="fa-regular fa-circle" aria-hidden="true"></i>
                <i v-else-if="demo.proposed.value" class="fa-regular fa-circle-check" aria-hidden="true"></i>
                <i v-else class="fa-regular fa-circle-notch fa-spin" aria-hidden="true"></i>
                <span>
                  {{ demo.promptText.value }}<span v-if="phase === 'typing'" class="caret"></span>
                  <span v-if="phase !== 'typing'" class="spec-status">
                    <template v-if="!demo.proposed.value">Agent proposing</template>
                    <template v-else-if="!demo.reviewed.value"><span class="minus">−{{ diffStats.removed }}</span> <span class="plus">+{{ diffStats.added }}</span> lines, compiles. Your review next.</template>
                    <template v-else><span class="minus">−{{ diffStats.removed }}</span> <span class="plus">+{{ diffStats.added }}</span> lines, reviewed by you{{ demo.after.value ? ', rendered' : '' }}.</template>
                  </span>
                </span>
              </template>
            </li>
          </ul>

          <button v-if="phase === 'done'" type="button" class="action small replay" @click="demo.play()">
            <i class="fa-regular fa-rotate-right" aria-hidden="true"></i> Replay
          </button>

          <agents-reasons class="spec-reasons" layout="vertical" compact short />
        </div>

        <agents-code :lines="lines">
          <template #meta>
            <template v-if="['proposing', 'proposed'].includes(phase)">proposed change</template>
            <template v-else-if="demo.reviewed.value">main</template>
          </template>
        </agents-code>

        <div class="side">
          <agents-page :after="demo.after.value" :width="280" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content { padding-bottom: 0; }

.sp-panel { padding: 48px; }

.sp-body {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 280px;
  gap: 32px;
  margin-top: 28px;
  align-items: start;
}

.spec { list-style: none; margin: 8px 0 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }

.spec-line {
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  gap: 10px;
  align-items: start;
  padding: 6px 10px;
  margin: 0 -10px;
  border-radius: 8px;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-1);
  transition: background-color 0.2s ease;
}

.spec-line i { margin-top: 4px; font-size: 0.875rem; color: var(--vp-c-text-3); }
.spec-line.done i { color: #4CAF50; }
.spec-line.on { background-color: color-mix(in srgb, var(--vp-c-brand-2) 12%, transparent); }
.spec-line.new:not(.done) i { color: var(--vp-c-brand-1); }
.spec-line:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }

.spec-add {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  color: var(--vp-c-brand-1);
  cursor: pointer;
  text-align: left;
}

.spec-add .meta { color: var(--vp-c-text-3); }
.spec-add:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; border-radius: 4px; }

.spec-status { display: block; font-size: 0.8125rem; line-height: 1.125rem; color: var(--vp-c-text-2); }

.replay { margin-top: 12px; }

.spec-reasons {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.side { display: flex; flex-direction: column; align-items: center; }

@media screen and (max-width: 1100px) {
  .sp-body { grid-template-columns: minmax(0, 1fr) 280px; }
  .spec-column { grid-column: 1 / -1; }
  .spec-reasons :deep(.reasons.vertical) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
}

@media screen and (max-width: 760px) {
  .sp-body { grid-template-columns: minmax(0, 1fr); }
  .spec-reasons :deep(.reasons.vertical) { grid-template-columns: minmax(0, 1fr); }
}

@media screen and (max-width: 700px) {
  .sp-panel { padding: 32px 24px; }
}
</style>

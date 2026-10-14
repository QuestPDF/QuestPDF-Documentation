<script setup lang="ts">
import { computed, ref } from "vue";
import HomePageInstallCommand from "../../HomePageInstallCommand.vue";
import AgentsCode from "./AgentsCode.vue";
import AgentsPage from "./AgentsPage.vue";
import { diffStats, highlightRegion, reasons, useAgentDemo, type Region } from "./agentsDemo";

/* Concept 7, Page Callouts: the rendered page carries numbered markers on its regions (the header
   row, the item rows, the total column) and the file tab carries the fourth; a legend beside the
   page explains each in terms of the code, and hovering a legend entry highlights the region on the
   page and the lines in the code. The request lands as a callout on the credit line itself, where
   the product owner would point. */

const root = ref<HTMLElement | null>(null);
const demo = useAgentDemo({ root, autoplayDelay: 4000 });
const phase = demo.phase;

interface Entry {
  number: string;
  region: Region;
  reason: typeof reasons[number];
  text: string;
}

const entries: Entry[] = [
  { number: "1", region: "header", reason: reasons[2], text: "The header is a method you call from any document; address blocks and tables are classes." },
  { number: "2", region: "rows", reason: reasons[0], text: "One foreach, one row per item. Conditions and functions shape the page; your IDE's tools work on them." },
  { number: "3", region: "total", reason: reasons[3], text: "A typed call the compiler checks, whether you or your agent wrote it. Layout errors name the element at fault." },
  { number: "4", region: "file", reason: reasons[1], text: "The whole document is one file in version control, so a change is a diff in a pull request." }
];

const hovered = ref<Region | null>(null);

/* while the agent works, the total column is the active region */
const active = computed<Region | null>(() => hovered.value ?? (demo.started.value && !demo.after.value ? "total" : null));
const lines = computed(() => highlightRegion(demo.lines.value, hovered.value));
</script>

<template>
  <section class="content">
    <div ref="root" class="panel pc-panel">
      <div class="panel-head">
        <div class="lead">
          <h2 class="card-title">Every part of the page is a few lines of C#</h2>
          <p class="card-description">Point at a region of the invoice to see the code that draws it. Point at a line to ask for a change.</p>
        </div>
        <home-page-install-command />
      </div>

      <div class="pc-body">
        <div class="page-column">
          <agents-page :after="demo.after.value" :width="340" :active="active" markers>
            <template #callout>
              <div v-if="phase !== 'rest'" class="callout" :class="{ done: demo.after.value }" aria-live="polite">
                <template v-if="!demo.reviewed.value">
                  <div class="callout-who"><i class="fa-regular fa-user" aria-hidden="true"></i> Product owner</div>
                  <div class="callout-text">{{ demo.promptText.value }}<span v-if="phase === 'typing'" class="caret"></span></div>
                  <div v-if="phase !== 'typing'" class="callout-status">
                    <i class="fa-regular" :class="demo.proposed.value ? 'fa-circle-check ok' : 'fa-circle-notch fa-spin'" aria-hidden="true"></i>
                    Agent proposes <span class="minus">−{{ diffStats.removed }}</span> <span class="plus">+{{ diffStats.added }}</span>{{ demo.proposed.value ? ', compiles' : '' }}
                  </div>
                </template>
                <template v-else>
                  <div class="callout-status"><i class="fa-regular fa-circle-check ok" aria-hidden="true"></i> Reviewed by you{{ demo.after.value ? ', rendered' : '' }}</div>
                </template>
              </div>
            </template>
          </agents-page>

          <div class="trigger">
            <button v-if="phase === 'rest'" type="button" class="action small" @click="demo.play()">
              <i class="fa-regular fa-play" aria-hidden="true"></i> Play the request <span class="meta">15 s</span>
            </button>
            <button v-else-if="phase === 'done'" type="button" class="action small" @click="demo.play()">
              <i class="fa-regular fa-rotate-right" aria-hidden="true"></i> Replay
            </button>
          </div>
        </div>

        <ol class="legend" aria-label="What draws each part of the page">
          <li
              v-for="entry of entries"
              :key="entry.number"
              class="entry"
              :class="{ on: hovered === entry.region }"
              tabindex="0"
              @mouseenter="hovered = entry.region"
              @mouseleave="hovered = null"
              @focus="hovered = entry.region"
              @blur="hovered = null">
            <span class="entry-number">{{ entry.number }}</span>
            <div>
              <h3 class="row-title">{{ entry.reason.title }}</h3>
              <p class="row-description">{{ entry.text }}</p>
            </div>
          </li>
        </ol>

        <agents-code :lines="lines" class="pc-code" :class="{ 'file-on': active === 'file' }">
          <template #meta>
            <span class="file-marker" aria-hidden="true">4</span>
            <template v-if="['proposing', 'proposed'].includes(phase)">proposed change</template>
            <template v-else-if="demo.reviewed.value">main</template>
          </template>
        </agents-code>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content { padding-bottom: 0; }

.pc-panel { padding: 48px; }

.pc-body {
  display: grid;
  grid-template-columns: 340px 250px minmax(0, 1fr);
  gap: 32px;
  margin-top: 28px;
  align-items: start;
}

.page-column { display: flex; flex-direction: column; align-items: center; }
.page-column :deep(.page) { overflow: visible; }
.trigger { margin-top: 16px; min-height: 36px; }

/* the callout: a small bubble above the credit line, inside the page */
.callout {
  position: absolute;
  right: 0;
  bottom: calc(100% + 0.6em);
  width: 16em;
  padding: 0.6em 0.8em;
  border-radius: 0.6em;
  background: #1E2A38;
  color: #fff;
  font-size: 1.05em;
  line-height: 1.35;
  text-align: left;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  z-index: 2;
}

.callout::after {
  content: "";
  position: absolute;
  right: 1.2em;
  top: 100%;
  border: 0.5em solid transparent;
  border-top-color: #1E2A38;
}

.callout.done { background: #2E7D32; }
.callout.done::after { border-top-color: #2E7D32; }
.callout-who { font-size: 0.85em; opacity: 0.75; display: flex; gap: 0.4em; align-items: center; }
.callout-text { font-weight: 600; margin-top: 0.15em; }
.callout-status { display: flex; gap: 0.4em; align-items: center; margin-top: 0.3em; font-size: 0.9em; }
.callout .ok { color: #A5D6A7; }
.callout .minus { color: #EF9A9A; }
.callout .plus { color: #A5D6A7; }

/* legend */
.legend { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }

.entry {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 10px;
  padding: 8px 10px;
  margin: 0 -10px;
  border-radius: 10px;
  cursor: default;
  transition: background-color 0.2s ease;
}

.entry.on { background-color: color-mix(in srgb, var(--vp-c-brand-2) 12%, transparent); }
.entry:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }

.entry-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  border-radius: 50%;
  background: #2196F3;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
}

.entry .row-title { font-size: 0.9375rem; line-height: 1.25rem; }
.entry .row-description { font-size: 0.875rem; line-height: 1.25rem; margin-top: 2px; }

/* the fourth marker sits in the file tab; the whole window tints when it is active */
.file-marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #2196F3;
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 700;
}

.pc-code { transition: box-shadow 0.2s ease; }
.pc-code.file-on { box-shadow: 0 0 0 2px var(--vp-c-brand-2); }

@media screen and (max-width: 1180px) {
  .pc-body { grid-template-columns: 300px minmax(0, 1fr); }
  .pc-code { grid-column: 1 / -1; }
}

@media screen and (max-width: 700px) {
  .pc-panel { padding: 32px 24px; }
  .pc-body { grid-template-columns: minmax(0, 1fr); }
  .callout { width: 12em; }
}
</style>

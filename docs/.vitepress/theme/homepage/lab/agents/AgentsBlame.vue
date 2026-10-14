<script setup lang="ts">
import { computed, ref } from "vue";
import HomePageInstallCommand from "../../HomePageInstallCommand.vue";
import HomePageHighlightedCode from "../../HomePageHighlightedCode.vue";
import AgentsWindow from "./AgentsWindow.vue";
import AgentsPage from "./AgentsPage.vue";
import AgentsReasons from "./AgentsReasons.vue";
import { diffStats, fileName, linesToCode, linesTransformer, reservedLines, useAgentDemo } from "./agentsDemo";

/* Concept 8, Blame Gutter: the code window has an authorship gutter, like git blame. At rest every
   block is "you". The request types into a slim bar under the window header; the agent's two lines
   arrive with "agent · now" in the gutter, and after review the gutter says "reviewed by you". The
   gutter tells the whole story: one file, two authors, every line reviewed. */

const root = ref<HTMLElement | null>(null);
const demo = useAgentDemo({ root, autoplayDelay: 4000 });
const phase = demo.phase;

const code = computed(() => linesToCode(demo.lines.value));
const transformer = computed(() => linesTransformer(demo.lines.value));

interface GutterRow {
  top: string;
  who: "you" | "agent";
  when: string;
  reviewed?: boolean;
}

/* one label per authored block: the base-line index where a block starts, and the agent's lines */
const blockStarts: Record<number, string> = { 0: "3 weeks ago", 11: "3 weeks ago", 18: "2 days ago" };

const gutter = computed<GutterRow[]>(() => {
  const rows: GutterRow[] = [];
  let base = 0;
  let agentLabelled = false;

  demo.lines.value.forEach((line, index) => {
    const top = `${8 + index * 19.5}px`;
    const isAgent = line.kind === "added" || line.kind === "highlighted";

    if (isAgent) {
      if (!agentLabelled) {
        rows.push({ top, who: "agent", when: "now", reviewed: demo.reviewed.value });
        agentLabelled = true;
      }
      return;
    }

    if (blockStarts[base] !== undefined)
      rows.push({ top, who: "you", when: blockStarts[base] });

    base++;
  });

  return rows;
});

const reservedHeight = `${reservedLines * 19.5 + 16}px`;
</script>

<template>
  <section class="content">
    <div ref="root" class="panel bl-panel">
      <div class="panel-head">
        <div class="lead">
          <h2 class="card-title">One file, two authors, every line reviewed</h2>
          <p class="card-description">A C# file that renders to a PDF. You wrote it; your agent can change it; the history shows who did what, and you review every line.</p>
        </div>
        <home-page-install-command />
      </div>

      <div class="bl-body">
        <agents-window :file-name="fileName" class="bl-code">
          <template #meta>
            <template v-if="['proposing', 'proposed'].includes(phase)">proposed change</template>
            <template v-else-if="demo.reviewed.value">main</template>
          </template>

          <!-- the request bar: a second header row inside the window -->
          <div class="request" aria-live="polite">
            <template v-if="phase === 'rest'">
              <i class="fa-regular fa-user" aria-hidden="true"></i>
              <span class="request-hint">A request from the product owner, in plain language.</span>
              <span class="spacer"></span>
              <button type="button" class="action small" @click="demo.play()">
                <i class="fa-regular fa-play" aria-hidden="true"></i> Play the request <span class="meta">15 s</span>
              </button>
            </template>
            <template v-else>
              <i class="fa-regular fa-user" aria-hidden="true"></i>
              <span class="request-text">{{ demo.promptText.value }}<span v-if="phase === 'typing'" class="caret"></span></span>
              <span class="spacer"></span>
              <span v-if="demo.started && phase !== 'typing'" class="chip"><span class="minus">−{{ diffStats.removed }}</span> <span class="plus">+{{ diffStats.added }}</span></span>
              <span v-if="demo.reviewed.value" class="chip merged"><i class="fa-regular fa-check" aria-hidden="true"></i> Merged</span>
              <button v-if="phase === 'done'" type="button" class="action small" @click="demo.play()">
                <i class="fa-regular fa-rotate-right" aria-hidden="true"></i> Replay
              </button>
            </template>
          </div>

          <div class="blame">
            <div class="gutter" aria-hidden="true">
              <div v-for="row of gutter" :key="row.top" class="gutter-row" :class="row.who" :style="{ top: row.top }">
                <i class="fa-regular" :class="row.who === 'agent' ? 'fa-terminal' : 'fa-user'"></i>
                <span class="gutter-who">{{ row.who }}</span>
                <span class="gutter-when">{{ row.when }}</span>
                <span v-if="row.reviewed" class="gutter-reviewed"><i class="fa-regular fa-circle-check"></i> reviewed by you</span>
              </div>
            </div>

            <suspense><home-page-highlighted-code :code="code" :code-transformer="transformer" /></suspense>
          </div>
        </agents-window>

        <div class="side">
          <agents-page :after="demo.after.value" :width="250" />
          <agents-reasons class="side-reasons" layout="vertical" compact short />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content { padding-bottom: 0; }

.bl-panel { padding: 48px; }

.bl-body {
  display: grid;
  grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
  gap: 40px;
  margin-top: 28px;
  align-items: start;
}

.request {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 6px 12px 6px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--home-surface-inner);
  font-size: 0.9375rem;
}

.request > i { color: var(--vp-c-text-3); }
.request-hint { color: var(--vp-c-text-2); }
.request-text { font-weight: 600; color: var(--vp-c-text-1); }
.spacer { flex: 1 1 auto; }

/* the gutter is a 190px column the code is indented past; rows sit at the code's line offsets */
.blame { position: relative; min-height: v-bind(reservedHeight); }
.bl-code :deep(.code-source) { font-size: 13px; min-height: v-bind(reservedHeight); padding-left: 190px; }

.gutter {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 190px;
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.gutter-row {
  position: absolute;
  left: 14px;
  right: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 6px;
  height: 19.5px;
  font-size: 0.75rem;
  line-height: 19.5px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  transition: top 0.2s ease;
}

.gutter-row i { width: 12px; text-align: center; font-size: 0.6875rem; }
.gutter-who { font-weight: 600; color: var(--vp-c-text-2); }
.gutter-row.agent .gutter-who, .gutter-row.agent i { color: var(--vp-c-brand-1); }
.gutter-reviewed { display: flex; gap: 4px; align-items: center; width: 100%; color: #4CAF50; height: 19.5px; }
.gutter-reviewed i { color: #4CAF50; }

.side { display: flex; flex-direction: column; align-items: center; }

.side-reasons {
  width: 100%;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

@media screen and (max-width: 1000px) {
  .bl-body { grid-template-columns: minmax(0, 1fr); gap: 32px; }
}

@media screen and (max-width: 700px) {
  .bl-panel { padding: 32px 24px; }
  .request { flex-wrap: wrap; }
  .blame { min-height: calc(28 * 15px + 16px); }
  .bl-code :deep(.code-source) { padding-left: 120px; min-height: calc(28 * 15px + 16px); }
  .gutter { width: 120px; }
  .gutter-row { height: 15px; line-height: 15px; font-size: 0.6875rem; }
  .gutter-when { display: none; }
}
</style>

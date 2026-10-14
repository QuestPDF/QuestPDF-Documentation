<script setup lang="ts">
import { computed, ref } from "vue";
import HomePageInstallCommand from "../../HomePageInstallCommand.vue";
import AgentsCode from "./AgentsCode.vue";
import AgentsPage from "./AgentsPage.vue";
import { diffStats, reasons, useAgentDemo } from "./agentsDemo";

/* Concept 4, Margin Notes: a static, annotated layout. The code on the left; a notes gutter in
   the middle with the four reasons pinned to the lines they are about; the page on the right with
   the one explicit trigger under it. No autoplay. During the demo the note at the Total line
   becomes the live note (request, proposal, review) and the other three dim.

   Notes are pinned by line offset: 41px header + 8px padding + 19.5px per line at the 13px code
   size. Production would measure the line's offsetTop at mount instead of using constants. */

/* `autoplay` and `pullRequest` turn this into concept 10, the recommended hybrid: the same resting
   layout, the live note styled as the review card (Merged chip, file count), autoplay after 4 s */
const props = withDefaults(defineProps<{ autoplay?: boolean; pullRequest?: boolean }>(), { autoplay: false, pullRequest: false });

const root = ref<HTMLElement | null>(null);
const demo = useAgentDemo({ root, autoplayDelay: props.autoplay ? 4000 : null });

const phase = demo.phase;

function lineTop(line: number) {
  return `${41 + 8 + line * 19.5}px`;
}

/* which reason sits where: the file tab, container.Table, foreach, the Total line */
const pinned = [
  { reason: reasons[1], top: "6px", text: "A document change is a diff, reviewed in a pull request like the rest of your code." },
  { reason: reasons[2], top: lineTop(2), text: "A method or an IComponent class, shared across documents and projects." },
  { reason: reasons[0], top: lineTop(18), text: "Loops, conditions and functions build the page. Your IDE's tools work on it." }
];

const agentNote = { reason: reasons[3], top: lineTop(22), text: "A typed API the compiler checks, layout errors that name the element at fault, docs as llms.txt." };

const meta = computed(() => {
  if (["proposing", "proposed"].includes(phase.value)) return "proposed change";
  if (["reviewed", "done"].includes(phase.value)) return "main";
  return "";
});
</script>

<template>
  <section class="content">
    <div ref="root" class="panel mn-panel">
      <div class="panel-head">
        <div class="lead">
          <h2 class="card-title">{{ pullRequest ? 'Documents as code, changes as pull requests' : 'Read the document in C#' }}</h2>
          <p class="card-description">{{ pullRequest ? 'A C# file that renders to a PDF, lives in version control and changes by small reviewed diffs.' : 'The table from the invoice tutorial and the page it renders. Documents are code, so everything you know about software applies.' }}</p>
        </div>
        <home-page-install-command />
      </div>

      <div class="mn-body">
        <agents-code :lines="demo.lines.value">
          <template #meta>{{ meta }}</template>
        </agents-code>

        <div class="notes" aria-label="Why documents as code">
          <article v-for="note of pinned" :key="note.reason.title" class="note" :class="{ dim: demo.started.value }" :style="{ top: note.top }">
            <h3 class="row-title">{{ note.reason.title }}</h3>
            <p class="row-description">{{ note.text }}</p>
          </article>

          <!-- at rest the agent reason; during the demo the live note, in the same place -->
          <article v-if="phase === 'rest'" class="note" :style="{ top: agentNote.top }">
            <h3 class="row-title">{{ agentNote.reason.title }}</h3>
            <p class="row-description">{{ agentNote.text }}</p>
          </article>

          <article v-else class="note live" :style="{ top: agentNote.top }" aria-live="polite">
            <div class="label live-label">
              <span v-if="pullRequest && demo.reviewed.value" class="chip merged"><i class="fa-regular fa-check" aria-hidden="true"></i> Merged</span>
              <template v-else>{{ demo.reviewed.value ? 'Merged' : (pullRequest ? 'Pull request' : 'Request') }}</template>
              <span v-if="pullRequest && phase !== 'typing'" class="chip">1 file</span>
            </div>
            <h3 class="row-title">“{{ demo.promptText.value }}<span v-if="phase === 'typing'" class="caret"></span>{{ phase === 'typing' ? '' : '”' }}</h3>

            <template v-if="!demo.reviewed.value">
              <div v-if="phase !== 'typing'" class="check" :class="demo.proposed.value ? 'ok' : ''">
                <i class="fa-regular" :class="demo.proposed.value ? 'fa-circle-check' : 'fa-circle-notch fa-spin'" aria-hidden="true"></i>
                Your agent proposes <span class="minus">−{{ diffStats.removed }}</span> <span class="plus">+{{ diffStats.added }}</span> lines
              </div>
              <div v-if="demo.proposed.value" class="check ok"><i class="fa-regular fa-circle-check" aria-hidden="true"></i> Compiles</div>
              <div v-if="demo.proposed.value" class="check pending"><i class="fa-regular fa-circle" aria-hidden="true"></i> Waiting for your review</div>
            </template>

            <template v-else>
              <div class="check ok"><i class="fa-regular fa-circle-check" aria-hidden="true"></i> <span class="minus">−{{ diffStats.removed }}</span> <span class="plus">+{{ diffStats.added }}</span> lines, compiles</div>
              <div class="check ok"><i class="fa-regular fa-circle-check" aria-hidden="true"></i> Reviewed by you</div>
              <div class="check" :class="demo.after.value ? 'ok' : 'pending'"><i class="fa-regular" :class="demo.after.value ? 'fa-circle-check' : 'fa-circle'" aria-hidden="true"></i> invoice.pdf rendered again</div>
            </template>
          </article>
        </div>

        <div class="side">
          <agents-page :after="demo.after.value" :width="260" />

          <div class="trigger">
            <template v-if="phase === 'rest'">
              <button type="button" class="action" @click="demo.play()">
                <i class="fa-regular fa-play" aria-hidden="true"></i> {{ pullRequest ? 'Play the request' : 'Run a request' }} <span class="meta">15 s</span>
              </button>
              <span class="hint">{{ pullRequest ? 'A request from the product owner, handled as a pull request.' : 'One request from a product owner, handled by your agent and reviewed by you.' }}</span>
            </template>
            <button v-else-if="phase === 'done'" type="button" class="action" @click="demo.play()">
              <i class="fa-regular fa-rotate-right" aria-hidden="true"></i> Replay
            </button>
            <span v-else class="hint">The page updates after your review.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content { padding-bottom: 0; }

.mn-panel { padding: 48px; }

.mn-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px 260px;
  gap: 28px;
  margin-top: 28px;
  align-items: start;
}

.notes { position: relative; min-height: 560px; }

.note {
  position: absolute;
  left: 0;
  right: 0;
  padding: 2px 0 2px 16px;
  border-left: 2px solid var(--vp-c-divider);
  transition: opacity 0.3s ease;
}

/* the leader line back to the code window */
.note::before {
  content: "";
  position: absolute;
  left: -29px;
  top: 10px;
  width: 24px;
  height: 2px;
  background: var(--vp-c-divider);
}

.note.dim { opacity: 0.4; }

.note .row-title { font-size: 0.9375rem; line-height: 1.25rem; }
.note .row-description { font-size: 0.875rem; line-height: 1.25rem; margin-top: 2px; }

.note.live { border-left-color: var(--vp-c-brand-2); }
.note.live::before { background: var(--vp-c-brand-2); }
.note.live .label { color: var(--vp-c-brand-1); }
.note.live .live-label { display: flex; align-items: center; gap: 8px; }
.note.live .check { display: flex; margin-top: 4px; }

.side { display: flex; flex-direction: column; align-items: center; }

.trigger {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.trigger .hint { font-size: 0.8125rem; line-height: 1.25rem; color: var(--vp-c-text-3); }

@media screen and (max-width: 1100px) {
  .mn-body { grid-template-columns: minmax(0, 1fr) 280px; }
  .notes { grid-column: 1 / -1; min-height: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 32px; }
  .note { position: static; }
  .note::before { display: none; }
}

@media screen and (max-width: 760px) {
  .mn-body { grid-template-columns: minmax(0, 1fr); }
  .notes { grid-template-columns: minmax(0, 1fr); }
}

@media screen and (max-width: 700px) {
  .mn-panel { padding: 32px 24px; }
}
</style>

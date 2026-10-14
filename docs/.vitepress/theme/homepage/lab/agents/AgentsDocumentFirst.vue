<script setup lang="ts">
import { computed, ref } from "vue";
import HomePageInstallCommand from "../../HomePageInstallCommand.vue";
import AgentsCode from "./AgentsCode.vue";
import AgentsPage from "./AgentsPage.vue";
import AgentsReasons from "./AgentsReasons.vue";
import { diffStats, fileName, request, useAgentDemo } from "./agentsDemo";

/* Concept 5, Document First: the rendered page is the subject, large, with the request bar
   directly above it. The request is visible at rest (it is the product owner's daily sentence),
   so the bar does not type; it switches state when the demo starts. The code beside the page is
   the evidence that the change was small; the four reasons run under both. */

const root = ref<HTMLElement | null>(null);
const demo = useAgentDemo({ root, autoplayDelay: 4000 });

const phase = demo.phase;
const editing = computed(() => ["typing", "proposing", "proposed"].includes(phase.value));
const meta = computed(() => {
  if (["proposing", "proposed"].includes(phase.value)) return "proposed change";
  if (["reviewed", "done"].includes(phase.value)) return "main";
  return "";
});
</script>

<template>
  <section class="content">
    <div ref="root" class="panel df-panel">
      <div class="panel-head">
        <div class="lead">
          <h2 class="card-title">The document is code. Ask for a change and watch it land.</h2>
          <p class="card-description">A request becomes a small diff. You review it, and the PDF follows.</p>
        </div>
        <home-page-install-command />
      </div>

      <div class="df-body">
        <div>
          <div class="request" aria-live="polite">
            <template v-if="phase === 'rest'">
              <i class="fa-regular fa-user request-icon" aria-hidden="true"></i>
              <span class="text">“{{ request }}”</span>
              <span class="spacer"></span>
              <button type="button" class="action small primary" @click="demo.play()">
                <i class="fa-regular fa-play" aria-hidden="true"></i> Play <span class="meta">15 s</span>
              </button>
            </template>

            <template v-else-if="editing">
              <i class="fa-regular fa-circle-notch fa-spin request-icon" aria-hidden="true"></i>
              <span class="text">Agent editing <code>{{ fileName }}</code></span>
              <span class="spacer"></span>
              <template v-if="phase !== 'typing'">
                <span class="chip"><span class="minus">−{{ diffStats.removed }}</span> <span class="plus">+{{ diffStats.added }}</span></span>
                <span class="chip">review next</span>
              </template>
            </template>

            <template v-else>
              <i class="fa-regular fa-circle-check request-icon ok" aria-hidden="true"></i>
              <span class="text">Reviewed by you, rendered again</span>
              <span class="spacer"></span>
              <span class="chip"><span class="minus">−{{ diffStats.removed }}</span> <span class="plus">+{{ diffStats.added }}</span></span>
              <button v-if="phase === 'done'" type="button" class="action small" @click="demo.play()">
                <i class="fa-regular fa-rotate-right" aria-hidden="true"></i> Replay
              </button>
            </template>
          </div>

          <div class="page-wrap">
            <agents-page :after="demo.after.value" :width="340" />
          </div>
        </div>

        <agents-code :lines="demo.lines.value">
          <template #meta>{{ meta }}</template>
        </agents-code>
      </div>

      <agents-reasons class="bottom-reasons" layout="strip" compact short />
    </div>
  </section>
</template>

<style scoped>
.content { padding-bottom: 0; }

.df-panel { padding: 48px; }

.df-body {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: 40px;
  margin-top: 28px;
  align-items: start;
}

/* the bar keeps one height in every state */
.request {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 10px 12px 10px 16px;
  margin-bottom: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--home-surface-inner);
}

.request-icon { font-size: 1rem; color: var(--vp-c-text-3); flex: 0 0 auto; }
.request-icon.ok { color: #4CAF50; }

.request .text {
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.request .text code { font-size: 0.9375rem; }
.spacer { flex: 1 1 auto; }

.page-wrap { display: flex; flex-direction: column; align-items: center; }

.bottom-reasons {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

@media screen and (max-width: 1100px) {
  .df-body { grid-template-columns: minmax(0, 1fr); gap: 32px; }
}

@media screen and (max-width: 700px) {
  .df-panel { padding: 32px 24px; }
  .request { flex-wrap: wrap; }
  .request .text { white-space: normal; }
}
</style>

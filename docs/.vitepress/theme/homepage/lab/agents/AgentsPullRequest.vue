<script setup lang="ts">
import { computed, ref } from "vue";
import HomePageInstallCommand from "../../HomePageInstallCommand.vue";
import AgentsCode from "./AgentsCode.vue";
import AgentsPage from "./AgentsPage.vue";
import AgentsReasons from "./AgentsReasons.vue";
import { diffStats, useAgentDemo } from "./agentsDemo";

/* Concept 1, Pull Request: the request is handled as a pull request. A fixed-height review card
   above the code carries the request as its title; the diff lands in the file, the checks turn
   green one by one, the page re-renders and the card settles as "Merged". Autoplays once, 4 s
   after the panel is in view, or on the button. */

const root = ref<HTMLElement | null>(null);
const demo = useAgentDemo({ root, autoplayDelay: 4000 });

const showStats = computed(() => !["rest", "typing"].includes(demo.phase.value));
const meta = computed(() => {
  if (["proposing", "proposed"].includes(demo.phase.value)) return "proposed change";
  if (["reviewed", "done"].includes(demo.phase.value)) return "main";
  return "";
});
</script>

<template>
  <section class="content">
    <div ref="root" class="panel pr-panel">
      <div class="panel-head">
        <div class="lead">
          <h2 class="card-title">Documents as code, changes as pull requests</h2>
          <p class="card-description">A C# file that renders to a PDF, lives in version control and changes by small reviewed diffs.</p>
        </div>
        <home-page-install-command />
      </div>

      <div class="pr-body">
        <div>
          <div class="review" aria-live="polite">
            <!-- resting: a quiet line and the explicit trigger -->
            <div v-if="demo.phase.value === 'rest'" class="review-row">
              <i class="fa-regular fa-code-branch review-icon" aria-hidden="true"></i>
              <span class="review-hint">A request from the product owner, handled as a pull request.</span>
              <span class="spacer"></span>
              <button type="button" class="action small" @click="demo.play()">
                <i class="fa-regular fa-play" aria-hidden="true"></i> Play the request <span class="meta">15 s</span>
              </button>
            </div>

            <!-- the request is the PR title; the checks go green as the loop progresses -->
            <template v-else>
              <div class="review-row">
                <span v-if="demo.phase.value === 'done'" class="chip merged"><i class="fa-regular fa-check" aria-hidden="true"></i> Merged</span>
                <span class="review-title">
                  {{ demo.promptText.value }}<span v-if="demo.phase.value === 'typing'" class="caret"></span>
                </span>
                <span class="spacer"></span>
                <template v-if="showStats">
                  <span class="chip"><span class="minus">−{{ diffStats.removed }}</span> <span class="plus">+{{ diffStats.added }}</span></span>
                  <span class="chip">1 file</span>
                </template>
                <button v-if="demo.phase.value === 'done'" type="button" class="action small" @click="demo.play()">
                  <i class="fa-regular fa-rotate-right" aria-hidden="true"></i> Replay
                </button>
              </div>

              <div class="review-checks">
                <span class="check" :class="demo.proposed.value ? 'ok' : 'pending'">
                  <i class="fa-regular" :class="demo.proposed.value ? 'fa-circle-check' : (demo.phase.value === 'proposing' ? 'fa-circle-notch fa-spin' : 'fa-circle')" aria-hidden="true"></i>
                  Proposed by your agent
                </span>
                <span class="check" :class="demo.proposed.value ? 'ok' : 'pending'">
                  <i class="fa-regular" :class="demo.proposed.value ? 'fa-circle-check' : 'fa-circle'" aria-hidden="true"></i> Compiles
                </span>
                <span class="check" :class="demo.reviewed.value ? 'ok' : 'pending'">
                  <i class="fa-regular" :class="demo.reviewed.value ? 'fa-circle-check' : 'fa-circle'" aria-hidden="true"></i> Reviewed by you
                </span>
                <span class="check" :class="demo.after.value ? 'ok' : 'pending'">
                  <i class="fa-regular" :class="demo.after.value ? 'fa-circle-check' : 'fa-circle'" aria-hidden="true"></i> Rendered
                </span>
              </div>
            </template>
          </div>

          <agents-code :lines="demo.lines.value">
            <template #meta>{{ meta }}</template>
          </agents-code>
        </div>

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

.pr-panel { padding: 48px; }

.pr-body {
  display: grid;
  grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
  gap: 40px;
  margin-top: 28px;
  align-items: start;
}

/* the review card keeps one height in every state, so the code window never moves */
.review {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80px;
  padding: 14px 18px;
  margin-bottom: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--home-surface-inner);
}

.review-row { display: flex; align-items: center; gap: 12px; min-width: 0; }
.review-icon { color: var(--vp-c-text-3); font-size: 1rem; }
.review-title { font-size: 1rem; line-height: 1.5rem; font-weight: 600; color: var(--vp-c-text-1); }
.review-hint { font-size: 0.9375rem; line-height: 1.375rem; color: var(--vp-c-text-2); }
.review-checks { display: flex; flex-wrap: wrap; gap: 6px 20px; margin-top: 8px; }
.spacer { flex: 1 1 auto; }

.side { display: flex; flex-direction: column; align-items: center; }

.side-reasons {
  width: 100%;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

@media screen and (max-width: 1000px) {
  .pr-body { grid-template-columns: minmax(0, 1fr); gap: 32px; }
}

@media screen and (max-width: 700px) {
  .pr-panel { padding: 32px 24px; }
  .review-row { flex-wrap: wrap; }
}
</style>

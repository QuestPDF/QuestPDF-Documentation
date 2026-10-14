<script setup lang="ts">
import { computed, ref } from "vue";
import HomePageInstallCommand from "../../HomePageInstallCommand.vue";
import HomePageHighlightedCode from "../../HomePageHighlightedCode.vue";
import AgentsWindow from "./AgentsWindow.vue";
import AgentsPage from "./AgentsPage.vue";
import AgentsReasons from "./AgentsReasons.vue";
import { addedLines, baseCode, buildLines, diffStats, fileName, linesToCode, linesTransformer, removedLine, reservedLines, useAgentDemo } from "./agentsDemo";

/* Concept 6, Suggestion: the request is a review comment on the Total line, inside the code
   window, the way a reviewer comments on a pull request. The agent answers in the thread with a
   suggested change (the diff as a suggestion block), "Apply suggestion" is the human's, and the
   thread resolves when the lines are in the file. At rest the thread is a one-line marker under
   the Total line; the code is untouched until the suggestion is applied. */

const root = ref<HTMLElement | null>(null);
const demo = useAgentDemo({ root, autoplayDelay: 4000 });
const phase = demo.phase;

/* the file in two halves around the Total line, so the thread can sit between them */
const splitAt = baseCode.indexOf(removedLine) + 1;

const lines = computed(() => buildLines(demo.reviewed.value ? "accepted" : "plain"));
const upper = computed(() => lines.value.slice(0, demo.reviewed.value ? splitAt + 1 : splitAt));
const lower = computed(() => lines.value.slice(demo.reviewed.value ? splitAt + 1 : splitAt));

const upperCode = computed(() => linesToCode(upper.value));
const lowerCode = computed(() => linesToCode(lower.value));
const upperTransformer = computed(() => linesTransformer(upper.value));
const lowerTransformer = computed(() => linesTransformer(lower.value));

/* the suggestion block shows the lines without the method's indentation */
const indent = removedLine.length - removedLine.trimStart().length;
const dedent = (line: string) => line.slice(indent);

const showSuggestion = computed(() => ["proposing", "proposed"].includes(phase.value));
const reservedHeight = `${reservedLines * 19.5 + 16}px`;
</script>

<template>
  <section class="content">
    <div ref="root" class="panel sg-panel">
      <div class="panel-head">
        <div class="lead">
          <h2 class="card-title">Documents as code, requests as review comments</h2>
          <p class="card-description">A C# file that renders to a PDF. Anyone can comment on a line; your agent suggests the change; you apply it.</p>
        </div>
        <home-page-install-command />
      </div>

      <div class="sg-body">
        <agents-window :file-name="fileName" class="sg-code">
          <template #meta>
            <template v-if="demo.reviewed.value">main</template>
            <button v-else-if="phase === 'rest'" type="button" class="action small" @click="demo.play()">
              <i class="fa-regular fa-play" aria-hidden="true"></i> Play the request <span class="meta">15 s</span>
            </button>
          </template>

          <div class="sg-split">
            <suspense><home-page-highlighted-code :code="upperCode" :code-transformer="upperTransformer" /></suspense>

            <!-- the thread under the Total line -->
            <div class="thread" :class="{ open: phase !== 'rest' && !demo.reviewed.value }" aria-live="polite">
              <button v-if="phase === 'rest'" type="button" class="thread-marker" @click="demo.play()">
                <i class="fa-regular fa-comment" aria-hidden="true"></i> 1 comment from the product owner
              </button>

              <template v-else-if="!demo.reviewed.value">
                <div class="comment">
                  <i class="fa-regular fa-user avatar" aria-hidden="true"></i>
                  <div>
                    <div class="who">Product owner</div>
                    <div class="what">{{ demo.promptText.value }}<span v-if="phase === 'typing'" class="caret"></span></div>
                  </div>
                </div>

                <div v-if="phase !== 'typing'" class="comment">
                  <i class="fa-regular fa-terminal avatar" aria-hidden="true"></i>
                  <div class="reply">
                    <div class="who">Your agent <span class="chip"><span class="minus">−{{ diffStats.removed }}</span> <span class="plus">+{{ diffStats.added }}</span></span></div>
                    <div v-if="!showSuggestion" class="check"><i class="fa-regular fa-circle-notch fa-spin" aria-hidden="true"></i> Reading llms.txt</div>
                    <div v-else class="suggestion">
                      <div class="suggestion-head">Suggested change</div>
                      <pre class="suggestion-code"><span class="line removed">{{ dedent(removedLine) }}</span><span v-for="line of addedLines" :key="line" class="line added">{{ dedent(line) }}</span></pre>
                      <div class="suggestion-foot">
                        <span class="check" :class="demo.proposed.value ? 'ok' : 'pending'">
                          <i class="fa-regular" :class="demo.proposed.value ? 'fa-circle-check' : 'fa-circle-notch fa-spin'" aria-hidden="true"></i> Compiles
                        </span>
                        <span class="spacer"></span>
                        <button type="button" class="action small" :class="{ primary: demo.proposed.value }" :disabled="!demo.proposed.value">
                          Apply suggestion <span class="meta">you</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <div v-else class="resolved">
                <i class="fa-regular fa-circle-check" aria-hidden="true"></i>
                Resolved: suggestion applied by you <span class="chip"><span class="minus">−{{ diffStats.removed }}</span> <span class="plus">+{{ diffStats.added }}</span></span>
                <span class="spacer"></span>
                <button v-if="phase === 'done'" type="button" class="action small" @click="demo.play()">
                  <i class="fa-regular fa-rotate-right" aria-hidden="true"></i> Replay
                </button>
              </div>
            </div>

            <suspense><home-page-highlighted-code :code="lowerCode" :code-transformer="lowerTransformer" /></suspense>
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

.sg-panel { padding: 48px; }

.sg-body {
  display: grid;
  grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
  gap: 40px;
  margin-top: 28px;
  align-items: start;
}

/* the window holds the height of the open thread, so the side column never moves */
.sg-split { min-height: v-bind(reservedHeight); }
.sg-code :deep(.code-source) { font-size: 13px; min-height: 0; padding: 8px 0 0; }
.sg-code :deep(.code-source:last-child) { padding-bottom: 8px; }

/* the thread: a hairline box inside the code, like a review comment under a line */
.thread {
  margin: 4px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-alt);
  font-family: var(--vp-font-family-base);
  overflow: hidden;
}

.thread-marker {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 6px 12px;
  border: 0;
  background: none;
  font: inherit;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  text-align: left;
}

.thread-marker:hover { color: var(--vp-c-text-1); }
.thread-marker:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: -2px; }

.comment {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 10px;
  padding: 10px 14px;
}

.comment + .comment { border-top: 1px solid var(--vp-c-divider); }

.avatar {
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--home-surface-inner);
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
}

.who { display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; font-weight: 600; color: var(--vp-c-text-1); line-height: 1.25rem; }
.what { font-size: 0.9375rem; line-height: 1.375rem; color: var(--vp-c-text-1); }
.reply .check { margin-top: 4px; }

.suggestion { margin-top: 8px; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden; background: var(--vp-c-bg); }
.suggestion-head { padding: 4px 10px; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--vp-c-text-3); border-bottom: 1px solid var(--vp-c-divider); }
.suggestion-code { margin: 0; padding: 4px 0; font-family: var(--vp-font-family-mono); font-size: 12.5px; line-height: 1.5; overflow-x: auto; }
.suggestion-code .line { display: block; padding: 0 10px; white-space: pre; }
.suggestion-code .removed { background-color: #F4433622; border-left: 3px solid #F44336AA; padding-left: 7px; }
.suggestion-code .added { background-color: #4CAF5022; border-left: 3px solid #4CAF50AA; padding-left: 7px; }
.suggestion-foot { display: flex; align-items: center; gap: 12px; padding: 8px 10px; border-top: 1px solid var(--vp-c-divider); }
.suggestion-foot .action[disabled] { opacity: 0.5; cursor: default; transform: none; }
.spacer { flex: 1 1 auto; }

.resolved {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

.resolved i { color: #4CAF50; }

.side { display: flex; flex-direction: column; align-items: center; }

.side-reasons {
  width: 100%;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

@media screen and (max-width: 1000px) {
  .sg-body { grid-template-columns: minmax(0, 1fr); gap: 32px; }
}

@media screen and (max-width: 700px) {
  .sg-panel { padding: 32px 24px; }
  .sg-split { min-height: calc(28 * 15px + 16px); }
}
</style>

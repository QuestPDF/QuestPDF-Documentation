<script setup lang="ts">
import {ref} from "vue";
import quickStartExample from './codeExamples/quickStart.cs?raw';
import HomePageWindowContainer from "./HomePageWindowContainer.vue";
import HomePageHighlightedCode from "./HomePageHighlightedCode.vue";
import {type Round, useAgentSession} from "./agentSession";

/* One surface in three regions, divided by hairlines: two cards stacked on the left and one code
   window on the right, embedded edge to edge and as tall as both cards together. The first card makes
   the case for writing the document in C#. The second card shows how
   an AI assistant fits in. A composer sits at the foot of the window, where a request types itself in; the
   window then shows the assistant's edit as a diff on the same Program.cs. Three rounds, then the session starts
   over (agentSession.ts). While the assistant works, the send button turns into a spinner. */

interface Note {
  icon: string;
  title: string;
  description: string;
}

/* the points as a list: the title bold on its own line, the explanation under it in the quieter colour */
const codeNotes: Note[] = [
  {
    icon: "fa-code",
    title: "Use existing programming knowledge",
    description: "Build dynamic documents with loops, conditions and reusable components, with no template language to learn."
  },
  {
    icon: "fa-lightbulb-on",
    title: "Let your IDE do more",
    description: "Use IntelliSense, type checking, code navigation and refactoring while building your documents."
  },
  {
    icon: "fa-code-pull-request",
    title: "Review every change",
    description: "Keep document layouts alongside your application in Git, with readable diffs, pull requests and version history."
  }
];

const agentNotes: Note[] = [
  {
    icon: "fa-sparkles",
    title: "Describe what you need",
    description: "Ask your coding assistant to build a document from your requirements, data models and reusable components."
  },
  {
    icon: "fa-arrow-right-arrow-left",
    title: "Confidently migrate your existing layouts",
    description: "Use AI to help translate HTML layouts and templates from other systems into editable QuestPDF code."
  },
  {
    icon: "fa-arrows-rotate",
    title: "Improve and extend with AI assistance",
    description: "Adjust layouts, add business rules or extract reusable components through conversation, then review the changes."
  }
];


/* The session: the quick start sample, refined by three requests. The anchors are lines of
   codeExamples/quickStart.cs, matched by text. */

const fileName = "Program.cs";

const rounds: Round[] = [
  {
    prompt: "Highlight important tasks in orange.",
    status: "Reading the documentation at llms.txt",
    insertAfter: "                .Text(task.Title)",
    add: [
      "                .FontColor(task.IsImportant ? Colors.Orange.Darken2 : Colors.Black)"
    ]
  },
  {
    prompt: "Show overdue due dates in red.",
    status: "Editing " + fileName,
    remove: "            row.ConstantItem(50).Text(task.DueDate?.ToString(\"d\") ?? \"No due date\");",
    insertAfter: "            row.ConstantItem(50).Text(task.DueDate?.ToString(\"d\") ?? \"No due date\");",
    add: [
      "            row.ConstantItem(50)",
      "                .Text(task.DueDate?.ToString(\"d\") ?? \"No due date\")",
      "                .FontColor(task.IsOverdue ? Colors.Red.Medium : Colors.Black);"
    ]
  },
  {
    prompt: "Hide completed subtasks.",
    status: "Checking the rendered page",
    remove: "        foreach (var subtask in task.Subtasks)",
    insertAfter: "        foreach (var subtask in task.Subtasks)",
    add: [
      "        foreach (var subtask in task.Subtasks.Where(x => !x.IsDone))"
    ]
  }
];

const root = ref<HTMLElement | null>(null);

const { code, codeTransformer, phase, promptText, promptComplete, sent } = useAgentSession({
  root,
  fileName,
  initialCode: quickStartExample.trimEnd().split("\n"),
  rounds,
  threshold: 0.25
});
</script>

<template>
  <section class="content">
    <div ref="root" class="panel quick-start">
      <!-- the case for code -->
      <article class="quick-start-card code-card">
        <h2 class="card-title">Create and review in C#</h2>

        <ul class="notes" aria-label="Why write documents in C#">
          <li v-for="note of codeNotes" :key="note.title" class="note">
            <i class="fa-regular" :class="note.icon" aria-hidden="true"></i>
            <div>
              <strong>{{ note.title }}</strong>
              <p>{{ note.description }}</p>
            </div>
          </li>
        </ul>

      </article>

      <!-- the AI story -->
      <article class="quick-start-card agent-card">
        <div class="background-gradient" aria-hidden="true"></div>
        <h2 class="card-title">Develop with AI agents</h2>

        <ul class="notes" aria-label="How an AI assistant helps">
          <li v-for="note of agentNotes" :key="note.title" class="note">
            <i class="fa-regular" :class="note.icon" aria-hidden="true"></i>
            <div>
              <strong>{{ note.title }}</strong>
              <p>{{ note.description }}</p>
            </div>
          </li>
        </ul>
      </article>

      <!-- the one code window, embedded edge to edge in the right region, as tall as the two cards together -->
      <div class="stage">
        <home-page-window-container :file-name="fileName">
          <suspense>
            <home-page-highlighted-code :code="code" :code-transformer="codeTransformer" />
          </suspense>

          <!-- the composer at the foot of the window: the request types itself, the send button lights
               up once it is sent and spins while the assistant works -->
          <div class="composer-dock">
            <div class="composer" :class="{ sent, working: phase === 'working' || phase === 'editing' }" aria-live="polite">
              <i class="fa-regular fa-sparkles composer-icon" aria-hidden="true"></i>

              <div class="composer-text">
                <span>{{ promptText }}</span>
                <span v-if="!sent" class="caret" :class="{ steady: !promptComplete && phase === 'typing' }"></span>
              </div>

              <div class="composer-send" aria-hidden="true">
                <i v-if="phase === 'working' || phase === 'editing'" class="spinner"></i>
                <i v-else class="fa-regular fa-arrow-up"></i>
              </div>
            </div>
          </div>
        </home-page-window-container>
      </div>
    </div>
  </section>
</template>

<style scoped>

/* Layout: one panel, two rows, the cards in the first column, the window spanning both rows in the
   second, all divided by hairlines. The window takes 7/12 of the width so the code has room; the rows
   are as tall as the cards, and the window stretches to them (or, if the code is taller, the cards
   stretch to the window and pin their foot to the bottom). */

.content {
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
}

.custom-page.home-page .panel.quick-start {
  --agent-accent: #7E57C2;
  --tile-blue: #01579B;
  --tile-purple: #5E35B1;
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  grid-template-rows: auto auto;
  gap: 0;
  width: 100%;
  padding: 0;
  overflow: hidden; /* the embedded window follows the panel's corners */
}

html.dark .custom-page.home-page .panel.quick-start {
  --agent-accent: #9575CD;
  --tile-blue: #29B6F6;
  --tile-purple: #B388FF;
}

/* a region of the panel: the card's inset, the notes and the foot spanning its width */
.quick-start-card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 0;
  padding: 40px;
}

.code-card {
  grid-column: 1;
  grid-row: 1;
}

.agent-card {
  grid-column: 1;
  grid-row: 2;
  position: relative;
  isolation: isolate; /* keeps the glow (z-index: -1) above the panel background but below the content */
  border-top: 1px solid var(--vp-c-divider);
}

/* the AI card's halo: a faint purple glow from the left edge, centred behind the heading, the same
   device as the agents card in the trust section; no rays, to keep it quiet */
.agent-card .background-gradient {
  --accent-secondary: #AB47BC;
  --glow-y: 64px;
  position: absolute;
  pointer-events: none;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background-image:
      radial-gradient(ellipse 90% 55% at 0% var(--glow-y), color-mix(in srgb, var(--agent-accent) 10%, transparent), transparent),
      radial-gradient(ellipse 50% 30% at 0% var(--glow-y), color-mix(in srgb, var(--accent-secondary) 4%, transparent), transparent);
}

.stage {
  grid-column: 2;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-left: 1px solid var(--vp-c-divider);
}

/* the window loses its own frame: the panel's hairlines and corners are its edges, and it fills
   the stage, the code growing into the room above the composer */
.stage :deep(.file-container) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: auto;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.stage :deep(.file-container-header) {
  padding: 10px 24px;
}

/* in light mode the header bar is white like the code below it, so the window reads as one plain
   surface; dark mode keeps the slightly raised bar */
html:not(.dark) .stage :deep(.file-container-header) {
  background-color: var(--vp-c-bg);
}

.stage :deep(.file-content) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.stage :deep(.code-source) {
  flex-grow: 1;
  padding: 12px 8px; /* with the 16px of each line, the code starts at 24px, in line with the header and the composer */
  font-size: 13px;
}

.composer-dock {
  padding: 16px 24px 24px;
}


/* Cards: the title, then the notes */

/* the points as a list: bold titles in the text colour on their own line, explanations under them */
.notes {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.notes strong {
  display: block;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.notes p {
  margin: 2px 0 0;
}

/* an icon in front of each item on an inset tile, the same plain inner surface as the companion
   card's tiles, level with the top of the item's title */
.note {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.note i {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
  font-size: 20px;
  color: var(--vp-c-text-1);
}

.agent-card .note i {
  color: var(--tile-purple);
}

/* in light mode the AI card's icon tiles carry a purple tint, so the icons sit on their own
   coloured surface rather than the plain grey of the C# card's tiles */
html:not(.dark) .agent-card .note i {
  background-color: #F0E6FF;
}


/* Composer: a chat input on the inner surface with a faint purple tint, a sparkle at the start,
   the send button a purple circle once the request is sent */

.composer {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 10px 10px 16px;
  border: 1px solid color-mix(in srgb, var(--agent-accent) 22%, var(--vp-c-divider));
  border-radius: 14px;
  background-color: color-mix(in srgb, var(--agent-accent) 12%, var(--home-surface-inner));
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.composer.sent {
  border-color: color-mix(in srgb, var(--agent-accent) 50%, transparent);
}

/* in light mode the tinted fill and border are too heavy against the white window, so the composer
   is a white field with a quiet border; the purple stays on the sparkle, the caret and the send button */
html:not(.dark) .composer {
  border-color: color-mix(in srgb, var(--agent-accent) 12%, var(--vp-c-divider));
  background-color: var(--vp-c-bg);
}

html:not(.dark) .composer.sent {
  border-color: color-mix(in srgb, var(--agent-accent) 30%, var(--vp-c-divider));
}

html:not(.dark) .composer-text {
  color: var(--vp-c-text-1);
}

.composer > * {
  position: relative;
  z-index: 1;
}

/* while the assistant works, a soft band of purple, magenta and blue sweeps slowly across the
   composer from left to right, fading in and out with the state */
.composer::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: linear-gradient(100deg,
      transparent 20%,
      color-mix(in srgb, var(--agent-accent) 9%, transparent) 50%,
      transparent 80%);
  background-size: 250% 100%;
  background-position: 120% 0;
  opacity: 0;
  transition: opacity 1.2s ease;
  /* the sweep runs all the time (invisible at opacity 0) so that only the
     opacity changes with the state: removing the animation on exit would snap
     the band back to its start position and cut the fade-out short */
  animation: sweep 3.2s linear infinite;
}

.composer.working::before {
  opacity: 1;
}

@keyframes sweep {
  from { background-position: 120% 0; }
  to { background-position: -120% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .composer::before {
    animation: none;
    background-position: 50% 0;
  }
}

.composer-icon {
  flex: 0 0 auto;
  font-size: 1rem;
  color: var(--agent-accent);
}

.composer-text {
  flex: 1 1 auto;
  min-height: 1.375rem;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: color-mix(in srgb, var(--agent-accent) 35%, var(--vp-c-text-1)); /* a trace of purple */
}

.caret {
  display: inline-block;
  width: 2px;
  height: 1.0625rem;
  margin-left: 1px;
  vertical-align: -0.1875rem;
  background-color: var(--agent-accent);
  animation: blink 1s step-end infinite;
}

/* while characters arrive the caret stays lit, like a real editor */
.caret.steady {
  animation: none;
}

@keyframes blink {
  50% { opacity: 0; }
}

.composer-send {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: color-mix(in srgb, var(--agent-accent) 14%, transparent);
  color: var(--agent-accent);
  font-size: 0.875rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.composer.sent .composer-send {
  background-color: var(--agent-accent);
  color: white;
}

/* while the assistant works, a ring spins in place of the arrow */
.spinner {
  display: block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    border-color: white;
  }
}


/* Below this width the window no longer fits beside the cards: the two cards sit side by side
   and the window goes under them, full width */
@media screen and (max-width: 1180px) {
  .custom-page.home-page .panel.quick-start {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: auto auto;
  }

  .code-card {
    grid-column: 1;
    grid-row: 1;
  }

  .agent-card {
    grid-column: 2;
    grid-row: 1;
    border-top: none;
    border-left: 1px solid var(--vp-c-divider);
  }

  .stage {
    grid-column: 1 / -1;
    grid-row: 2;
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }

  .stage :deep(.file-container) {
    flex-grow: 0;
  }

  .stage :deep(.file-content) {
    flex-grow: 0;
  }

}

/* phones: everything in one column, the window last */
@media screen and (max-width: 760px) {
  .custom-page.home-page .panel.quick-start {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto auto;
  }

  .quick-start-card {
    padding: 32px 24px;
  }

  .code-card {
    grid-column: 1;
    grid-row: 1;
  }

  .agent-card {
    grid-column: 1;
    grid-row: 2;
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }

  .stage {
    grid-column: 1;
    grid-row: 3;
  }

  .stage :deep(.file-container-header) {
    padding: 10px 16px;
  }

  .composer-dock {
    padding: 12px 16px 16px;
  }
}

</style>

<script setup lang="ts">
import {computed, ref} from "vue";
import {type Line, useAgentSession} from "./agentSession";
import {data as session} from "./quickStart.data";

/* One panel in three regions divided by hairlines: two cards on the left (why C#, and how an AI assistant
   fits in) and a code window on the right, as tall as both. A request types itself into the window's
   composer, and the window shows the assistant's edit as a diff (agentSession.ts plays the session). */

interface Card {
  kind: "code-card" | "agent-card";
  title: string;
  label: string;
  notes: {
    icon: string;
    title: string;
    description: string;
  }[];
}

const cards: Card[] = [
  {
    kind: "code-card",
    title: "Create and review in C#",
    label: "Why write documents in C#",
    notes: [
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
    ]
  },
  {
    kind: "agent-card",
    title: "Develop with AI agents",
    label: "How an AI assistant helps",
    notes: [
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
    ]
  }
];

const root = ref<HTMLElement | null>(null);
const { lines, promptText, typing, sent, working } = useAgentSession(root, session.code, session.rounds);

/* the window's markup, as Shiki writes it, from the tokens highlighted at build time (quickStart.data.ts); a
   line being typed shows only its first characters */
const codeHtml = computed(() => lines.value.map(lineHtml).join("\n"));

function lineHtml({ text, kind, typed = Infinity }: Line) {
  let html = "";

  for (const { content, style } of session.tokens[text]) {
    if (typed <= 0)
      break;

    html += `<span style="${style}">${content.slice(0, typed).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</span>`;
    typed -= content.length;
  }

  return `<span class="line${kind === "normal" ? "" : ` line-${kind}`}">${html}</span>`;
}
</script>

<template>
  <div ref="root" class="panel quick-start">
    <article v-for="card of cards" :key="card.kind" class="quick-start-card" :class="card.kind">
      <h2 class="card-title">{{ card.title }}</h2>

      <ul class="notes" :aria-label="card.label">
        <li v-for="note of card.notes" :key="note.title" class="note">
          <i class="fa-regular" :class="note.icon" aria-hidden="true"></i>
          <div>
            <strong>{{ note.title }}</strong>
            <p>{{ note.description }}</p>
          </div>
        </li>
      </ul>
    </article>

    <!-- the code window, edge to edge in the right region -->
    <div class="window">
      <div class="window-header">
        <span class="dot red" />
        <span class="dot yellow" />
        <span class="dot green" />
        <span class="file-name">Program.cs</span>
      </div>

      <div class="code-source">
        <pre class="shiki" tabindex="0"><code v-html="codeHtml"></code></pre>
      </div>

      <!-- the request types itself; the send button lights up once sent and spins while the assistant works -->
      <div class="composer" :class="{ sent, working }" aria-live="polite">
        <i class="fa-regular fa-sparkles composer-icon" aria-hidden="true"></i>

        <div class="composer-text">
          <span>{{ promptText }}</span>
          <span v-if="!sent" class="caret" :class="{ steady: typing }"></span>
        </div>

        <div class="composer-send" aria-hidden="true">
          <i v-if="working" class="spinner"></i>
          <i v-else class="fa-regular fa-arrow-up"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

/* the cards in the first column, the window across both rows of the second (6/11 of the width, room for the
   code); the tokens are the AI card's purple, for its icon tiles and the composer */
.quick-start {
  --agent-accent: #7E57C2;
  --tile-purple: #5E35B1;
  --tile-purple-bg: #F0E6FF;
  --composer-bg: color-mix(in srgb, var(--agent-accent) 8%, var(--vp-c-bg));
  --composer-border: color-mix(in srgb, var(--agent-accent) 18%, var(--vp-c-divider));
  --composer-border-sent: color-mix(in srgb, var(--agent-accent) 35%, var(--vp-c-divider));
  --composer-text: color-mix(in srgb, var(--agent-accent) 30%, var(--vp-c-text-1));

  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  grid-template-areas:
      "code window"
      "agent window";
  padding: 0;
  overflow: hidden; /* the embedded window follows the panel's corners */
}

html.dark .quick-start {
  --agent-accent: #9575CD;
  --tile-purple: #B388FF;
  --tile-purple-bg: var(--surface-inner);
  --composer-bg: color-mix(in srgb, var(--agent-accent) 12%, var(--surface-inner));
  --composer-border: color-mix(in srgb, var(--agent-accent) 22%, var(--vp-c-divider));
  --composer-border-sent: color-mix(in srgb, var(--agent-accent) 50%, transparent);
  --composer-text: color-mix(in srgb, var(--agent-accent) 35%, var(--vp-c-text-1));
}

.quick-start-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 40px;
}

.code-card {
  grid-area: code;
}

/* a faint purple glow from the left edge, behind the heading */
.agent-card {
  grid-area: agent;
  border-top: 1px solid var(--vp-c-divider);
  background-image:
      radial-gradient(ellipse 90% 55% at 0% 64px, color-mix(in srgb, var(--agent-accent) 10%, transparent), transparent),
      radial-gradient(ellipse 50% 30% at 0% 64px, color-mix(in srgb, #AB47BC 4%, transparent), transparent);
}


.notes {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin: 28px 0 0;
}

.notes strong {
  display: block;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.notes p {
  margin: 2px 0 0;
}

/* each point's icon on an inset tile, level with the top of its title */
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
  background-color: var(--surface-inner);
  font-size: 20px;
  color: var(--vp-c-text-1);
}

.agent-card .note i {
  color: var(--tile-purple);
  background-color: var(--tile-purple-bg);
}


/* The window has no frame of its own: the panel's hairlines and corners are its edges. In light mode its
   header is as white as the code; dark mode keeps a raised bar. */

.window {
  grid-area: window;
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-left: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.window-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 24px;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: light-dark(transparent, var(--vp-c-bg-alt));
}

.file-name {
  padding-left: 6px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

/* the three window buttons are grey until the window is pointed at */
.dot {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #8883;
  transition: all 100ms ease-in-out;
}

.window:hover .dot.red {
  background-color: #F44336CC;
}

.window:hover .dot.yellow {
  background-color: #FFC107CC;
}

.window:hover .dot.green {
  background-color: #4CAF50CC;
}

.code-source {
  flex-grow: 1;
  padding: 12px 8px; /* with the 16px of each line, the code starts at 24px, in line with the header and the composer */
  overflow: hidden;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* long lines scroll sideways */
.code-source pre {
  overflow-x: auto;
  overflow-y: hidden;
}

.code-source :deep(.line) {
  display: inline-block;
  min-width: 100%;
  padding: 0 16px;
}

/* a diff line: a tint and a bar along its left edge, inside the line's padding */
.code-source :deep(.line-removed) {
  background-color: #F4433622;
  box-shadow: inset 3px 0 0 #F44336AA;
}

.code-source :deep(.line-added) {
  background-color: #4CAF5022;
  box-shadow: inset 3px 0 0 #4CAF50AA;
}


/* Composer */

.composer {
  position: relative;
  isolation: isolate; /* keeps the band (z-index: -1) above the composer's background but below its content */
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 24px 24px;
  padding: 10px 10px 10px 16px;
  border: 1px solid var(--composer-border);
  border-radius: 14px;
  background-color: var(--composer-bg);
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.composer.sent {
  border-color: var(--composer-border-sent);
}

/* while the assistant works, a soft purple band sweeps across the composer */
.composer::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: linear-gradient(100deg,
      transparent 20%,
      color-mix(in srgb, var(--agent-accent) 9%, transparent) 50%,
      transparent 80%);
  background-size: 250% 100%;
  background-position: 120% 0;
  opacity: 0;
  transition: opacity 1.2s ease;
  /* the sweep always runs, invisible at opacity 0, so only the opacity follows the state: stopping it would
     snap the band back and cut the fade-out short */
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
  color: var(--composer-text);
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


/* below 1180px the window goes under the cards, which sit side by side */
@media screen and (max-width: 1180px) {
  .quick-start {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
        "code agent"
        "window window";
  }

  .agent-card {
    border-top: none;
    border-left: 1px solid var(--vp-c-divider);
  }

  .window {
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }
}

/* phones: everything in one column, the window last */
@media screen and (max-width: 760px) {
  .quick-start {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
        "code"
        "agent"
        "window";
  }

  .quick-start-card {
    padding: 32px 24px;
  }

  .agent-card {
    border-left: none;
    border-top: 1px solid var(--vp-c-divider);
  }

  .window-header {
    padding: 10px 16px;
  }

  .code-source {
    line-height: 1.25;
  }

  .composer {
    margin: 12px 16px 16px;
  }
}

</style>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import {ShikiTransformer} from "@shikijs/types";
import HomePageCodeContainer from "./HomePageCodeContainer.vue";

/* A looped simulation of a session with a coding agent, three rounds on the same piece of code: a
   prompt types itself into a composer and is sent, a status line reports what the agent is doing, and
   the code window below shows the edit as a diff, the old line in red and the replacement typed in
   green. When the next prompt starts, the previous diff is accepted into the code. After the third
   round the session resets. The loop plays while the block is in view and pauses off-screen; under
   prefers-reduced-motion the finished session is shown still. */


/* The session: one table row, refined by three requests */

const fileName = "InvoiceTable.cs";

const initialCode = [
  "column.Item().Row(row =>",
  "{",
  "  row.RelativeItem().Text(item.Name);",
  "  row.ConstantItem(80).Text(item.Price);",
  "});"
];

interface Round {
  prompt: string;
  status: string;
  remove?: string;      /* the line the edit replaces, marked red and kept in place */
  insertAfter: string;  /* the line the added block goes under (the removed line, when there is one) */
  add: string[];
}

const rounds : Round[] = [
  {
    prompt: "Right-align the prices and format them as currency.",
    status: "Reading the documentation at llms.txt",
    remove: "  row.ConstantItem(80).Text(item.Price);",
    insertAfter: "  row.ConstantItem(80).Text(item.Price);",
    add: [
      "  row.ConstantItem(80)",
      "    .AlignRight()",
      "    .Text($\"{item.Price:C}\");"
    ]
  },
  {
    prompt: "Show negative amounts in red.",
    status: "Editing " + fileName,
    remove: "    .Text($\"{item.Price:C}\");",
    insertAfter: "    .Text($\"{item.Price:C}\");",
    add: [
      "    .Text($\"{item.Price:C}\")",
      "    .FontColor(item.Price < 0 ? Colors.Red.Medium : Colors.Black);"
    ]
  },
  {
    prompt: "Add a quantity column between the name and the price.",
    status: "Checking the rendered page",
    insertAfter: "  row.RelativeItem().Text(item.Name);",
    add: [
      "  row.ConstantItem(50).AlignRight().Text(item.Quantity);"
    ]
  }
];


/* State: the code as lines that remember whether they are part of the current diff */

type LineKind = "normal" | "removed" | "added";

interface Line {
  text: string;
  kind: LineKind;
}

type Phase = "idle" | "typing" | "working" | "editing" | "done";

const lines = ref<Line[]>(initialCode.map(text => ({ text, kind: "normal" })));
const phase = ref<Phase>("idle");
const roundIndex = ref(0);
const promptTyped = ref(0);

const round = computed(() => rounds[roundIndex.value]);
const promptText = computed(() => round.value.prompt.slice(0, promptTyped.value));
const promptComplete = computed(() => promptTyped.value >= round.value.prompt.length);
const sent = computed(() => phase.value !== "idle" && phase.value !== "typing");

const code = computed(() => lines.value.map(line => line.text).join("\n"));

/* shiki line numbers are 1-based and follow the lines array one to one */
const codeTransformer = computed<ShikiTransformer>(() => {
  const kinds = lines.value.map(line => line.kind);

  return {
    line(node, line) {
      const kind = kinds[line - 1];

      if (kind === "removed")
        this.addClassToHast(node, "line-removed");
      else if (kind === "added")
        this.addClassToHast(node, "line-added");
    }
  };
});

function count(n: number, noun: string) {
  return `${n} ${noun}${n === 1 ? "" : "s"}`;
}

const status = computed(() => {
  switch (phase.value) {
    case "working":
      return { icon: "fa-circle-notch fa-spin", text: round.value.status };
    case "editing":
      return { icon: "fa-circle-notch fa-spin", text: "Editing " + fileName };
    case "done": {
      const removed = round.value.remove ? 1 : 0;
      const added = round.value.add.length;
      const parts = [removed ? count(removed, "line") + " removed" : "", count(added, "line") + " added"].filter(Boolean);
      return { icon: "fa-circle-check", text: "Done: " + parts.join(", ") };
    }
    default:
      return null;
  }
});


/* Edits on the lines */

function acceptDiff() {
  lines.value = lines.value
      .filter(line => line.kind !== "removed")
      .map(line => ({ text: line.text, kind: "normal" as LineKind }));
}

function markRemoved(text: string) {
  const line = lines.value.find(line => line.text === text && line.kind === "normal");
  if (line) line.kind = "removed";
}

function insertionIndex(after: string) {
  const index = lines.value.findIndex(line => line.text === after);
  return index + 1;
}

function applyRound(r: Round) {
  if (r.remove) markRemoved(r.remove);
  const at = insertionIndex(r.insertAfter);
  lines.value.splice(at, 0, ...r.add.map(text => ({ text, kind: "added" as LineKind })));
}


/* Animation engine: one async loop, paused while the block is off-screen, stopped on unmount */

const root = ref<HTMLElement | null>(null);
let running = false;
let visible = false;
let alive = true;
let observer: IntersectionObserver | undefined;

const promptSpeed = 28;
const codeSpeed = 16;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitWhileHidden() {
  while (alive && !visible)
    await sleep(250);
}

async function pause(ms: number) {
  await waitWhileHidden();
  await sleep(ms);
}

function resetSession() {
  lines.value = initialCode.map(text => ({ text, kind: "normal" }));
  roundIndex.value = 0;
  promptTyped.value = 0;
  phase.value = "idle";
}

function showFinishedSession() {
  resetSession();
  for (const r of rounds) {
    applyRound(r);
    acceptDiff();
  }
  roundIndex.value = rounds.length - 1;
  promptTyped.value = round.value.prompt.length;
  phase.value = "done";
}

/* types the added block line by line, character by character, under the insertion line */
async function typeAddedLines(r: Round) {
  let at = insertionIndex(r.insertAfter);

  for (const text of r.add) {
    lines.value.splice(at, 0, { text: "", kind: "added" });
    const line = lines.value[at]; /* the reactive proxy, so each character re-renders the window */

    for (const character of text) {
      line.text += character;
      await pause(codeSpeed);
    }

    at++;
  }
}

async function playRound(index: number) {
  roundIndex.value = index;
  promptTyped.value = 0;
  phase.value = "idle";
  await pause(index === 0 ? 900 : 1200);

  phase.value = "typing";
  while (promptTyped.value < round.value.prompt.length) {
    promptTyped.value++;
    await pause(promptSpeed);
  }

  await pause(700);
  phase.value = "working";
  await pause(1400);

  phase.value = "editing";
  if (round.value.remove) {
    markRemoved(round.value.remove);
    await pause(900);
  }
  else {
    await pause(500);
  }

  await typeAddedLines(round.value);

  await pause(400);
  phase.value = "done";
  await pause(index === rounds.length - 1 ? 6000 : 3500);

  /* the next prompt starts on accepted code; after the last round the session starts over */
  if (index === rounds.length - 1)
    resetSession();
  else
    acceptDiff();
}

async function loop() {
  running = true;

  while (alive) {
    for (let index = 0; index < rounds.length && alive; index++)
      await playRound(index);
  }
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

onMounted(() => {
  if (reducedMotion() || !("IntersectionObserver" in window) || !root.value) {
    showFinishedSession();
    return;
  }

  observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);

    if (visible && !running)
      loop();
  }, { threshold: 0.4 });

  observer.observe(root.value);
});

onUnmounted(() => {
  alive = false;
  observer?.disconnect();
});

</script>

<template>
  <div ref="root" class="agent-demo">
    <!-- the composer: the request types itself, the send button lights up once it is sent -->
    <div class="composer" :class="{ sent }">
      <i class="fa-regular fa-sparkles composer-icon" aria-hidden="true"></i>

      <div class="composer-text">
        <span>{{ promptText }}</span>
        <span v-if="!sent" class="caret" :class="{ steady: !promptComplete && phase === 'typing' }"></span>
      </div>

      <div class="composer-send" aria-hidden="true">
        <i class="fa-regular fa-arrow-up"></i>
      </div>
    </div>

    <!-- what the agent is doing, and which of the three rounds this is -->
    <div class="status" :class="{ visible: status, done: phase === 'done' }">
      <i v-if="status" class="fa-regular" :class="[status.icon]"></i>
      <span v-if="status">{{ status.text }}</span>
      <span class="status-round">{{ roundIndex + 1 }} / {{ rounds.length }}</span>
    </div>

    <home-page-code-container :file-name="fileName" :code="code" :code-transformer="codeTransformer" />
  </div>
</template>

<style scoped>

/* The AI accent: a soft purple, kept to the composer, the caret, the send button and the spinner;
   the diff keeps its red and green. A lighter tint in dark mode for contrast on the dark surface */

.agent-demo {
  --agent-accent: #7E57C2;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 28px;
}

html.dark .agent-demo {
  --agent-accent: #9575CD;
}

/* the code window takes the card's spare height, like an editor with room under the code, so the
   card ends level with the stack beside it whatever the round is showing */
.agent-demo :deep(.file-container) {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: auto;
}

.agent-demo :deep(.file-content) {
  flex-grow: 1;
}

.agent-demo :deep(.code-source) {
  font-size: 13px;
}


/* Composer: a chat input on the inner surface with a faint purple tint, a sparkle at the start,
   the send button a purple circle once the request is sent */

.composer {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 14px 14px 14px 16px;
  border: 1px solid color-mix(in srgb, var(--agent-accent) 22%, var(--vp-c-divider));
  border-radius: 14px;
  background-color: color-mix(in srgb, var(--agent-accent) 5%, var(--home-surface-inner));
  transition: border-color 0.3s ease;
}

.composer.sent {
  border-color: color-mix(in srgb, var(--agent-accent) 50%, transparent);
}

.composer-icon {
  flex: 0 0 auto;
  align-self: flex-start;
  margin-top: 3px;
  font-size: 1rem;
  color: var(--agent-accent);
}

.composer-text {
  flex: 1 1 auto;
  min-height: 2.75rem;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-1);
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
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.composer.sent .composer-send {
  background-color: var(--agent-accent);
  color: white;
}


/* Status: one quiet line between the composer and the code, kept at a fixed height so the
   window below does not jump when the text appears */

.status {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 1.375rem;
  margin: 12px 0 12px 4px;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.status.visible {
  opacity: 1;
}

.status i {
  width: 16px;
  font-size: 0.9375rem;
  color: var(--agent-accent);
  text-align: center;
}

.status.done i {
  color: #4CAF50;
}

.status-round {
  margin-left: auto;
  padding-right: 4px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-3);
}

</style>

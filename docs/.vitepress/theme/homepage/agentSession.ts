import {computed, onMounted, onUnmounted, ref, type Ref} from "vue";
import type {Round} from "./quickStart.data";

/* A looped simulation of a session with a coding agent: a prompt types itself into a composer and is
   sent, the agent works for a moment, and the code window shows the edit as a diff, the replaced line
   in red and the new lines typed in green. When the next prompt starts, the previous diff is accepted
   into the code. After the last round the session resets. The loop plays while the root is in view and
   pauses off-screen; under prefers-reduced-motion the finished session is shown still. */

export interface Line {
  text: string;
  kind: "normal" | "removed" | "added";
  /* how many characters of a line being typed are in (unset: all of them) */
  typed?: number;
}

type Phase = "idle" | "typing" | "working" | "editing" | "done";

const promptSpeed = 28;
const codeSpeed = 16;

/* thrown out of a pause once the component is gone, which ends the loop */
const unmounted = Symbol("unmounted");

export function useAgentSession(root: Ref<HTMLElement | null>, initialCode: string[], rounds: Round[]) {
  const lines = ref<Line[]>([]);
  const phase = ref<Phase>("idle");
  const roundIndex = ref(0);
  const promptTyped = ref(0);

  const round = computed(() => rounds[roundIndex.value]);
  const promptText = computed(() => round.value.prompt.slice(0, promptTyped.value));

  /* the caret stays lit while characters arrive, like a real editor */
  const typing = computed(() => phase.value === "typing" && promptTyped.value < round.value.prompt.length);
  const sent = computed(() => phase.value !== "idle" && phase.value !== "typing");
  const working = computed(() => phase.value === "working" || phase.value === "editing");


  /* Edits on the lines */

  function resetSession() {
    lines.value = initialCode.map(text => ({ text, kind: "normal" }));
    roundIndex.value = 0;
    promptTyped.value = 0;
    phase.value = "idle";
  }

  function acceptDiff() {
    lines.value = lines.value
        .filter(line => line.kind !== "removed")
        .map(line => ({ text: line.text, kind: "normal" }));
  }

  function markReplaced(r: Round) {
    const line = lines.value.find(line => line.text === r.after && line.kind === "normal");
    if (line) line.kind = "removed";
  }

  function insertionIndex(r: Round) {
    const index = lines.value.findIndex(line => line.text === r.after);
    return index < 0 ? lines.value.length : index + 1;
  }

  function showFinishedSession() {
    resetSession();

    for (const r of rounds) {
      if (r.replace) markReplaced(r);
      lines.value.splice(insertionIndex(r), 0, ...r.add.map(text => ({ text, kind: "added" as const })));
      acceptDiff();
    }

    roundIndex.value = rounds.length - 1;
    promptTyped.value = round.value.prompt.length;
    phase.value = "done";
  }


  /* Animation engine: one async loop, paused while the root is off-screen, stopped on unmount */

  let running = false;
  let visible = false;
  let alive = true;
  let observer: IntersectionObserver | undefined;

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function pause(ms: number) {
    while (alive && !visible)
      await sleep(250);

    await sleep(ms);

    if (!alive)
      throw unmounted;
  }

  /* types the added block line by line, character by character, under the insertion line */
  async function typeAddedLines(r: Round) {
    let at = insertionIndex(r);

    for (const text of r.add) {
      lines.value.splice(at, 0, { text, kind: "added", typed: 0 });
      const line = lines.value[at]; /* the reactive proxy, so each character re-renders the window */

      while (line.typed! < text.length) {
        line.typed!++;
        await pause(codeSpeed);
      }

      at++;
    }
  }

  async function playRound(index: number) {
    roundIndex.value = index;
    promptTyped.value = 0;
    phase.value = "idle";
    await pause(index === 0 ? 1500 : 1200);

    phase.value = "typing";
    while (promptTyped.value < round.value.prompt.length) {
      promptTyped.value++;
      await pause(promptSpeed);
    }

    await pause(700);
    phase.value = "working";
    await pause(1400);

    phase.value = "editing";
    if (round.value.replace)
      markReplaced(round.value);
    await pause(round.value.replace ? 900 : 500);

    await typeAddedLines(round.value);

    await pause(400);
    phase.value = "done";

    const last = index === rounds.length - 1;
    await pause(last ? 6000 : 3500);

    /* the next prompt starts on accepted code; after the last round the session starts over */
    if (last)
      resetSession();
    else
      acceptDiff();
  }

  async function loop() {
    running = true;

    try {
      while (alive) {
        for (let index = 0; index < rounds.length; index++)
          await playRound(index);
      }
    }
    catch (error) {
      if (error !== unmounted)
        throw error;
    }
  }

  resetSession();

  onMounted(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showFinishedSession();
      return;
    }

    observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);

      if (visible && !running)
        void loop();
    }, { threshold: 0.25 });

    observer.observe(root.value!);
  });

  onUnmounted(() => {
    alive = false;
    observer?.disconnect();
  });

  return { lines, promptText, typing, sent, working };
}

import {computed, onMounted, onUnmounted, ref, type Ref} from "vue";
import type {ShikiTransformer} from "@shikijs/types";

/* A looped simulation of a session with a coding agent: a prompt types itself into a composer and is
   sent, a status line reports what the agent is doing, and the code window shows the edit as a diff,
   the removed line in red and the replacement typed in green. When the next prompt starts, the previous
   diff is accepted into the code. After the last round the session resets. The loop plays while the
   root is in view and pauses off-screen; under prefers-reduced-motion the finished session is shown
   still. The quick start section drives it with the Program.cs sample. */

export interface Round {
  prompt: string;
  status: string;
  remove?: string;      /* the line the edit replaces, marked red and kept in place */
  insertAfter: string;  /* the line the added block goes under (the removed line, when there is one) */
  add: string[];
}

export type LineKind = "normal" | "removed" | "added";

export interface Line {
  text: string;
  kind: LineKind;
}

export type Phase = "idle" | "typing" | "working" | "editing" | "done";

export interface SessionOptions {
  root: Ref<HTMLElement | null>;
  fileName: string;
  initialCode: string[];
  rounds: Round[];
  /* how much of the root has to be in view for the loop to run */
  threshold?: number;
}

export const promptSpeed = 28;
export const codeSpeed = 16;

function count(n: number, noun: string) {
  return `${n} ${noun}${n === 1 ? "" : "s"}`;
}

export function useAgentSession(options: SessionOptions) {
  const { fileName, initialCode, rounds } = options;

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
    return index < 0 ? lines.value.length : index + 1;
  }

  function applyRound(r: Round) {
    if (r.remove) markRemoved(r.remove);
    const at = insertionIndex(r.insertAfter);
    lines.value.splice(at, 0, ...r.add.map(text => ({ text, kind: "added" as LineKind })));
  }


  /* Animation engine: one async loop, paused while the root is off-screen, stopped on unmount */

  let running = false;
  let visible = false;
  let alive = true;
  let observer: IntersectionObserver | undefined;

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
    await pause(index === 0 ? 1500 : 1200);

    phase.value = "typing";
    while (promptTyped.value < round.value.prompt.length && alive) {
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
    if (reducedMotion() || !("IntersectionObserver" in window) || !options.root.value) {
      showFinishedSession();
      return;
    }

    observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);

      if (visible && !running)
        loop();
    }, { threshold: options.threshold ?? 0.4 });

    observer.observe(options.root.value);
  });

  onUnmounted(() => {
    alive = false;
    observer?.disconnect();
  });

  return {
    lines, code, codeTransformer,
    phase, status,
    roundIndex, roundCount: rounds.length,
    promptText, promptComplete, sent
  };
}

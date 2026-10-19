import {computed, onMounted, onUnmounted, ref, type Ref} from "vue";
import type {Edit, QuickStartSession, Round} from "./sessionBuilder";
import {foldLines} from "./codeFolding";

/* A simulated session with a coding agent that plays by itself while the window is mostly on screen: a request
   types itself into a composer and sends itself a moment later; the agent then edits the files, which the window
   shows as a diff, the replaced lines in red and the new lines typed in green (a file the agent creates comes to
   the front and types in untinted). Room for the new lines opens in one move before they type in, and replaced
   lines close the same way when the diff is taken in, so the code never jumps line by line. A moment after a
   request is sent, the page zooms in on the part it changes (unless it shows it already), the agent edits, and once
   the edit is done the page shows its result; after a hold the diff is taken into the code, and the code stays a
   while before the next request types itself in, the page still zoomed. After the last request the page draws back
   to its overview and stays a while, then the session fades out and starts over. A file longer than the window
   scrolls as an editor does. Every pause stops while the window is less than mostly on screen or the tab is hidden,
   and goes on from where it was; under prefers-reduced-motion the finished session is shown still. */

export interface Line {
  text: string;
  kind: "normal" | "removed" | "added";
  /* how many characters of a line being typed are in (unset: all of them) */
  typed?: number;
  /* the line's height is opening or closing (only while nothing else re-renders the code) */
  state?: "opening" | "closing";
}

export interface OpenFile {
  name: string;
  lines: Line[];
}

type Phase = "idle" | "working" | "editing" | "built" | "done";

const tick = 16;

/* the session's timing, in ms: slow enough to read each request, follow the diff and look at the page */
const timing = {
  /* from the window coming into view to the first request typing in */
  start: 800,
  /* the composer empties and is clicked into (HomePageQuickStart.vue) before the next request types in */
  beforeTyping: 750,
  /* the typed request stays in the composer this long before it sends itself */
  beforeSend: 1400,
  /* from the send to the page zooming in, or the agent's first edit when it stays */
  working: 1000,
  /* the page's flight (1-1.3s, HomePageQuickStart.vue) ends before the agent edits, so the change happens in close-up */
  zoom: 1350,
  /* a file the agent opens comes to the front before it is edited */
  switchFile: 600,
  /* the lines an edit replaces turn red before the new ones arrive */
  markRemoved: 800,
  /* the room for the new lines opens */
  openLines: 320,
  /* typing one line, at most, and one edit, at most */
  perLine: 170,
  perEdit: 2600,
  /* the finished diff, a beat before the page changes */
  diffHold: 500,
  /* the diff stays, with the page it made, before it is taken in */
  resultHold: 2500,
  /* the replaced lines close as the diff is taken in */
  closeLines: 320,
  /* the code, taken in, stays before the next request types in (the page stays zoomed while it does) */
  acceptedHold: 2500,
  /* after the last request, the code and the page's overview stay before the session fades out and starts over */
  endHold: 7000,
  fade: 450
};

/* how long the next key takes, after the typed text: a person's uneven rhythm, a beat at the end of each word,
   a longer one after punctuation, and now and then a short hesitation */
function keyDelay(typed: string) {
  const last = typed.at(-1);
  const delay = 26 + Math.random() * 24;

  if (last === " ")
    return delay + 40 + Math.random() * 60;

  if (last === "," || last === ".")
    return delay + 140;

  return Math.random() < 0.05 ? delay + 100 + Math.random() * 120 : delay;
}

/* thrown out of a pause once the component is gone, which ends the loop */
const unmounted = Symbol("unmounted");

export function useAgentSession(root: Ref<HTMLElement | null>, session: QuickStartSession) {
  const { rounds } = session;

  const files = ref<OpenFile[]>([]);
  const active = ref("");
  /* the round the code shows */
  const phase = ref<Phase>("idle");
  const roundIndex = ref(0);
  /* the round whose prompt is in the composer: the next one types in while the previous diff is still shown */
  const promptIndex = ref(0);
  const promptTyped = ref(0);
  /* how many rounds the page shows the result of */
  const applied = ref(0);
  /* the part of the page the viewer is zoomed in on, from a moment after a request is sent until another request
     zooms elsewhere (none: the page's overview) */
  const zoom = ref<Round["zoom"]>();
  /* the method the code shows unfolded (none folds until the first request that names one) */
  const unfold = ref<string>();
  /* the next request is arriving in the composer: from it emptying until it is sent */
  const asking = ref(false);
  /* a wait the composer shows as a ring filling around the send button (the key restarts it) */
  const countdown = ref<{ key: number, ms: number }>();
  /* how many lines the code is scrolled by: a file longer than the window (session.lines) scrolls as an editor
     does, to the method a request opens and to each line as it types in, only as far as it must */
  const scrolled = ref(0);
  /* the window is not mostly on screen, so the session and the composer's motion stand still */
  const paused = ref(true);
  /* the session fades out before it starts over */
  const resetting = ref(false);

  const round = computed(() => rounds[roundIndex.value]);
  const prompt = computed(() => rounds[promptIndex.value].prompt);
  const promptText = computed(() => prompt.value.slice(0, promptTyped.value));

  const sent = computed(() => phase.value !== "idle" && promptIndex.value === roundIndex.value);
  /* the caret stays lit while characters arrive, like a real editor */
  const typing = computed(() => !sent.value && promptTyped.value > 0 && promptTyped.value < prompt.value.length);
  /* from the send until the page shows the result: the agent edits and QuestPDF renders */
  const working = computed(() => phase.value === "working" || phase.value === "editing" || phase.value === "built");
  const finished = computed(() => phase.value === "done" && sent.value);

  /* the lines of the file in front, with every method but the one the request works on folded */
  const lines = computed(() => foldLines(files.value.find(file => file.name === active.value)?.lines ?? [], unfold.value));


  /* Edits on the files */

  function resetSession() {
    files.value = session.files.map(({ name, lines }) => ({ name, lines: lines.map(text => ({ text, kind: "normal" as const })) }));
    active.value = session.files[0].name;
    roundIndex.value = 0;
    promptIndex.value = 0;
    promptTyped.value = 0;
    applied.value = 0;
    zoom.value = undefined;
    unfold.value = undefined;
    scrolled.value = 0;
    asking.value = false;
    countdown.value = undefined;
    phase.value = "idle";
  }

  function acceptDiff() {
    for (const file of files.value)
      file.lines = file.lines.filter(line => line.kind !== "removed").map(line => ({ text: line.text, kind: "normal" as const }));

    scrolled.value = Math.min(scrolled.value, Math.max(0, lines.value.length - session.lines));
  }

  /* scrolls the shown line at `index` into the window, only as far as it must, so the code around it stays put */
  function scrollTo(index: number) {
    if (index >= 0)
      scrolled.value = Math.min(Math.max(scrolled.value, index - session.lines + 1), index);
  }

  /* the file's reactive proxy, added if the edit creates it */
  function open(name: string) {
    if (!files.value.some(file => file.name === name))
      files.value.push({ name, lines: [] });

    return files.value.find(file => file.name === name)!;
  }

  /* marks the replaced lines and returns where the new lines go */
  function prepare(file: OpenFile, { after, remove = 0 }: Edit) {
    if (after === undefined)
      return 0;

    const at = file.lines.findIndex(line => line.text === after && line.kind === "normal");

    for (let index = at; index < at + remove; index++)
      file.lines[index].kind = "removed";

    return at + Math.max(remove, 1);
  }

  function showFinishedSession() {
    resetSession();

    for (const r of rounds) {
      for (const edit of r.edits) {
        const file = open(edit.file);
        const at = prepare(file, edit);
        file.lines.splice(at, 0, ...edit.add.map(text => ({ text, kind: "added" as const })));
        active.value = edit.file;
      }

      acceptDiff();
      unfold.value = r.unfold ?? unfold.value;
    }

    roundIndex.value = rounds.length - 1;
    promptIndex.value = roundIndex.value;
    promptTyped.value = prompt.value.length;
    applied.value = rounds.length;
    phase.value = "done";
  }


  /* Animation engine: one async loop, paused while the window is not mostly on screen, stopped on unmount */

  let running = false;
  let inView = false;
  let alive = true;
  let observer: IntersectionObserver | undefined;
  let countdowns = 0;

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* the session starts the first time the window is mostly on screen in a shown tab */
  function updatePaused() {
    paused.value = !inView || document.hidden;

    if (!paused.value && !running)
      void loop();
  }

  /* waits ms of time with the window in view: a pause cut by scrolling away goes on where it stopped */
  async function pause(ms: number) {
    let left = ms;

    while (left > 0) {
      if (paused.value) {
        await sleep(100);
      }
      else {
        const slice = Math.min(left, 100);
        await sleep(slice);
        left -= slice;
      }

      if (!alive)
        throw unmounted;
    }
  }

  /* a pause the composer shows filling up */
  async function wait(ms: number) {
    countdown.value = { key: ++countdowns, ms };
    await pause(ms);
    countdown.value = undefined;
  }

  /* the composer empties and lights up, the next prompt types itself in, under the previous diff and page, and
     sends itself a moment later */
  async function askNext(index: number) {
    promptIndex.value = index;
    promptTyped.value = 0;
    asking.value = true;
    await pause(timing.beforeTyping);

    while (promptTyped.value < prompt.value.length) {
      promptTyped.value++;
      await pause(keyDelay(promptText.value));
    }

    await wait(timing.beforeSend);
    asking.value = false;
  }

  /* the replaced lines close, then the diff is taken in */
  async function takeInDiff() {
    const removed = files.value.flatMap(file => file.lines.filter(line => line.kind === "removed"));

    if (removed.length) {
      removed.forEach(line => line.state = "closing");
      await pause(timing.closeLines);
    }

    acceptDiff();
  }

  /* the room for the new lines opens in one move, then each line types in, a short time per line */
  async function playEdit(edit: Edit) {
    const file = open(edit.file);

    if (active.value !== edit.file) {
      active.value = edit.file;
      await pause(timing.switchFile);
    }

    const at = prepare(file, edit);

    if (edit.remove)
      await pause(timing.markRemoved);

    const kind = edit.after === undefined ? "normal" : "added";
    file.lines.splice(at, 0, ...edit.add.map(text => ({ text, kind, typed: 0, state: "opening" as const })));
    await pause(timing.openLines);

    for (let index = at; index < at + edit.add.length; index++)
      file.lines[index].state = undefined;

    /* the new lines the window shows (one inside a folded method takes no time), as reactive proxies, so each step
       re-renders the window */
    const shown = new Set(lines.value.map(({ line }) => line));
    const added = file.lines.slice(at, at + edit.add.length).filter(line => shown.has(line));
    const lineTicks = Math.max(1, Math.round(Math.min(timing.perLine, timing.perEdit / added.length) / tick));

    for (const line of added) {
      scrollTo(lines.value.findIndex(shown => shown.line === line));

      if (!line.text)
        await pause(tick * lineTicks);

      while (line.typed! < line.text.length) {
        line.typed = Math.min(line.text.length, line.typed! + Math.ceil(line.text.length / lineTicks));
        await pause(tick);
      }
    }
  }

  /* from the moment the prompt is sent: the method the request works on unfolds; a moment later the page flies to
     the part the request changes, unless it shows it already (or back to its overview for a request without a
     zoom); the agent edits, and once it is done the page shows the result */
  async function playRound(index: number) {
    roundIndex.value = index;
    phase.value = "working";
    unfold.value = round.value.unfold ?? unfold.value;
    scrollTo(lines.value.findIndex(({ line }) => line.text === unfold.value));
    await pause(timing.working);

    /* compared by value: two requests may change the same part of the page */
    if (String(round.value.zoom) !== String(zoom.value)) {
      zoom.value = round.value.zoom;
      await pause(timing.zoom);
    }

    phase.value = "editing";
    for (const edit of round.value.edits)
      await playEdit(edit);

    phase.value = "built";
    await pause(timing.diffHold);
    phase.value = "done";
    applied.value = index + 1;
  }

  async function loop() {
    running = true;

    try {
      await pause(timing.start);

      while (alive) {
        for (let index = 0; index < rounds.length; index++) {
          await askNext(index);
          await playRound(index);
          await pause(timing.resultHold);
          await takeInDiff();

          if (index === rounds.length - 1) {
            zoom.value = undefined;
            await wait(timing.endHold);
          }
          else
            await wait(timing.acceptedHold);
        }

        resetting.value = true;
        await pause(timing.fade);
        resetSession();
        resetting.value = false;
        await pause(timing.fade);
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

    /* mostly on screen: 60% of the window, or of the screen when the window is taller than it */
    observer = new IntersectionObserver(([entry]) => {
      const screen = entry.rootBounds?.height ?? window.innerHeight;
      inView = entry.intersectionRect.height >= 0.6 * Math.min(entry.boundingClientRect.height, screen);
      updatePaused();
    }, { threshold: Array.from({ length: 21 }, (_, index) => index / 20) });

    observer.observe(root.value!);
    document.addEventListener("visibilitychange", updatePaused);
  });

  onUnmounted(() => {
    alive = false;
    observer?.disconnect();
    document.removeEventListener("visibilitychange", updatePaused);
  });

  return { files, active, lines, promptIndex, promptText, typing, sent, working, finished, applied, zoom, scrolled, asking, countdown, paused, resetting, unfold };
}

/* The engine behind the live-shortcut directions (I2-I4): which screenshot is shown, the timer that
   moves on, and the keyboard. The cycle is a timer, never animationend (Chrome drops animation events
   in hidden documents); it keeps the time left in a step across pauses, and pauses off screen, in a
   hidden tab, while the pointer or focus is inside, and does not run under reduced motion. Only the
   plain digits 1-4 are listened to, as in the app: never arrows (they scroll) or Ctrl/Cmd combinations
   (browser shortcuts), and never while the reader types. */

import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from "vue";

export interface TourStep {
  /* index into capabilities */
  row: number;
  /* screenshot name in public/companion */
  frame: string;
  /* the digit that selects this step, as in the app */
  key: string | null;
  /* what this step shows */
  label: string;
  /* where to look, as fractions of the frame (the squarer error screenshots are cropped from the top
     left, so their y values are scaled by 1917/1328 / 1592/1341 = 1.216) */
  focus: [number, number];
  /* where a callout card goes so it does not cover the focus (the spotlight tour, I3) */
  side: "left" | "right" | "above";
}

export const tourSteps: TourStep[] = [
  { row: 0, frame: "application", key: null, label: "Preview", focus: [0.51, 0.17], side: "right" },
  { row: 1, frame: "selection", key: null, label: "Selected element", focus: [0.12, 0.45], side: "above" },
  { row: 2, frame: "magnifier", key: "1", label: "Magnifier", focus: [0.62, 0.3], side: "right" },
  { row: 2, frame: "measurement-point", key: "2", label: "Coordinates", focus: [0.58, 0.6], side: "left" },
  { row: 2, frame: "measurement-vertical", key: "3", label: "Vertical distance", focus: [0.44, 0.2], side: "left" },
  { row: 2, frame: "measurement-horizontal", key: "4", label: "Horizontal distance", focus: [0.67, 0.6], side: "above" },
  { row: 3, frame: "layout-error", key: null, label: "Layout error", focus: [0.1, 0.347], side: "right" },
  { row: 3, frame: "generic-exception", key: null, label: "Exception", focus: [0.47, 0.26], side: "right" }
];

export const tourFrames = [...new Set(tourSteps.map(s => s.frame))];

/* what the engine needs from a step; a tour may carry more (focus, card position...) */
export interface TourStepBase {
  row: number;
  key: string | null;
}

export function stepsOfRow<T extends TourStepBase>(row: number, steps: T[] = tourSteps as unknown as T[]) {
  return steps.map((step, index) => ({ step, index })).filter(entry => entry.step.row === row);
}

/* steps defaults to the four-capability tour above (I2-I4); the nine-view tour (I5) passes its own.
   keyboard: whether the digits on the reader's keyboard select steps (off in the spotlight tours) */
export function useShortcutTour<T extends TourStepBase = TourStep>(root: Ref<HTMLElement | null>, dwell = 3600, steps: T[] = tourSteps as unknown as T[], { keyboard = true } = {}) {
  const step = ref(0);
  const current = computed(() => steps[step.value]);

  const hovered = ref(false);
  const focused = ref(false);
  const visible = ref(false);
  const pageHidden = ref(false);
  const reducedMotion = ref(false);
  const isPaused = computed(() => hovered.value || focused.value || !visible.value || pageHidden.value || reducedMotion.value);

  /* the last digit pressed on the reader's keyboard, for a key-down flash */
  const pressedKey = ref<string | null>(null);

  let timer: ReturnType<typeof setTimeout> | undefined;
  let flash: ReturnType<typeof setTimeout> | undefined;
  let remaining = dwell;
  let startedAt = 0;

  function run() {
    clearTimeout(timer);
    if (isPaused.value)
      return;
    startedAt = Date.now();
    timer = setTimeout(() => {
      step.value = (step.value + 1) % steps.length;
      restart();
    }, remaining);
  }

  /* a new step gets the full time */
  function restart() {
    remaining = dwell;
    run();
  }

  watch(isPaused, paused => {
    if (paused) {
      clearTimeout(timer);
      remaining = Math.max(0, remaining - (Date.now() - startedAt));
    }
    else {
      run();
    }
  });

  function selectStep(index: number) {
    step.value = index;
    restart();
  }

  /* picking the row that is already shown steps through its screens */
  function selectRow(row: number) {
    const entries = stepsOfRow(row, steps);
    const position = entries.findIndex(entry => entry.index === step.value);
    selectStep(position >= 0 ? entries[(position + 1) % entries.length].index : entries[0].index);
  }

  function onKey(event: KeyboardEvent) {
    if (!visible.value || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)
      return;
    if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable]"))
      return;
    const index = steps.findIndex(s => s.key === event.key);
    if (index < 0)
      return;
    selectStep(index);
    pressedKey.value = event.key;
    clearTimeout(flash);
    flash = setTimeout(() => pressedKey.value = null, 180);
  }

  function onVisibility() {
    pageHidden.value = document.hidden;
  }

  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    pageHidden.value = document.hidden;
    observer = new IntersectionObserver(([entry]) => visible.value = entry.isIntersecting, { threshold: 0.35 });
    observer.observe(root.value!);
    document.addEventListener("visibilitychange", onVisibility);
    if (keyboard)
      document.addEventListener("keydown", onKey);
  });

  onBeforeUnmount(() => {
    clearTimeout(timer);
    clearTimeout(flash);
    observer?.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    document.removeEventListener("keydown", onKey);
  });

  return { step, current, isPaused, hovered, focused, pressedKey, dwell, selectStep, selectRow };
}

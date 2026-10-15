/* The Companion App tour on the homepage (HomePageCompanion.vue): which screen is shown, and the timer
   that moves on to the next one. The cycle is a timer, never animationend (Chrome does not dispatch
   animation events in a hidden document). It keeps the time left in a screen across pauses, and it
   pauses while the section is off screen, the tab is hidden, or the pointer or keyboard focus is
   inside it; under reduced motion it never starts. */

import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from "vue";

export interface TourStep {
  /* the view (row of the list) this screen belongs to; a view may have several screens */
  view: number;
}

export function useCompanionTour<T extends TourStep>(root: Ref<HTMLElement | null>, steps: T[], dwell: number) {
  const step = ref(0);
  const current = computed(() => steps[step.value]);

  const hovered = ref(false);
  const focused = ref(false);
  const visible = ref(false);
  const pageHidden = ref(false);
  const reducedMotion = ref(false);
  const isPaused = computed(() => hovered.value || focused.value || !visible.value || pageHidden.value || reducedMotion.value);

  let timer: ReturnType<typeof setTimeout> | undefined;
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

  /* a new screen gets the full time */
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

  /* picking the view that is already shown steps through its screens */
  function selectView(view: number) {
    const indexes = steps.map((s, index) => ({ s, index })).filter(entry => entry.s.view === view).map(entry => entry.index);
    const position = indexes.indexOf(step.value);
    step.value = position >= 0 ? indexes[(position + 1) % indexes.length] : indexes[0];
    restart();
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
  });

  onBeforeUnmount(() => {
    clearTimeout(timer);
    observer?.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
  });

  return { step, current, hovered, focused, selectView };
}

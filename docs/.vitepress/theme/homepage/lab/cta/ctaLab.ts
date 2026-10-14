import { inject, onBeforeUnmount, onMounted, provide, reactive, ref, watch, type Ref } from "vue";

/* Shared state of the lab toolbar, handed down to every card and visual:
   - forceHover: every card shows its hover state (a .lab-hover class, since :hover cannot be forced)
   - reduceMotion: simulates prefers-reduced-motion (a .reduce-motion class on the lab root)
   - epoch: bumped by "Replay entrance"; every visual resets its entered state and plays again */

export interface LabState {
  forceHover: boolean;
  reduceMotion: boolean;
  epoch: number;
}

const KEY = Symbol("cta-lab");

export function provideLabState() {
  const state = reactive<LabState>({ forceHover: false, reduceMotion: false, epoch: 0 });
  provide(KEY, state);
  return state;
}

export function useLabState(): LabState {
  return inject(KEY, reactive<LabState>({ forceHover: false, reduceMotion: false, epoch: 0 }));
}

/* Entrance: `entered` flips to true once the element is 40% in view (or right away when it is already on
   screen), exactly like the production card. Replay (epoch) sets it back to false for a frame. Under
   reduced motion it is true from the start, so the still is the finished poster. */
export function useEntrance(target: Ref<Element | null | undefined>) {
  const entered = ref(false);
  const lab = useLabState();
  let observer: IntersectionObserver | undefined;

  function reducedMotion() {
    return lab.reduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function arm() {
    observer?.disconnect();
    observer = undefined;

    if (!target.value || reducedMotion() || !("IntersectionObserver" in window)) {
      entered.value = true;
      return;
    }

    /* a short timer rather than requestAnimationFrame: the result is the same in a browser, and
       headless captures with a virtual time budget run timers but not animation frames */
    const rect = target.value.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
      setTimeout(() => entered.value = true, 60);
      return;
    }

    observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting))
        return;

      entered.value = true;
      observer?.disconnect();
      observer = undefined;
    }, { threshold: 0.4 });

    observer.observe(target.value);
  }

  onMounted(arm);
  onBeforeUnmount(() => observer?.disconnect());

  watch(() => lab.epoch, () => {
    entered.value = false;
    setTimeout(arm, 60);
  });

  return { entered };
}

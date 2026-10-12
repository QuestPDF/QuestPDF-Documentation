import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from "vue";

/* Shared plumbing for the lab variants: every animation runs only while its stage is on screen and
   the visitor has not asked for reduced motion, so ten autoplaying panels on one page do not fight
   for the CPU and nothing moves for people who turned motion off. */

export function useInView(target: Ref<Element | null | undefined>, threshold = 0.3) {
  const inView = ref(false);
  const reducedMotion = ref(false);
  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => inView.value = entry.isIntersecting);
    }, { threshold });

    if (target.value)
      observer.observe(target.value);
  });

  onBeforeUnmount(() => observer?.disconnect());

  const animate = computed(() => inView.value && !reducedMotion.value);
  return { inView, reducedMotion, animate };
}

/* calls `step` every `interval` ms for as long as `animate` is true */
export function useLoop(animate: Ref<boolean>, interval: number, step: () => void) {
  let timer: ReturnType<typeof setInterval> | undefined;

  function stop() {
    if (timer) clearInterval(timer);
    timer = undefined;
  }

  watch(animate, on => {
    stop();
    if (on) timer = setInterval(step, interval);
  }, { immediate: true });

  onBeforeUnmount(stop);
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

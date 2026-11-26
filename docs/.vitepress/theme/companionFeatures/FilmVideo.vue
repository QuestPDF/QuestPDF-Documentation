<template>
  <div ref="root" class="film">
    <!-- rendered on the client only: the theme is not known during the build -->
    <video
        v-if="mounted"
        :key="src"
        ref="video"
        :src="near ? src : undefined"
        width="2560"
        height="1440"
        muted
        loop
        playsinline
        disablepictureinpicture
        preload="metadata"
        :aria-label="label"
        @loadeddata="sync" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useData } from "vitepress";
import { observeOnScreen, reducedMotion } from "../homepage/ctaTimeline";

/* PROTOTYPE: a recorded film of option 3, docs/public/companion/video/features/{name}-{theme}.mp4 (2560 × 1440,
   H.264, the user's recordings as they are). Plays muted in a loop while on screen, like the homepage video.
   Before merging: smaller sizes and a poster frame, as HomePageCompanionVideo has. */
const props = defineProps<{
  name: string;
  label: string;
}>();

const { isDark } = useData();

const root = ref<HTMLElement>();
const video = ref<HTMLVideoElement>();
const mounted = ref(false);
const near = ref(false);

const src = computed(() => `/companion/video/features/${props.name}-${isDark.value ? "dark" : "light"}.mp4`);

let visible = false;
let observer: IntersectionObserver | undefined;
let nearObserver: IntersectionObserver | undefined;

function sync() {
  const element = video.value;

  if (!element)
    return;

  if (near.value && visible && !document.hidden && !reducedMotion())
    element.play().catch(() => { /* autoplay refused: the first frame stays */ });
  else
    element.pause();
}

/* a theme switch mounts a new video element */
watch(src, () => nextTick(sync));

onMounted(() => {
  mounted.value = true;

  nearObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting))
      return;

    near.value = true;
    nearObserver?.disconnect();
    nextTick(sync);
  }, { rootMargin: "100% 0px" });

  nearObserver.observe(root.value!);

  observer = observeOnScreen(root.value!, onScreen => {
    visible = onScreen;
    sync();
  });

  document.addEventListener("visibilitychange", sync);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  nearObserver?.disconnect();
  document.removeEventListener("visibilitychange", sync);
});
</script>

<style scoped>

.film {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 14px;
  background-color: var(--vp-c-bg);
  box-shadow:
      0 0 0 1px light-dark(color-mix(in srgb, var(--vp-c-text-1) 10%, transparent), rgba(255, 255, 255, 0.08)),
      0 16px 40px -16px light-dark(rgba(16, 24, 40, 0.22), rgba(0, 0, 0, 0.6));
}

.film video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>

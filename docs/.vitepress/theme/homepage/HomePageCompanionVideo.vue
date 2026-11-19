<template>
  <div ref="root" class="companion-video">
    <div class="frame">
      <!-- rendered on the client only: the theme and the frame's size in device pixels are not known during the build -->
      <video
        v-if="source"
        :key="source.src"
        ref="video"
        :src="near ? source.src : undefined"
        :poster="source.poster"
        :width="source.width"
        :height="source.height"
        muted
        loop
        playsinline
        disablepictureinpicture
        preload="auto"
        aria-label="The QuestPDF Companion App: exploring the document structure, inspecting elements and measuring the preview"
        @loadeddata="sync" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useData } from "vitepress";
import { observeOnScreen, reducedMotion } from "./ctaTimeline";

/* docs/public/companion/video/{theme}-{name}.mp4: H.264 High profile, 60 fps, plays in every browser;
   {theme}-{name}.webp is its first frame; smallest first */
const sizes = [
  { name: "480p", width: 854, height: 480 },
  { name: "720p", width: 1280, height: 720 },
  { name: "1440p", width: 2560, height: 1440 }
];

type Size = typeof sizes[number];

const { isDark } = useData();

const root = ref<HTMLElement>();
const video = ref<HTMLVideoElement>();
const size = ref<Size>();

/* the video downloads only once the frame is within a screen of the viewport; until then the poster stands in */
const near = ref(false);

const source = computed(() => {
  if (!size.value)
    return undefined;

  const base = `/companion/video/${isDark.value ? "dark" : "light"}-${size.value.name}`;

  return {
    ...size.value,
    src: `${base}.mp4`,
    poster: `${base}.webp`
  };
});

/* the smallest video with at least as many pixels as the frame shows on this screen, so retina screens get a sharper one */
function fittingSize() {
  const devicePixels = root.value!.clientWidth * window.devicePixelRatio;
  return sizes.find(size => size.width >= devicePixels) ?? sizes[sizes.length - 1];
}

/* only ever upgrades: a frame that grows (a wider window, a rotated tablet) gets a sharper video, one that shrinks keeps its own */
function updateSize() {
  const fitting = fittingSize();

  if (!size.value || fitting.width > size.value.width)
    size.value = fitting;
}

let visible = false;
let observer: IntersectionObserver | undefined;
let nearObserver: IntersectionObserver | undefined;
let resizeObserver: ResizeObserver | undefined;

/* plays only while on screen in a visible tab; with reduced motion it stays on the first frame */
function sync() {
  const element = video.value;

  if (!element)
    return;

  if (near.value && visible && !document.hidden && !reducedMotion())
    element.play().catch(() => { /* autoplay refused, e.g. in low-power mode: the poster stays */ });
  else
    element.pause();
}

/* a theme switch or a sharper size mounts a new video element */
watch(source, () => nextTick(sync));

onMounted(() => {
  updateSize();

  resizeObserver = new ResizeObserver(updateSize);
  resizeObserver.observe(root.value!);

  nearObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting))
      return;

    near.value = true;
    nearObserver?.disconnect();
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
  resizeObserver?.disconnect();
  document.removeEventListener("visibilitychange", sync);
});
</script>

<style scoped>

.frame {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 14px;
  background-color: var(--vp-c-bg);
  box-shadow:
      0 0 0 1px light-dark(color-mix(in srgb, var(--vp-c-text-1) 10%, transparent), rgba(255, 255, 255, 0.08)),
      0 16px 40px -16px light-dark(rgba(16, 24, 40, 0.22), rgba(0, 0, 0, 0.6));
}

.frame video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>

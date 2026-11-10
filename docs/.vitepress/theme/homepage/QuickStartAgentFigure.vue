<script setup lang="ts">
import { faCircleCheck } from "@fortawesome/pro-regular-svg-icons";
import { faSparkles } from "@fortawesome/pro-solid-svg-icons";
import { onBeforeUnmount, onMounted, ref } from "vue";
import Icon from "../Icon.vue";
import { fadeInParts, type FadePart, observeOnScreen, reducedMotion, Timeline } from "./ctaTimeline";

/* A request to an agent and its change summary as a skeleton: the prompt bubble, then the summary's checks and
   diff, with bars where the words were. */
const checks = [64, 78, 86, 72];

/* Builds once, the first time the figure is mostly on screen, in three soft overlapping fades like the code
   figure: the prompt, then the summary card, then its checks and footer together. Times in ms. */
const parts: FadePart[] = [
  { selector: ".bubble", at: 0, from: "translate(0px, 4px)" },
  { selector: ".summary", at: 200, from: "translate(0px, 6px)" },
  { selector: "ul", at: 400, from: "translate(0px, 4px)" },
  { selector: "footer", at: 400, from: "translate(0px, 4px)" }
];

const root = ref<HTMLElement>();
const timeline = new Timeline();
let visibility: IntersectionObserver | undefined;

onMounted(() => {
  if (reducedMotion()) return;

  const pass = fadeInParts(timeline, root.value!, parts);
  pass.forEach(animation => animation.pause());

  /* once done, drop the effects so the figure is plain CSS again */
  Timeline.settled(pass).then(finished => {
    if (!finished) return;
    visibility?.disconnect();
    pass.forEach(animation => animation.cancel());
  });

  visibility = observeOnScreen(root.value!, onScreen =>
    pass.forEach(animation => onScreen ? animation.play() : animation.playState === "running" && animation.pause()));
});

onBeforeUnmount(() => {
  visibility?.disconnect();
  timeline.cancel();
});
</script>

<template>
  <div ref="root" class="figure" aria-hidden="true">
    <p class="bubble">
      <span class="prompt-mark">›</span>
      <span class="bar strong" style="width: 50px"></span><span class="bar strong" style="width: 88px"></span><span class="bar strong" style="width: 64px"></span>
    </p>

    <div class="summary fragment">
      <header>
        <Icon class="spark" :icon="faSparkles" />
        <span class="bar strong" style="width: 58px"></span><span class="bar strong" style="width: 100px"></span>
        <span class="pill"></span>
      </header>

      <ul>
        <li v-for="(width, index) of checks" :key="index">
          <Icon :icon="faCircleCheck" />
          <span class="bar" :style="{ width: `${width}px` }"></span>
        </li>
      </ul>

      <footer>
        <span class="bar" style="width: 64px"></span>
        <span class="diff">
          <span class="bar added" style="width: 22px"></span><span class="bar removed" style="width: 22px"></span>
        </span>
      </footer>
    </div>
  </div>
</template>

<style scoped>

/* the bars take the card's purple ink, like its title */
.figure {
  --ink: color-mix(in srgb, var(--tint) 60%, var(--vp-c-text-1));
  --bone: light-dark(
      color-mix(in srgb, var(--ink) 22%, transparent),
      color-mix(in srgb, var(--ink) 30%, transparent));
  --bone-strong: light-dark(
      color-mix(in srgb, var(--ink) 42%, transparent),
      color-mix(in srgb, var(--ink) 55%, transparent));
  --ok: light-dark(#2E7D32, #81C784);
  --del: light-dark(#C62828, #EF9A9A);

  width: 100%;
  zoom: 0.9;
  user-select: none;
}

.bar {
  display: inline-block;
  height: 8px;
  border-radius: 4px;
  background-color: var(--bone);
  vertical-align: middle;
}

.bar + .bar {
  margin-left: 8px;
}

.bar.strong {
  background-color: var(--bone-strong);
}

.bubble {
  display: flex;
  align-items: center;
  gap: 2px;
  width: fit-content;
  height: 32px;
  margin: 0 0 8px;
  padding: 0 14px;
  border-radius: 12px 12px 12px 4px;
  background-color: color-mix(in srgb, var(--tint) 12%, transparent);
}

.bubble .bar {
  background-color: color-mix(in srgb, var(--tint) 65%, transparent);
}

.prompt-mark {
  margin-right: 8px;
  color: var(--tint);
  font-weight: 700;
}

.summary {
  width: 100%;
  max-width: 400px;
  margin-left: 28px;
  padding: 12px 16px 10px;
}

header {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid color-mix(in srgb, var(--vp-c-text-1) 14%, transparent);
  box-sizing: content-box;
}

.spark {
  flex-shrink: 0;
  font-size: 1rem;
  color: var(--tint);
}

.pill {
  width: 40px;
  height: 16px;
  margin-left: auto;
  border-radius: 999px;
  background-color: color-mix(in srgb, var(--ok) 12%, transparent);
}

ul {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px 16px;
  margin: 0;
  padding: 6px 0;
  list-style: none;
}

li {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 18px;
}

li .icon {
  font-size: 1rem;
  color: var(--ok);
}

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 16px;
  padding-top: 6px;
  border-top: 1px solid color-mix(in srgb, var(--vp-c-text-1) 14%, transparent);
  box-sizing: content-box;
}

.bar.added {
  background-color: color-mix(in srgb, var(--ok) 55%, transparent);
}

.bar.removed {
  background-color: color-mix(in srgb, var(--del) 55%, transparent);
}

@media screen and (max-width: 480px) {
  .summary {
    margin-left: 0;
  }
}

</style>

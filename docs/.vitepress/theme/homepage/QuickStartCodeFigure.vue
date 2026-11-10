<script setup lang="ts">
import { faCube } from "@fortawesome/pro-regular-svg-icons";
import { onBeforeUnmount, onMounted, ref } from "vue";
import Icon from "../Icon.vue";
import { fadeInParts, type FadePart, observeOnScreen, reducedMotion, Timeline } from "./ctaTimeline";

/* Three lines of code with an IntelliSense popup and its signature help as a skeleton: bars where the words were,
   so the figure says "IDE tooling" without adding text to the page. Widths in px. */
const members = [
  { name: 66, signature: 18 },
  { name: 52, signature: 50 },
  { name: 58, signature: 56 },
  { name: 64, signature: 60 }
];

/* Builds once, the first time the figure is mostly on screen, in three soft overlapping fades: the code, then the
   popup, then the help. Then only the caret blinks while on screen. Times in ms. */
const parts: FadePart[] = [
  { selector: ".code", at: 0, from: "translate(0px, 4px)" },
  { selector: ".popup", at: 200, from: "translate(0px, -6px)" },
  { selector: ".hint", at: 400, from: "translate(-6px, 0px)" }
];

const blinkPeriod = 1100;

const root = ref<HTMLElement>();
const timeline = new Timeline();
let visibility: IntersectionObserver | undefined;
let visible = false;
let running: Animation[] = [];

function idle(figure: HTMLElement) {
  const blink = timeline.animate(figure.querySelector(".caret")!, [
    { opacity: 1, offset: 0 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.5 }, { opacity: 0, offset: 1 }
  ], { duration: blinkPeriod, iterations: Infinity });
  if (!visible)
    blink.pause();
  return [blink];
}

onMounted(() => {
  if (reducedMotion()) return;

  const figure = root.value!;
  const pass = fadeInParts(timeline, figure, parts);
  pass.forEach(animation => animation.pause());
  running = pass;

  Timeline.settled(pass).then(finished => {
    if (!finished) return;
    pass.forEach(animation => animation.cancel());
    running = idle(figure);
  });

  visibility = observeOnScreen(figure, onScreen => {
    visible = onScreen;
    running.forEach(animation => visible ? animation.play() : animation.playState === "running" && animation.pause());
  });
});

onBeforeUnmount(() => {
  visibility?.disconnect();
  timeline.cancel();
});
</script>

<template>
  <div ref="root" class="figure" aria-hidden="true">
    <div class="code">
      <p class="line">
        <span class="bar keyword" style="width: 40px"></span><span class="bar strong" style="width: 64px"></span><span class="bar type" style="width: 36px"></span><span class="bar" style="width: 16px"></span>
      </p>
      <p class="line indent">
        <span class="bar" style="width: 32px"></span><span class="bar strong" style="width: 48px"></span><span class="bar" style="width: 20px"></span>
      </p>
      <p class="line indent">
        <span class="bar" style="width: 32px"></span><span class="bar strong" style="width: 64px"></span><span class="bar" style="width: 14px"></span><span class="caret"></span>
      </p>
    </div>

    <div class="row">
      <ul class="popup fragment">
        <li v-for="(member, index) of members" :key="index" :class="{ selected: index === 0 }">
          <Icon :icon="faCube" />
          <span class="bar strong" :style="{ width: `${member.name}px` }"></span><span class="bar" :style="{ width: `${member.signature}px` }"></span>
        </li>
      </ul>

      <div class="hint fragment">
        <p><span class="bar type" style="width: 88px"></span><span class="bar strong" style="width: 32px"></span></p>
        <p><span class="bar" style="width: 140px"></span></p>
        <p><span class="bar" style="width: 96px"></span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.figure {
  --bone: light-dark(
      color-mix(in srgb, var(--vp-c-text-1) 20%, transparent),
      color-mix(in srgb, var(--vp-c-text-1) 26%, transparent));
  --bone-strong: light-dark(
      color-mix(in srgb, var(--vp-c-text-1) 40%, transparent),
      color-mix(in srgb, var(--vp-c-text-1) 50%, transparent));

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

.bar.keyword {
  background-color: color-mix(in srgb, light-dark(#5E35B1, #B388FF) 50%, transparent);
}

.bar.type {
  background-color: color-mix(in srgb, light-dark(#00796B, #80CBC4) 50%, transparent);
}

.code {
  margin-bottom: 6px;
}

.line {
  display: flex;
  align-items: center;
  height: 16px;
  margin: 0;
}

.line.indent {
  padding-left: 16px;
}

.caret {
  display: inline-block;
  width: 1.5px;
  height: 14px;
  margin-left: 8px;
  background-color: var(--vp-c-text-1);
}

/* the popup opens under the word being typed */
.row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-left: 56px;
}

.popup {
  flex-shrink: 0;
  width: 220px;
  margin: 0;
  padding: 5px;
  list-style: none;
}

.popup li {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 26px;
  padding: 0 10px;
  border-radius: 7px;
}

.popup li .bar + .bar {
  margin-left: 0;
}

.popup li.selected {
  background-color: light-dark(
      color-mix(in srgb, var(--tint) 16%, transparent),
      color-mix(in srgb, var(--tint) 12%, transparent));
}

.popup li.selected .bar.strong {
  background-color: color-mix(in srgb, var(--tint) 70%, transparent);
}

.popup .icon {
  flex-shrink: 0;
  font-size: 1rem;
  color: var(--tint);
}

.hint {
  flex: 1;
  max-width: 260px;
  margin-top: 4px;
  padding: 11px 14px;
}

.hint p {
  display: flex;
  align-items: center;
  height: 18px;
  margin: 0;
}

.hint p + p {
  margin-top: 4px;
}

@media screen and (max-width: 700px) {
  .hint {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .row {
    margin-left: 16px;
  }
}

</style>

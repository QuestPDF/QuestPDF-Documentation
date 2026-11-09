<script setup lang="ts">
import { faBolt, faCircleCheck, faCircleXmark, faGlobe } from "@fortawesome/pro-regular-svg-icons";
import { onBeforeUnmount, onMounted, ref } from "vue";
import Icon from "../Icon.vue";
import { move, onScreenShare, reducedMotion, Timeline } from "./ctaTimeline";

/* Two lanes, one bar each: QuestPDF's short run ends in a check; a browser's bar is the three layers it has to
   interpret, together several times longer. Widths are % of the track, a schematic rather than a measurement. */
const done = 15;
const strips = [
  { label: "HTML", width: 30 },
  { label: "CSS", width: 24 },
  { label: "JS", width: 30 }
];

/* Builds each time the figure comes mostly on screen: ruler, tiles, QuestPDF's run and check, the marker, then the
   browser's strips at the same speed until the cross. Times in ms. */
const timing = { ruler: 700, tileStagger: 90, tile: 450, runAt: 300, run: 520, stripsAt: 420, fullTrack: 3400, stripGap: 40, pop: 380 };

const HIDDEN = "inset(-24px 100% -40px 0)";
const SHOWN = "inset(-24px -24px -40px -24px)";
const OVERSHOOT = "cubic-bezier(0.34, 1.5, 0.64, 1)";
const EASE_OUT = "cubic-bezier(0.22, 0.8, 0.3, 1)";

const root = ref<HTMLElement>();
const timeline = new Timeline();
let visibility: IntersectionObserver | undefined;

function build(figure: HTMLElement) {
  const t = timing;
  const ms = (percent: number) => percent / 100 * t.fullTrack;
  const runEnd = t.runAt + t.run;
  let at = t.stripsAt;
  const stripTimes = strips.map(strip => {
    const span = [at, ms(strip.width)];
    at += ms(strip.width) + t.stripGap;
    return span;
  });
  const crossAt = at;
  const total = crossAt + t.pop + 200;

  const animations: Animation[] = [];
  const add = (el: Element | null, from: Keyframe, to: Keyframe, start: number, end: number, easing: string) => {
    if (el)
      animations.push(timeline.animate(el, move(from, to, start, end, total, easing), { duration: total, fill: "both" }));
  };
  const clipIn = (el: Element | null, start: number, length: number, easing: string) =>
    add(el, { clipPath: HIDDEN }, { clipPath: SHOWN }, start, start + length, easing);
  const pop = (el: Element | null, start: number) =>
    add(el, { opacity: 0, transform: "scale(0.6)" }, { opacity: 1, transform: "scale(1)" }, start, start + t.pop, OVERSHOOT);

  add(figure.querySelector(".ruler"), { clipPath: "inset(-2px 100% -2px 0)" }, { clipPath: "inset(-2px 0 -2px 0)" }, 0, t.ruler, EASE_OUT);
  figure.querySelectorAll(".tile").forEach((el, index) => {
    const start = index * t.tileStagger;
    add(el, { opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }, start, start + t.tile, EASE_OUT);
  });
  clipIn(figure.querySelector(".run"), t.runAt, t.run, EASE_OUT);
  pop(figure.querySelector(".check"), runEnd);
  add(figure.querySelector(".marker"), { clipPath: "inset(0 -4px 100% -4px)" }, { clipPath: "inset(0 -4px 0 -4px)" }, runEnd + 60, runEnd + 500, EASE_OUT);
  figure.querySelectorAll(".strip").forEach((el, index) =>
    clipIn(el, stripTimes[index][0], stripTimes[index][1], "cubic-bezier(0.3, 0, 0.6, 1)"));
  pop(figure.querySelector(".cross"), crossAt);

  return animations;
}

/* a pass waits paused at its start; it re-arms only once the figure is fully off screen, so it never jumps back
   to empty in view */
let animations: Animation[] = [];
let armed = false;

function arm() {
  animations.forEach(animation => animation.cancel());
  const pass = build(root.value!);
  pass.forEach(animation => animation.pause());
  animations = pass;
  armed = true;

  /* once done, drop the effects so the figure is plain CSS again */
  Timeline.settled(pass).then(finished => finished && pass.forEach(animation => animation.cancel()));
}

onMounted(() => {
  if (reducedMotion()) return;

  arm();

  visibility = new IntersectionObserver(entries => {
    const entry = entries[entries.length - 1];
    if (!entry.isIntersecting) {
      if (!armed) arm();
    } else if (armed && entry.intersectionRatio >= onScreenShare) {
      armed = false;
      animations.forEach(animation => animation.play());
    }
  }, { threshold: [0, onScreenShare] });
  visibility.observe(root.value!);
});

onBeforeUnmount(() => {
  visibility?.disconnect();
  timeline.cancel();
});
</script>

<template>
  <div ref="root" class="lanes" aria-hidden="true" :style="{ '--done-n': done / 100 }">
    <span class="ruler"></span>

    <div class="lane">
      <span class="tile fragment quest"><Icon :icon="faBolt" /></span>
      <span class="track">
        <span class="run" :style="{ width: `${done}%` }"></span>
        <Icon class="check" :icon="faCircleCheck" />
      </span>
    </div>

    <div class="lane">
      <span class="tile fragment web"><Icon :icon="faGlobe" /></span>
      <span class="track">
        <span v-for="strip of strips" :key="strip.label" class="strip fragment" :style="{ width: `${strip.width}%` }">{{ strip.label }}</span>
        <Icon class="cross" :icon="faCircleXmark" />
      </span>
    </div>

    <span class="marker"></span>
  </div>
</template>

<style scoped>

.lanes {
  --tile: 40px;
  --gap: 16px;
  --ruler: 14px;
  --row-gap: 10px;
  --bar: 24px;
  --tick: light-dark(
      color-mix(in srgb, var(--vp-c-text-1) 14%, transparent),
      color-mix(in srgb, var(--vp-c-text-1) 16%, transparent));

  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--row-gap);
  width: min(100%, 460px);
  user-select: none;
}

/* the time axis: faint ticks along the top, one every eighth of the track */
.ruler {
  height: var(--ruler);
  margin-left: calc(var(--tile) + var(--gap));
  background-image: repeating-linear-gradient(to right, var(--tick) 0 1px, transparent 1px 12.5%);
  background-size: calc(100% + 1px) 100%;
  border-bottom: 1px solid var(--tick);
}

.lane {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: var(--tile) minmax(0, 1fr);
  gap: var(--gap);
  align-items: center;
}

.tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--tile);
  height: var(--tile);
  border-radius: 12px;
  font-size: 1.25rem;
}

.quest {
  color: var(--tint);
}

.web {
  color: var(--vp-c-text-2);
}

.track {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.run {
  height: var(--bar);
  margin-right: 4px;
  border-radius: 7px;
  background-image: linear-gradient(110deg,
      color-mix(in srgb, var(--tint) 80%, transparent),
      color-mix(in srgb, var(--tint) 60%, transparent));
  box-shadow: 0 6px 16px -6px color-mix(in srgb, var(--tint) 50%, transparent);
}

.check {
  font-size: 1.5rem;
  color: light-dark(#2E7D32, #81C784);
}

/* the browser's work, one strip per layer it has to interpret */
.strip {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--bar);
  border-radius: 5px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
}

.strip:first-child {
  border-radius: 7px 5px 5px 7px;
}

.strip:nth-last-child(1 of .strip) {
  border-radius: 5px 7px 7px 5px;
}

.cross {
  margin-left: 4px;
  font-size: 1.5rem;
  color: light-dark(#C62828, #EF9A9A);
}

/* the moment QuestPDF is done, carried down behind both bars: the mask cuts it out of each bar's row, as the bars
   and icons are see-through in dark */
.marker {
  --first: calc(var(--ruler) + var(--row-gap) + (var(--tile) - var(--bar)) / 2);
  --second: calc(var(--first) + var(--tile) + var(--row-gap));

  position: absolute;
  top: 0;
  bottom: -6px;
  left: calc(var(--tile) + var(--gap) + (100% - var(--tile) - var(--gap)) * var(--done-n));
  border-left: 2px dashed color-mix(in srgb, var(--tint) 70%, transparent);
  mask-image: linear-gradient(to bottom,
      #000 var(--first), transparent var(--first) calc(var(--first) + var(--bar)),
      #000 calc(var(--first) + var(--bar)) var(--second), transparent var(--second) calc(var(--second) + var(--bar)),
      #000 calc(var(--second) + var(--bar)));
}

@media screen and (max-width: 420px) {
  .lanes {
    --tile: 36px;
    --gap: 12px;
  }
}

</style>

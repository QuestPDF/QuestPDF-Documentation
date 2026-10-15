<template>
  <!-- I · Live shortcuts: D's stage and rows, made to work. The rows are buttons; the selected one picks
       the screenshot and presses its keys. Magnify and measure steps through the real shortcuts: 1 the
       magnifier, 2 coordinates, 3 and 4 measuring, and while the section is on screen the digit keys on
       the reader's own keyboard do the same, as they do in the app. A revisit of the 14 October
       switcher, which cycled from the left-hand list: here it is D's layout and the keys lead.
       The cycle is a timer (not animationend); it pauses off screen, in a hidden tab, while hovered
       or focused, and does not run under reduced motion. -->
  <section class="content">
    <div ref="root" class="panel i-stage" @mouseenter="hovered = true" @mouseleave="hovered = false" @focusin="focused = true" @focusout="focused = false">
      <div class="i-visual">
        <div class="i-glow" aria-hidden="true"></div>
        <div class="i-frames" :class="{ refreshing: current.frame === 'application' }">
          <img
            v-for="frame of frames"
            :key="frame"
            :src="`/companion/${frame}-dark.webp`"
            :alt="frame === current.frame ? 'QuestPDF Companion App' : ''"
            class="i-frame"
            :class="{ shown: frame === current.frame }"
            loading="lazy" />
          <span :key="step" class="i-refresh" aria-hidden="true"></span>
        </div>
      </div>

      <div class="i-text">
        <h2 class="card-title">{{ title }}</h2>
        <p class="card-description">{{ description }}</p>

        <ul class="i-rows" aria-label="What the Companion App does">
          <li v-for="(capability, index) of capabilities" :key="capability.key">
            <button
              type="button"
              class="i-row"
              :class="{ active: current.row === index }"
              :aria-pressed="current.row === index"
              @click="selectRow(index)">
              <span class="i-row-head">
                <strong>{{ capability.title }}</strong>
                <CompanionKeys :capability="capability" :pressed="current.row === index" :lit-key="current.row === index ? current.key : null" />
              </span>
              <span class="i-row-description">{{ capability.description }}</span>
              <span v-if="current.row === index" :key="step" class="i-rail" :class="{ paused: isPaused }" :style="{ animationDuration: `${dwell}ms` }" aria-hidden="true"></span>
            </button>
          </li>
        </ul>

        <p class="i-hint"><i class="fa-regular fa-keyboard" aria-hidden="true"></i>Try it: press 1, 2, 3 or 4 while this section is on screen.</p>

        <CompanionActions layout="stack" menu-up class="i-actions" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import CompanionActions from "./CompanionActions.vue";
import CompanionKeys from "./CompanionKeys.vue";
import { capabilities, description, title } from "./companion";

/* the cycle: one step per row, four for Magnify and measure (one per digit key) */
const steps = [
  { row: 0, frame: "application", key: null },
  { row: 1, frame: "selection", key: null },
  { row: 2, frame: "magnifier", key: "1" },
  { row: 2, frame: "measurement-point", key: "2" },
  { row: 2, frame: "measurement-vertical", key: "3" },
  { row: 2, frame: "measurement-horizontal", key: "4" },
  { row: 3, frame: "layout-error", key: null }
];

const frames = [...new Set(steps.map(s => s.frame))];
const dwell = 3200;

const step = ref(0);
const current = computed(() => steps[step.value]);

const root = ref<HTMLElement | null>(null);
const hovered = ref(false);
const focused = ref(false);
const visible = ref(false);
const pageHidden = ref(false);
const reducedMotion = ref(false);

const isPaused = computed(() => hovered.value || focused.value || !visible.value || pageHidden.value || reducedMotion.value);

/* the timer keeps the time left in a step across pauses, as the rail does (its animation pauses) */
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
    schedule();
  }, remaining);
}

/* a new step: full time */
function schedule() {
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

function selectRow(row: number) {
  /* clicking the measuring row again steps through its keys */
  if (current.value.row === row && row === 2)
    step.value = step.value === 5 ? 2 : step.value + 1;
  else
    step.value = steps.findIndex(s => s.row === row);
  schedule();
}

function onKey(event: KeyboardEvent) {
  if (!visible.value || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)
    return;
  /* never while typing; the target is the focused element, or body when nothing has focus */
  if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable]"))
    return;
  const index = steps.findIndex(s => s.key === event.key);
  if (index < 0)
    return;
  step.value = index;
  schedule();
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
  schedule();
  document.addEventListener("visibilitychange", onVisibility);
  document.addEventListener("keydown", onKey);
});

onBeforeUnmount(() => {
  clearTimeout(timer);
  observer?.disconnect();
  document.removeEventListener("visibilitychange", onVisibility);
  document.removeEventListener("keydown", onKey);
});
</script>

<style scoped>

/* the stage: D's colours */
.custom-page.textured-page .i-stage {
  --vp-c-text-1: rgba(255, 255, 255, 0.95);
  --vp-c-text-2: rgba(235, 235, 245, 0.68);
  --vp-c-text-3: rgba(235, 235, 245, 0.45);
  --vp-c-divider: rgba(255, 255, 255, 0.1);
  --vp-c-bg-elv: #1C2333;
  --vp-c-default-soft: rgba(255, 255, 255, 0.08);
  --home-surface-rim: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.01));

  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 64px;
  align-items: center;
  overflow: hidden;
  background-color: #0D1424;
  background-image:
      radial-gradient(ellipse 70% 80% at 0% 0%, rgba(33, 150, 243, 0.16), transparent 70%),
      radial-gradient(ellipse 60% 70% at 100% 100%, rgba(63, 81, 181, 0.16), transparent 70%);
  box-shadow: 0 24px 64px -28px rgba(13, 20, 36, 0.55);
}

html.dark .custom-page.textured-page .i-stage {
  background-color: #0A101D;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.i-visual {
  position: relative;
}

.i-glow {
  position: absolute;
  inset: -10% -6%;
  background: radial-gradient(ellipse 50% 50% at 50% 50%, rgba(33, 150, 243, 0.3), transparent 70%);
  filter: blur(8px);
  pointer-events: none;
}

/* the frames: stacked, cross-fading; the two error screenshots are squarer, so they are cropped
   from the top left to the same proportions */
.i-frames {
  position: relative;
  aspect-ratio: 1917 / 1328;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 32px 64px -16px rgba(0, 0, 0, 0.7);
  background-color: #1B1F27;
}

.i-frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: left top;
  opacity: 0;
  transition: opacity 0.45s ease;
}

.i-frame.shown {
  opacity: 1;
}

/* hot reload: a band passes down the preview each time the step comes round */
.i-refresh {
  position: absolute;
  top: 7%;
  bottom: 0;
  left: 43%;
  width: 46%;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(66, 165, 245, 0.14) 46%, rgba(66, 165, 245, 0.22) 50%, transparent 52%);
  background-size: 100% 220%;
  background-position: 0 100%;
  opacity: 0;
}

.refreshing .i-refresh {
  animation: i-refresh 1.2s ease-in-out 0.3s;
}

@keyframes i-refresh {
  0% { opacity: 1; background-position: 0 100%; }
  85% { opacity: 1; background-position: 0 -10%; }
  100% { opacity: 0; background-position: 0 -10%; }
}

/* Text and rows */

.i-text {
  display: flex;
  flex-direction: column;
}

.i-rows {
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.i-rows li {
  border-top: 1px solid var(--vp-c-divider);
}

.i-rows li:last-child {
  border-bottom: 1px solid var(--vp-c-divider);
}

.i-row {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px 16px 16px 18px;
  margin: 0;
  border: 0;
  border-radius: 0;
  background: none;
  font: inherit;
  text-align: left;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

/* the selected row: a faint wash and a brand rail on the left */
.i-row::before {
  content: "";
  position: absolute;
  left: 0;
  top: 12px;
  bottom: 12px;
  width: 2px;
  border-radius: 2px;
  background-color: var(--vp-c-brand-1);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.i-row.active {
  background-color: rgba(255, 255, 255, 0.035);
}

.i-row.active::before {
  opacity: 1;
}

.i-row:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.i-row:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.i-row-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.i-row strong {
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.i-row:not(.active) strong {
  color: color-mix(in srgb, var(--vp-c-text-1) 80%, transparent);
}

.i-row-description {
  margin-top: 4px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

/* the progress rail: visual only, the timer decides */
.i-rail {
  position: absolute;
  left: 18px;
  right: 16px;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background-color: var(--vp-c-brand-1);
  transform-origin: left;
  animation: i-progress linear forwards;
}

.i-rail.paused {
  animation-play-state: paused;
}

@keyframes i-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.i-hint {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 16px 0 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
}

.i-actions {
  margin-top: 28px;
}

.i-actions :deep(.download-toggle) {
  background-color: rgba(255, 255, 255, 0.1);
}

.i-actions :deep(.download-toggle:hover) {
  background-color: rgba(255, 255, 255, 0.16);
}

@media (prefers-reduced-motion: reduce) {
  .i-frame {
    transition: none;
  }

  .refreshing .i-refresh,
  .i-rail {
    animation: none;
  }
}

/* one column: title and lead, then the screenshot, then the rows that drive it, so a tapped row
   changes a picture that is still on screen */
@media screen and (max-width: 1100px) {
  .custom-page.textured-page .i-stage {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }

  .i-text {
    display: contents;
  }

  .i-text > .card-title { order: 1; }
  .i-text > .card-description { order: 2; }
  .i-visual { order: 3; margin-top: 32px; }
  .i-rows { order: 4; }
  .i-hint { order: 5; }
  .i-actions { order: 6; }
}

/* touch screens have no digit keys to press */
@media (hover: none) {
  .i-hint {
    display: none;
  }
}

</style>

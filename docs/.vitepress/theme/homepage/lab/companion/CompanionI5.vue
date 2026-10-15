<template>
  <!-- I5 · Spotlight tour, nine views: I3 with the views the owner asked for, shown one at a time:
       the whole app, document hierarchy, selected element, magnify, check position, measure, search,
       layout debugging and exception debugging. The whole app is shown evenly lit; every other view
       puts a spotlight on its part of the app (each with its own size) and a callout card where it
       covers nothing that matters. One row: the app, and beside it (right, or left with nav="left") a
       column with the title, the description, the nine views as a list (the current one in the brand
       colour) and the calls to action. The cards show the app's
       shortcuts; the page does not listen to the keyboard. Below 1200px everything stacks (title, app,
       views as a 3x3 grid, actions); below 1040px the card sits under the app too. -->
  <section class="content">
    <div class="panel i5-panel">
      <div ref="root" class="i5-tour" :class="`nav-${nav}`" @mouseenter="hovered = true" @mouseleave="hovered = false" @focusin="focused = true" @focusout="focused = false">
        <div
          class="i5-stage"
          :class="{ overview: !current.focus }"
          :style="{ '--i5-fx': `${focusX * 100}%`, '--i5-fy': `${focusY * 100}%`, '--i5-r': `${current.radius}px` }">
          <TourFrames :current="current.frame" :step-key="step" :aspect="aspect" :frames="frames" :refresh="current.row === 0" class="i5-shot">
            <span class="i5-scrim" aria-hidden="true"></span>
            <span class="i5-marker" aria-hidden="true"></span>
          </TourFrames>

          <Transition name="i5-card" mode="out-in">
            <div :key="step" class="i5-card" :style="{ left: `${current.card[0] * 100}%`, top: `${current.card[1] * 100}%` }" aria-live="polite">
              <strong><i class="fa-regular" :class="view.icon" aria-hidden="true"></i>{{ view.title }}</strong>
              <p>{{ view.description }}</p>
              <div v-if="view.keys.length" class="i5-shortcut">
                <span class="i5-caps">
                  <template v-for="(key, index) of view.keys" :key="key">
                    <span v-if="index > 0 && view.combo" class="i5-plus" aria-hidden="true">+</span>
                    <kbd class="i5-cap" :class="{ pressed: !view.combo && view.keys.length > 1 && current.key === key }">{{ key }}</kbd>
                  </template>
                </span>
                <span class="i5-shortcut-label">{{ view.keysLabel }}</span>
              </div>
            </div>
          </Transition>
        </div>

        <div class="i5-side">
          <h2 class="card-title i5-title">{{ title }}</h2>
          <p class="card-description i5-description">{{ description }}</p>

          <nav class="i5-nav" aria-label="Companion App views">
            <button
              v-for="(item, index) of views"
              :key="item.key"
              type="button"
              class="i5-view"
              :class="{ active: current.row === index }"
              :aria-pressed="current.row === index"
              @click="selectRow(index)">
              <span class="i5-view-label"><i class="fa-regular" :class="item.icon" aria-hidden="true"></i><span class="full">{{ item.label }}</span><span class="short">{{ item.short }}</span></span>
            </button>
          </nav>

          <CompanionActions layout="stack" menu-up :show-platforms="false" class="i5-actions" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import CompanionActions from "./CompanionActions.vue";
import TourFrames from "./TourFrames.vue";
import { description, title, type Capability } from "./companion";
import { useShortcutTour } from "./shortcutTour";

/* which side of the app the list of views sits on */
withDefaults(defineProps<{ nav?: "right" | "left" }>(), { nav: "right" });

interface View extends Capability {
  group: string;
  /* keys pressed together (Ctrl + W) rather than alternatives (3, 4) */
  combo?: boolean;
  /* the list's label: what the reader can do, a verb and its object */
  label: string;
  /* the label on phones, one word */
  short: string;
}

/* the nine views; wording from docs/companion/features.md, shortcuts as documented there */
const views: View[] = [
  { key: "app", group: "Overview", label: "See changes live", short: "Preview", icon: "fa-window-maximize", title: "Application", description: "The document's structure on the left, its live preview on the right. Save your code and the preview refreshes in place.", keys: [], keysLabel: "" },
  { key: "hierarchy", group: "Structure", label: "Browse the structure", short: "Structure", icon: "fa-folder-tree", title: "Document hierarchy", description: "Every element of the document as a tree, in the same shape as your fluent API code.", keys: ["Ctrl", "W"], combo: true, keysLabel: "show or hide the tree" },
  { key: "selection", group: "Structure", label: "Inspect any element", short: "Inspect", icon: "fa-arrow-pointer", title: "Selected element", description: "Select any element to see its page, position and size, and jump to its code in your IDE.", keys: ["Ctrl", "Click"], combo: true, keysLabel: "open its code" },
  { key: "magnify", group: "Inspect", label: "Zoom into details", short: "Zoom", icon: "fa-magnifying-glass-plus", title: "Magnify", description: "See small details up close without zooming the preview.", keys: ["1"], keysLabel: "magnifier" },
  { key: "position", group: "Inspect", label: "Read coordinates", short: "Coordinates", icon: "fa-location-crosshairs", title: "Check position", description: "Point at anything to read its page and its X and Y coordinates.", keys: ["2"], keysLabel: "coordinates" },
  { key: "measure", group: "Inspect", label: "Measure distances", short: "Measure", icon: "fa-ruler-combined", title: "Measure", description: "Measure sizes and distances, vertically or horizontally.", keys: ["3", "4"], keysLabel: "vertical, horizontal" },
  { key: "search", group: "Search", label: "Find any phrase", short: "Search", icon: "fa-magnifying-glass", title: "Search", description: "Find any phrase; matches are highlighted in both the tree and the preview.", keys: ["Ctrl", "F"], combo: true, keysLabel: "find" },
  { key: "layout", group: "Debug", label: "Debug layout issues", short: "Layout", icon: "fa-triangle-exclamation", title: "Layout debugging", description: "When content does not fit, find the likely root cause, with every element color-coded by how it was laid out.", keys: ["↑", "↓"], keysLabel: "previous, next issue" },
  { key: "exception", group: "Debug", label: "Trace exceptions", short: "Exceptions", icon: "fa-bug", title: "Exception debugging", description: "See the exception, its message and the stack trace down to the code that threw.", keys: [], keysLabel: "" }
];

interface Step {
  row: number;
  frame: string;
  key: string | null;
  /* the spotlight's centre as fractions of the screenshot, and the radius of its clear part */
  focus: [number, number] | null;
  radius: number;
  /* the card's top-left corner as fractions of the frame, chosen per screen so it covers nothing
     the view is about */
  card: [number, number];
}

const steps: Step[] = [
  { row: 0, frame: "application", key: null, focus: null, radius: 0, card: [0.035, 0.6] },
  { row: 1, frame: "application", key: null, focus: [0.12, 0.42], radius: 170, card: [0.36, 0.5] },
  { row: 2, frame: "selection", key: null, focus: [0.62, 0.3], radius: 170, card: [0.03, 0.12] },
  { row: 3, frame: "magnifier", key: "1", focus: [0.5, 0.4], radius: 160, card: [0.665, 0.16] },
  { row: 4, frame: "measurement-point", key: "2", focus: [0.6, 0.6], radius: 110, card: [0.17, 0.33] },
  { row: 5, frame: "measurement-vertical", key: "3", focus: [0.497, 0.21], radius: 110, card: [0.035, 0.1] },
  { row: 5, frame: "measurement-horizontal", key: "4", focus: [0.66, 0.6], radius: 130, card: [0.43, 0.18] },
  { row: 6, frame: "search", key: null, focus: [0.655, 0.53], radius: 120, card: [0.035, 0.2] },
  { row: 7, frame: "layout-error", key: null, focus: [0.1, 0.285], radius: 140, card: [0.2, 0.42] },
  { row: 8, frame: "generic-exception", key: null, focus: [0.47, 0.21], radius: 150, card: [0.55, 0.45] }
];

const frames = [...new Set(steps.map(s => s.frame))];

/* the frame is cropped at the bottom to 1.62:1 from the top left; focus heights are fractions of each
   screenshot, so they stretch by the frame's proportion over the screenshot's */
const aspect = 1.62;
const squarer = new Set(["layout-error", "generic-exception"]);

const root = ref<HTMLElement | null>(null);
const { step, current, hovered, focused, selectRow } = useShortcutTour(root, 3800, steps, { keyboard: false });

const view = computed(() => views[current.value.row]);

/* the overview keeps the last focus, so the spotlight fades out where it was instead of jumping */
const lastFocus = ref<[number, number]>([0.5, 0.4]);
watch(current, step => {
  if (step.focus)
    lastFocus.value = step.focus;
}, { immediate: true });
const focusX = computed(() => (current.value.focus ?? lastFocus.value)[0]);
const focusY = computed(() => {
  const [, y] = current.value.focus ?? lastFocus.value;
  const image = squarer.has(current.value.frame) ? 1592 / 1341 : 1917 / 1328;
  return y * aspect / image;
});
</script>

<style>

/* registered so the spotlight glides between places and sizes (global at-rules, hence the prefix) */
@property --i5-fx {
  syntax: "<percentage>";
  inherits: true;
  initial-value: 50%;
}

@property --i5-fy {
  syntax: "<percentage>";
  inherits: true;
  initial-value: 40%;
}

@property --i5-r {
  syntax: "<length>";
  inherits: true;
  initial-value: 140px;
}

</style>

<style scoped>

.i5-panel {
  width: 100%;
}

/* One row: the app, and a column with the words, the list of views and the calls to action */
.i5-tour {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 44px;
  align-items: center;
}

.i5-tour.nav-left {
  grid-template-columns: 360px minmax(0, 1fr);
}

.nav-left .i5-side {
  order: -1;
}

.i5-side {
  display: flex;
  flex-direction: column;
}

/* The stage */

.i5-stage {
  position: relative;
  transition: --i5-fx 0.7s cubic-bezier(0.3, 0.7, 0.2, 1), --i5-fy 0.7s cubic-bezier(0.3, 0.7, 0.2, 1), --i5-r 0.7s cubic-bezier(0.3, 0.7, 0.2, 1);
}

.i5-shot {
  border-radius: 14px;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent), 0 16px 40px -16px rgba(16, 24, 40, 0.22);
}

html.dark .i5-shot {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 16px 40px -16px rgba(0, 0, 0, 0.6);
}

/* everything but a soft circle around the focus is dimmed; the overview has no spotlight */
.i5-scrim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at var(--i5-fx) var(--i5-fy), transparent 0, transparent var(--i5-r), rgba(16, 24, 40, 0.26) calc(var(--i5-r) + 120px));
  transition: opacity 0.5s ease;
}

html.dark .i5-scrim {
  background: radial-gradient(circle at var(--i5-fx) var(--i5-fy), transparent 0, transparent var(--i5-r), rgba(0, 0, 0, 0.45) calc(var(--i5-r) + 120px));
}

.i5-marker {
  position: absolute;
  left: var(--i5-fx);
  top: var(--i5-fy);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent), 0 0 0 1px #FFF;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.i5-marker::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-brand-1);
  animation: i5-ping 1.8s ease-out infinite;
}

@keyframes i5-ping {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(3.2); opacity: 0; }
}

.overview .i5-scrim,
.overview .i5-marker {
  opacity: 0;
}

/* the card: placed per screen */
.i5-card {
  position: absolute;
  width: 290px;
  padding: 18px 20px 20px;
  border-radius: 16px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 9%, transparent), 0 20px 48px -12px rgba(16, 24, 40, 0.3);
}

html.dark .i5-card {
  background-color: var(--vp-c-bg-elv);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 48px -12px rgba(0, 0, 0, 0.7);
}

.i5-card strong {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.i5-card strong i {
  font-size: 15px;
  color: inherit;
}

.i5-card p {
  margin: 6px 0 0;
}

/* Shortcuts: light-grey key caps like a laptop's, a thicker bottom edge for depth, no glow. Keys
   pressed together are joined by a small plus; a quiet caption says what they do. For Measure, the
   key of the screen being shown sits pressed (lower, its edge flattened). */

.i5-shortcut {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin-top: 16px;
}

.i5-caps {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.i5-cap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 26px;
  padding: 0 8px;
  border: 1px solid #D5D9E0;
  border-bottom-width: 3px;
  border-bottom-color: #BFC4CD;
  border-radius: 7px;
  background: linear-gradient(180deg, #F7F8FA, #ECEEF2);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1;
  color: #3B414D;
  transition: transform 0.15s ease, border-bottom-width 0.15s ease;
}

.i5-cap.pressed {
  transform: translateY(2px);
  border-bottom-width: 1px;
  margin-bottom: 2px;
}

.i5-plus {
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.i5-shortcut-label {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
}

/* on the dark card the caps stay light grey, a shade softer */
html.dark .i5-cap {
  border-color: #B9BEC7;
  border-bottom-color: #8E949E;
  background: linear-gradient(180deg, #D9DCE2, #C8CCD3);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
  color: #22262E;
}

.i5-card-enter-active,
.i5-card-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.i5-card-enter-from,
.i5-card-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* The list of views: one row per view; the current one is told apart by colour alone */

.i5-nav {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 24px;
}

.i5-view {
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  font: inherit;
  text-align: left;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: color 0.2s ease;
}

/* icons and words at 1rem in the text colour; the current view in the brand colour and semibold */
.i5-view-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
}

/* phones use the short names */
.i5-view-label .short {
  display: none;
}

.i5-view-label i {
  flex-shrink: 0;
  width: 18px;
  text-align: center;
  font-size: 1rem;
  color: inherit;
}

.i5-view:hover {
  color: var(--vp-c-brand-1);
}

.i5-view.active {
  color: var(--vp-c-brand-1);
}

.i5-view.active .i5-view-label {
  font-weight: 600;
}

.i5-view:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
  border-radius: 4px;
}

.i5-actions {
  margin-top: 28px;
}

@media (prefers-reduced-motion: reduce) {
  .i5-stage,
  .i5-scrim {
    transition: none;
  }

  .i5-marker::after {
    animation: none;
  }
}

/* below 1200px everything stacks: title and description, the app, the views as a 3x3 grid, the
   calls to action */
@media screen and (max-width: 1200px) {
  .i5-tour,
  .i5-tour.nav-left {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    max-width: 920px;
    margin: 0 auto;
  }

  .i5-side {
    display: contents;
  }

  .i5-title { order: 1; }
  .i5-description { order: 2; }
  .i5-stage { order: 3; margin-top: 28px; }
  .i5-nav { order: 4; margin-top: 22px; }
  .i5-actions { order: 5; }

  .i5-nav {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px 10px;
  }

  .i5-view {
    min-height: 32px;
  }
}

/* below 1040px the card would cover too much of a smaller app: it sits under the app */
@media screen and (max-width: 1040px) {
  .i5-card {
    position: relative;
    left: auto !important;
    top: auto !important;
    width: auto;
    margin-top: 16px;
  }
}

@media screen and (max-width: 760px) {
  .i5-view-label .full,
  .i5-view-label i {
    display: none;
  }

  .i5-view-label .short {
    display: inline;
  }
}

</style>

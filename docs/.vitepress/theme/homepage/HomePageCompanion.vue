<template>
  <!-- One row: the app on the left, and beside it the title, the description, the eight views as a
       two-column list and the calls to action. The app is a tour: the whole app first, then one view at
       a time with a marker on its part of the app and a card placed so it covers nothing the view is
       about, naming the feature and showing its shortcut. The tour moves on by itself
       (companionTour.ts); the list picks a view, the current one in the brand colour.
       Below 1320px everything stacks (title, app, views as two rows of one-word names, actions); below
       1040px the card sits under the app. -->
  <div class="panel">
    <div ref="root" class="companion-tour" @mouseenter="hovered = true" @mouseleave="hovered = false" @focusin="focused = true" @focusout="focused = false">
      <div
        class="companion-stage"
        :class="{ overview: !current.focus }"
        :style="{ '--companion-fx': `${focusX * 100}%`, '--companion-fy': `${focusY * 100}%` }">

        <!-- the screens, stacked and cross-fading, in the reader's theme, all cropped from the top left
             to one proportion (the layout error screenshot is squarer, so it shows larger) -->
        <div class="companion-frames" :style="{ aspectRatio: String(aspect) }">
          <template v-for="frame of frames" :key="frame">
            <img :src="`/companion/${frame}-light.webp`" :alt="frame === current.frame ? 'QuestPDF Companion App' : ''" class="companion-frame light" :class="{ shown: frame === current.frame }" loading="lazy" />
            <img :src="`/companion/${frame}-dark.webp`" :alt="frame === current.frame ? 'QuestPDF Companion App' : ''" class="companion-frame dark" :class="{ shown: frame === current.frame }" loading="lazy" />
          </template>

          <!-- hot reload: a faint band passes down the page each time the overview comes round -->
          <span v-if="current.view === 0" :key="step" class="companion-refresh" aria-hidden="true"></span>
          <span class="companion-marker" aria-hidden="true"></span>
        </div>

        <Transition name="companion-card" mode="out-in">
          <div :key="step" class="companion-card" :style="{ left: `min(${current.card[0] * 100}%, 100% - 12px - var(--companion-card-width))`, top: `${current.card[1] * 100}%` }" aria-live="polite">
            <strong><i class="fa-regular" :class="view.icon" aria-hidden="true"></i>{{ view.title }}</strong>
            <p>{{ view.description }}</p>
            <div v-if="shortcut.keys.length" class="companion-shortcut">
              <span class="companion-shortcut-label">Shortcut</span>
              <span class="companion-caps">
                <template v-for="(key, index) of shortcut.keys" :key="key">
                  <span v-if="index > 0 && shortcut.combo" class="companion-plus" aria-hidden="true">+</span>
                  <kbd class="companion-cap">{{ key }}</kbd>
                </template>
              </span>
            </div>
          </div>
        </Transition>
      </div>

      <div class="companion-side">
        <h2 class="card-title companion-title">Preview, inspect and debug</h2>
        <p class="card-description companion-description">The Companion App refreshes your document the moment you save: no recompiling, no restarting. Inspect any element, measure the layout and trace issues to their cause.</p>

        <nav class="companion-views" aria-label="Companion App views">
          <button
            v-for="(item, index) of views"
            :key="item.title"
            type="button"
            class="companion-view"
            :class="{ active: current.view === index }"
            :aria-pressed="current.view === index"
            @click="selectView(index)">
            <i class="fa-regular" :class="item.icon" aria-hidden="true"></i>
            <span class="full">{{ item.label }}</span>
            <span class="short">{{ item.short }}</span>
          </button>
        </nav>

        <div class="actions">
          <a class="action primary" href="/companion/features.html">Explore features</a>

          <!-- a real button: the VitePress router ignores clicks inside buttons, so it will not try to navigate -->
          <div ref="downloadRef" class="download">
            <button
              type="button"
              class="action download-toggle"
              aria-haspopup="menu"
              :aria-expanded="isDownloadOpen"
              @click="isDownloadOpen = !isDownloadOpen">
              Download
              <i class="fa-regular fa-chevron-down download-chevron" :class="{ open: isDownloadOpen }"></i>
            </button>

            <div v-if="isDownloadOpen" class="download-menu" role="menu">
              <a
                v-for="download of downloads"
                :key="download.url"
                class="download-item"
                role="menuitem"
                :href="download.url"
                @click="isDownloadOpen = false">
                <img :src="`/homepage/supported-platforms/${download.src}`" alt="" />
                <span class="download-name">{{ download.name }}</span>
                <span class="download-format">{{ download.format }}</span>
              </a>

              <a class="download-all" role="menuitem" href="/companion/download.html" @click="isDownloadOpen = false">
                All versions
                <i class="fa-regular fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useCompanionTour } from "./companionTour";

interface View {
  icon: string;
  /* the list's label: what the reader can do, a verb and its object */
  label: string;
  /* the label on phones, one word */
  short: string;
  /* the card: the feature's name, one line about it, and its keyboard shortcut as documented (only key
     presses: a mouse gesture goes in the description, the layout issue arrows are buttons in the app) */
  title: string;
  description: string;
  keys: string[];
  /* keys pressed together (Ctrl + W) */
  combo?: boolean;
}

/* wording from docs/companion/features.md, shortcuts as documented there */
const views: View[] = [
  { label: "See changes live", short: "Preview", icon: "fa-window-maximize", title: "Application", description: "The document's structure on the left, its live preview on the right. Save your code and the preview refreshes in place.", keys: [] },
  { label: "Browse the structure", short: "Structure", icon: "fa-folder-tree", title: "Document hierarchy", description: "Every element of the document as a tree, in the same shape as your fluent API code.", keys: ["Ctrl", "W"], combo: true },
  { label: "Inspect any element", short: "Inspect", icon: "fa-arrow-pointer", title: "Selected element", description: "Double-click any element to see its configuration, position and size, on every page it appears.", keys: [] },
  { label: "Zoom into details", short: "Zoom", icon: "fa-magnifying-glass-plus", title: "Magnify", description: "See small details up close without zooming the preview.", keys: ["1"] },
  { label: "Read coordinates", short: "Coordinates", icon: "fa-location-crosshairs", title: "Check position", description: "Point at anything to read its page and its X and Y coordinates.", keys: ["2"] },
  { label: "Measure distances", short: "Measure", icon: "fa-ruler-combined", title: "Measure", description: "Measure sizes and distances, vertically or horizontally. Check margins, padding and spacing instead of guessing.", keys: [] },
  { label: "Find any phrase", short: "Search", icon: "fa-magnifying-glass", title: "Search", description: "Find any phrase; matches are highlighted in both the tree and the preview.", keys: ["Ctrl", "F"], combo: true },
  { label: "Debug layout issues", short: "Layout", icon: "fa-bug", title: "Layout debugging", description: "When content does not fit, find the likely root cause, with every element color-coded by how it was laid out.", keys: [] }
];

interface Step {
  view: number;
  /* the screenshot in public/companion */
  frame: string;
  /* the shortcut of this screen, when the view has one per screen (Measure: 3 vertically, 4 horizontally) */
  keys?: string[];
  /* the marker's place as fractions of the screenshot (null: the whole app, no marker) */
  focus: [number, number] | null;
  /* the card's top-left corner as fractions of the frame, set per screen so it covers nothing the view
     is about (kept clear of the right edge); check these whenever a screenshot changes */
  card: [number, number];
}

const steps: Step[] = [
  { view: 0, frame: "application", focus: null, card: [0.035, 0.48] },
  { view: 1, frame: "application", focus: [0.12, 0.42], card: [0.36, 0.44] },
  { view: 2, frame: "selection", focus: [0.62, 0.3], card: [0.03, 0.12] },
  { view: 3, frame: "magnifier", focus: [0.5, 0.4], card: [0.665, 0.16] },
  { view: 4, frame: "measurement-point", focus: [0.6, 0.6], card: [0.03, 0.33] },
  { view: 5, frame: "measurement-vertical", keys: ["3"], focus: [0.497, 0.21], card: [0.02, 0.31] },
  { view: 5, frame: "measurement-horizontal", keys: ["4"], focus: [0.66, 0.6], card: [0.015, 0.085] },
  { view: 6, frame: "search", focus: [0.655, 0.53], card: [0.035, 0.2] },
  { view: 7, frame: "layout-error", focus: [0.1, 0.285], card: [0.2, 0.42] }
];

const frames = [...new Set(steps.map(s => s.frame))];

/* the frame is cropped at the bottom to 1.62:1 from the top left; focus heights are fractions of each
   screenshot, so they stretch by the frame's proportion over the screenshot's */
const aspect = 1.62;
const imageRatios: Record<string, number> = {
  "layout-error": 1592 / 1341
};

const root = ref<HTMLElement | null>(null);
const { step, current, hovered, focused, selectView } = useCompanionTour(root, steps, 3800);

const view = computed(() => views[current.value.view]);

/* the card shows only the shortcut of the screen being shown */
const shortcut = computed(() => ({
  keys: current.value.keys ?? view.value.keys,
  combo: view.value.combo
}));

/* the overview keeps the last focus, so the marker fades out where it was instead of jumping */
const lastFocus = ref<[number, number]>([0.5, 0.4]);
watch(current, s => {
  if (s.focus)
    lastFocus.value = s.focus;
}, { immediate: true });

const focusX = computed(() => (current.value.focus ?? lastFocus.value)[0]);
const focusY = computed(() => {
  const [, y] = current.value.focus ?? lastFocus.value;
  return y * aspect / (imageRatios[current.value.frame] ?? 1917 / 1328);
});


/* Download menu */

// keep in sync with the latest release listed in docs/companion/download.md
const companionVersion = "2026.2.2";
const releaseUrl = `https://github.com/QuestPDF/QuestPDF.Companion/releases/download/${companionVersion}`;

const downloads = [
  { src: "windows.svg", name: "Windows", format: ".msix", url: `${releaseUrl}/questpdf_companion-${companionVersion}-windows.msix` },
  { src: "apple.svg", name: "macOS", format: ".dmg", url: `${releaseUrl}/QuestPDF.Companion.${companionVersion}.dmg` },
  { src: "linux.svg", name: "Linux", format: ".deb", url: `${releaseUrl}/questpdf_companion-${companionVersion}-linux.deb` },
  { src: "linux.svg", name: "Linux", format: ".rpm", url: `${releaseUrl}/questpdf_companion-${companionVersion}-linux.rpm` }
];

const isDownloadOpen = ref(false);
const downloadRef = ref<HTMLElement | null>(null);

function closeOnOutsideClick(event: MouseEvent) {
  if (downloadRef.value && !downloadRef.value.contains(event.target as Node))
    isDownloadOpen.value = false;
}

function closeOnEscape(event: KeyboardEvent) {
  if (event.key === "Escape")
    isDownloadOpen.value = false;
}

onMounted(() => {
  document.addEventListener("click", closeOnOutsideClick);
  document.addEventListener("keydown", closeOnEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeOnOutsideClick);
  document.removeEventListener("keydown", closeOnEscape);
});

</script>

<style>

/* registered so the marker glides between places; @property is global, hence the prefix */
@property --companion-fx {
  syntax: "<percentage>";
  inherits: true;
  initial-value: 50%;
}

@property --companion-fy {
  syntax: "<percentage>";
  inherits: true;
  initial-value: 40%;
}

</style>

<style scoped>

/* One row: the app, and a column with the words, the list of views and the calls to action */

.companion-tour {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 480px;
  gap: 48px;
  align-items: center;
}

.companion-side {
  display: flex;
  flex-direction: column;
}


/* The stage: the app with its marker; the card is placed in the stage's coordinates */

.companion-stage {
  position: relative;
  transition: --companion-fx 0.7s cubic-bezier(0.3, 0.7, 0.2, 1), --companion-fy 0.7s cubic-bezier(0.3, 0.7, 0.2, 1);
}

.companion-frames {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent), 0 16px 40px -16px rgba(16, 24, 40, 0.22);
}

html.dark .companion-frames {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 16px 40px -16px rgba(0, 0, 0, 0.6);
}

.companion-frame {
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

.companion-frame.shown {
  opacity: 1;
}

html:not(.dark) .companion-frame.dark,
html.dark .companion-frame.light {
  display: none;
}

.companion-refresh {
  position: absolute;
  top: 7%;
  bottom: 0;
  left: 43%;
  width: 46%;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent) 46%, color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent) 50%, transparent 52%);
  background-size: 100% 220%;
  background-position: 0 100%;
  opacity: 0;
  animation: companion-refresh 1.2s ease-in-out 0.35s;
}

@keyframes companion-refresh {
  0% { opacity: 1; background-position: 0 100%; }
  85% { opacity: 1; background-position: 0 -10%; }
  100% { opacity: 0; background-position: 0 -10%; }
}

/* the marker: a brand dot in a white ring with a shadow, so it stands out on any screen in either
   theme, and a ring that keeps pulsing out of it; the overview has none */
.companion-marker {
  position: absolute;
  left: var(--companion-fx);
  top: var(--companion-fy);
  width: 20px;
  height: 20px;
  border: 3px solid #FFF;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 1px rgba(16, 24, 40, 0.16), 0 2px 8px rgba(16, 24, 40, 0.4);
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.companion-marker::after {
  content: "";
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 3px solid var(--vp-c-brand-1);
  animation: companion-ping 1.6s ease-out infinite;
}

@keyframes companion-ping {
  0% { transform: scale(1); opacity: 0.9; }
  100% { transform: scale(2.6); opacity: 0; }
}

.overview .companion-marker {
  opacity: 0;
}


/* The card */

/* narrower on a smaller app, so it still leaves the view's subject in sight; a faint brand tint, kept
   opaque, sets it apart from the app behind it */
.companion-card {
  --companion-card-width: clamp(210px, 30%, 240px);
  position: absolute;
  width: var(--companion-card-width);
  padding: 12px 14px 14px;
  border-radius: 12px;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 5%, var(--vp-c-bg));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent), 0 20px 48px -12px rgba(16, 24, 40, 0.3);
}

html.dark .companion-card {
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 7%, var(--vp-c-bg-elv));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent), 0 20px 48px -12px rgba(0, 0, 0, 0.7);
}

.companion-card strong {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9375rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.companion-card strong i {
  font-size: 15px;
}

.companion-card p {
  margin: 4px 0 0;
  font-size: inherit;
  line-height: inherit;
}

.companion-card-enter-active,
.companion-card-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.companion-card-enter-from,
.companion-card-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* Shortcuts: a footer strip across the card (a hairline and a faint tint, in place of the card's bottom
   padding, so the card keeps its height), a quiet "Shortcut" on the left and the keys of the screen being
   shown on the right, as light-grey key caps with a thicker bottom edge, no glow; keys pressed together are
   joined by a small plus */

.companion-shortcut {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 10px -14px -14px;
  padding: 7px 14px;
  border-top: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  border-radius: 0 0 12px 12px;
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 4%, transparent);
}

.companion-caps {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.companion-cap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 20px;
  padding: 0 6px;
  border: 1px solid #D5D9E0;
  border-bottom-width: 2px;
  border-bottom-color: #BFC4CD;
  border-radius: 5px;
  background: linear-gradient(180deg, #F7F8FA, #ECEEF2);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
  font-family: var(--vp-font-family-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1;
  color: #3B414D;
}

/* on the dark card the caps stay light grey, a shade softer */
html.dark .companion-cap {
  border-color: #B9BEC7;
  border-bottom-color: #8E949E;
  background: linear-gradient(180deg, #D9DCE2, #C8CCD3);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
  color: #22262E;
}

.companion-plus {
  font-family: var(--vp-font-family-mono);
  font-size: 0.6875rem;
  color: var(--vp-c-text-3);
}

.companion-shortcut-label {
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
}


/* The list of views: two columns filled top to bottom, icons and words at 1rem in the text colour, the
   current view in the brand colour and semibold; phones use the one-word names */

.companion-views {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(4, auto);
  grid-auto-flow: column;
  gap: 3px 24px;
  margin-top: 24px;
}

.companion-view {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 36px;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
  font: inherit;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  text-align: left;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: color 0.2s ease;
}

.companion-view i {
  flex-shrink: 0;
  width: 18px;
  text-align: center;
  font-size: 1rem;
}

.companion-view .short {
  display: none;
}

.companion-view:hover,
.companion-view.active {
  color: var(--vp-c-brand-1);
}

.companion-view.active {
  font-weight: 600;
}

.companion-view:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
  border-radius: 4px;
}


/* Calls to action; the download menu opens upwards, over the list */

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.download {
  position: relative;
}

/* the shared .action button (CustomPages.css), with room for the chevron */
.download-toggle {
  display: inline-flex;
  gap: 10px;
}

.download-chevron {
  font-size: 0.75em;
  transition: transform 0.2s ease;
}

.download-chevron.open {
  transform: rotate(180deg);
}

.download-menu {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  z-index: 10;
  min-width: 240px;
  padding: 6px;
  display: flex;
  flex-direction: column;
  background-color: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: var(--elevation);
}

.download-item,
.download-all {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  white-space: nowrap;
}

.download-item:hover,
.download-all:hover {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.download-item img {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.download-name {
  flex: 1;
  font-weight: 500;
}

.download-format {
  color: var(--vp-c-text-3);
}

.download-all {
  margin-top: 6px;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  justify-content: space-between;
  color: var(--vp-c-text-2);
}


@media (prefers-reduced-motion: reduce) {
  .companion-stage,
  .companion-frame {
    transition: none;
  }

  .companion-marker::after,
  .companion-refresh {
    animation: none;
  }
}

/* below 1320px everything stacks: title and description, the app, the views as two rows of four
   one-word names, the calls to action; beside the words a narrower app would leave the card too
   little room */
@media screen and (max-width: 1320px) {
  .companion-tour {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    max-width: 920px;
    margin: 0 auto;
  }

  .companion-side {
    display: contents;
  }

  .companion-title { order: 1; }
  .companion-description { order: 2; }
  .companion-stage { order: 3; margin-top: 28px; }
  .companion-views { order: 4; margin-top: 22px; }
  .actions { order: 5; }

  .companion-views {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: none;
    grid-auto-flow: row;
    gap: 12px 10px;
  }

  .companion-view {
    min-height: 32px;
  }

  .companion-view .full {
    display: none;
  }

  .companion-view .short {
    display: inline;
  }
}

/* below 1040px the card would cover too much of a smaller app: it sits under the app */
@media screen and (max-width: 1040px) {
  .companion-card {
    position: relative;
    left: auto !important;
    top: auto !important;
    width: auto;
    margin-top: 16px;
  }
}

@media screen and (max-width: 760px) {
  .companion-views {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(4, auto);
    grid-auto-flow: column;
  }
}

</style>

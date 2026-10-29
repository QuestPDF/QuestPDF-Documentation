<template>
  <div class="panel">
    <div ref="root" class="companion-tour" @mouseenter="hovered = true" @mouseleave="hovered = false" @focusin="focused = true" @focusout="focused = false">
      <div class="companion-stage" :class="{ overview: !current.focus }" :style="marker">

        <div class="companion-frames">
          <template v-for="frame of frames" :key="frame">
            <img :src="`/companion/${frame}-light.webp`" :alt="frame === current.frame ? 'QuestPDF Companion App' : ''" class="companion-frame light" :class="{ shown: frame === current.frame }" loading="lazy" />
            <img :src="`/companion/${frame}-dark.webp`" :alt="frame === current.frame ? 'QuestPDF Companion App' : ''" class="companion-frame dark" :class="{ shown: frame === current.frame }" loading="lazy" />
          </template>

          <span v-if="current.view === 0" :key="step" class="companion-refresh" aria-hidden="true"></span>
          <span class="companion-marker" aria-hidden="true"></span>
        </div>

        <Transition name="companion-card" mode="out-in">
          <div :key="step" class="companion-card" :style="{ '--card-x': `${current.card[0] * 100}%`, '--card-y': `${current.card[1] * 100}%` }" aria-live="polite">
            <strong><i class="fa-regular" :class="view.icon" aria-hidden="true"></i>{{ view.title }}</strong>
            <p>{{ view.description }}</p>
            <div v-if="current.keys" class="companion-shortcut">
              <span class="companion-shortcut-label">Shortcut</span>
              <span class="companion-caps">
                <template v-for="(key, index) of current.keys" :key="key">
                  <span v-if="index > 0" class="companion-plus" aria-hidden="true">+</span>
                  <kbd class="companion-cap">{{ key }}</kbd>
                </template>
              </span>
            </div>
          </div>
        </Transition>
      </div>

      <div class="companion-side">
        <h2 class="card-title companion-title">Preview, inspect and debug</h2>
        <p class="card-description companion-description">The Companion App runs beside your IDE on Windows, macOS and Linux, and connects to your project with a single line of code.</p>

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

          <!-- a <button>, not a link: the VitePress router would navigate on a link click -->
          <div ref="downloadRef" class="download">
            <button
              type="button"
              class="action download-toggle"
              :aria-expanded="isDownloadOpen"
              @click="toggleDownload">
              Download
              <i class="fa-regular fa-chevron-down download-chevron" aria-hidden="true"></i>
            </button>

            <div v-if="isDownloadOpen" ref="downloadMenuRef" class="download-menu" :class="{ below: isDownloadBelow }">
              <a
                v-for="download of downloads"
                :key="download.url"
                class="download-item"
                :href="download.url"
                @click="isDownloadOpen = false">
                <i class="fa-brands download-icon" :class="download.icon" aria-hidden="true"></i>
                <span class="download-name">{{ download.name }}</span>
                <span class="download-format">{{ download.format }}</span>
              </a>

              <a class="download-all" href="/companion/download.html" @click="isDownloadOpen = false">
                All versions
                <i class="fa-regular fa-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useCompanionTour } from "./companionTour";

interface View {
  icon: string;
  label: string;
  /* the label on phones */
  short: string;
  title: string;
  description: string;
}

/* wording from docs/companion/features.md */
const views: View[] = [
  { label: "See changes live", short: "Preview", icon: "fa-window-maximize", title: "Application", description: "The document's structure on the left, its live preview on the right. Save your code and the preview refreshes in place." },
  { label: "Browse the structure", short: "Structure", icon: "fa-folder-tree", title: "Document hierarchy", description: "Every element of the document as a tree, in the same shape as your fluent API code." },
  { label: "Inspect any element", short: "Inspect", icon: "fa-arrow-pointer", title: "Selected element", description: "Double-click any element to see its configuration, position and size, on every page it appears." },
  { label: "Zoom into details", short: "Zoom", icon: "fa-magnifying-glass-plus", title: "Magnify", description: "See small details up close without zooming the preview." },
  { label: "Read coordinates", short: "Coordinates", icon: "fa-location-crosshairs", title: "Check position", description: "Point at anything to read its page and its X and Y coordinates." },
  { label: "Measure distances", short: "Measure", icon: "fa-ruler-combined", title: "Measure", description: "Measure sizes and distances, vertically or horizontally. Check margins, padding and spacing instead of guessing." },
  { label: "Find any phrase", short: "Search", icon: "fa-magnifying-glass", title: "Search", description: "Find any phrase; matches are highlighted in both the tree and the preview." },
  { label: "Debug layout issues", short: "Layout", icon: "fa-bug", title: "Layout debugging", description: "When content does not fit, find the likely root cause, with every element color-coded by how it was laid out." }
];

/* Places are fractions of the cropped frame (see .companion-frames): check them whenever a screenshot changes. */
interface Step {
  view: number;
  /* the screenshot in public/companion */
  frame: string;
  keys?: string[];
  /* null: the whole app, no marker */
  focus: [number, number] | null;
  card: [number, number];
}

const steps: Step[] = [
  { view: 0, frame: "application", focus: null, card: [0.035, 0.48] },
  { view: 1, frame: "application", keys: ["Ctrl", "W"], focus: [0.12, 0.4713], card: [0.36, 0.44] },
  { view: 2, frame: "selection", focus: [0.62, 0.3367], card: [0.03, 0.12] },
  { view: 3, frame: "magnifier", keys: ["1"], focus: [0.5, 0.4489], card: [0.665, 0.16] },
  { view: 4, frame: "measurement-point", keys: ["2"], focus: [0.6, 0.6734], card: [0.03, 0.33] },
  { view: 5, frame: "measurement-vertical", keys: ["3"], focus: [0.497, 0.2357], card: [0.02, 0.31] },
  { view: 5, frame: "measurement-horizontal", keys: ["4"], focus: [0.66, 0.6734], card: [0.015, 0.085] },
  { view: 6, frame: "search", keys: ["Ctrl", "F"], focus: [0.655, 0.5948], card: [0.035, 0.2] },
  { view: 7, frame: "layout-error", focus: [0.1, 0.3889], card: [0.2, 0.42] }
];

const frames = [...new Set(steps.map(s => s.frame))];

const root = ref<HTMLElement | null>(null);
const { step, current, hovered, focused, selectView } = useCompanionTour(root, steps, 3800);

const view = computed(() => views[current.value.view]);

/* the overview keeps the last focus, so the marker fades out where it was instead of jumping */
const lastFocus = ref<[number, number]>([0.5, 0.4489]);
watch(current, s => {
  if (s.focus)
    lastFocus.value = s.focus;
});

const marker = computed(() => {
  const [x, y] = current.value.focus ?? lastFocus.value;
  return { "--companion-fx": `${x * 100}%`, "--companion-fy": `${y * 100}%` };
});


/* Download menu */

/* the latest release; keep in sync with docs/companion/download.md and public/companion/latest-version */
const companionVersion = "2026.2.2";
const releaseUrl = `https://github.com/QuestPDF/QuestPDF.Companion/releases/download/${companionVersion}`;

const downloads = [
  { icon: "fa-windows", name: "Windows", format: ".msix", url: `${releaseUrl}/questpdf_companion-${companionVersion}-windows.msix` },
  { icon: "fa-apple", name: "macOS", format: ".dmg", url: `${releaseUrl}/QuestPDF.Companion.${companionVersion}.dmg` },
  { icon: "fa-linux", name: "Linux", format: ".deb", url: `${releaseUrl}/questpdf_companion-${companionVersion}-linux.deb` },
  { icon: "fa-linux", name: "Linux", format: ".rpm", url: `${releaseUrl}/questpdf_companion-${companionVersion}-linux.rpm` }
];

const isDownloadOpen = ref(false);
const isDownloadBelow = ref(false);
const downloadRef = ref<HTMLElement | null>(null);
const downloadMenuRef = ref<HTMLElement | null>(null);

/* opens upwards unless the navbar would cover it and there is more room below; measured before the browser paints it */
async function toggleDownload() {
  isDownloadOpen.value = !isDownloadOpen.value;

  if (!isDownloadOpen.value)
    return;

  await nextTick();

  const menu = downloadMenuRef.value;
  const anchor = menu?.offsetParent;

  if (!menu || !anchor)
    return;

  const height = menu.offsetHeight + 8;
  const { top, bottom } = anchor.getBoundingClientRect();
  const navbarBottom = Math.max(0, document.querySelector(".VPNav")?.getBoundingClientRect().bottom ?? 0);

  const roomAbove = top - navbarBottom;
  const roomBelow = window.innerHeight - bottom;
  isDownloadBelow.value = roomAbove < height && roomBelow > roomAbove;
}

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

<style scoped>

/* registered so the marker glides between places; @property is global even in a scoped block, hence the prefix */
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


.companion-stage {
  position: relative;
  transition: --companion-fx 0.7s cubic-bezier(0.3, 0.7, 0.2, 1), --companion-fy 0.7s cubic-bezier(0.3, 0.7, 0.2, 1);
}

.companion-frames {
  position: relative;
  aspect-ratio: 1.62;
  overflow: hidden;
  border-radius: 14px;
  background-color: var(--vp-c-bg);
  box-shadow:
      0 0 0 1px light-dark(color-mix(in srgb, var(--vp-c-text-1) 10%, transparent), rgba(255, 255, 255, 0.08)),
      0 16px 40px -16px light-dark(rgba(16, 24, 40, 0.22), rgba(0, 0, 0, 0.6));
}

.companion-frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
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


.companion-card {
  --companion-card-width: clamp(210px, 30%, 240px);
  position: absolute;
  left: min(var(--card-x), 100% - 12px - var(--companion-card-width));
  top: var(--card-y);
  width: var(--companion-card-width);
  padding: 12px 14px 14px;
  border-radius: 12px;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  background-color: light-dark(color-mix(in srgb, var(--vp-c-brand-1) 5%, var(--vp-c-bg)), color-mix(in srgb, var(--vp-c-brand-1) 7%, var(--vp-c-bg-elv)));
  box-shadow:
      0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent),
      0 20px 48px -12px light-dark(rgba(16, 24, 40, 0.3), rgba(0, 0, 0, 0.7));
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
  font-size: 1rem;
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
  border: 1px solid light-dark(#D5D9E0, #B9BEC7);
  border-bottom-width: 2px;
  border-bottom-color: light-dark(#BFC4CD, #8E949E);
  border-radius: 5px;
  background: linear-gradient(180deg, light-dark(#F7F8FA, #D9DCE2), light-dark(#ECEEF2, #C8CCD3));
  box-shadow: inset 0 1px 0 light-dark(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.45));
  font-family: var(--vp-font-family-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1;
  color: light-dark(#3B414D, #22262E);
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
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  text-align: left;
  color: var(--vp-c-text-1);
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


.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.download {
  position: relative;
}

.download-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.download-chevron {
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.download-toggle[aria-expanded="true"] .download-chevron {
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

.download-menu.below {
  top: calc(100% + 8px);
  bottom: auto;
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
  white-space: nowrap;
}

.download-item:hover,
.download-all:hover {
  background-color: var(--vp-c-default-soft);
}

.download-icon {
  flex-shrink: 0;
  width: 18px;
  text-align: center;
  font-size: 1.0625rem;
  color: var(--vp-c-text-2);
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

@media screen and (max-width: 1040px) {
  .companion-card {
    position: relative;
    left: auto;
    top: auto;
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

/* measured on the tour itself, so a classic scrollbar or a zoom level cannot fool it */
.companion-tour {
  container-type: inline-size;
}

@container (max-width: 249px) {
  .companion-views {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: none;
    grid-auto-flow: row;
  }
}

@media (pointer: coarse) {
  .companion-views {
    row-gap: 0;
  }

  .companion-view {
    min-height: 44px;
  }
}

@container (max-width: 440px) {
  .actions {
    position: relative;
  }

  .download {
    position: static;
  }

  .download-menu {
    right: 0;
    min-width: 0;
  }
}

</style>

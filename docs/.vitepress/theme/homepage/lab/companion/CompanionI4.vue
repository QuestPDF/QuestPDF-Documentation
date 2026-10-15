<template>
  <!-- I4 · Key deck: the live-shortcut idea made tactile. The app above, and under it an inset deck of
       real-looking key caps, one group per capability with its name and explanation under it: the
       caps are buttons, the selected group lights up, and the digits on the reader's keyboard press
       the caps on screen as they change the app. Hot reload is shown as saving (Ctrl S, the trigger in
       Visual Studio's Hot Reload on Save and in dotnet watch); clicking the caps is safe, the real
       Ctrl S is never intercepted. -->
  <section class="content">
    <div class="panel i4-panel">
      <div class="i4-header">
        <div>
          <h2 class="card-title">{{ title }}</h2>
          <p class="card-description">{{ description }}</p>
        </div>
        <CompanionActions layout="stack" menu-end class="i4-actions" />
      </div>

      <div ref="root" class="i4-tour" @mouseenter="hovered = true" @mouseleave="hovered = false" @focusin="focused = true" @focusout="focused = false">
        <div class="i4-screen">
          <TourFrames :current="current.frame" :step-key="step" :aspect="1.7" class="i4-shot" />
        </div>

        <ul class="i4-deck" aria-label="What the Companion App does">
          <li v-for="(group, index) of groups" :key="group.capability.key" class="i4-group" :class="{ active: current.row === index }">
            <div class="i4-caps">
              <template v-for="(cap, capIndex) of group.caps" :key="cap.label">
                <span v-if="cap.join && capIndex > 0" class="i4-plus" aria-hidden="true">+</span>
                <button
                  type="button"
                  class="i4-cap"
                  :class="{ wide: cap.wide, arrow: cap.label === '↑' || cap.label === '↓', lit: isLit(index, cap), down: pressedKey !== null && pressedKey === cap.key }"
                  :aria-label="`${group.capability.title}: ${cap.title ?? cap.label}`"
                  :aria-pressed="current.row === index"
                  @click="press(index, cap)">
                  <i v-if="cap.icon" class="fa-regular" :class="cap.icon" aria-hidden="true"></i>
                  <span v-else>{{ cap.label }}</span>
                </button>
              </template>
            </div>
            <div class="i4-label">
              <strong>{{ group.capability.title }}</strong>
              <p>{{ group.capability.description }}</p>
              <span class="i4-now" :class="{ shown: current.row === index }">{{ current.row === index ? (current.key ? `${current.key} · ${current.label}` : current.label) : "\u00A0" }}</span>
              <span class="i4-progress-track" aria-hidden="true">
                <span v-if="current.row === index" :key="step" class="i4-progress" :class="{ paused: isPaused }" :style="{ animationDuration: `${dwell}ms` }"></span>
              </span>
            </div>
          </li>
        </ul>

        <p class="i4-hint"><i class="fa-regular fa-keyboard" aria-hidden="true"></i>Press 1, 2, 3 or 4 on your keyboard</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CompanionActions from "./CompanionActions.vue";
import TourFrames from "./TourFrames.vue";
import { capabilities, description, title } from "./companion";
import { tourSteps, useShortcutTour } from "./shortcutTour";

const root = ref<HTMLElement | null>(null);
const { step, current, isPaused, hovered, focused, pressedKey, dwell, selectStep, selectRow } = useShortcutTour(root);

interface Cap {
  label: string;
  title?: string;
  icon?: string;
  /* the digit this cap stands for (selects that screen) */
  key?: string;
  wide?: boolean;
  /* joined to the cap before it with a plus */
  join?: boolean;
}

const groups: { capability: typeof capabilities[number]; caps: Cap[] }[] = [
  { capability: capabilities[0], caps: [{ label: "Ctrl", wide: true }, { label: "S", join: true }] },
  { capability: capabilities[1], caps: [{ label: "Ctrl", wide: true }, { label: "Click", title: "Click", icon: "fa-computer-mouse", join: true }] },
  { capability: capabilities[2], caps: [{ label: "1", key: "1" }, { label: "2", key: "2" }, { label: "3", key: "3" }, { label: "4", key: "4" }] },
  { capability: capabilities[3], caps: [{ label: "↑", title: "Previous issue" }, { label: "↓", title: "Next issue" }] }
];

function isLit(row: number, cap: Cap) {
  if (current.value.row !== row)
    return false;
  return cap.key ? cap.key === current.value.key : true;
}

function press(row: number, cap: Cap) {
  if (cap.key)
    selectStep(tourSteps.findIndex(s => s.key === cap.key));
  else
    selectRow(row);
}
</script>

<style scoped>

.i4-panel {
  width: 100%;
}

.i4-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px 64px;
}

.i4-header > div:first-child {
  max-width: 620px;
}

.i4-actions {
  flex-shrink: 0;
  align-items: flex-end !important;
}

.i4-tour {
  max-width: 1000px;
  margin: 40px auto 0;
}

/* the screen is narrower than the deck it stands on */
.i4-screen {
  max-width: 780px;
  margin: 0 auto;
}

.i4-shot {
  border-radius: 12px 12px 0 0;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent);
}

html.dark .i4-shot {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
}

/* The deck: an inset plate the screen stands on, one group of caps per capability */

.i4-deck {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 0;
  padding: 24px 12px 18px;
  border-radius: 22px;
  background-color: var(--home-surface-inner);
  box-shadow: inset 0 1px 0 color-mix(in srgb, var(--vp-c-text-1) 6%, transparent);
  list-style: none;
}

.i4-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 0 16px;
  border-left: 1px solid var(--vp-c-divider);
}

.i4-group:first-child {
  border-left: 0;
}

.i4-caps {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 52px;
}

.i4-plus {
  font-family: var(--vp-font-family-mono);
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

/* a key cap: a light face on a darker skirt, pressed by moving the face down onto it */
.i4-cap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 46px;
  height: 44px;
  padding: 0 12px;
  margin: 0;
  border: 1px solid rgba(16, 24, 40, 0.12);
  border-radius: 10px;
  background: linear-gradient(180deg, #FFFFFF, #F5F6F9);
  box-shadow: 0 4px 0 #D3D7DF, 0 6px 12px -4px rgba(16, 24, 40, 0.2);
  font-family: var(--vp-font-family-mono);
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transform: translateY(0);
  transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.2s ease, color 0.2s ease;
}

.i4-cap.wide {
  min-width: 64px;
}

/* arrows are small glyphs in a monospaced font */
.i4-cap.arrow {
  font-family: var(--vp-font-family-base);
  font-size: 1.125rem;
}

.i4-cap i {
  font-size: 15px;
}

.i4-cap:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 50%, transparent);
}

.i4-cap:active,
.i4-cap.down {
  transform: translateY(3px);
  box-shadow: 0 1px 0 #D3D7DF, 0 2px 4px -2px rgba(16, 24, 40, 0.2);
}

.i4-cap:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

/* lit: the selected group's caps (or the one digit) take the brand colour and a soft ring */
.i4-cap.lit {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  box-shadow: 0 4px 0 color-mix(in srgb, var(--vp-c-brand-1) 45%, #D3D7DF), 0 0 0 4px color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent), 0 6px 12px -4px rgba(16, 24, 40, 0.2);
}

.i4-cap.lit.down,
.i4-cap.lit:active {
  box-shadow: 0 1px 0 color-mix(in srgb, var(--vp-c-brand-1) 45%, #D3D7DF), 0 0 0 4px color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
}

html.dark .i4-cap {
  border-color: rgba(255, 255, 255, 0.1);
  background: linear-gradient(180deg, #34373F, #2A2D34);
  box-shadow: 0 4px 0 #15171B, 0 6px 12px -4px rgba(0, 0, 0, 0.6);
}

html.dark .i4-cap:active,
html.dark .i4-cap.down {
  box-shadow: 0 1px 0 #15171B, 0 2px 4px -2px rgba(0, 0, 0, 0.6);
}

html.dark .i4-cap.lit {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 0 color-mix(in srgb, var(--vp-c-brand-1) 40%, #15171B), 0 0 0 4px color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent), 0 6px 12px -4px rgba(0, 0, 0, 0.6);
}

/* the group's words: name, explanation (for measuring, the screen being shown), progress */
.i4-label {
  width: 100%;
  max-width: 250px;
  text-align: center;
}

.i4-label strong {
  display: block;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
}

.i4-group.active .i4-label strong {
  color: var(--vp-c-text-1);
}

.i4-label p {
  margin: 4px 0 0;
  min-height: 3rem;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

/* what the app shows right now, under the selected group */
.i4-now {
  display: block;
  margin-top: 10px;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.i4-now.shown {
  opacity: 1;
}

.i4-progress-track {
  display: block;
  height: 2px;
  margin: 8px auto 0;
  width: 64px;
  border-radius: 2px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 8%, transparent);
  overflow: hidden;
  visibility: hidden;
}

/* only the selected group shows its progress */
.i4-group.active .i4-progress-track {
  visibility: visible;
}

.i4-progress {
  display: block;
  height: 100%;
  background-color: var(--vp-c-brand-1);
  transform-origin: left;
  animation: i4-progress linear forwards;
}

.i4-progress.paused {
  animation-play-state: paused;
}

@keyframes i4-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.i4-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 12px 0 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
}

@media (hover: none) {
  .i4-hint {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .i4-cap {
    transition: none;
  }

  .i4-progress {
    animation: none;
  }
}

@media screen and (max-width: 1000px) {
  .i4-screen {
    padding: 0 16px;
  }

  .i4-deck {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 0;
  }

  .i4-group:nth-child(odd) {
    border-left: 0;
  }
}

@media screen and (max-width: 760px) {
  .i4-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .i4-actions {
    align-items: flex-start !important;
  }

  .i4-tour {
    margin-top: 32px;
  }

  .i4-screen {
    padding: 0 8px;
  }

  .i4-deck {
    grid-template-columns: minmax(0, 1fr);
    padding: 24px 8px;
  }

  .i4-group {
    border-left: 0;
  }

  .i4-group + .i4-group {
    padding-top: 24px;
    border-top: 1px solid var(--vp-c-divider);
  }
}

</style>

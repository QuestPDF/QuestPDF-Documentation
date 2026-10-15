<template>
  <!-- I2 · Window tabs: the live-shortcut idea on the normal surface. The four capabilities are folder
       tabs on top of a large frame around the app; the selected tab merges into the frame, carries a
       progress line and presses its keys. Under the frame, the selected capability's explanation and
       its screens as labelled pills (1 Magnifier, 2 Coordinates...), so the digits explain themselves.
       Tabs and pills are buttons; the digits 1-4 on the reader's keyboard work while it is on screen. -->
  <section class="content">
    <div class="panel i2-panel">
      <div class="i2-header">
        <div>
          <h2 class="card-title">{{ title }}</h2>
          <p class="card-description">{{ description }}</p>
        </div>
        <CompanionActions layout="stack" menu-end class="i2-actions" />
      </div>

      <div ref="root" class="i2-tour" @mouseenter="hovered = true" @mouseleave="hovered = false" @focusin="focused = true" @focusout="focused = false">
        <div class="i2-tabs" role="tablist" aria-label="What the Companion App does">
          <button
            v-for="(capability, index) of capabilities"
            :key="capability.key"
            type="button"
            role="tab"
            class="i2-tab"
            :class="{ active: current.row === index }"
            :aria-selected="current.row === index"
            @click="selectRow(index)">
            <span class="i2-tab-title"><i class="fa-regular" :class="capability.icon" aria-hidden="true"></i>{{ capability.title }}</span>
            <CompanionKeys :capability="capability" :pressed="current.row === index" :lit-key="current.row === index ? current.key : null" class="i2-keys" />
            <span v-if="current.row === index" :key="step" class="i2-progress" :class="{ paused: isPaused }" :style="{ animationDuration: `${dwell}ms` }" aria-hidden="true"></span>
          </button>
        </div>

        <div class="i2-frame">
          <TourFrames :current="current.frame" :step-key="step" :aspect="1.62" class="i2-shot" />
        </div>

        <div class="i2-caption" role="tabpanel">
          <p :key="current.row" class="i2-description">{{ capabilities[current.row].description }}</p>
          <div v-if="screens.length > 1" class="i2-screens">
            <button
              v-for="entry of screens"
              :key="entry.index"
              type="button"
              class="i2-screen"
              :class="{ active: entry.index === step }"
              @click="selectStep(entry.index)">
              <kbd v-if="entry.step.key">{{ entry.step.key }}</kbd>{{ entry.step.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import CompanionActions from "./CompanionActions.vue";
import CompanionKeys from "./CompanionKeys.vue";
import TourFrames from "./TourFrames.vue";
import { capabilities, description, title } from "./companion";
import { stepsOfRow, useShortcutTour } from "./shortcutTour";

const root = ref<HTMLElement | null>(null);
const { step, current, isPaused, hovered, focused, dwell, selectStep, selectRow } = useShortcutTour(root);

const screens = computed(() => stepsOfRow(current.value.row));
</script>

<style scoped>

.i2-panel {
  width: 100%;
}

.i2-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px 64px;
}

.i2-header > div:first-child {
  max-width: 620px;
}

.i2-actions {
  flex-shrink: 0;
  align-items: flex-end !important;
}

.i2-tour {
  max-width: 880px;
  margin: 40px auto 0;
}

/* Tabs: four equal tabs; the selected one takes the frame's colour and joins it */

.i2-tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  padding: 0 12px;
}

.i2-tab {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 14px 16px 14px;
  margin: 0;
  border: 0;
  border-radius: 14px 14px 0 0;
  background: none;
  font: inherit;
  text-align: left;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.i2-tab:hover {
  color: var(--vp-c-text-1);
  background-color: color-mix(in srgb, var(--home-surface-inner) 55%, transparent);
}

.i2-tab.active {
  color: var(--vp-c-text-1);
  background-color: var(--home-surface-inner);
}

.i2-tab:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.i2-tab-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  line-height: 1.375rem;
  font-weight: 600;
}

.i2-tab-title i {
  font-size: 15px;
  color: var(--vp-c-text-3);
  transition: color 0.2s ease;
}

.i2-tab.active .i2-tab-title i {
  color: var(--vp-c-brand-1);
}

.i2-keys :deep(kbd) {
  min-width: 22px;
  height: 22px;
  font-size: 0.75rem;
}

/* the progress line runs along the top of the selected tab; visual only, the timer decides */
.i2-progress {
  position: absolute;
  top: 0;
  left: 14px;
  right: 14px;
  height: 2px;
  border-radius: 2px;
  background-color: var(--vp-c-brand-1);
  transform-origin: left;
  animation: i2-progress linear forwards;
}

.i2-progress.paused {
  animation-play-state: paused;
}

@keyframes i2-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* The frame: the inset colour around the app; the selected tab has the same colour and sits on it */

.i2-frame {
  padding: 10px;
  border-radius: 18px;
  background-color: var(--home-surface-inner);
}

.i2-shot {
  border-radius: 10px;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent), 0 8px 24px -8px rgba(16, 24, 40, 0.18);
}

html.dark .i2-shot {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 24px -8px rgba(0, 0, 0, 0.6);
}

/* Caption: the selected capability in words, and its screens as pills */

.i2-caption {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px 32px;
  min-height: 72px;
  padding: 20px 12px 0;
}

.i2-description {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: var(--vp-c-text-1);
  animation: i2-fade 0.4s ease;
}

@keyframes i2-fade {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
}

.i2-screens {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.i2-screen {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px 6px 6px;
  margin: 0;
  border: 0;
  border-radius: 10px;
  background-color: var(--home-surface-inner);
  font: inherit;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.i2-screen:not(:has(kbd)) {
  padding-left: 12px;
}

.i2-screen kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  border-radius: 6px;
  background-color: var(--vp-c-bg);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 14%, transparent);
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  color: var(--vp-c-text-1);
}

.i2-screen.active {
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  color: var(--vp-c-text-1);
}

.i2-screen.active kbd {
  box-shadow: inset 0 0 0 1px var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

@media (prefers-reduced-motion: reduce) {
  .i2-progress,
  .i2-description {
    animation: none;
  }
}

/* narrow: the tabs become a 2x2 grid of buttons above the frame */
@media screen and (max-width: 900px) {
  .i2-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 0;
    margin-bottom: 12px;
  }

  .i2-tab {
    border-radius: 12px;
  }

  .i2-caption {
    padding: 16px 0 0;
  }
}

@media screen and (max-width: 760px) {
  .i2-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .i2-actions {
    align-items: flex-start !important;
  }

  .i2-tour {
    margin-top: 32px;
  }

  .i2-tabs {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }

  .i2-tab {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;
  }

  .i2-frame {
    padding: 6px;
    border-radius: 14px;
  }
}

</style>

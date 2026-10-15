<template>
  <!-- I3 · Spotlight tour: the live-shortcut idea as a guided look at the app. A soft spotlight moves to
       the part of the screen that matters (the refreshed page, the selected element, the lens, the
       measurement, the error) and a callout card beside it names it. Under the app, the four
       capabilities as step pills that drive it. Below 900px the card sits under the app instead of on it. -->
  <section class="content">
    <div class="panel i3-panel">
      <header class="i3-header">
        <h2 class="card-title">{{ title }}</h2>
        <p class="card-description">{{ description }}</p>
      </header>

      <div ref="root" class="i3-tour" @mouseenter="hovered = true" @mouseleave="hovered = false" @focusin="focused = true" @focusout="focused = false">
        <div class="i3-stage" :style="{ '--i3-fx': `${current.focus[0] * 100}%`, '--i3-fy': `${current.focus[1] * stretch * 100}%` }">
          <TourFrames :current="current.frame" :step-key="step" :aspect="aspect" class="i3-shot">
            <span class="i3-scrim" aria-hidden="true"></span>
            <span class="i3-marker" aria-hidden="true"></span>
          </TourFrames>

          <Transition name="i3-card" mode="out-in">
            <div :key="step" class="i3-card" :class="`to-${current.side}`" aria-live="polite">
              <span class="i3-card-step">{{ current.label }}</span>
              <strong><i class="fa-regular" :class="capability.icon" aria-hidden="true"></i>{{ capability.title }}</strong>
              <p>{{ capability.description }}</p>
              <CompanionKeys :capability="capability" pressed :lit-key="current.key" class="i3-keys" />
            </div>
          </Transition>
        </div>

        <div class="i3-steps" role="tablist" aria-label="What the Companion App does">
          <button
            v-for="(item, index) of capabilities"
            :key="item.key"
            type="button"
            role="tab"
            class="i3-step"
            :class="{ active: current.row === index }"
            :aria-selected="current.row === index"
            @click="selectRow(index)">
            <i class="fa-regular" :class="item.icon" aria-hidden="true"></i>
            {{ item.title }}
            <span v-if="current.row === index" :key="step" class="i3-progress" :class="{ paused: isPaused }" :style="{ animationDuration: `${dwell}ms` }" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      <CompanionActions layout="row" class="i3-actions" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import CompanionActions from "./CompanionActions.vue";
import CompanionKeys from "./CompanionKeys.vue";
import TourFrames from "./TourFrames.vue";
import { capabilities, description, title } from "./companion";
import { useShortcutTour } from "./shortcutTour";

const root = ref<HTMLElement | null>(null);
const { step, current, isPaused, hovered, focused, dwell, selectRow } = useShortcutTour(root, 3600, undefined, { keyboard: false });

const capability = computed(() => capabilities[current.value.row]);

/* the frame is cropped at the bottom to 1.62:1; focus points are given for the full 1917x1328 shot,
   so their heights stretch by the same ratio */
const aspect = 1.62;
const stretch = aspect / (1917 / 1328);
</script>

<style>

/* registered so the spotlight glides between places instead of jumping (global at-rules) */
@property --i3-fx {
  syntax: "<percentage>";
  inherits: true;
  initial-value: 50%;
}

@property --i3-fy {
  syntax: "<percentage>";
  inherits: true;
  initial-value: 50%;
}

</style>

<style scoped>

.i3-panel {
  width: 100%;
}

.i3-header {
  max-width: 660px;
  margin: 0 auto;
  text-align: center;
}

.i3-tour {
  max-width: 860px;
  margin: 36px auto 0;
}

/* The stage: the app with the spotlight; the callout card is placed in stage coordinates */

.i3-stage {
  position: relative;
  transition: --i3-fx 0.7s cubic-bezier(0.3, 0.7, 0.2, 1), --i3-fy 0.7s cubic-bezier(0.3, 0.7, 0.2, 1);
}

.i3-shot {
  border-radius: 14px;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent), 0 16px 40px -16px rgba(16, 24, 40, 0.22);
}

html.dark .i3-shot {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 16px 40px -16px rgba(0, 0, 0, 0.6);
}

/* the scrim dims everything but a soft circle around the focus */
.i3-scrim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at var(--i3-fx) var(--i3-fy), transparent 0, transparent 110px, rgba(16, 24, 40, 0.26) 230px);
}

html.dark .i3-scrim {
  background: radial-gradient(circle at var(--i3-fx) var(--i3-fy), transparent 0, transparent 110px, rgba(0, 0, 0, 0.45) 230px);
}

.i3-marker {
  position: absolute;
  left: var(--i3-fx);
  top: var(--i3-fy);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--vp-c-brand-1) 25%, transparent), 0 0 0 1px #FFF;
  pointer-events: none;
}

.i3-marker::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-brand-1);
  animation: i3-ping 1.8s ease-out infinite;
}

@keyframes i3-ping {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(3.2); opacity: 0; }
}

/* the callout card: beside or above the focus, on the side each screen sets (shortcutTour.ts), so it
   never covers what it names; kept inside the stage vertically */
.i3-card {
  position: absolute;
  top: clamp(16px, calc(var(--i3-fy) - 72px), calc(100% - 196px));
  width: 290px;
  padding: 18px 20px 20px;
  border-radius: 16px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 9%, transparent), 0 20px 48px -12px rgba(16, 24, 40, 0.3);
}

html.dark .i3-card {
  background-color: var(--vp-c-bg-elv);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 48px -12px rgba(0, 0, 0, 0.7);
}

.i3-card.to-right {
  left: calc(var(--i3-fx) + 40px);
}

.i3-card.to-left {
  right: calc(100% - var(--i3-fx) + 40px);
}

.i3-card.to-above {
  top: auto;
  bottom: calc(100% - var(--i3-fy) + 40px);
  left: clamp(16px, calc(var(--i3-fx) - 145px), calc(100% - 306px));
}

.i3-card-step {
  display: block;
  margin-bottom: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}

.i3-card strong {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.i3-card strong i {
  font-size: 15px;
  color: var(--vp-c-brand-1);
}

.i3-card p {
  margin: 6px 0 0;
}

.i3-keys {
  margin-top: 14px;
}

.i3-card-enter-active,
.i3-card-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.i3-card-enter-from,
.i3-card-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* Step pills under the app */

.i3-steps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-top: 20px;
}

.i3-step {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 14px;
  margin: 0;
  border: 0;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--home-surface-inner);
  font: inherit;
  font-size: 0.9375rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.i3-step i {
  font-size: 14px;
}

.i3-step:hover {
  color: var(--vp-c-text-1);
}

.i3-step.active {
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 13%, transparent);
  color: var(--vp-c-text-1);
}

.i3-step.active i {
  color: var(--vp-c-brand-1);
}

.i3-step:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.i3-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background-color: var(--vp-c-brand-1);
  transform-origin: left;
  animation: i3-progress linear forwards;
}

.i3-progress.paused {
  animation-play-state: paused;
}

@keyframes i3-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.i3-actions {
  margin-top: 32px;
  padding-top: 28px;
  border-top: 1px solid var(--vp-c-divider);
}

@media (prefers-reduced-motion: reduce) {
  .i3-stage {
    transition: none;
  }

  .i3-marker::after,
  .i3-progress {
    animation: none;
  }
}

/* narrow: the card leaves the app and sits under it; the pills go 2x2 */
@media screen and (max-width: 900px) {
  .i3-card,
  .i3-card.to-right,
  .i3-card.to-left,
  .i3-card.to-above {
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
    width: auto;
    margin-top: 16px;
  }

  .i3-steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media screen and (max-width: 760px) {
  .i3-tour {
    margin-top: 32px;
  }

  .i3-step {
    justify-content: flex-start;
  }
}

</style>

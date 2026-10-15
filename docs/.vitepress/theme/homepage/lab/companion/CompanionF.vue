<template>
  <!-- F · Night drawing: B's annotated figure on D's dark stage (a fork of CompanionB.vue, which stays
       as it is). The callouts carry the shortcuts from D as key caps, and pointing at a callout, a pin
       or an inset lights that pair and dims the rest. The app and the insets use their dark theme in
       both page themes. Below 1300px the callouts become a numbered list under the figure. -->
  <section class="content">
    <div class="panel f-stage" :class="{ 'has-active': active !== null }">
      <div class="f-header">
        <div>
          <h2 class="card-title">{{ title }}</h2>
          <p class="card-description">{{ description }}</p>
        </div>
        <CompanionActions layout="stack" menu-end class="f-actions" />
      </div>

      <figure class="f-figure">
        <div class="f-drawing">
          <div class="f-glow" aria-hidden="true"></div>
          <div class="f-shot">
            <CompanionShot name="application" theme="dark" />
          </div>

          <div class="f-inset inset-debug" :class="{ active: active === 4 }" @mouseenter="active = 4" @mouseleave="active = null">
            <CompanionCrop name="layout-error" theme="dark" :x="0" :y="0.056" :w="0.42" :aspect="1.9" />
            <span class="f-number">4</span>
          </div>
          <div class="f-inset inset-measure" :class="{ active: active === 3 }" @mouseenter="active = 3" @mouseleave="active = null">
            <CompanionCrop name="measurement-vertical" theme="dark" :x="0.395" :y="0.125" :w="0.27" :aspect="1.6" />
            <span class="f-number">3</span>
          </div>

          <span
            v-for="callout of callouts.slice(0, 2)"
            :key="`pin-${callout.number}`"
            class="f-pin"
            :class="{ active: active === callout.number }"
            :style="{ '--x': callout.x, '--y': callout.y }"
            @mouseenter="active = callout.number"
            @mouseleave="active = null">{{ callout.number }}</span>

          <div
            v-for="callout of callouts"
            :key="callout.number"
            class="f-callout"
            :class="[callout.side, { 'to-pin': callout.number <= 2, active: active === callout.number }]"
            :style="{ '--x': callout.x, '--y': callout.y }">
            <span class="f-leader" aria-hidden="true"></span>
            <div class="f-label" @mouseenter="active = callout.number" @mouseleave="active = null">
              <strong>{{ callout.capability.title }}</strong>
              <p>{{ callout.capability.description }}</p>
              <CompanionKeys :capability="callout.capability" :pressed="active === callout.number" class="f-keys" />
            </div>
          </div>
        </div>

        <ol class="f-list">
          <li v-for="callout of callouts" :key="callout.number">
            <span class="f-number">{{ callout.number }}</span>
            <div>
              <strong>{{ callout.capability.title }}</strong>
              <p>{{ callout.capability.description }}</p>
              <CompanionKeys :capability="callout.capability" class="f-keys" />
            </div>
          </li>
        </ol>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CompanionActions from "./CompanionActions.vue";
import CompanionCrop from "./CompanionCrop.vue";
import CompanionKeys from "./CompanionKeys.vue";
import CompanionShot from "./CompanionShot.vue";
import { capabilities, description, title } from "./companion";

const [reload, hierarchy, measure, debug] = capabilities;

/* the same places as in B: x and y are fractions of the screenshot */
const callouts = [
  { number: 1, capability: reload, side: "right", x: 0.68, y: 0.155 },
  { number: 2, capability: hierarchy, side: "left", x: 0.165, y: 0.226 },
  { number: 3, capability: measure, side: "right", x: 1.04, y: 0.72 },
  { number: 4, capability: debug, side: "left", x: -0.04, y: 0.715 }
];

const active = ref<number | null>(null);
</script>

<style scoped>

/* the stage: D's colours, redefined text tokens so shared typography and the actions follow */
.custom-page.textured-page .f-stage {
  --vp-c-text-1: rgba(255, 255, 255, 0.95);
  --vp-c-text-2: rgba(235, 235, 245, 0.68);
  --vp-c-text-3: rgba(235, 235, 245, 0.45);
  --vp-c-divider: rgba(255, 255, 255, 0.1);
  --vp-c-bg-elv: #1C2333;
  --vp-c-default-soft: rgba(255, 255, 255, 0.08);
  --home-surface-rim: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.01));
  --f-line: color-mix(in srgb, #42A5F5 60%, transparent);

  width: 100%;
  background-color: #0D1424;
  background-image:
      radial-gradient(ellipse 60% 70% at 50% 70%, rgba(33, 150, 243, 0.12), transparent 70%),
      radial-gradient(ellipse 50% 60% at 100% 0%, rgba(63, 81, 181, 0.14), transparent 70%);
  box-shadow: 0 24px 64px -28px rgba(13, 20, 36, 0.55);
}

html.dark .custom-page.textured-page .f-stage {
  background-color: #0A101D;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.f-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px 64px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.f-header > div:first-child {
  max-width: 620px;
}

.f-actions {
  flex-shrink: 0;
  align-items: flex-end !important;
}

.f-actions :deep(.download-toggle) {
  background-color: rgba(255, 255, 255, 0.1);
}

.f-actions :deep(.download-toggle:hover) {
  background-color: rgba(255, 255, 255, 0.16);
}

.f-figure {
  margin: 56px 0 8px;
  padding: 0 300px;
}

.f-drawing {
  position: relative;
}

.f-glow {
  position: absolute;
  inset: -12% -10%;
  background: radial-gradient(ellipse 50% 50% at 50% 50%, rgba(33, 150, 243, 0.22), transparent 70%);
  pointer-events: none;
}

.f-shot {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 32px 64px -16px rgba(0, 0, 0, 0.7);
}

/* Insets */

.f-inset {
  position: absolute;
  width: 36%;
  z-index: 1;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.f-inset :deep(.companion-crop) {
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.16), 0 16px 40px -8px rgba(0, 0, 0, 0.8);
  background-color: #1B1F27;
  transition: box-shadow 0.25s ease;
}

.f-inset.active :deep(.companion-crop) {
  box-shadow: 0 0 0 1px var(--vp-c-brand-1), 0 0 32px -4px color-mix(in srgb, var(--vp-c-brand-1) 55%, transparent), 0 16px 40px -8px rgba(0, 0, 0, 0.8);
}

.inset-debug {
  left: -4%;
  top: 58%;
}

.inset-measure {
  right: -4%;
  top: 56%;
}

/* Pins and numbers: a glowing ring on the dark stage */

.f-pin,
.f-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-family: var(--vp-font-family-mono);
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  color: #FFF;
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(13, 20, 36, 0.85), 0 0 0 5px color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.f-pin {
  position: absolute;
  left: calc(var(--x) * 100%);
  top: calc(var(--y) * 100%);
  transform: translate(-50%, -50%);
  z-index: 2;
  cursor: default;
}

.f-pin.active {
  transform: translate(-50%, -50%) scale(1.15);
  box-shadow: 0 0 0 3px rgba(13, 20, 36, 0.85), 0 0 0 6px color-mix(in srgb, var(--vp-c-brand-1) 55%, transparent), 0 0 24px color-mix(in srgb, var(--vp-c-brand-1) 70%, transparent);
}

.f-inset .f-number {
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 2;
}

.inset-measure .f-number {
  left: auto;
  right: -10px;
}

/* Callouts */

.f-callout {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(var(--y) * 100%);
  height: 0;
  transition: opacity 0.25s ease;
}

.f-leader {
  position: absolute;
  top: 0;
  height: 1px;
  background-color: var(--f-line);
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}

.left .f-leader {
  left: -44px;
  width: calc(44px + var(--x) * 100%);
}

.right .f-leader {
  left: calc(var(--x) * 100%);
  right: -44px;
}

.f-leader::before {
  content: "";
  position: absolute;
  top: -2.5px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #42A5F5;
  box-shadow: 0 0 8px #42A5F5;
}

.left .f-leader::before {
  right: -3px;
}

.right .f-leader::before {
  left: -3px;
}

.to-pin .f-leader::before {
  display: none;
}

.right.to-pin .f-leader {
  left: calc(var(--x) * 100% + 14px);
}

.left.to-pin .f-leader {
  width: calc(44px + var(--x) * 100% - 14px);
}

.f-callout.active .f-leader {
  background-color: #64B5F6;
  box-shadow: 0 0 10px color-mix(in srgb, #42A5F5 80%, transparent);
}

/* while one pair is pointed at, the others step back */
.has-active .f-callout:not(.active),
.has-active .f-pin:not(.active) {
  opacity: 0.4;
}

/* an inset sits over the screenshot, so it dims less or the app shows through it */
.has-active .f-inset:not(.active) {
  opacity: 0.7;
}

.f-label {
  position: absolute;
  top: -12px;
  width: 244px;
}

.left .f-label {
  right: calc(100% + 56px);
  text-align: right;
}

.right .f-label {
  left: calc(100% + 56px);
}

.f-label strong,
.f-list strong {
  display: block;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.f-label p,
.f-list p {
  margin: 4px 0 0;
  font-size: 1rem;
  line-height: 1.5rem;
}

.f-keys {
  margin-top: 10px;
}

.left .f-keys {
  justify-content: flex-end;
}

.f-list {
  display: none;
}

@media screen and (max-width: 1400px) {
  .f-figure {
    padding: 0 280px;
  }

  .f-label {
    width: 220px;
  }
}

@media screen and (max-width: 1300px) {
  .f-figure {
    padding: 0;
    margin-top: 40px;
  }

  .f-callout {
    display: none;
  }

  .has-active .f-pin:not(.active),
  .has-active .f-inset:not(.active) {
    opacity: 1;
  }

  .f-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 40px;
    margin: 72px 0 0;
    padding: 0;
    list-style: none;
  }

  .f-list li {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .f-list .f-number {
    margin-top: 1px;
  }
}

@media screen and (max-width: 760px) {
  .f-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .f-actions {
    align-items: flex-start !important;
  }

  .f-list {
    grid-template-columns: minmax(0, 1fr);
    margin-top: 48px;
  }

  .f-pin,
  .f-inset .f-number {
    width: 20px;
    height: 20px;
    font-size: 0.6875rem;
  }

  .f-inset .f-number {
    top: -8px;
    left: -8px;
  }

  .inset-measure .f-number {
    right: -8px;
  }
}

</style>

<template>
  <!-- E · The loop: the description drawn as a diagram. Your editor on the left (a skeleton, no code),
       the app on the right, and the capabilities as the traffic between them: hot reload carries a
       save across, hierarchy and debugging carry a click back to the line of code. Magnify and
       measure happen inside the app, so they caption it. One 8s cycle in CSS shows a save travel
       across, the page refresh, a click travel back and the line light up. -->
  <section class="content">
    <div class="panel e-panel" :class="{ 'is-playing': playing }">
      <header class="e-header">
        <h2 class="card-title">{{ title }}</h2>
        <p class="card-description">{{ description }}</p>
      </header>

      <div ref="diagram" class="e-diagram">
        <!-- the editor: a file tab and skeleton lines (no line numbers, so it does not read as a second
             code window), one of which is the line the click lands on -->
        <div class="e-ide" aria-hidden="true">
          <div class="e-ide-tab">
            <i class="fa-regular fa-file-code"></i>
            InvoiceDocument.cs
            <span class="e-saved"></span>
          </div>
          <div class="e-ide-lines">
            <span v-for="(line, index) of lines" :key="index" class="e-line-row" :class="{ target: index === targetLine }">
              <span class="e-bar" :style="{ marginLeft: `${line[0] * 14}px`, width: `${line[1]}%` }"></span>
            </span>
          </div>
          <div class="e-ide-foot">
            <img src="/homepage/supported-platforms/visual-studio.svg" alt="" />
            <img src="/homepage/supported-platforms/rider.svg" alt="" />
            <code>dotnet watch</code>
          </div>
        </div>

        <!-- the traffic between them -->
        <ul class="e-lanes" aria-label="What the Companion App does">
          <li v-for="lane of lanes" :key="lane.capability.key" class="e-lane" :class="lane.direction">
            <div class="e-lane-label">
              <strong>
                <i class="fa-regular" :class="lane.capability.icon" aria-hidden="true"></i>{{ lane.capability.title }}
                <i class="fa-regular e-direction" :class="lane.direction === 'forward' ? 'fa-arrow-down' : 'fa-arrow-up'" aria-hidden="true"></i>
              </strong>
              <p>{{ lane.capability.description }}</p>
            </div>
            <span class="e-track" aria-hidden="true"><span class="e-pulse"></span></span>
          </li>
        </ul>

        <figure class="e-app">
          <div class="e-shot">
            <CompanionShot name="application" />
            <span class="e-refresh" aria-hidden="true"></span>
          </div>
          <figcaption>
            <strong><i class="fa-regular" :class="measure.icon" aria-hidden="true"></i>{{ measure.title }}</strong>
            <p>{{ measure.description }}</p>
          </figcaption>
        </figure>
      </div>

      <CompanionActions layout="row" class="e-actions" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import CompanionActions from "./CompanionActions.vue";
import CompanionShot from "./CompanionShot.vue";
import { capabilities, description, title } from "./companion";

const [reload, hierarchy, measure, debug] = capabilities;

const lanes = [
  { capability: reload, direction: "forward" },
  { capability: hierarchy, direction: "back" },
  { capability: debug, direction: "back" }
];

/* skeleton lines: [indent, width in %] */
const lines = [
  [0, 46], [0, 8], [1, 58], [1, 8], [2, 70], [2, 52], [3, 44], [2, 64], [2, 36], [1, 10], [1, 50], [1, 30], [0, 8]
];
const targetLine = 5;

/* the cycle only runs while the diagram is on screen */
const diagram = ref<HTMLElement | null>(null);
const playing = ref(false);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return;

  observer = new IntersectionObserver(([entry]) => playing.value = entry.isIntersecting, { threshold: 0.3 });
  observer.observe(diagram.value!);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<style scoped>

.e-panel {
  width: 100%;
}

.e-header {
  max-width: 660px;
  margin: 0 auto;
  text-align: center;
}

.e-diagram {
  display: grid;
  grid-template-columns: minmax(0, 9fr) minmax(0, 10fr) minmax(0, 19fr);
  align-items: center;
  margin-top: 48px;
}

/* The editor */

.e-ide {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background-color: var(--home-surface-inner);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 7%, transparent);
  overflow: hidden;
}

.e-ide-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  color: var(--vp-c-text-2);
}

.e-ide-tab i {
  color: var(--vp-c-brand-1);
}

/* the dot that says the file was saved */
.e-saved {
  width: 7px;
  height: 7px;
  margin-left: auto;
  border-radius: 50%;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 25%, transparent);
}

.e-ide-lines {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
}

.e-line-row {
  position: relative;
  display: flex;
  align-items: center;
  height: 20px;
  padding: 0 20px;
}

.e-bar {
  display: block;
  height: 7px;
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 16%, transparent);
}

.e-line-row.target::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  box-shadow: inset 2px 0 0 var(--vp-c-brand-1);
  opacity: 0;
}

.e-ide-foot {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.e-ide-foot img {
  width: 16px;
  height: 16px;
}

.e-ide-foot code {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  background: none;
  padding: 0;
}

/* The lanes: a label above a track with an arrowhead; forward points at the app, back at the editor */

.e-lanes {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin: 0;
  padding: 0 28px;
  list-style: none;
}

.e-lane-label strong {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.e-lane-label i,
.e-app figcaption i {
  font-size: 15px;
  color: var(--vp-c-brand-1);
}

.e-lane-label p {
  margin: 2px 0 0;
  font-size: 0.9375rem;
  line-height: 1.375rem;
}

.e-lane.back .e-lane-label {
  text-align: right;
}

/* the arrow after the name only shows when the tracks are gone */
.e-lane-label .e-direction {
  display: none;
}

.e-lane.back .e-lane-label strong {
  justify-content: flex-end;
}

.e-track {
  position: relative;
  display: block;
  height: 1px;
  margin-top: 12px;
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent);
}

/* arrowheads */
.e-track::after {
  content: "";
  position: absolute;
  top: -4px;
  border-top: 4.5px solid transparent;
  border-bottom: 4.5px solid transparent;
}

.forward .e-track::after {
  right: -1px;
  border-left: 7px solid var(--vp-c-brand-1);
}

.back .e-track::after {
  left: -1px;
  border-right: 7px solid var(--vp-c-brand-1);
}

.e-pulse {
  position: absolute;
  top: -3px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--vp-c-brand-1) 22%, transparent);
  opacity: 0;
}

/* The app */

.e-app {
  margin: 0;
}

.e-shot {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--vp-c-text-1) 12%, transparent);
  box-shadow: 0 16px 48px -16px rgba(16, 24, 40, 0.2);
}

html.dark .e-shot {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 16px 48px -16px rgba(0, 0, 0, 0.6);
}

/* the refresh: a faint band passing down the page area of the screenshot */
.e-refresh {
  position: absolute;
  top: 7%;
  bottom: 0;
  left: 43%;
  width: 46%;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent) 46%, color-mix(in srgb, var(--vp-c-brand-1) 20%, transparent) 50%, transparent 52%);
  background-size: 100% 220%;
  background-position: 0 100%;
  opacity: 0;
}

.e-app figcaption {
  margin-top: 20px;
}

.e-app figcaption strong {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.e-app figcaption p {
  margin: 2px 0 0;
  font-size: 0.9375rem;
  line-height: 1.375rem;
}

.e-actions {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}

/* The cycle, 8s: save (0-6%), the pulse crosses forward (4-22%), the page refreshes (20-34%),
   a click crosses back on the hierarchy lane (48-66%), the line lights up (64-90%) */

.is-playing .e-saved { animation: e-saved 8s infinite; }
.is-playing .forward .e-pulse { animation: e-forward 8s infinite; }
.is-playing .e-refresh { animation: e-refresh 8s infinite; }
.is-playing .e-lane:nth-child(2) .e-pulse { animation: e-back 8s infinite; }
.is-playing .e-line-row.target::before { animation: e-target 8s infinite; }

@keyframes e-saved {
  0%, 8%, 100% { background-color: color-mix(in srgb, var(--vp-c-text-1) 25%, transparent); }
  2%, 5% { background-color: var(--vp-c-brand-1); }
}

@keyframes e-forward {
  0%, 4% { left: 0; opacity: 0; }
  6% { opacity: 1; }
  20% { opacity: 1; }
  22%, 100% { left: calc(100% - 7px); opacity: 0; }
}

@keyframes e-refresh {
  0%, 20% { opacity: 0; background-position: 0 100%; }
  21% { opacity: 1; background-position: 0 100%; }
  33% { opacity: 1; background-position: 0 -10%; }
  36%, 100% { opacity: 0; background-position: 0 -10%; }
}

@keyframes e-back {
  0%, 48% { left: calc(100% - 7px); opacity: 0; }
  50% { opacity: 1; }
  64% { opacity: 1; }
  66%, 100% { left: 0; opacity: 0; }
}

@keyframes e-target {
  0%, 64% { opacity: 0; }
  68%, 86% { opacity: 1; }
  92%, 100% { opacity: 0; }
}

/* Narrow: editor, lanes and app stacked; the tracks turn into arrows pointing down (to the app) or
   up (to the editor) */
@media screen and (max-width: 1180px) {
  .e-diagram {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
  }

  .e-ide-lines {
    display: none;
  }

  .e-lanes {
    padding: 0;
    gap: 20px;
  }

  .e-lane.back .e-lane-label,
  .e-lane.back .e-lane-label strong {
    text-align: left;
    justify-content: flex-start;
  }

  .e-track {
    display: none;
  }

  .e-lane-label .e-direction {
    display: inline;
    font-size: 0.8125rem;
    color: var(--vp-c-text-3);
  }
}

@media screen and (max-width: 640px) {
  .e-actions {
    margin-top: 32px;
  }
}

</style>

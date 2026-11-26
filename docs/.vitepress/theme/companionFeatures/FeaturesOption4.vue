<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import Icon from "../Icon.vue";
import { useDotWings } from "../dotWings";
import FeaturesHero from "./FeaturesHero.vue";
import GetStarted from "./GetStarted.vue";
import FeatureClip from "./FeatureClip.vue";
import FeatureDetails from "./FeatureDetails.vue";
import ShortcutSheet from "./ShortcutSheet.vue";
import DownloadClosing from "./DownloadClosing.vue";
import { features, groupOf } from "./features";

/* PROTOTYPE, option 4: a sticky player. One large clip stays in place on the left while the descriptions scroll by on
   the right; the clip switches to the feature whose text crosses the middle of the screen. On narrow screens every
   description carries its own clip instead. */
const root = ref<HTMLElement>();
useDotWings(root);

const active = ref(features[0].id);
const steps = ref<HTMLElement[]>([]);
let observer: IntersectionObserver | undefined;

onMounted(() => {
  /* a thin band across the middle of the viewport: the step inside it is the active one */
  observer = new IntersectionObserver(entries => {
    for (const entry of entries)
      if (entry.isIntersecting)
        active.value = (entry.target as HTMLElement).dataset.feature!;
  }, { rootMargin: "-48% 0px -48% 0px" });

  steps.value.forEach(step => observer!.observe(step));
});

onBeforeUnmount(() => observer?.disconnect());

function isGroupStart(index: number) {
  return index === 0 || features[index - 1].group !== features[index].group;
}

/* PROTOTYPE ONLY: tries the player in other shapes, a clip may show one close-up rather than the whole window */
const ratios = ["16 / 9", "4 / 3", "1 / 1"];
const ratio = ref("4 / 3");

/* the player column's share of the width; a wide clip needs a wider column to show anything, a square one less, so
   each shape starts from its own share */
const shareFor: Record<string, number> = { "16 / 9": 60, "4 / 3": 50, "1 / 1": 40 };
const share = ref(shareFor[ratio.value]);

function pickRatio(option: string) {
  ratio.value = option;
  share.value = shareFor[option];
}

/* the descriptions that are not on screen's middle fade back; off shows every one at full strength */
const dim = ref(true);

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
}
</script>

<template>
  <div ref="root" class="custom-page texture-dots option">
    <div class="content">
      <FeaturesHero video />

      <div class="dotted-divider"></div>

      <GetStarted />

      <div class="dotted-divider"></div>

      <div class="ratio-switch" role="group" aria-label="Player settings (prototype)">
        <span class="ratio-label">Prototype</span>

        <span class="ratio-group">
          <span class="ratio-label">Clip shape</span>
          <button
              v-for="option of ratios"
              :key="option"
              type="button"
              class="ratio-option"
              :aria-pressed="ratio === option"
              @click="pickRatio(option)">
            {{ option.replace(/ /g, "") }}
          </button>
        </span>

        <label class="ratio-group">
          <span class="ratio-label">Player width</span>
          <input v-model.number="share" class="ratio-slider" type="range" min="30" max="70" step="1" />
          <span class="ratio-value">{{ share }}%</span>
        </label>

        <button type="button" class="ratio-option" :aria-pressed="dim" @click="dim = !dim">
          Fade other steps
        </button>
      </div>

      <div class="stage" :class="{ dim }" :style="{ '--clip-ratio': ratio, '--player-share': `${share}%` }">
        <div class="player-column">
          <div class="player">
            <div class="screen">
              <FeatureClip
                  v-for="feature of features"
                  :key="feature.id"
                  class="screen-clip"
                  :class="{ shown: feature.id === active }"
                  :feature="feature" />
            </div>

            <nav class="progress" aria-label="Features">
              <button
                  v-for="feature of features"
                  :key="feature.id"
                  type="button"
                  class="tick"
                  :class="{ shown: feature.id === active }"
                  :title="feature.title"
                  :aria-label="feature.title"
                  @click="jumpTo(feature.id)"></button>
            </nav>
          </div>
        </div>

        <div class="steps">
          <article
              v-for="(feature, index) of features"
              :id="feature.id"
              :key="feature.id"
              ref="steps"
              class="step"
              :class="{ shown: feature.id === active }"
              :data-feature="feature.id">
            <p v-if="isGroupStart(index)" class="step-group">
              <Icon :icon="groupOf(feature).icon" />
              {{ groupOf(feature).title }}
            </p>

            <FeatureClip class="inline-clip" :feature="feature" />

            <h2 class="step-title">
              <Icon class="step-icon" :icon="feature.icon" />
              {{ feature.title }}
            </h2>
            <FeatureDetails :feature="feature" />
          </article>
        </div>
      </div>

      <div class="dotted-divider"></div>

      <ShortcutSheet />

      <DownloadClosing />
    </div>
  </div>
</template>

<style scoped>

.option .content {
  display: flex;
  flex-direction: column;
  gap: 72px;
  /* named: the narrow layout follows the page's width, not a step's (each step is a container of its own) */
  container: features / inline-size;
}

.option .dotted-divider {
  margin: 0;
}

.ratio-switch {
  position: sticky;
  top: calc(var(--vp-nav-height) + 8px);
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-self: center;
  gap: 4px 20px;
  margin-bottom: -40px;
  padding: 4px 4px 4px 14px;
  border-radius: 24px;
  border: 1px dashed #FF00FF;
  font-size: 0.8125rem;
  background-color: color-mix(in srgb, var(--vp-c-bg) 85%, transparent);
  backdrop-filter: blur(8px);
}

.ratio-group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ratio-label {
  margin-right: 8px;
  color: var(--vp-c-text-3);
}

.ratio-slider {
  width: 140px;
  accent-color: light-dark(#1976D2, var(--vp-c-brand-1));
}

.ratio-value {
  min-width: 3ch;
  margin-left: 6px;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
}

.ratio-option {
  padding: 4px 12px;
  border-radius: 999px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.ratio-option[aria-pressed="true"] {
  color: #FFF;
  background-color: light-dark(#1976D2, var(--vp-c-brand-1));
}

.stage {
  display: grid;
  grid-template-columns: minmax(0, var(--player-share, 50%)) minmax(0, 1fr);
  gap: 56px;
  align-items: start;
}

.player-column {
  align-self: stretch;
}

.player {
  position: sticky;
  /* below the prototype's settings bar, which stays on screen too */
  top: calc(var(--vp-nav-height) + 72px);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* never taller than the window: a tall shape in a wide column narrows, centred, until the player fits on screen */
.screen {
  position: relative;
  display: grid;
  width: 100%;
  max-width: calc((100vh - var(--vp-nav-height) - 180px) * (var(--clip-ratio, 16 / 9)));
  margin-inline: auto;
}

/* all clips share one cell, the shown one fades in on top */
.screen-clip {
  grid-area: 1 / 1;
  opacity: 0;
  transform: scale(0.985);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

/* the drawn clip has no panel to clip it and keeps its own 16:9 shape */
.screen-clip.shuffle {
  align-self: center;
  overflow: clip;
}

.screen-clip.shown {
  opacity: 1;
  transform: none;
  z-index: 1;
}

.progress {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.tick {
  width: 22px;
  height: 6px;
  padding: 0;
  border-radius: 3px;
  background-color: color-mix(in srgb, var(--vp-c-text-1) 14%, transparent);
  transition: width 0.25s ease, background-color 0.25s ease;
}

.tick:hover {
  background-color: color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
}

.tick.shown {
  width: 44px;
  background-color: light-dark(#1976D2, var(--vp-c-brand-1));
}


.steps {
  display: flex;
  flex-direction: column;
  /* room below the last step, so it can reach the middle of the screen */
  padding: 0 0 30vh;
}

/* each step about half a screen, its text level with the player's middle: enough to pass the middle one at a time,
   without long empty scrolls between short descriptions */
.step {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 45vh;
  transition: opacity 0.3s ease;
  container-type: inline-size;
}

/* the step whose clip is playing stands out, the others fade back */
.dim .step {
  opacity: 0.35;
}

.dim .step.shown {
  opacity: 1;
}

.step-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}

.step-title {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 16px;
  font-size: 1.75rem;
  line-height: 2.25rem;
}

.step-icon {
  font-size: 1.375rem;
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}

.inline-clip {
  display: none;
}

@container features (max-width: 900px) {
  .stage {
    grid-template-columns: minmax(0, 1fr);
  }

  .player-column,
  .ratio-switch {
    display: none;
  }

  .steps {
    gap: 64px;
    padding: 0;
  }

  .step {
    min-height: 0;
    opacity: 1;
  }

  .inline-clip {
    display: block;
    margin-bottom: 24px;
  }
}

</style>

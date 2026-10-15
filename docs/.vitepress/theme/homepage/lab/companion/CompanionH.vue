<template>
  <!-- H · Exploded view: the app taken apart into the layers the capabilities live on, floating in
       three-quarter perspective over the whole screenshot: the preview page (hot reload), the tree
       (hierarchy), the magnifier lens and the layout-error banner (both from their own screenshots).
       The tree and page layers are crops of the same screenshot at the same place, so when the pointer
       is on the stage the layers drop back into the app and it turns to face the reader. Pointing at
       a row lifts its layer. The labels stay outside the 3D, so they never skew. Phones get the flat
       screenshot. -->
  <section class="content">
    <div class="panel h-panel">
      <div class="h-stage" :class="{ assembled, 'has-active': active !== null }" @mouseenter="assembled = true" @mouseleave="assembled = false">
        <div class="h-board">
          <div class="h-layer h-base">
            <CompanionShot name="application" />
          </div>

          <div
            v-for="layer of layers"
            :key="layer.n"
            class="h-layer"
            :class="[layer.kind, { active: active === layer.n }]"
            :style="{ left: `${layer.left * 100}%`, top: `${layer.top * 100}%`, width: `${layer.width * 100}%`, '--z': `${layer.z}px` }">
            <CompanionCrop v-bind="layer.crop" />
            <span class="h-number">{{ layer.n }}</span>
          </div>
        </div>
      </div>

      <div class="h-text">
        <h2 class="card-title">{{ title }}</h2>
        <p class="card-description">{{ description }}</p>

        <ol class="h-rows" aria-label="What the Companion App does">
          <li
            v-for="(capability, index) of capabilities"
            :key="capability.key"
            :class="{ active: active === index + 1 }"
            @mouseenter="active = index + 1"
            @mouseleave="active = null">
            <span class="h-number">{{ index + 1 }}</span>
            <div>
              <strong>{{ capability.title }}</strong>
              <p>{{ capability.description }}</p>
            </div>
          </li>
        </ol>

        <CompanionActions layout="stack" menu-up class="h-actions" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CompanionActions from "./CompanionActions.vue";
import CompanionCrop from "./CompanionCrop.vue";
import CompanionShot from "./CompanionShot.vue";
import { capabilities, description, title } from "./companion";

/* left, top, width: where the layer sits on the board (fractions of the screenshot). The page and the
   tree are crops of the same screenshot at the same place; the lens and the banner are extras that
   only exist in the exploded view */
const layers = [
  { n: 1, kind: "part", left: 0.43, top: 0.085, width: 0.455, z: 64, crop: { name: "application", x: 0.43, y: 0.085, w: 0.455, aspect: (0.455 * 1917) / (0.915 * 1328) } },
  { n: 2, kind: "part", left: 0, top: 0.062, width: 0.31, z: 64, crop: { name: "application", x: 0, y: 0.062, w: 0.31, aspect: (0.31 * 1917) / (0.938 * 1328) } },
  { n: 3, kind: "extra", left: 0.6, top: 0.52, width: 0.24, z: 150, crop: { name: "magnifier", x: 0.28, y: 0.14, w: 0.26, aspect: 1.05 } },
  { n: 4, kind: "extra", left: 0.03, top: 0.6, width: 0.3, z: 150, crop: { name: "layout-error", x: 0, y: 0.056, w: 0.4, aspect: 2.2 } }
];

const assembled = ref(false);
const active = ref<number | null>(null);
</script>

<style scoped>

.h-panel {
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 48px;
  align-items: center;
  overflow: hidden;
}

/* The stage: perspective from above and the right; the board holds the layers in 3D */
.h-stage {
  position: relative;
  height: 560px;
  perspective: 2200px;
  perspective-origin: 50% 30%;
}

.h-board {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 78%;
  aspect-ratio: 1917 / 1328;
  transform-style: preserve-3d;
  transform: translate(-50%, -58%) rotateX(50deg) rotateZ(-26deg);
  transition: transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.h-layer {
  position: absolute;
  transform: translateZ(var(--z, 0px));
  transition: transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.5s ease, box-shadow 0.4s ease;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 14%, transparent), 0 24px 40px -12px rgba(16, 24, 40, 0.3);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
}

html.dark .h-layer {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14), 0 24px 40px -12px rgba(0, 0, 0, 0.7);
}

.h-base {
  inset: 0;
  --z: 0px;
  overflow: hidden;
  border-radius: 8px;
}

/* the base sits a little darker so the floating parts read as lifted */
.h-base::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(16, 24, 40, 0.08);
  transition: opacity 0.6s ease;
}

html.dark .h-base::after {
  background-color: rgba(0, 0, 0, 0.3);
}

.h-layer :deep(.companion-crop) {
  border-radius: inherit;
}

.h-layer.active {
  transform: translateZ(calc(var(--z) + 48px));
  box-shadow: 0 0 0 1.5px var(--vp-c-brand-1), 0 32px 48px -12px rgba(16, 24, 40, 0.35);
}

.has-active .h-layer:not(.active):not(.h-base) {
  opacity: 0.45;
}

/* Assembled: the board faces the reader, the parts drop into place, the extras fade */
.h-stage.assembled .h-board {
  transform: translate(-50%, -50%) rotateX(0deg) rotateZ(0deg);
}

.h-stage.assembled .h-layer {
  transform: translateZ(0);
  box-shadow: none;
}

.h-stage.assembled .h-layer.extra,
.h-stage.assembled .h-number {
  opacity: 0;
}

.h-stage.assembled .h-base::after {
  opacity: 0;
}

/* Numbers: on the layers' corners and in the rows */
.h-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1;
  color: #FFF;
  background-color: var(--vp-c-brand-1);
  transition: opacity 0.4s ease;
}

.h-layer .h-number {
  position: absolute;
  top: -13px;
  left: -13px;
  box-shadow: 0 0 0 3px var(--vp-c-bg);
}

/* Text */

.h-text {
  display: flex;
  flex-direction: column;
}

.h-rows {
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.h-rows li {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  border-top: 1px solid var(--vp-c-divider);
  transition: opacity 0.25s ease;
}

.h-rows li:last-child {
  border-bottom: 1px solid var(--vp-c-divider);
}

.h-rows .h-number {
  margin-top: 0;
}

.h-rows strong {
  display: block;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.h-rows p {
  margin: 2px 0 0;
}

.h-rows li:not(.active) .h-number {
  background-color: color-mix(in srgb, var(--vp-c-text-1) 70%, transparent);
}

.h-actions {
  margin-top: 32px;
}

@media (prefers-reduced-motion: reduce) {
  .h-board,
  .h-layer {
    transition: none;
  }
}

@media screen and (max-width: 1100px) {
  .h-panel {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }

  .h-stage {
    order: 2;
  }
}

/* phones: no 3D, the plain screenshot */
@media screen and (max-width: 760px) {
  .h-stage {
    height: auto;
    perspective: none;
  }

  .h-board,
  .h-stage.assembled .h-board {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    transform: none;
  }

  .h-layer:not(.h-base) {
    display: none;
  }

  .h-base {
    position: relative;
  }

  .h-base::after {
    display: none;
  }
}

</style>

<template>
  <!-- B · Annotated drawing: a header band across the panel, then the app as a labelled figure. Two
       pins sit on the screenshot, two detail insets (layout error, measurement) overlap its lower
       corners, and each capability is a callout in the gutter joined to its spot by a leader line.
       Below 1300px the leaders go and the callouts become a numbered list under the figure. -->
  <section class="content">
    <div class="panel b-panel">
      <div class="b-header">
        <div>
          <h2 class="card-title">{{ title }}</h2>
          <p class="card-description">{{ description }}</p>
        </div>
        <CompanionActions layout="stack" menu-end class="b-actions" />
      </div>

      <figure class="b-figure">
        <div class="b-drawing">
          <div class="b-shot">
            <CompanionShot name="application" />
          </div>

          <!-- detail insets: magnified parts of two other screenshots -->
          <div class="b-inset inset-debug">
            <CompanionCrop name="layout-error" :x="0" :y="0.056" :w="0.42" :aspect="1.9" />
            <span class="b-number">4</span>
          </div>
          <div class="b-inset inset-measure">
            <CompanionCrop name="measurement-vertical" :x="0.395" :y="0.125" :w="0.27" :aspect="1.6" />
            <span class="b-number">3</span>
          </div>

          <!-- pins on the screenshot itself, in the blank space next to what they point at -->
          <span class="b-pin" :style="{ '--x': callouts[0].x, '--y': callouts[0].y }">1</span>
          <span class="b-pin" :style="{ '--x': callouts[1].x, '--y': callouts[1].y }">2</span>

          <!-- callouts as wide as the drawing, so --x can be a share of its width -->
          <div
            v-for="callout of callouts"
            :key="callout.number"
            class="b-callout"
            :class="[callout.side, { 'to-pin': callout.number <= 2 }]"
            :style="{ '--x': callout.x, '--y': callout.y }">
            <span class="b-leader" aria-hidden="true"></span>
            <div class="b-label">
              <strong>{{ callout.capability.title }}</strong>
              <p>{{ callout.capability.description }}</p>
            </div>
          </div>
        </div>

        <!-- the same callouts as a list, for widths without gutters -->
        <ol class="b-list">
          <li v-for="callout of callouts" :key="callout.number">
            <span class="b-number">{{ callout.number }}</span>
            <div>
              <strong>{{ callout.capability.title }}</strong>
              <p>{{ callout.capability.description }}</p>
            </div>
          </li>
        </ol>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import CompanionActions from "./CompanionActions.vue";
import CompanionCrop from "./CompanionCrop.vue";
import CompanionShot from "./CompanionShot.vue";
import { capabilities, description, title } from "./companion";

const [reload, hierarchy, measure, debug] = capabilities;

/* in reading order: right top, left top, right bottom, left bottom. x and y are fractions of the
   screenshot: the pin's place, or for the insets the inset's outer edge */
const callouts = [
  { number: 1, capability: reload, side: "right", x: 0.68, y: 0.155 },
  { number: 2, capability: hierarchy, side: "left", x: 0.165, y: 0.226 },
  { number: 3, capability: measure, side: "right", x: 1.04, y: 0.72 },
  { number: 4, capability: debug, side: "left", x: -0.04, y: 0.715 }
];
</script>

<style scoped>

.b-panel {
  width: 100%;
}

.b-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px 64px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.b-header > div:first-child {
  max-width: 620px;
}

.b-actions {
  flex-shrink: 0;
  align-items: flex-end !important;
}

.b-figure {
  margin: 56px 0 8px;
  padding: 0 300px;
}

.b-drawing {
  position: relative;
}

.b-shot {
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--vp-c-text-1) 12%, transparent);
  box-shadow: 0 16px 48px -16px rgba(16, 24, 40, 0.2);
}

html.dark .b-shot {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 16px 48px -16px rgba(0, 0, 0, 0.6);
}

/* Insets: a magnified detail overlapping a corner, like the detail views of a technical drawing */

.b-inset {
  position: absolute;
  width: 36%;
}

.b-inset :deep(.companion-crop) {
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--vp-c-text-1) 14%, transparent);
  box-shadow: 0 12px 32px -8px rgba(16, 24, 40, 0.28);
  background-color: var(--vp-c-bg);
}

html.dark .b-inset :deep(.companion-crop) {
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.7);
}

.inset-debug {
  left: -4%;
  top: 58%;
}

.inset-measure {
  right: -4%;
  top: 56%;
}

/* Pins and numbers: the brand blue, with a ring so they read on any part of the screenshot */

.b-pin,
.b-number {
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
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.9), 0 2px 6px rgba(16, 24, 40, 0.3);
}

html.dark .b-pin,
html.dark .b-number {
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.55), 0 2px 6px rgba(0, 0, 0, 0.5);
}

.b-pin {
  position: absolute;
  left: calc(var(--x) * 100%);
  top: calc(var(--y) * 100%);
  transform: translate(-50%, -50%);
  z-index: 2;
}

/* the inset's number sits on its outer top corner */
.b-inset .b-number {
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 2;
}

.inset-measure .b-number {
  left: auto;
  right: -10px;
}

/* Callouts: the label in the gutter, its title level with the leader, the dot on the target */

.b-callout {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(var(--y) * 100%);
  height: 0;
}

.b-leader {
  position: absolute;
  top: 0;
  height: 1px;
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 50%, transparent);
}

.left .b-leader {
  left: -44px;
  width: calc(44px + var(--x) * 100%);
}

.right .b-leader {
  left: calc(var(--x) * 100%);
  right: -44px;
}

.b-leader::before {
  content: "";
  position: absolute;
  top: -2.5px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-1);
}

.left .b-leader::before {
  right: -3px;
}

.right .b-leader::before {
  left: -3px;
}

/* pins carry their own marker, so those leaders stop at the pin's edge */
.to-pin .b-leader::before {
  display: none;
}

.right.to-pin .b-leader {
  left: calc(var(--x) * 100% + 14px);
}

.left.to-pin .b-leader {
  width: calc(44px + var(--x) * 100% - 14px);
}

.b-label {
  position: absolute;
  top: -12px;
  width: 244px;
}

.left .b-label {
  right: calc(100% + 56px);
  text-align: right;
}

.right .b-label {
  left: calc(100% + 56px);
}

.b-label strong,
.b-list strong {
  display: block;
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.b-label p,
.b-list p {
  margin: 4px 0 0;
  font-size: 1rem;
  line-height: 1.5rem;
}

.b-list {
  display: none;
}

@media screen and (max-width: 1400px) {
  .b-figure {
    padding: 0 280px;
  }

  .b-label {
    width: 220px;
  }
}

/* No room for the gutters: the figure takes the full width and the callouts become a numbered list */
@media screen and (max-width: 1300px) {
  .b-figure {
    padding: 0;
    margin-top: 40px;
  }

  .b-callout {
    display: none;
  }

  .b-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 40px;
    margin: 72px 0 0;
    padding: 0;
    list-style: none;
  }

  .b-list li {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .b-list .b-number {
    margin-top: 1px;
    box-shadow: none;
  }
}

@media screen and (max-width: 760px) {
  .b-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .b-actions {
    align-items: flex-start !important;
  }

  .b-list {
    grid-template-columns: minmax(0, 1fr);
    margin-top: 48px;
  }

  .b-pin,
  .b-inset .b-number {
    width: 20px;
    height: 20px;
    font-size: 0.6875rem;
  }

  .b-inset .b-number {
    top: -8px;
    left: -8px;
  }

  .inset-measure .b-number {
    right: -8px;
  }
}

</style>

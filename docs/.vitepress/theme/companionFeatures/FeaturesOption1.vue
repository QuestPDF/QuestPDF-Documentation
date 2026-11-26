<script setup lang="ts">
import { ref } from "vue";
import Icon from "../Icon.vue";
import { useDotWings } from "../dotWings";
import FeaturesHero from "./FeaturesHero.vue";
import GetStarted from "./GetStarted.vue";
import FeatureClip from "./FeatureClip.vue";
import FeatureDetails from "./FeatureDetails.vue";
import ShortcutSheet from "./ShortcutSheet.vue";
import DownloadClosing from "./DownloadClosing.vue";
import { featuresOf, groups } from "./features";
import { useSectionLink } from "./sectionLink";

const { copied, copyLink } = useSectionLink();

/* PROTOTYPE, option 1: alternating rows. Every feature is a homepage-style panel with its clip on one side and the
   text on the other; the side swaps from row to row, and a dotted divider opens each group. */
const root = ref<HTMLElement>();
useDotWings(root);
</script>

<template>
  <div ref="root" class="custom-page texture-dots option">
    <div class="content">
      <FeaturesHero video />

      <div class="dotted-divider"></div>

      <GetStarted />

      <template v-for="group of groups" :key="group.id">
        <div class="dotted-divider"></div>

        <section class="group">
          <div class="group-header">
            <h2 class="group-title">{{ group.title }}</h2>
            <p class="group-description">{{ group.description }}</p>
          </div>

          <article
              v-for="(feature, index) of featuresOf(group.id)"
              :id="feature.id"
              :key="feature.id"
              class="panel row"
              :class="{ flipped: index % 2 === 1 }">
            <FeatureClip class="row-clip" :feature="feature" :mirrored="index % 2 === 1" />

            <div class="row-text">
              <div class="row-heading">
                <a class="feature-link" :href="`#${feature.id}`" :aria-label="`Link to ${feature.title}`"
                   title="Link to this feature (copies it)" @click="copyLink(feature.id)">
                  <Icon :icon="feature.icon" />
                  <span v-if="copied === feature.id" class="feature-link-note">Link copied</span>
                </a>
                <h3 class="card-title">{{ feature.title }}</h3>
              </div>
              <FeatureDetails :feature="feature" />
            </div>
          </article>
        </section>
      </template>

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
  gap: var(--section-gap);
  container-type: inline-size;
}

.option .dotted-divider {
  margin: 24px 0;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.group-header {
  max-width: 640px;
  margin: 0 auto 8px;
  text-align: center;
}

.group-title {
  margin: 0;
}

.group-description {
  margin: 8px 0 0;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.row {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  grid-template-areas: "clip text";
  gap: 48px;
  align-items: center;
  overflow: clip;
}

.row.flipped {
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  grid-template-areas: "text clip";
}

.row-clip {
  grid-area: clip;
}

.row-text {
  grid-area: text;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  container-type: inline-size;
}

/* the icon and the title side by side, the icon in colour */
.row-heading {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

/* the icon, in colour and without a tile, is the feature's link (see sectionLink.ts) */
.feature-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: -8px;
  border-radius: 10px;
  padding: 8px;
  font-size: 1.5rem;
  color: light-dark(#1976D2, var(--vp-c-brand-1));
  text-decoration: none;
  transition: background-color 0.12s ease;
}

.feature-link:hover {
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
}

.feature-link-note {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.25rem;
  white-space: nowrap;
  color: #FFF;
  background-color: light-dark(#1976D2, var(--vp-c-brand-1));
  pointer-events: none;
}

.row {
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
}

.row-text .card-title {
  margin: 0;
}

.row-text .details {
  align-self: stretch;
}

@container (max-width: 900px) {
  .row,
  .row.flipped {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "clip" "text";
    gap: 28px;
  }
}

</style>

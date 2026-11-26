<script setup lang="ts">
import { ref } from "vue";
import Icon from "../Icon.vue";
import { useDotWings } from "../dotWings";
import FeaturesHero from "./FeaturesHero.vue";
import GetStarted from "./GetStarted.vue";
import FeatureClip from "./FeatureClip.vue";
import FeatureDetails from "./FeatureDetails.vue";
import ShortcutList from "./ShortcutList.vue";
import ShortcutSheet from "./ShortcutSheet.vue";
import DownloadClosing from "./DownloadClosing.vue";
import { featuresOf, groups, shortcutsOf } from "./features";

/* PROTOTYPE, option 5: sections. In each of the four groups a sticky column names the group, lists its
   features with their shortcuts and leads to the next section; the features follow as cards with the clip on top. */
const root = ref<HTMLElement>();
useDotWings(root);
</script>

<template>
  <div ref="root" class="custom-page texture-dots option">
    <div class="content">
      <FeaturesHero video />

      <div class="dotted-divider"></div>

      <GetStarted />

      <template v-for="(group, index) of groups" :key="group.id">
        <div class="dotted-divider"></div>

        <section :id="group.id" class="group">
          <aside class="group-aside">
            <div class="group-sticky">
              <span class="icon-tile"><Icon :icon="group.icon" /></span>
              <h2 class="group-title">{{ group.title }}</h2>
              <p class="group-description">{{ group.description }}</p>

              <ul class="group-index">
                <li v-for="feature of featuresOf(group.id)" :key="feature.id">
                  <a :href="`#${feature.id}`">
                    <Icon :icon="feature.icon" />
                    {{ feature.title }}
                  </a>
                  <ShortcutList v-if="shortcutsOf(feature).length" class="index-shortcuts" :shortcuts="shortcutsOf(feature)" />
                </li>
              </ul>

              <!-- the way on: the next group, or the shortcuts after the last -->
              <a v-if="groups[index + 1]" class="section-next" :href="`#${groups[index + 1].id}`">
                <span class="section-next-label">Next section</span>
                <span class="section-next-title">
                  {{ groups[index + 1].title }}
                  <span class="vpi-arrow-right section-next-arrow" />
                </span>
              </a>

              <a v-else class="section-next" href="#shortcuts">
                <span class="section-next-label">Next section</span>
                <span class="section-next-title">
                  Keyboard and mouse shortcuts
                  <span class="vpi-arrow-right section-next-arrow" />
                </span>
              </a>
            </div>
          </aside>

          <div class="group-cards">
            <article v-for="feature of featuresOf(group.id)" :id="feature.id" :key="feature.id" class="panel card">
              <FeatureClip :feature="feature" />

              <div class="card-text">
                <h3 class="card-title">{{ feature.title }}</h3>
                <FeatureDetails :feature="feature" />
              </div>
            </article>
          </div>
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
  gap: 48px;
  container-type: inline-size;
}

.group-sticky .icon-tile .icon {
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}

.option .dotted-divider {
  margin: 8px 0;
}

.group {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 56px;
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
}

.group-sticky {
  position: sticky;
  top: calc(var(--vp-nav-height) + 32px);
}

.group-title {
  margin: 20px 0 8px;
}

.group-description {
  margin: 0;
}

.group-index {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}

/* a feature's shortcuts, in line with its name */
.index-shortcuts {
  margin: 2px 0 14px 28px;
}

.group-index a {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: -10px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: background-color 0.15s ease, color 0.15s ease;
}

.group-index a:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-default-soft);
}

.group-index .icon {
  width: 16px;
  color: var(--vp-c-text-3);
}

.section-next {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 28px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.section-next:hover {
  border-color: light-dark(#1976D2, var(--vp-c-brand-1));
  background-color: var(--vp-c-default-soft);
}

.section-next-label {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.section-next-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.section-next:hover .section-next-title {
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}

/* pointing down the page to the next section */
.section-next-arrow {
  flex: none;
  font-size: 1rem;
  transform: rotate(90deg);
  transition: transform 0.15s ease;
}

.section-next:hover .section-next-arrow {
  transform: rotate(90deg) translateX(2px);
}

.group-cards {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 16px 16px 32px;
  overflow: clip;
  border-radius: 28px;
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
  container-type: inline-size;
}

.card-text {
  padding: 0 16px;
}

.card-text .card-title {
  margin-bottom: 14px;
}

@container (max-width: 960px) {
  .group {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
  }

  .group-sticky {
    position: static;
  }

  .group-index {
    display: none;
  }
}

</style>

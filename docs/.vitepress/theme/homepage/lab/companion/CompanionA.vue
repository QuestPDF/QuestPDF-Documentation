<template>
  <!-- A · Product stage: the header on the canvas like a section header, then one panel with the four
       capabilities as a hairline-divided row and the app rising out of the panel's bottom edge -->
  <section class="content stage-a">
    <header class="a-header">
      <h2>{{ title }}</h2>
      <p class="sub-header">{{ description }}</p>
      <CompanionActions layout="center" />
    </header>

    <div class="panel a-panel">
      <ul class="a-capabilities" aria-label="What the Companion App does">
        <li v-for="capability of capabilities" :key="capability.key">
          <i class="fa-regular" :class="capability.icon" aria-hidden="true"></i>
          <strong>{{ capability.title }}</strong>
          <p>{{ capability.description }}</p>
        </li>
      </ul>

      <div class="a-window">
        <CompanionShot name="application" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CompanionActions from "./CompanionActions.vue";
import CompanionShot from "./CompanionShot.vue";
import { capabilities, description, title } from "./companion";
</script>

<style scoped>

.stage-a {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 48px;
}

.a-header {
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.a-header h2 {
  margin: 0 0 16px;
}

.a-header .sub-header {
  margin-bottom: 32px;
}

/* the panel loses its bottom padding: the window runs into the edge and is cut there */
.custom-page.home-page .a-panel {
  padding-bottom: 0;
  overflow: hidden;
}

/* Capabilities: four columns divided by hairlines, an icon in the brand colour above a bold name
   and its explanation; no icon tiles, so the list does not repeat the quick start's */

.a-capabilities {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}

.a-capabilities li {
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  border-left: 1px solid var(--vp-c-divider);
}

.a-capabilities li:first-child {
  padding-left: 0;
  border-left: 0;
}

.a-capabilities li:last-child {
  padding-right: 0;
}

.a-capabilities i {
  font-size: 20px;
  line-height: 24px;
  color: var(--vp-c-brand-1);
  margin-bottom: 16px;
}

.a-capabilities strong {
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.a-capabilities p {
  margin: 6px 0 0;
}

/* the app, centred and cut by the panel's bottom edge after about half its height */
.a-window {
  width: min(100%, 1040px);
  margin: 48px auto 0;
  aspect-ratio: 1917 / 760;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--vp-c-text-1) 12%, transparent);
  border-bottom: 0;
  border-radius: 14px 14px 0 0;
  box-shadow: 0 24px 64px -16px rgba(16, 24, 40, 0.22);
}

html.dark .a-window {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 24px 64px -16px rgba(0, 0, 0, 0.6);
}

@media screen and (max-width: 1100px) {
  .a-capabilities {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px 0;
  }

  .a-capabilities li:nth-child(odd) {
    padding-left: 0;
    border-left: 0;
  }

  .a-capabilities li:nth-child(even) {
    padding-right: 0;
  }
}

@media screen and (max-width: 640px) {
  .a-capabilities {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }

  .a-capabilities li {
    padding: 0;
    border-left: 0;
  }

  .a-window {
    margin-top: 32px;
    aspect-ratio: 1917 / 1000;
  }
}

</style>

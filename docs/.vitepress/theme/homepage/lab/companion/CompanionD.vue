<template>
  <!-- D · Spotlight: the one dark stage on the page, in both themes. The app on the left in its dark
       theme with a blue glow behind it, the text on the right. The capabilities are hairline rows
       with the keyboard shortcuts from the features page as key caps, no icons. -->
  <section class="content">
    <div class="panel d-stage">
      <div class="d-visual">
        <div class="d-glow" aria-hidden="true"></div>
        <div class="d-shot">
          <CompanionShot name="application" theme="dark" />
        </div>
      </div>

      <div class="d-text">
        <h2 class="card-title">{{ title }}</h2>
        <p class="card-description">{{ description }}</p>

        <ul class="d-rows" aria-label="What the Companion App does">
          <li v-for="capability of capabilities" :key="capability.key">
            <div class="d-row-head">
              <strong>{{ capability.title }}</strong>
              <span class="d-keys" :title="capability.keysLabel">
                <kbd v-for="key of capability.keys" :key="key" :class="{ wide: key.length > 5 }">{{ key }}</kbd>
              </span>
            </div>
            <p>{{ capability.description }}</p>
          </li>
        </ul>

        <CompanionActions layout="stack" menu-up class="d-actions" />
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

/* the stage keeps its own colours in both themes; the text tokens are redefined on it, so the
   shared typography and the actions pick them up */
.custom-page.textured-page .d-stage {
  --vp-c-text-1: rgba(255, 255, 255, 0.95);
  --vp-c-text-2: rgba(235, 235, 245, 0.68);
  --vp-c-text-3: rgba(235, 235, 245, 0.45);
  --vp-c-divider: rgba(255, 255, 255, 0.1);
  --vp-c-bg-elv: #1C2333;
  --vp-c-default-soft: rgba(255, 255, 255, 0.08);
  --home-surface-rim: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.01));

  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 64px;
  align-items: center;
  overflow: hidden;
  background-color: #0D1424;
  background-image:
      radial-gradient(ellipse 70% 80% at 0% 0%, rgba(33, 150, 243, 0.16), transparent 70%),
      radial-gradient(ellipse 60% 70% at 100% 100%, rgba(63, 81, 181, 0.16), transparent 70%);
  box-shadow: 0 24px 64px -28px rgba(13, 20, 36, 0.55);
}

html.dark .custom-page.textured-page .d-stage {
  background-color: #0A101D;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.d-visual {
  position: relative;
}

.d-glow {
  position: absolute;
  inset: -10% -6%;
  background: radial-gradient(ellipse 50% 50% at 50% 50%, rgba(33, 150, 243, 0.3), transparent 70%);
  filter: blur(8px);
  pointer-events: none;
}

.d-shot {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 32px 64px -16px rgba(0, 0, 0, 0.7);
}

.d-text {
  display: flex;
  flex-direction: column;
}

/* Rows: a hairline above each, the name and its keys on one line, the explanation under them */

.d-rows {
  margin: 32px 0 0;
  padding: 0;
  list-style: none;
}

.d-rows li {
  padding: 18px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.d-rows li:last-child {
  border-bottom: 1px solid var(--vp-c-divider);
}

.d-row-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.d-rows strong {
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.d-rows p {
  margin: 4px 0 0;
}

.d-keys {
  display: inline-flex;
  gap: 4px;
  flex-shrink: 0;
}

kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 26px;
  padding: 0 7px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-bottom-width: 2px;
  background-color: rgba(255, 255, 255, 0.06);
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  line-height: 1;
  color: rgba(255, 255, 255, 0.85);
}

kbd.wide {
  padding: 0 9px;
}

.d-actions {
  margin-top: 32px;
}

/* the secondary button reads on the dark stage */
.d-actions :deep(.download-toggle) {
  background-color: rgba(255, 255, 255, 0.1);
}

.d-actions :deep(.download-toggle:hover) {
  background-color: rgba(255, 255, 255, 0.16);
}

@media screen and (max-width: 1100px) {
  .custom-page.textured-page .d-stage {
    grid-template-columns: minmax(0, 1fr);
    gap: 48px;
  }

  .d-visual {
    order: 2;
  }
}

</style>

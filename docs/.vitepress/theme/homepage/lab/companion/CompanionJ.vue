<template>
  <!-- J · Session log: one card, where a short session with the app reads like a log. Each capability
       is an entry on a timeline: its name and explanation, a monospaced line of what happened (the
       element names and values are the ones visible in the screenshots) and a crop that shows it.
       C2's single card with hairlines, read top to bottom instead of across. -->
  <section class="content">
    <div class="panel j-panel">
      <div class="j-header">
        <div>
          <h2 class="card-title">{{ title }}</h2>
          <p class="card-description">{{ description }}</p>
        </div>
        <CompanionActions layout="stack" menu-end class="j-actions" />
      </div>

      <ol class="j-log" aria-label="What the Companion App does">
        <li v-for="entry of entries" :key="entry.capability.key" class="j-entry">
          <span class="j-dot" aria-hidden="true"><i class="fa-regular" :class="entry.capability.icon"></i></span>
          <div class="j-text">
            <strong>{{ entry.capability.title }}</strong>
            <p>{{ entry.capability.description }}</p>
            <code class="j-event"><span class="j-event-from">{{ entry.event[0] }}</span><i class="fa-regular fa-arrow-right" aria-hidden="true"></i><span>{{ entry.event[1] }}</span></code>
          </div>
          <div class="j-frame">
            <CompanionCrop v-bind="entry.crop" />
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import CompanionActions from "./CompanionActions.vue";
import CompanionCrop from "./CompanionCrop.vue";
import { capabilities, description, title } from "./companion";

const [reload, hierarchy, measure, debug] = capabilities;

/* event: what you did, what the app did. Names and values come from the screenshots: the class is
   InvoiceDocument (see the exception screenshot), 50.0 is the page's 50 pt margin, Row is the element
   marked as the layout error's root cause. */
const entries = [
  { capability: reload, event: ["InvoiceDocument.cs saved", "preview refreshed"], crop: { name: "application", x: 0.43, y: 0.085, w: 0.46, aspect: 3.4 } },
  { capability: hierarchy, event: ["AddressComponent selected", "opened in your IDE"], crop: { name: "selection", x: 0, y: 0.36, w: 0.34, aspect: 3.4 } },
  { capability: measure, event: ["page edge to Invoice #8131", "50.0 pt"], crop: { name: "measurement-vertical", x: 0.37, y: 0.178, w: 0.36, aspect: 3.4 } },
  { capability: debug, event: ["Layout error 1 / 3", "root cause: Row"], crop: { name: "layout-error", x: 0, y: 0.056, w: 0.42, aspect: 3.4 } }
];
</script>

<style scoped>

.custom-page.home-page .j-panel {
  width: 100%;
  padding: 0;
}

.j-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px 64px;
  padding: 48px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.j-header > div:first-child {
  max-width: 620px;
}

.j-actions {
  flex-shrink: 0;
  align-items: flex-end !important;
}

/* The log: a rail down the left joins the entries' dots */
.j-log {
  position: relative;
  margin: 0;
  padding: 4px 48px 8px;
  list-style: none;
}

.j-log::before {
  content: "";
  position: absolute;
  left: calc(48px + 19px);
  top: 40px;
  bottom: 56px;
  width: 1px;
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
}

.j-entry {
  position: relative;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) minmax(0, 400px);
  gap: 20px 32px;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.j-entry:first-child {
  border-top: 0;
}

.j-dot {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  align-self: start;
  margin-top: 2px;
  background-color: var(--vp-c-bg);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent);
  font-size: 16px;
  color: var(--vp-c-brand-1);
}

html.dark .j-dot {
  background-color: #1F2A3A;
}

.j-text strong {
  display: block;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.j-text p {
  margin: 4px 0 0;
}

/* the event line: monospaced, quiet, what happened */
.j-event {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 10px;
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: var(--home-surface-inner);
  font-size: 0.8125rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-2);
}

.j-event i {
  font-size: 0.75rem;
  color: var(--vp-c-brand-1);
}

.j-event span:last-child {
  color: var(--vp-c-text-1);
}

.j-frame {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent);
}

html.dark .j-frame {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
}

@media screen and (max-width: 1100px) {
  .j-entry {
    grid-template-columns: 40px minmax(0, 1fr);
  }

  .j-frame {
    grid-column: 2;
  }

  .j-log::before {
    bottom: 32px;
  }
}

@media screen and (max-width: 760px) {
  .j-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 32px 24px;
  }

  .j-actions {
    align-items: flex-start !important;
  }

  .j-log {
    padding: 0 24px 8px;
  }

  .j-log::before {
    left: calc(24px + 15px);
  }

  .j-entry {
    grid-template-columns: 32px minmax(0, 1fr);
    gap: 16px;
  }

  .j-dot {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }

  /* a full-width strip at 3.4:1 would shrink the text in the crops to nothing; taller crops keep it legible */
  .j-frame :deep(.companion-crop) {
    aspect-ratio: 2 !important;
  }
}

</style>

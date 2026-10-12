<script setup lang="ts">
/* A copy of the "All you need to generate and modify PDFs" card: the same pitch and links on the
   left, and whatever a lab variant puts into the default slot on the right. The card's own chip
   styles are repeated here (unscoped, under .lab-panel) because they live in HomePage.vue, which
   the lab page does not render. */
</script>

<template>
  <section class="panel features-panel lab-panel">
    <div class="features-text">
      <h2>All you need to generate and modify PDFs</h2>
      <p class="sub-header">From layout and styling to production features, QuestPDF gives you the flexibility to create documents of any complexity. Merge, split, overlay, attach and encrypt the PDF documents you already have, with the same fluent C# API.</p>

      <div class="actions">
        <a class="action primary" href="/features-overview.html" target="_blank">
          Explore all features
        </a>
        <a class="action" href="/concepts/document-operations.html" target="_blank">
          Explore document operations
        </a>
      </div>
    </div>

    <div class="features-stage">
      <slot />
    </div>
  </section>
</template>

<style scoped>

.features-panel {
  display: grid;
  grid-template-columns: minmax(0, 9fr) minmax(0, 11fr);
  column-gap: 80px;
  align-items: center;
  padding: 64px;
}

.features-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.features-text h2 {
  font-size: 1.5rem;
  line-height: 2rem;
}

.sub-header {
  margin-bottom: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.features-stage {
  min-width: 0;
}

@media screen and (max-width: 1280px) {
  .features-panel {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 40px;
  }
}

@media screen and (max-width: 700px) {
  .features-panel {
    padding: 32px 24px;
  }
}

</style>

<style>

/* Chips, as on the homepage card (HomePage.vue), plus the shared "lit" state that most variants
   use to point at a tag: a brand tint, brand text, a small lift. */

.lab-panel .chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.lab-panel .chip {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;

  border-radius: 12px;
  background-color: var(--home-surface-inner);

  color: var(--vp-c-text-1);
  font-size: 0.9375rem;
  line-height: 1.25rem;
  font-weight: 500;
  white-space: nowrap;

  transition:
      background-color 0.35s ease,
      color 0.35s ease,
      transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 0.35s ease,
      opacity 0.35s ease;
}

.lab-panel .chip i {
  width: 18px;
  text-align: center;
  font-size: 16px;
  color: inherit;
  transition: color 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

html.dark .lab-panel .chip {
  background-color: #0004;
}

.lab-panel .chip.lit {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 16%, var(--home-surface-inner));
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -8px color-mix(in srgb, var(--vp-c-brand-2) 60%, transparent);
}

.lab-panel .chip.lit i {
  transform: scale(1.15);
}

html.dark .lab-panel .chip.lit {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 22%, #0004);
}

.lab-panel .chip.trail-1 {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 9%, var(--home-surface-inner));
}

.lab-panel .chip.trail-2 {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 4%, var(--home-surface-inner));
}

html.dark .lab-panel .chip.trail-1 {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 12%, #0004);
}

html.dark .lab-panel .chip.trail-2 {
  background-color: color-mix(in srgb, var(--vp-c-brand-2) 5%, #0004);
}

/* the default stage: tags hugging the right edge with "and many more" under them */
.lab-panel .tags {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}

.lab-panel .more {
  margin: 0;
  padding: 0 16px;
  font-size: 0.9375rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-3);
}

/* a page drawn in CSS, shared by the variants that show documents */
.lab-panel .sheet {
  position: relative;
  background: white;
  border-radius: 4px;
  border: 1px solid #0002;
  box-shadow:
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      0 8px 12px -3px rgba(0, 0, 0, 0.08);
}

html.dark .lab-panel .sheet {
  background: #22262c;
  border-color: #fff2;
  box-shadow:
      0 2px 4px -1px rgba(0, 0, 0, 0.3),
      0 8px 12px -3px rgba(0, 0, 0, 0.3);
}

/* text as grey bars */
.lab-panel .ink {
  background-color: color-mix(in srgb, var(--vp-c-text-1) 22%, transparent);
  border-radius: 2px;
}

@media screen and (max-width: 1280px) {
  .lab-panel .chips {
    justify-content: flex-start;
  }

  .lab-panel .tags {
    align-items: flex-start;
  }
}

</style>

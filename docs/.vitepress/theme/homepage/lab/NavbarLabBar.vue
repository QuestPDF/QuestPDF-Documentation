<template>
  <!-- A mock of the real navbar at the real sizes (64px bar, 36px pills, 1rem links, 10px radius),
       with the theme tokens scoped on the element so a light and a dark bar can sit on one page.
       `direction` picks the active-link treatment, `surface` the dark bar background, `flush`
       drops the rounded frame so the bar can sit at the top of a stage like the real one. -->
  <div class="mock-bar" :class="[mode, `direction-${direction}`, surface ? `surface-${surface}` : null, { flush }]">
    <div class="mock-brand">
      <img src="/logo.webp" alt="" />
      <span>QuestPDF</span>
    </div>

    <div class="mock-search">
      <i class="fa-regular fa-magnifying-glass"></i>
      <span>Search</span>
      <kbd>⌘ K</kbd>
    </div>

    <nav class="mock-links">
      <a v-for="link of links" :key="link" href="#" :class="{ active: link === active, hover: link === hover }" @click.prevent>{{ link }}</a>
    </nav>

    <div class="mock-toggle">
      <span class="mock-toggle-knob"><i class="fa-regular" :class="mode === 'dark' ? 'fa-moon' : 'fa-sun'"></i></span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  mode: "light" | "dark";
  direction: string;
  surface?: string;
  flush?: boolean;
  active?: string;
  hover?: string;
}>(), { flush: false, active: "Pricing", hover: "Features" });

const links = ["Documentation", "Features", "Pricing", "GitHub", "NuGet", "Contact"];
</script>

<style scoped>

/* Token values are the VitePress defaults plus the overrides in VitepressAdjustments.css. */

.mock-bar {
  --m-bg: #ffffff;
  --m-text-1: rgba(60, 60, 67, 1);
  --m-text-2: rgba(60, 60, 67, 0.78);
  --m-text-3: rgba(60, 60, 67, 0.56);
  --m-divider: rgba(60, 60, 67, 0.12);
  --m-soft: rgba(142, 150, 170, 0.14);
  --m-brand: #0277BD;
  --m-brand-soft: #0091EA24;

  position: relative;
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  height: 64px;
  padding: 0 24px;
  border: 1px solid var(--m-divider);
  border-radius: 14px;
  background-color: var(--m-bg);
  color: var(--m-text-1);
  overflow: hidden;
}

.mock-bar.dark {
  --m-bg: #101010;
  --m-text-1: rgba(255, 255, 245, 0.86);
  --m-text-2: rgba(235, 235, 245, 0.6);
  --m-text-3: rgba(235, 235, 245, 0.38);
  --m-divider: rgba(82, 82, 89, 0.32);
  --m-soft: rgba(101, 117, 133, 0.16);
  --m-brand: #4FC3F7;
  --m-brand-soft: #0091EA24;
}

.mock-bar.flush {
  border: 0;
  border-bottom: 1px solid var(--m-divider);
  border-radius: 0;
}

.mock-brand {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  white-space: nowrap;
}

.mock-brand img {
  height: 32px;
  margin-right: 16px;
}

.mock-search {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  padding: 0 8px 0 12px;
  margin-left: 16px;
  border: 1px solid var(--m-divider);
  border-radius: 10px;
  font-size: 13px;
  color: var(--m-text-2);
  white-space: nowrap;
}

.mock-search i {
  font-size: 14px;
}

.mock-search kbd {
  margin-left: 8px;
  padding: 2px 6px;
  border: 1px solid var(--m-divider);
  border-radius: 6px;
  font-family: inherit;
  font-size: 12px;
  background-color: rgba(128, 128, 128, 0.08);
}

.mock-links {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}

.mock-links a {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 0.625rem;
  margin: 0 0.125rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
  color: var(--m-text-1);
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s, background-color 0.2s;
}

.mock-links a:hover,
.mock-links a.hover {
  background-color: var(--m-soft);
}

.mock-toggle {
  display: flex;
  align-items: center;
  width: 40px;
  height: 22px;
  padding: 2px;
  margin-left: 16px;
  border: 1px solid var(--m-divider);
  border-radius: 11px;
  background-color: var(--m-soft);
}

.mock-toggle-knob {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-size: 10px;
  background-color: var(--m-bg);
  color: var(--m-text-2);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.mock-bar.dark .mock-toggle-knob {
  margin-left: auto;
  background-color: #2a2a2e;
}

/* the real bar folds links into the ⋯ menu below about 1200px; the mock drops the search field instead so the links stay readable */
@media screen and (max-width: 1200px) {
  .mock-search {
    display: none;
  }

  .mock-bar {
    grid-template-columns: auto minmax(0, 1fr) auto;
  }
}

@media screen and (max-width: 700px) {
  .mock-toggle {
    display: none;
  }

  .mock-bar {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .mock-links a {
    font-size: 0.875rem;
    padding: 0 0.5rem;
  }
}


/* Active-link directions: only the active link changes */

/* 0: today */
.direction-current .mock-links a.active {
  color: var(--m-brand);
  background-color: var(--m-brand-soft);
}

/* A: the proposal, one colour for both themes */
.direction-solid .mock-links a.active {
  color: #ffffff;
  background-color: #1976D2;
}

/* B: solid, tuned per theme */
.direction-solid-tuned.light .mock-links a.active {
  color: #ffffff;
  background-color: #1976D2;
}

.direction-solid-tuned.dark .mock-links a.active {
  color: #0B1F33;
  background-color: #90CAF9;
}

/* C: stronger tint, heavier text */
.direction-tint.light .mock-links a.active {
  color: #0277BD;
  background-color: #039BE53D;
  font-weight: 600;
}

.direction-tint.dark .mock-links a.active {
  color: #81D4FA;
  background-color: #4FC3F733;
  font-weight: 600;
}

/* D: inverted neutral (shipped) */
.direction-inverted.light .mock-links a.active {
  color: #ffffff;
  background-color: #1C1C1E;
}

.direction-inverted.dark .mock-links a.active {
  color: #111111;
  background-color: #F5F5F7;
}

/* E: outlined */
.direction-outlined .mock-links a.active {
  color: var(--m-brand);
  background-color: color-mix(in srgb, var(--m-brand) 8%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--m-brand) 60%, transparent);
}

/* F: tab underline on the bar's bottom edge; the pill stays unpainted */
.direction-underline .mock-links a.active {
  color: var(--m-brand);
  font-weight: 600;
}

.direction-underline .mock-links a.active::after {
  content: "";
  position: absolute;
  left: 0.625rem;
  right: 0.625rem;
  bottom: -14px; /* the pill is 36px inside a 64px bar: 14px from pill edge to bar edge */
  height: 2px;
  border-radius: 2px 2px 0 0;
  background-color: var(--m-brand);
}

/* G: today's tint plus a short marker inside the pill's bottom edge */
.direction-tint-underline .mock-links a.active {
  color: var(--m-brand);
  background-color: var(--m-brand-soft);
}

.direction-tint-underline .mock-links a.active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 5px;
  width: 16px;
  height: 2px;
  border-radius: 1px;
  background-color: var(--m-brand);
  transform: translateX(-50%);
}

/* H: colour and weight only */
.direction-text .mock-links a.active {
  color: var(--m-brand);
  font-weight: 700;
}


/* Dark bar surfaces: what the bar is painted with in dark mode. Flat is today's bar.
   The selectors carry .mock-bar.dark so they outrank the dark token block above. */

.mock-bar.dark.surface-flat {
  --m-bg: #101010;
}

.mock-bar.dark.surface-lifted {
  --m-bg: #161618;
}

.mock-bar.dark.surface-elevated {
  --m-bg: #1B1B1F;
  --m-divider: rgba(255, 255, 255, 0.08);
}

.mock-bar.dark.surface-frosted {
  --m-bg: rgba(16, 16, 16, 0.72);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
}

.mock-bar.dark.surface-glass {
  --m-bg: rgba(255, 255, 255, 0.045);
  --m-divider: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.mock-bar.dark.surface-cool {
  --m-bg: #121418;
  --m-divider: rgba(120, 140, 170, 0.22);
}

/* the frosted and glass bars show the page through them, so the pill keeps its own solid colours */

</style>

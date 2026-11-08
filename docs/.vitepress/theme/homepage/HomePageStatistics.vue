<script setup lang="ts">
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faArrowDownToLine, faCalendarCheck, faStar, faUsers } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";
import { data as statistics } from "../statistics.data";

const icons: Record<string, IconDefinition> = {
  "GitHub stars": faStar,
  "NuGet downloads": faArrowDownToLine,
  "paying customers": faUsers,
  "years in production": faCalendarCheck
};
</script>

<template>
  <ul class="statistics">
    <li v-for="statistic in statistics" :key="statistic.label">
      <a :href="statistic.link" :target="statistic.link.startsWith('http') ? '_blank' : undefined" class="statistic">
        <span class="headline">
          <Icon :icon="icons[statistic.label]" />
          <span class="value">{{ statistic.value }}</span>
        </span>

        <span class="label">{{ statistic.label }}</span>
      </a>
    </li>
  </ul>
</template>


<style scoped>

/* no divider around the stats: extra space on both sides separates them, 64px in all */
.statistics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 40px 24px;
  margin-block: 32px;
}

@media screen and (max-width: 640px) {
  .statistics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px 16px;
  }
}

/* each stat is a link whose parts set their own colours, so the global link hover never reaches them */
.statistic {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin-inline: auto;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.18s ease-out;
}

/* hover: the whole stat grows and the label brightens; no surface, so the hit area stays invisible */
.statistic:hover {
  transform: scale(1.08);
}

@media (prefers-reduced-motion: reduce) {
  .statistic {
    transition: none;
  }
}

.statistic:hover .label {
  color: var(--vp-c-text-1);
}

.statistic:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 6px;
}

.headline {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}

/* same height for every glyph, width from its own shape, as Font Awesome sizes them; a 1em square shrinks the wide ones */
.headline .icon {
  width: auto;
  height: 1em;
  font-size: 1.75rem;
  color: var(--vp-c-brand-1);
}

.value {
  font-size: 1.875rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: light-dark(#142630, var(--vp-c-text-1));
}

.label {
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

/* grey text collides with the light canvas, and regular text looks thinner on white, so half a weight step up */
html:not(.dark) .label {
  font-weight: 450;
  color: var(--vp-c-text-1);
}

</style>

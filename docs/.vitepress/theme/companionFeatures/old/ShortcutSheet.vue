<script setup lang="ts">
import Icon from "../../Icon.vue";
import { allFeatures as features, groupOf, type Feature } from "./features";

/* PROTOTYPE: every shortcut of the app on one panel, grouped by feature, for options that show a feature at a time.
   Features with a single shortcut each share one block, so none of them stands alone with one row. */
type Block = Pick<Feature, "id" | "title" | "icon" | "shortcuts">;

/* features whose shortcuts share one block: it takes the place of the first of them, with its own title and the
   first one's group icon (`icon` overrides it) */
const MERGED: { id: string; title: string; features: string[]; icon?: Feature["icon"]; last?: boolean }[] = [
  /* Alt + Click and Ctrl + Click, as the last block (the bottom of the right-hand column) */
  { id: "other", title: "Other", features: ["links", "implementation"], last: true,
    icon: features.find(feature => feature.id === "links")?.icon }
];

const lastIds = new Set(MERGED.filter(merge => merge.last).map(merge => merge.id));

const blocks: Block[] = features
    .filter(feature => feature.shortcuts)
    .flatMap<Block>(feature => {
      const merge = MERGED.find(each => each.features.includes(feature.id));
      if (!merge) return [feature];

      const members = merge.features
          .map(id => features.find(each => each.id === id))
          .filter((each): each is Feature => !!each?.shortcuts);
      if (feature !== members[0]) return [];

      return [{
        id: merge.id,
        title: merge.title,
        icon: merge.icon ?? groupOf(members[0]).icon,
        shortcuts: members.flatMap(member => member.shortcuts ?? [])
      }];
    });

const withShortcuts = [...blocks.filter(block => !lastIds.has(block.id)), ...blocks.filter(block => lastIds.has(block.id))];
</script>

<template>
  <section id="shortcuts" class="panel sheet">
    <h2 class="card-title">Keyboard and mouse shortcuts</h2>

    <div class="sheet-columns">
      <div v-for="feature of withShortcuts" :key="feature.id" class="sheet-block">
        <h3 class="sheet-feature">
          <Icon :icon="feature.icon" />
          {{ feature.title }}
        </h3>

        <dl>
          <div v-for="shortcut of feature.shortcuts" :key="shortcut.action" class="sheet-row">
            <dt>
              <template v-for="(key, index) of shortcut.keys" :key="key">
                <span v-if="index > 0" class="plus">+</span>
                <kbd>{{ key }}</kbd>
              </template>
            </dt>
            <dd>{{ shortcut.action }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>

.sheet {
  scroll-margin-top: calc(var(--vp-nav-height) + 24px);
}

.sheet .card-title {
  margin-bottom: 28px;
}

/* narrower columns with more air between them: the gap grows, and each column gets what is left */
.sheet-columns {
  columns: 3 240px;
  column-gap: 88px;
}

.sheet-block {
  break-inside: avoid;
  margin-bottom: 40px;
}

.sheet-feature {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 8px;
  font-size: 1rem;
  line-height: 1.5rem;
}

.sheet-feature .icon {
  color: light-dark(#1976D2, var(--vp-c-brand-1));
}

dl {
  margin: 0;
}

.sheet-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 0;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.sheet-row:last-child {
  border-bottom: none;
}

dt {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 4px;
  order: 2;
}

dd {
  margin: 0;
  /* a wrapped action breaks into even lines, never leaving one word alone on the last */
  text-wrap: balance;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
}

.plus {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

kbd {
  display: inline-block;
  min-width: 24px;
  padding: 1px 7px;
  border-radius: 6px;
  font-family: var(--vp-font-family-base);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.25rem;
  text-align: center;
  color: var(--vp-c-text-1);
  background-color: var(--surface-inner);
  box-shadow:
      inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 12%, transparent),
      inset 0 -2px 0 color-mix(in srgb, var(--vp-c-text-1) 8%, transparent);
}

</style>

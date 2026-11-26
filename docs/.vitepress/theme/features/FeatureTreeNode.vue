<script setup lang="ts">
import type { FeatureNode } from "./featureTree";
import { Marked, toHref } from "./treeFilter";

/* One feature of the tree with the features under it, on the branch that joins it to the one above. */
const { node, depth } = defineProps<{ node: FeatureNode; depth: number }>();
</script>

<template>
  <li class="node" :class="[`is-depth-${Math.min(depth, 3)}`, { 'has-items': node.items?.length }]">
    <div class="row">
      <a v-if="node.link" class="name" :href="toHref(node.link)"><Marked :text="node.name" /></a>
      <span v-else class="name"><Marked :text="node.name" /></span>
      <span v-if="node.note" class="note"><Marked :text="node.note" /></span>
    </div>

    <ul v-if="node.items?.length">
      <FeatureTreeNode v-for="item in node.items" :key="item.name" :node="item" :depth="depth + 1" />
    </ul>
  </li>
</template>

<style scoped>
/* Every level sits one step right of the level above: the trunk runs down from under the start of the upper name,
   and a branch leaves it for each name. */
.features-overview li.node {
  --gap: 0px;
  position: relative;
  padding: var(--gap) 0 0 var(--step);
}

/* air around a feature that holds others, more of it around the groups of an area */
.features-overview li.has-items,
.features-overview li.has-items + li.node {
  --gap: 10px;
}

.features-overview li.is-depth-1.has-items,
.features-overview li.is-depth-1.has-items + li.node {
  --gap: 22px;
}

.features-overview li.node:first-child {
  --gap: 0px;
}

.node::before,
.node::after {
  content: "";
  position: absolute;
  inset-inline-start: var(--stem);
  border: 0 solid var(--branch);
  pointer-events: none;
}

.node::before {
  inset-block: 0;
  border-inline-start-width: 1px;
}

/* under the last name the trunk ends in its branch */
.node:last-child::before {
  display: none;
}

.node::after {
  top: 0;
  width: calc(var(--step) - var(--stem) - 8px);
  height: calc(var(--gap) + var(--row) + 0.75rem);
  border-inline-start-width: 1px;
  border-bottom-width: 1px;
  border-end-start-radius: 6px;
}

.row {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 10px;
  padding: var(--row) 0;
  font-size: 1rem;
  line-height: 1.5rem;
}

.name {
  scroll-margin-top: 8.5rem; /* a link reached with Tab is not left under the navbar and the path line */
  font-weight: 400;
  color: var(--vp-c-text-1);
}

.is-depth-1 > .row .name {
  font-weight: 600;
  color: var(--doc-menu-strong);
}

.is-depth-2 > .row .name {
  font-weight: 500;
}

a.name:hover {
  color: var(--vp-c-brand-1);
}

/* the name's link covers its whole row */
a.name::after {
  content: "";
  position: absolute;
  inset: 0;
}

.note {
  color: var(--vp-c-text-2);
}

/* on phones the levels under the first step in less; the first stays under its area's icon */
@media (max-width: 40rem) {
  .features-overview li.node:not(.is-depth-1) {
    --step: 24px;
    --stem: 7.5px;
  }
}
</style>

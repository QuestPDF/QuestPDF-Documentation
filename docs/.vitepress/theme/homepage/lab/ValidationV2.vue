<template>
  <!-- 2 · Validator tiles: a claim line, then one tile per validator, each a link to the project -->
  <div class="validation">
    <p class="claim">
      <i class="fa-regular fa-badge-check"></i>
      <span>Every build is automatically validated with independent, open-source validators.</span>
    </p>

    <div class="tiles">
      <a v-for="tool of tools" :key="tool.name" class="tile" :href="tool.url" target="_blank" rel="noopener">
        <div class="tile-head">
          <span class="tile-name">{{ tool.name }}</span>
          <i class="fa-regular fa-arrow-up-right-from-square"></i>
        </div>
        <div class="tile-meta">{{ tool.covers }}</div>
        <div class="tile-tag">{{ tool.tag }}</div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const tools = [
  { name: "veraPDF", covers: "PDF/A and PDF/UA", tag: "Independent · open source", url: "https://verapdf.org/" },
  { name: "Mustang", covers: "ZUGFeRD and Factur-X", tag: "Independent · open source", url: "https://www.mustangproject.org/" }
];
</script>

<style scoped>

.validation {
  margin-top: 32px;
}

.claim {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.claim i {
  flex-shrink: 0;
  margin-top: 3px;
  font-size: 1.125rem;
  color: var(--vp-c-brand-1);
}

.tiles {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.tile {
  display: flex;
  flex-direction: column;
  padding: 16px 18px;
  border-radius: 14px;
  text-decoration: none;
  background-color: var(--home-surface-inner);
  transition: box-shadow 0.2s;
}

.tile:hover {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 20%, transparent);
}

.tile-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.tile-name {
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.tile-head i {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.tile-meta {
  margin-top: 2px;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
}

.tile-tag {
  margin-top: 10px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

@media screen and (max-width: 560px) {
  .tiles { grid-template-columns: minmax(0, 1fr); }
}

</style>

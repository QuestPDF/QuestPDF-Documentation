<template>
  <!-- 5 · Statement with proof chips: the claim in large type, the validators as linked pills -->
  <div class="validation">
    <p class="statement">Every build is validated by independent, open-source tools.</p>

    <div class="chips">
      <a v-for="tool of tools" :key="tool.name" class="chip" :href="tool.url" target="_blank" rel="noopener">
        <i class="fa-regular fa-badge-check"></i>
        <span class="chip-name">{{ tool.name }}</span>
        <span class="chip-covers">{{ tool.covers }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const tools = [
  { name: "veraPDF", covers: "PDF/A · PDF/UA", url: "https://verapdf.org/" },
  { name: "Mustang", covers: "ZUGFeRD · Factur-X", url: "https://www.mustangproject.org/" }
];
</script>

<style scoped>

.validation {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.statement {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.005em;
  color: var(--vp-c-text-1);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-radius: 999px;
  font-size: 0.9375rem;
  line-height: 1.25rem;
  text-decoration: none;
  color: var(--vp-c-text-1);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 18%, transparent);
  transition: box-shadow 0.2s, background-color 0.2s;
}

.chip:hover {
  background-color: var(--home-surface-inner);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 35%, transparent);
}

.chip i {
  font-size: 1rem;
  color: var(--vp-c-brand-1);
}

.chip-name {
  font-weight: 700;
}

.chip-covers {
  color: var(--vp-c-text-3);
}

</style>

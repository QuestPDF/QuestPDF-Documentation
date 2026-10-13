<template>
  <!-- 3 · Check report: a CI-style status list, one passing row per validator -->
  <div class="validation">
    <div class="head">
      <span class="status"><i class="fa-solid fa-circle-check"></i> All validations passing</span>
      <span class="when">on every build</span>
    </div>

    <div class="rows">
      <div v-for="tool of tools" :key="tool.name" class="row">
        <i class="fa-solid fa-check row-check"></i>
        <span class="row-name">
          <a :href="tool.url" target="_blank" rel="noopener">{{ tool.name }}</a>
          <span class="row-covers">{{ tool.covers }}</span>
        </span>
        <span class="row-tag">{{ tool.tag }}</span>
        <span class="row-state">Passed</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tools = [
  { name: "veraPDF", covers: "PDF/A and PDF/UA", tag: "Independent, open source", url: "https://verapdf.org/" },
  { name: "Mustang", covers: "ZUGFeRD and Factur-X", tag: "Independent, open source", url: "https://www.mustangproject.org/" }
];
</script>

<style scoped>

.validation {
  --pass: #2E7D32;
  --pass-soft: rgba(46, 125, 50, 0.12);
  margin-top: 32px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--vp-c-divider);
}

html.dark .validation {
  --pass: #A5D6A7;
  --pass-soft: rgba(165, 214, 167, 0.14);
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px;
  background-color: var(--home-surface-inner);
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.status i {
  font-size: 1.125rem;
  color: var(--pass);
}

.when {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
}

.row {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9375rem;
  line-height: 1.375rem;
}

.row-check {
  font-size: 0.875rem;
  color: var(--pass);
}

.row-name a {
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.row-name a:hover {
  text-decoration: underline;
}

.row-covers {
  margin-left: 8px;
  color: var(--vp-c-text-2);
}

.row-tag {
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

.row-state {
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--pass);
  background-color: var(--pass-soft);
}

@media screen and (max-width: 560px) {
  .row { grid-template-columns: 16px minmax(0, 1fr) auto; }
  .row-tag { display: none; }
}

</style>

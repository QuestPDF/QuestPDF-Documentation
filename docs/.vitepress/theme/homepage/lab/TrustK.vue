<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Verified in CI</div>
      <h2>The checks that run before a version ships</h2>
      <p class="sub-header">Compliance is not a claim in a brochure. It is a stage in the release pipeline, and it has to be green.</p>
    </div>

    <div class="panel checks-panel">
      <!-- the checks list, in a window like the code windows elsewhere on the page -->
      <home-page-window-container file-name="release · checks">
        <ul class="checks">
          <li v-for="check of checks" :key="check.name" class="check">
            <i class="fa-solid fa-circle-check"></i>
            <span class="check-name">{{ check.name }}</span>
            <span class="check-tool">{{ check.tool }}</span>
            <span class="check-result">passed</span>
          </li>
        </ul>
      </home-page-window-container>

      <!-- what it means to each reader -->
      <div class="meaning">
        <article v-for="item of meaning" :key="item.who" class="meaning-item">
          <div class="t-eyebrow">{{ item.who }}</div>
          <p class="meaning-text">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import HomePageWindowContainer from "../HomePageWindowContainer.vue";

const checks = [
  { name: "PDF/A-2b · PDF/A-2u · PDF/A-2a", tool: "veraPDF" },
  { name: "PDF/A-3b · PDF/A-3u · PDF/A-3a", tool: "veraPDF" },
  { name: "PDF/UA-1", tool: "veraPDF" },
  { name: "ZUGFeRD 2.1 · Factur-X", tool: "Mustang" },
  { name: "Native dependencies built from source (Skia, qpdf)", tool: "CI" },
  { name: "Layout and rendering regression suite", tool: "CI" }
];

const meaning = [
  { who: "For the developer", text: "PDF/A and PDF/UA are two properties on DocumentSettings. The hard part is already tested on our side." },
  { who: "For the manager", text: "Archival, accessibility and e-invoicing audits pass against the same validators your auditor uses." },
  { who: "For the security review", text: "Full source on GitHub, dependencies built from source, and nothing in the library ever makes a network call." }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.checks-panel {
  width: 100%;
  margin-top: 32px;
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 56px;
  align-items: center;
}

.checks {
  list-style: none;
  margin: 0;
  padding: 8px 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  line-height: 1.25rem;
}

.check {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) auto auto;
  column-gap: 14px;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.check:last-child {
  border-bottom: none;
}

.check i {
  color: #43A047;
}

html.dark .check i {
  color: #81C784;
}

.check-name {
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.check-tool {
  color: var(--vp-c-text-3);
}

.check-result {
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  color: #2E7D32;
  background-color: #67B84D22;
}

html.dark .check-result {
  color: #A5D6A7;
}

.meaning {
  display: flex;
  flex-direction: column;
}

.meaning-item {
  padding: 18px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.meaning-item:first-child { padding-top: 0; border-top: none; }
.meaning-item:last-child { padding-bottom: 0; }

.meaning-text {
  margin: 6px 0 0;
  font-size: 1.0625rem;
  line-height: 1.625rem;
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 1100px) {
  .checks-panel { grid-template-columns: minmax(0, 1fr); gap: 40px; }
}

@media screen and (max-width: 600px) {
  .check { grid-template-columns: 20px minmax(0, 1fr) auto; }
  .check-tool { display: none; }
  .check-name { white-space: normal; }
}

</style>

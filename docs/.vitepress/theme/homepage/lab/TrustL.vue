<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Principles</div>
      <h2>What QuestPDF never does, and what it always does</h2>
      <p class="sub-header">Two short lists that answer most of a security review and a compliance audit.</p>
    </div>

    <div class="layout">
      <div class="card never">
        <h3 class="list-title"><span class="dot"></span> Never</h3>
        <ul class="list">
          <li v-for="item of never" :key="item"><i class="fa-regular fa-xmark"></i><span>{{ item }}</span></li>
        </ul>
      </div>

      <div class="card always">
        <h3 class="list-title"><span class="dot"></span> Always</h3>
        <ul class="list">
          <li v-for="item of always" :key="item"><i class="fa-regular fa-check"></i><span>{{ item }}</span></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const never = [
  "Calls home or collects telemetry",
  "Requires an internet connection",
  "Contacts a license server",
  "Sends document data anywhere",
  "Hides its source code"
];

const always = [
  "Runs inside your application process",
  "Ships its full source on GitHub, native dependencies built from source",
  "Produces PDF/A-2 and PDF/A-3 at levels b, u and a (ISO 19005)",
  "Produces PDF/UA-1 for assistive technology (ISO 14289)",
  "Embeds ZUGFeRD and Factur-X invoice data (EN 16931)",
  "Validates every build with veraPDF and Mustang"
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.layout {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 32px;
  width: 100%;
  margin-top: 32px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.list-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 20px;
  font-size: 1.5rem;
  line-height: 2rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.never .dot { background-color: #E53935; }
.always .dot { background-color: #43A047; }

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.list li {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 14px 0;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 1.125rem;
  line-height: 1.625rem;
  color: var(--vp-c-text-1);
}

.list li:last-child {
  padding-bottom: 0;
}

.list i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 0.875rem;
}

.never .list i { color: #C62828; background-color: #E5393522; }
.always .list i { color: #2E7D32; background-color: #67B84D22; }

html.dark .never .list i { color: #EF9A9A; }
html.dark .always .list i { color: #A5D6A7; }

/* the never list reads as the thing crossed out */
.never .list span {
  color: var(--vp-c-text-2);
}

@media screen and (max-width: 1000px) {
  .layout { grid-template-columns: minmax(0, 1fr); }
}

</style>

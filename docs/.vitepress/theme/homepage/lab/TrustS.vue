<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Compliance</div>
      <h2>Every document carries its papers</h2>
    </div>

    <!-- a passport spread: the left page holds the data fields, the right page the stamps -->
    <div class="passport">
      <div class="page page-data">
        <div class="page-title"><i class="fa-regular fa-file-certificate"></i> Document</div>
        <dl class="fields">
          <template v-for="field of fields" :key="field.key">
            <dt>{{ field.key }}</dt>
            <dd>{{ field.value }}</dd>
          </template>
        </dl>
      </div>

      <div class="page page-stamps">
        <div class="page-title"><i class="fa-regular fa-stamp"></i> Endorsements</div>
        <div class="stamps">
          <div v-for="stamp of stamps" :key="stamp.title" class="stamp" :class="stamp.tone" :style="{ transform: `rotate(${stamp.angle}deg)` }">
            <div class="stamp-title">{{ stamp.title }}</div>
            <div class="stamp-sub">{{ stamp.sub }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const fields = [
  { key: "Conformance", value: "PDF/A-3b · PDF/UA-1" },
  { key: "Place of issue", value: "Your infrastructure" },
  { key: "Issued by", value: "Your application process" },
  { key: "Outbound connections", value: "None" },
  { key: "Telemetry", value: "None" },
  { key: "License server", value: "None" },
  { key: "Source", value: "github.com/QuestPDF" }
];

const stamps = [
  { title: "PDF/A", sub: "ISO 19005 · 2b 2u 2a 3b 3u 3a", tone: "blue", angle: -6 },
  { title: "PDF/UA-1", sub: "ISO 14289", tone: "indigo", angle: 4 },
  { title: "ZUGFeRD · Factur-X", sub: "EN 16931", tone: "cyan", angle: -3 },
  { title: "Validated", sub: "veraPDF · Mustang · every build", tone: "green", angle: 5 }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.passport {
  width: 100%;
  max-width: 1040px;
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-radius: 24px;
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge);
  overflow: hidden;
}

.page {
  padding: 32px 36px;
}

/* the fold between the two pages */
.page-stamps {
  border-left: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 25%, transparent);
  background: linear-gradient(90deg, color-mix(in srgb, var(--vp-c-text-1) 5%, transparent), transparent 48px);
}

.page-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
}

.fields {
  margin: 20px 0 0;
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  column-gap: 24px;
  row-gap: 12px;
  font-size: 0.9375rem;
  line-height: 1.25rem;
}

.fields dt {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  padding-top: 3px;
}

.fields dd {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.stamps {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px 16px;
}

.stamp {
  padding: 12px 14px;
  border: 2px solid currentColor;
  border-radius: 8px;
  outline: 1px solid currentColor;
  outline-offset: 3px;
  text-align: center;
  opacity: 0.85;
}

.stamp-title {
  white-space: nowrap;
  font-size: 0.9375rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.25rem;
}

.stamp-sub {
  margin-top: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1rem;
}

.stamp.blue { color: #1565C0; }
.stamp.indigo { color: #3949AB; }
.stamp.cyan { color: #00838F; }
.stamp.green { color: #2E7D32; }

html.dark .stamp.blue { color: #64B5F6; }
html.dark .stamp.indigo { color: #9FA8DA; }
html.dark .stamp.cyan { color: #4DD0E1; }
html.dark .stamp.green { color: #A5D6A7; }

@media screen and (max-width: 860px) {
  .passport { grid-template-columns: minmax(0, 1fr); }
  .page-stamps { border-left: none; border-top: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 25%, transparent); background: none; }
}

@media screen and (max-width: 480px) {
  .page { padding: 24px; }
  .fields { grid-template-columns: minmax(0, 1fr); row-gap: 4px; }
  .fields dd { margin-bottom: 8px; overflow-wrap: anywhere; }
  .stamps { grid-template-columns: minmax(0, 1fr); }
  .stamp { transform: none !important; }
}

</style>

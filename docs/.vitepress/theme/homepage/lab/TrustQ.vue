<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Security</div>
      <h2>Nothing leaves your infrastructure</h2>
    </div>

    <!-- the boundary diagram alone, full width: your app and the library inside, the document that comes out,
         and the things that are never contacted outside -->
    <div class="panel boundary">
      <div class="inside">
        <div class="inside-label"><i class="fa-regular fa-building-shield"></i> Your infrastructure</div>
        <div class="boxes">
          <div class="box"><i class="fa-regular fa-window"></i> Your application</div>
          <div class="link"></div>
          <div class="box lib"><i class="fa-regular fa-file-pdf"></i> QuestPDF</div>
          <div class="link"></div>
          <div class="box out">
            <div class="out-title"><i class="fa-regular fa-file-certificate"></i> Your document</div>
            <div class="t-badges">
              <span class="t-badge">PDF/A</span>
              <span class="t-badge">PDF/UA-1</span>
              <span class="t-badge">ZUGFeRD · Factur-X</span>
            </div>
          </div>
        </div>
        <div class="inside-note">Validated with veraPDF and Mustang on every build · Source on GitHub</div>
      </div>

      <div class="gap"><span class="no"><i class="fa-regular fa-ban"></i></span></div>

      <ul class="outside">
        <li v-for="item of outside" :key="item.name">
          <i class="fa-regular" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const outside = [
  { icon: "fa-cloud", name: "QuestPDF servers" },
  { icon: "fa-key", name: "License server" },
  { icon: "fa-satellite-dish", name: "Telemetry" },
  { icon: "fa-wifi", name: "Internet" }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.boundary {
  width: 100%;
  margin-top: 32px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 96px 240px;
  align-items: center;
}

.inside {
  padding: 28px;
  border: 2px dashed #1E88E5;
  border-radius: 20px;
  background-color: color-mix(in srgb, #1E88E5 6%, transparent);
}

.inside-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #1565C0;
}

html.dark .inside-label { color: #64B5F6; }

.boxes {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08), 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 8%, transparent);
  white-space: nowrap;
}

.box.lib {
  color: #fff;
  background: linear-gradient(135deg, #1E88E5, #0094F9);
  box-shadow: none;
}

.box.out {
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  white-space: normal;
}

.out-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.link {
  flex-grow: 1;
  height: 2px;
  min-width: 24px;
  background-color: #1E88E5;
}

.inside-note {
  margin-top: 16px;
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

.gap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gap::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: repeating-linear-gradient(90deg, var(--vp-c-text-3) 0 6px, transparent 6px 12px);
  opacity: 0.5;
}

.no {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--vp-c-bg);
  color: #E53935;
  font-size: 1.125rem;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--vp-c-text-1) 10%, transparent);
}

.outside {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.outside li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 20%, transparent);
  color: var(--vp-c-text-3);
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: line-through;
  text-decoration-color: color-mix(in srgb, var(--vp-c-text-3) 60%, transparent);
}

@media screen and (max-width: 960px) {
  .boundary { grid-template-columns: minmax(0, 1fr); }
  .gap { height: 64px; }
  .gap::before { left: 50%; right: auto; top: 0; bottom: 0; width: 2px; height: auto; background: repeating-linear-gradient(180deg, var(--vp-c-text-3) 0 6px, transparent 6px 12px); }
  .boxes { flex-direction: column; align-items: stretch; }
  .box { justify-content: center; }
  .box.out { align-items: center; }
  .link { width: 2px; height: 20px; min-width: 0; align-self: center; flex-grow: 0; }
}

</style>

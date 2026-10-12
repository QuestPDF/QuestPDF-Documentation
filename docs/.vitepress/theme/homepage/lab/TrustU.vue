<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Settings</div>
      <h2>Compliance has a switch. Privacy needs none.</h2>
    </div>

    <div class="layout">
      <!-- a settings panel: the document group has real switches, the network group has none to flip -->
      <div class="card settings">
        <div class="group">
          <div class="group-title">Document</div>
          <div v-for="item of document" :key="item.name" class="setting">
            <div class="setting-text">
              <div class="setting-name">{{ item.name }}</div>
              <div class="setting-hint">{{ item.hint }}</div>
            </div>
            <div class="toggle on"><span class="knob"></span></div>
          </div>
        </div>

        <div class="group">
          <div class="group-title">Network</div>
          <div v-for="item of network" :key="item.name" class="setting">
            <div class="setting-text">
              <div class="setting-name">{{ item.name }}</div>
              <div class="setting-hint">{{ item.hint }}</div>
            </div>
            <div class="toggle none"><i class="fa-regular fa-ban"></i></div>
          </div>
        </div>
      </div>

      <div class="notes">
        <div class="note">
          <div class="t-icon"><i class="fa-regular fa-sliders"></i></div>
          <h3>Compliance is one property each</h3>
          <p>PDF/A-2 and PDF/A-3 at levels b, u and a, and PDF/UA-1, are set on <code>DocumentSettings</code>. ZUGFeRD and Factur-X invoice data is embedded the same way. Every build is validated with veraPDF and Mustang.</p>
          <a class="t-link" href="/concepts/document-settings.html">Document settings <i class="fa-regular fa-arrow-right"></i></a>
        </div>
        <div class="note">
          <div class="t-icon"><i class="fa-regular fa-cloud-slash"></i></div>
          <h3>Privacy has no switch, because there is nothing to switch off</h3>
          <p>QuestPDF makes no network calls. There is no telemetry and no license server, so it runs offline and air-gapped by default. The full source is on GitHub.</p>
          <a class="t-link" href="/security-policy.html">Security policy <i class="fa-regular fa-arrow-right"></i></a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const document = [
  { name: "PDF/A conformance", hint: "PDFA_3B" },
  { name: "PDF/UA conformance", hint: "PDFUA_1" },
  { name: "ZUGFeRD / Factur-X", hint: "EN 16931 invoice XML" }
];

const network = [
  { name: "Telemetry", hint: "Not built in" },
  { name: "License server", hint: "None to contact" },
  { name: "Outbound connections", hint: "The library makes none" }
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
  align-items: start;
}

/* the shared card aligns children to the start; the groups need the full width */
.card.settings {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.group-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.setting {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.group .setting:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.setting-name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.setting-hint {
  margin-top: 2px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8125rem;
  color: var(--vp-c-text-3);
}

/* the switches: an on state in brand blue, and a no-switch state that is just a ban mark */
.toggle {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 44px;
  height: 26px;
  border-radius: 13px;
  padding: 3px;
}

.toggle.on {
  justify-content: flex-end;
  background: linear-gradient(135deg, #1E88E5, #0094F9);
}

.knob {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.2);
}

.toggle.none {
  justify-content: center;
  width: auto;
  padding: 0 10px;
  color: var(--vp-c-text-3);
  border: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 25%, transparent);
  font-size: 0.875rem;
}

.notes {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 8px;
}

.note h3 {
  margin: 16px 0 8px;
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.note p {
  margin: 0 0 10px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.note code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.875em;
}

.note .t-link i {
  font-size: 0.75rem;
}

@media screen and (max-width: 960px) {
  .layout { grid-template-columns: minmax(0, 1fr); }
  .notes { padding-top: 0; }
}

</style>

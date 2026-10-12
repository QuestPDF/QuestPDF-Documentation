<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Security</div>
      <h2>Your infrastructure is the whole system</h2>
      <p class="sub-header">QuestPDF is a library inside your application, not a service beside it. There is nothing on the outside to trust.</p>
    </div>

    <div class="panel boundary-panel">
      <!-- the diagram: a dashed boundary with your app and the library inside, and the usual suspects outside, never reached -->
      <div class="diagram" aria-hidden="true">
        <div class="inside">
          <div class="inside-label"><i class="fa-regular fa-building-shield"></i> Your infrastructure</div>
          <div class="boxes">
            <div class="box app"><i class="fa-regular fa-window"></i> Your application</div>
            <div class="link"></div>
            <div class="box lib"><i class="fa-regular fa-file-pdf"></i> QuestPDF</div>
          </div>
          <div class="inside-note">Also on-premises, offline and air-gapped</div>
        </div>

        <div class="gap">
          <span class="no-arrow"><i class="fa-regular fa-ban"></i></span>
        </div>

        <ul class="outside">
          <li v-for="item of outside" :key="item.name">
            <i class="fa-regular" :class="item.icon"></i>
            <span class="outside-name">{{ item.name }}</span>
            <span class="outside-status">never contacted</span>
          </li>
        </ul>
      </div>

      <!-- the words beside it -->
      <div class="words">
        <article v-for="fact of facts" :key="fact.title" class="fact">
          <h3 class="fact-title">{{ fact.title }}</h3>
          <p class="fact-text">{{ fact.text }}</p>
        </article>
      </div>

      <div class="footer">
        <span class="footer-label">And what comes out of it</span>
        <div class="t-badges">
          <span class="t-badge">PDF/A 2 and 3 · b, u, a</span>
          <span class="t-badge">PDF/UA-1</span>
          <span class="t-badge">ZUGFeRD · Factur-X</span>
          <span class="t-badge">Validated every build with veraPDF and Mustang</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const outside = [
  { icon: "fa-cloud", name: "QuestPDF servers" },
  { icon: "fa-key", name: "License server" },
  { icon: "fa-satellite-dish", name: "Telemetry" }
];

const facts = [
  { title: "No network calls, no telemetry", text: "Document data is processed in your application process and never transmitted. There is no license server to reach and no internet requirement." },
  { title: "Nothing hidden inside the box", text: "The full source code is on GitHub. The native dependencies, Skia and qpdf, are built from source in our CI and shipped as platform packages." },
  { title: "Sized for your servers", text: "Thousands of pages per second with low CPU and memory, so the box above does not need to grow for peak loads." }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.boundary-panel {
  width: 100%;
  margin-top: 32px;
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 56px;
  align-items: center;
}

.diagram {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 64px minmax(0, 0.7fr);
  align-items: center;
}

.inside {
  padding: 24px;
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

html.dark .inside-label {
  color: #64B5F6;
}

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

/* the gap between inside and outside: a no-entry sign on a faint line that stops at the boundary */
.gap {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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

.no-arrow {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--vp-c-bg);
  color: #E53935;
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
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr);
  column-gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px dashed color-mix(in srgb, var(--vp-c-text-1) 20%, transparent);
  color: var(--vp-c-text-3);
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.outside li i {
  grid-row: 1 / span 2;
  margin-top: 2px;
}

.outside-name {
  font-weight: 600;
  text-decoration: line-through;
  text-decoration-color: color-mix(in srgb, var(--vp-c-text-3) 60%, transparent);
}

.outside-status {
  font-size: 0.75rem;
}

.words {
  display: flex;
  flex-direction: column;
}

.fact {
  padding: 18px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.fact:first-child { padding-top: 0; border-top: none; }
.fact:last-child { padding-bottom: 0; }

.fact-title {
  margin: 0 0 4px;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 700;
}

.fact-text {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.footer {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px 20px;
  padding-top: 28px;
  border-top: 1px solid var(--vp-c-divider);
}

.footer-label {
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

@media screen and (max-width: 1100px) {
  .boundary-panel { grid-template-columns: minmax(0, 1fr); gap: 40px; }
}

@media screen and (max-width: 640px) {
  .diagram { grid-template-columns: minmax(0, 1fr); row-gap: 0; }
  .gap { height: 56px; }
  .gap::before { left: 50%; right: auto; top: 0; bottom: 0; width: 2px; height: auto; background: repeating-linear-gradient(180deg, var(--vp-c-text-3) 0 6px, transparent 6px 12px); }
  .boxes { flex-direction: column; align-items: stretch; gap: 0; }
  .link { width: 2px; height: 20px; min-width: 0; align-self: center; flex-grow: 0; }
}

</style>

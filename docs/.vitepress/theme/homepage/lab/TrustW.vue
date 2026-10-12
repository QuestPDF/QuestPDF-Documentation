<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Enterprise</div>
      <h2>Six things an auditor checks</h2>
    </div>

    <!-- six seals in a row: three standards, three guarantees; each a double ring with an icon, a name and a sub-line -->
    <div class="seals">
      <a v-for="seal of seals" :key="seal.name" class="seal" :class="seal.tone" :href="seal.href">
        <div class="ring">
          <div class="ring-inner">
            <i class="fa-regular" :class="seal.icon"></i>
          </div>
        </div>
        <div class="seal-name">{{ seal.name }}</div>
        <div class="seal-sub">{{ seal.sub }}</div>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
const seals = [
  { icon: "fa-box-archive", name: "PDF/A", sub: "ISO 19005 · 2b to 3a", tone: "blue", href: "/concepts/document-settings.html" },
  { icon: "fa-universal-access", name: "PDF/UA-1", sub: "ISO 14289", tone: "indigo", href: "/concepts/accessibility.html" },
  { icon: "fa-file-invoice", name: "ZUGFeRD · Factur-X", sub: "EN 16931", tone: "cyan", href: "/examples/zugferd.html" },
  { icon: "fa-badge-check", name: "Validated", sub: "veraPDF · Mustang, every build", tone: "green", href: "/examples/zugferd.html" },
  { icon: "fa-cloud-slash", name: "Offline", sub: "No network calls, no telemetry, no license server", tone: "slate", href: "/security-policy.html" },
  { icon: "fa-code", name: "Open", sub: "Full source on GitHub, native deps built from source", tone: "slate", href: "https://github.com/QuestPDF/QuestPDF" }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.seals {
  width: 100%;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 24px;
}

.seal {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

/* the double ring: an outer hairline circle and an inner filled disc with the icon */
.ring {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid var(--accent);
  padding: 8px;
  transition: transform 0.2s ease;
}

.seal:hover .ring {
  transform: scale(1.04);
}

.ring-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px dashed var(--accent);
  background-color: color-mix(in srgb, var(--accent) 10%, var(--home-surface));
  color: var(--accent);
  font-size: 2rem;
}

.seal-name {
  margin-top: 16px;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.seal-sub {
  margin-top: 4px;
  max-width: 180px;
  font-size: 0.8125rem;
  line-height: 1.125rem;
  color: var(--vp-c-text-2);
}

.seal.blue { --accent: #1E88E5; }
.seal.indigo { --accent: #5C6BC0; }
.seal.cyan { --accent: #00ACC1; }
.seal.green { --accent: #43A047; }
.seal.slate { --accent: var(--vp-c-text-2); }

@media screen and (max-width: 1100px) {
  .seals { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px 24px; }
}

@media screen and (max-width: 560px) {
  .seals { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ring { width: 100px; height: 100px; }
  .ring-inner { font-size: 1.625rem; }
}

</style>

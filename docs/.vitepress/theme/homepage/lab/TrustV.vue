<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Supply chain</div>
      <h2>What is inside, layer by layer</h2>
      <p class="sub-header">The whole stack between your code and the finished document, and where each part comes from.</p>
    </div>

    <div class="layout">
      <!-- a cutaway of the stack: each layer names what it is and where it comes from -->
      <div class="stack">
        <div v-for="(layer, index) of layers" :key="layer.name" class="layer" :class="layer.tone" :style="{ '--depth': index }">
          <div class="layer-icon"><i class="fa-regular" :class="layer.icon"></i></div>
          <div class="layer-text">
            <div class="layer-name">{{ layer.name }}</div>
            <div class="layer-origin">{{ layer.origin }}</div>
          </div>
          <a v-if="layer.href" class="layer-link" :href="layer.href">{{ layer.link }} <i class="fa-regular fa-arrow-right"></i></a>
        </div>
      </div>

      <div class="facts">
        <div v-for="fact of facts" :key="fact.title" class="fact">
          <h3>{{ fact.title }}</h3>
          <p>{{ fact.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const layers = [
  { icon: "fa-window", name: "Your application", origin: "Your code, your servers, your network rules", tone: "yours" },
  { icon: "fa-file-pdf", name: "QuestPDF", origin: "C#, full source on GitHub", tone: "lib", link: "Repository", href: "https://github.com/QuestPDF/QuestPDF" },
  { icon: "fa-microchip", name: "Skia and qpdf", origin: "Native dependencies, built from source in our CI, patched with upstream", tone: "native", link: "Security policy", href: "/security-policy.html" },
  { icon: "fa-file-certificate", name: "Your document", origin: "PDF/A, PDF/UA-1, ZUGFeRD and Factur-X, validated with veraPDF and Mustang", tone: "out", link: "Document settings", href: "/concepts/document-settings.html" }
];

const facts = [
  { title: "Nothing beside the stack", text: "No network layer: no telemetry, no license server, no outbound connections. It runs offline and air-gapped." },
  { title: "Nothing you cannot read", text: "Every layer below your application is open to inspection, including how the native binaries are built." },
  { title: "Nothing unchecked", text: "PDF/A and ZUGFeRD output is validated with veraPDF and Mustang on every build before a version ships." }
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
  grid-template-columns: 7fr 5fr;
  gap: 48px;
  width: 100%;
  margin-top: 32px;
  align-items: center;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* each layer is a slab; a left accent in the family colour and a slight inset per depth give the cutaway feel */
.layer {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  padding: 18px 22px;
  margin-left: calc(var(--depth) * 14px);
  margin-right: calc(var(--depth) * 14px);
  border-radius: 16px;
  border-left: 4px solid var(--accent);
  background-color: var(--home-surface);
  box-shadow: var(--home-surface-edge);
}

.layer.yours { --accent: var(--vp-c-text-3); }
.layer.lib { --accent: #1E88E5; }
.layer.native { --accent: #5C6BC0; }
.layer.out { --accent: #43A047; }

.layer-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
  color: var(--accent);
  font-size: 1.125rem;
}

.layer.yours .layer-icon { color: var(--vp-c-text-1); }

.layer-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.layer-origin {
  margin-top: 2px;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
}

.layer-link {
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.layer-link i {
  font-size: 0.75rem;
}

.facts {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.fact h3 {
  margin: 0 0 6px;
  font-size: 1.125rem;
  line-height: 1.5rem;
}

.fact p {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

@media screen and (max-width: 960px) {
  .layout { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .layer { margin-left: 0; margin-right: 0; grid-template-columns: 44px minmax(0, 1fr); }
  .layer-link { grid-column: 2; }
}

</style>

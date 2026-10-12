<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">How it works</div>
      <h2>From your code to an audited document</h2>
      <p class="sub-header">Five steps, none of which leave your infrastructure or your control.</p>
    </div>

    <!-- a horizontal flow of five nodes joined by a line; each node is an icon, a title and a line of detail -->
    <div class="panel flow-panel">
      <ol class="flow">
        <li v-for="(step, index) of steps" :key="step.title" class="step">
          <div class="node">
            <i class="fa-regular" :class="step.icon"></i>
          </div>
          <div class="step-index">{{ index + 1 }}</div>
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-text">{{ step.text }}</p>
          <div v-if="step.badges" class="t-badges">
            <span v-for="badge of step.badges" :key="badge" class="t-badge">{{ badge }}</span>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { icon: "fa-code", title: "Your C#", text: "A document is a class in your codebase, reviewed and versioned like the rest of it." },
  { icon: "fa-server", title: "Rendered in your process", text: "No network calls, no telemetry, no license server. Works offline and air-gapped.", badges: ["0 connections"] },
  { icon: "fa-sliders", title: "Standard applied", text: "One setting selects the conformance level; the structure is generated for you.", badges: ["PDF/A", "PDF/UA-1", "EN 16931"] },
  { icon: "fa-badge-check", title: "Validated", text: "Every build is checked with veraPDF and Mustang before it reaches NuGet.", badges: ["veraPDF", "Mustang"] },
  { icon: "fa-paper-plane", title: "Delivered", text: "Into the archive, to a screen reader, or to the tax authority, thousands of pages per second." }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flow-panel {
  width: 100%;
  margin-top: 32px;
}

.flow {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 32px;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* the line runs through the centre of the nodes, fading in from the left and out to the right */
.flow::before {
  content: "";
  position: absolute;
  top: 28px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #1E88E5 12%, #00BCD4 88%, transparent);
}

.step {
  position: relative;
  display: flex;
  flex-direction: column;
}

.node {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: var(--vp-c-bg);
  box-shadow: 0 0 0 2px #1E88E5, 0 0 0 8px var(--home-surface);
  color: #1E88E5;
  font-size: 1.25rem;
}

html.dark .node {
  background-color: #1E2A3A;
  color: #64B5F6;
  box-shadow: 0 0 0 2px #64B5F6, 0 0 0 8px #1B1B1F;
}

.step-index {
  margin-top: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}

.step-title {
  margin: 2px 0 6px;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 700;
}

.step-text {
  margin: 0;
  flex-grow: 1;
  font-size: 0.9375rem;
  line-height: 1.5rem;
}

.step .t-badges {
  margin-top: 12px;
}

@media screen and (max-width: 1100px) {
  .flow { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .flow::before { top: 0; bottom: 0; left: 27px; right: auto; width: 2px; height: auto; background: linear-gradient(180deg, transparent, #1E88E5 8%, #00BCD4 92%, transparent); }
  .step { display: grid; grid-template-columns: 56px minmax(0, 1fr); column-gap: 24px; padding: 16px 0; }
  .node { grid-row: 1 / span 4; }
  .step-index { margin-top: 0; }
  .step-title, .step-text, .step .t-badges { grid-column: 2; }
}

</style>

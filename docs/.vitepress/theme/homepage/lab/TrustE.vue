<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Trust</div>
      <h2>Whoever reviews it, the answer is ready</h2>
      <p class="sub-header">The same facts, arranged by who is asking.</p>
    </div>

    <!-- three columns divided by hairlines, one per reader, three short answers each -->
    <div class="panel desks">
      <article v-for="desk of desks" :key="desk.title" class="desk">
        <div class="t-icon"><i class="fa-regular" :class="desk.icon"></i></div>
        <div class="t-eyebrow desk-eyebrow">{{ desk.eyebrow }}</div>
        <h3 class="desk-title">{{ desk.title }}</h3>

        <ul class="points">
          <li v-for="point of desk.points" :key="point.lead">
            <strong>{{ point.lead }}</strong> {{ point.text }}
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
const desks = [
  {
    icon: "fa-code",
    eyebrow: "If you write the code",
    title: "Nothing to bolt on",
    points: [
      { lead: "PDF/A and PDF/UA are two properties", text: "on DocumentSettings, not a separate toolchain." },
      { lead: "The source is on GitHub.", text: "Step into it, read it, build it yourself." },
      { lead: "Thousands of pages per second", text: "with low CPU and memory. Right-to-left text included." }
    ]
  },
  {
    icon: "fa-users",
    eyebrow: "If you run the team",
    title: "No surprise milestones",
    points: [
      { lead: "Audits pass.", text: "PDF/A (ISO 19005) and PDF/UA-1 (ISO 14289), validated with veraPDF on every build." },
      { lead: "E-invoicing mandates covered.", text: "ZUGFeRD and Factur-X (EN 16931), validated with Mustang." },
      { lead: "Compliance is configuration.", text: "The invoice tutorial walks the whole path in an afternoon." }
    ]
  },
  {
    icon: "fa-shield-check",
    eyebrow: "If you sign off on security",
    title: "Nothing leaves your infrastructure",
    points: [
      { lead: "No network calls, no telemetry,", text: "no license server. Works air-gapped." },
      { lead: "Auditable supply chain.", text: "Full source on GitHub; Skia and qpdf built from source in CI." },
      { lead: "Coordinated disclosure.", text: "A published security policy, advisories released with each fix." }
    ]
  }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.desks {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  margin-top: 32px;
}

.desk {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
}

.desk:first-child { padding-left: 0; }
.desk:last-child { padding-right: 0; }
.desk:not(:first-child) { border-left: 1px solid var(--vp-c-divider); }

.desk-eyebrow {
  margin-top: 20px;
}

.desk-title {
  margin: 4px 0 0;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}

.points {
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.points li {
  padding-left: 18px;
  position: relative;
}

/* a short dash instead of a bullet, in the muted text colour */
.points li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 11px;
  width: 8px;
  height: 2px;
  border-radius: 1px;
  background-color: var(--vp-c-text-3);
}

.points strong {
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 1000px) {
  .desks { grid-template-columns: minmax(0, 1fr); }
  .desk { padding: 28px 0; }
  .desk:first-child { padding-top: 0; }
  .desk:last-child { padding-bottom: 0; }
  .desk:not(:first-child) { border-left: none; border-top: 1px solid var(--vp-c-divider); }
}

</style>

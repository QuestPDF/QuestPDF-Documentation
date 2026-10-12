<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Enterprise</div>
      <h2>Built for audits</h2>
    </div>

    <!-- two rows of chips with a label each; the only sentences are the labels -->
    <div class="panel spec">
      <div v-for="row of rows" :key="row.label" class="spec-row">
        <div class="spec-label">
          <span>{{ row.label }}</span>
          <a class="t-link" :href="row.href">{{ row.link }} <i class="fa-regular fa-arrow-right"></i></a>
        </div>
        <div class="chips">
          <span v-for="chip of row.chips" :key="chip.label" class="chip">
            <i class="fa-regular" :class="chip.icon"></i>{{ chip.label }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const rows = [
  {
    label: "Runs inside your infrastructure",
    link: "Security policy",
    href: "/security-policy.html",
    chips: [
      { icon: "fa-cloud-slash", label: "No network calls" },
      { icon: "fa-eye-slash", label: "No telemetry" },
      { icon: "fa-key", label: "No license server" },
      { icon: "fa-plug-circle-xmark", label: "Air-gapped" },
      { icon: "fa-code", label: "Source on GitHub" },
      { icon: "fa-gauge-high", label: "Thousands of pages / s" }
    ]
  },
  {
    label: "Standards, validated on every build",
    link: "Document settings",
    href: "/concepts/document-settings.html",
    chips: [
      { icon: "fa-box-archive", label: "PDF/A-2 b · u · a" },
      { icon: "fa-box-archive", label: "PDF/A-3 b · u · a" },
      { icon: "fa-universal-access", label: "PDF/UA-1" },
      { icon: "fa-file-invoice", label: "ZUGFeRD" },
      { icon: "fa-file-invoice", label: "Factur-X" },
      { icon: "fa-badge-check", label: "veraPDF · Mustang" }
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

.spec {
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
}

.spec-row {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  gap: 32px;
  align-items: center;
  padding: 28px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.spec-row:first-child { padding-top: 0; border-top: none; }
.spec-row:last-child { padding-bottom: 0; }

.spec-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.spec-label .t-link {
  font-size: 0.875rem;
  font-weight: 500;
}

.spec-label .t-link i {
  font-size: 0.75rem;
}

/* the same chip as the homepage feature card; defined here because the lab does not load HomePage.vue */
.spec .chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.spec .chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 12px;
  background-color: var(--home-surface-inner);
  color: var(--vp-c-text-1);
  font-size: 0.9375rem;
  line-height: 1.25rem;
  font-weight: 500;
  white-space: nowrap;
}

.spec .chip i {
  width: 18px;
  text-align: center;
  font-size: 16px;
}

@media screen and (max-width: 900px) {
  .spec-row { grid-template-columns: minmax(0, 1fr); gap: 16px; }
}

</style>

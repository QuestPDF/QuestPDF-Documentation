<script setup lang="ts">
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBoxArchive, faCloud, faCode, faDesktop, faReceipt, faShieldHalved, faUniversalAccess } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";
import HomePageSeal from "./HomePageSeal.vue";

/* each standard says what it is for; wording stays at "for", never "complies with the law" */
interface Standard {
  name: string;
  purpose: string;
  icon: IconDefinition;
}

const standards : Standard[] = [
  {
    name: "PDF/A",
    purpose: "long-term document archiving",
    icon: faBoxArchive
  },
  {
    name: "PDF/UA",
    purpose: "accessible, screen-reader-friendly PDFs",
    icon: faUniversalAccess
  },
  {
    name: "Factur-X / ZUGFeRD",
    purpose: "electronic invoices with embedded XML",
    icon: faReceipt
  }
];

interface PlatformRow {
  label: string;
  values: string[];
  icon: IconDefinition;
}

const platformRows : PlatformRow[] = [
  {
    /* as the package README states them: .NET 6 and later, .NET Framework 4.6.2 and later; Native AOT as
       listed under "Recently delivered" on the roadmap */
    label: "Runtime",
    values: [".NET 6+", ".NET Framework 4.6.2+", "Native AOT"],
    icon: faCode
  },
  {
    label: "Operating system",
    values: ["Windows", "Linux", "macOS"],
    icon: faDesktop
  },
  {
    label: "Hosting",
    values: ["Docker", "Kubernetes", "Azure", "AWS", "Google Cloud"],
    icon: faCloud
  }
];

</script>

<template>
  <div class="trust">
    <div class="panel compliance">
      <HomePageSeal class="seal" />

      <h2 class="card-title">Validated, standards-compliant output</h2>
      <p class="card-description">
        Every release is tested against
        <a href="https://verapdf.org/" target="_blank">veraPDF</a> and
        <a href="https://www.mustangproject.org/" target="_blank">Mustang</a>,
        the independent, open-source, industry-standard validators.
      </p>

      <ul class="standards">
        <li v-for="standard of standards" :key="standard.name" class="standard">
          <Icon class="standard-icon" :icon="standard.icon" />
          <p class="standard-text">
            <strong class="standard-name">{{ standard.name }}</strong> for {{ standard.purpose }}
          </p>
        </li>
      </ul>
    </div>

    <section class="panel rows" aria-label="Enterprise-grade foundations">
      <div v-for="row of platformRows" :key="row.label" class="row">
        <Icon class="row-icon" :icon="row.icon" />
        <div class="row-body">
          <h3 class="label">{{ row.label }}</h3>
          <p class="row-values">
            <template v-for="(value, index) of row.values" :key="value">
              <span v-if="index > 0" class="dot" aria-hidden="true">·</span>
              <span class="value">{{ value }}</span>
            </template>
          </p>
        </div>
      </div>

      <div class="row">
        <Icon class="row-icon" :icon="faShieldHalved" />
        <div class="row-body">
          <h3 class="label">Data privacy</h3>
          <p class="row-values">No network calls, no telemetry, no license server. Works air-gapped.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

.trust {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

@media screen and (max-width: 1180px) {
  .trust {
    grid-template-columns: minmax(0, 1fr);
  }
}


.label {
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}


/* Compliance */

.seal {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 76px;
  height: 76px;
  transform: rotate(-8deg);
}

.compliance .card-title,
.compliance .card-description {
  padding-right: 72px;
}

.compliance .card-description {
  margin-top: 20px;
}

.standards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 32px 0 0;
  padding-top: 32px;
  border-top: 1px solid var(--vp-c-divider);
}

.standard {
  display: grid;
  grid-template-columns: 1rem minmax(0, 1fr);
  gap: 1rem;
}

.standard-icon {
  margin-top: 4px;
  font-size: 1rem;
  color: var(--vp-c-brand-1);
}

.standard-text {
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.standard-name {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.compliance .card-description a {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  text-underline-offset: 3px;
}

.compliance .card-description a:hover {
  text-decoration-color: var(--vp-c-text-1);
}

@media screen and (max-width: 600px) {
  .seal {
    top: 16px;
    right: 16px;
    width: 60px;
    height: 60px;
  }

  .compliance .card-title,
  .compliance .card-description {
    padding-right: 48px;
  }
}


/* Rows */

.rows {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;
}

.row {
  min-width: 0;
  display: grid;
  grid-template-columns: 1.25rem minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}

.row-icon {
  margin-top: 3px;
  font-size: 1.125rem;
  text-align: center;
  color: var(--vp-c-brand-1);
}

.row-body {
  min-width: 0;
}

.row-values {
  margin: 4px 0 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-2);
}

.value {
  white-space: nowrap;
}

.dot {
  margin: 0 0.75em;
  color: var(--vp-c-text-3);
}

</style>

<script setup lang="ts">
import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import Icon from "../Icon.vue";
import HomePageSpecimen from "./HomePageSpecimen.vue";
import HomePageLayers from "./HomePageLayers.vue";

/* each standard says what it is for; wording stays at "for", never "complies with the law" */
interface Standard {
  name: string;
  purpose: string;
}

const standards: Standard[] = [
  { name: "PDF/A", purpose: "long-term document archiving and reliable visual preservation" },
  { name: "PDF/UA", purpose: "universal accessibility, screen readers, and assistive tech" },
  { name: "Factur-X / ZUGFeRD", purpose: "e‑invoicing readable by humans and machines" }
];
</script>

<template>
  <div class="trust">
    <article class="panel compliance">
      <h2 class="card-title">Validated, standards-compliant output</h2>
      <p class="card-description">
        Every release is tested against
        <a href="https://verapdf.org/" target="_blank">veraPDF</a> and
        <a href="https://www.mustangproject.org/" target="_blank">Mustang</a>,
        the independent, open-source, industry-standard validators.
      </p>

      <ul class="standards">
        <li v-for="standard of standards" :key="standard.name" class="standard">
          <span class="standard-check"><Icon :icon="faCheck" /></span>
          <p class="standard-text">
            <strong class="standard-name">{{ standard.name }}</strong> for {{ standard.purpose }}
          </p>
        </li>
      </ul>

      <!-- the validated page itself, leaning out of the corner; the panel clips it -->
      <figure class="page-figure">
        <HomePageSpecimen :width="172" scan />
      </figure>
    </article>

    <article class="panel platform">
      <h2 class="card-title">Runs entirely inside your application</h2>
      <p class="card-description">Document generation happens locally, in your own process. No network calls, no telemetry, no license server. Works air-gapped.</p>

      <HomePageLayers class="platform-layers" />
    </article>
  </div>
</template>

<style scoped>

.trust {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--section-gap);
}

@media screen and (max-width: 1180px) {
  .trust {
    grid-template-columns: minmax(0, 1fr);
  }
}

.card-description {
  margin-top: 20px;
  text-wrap: pretty;
}


/* Compliance */

.compliance {
  overflow: clip;
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

/* the list keeps clear of the page at its right */
.standards {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 32px 0 0;
  padding: 32px 220px 0 0;
  border-top: 1px solid var(--vp-c-divider);
}

.standard {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 1rem;
}

/* a check on a green tile: on this card a check means "passes validation" */
.standard-check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: color-mix(in srgb, light-dark(#2E7D32, #81C784) 12%, transparent);
  color: light-dark(#2E7D32, #81C784);
  font-size: 1rem;
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

.page-figure {
  position: absolute;
  right: 28px;
  bottom: -44px;
  margin: 0;
  transform: rotate(-7deg);
  transform-origin: bottom right;
}

@media screen and (max-width: 600px) {
  .standards {
    padding-right: 0;
    padding-bottom: 104px;
  }

  .page-figure {
    right: 16px;
    bottom: -110px;
  }
}


/* Platform */

.platform {
  display: flex;
  flex-direction: column;
}

.platform-layers {
  margin-top: 36px;
}

</style>

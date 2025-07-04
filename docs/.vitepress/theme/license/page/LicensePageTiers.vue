<template>
  <article class="content">
    <h2>Available Licenses</h2>

    <div class="licenses">
      <section class="license-tier card" v-for="license of licenses">
        <header>
          <img class="icon" :src="license.icon" alt="" />

          <div v-if="license.price">
            <h3>{{ license.name }}</h3>
            <p class="price">${{ license.price }}</p>
          </div>

          <div v-else>
            <h3>Community</h3>
            <p class="price">Free forever</p>
          </div>
        </header>

        <hr>

        <div class="details">
          <div v-for="detail of license.details" class="details-item">
            <img :src="convertLicenseDetailTypeToIcon(detail.type)" width="20" style="margin-top: 1px;" alt="">
            <p>{{ detail.content }}</p>
          </div>
        </div>

        <div style="flex-grow: 1"></div>

        <a v-if="license.price" class="action primary" @click="paddle.startCheckout(license.paddlePriceId)">Purchase</a>
        <a v-else class="action" href="/getting-started.html">Start learning</a>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">

import {usePaddle} from "../../paddle";

const paddle = usePaddle();

enum LicenseDetailType {
  Feature,
  Information,
  Warning
}

interface License {
  icon: string;
  name: string;

  price: number;
  paddlePriceId: string;

  details: { type: LicenseDetailType, content: string }[];
}

const CommunityLicense: License = {
  icon: "/license/community.svg",
  name: "Community",
  price: null,
  paddlePriceId: null,
  details: [
    {
      type: LicenseDetailType.Information,
      content: "For private and FOSS projects"
    },
    {
      type: LicenseDetailType.Information,
      content: "For non-profit organizations"
    },
    {
      type: LicenseDetailType.Information,
      content: "For evaluation purposes"
    },
    {
      type: LicenseDetailType.Warning,
      content: "For commercial projects of individuals or businesses with less than 1 million USD annual gross revenue"
    },
  ]
};

const ProfessionalLicense: License = {
  icon: "/license/professional.svg",
  name: "Professional",
  price: 999,
  paddlePriceId: paddle.professionalLicensePriceId,
  details: [
    {
      type: LicenseDetailType.Feature,
      content: "For commercial projects"
    },
    {
      type: LicenseDetailType.Feature,
      content: "For organizations with teams with at most 10 software developers"
    },
    {
      type: LicenseDetailType.Feature,
      content: "Ensures library sustainability"
    },
    {
      type: LicenseDetailType.Information,
      content: "To support ongoing development, the licence price has been increased on 1 July 2025. If it impacts your procurement process, please feel free to contact us."
    },
  ]
};

const EnterpriseLicense: License = {
  icon: "/license/enterprise.svg",
  name: "Enterprise",
  price: 1999,
  paddlePriceId: paddle.enterpriseLicensePriceId,
  details: [
    {
      type: LicenseDetailType.Feature,
      content: "For commercial projects"
    },
    {
      type: LicenseDetailType.Feature,
      content: "For organizations with software development teams of any size"
    },
    {
      type: LicenseDetailType.Feature,
      content: "Ensures library sustainability"
    },
    {
      type: LicenseDetailType.Feature,
      content: "Includes prioritized e-mail support"
    },
  ]
};

const licenses = [
  CommunityLicense,
  ProfessionalLicense,
  EnterpriseLicense
];

function convertLicenseDetailTypeToIcon(type: LicenseDetailType) {
  if (type === LicenseDetailType.Feature)
    return "/license/tick.svg";

  if (type === LicenseDetailType.Information)
    return "/license/info.svg";

  if (type === LicenseDetailType.Warning)
    return "/license/alert.svg";

  throw "Unreachable code";
}

</script>

<style scoped>
.licenses {
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(325px, 100%), 1fr));
  grid-gap: 48px;
}

.license-tier {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
}

.license-tier header {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 32px;
}

.license-tier header img {
  width: 48px;
}

.license-tier header h3 {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 8px;
}

.license-tier p.price {
  line-height: 1.5rem;
  font-size: 1.2rem;
}

.license-tier a.action {
  align-self: flex-end;
  margin-top: 32px;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.details-item {
  break-inside: avoid-column;

  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: start;

  color: var(--vp-c-text-2);
  line-height: 1.5rem;
  font-size: 1rem;
}

</style>
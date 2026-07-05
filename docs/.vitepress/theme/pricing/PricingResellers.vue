<script setup>

const resellers = [
  {
    name: "SoftwareOne",
    link: "https://www.softwareone.com/",
    src: "software-one.svg",
    size: 40,
    marginTop: -2
  },
  {
    name: "Insight",
    link: "https://www.insight.com/",
    src: "insight.svg",
    size: 46,
    marginTop: 2
  },
  {
    name: "SHI",
    link: "https://www.shi.com/",
    src: "shi.svg",
    size: 48,
    marginTop: -14
  },
  {
    name: "QBS Software",
    link: "https://www.qbssoftware.com/",
    src: "qbs-software.svg",
    size: 60,
    marginTop: 4
  }
];

</script>

<template>
  <section class="content">
    <div class="section-header">
      <h2>Purchase Through Your Preferred Reseller</h2>
      <p class="sub-header">QuestPDF works with software resellers worldwide, including SoftwareOne, Insight, SHI, and QBS — other distributors are welcome, no partner agreement or registration needed.</p>
    </div>

    <div class="resellers-list">
      <template v-for="reseller of resellers" :key="reseller.name">
        <a :href="reseller.link" target="_blank">
          <img :src="'/license/resellers/' + reseller.src"
              :alt="reseller.name"
              :style="{ height: reseller.size + 'px', marginTop: reseller.marginTop + 'px' }" />
        </a>
      </template>
    </div>

    <div class="reseller-instructions">
      <p>Payment by invoice and purchase order is supported, including multi-year terms.</p>
      <p>Resellers and procurement teams: <a href="mailto:contact@questpdf.com">request a quote</a></p>
    </div>
  </section>
</template>

<style scoped>

.resellers-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 48px 64px;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
}

.section-header {
  max-width: 860px;
}

.reseller-instructions {
  margin-top: 64px;

  p {
    text-align: center;
    color: var(--vp-c-text-3);
  }

  a {
    color: inherit !important;
    text-decoration: underline;
  }

  a:hover {
    color: var(--vp-c-text-2) !important;
  }
}

</style>

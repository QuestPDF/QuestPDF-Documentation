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
    name: "QBS Software",
    link: "https://www.qbssoftware.com/",
    src: "qbs-software.svg",
    size: 60,
    marginTop: 4
  },
  {
    name: "SHI",
    link: "https://www.shi.com/",
    src: "shi.svg",
    size: 48,
    marginTop: -14
  }
];


</script>

<template>
  <section class="content">
    <div class="section-header">
      <h2>Trusted Reselling Partners</h2>
      <p class="sub-header">QuestPDF is available through leading software distributors worldwide, ensuring local compliance and simplified billing for your organization.</p>
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

</style>
<script setup>

const resellers = [
  {
    name: "SoftwareOne",
    link: "https://www.softwareone.com/",
    src: "software-one.svg",
    size: 40,
    marginTop: 0
  },
  {
    name: "QBS Software",
    link: "https://www.qbssoftware.com/",
    src: "qbs-software.svg",
    size: 52,
    marginTop: 0
  },
  {
    name: "SHI",
    link: "https://www.shi.com/",
    src: "shi.svg",
    size: 48,
    marginTop: -12
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
        <a :href="reseller.link">
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
  gap: 64px;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
}

</style>
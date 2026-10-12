<script setup>

const resellers = [
  {
    name: "SoftwareOne",
    link: "https://www.softwareone.com/",
    src: "software-one.svg",
    size: 42,
    marginTop: -3
  },
  {
    name: "Insight",
    link: "https://www.insight.com/",
    src: "insight.svg",
    size: 48,
    marginTop: 3
  },
  {
    name: "SHI",
    link: "https://www.shi.com/",
    src: "shi.svg",
    size: 50,
    marginTop: -14
  },
  {
    name: "QBS Software",
    link: "https://www.qbssoftware.com/",
    src: "qbs-software.svg",
    size: 62,
    marginTop: 4
  }
];

</script>

<template>
  <article class="content pricing-resellers">
    <div class="section-header">
      <h2>Purchase Through Your Preferred Reseller</h2>
      <p class="sub-header">Any software reseller can order QuestPDF for you, with no partner agreement or registration needed. Invoices, purchase orders, and multi-year terms are supported — <a href="mailto:contact@questpdf.com">request a quote</a>.</p>
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
  </article>
</template>

<style scoped>

.resellers-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 56px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

/* logos are monochrome grey; they rest slightly muted so the hovered one reads as the "active" choice */
.resellers-list img {
  display: block;
  opacity: 0.85;
  transition: all 0.2s ease-in-out;
}

.resellers-list a:hover img {
  opacity: 1;
  filter: brightness(0.7);
  transform: scale(1.08);
}

html.dark .resellers-list a:hover img {
  filter: brightness(1.4);
}

</style>

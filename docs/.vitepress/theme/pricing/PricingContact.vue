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
  <!-- the closing pair: buying through a reseller, then the contact card; no seam between them -->
  <article class="content closing">
    <section class="panel">
      <div class="section-header">
        <h3 class="card-title">Purchase Through Your Preferred Reseller</h3>
        <p class="card-description">Any software reseller can order QuestPDF for you, with no partner agreement or registration needed. Invoices, purchase orders, and multi-year terms are supported — <a href="mailto:contact@questpdf.com">request a quote</a>.</p>
      </div>

      <div class="resellers-list">
        <a v-for="reseller of resellers" :key="reseller.name" :href="reseller.link" target="_blank">
          <img :src="'/license/resellers/' + reseller.src"
              :alt="reseller.name"
              :style="{ height: reseller.size + 'px', marginTop: reseller.marginTop + 'px' }" />
        </a>
      </div>
    </section>

    <section class="panel">
      <div class="section-header">
        <h3 class="card-title">Still have questions?</h3>
        <p class="card-description">Need further details on licensing, a custom quote, or to place a purchase order? Reach out to our team - we will respond within one business day.</p>
      </div>

      <a class="action primary" href="mailto:contact@questpdf.com">Contact us</a>
    </section>
  </article>
</template>

<style scoped>

.closing {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* surface, radius and padding come from the shared `.panel` style (CustomPages.css): two centred cards of
   the same width, each with a centred header */
.closing > .panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
}

.section-header {
  max-width: 750px;
}

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

.action {
  margin-top: 24px;
  padding: 12px 20px;
}

</style>

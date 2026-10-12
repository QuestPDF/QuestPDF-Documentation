<template>
  <section class="content">
    <div class="section-header">
      <div class="section-tag">Trust</div>
      <h2>The short answers</h2>
    </div>

    <!-- eight tiny question and answer pairs in a hairline grid; the answer is the big text -->
    <div class="panel quickfire">
      <div v-for="item of items" :key="item.q" class="qa">
        <div class="q">{{ item.q }}</div>
        <div class="a">{{ item.a }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  { q: "Phones home?", a: "Never." },
  { q: "License server?", a: "None." },
  { q: "Air-gapped?", a: "Yes." },
  { q: "Source code?", a: "On GitHub." },
  { q: "PDF/A?", a: "2b to 3a." },
  { q: "PDF/UA?", a: "UA-1." },
  { q: "E-invoicing?", a: "ZUGFeRD, Factur-X." },
  { q: "Validated?", a: "Every build." }
];
</script>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quickfire {
  width: 100%;
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.qa {
  padding: 24px 32px;
}

.qa:nth-child(4n + 1) { padding-left: 0; }
.qa:nth-child(4n) { padding-right: 0; }
.qa:nth-child(-n + 4) { padding-top: 0; }
.qa:nth-child(n + 5) { padding-bottom: 0; border-top: 1px solid var(--vp-c-divider); }
.qa:not(:nth-child(4n + 1)) { border-left: 1px solid var(--vp-c-divider); }

.q {
  font-size: 0.9375rem;
  line-height: 1.25rem;
  color: var(--vp-c-text-2);
}

.a {
  margin-top: 6px;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 960px) {
  .quickfire { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .qa { padding: 20px 24px; }
  .qa:nth-child(n) { border: none; padding-left: 24px; padding-right: 24px; padding-top: 20px; padding-bottom: 20px; }
  .qa:nth-child(odd) { padding-left: 0; }
  .qa:nth-child(even) { padding-right: 0; border-left: 1px solid var(--vp-c-divider); }
  .qa:nth-child(-n + 2) { padding-top: 0; }
  .qa:nth-child(n + 3) { border-top: 1px solid var(--vp-c-divider); }
  .qa:nth-child(n + 7) { padding-bottom: 0; }
}

</style>

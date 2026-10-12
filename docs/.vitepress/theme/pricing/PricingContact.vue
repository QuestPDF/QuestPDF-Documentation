<script setup>

</script>

<template>
  <article class="content">
    <section class="card pricing-contact">
      <div class="section-header">
        <h3>Still have questions?</h3>
        <p class="sub-header">Need further details on licensing, a custom quote, or to place a purchase order? Reach out to our team - we will respond within one business day.</p>
      </div>

      <a class="action primary" href="mailto:contact@questpdf.com">Contact us</a>
    </section>
  </article>
</template>

<style scoped>

/* surface, radius and padding come from the shared `.textured-page .card` style */
.card.pricing-contact {
  align-items: center;
  justify-content: center;
  max-width: 860px;
  margin: 0 auto;
}

/* card title: keeps the former h2 look; the global `.custom-page h3` adds a top margin and lighter weight */
h3 {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.section-header {
 max-width: 750px;
}

.action {
  margin-top: 8px;
}

</style>

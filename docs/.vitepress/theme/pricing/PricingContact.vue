<script setup lang="ts">
import PricingKeycap from "./PricingKeycap.vue";
</script>

<template>
  <article class="content">
    <section class="panel ringed closing">
      <div class="layout">
        <div>
          <h3 class="card-title">Still Have Questions?</h3>
          <p class="card-description">Ask about licensing, purchasing, or anything this page left open, and get a reply within one business day. You can also read the exact legal terms before you buy.</p>

          <div class="actions">
            <a class="action primary" href="mailto:contact@questpdf.com">Contact us</a>
            <a class="action" href="/license/">Read the Legal Terms</a>
          </div>
        </div>

        <PricingKeycap class="figure" />
      </div>
    </section>
  </article>
</template>

<style scoped>

/* as wide as the FAQ list above it (PricingFaq.vue); with the ring's 2px border the inset stays 40px */
.closing {
  container-type: inline-size;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  padding: 38px;
}

/* the key sits in the middle of a 200px column */
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  align-items: center;
  gap: 64px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: var(--actions-gap);
}

.figure {
  justify-self: center;
  width: 180px;
}

/* the width is the card's content box, which is what a container query measures: below it the two buttons no longer
   fit beside the key, so the card is text only */
@container (max-width: 615px) {
  .layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .figure {
    display: none;
  }
}

@media screen and (max-width: 700px) {
  .closing {
    padding: 26px 18px 22px;
  }

  .actions {
    flex-direction: column;
  }
}

</style>

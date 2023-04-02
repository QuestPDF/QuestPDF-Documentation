<template>
  <article class="content">
    <h2>Where Open-Source Meets Professionalism</h2>

    <p class="description" style="margin-bottom: 32px;"><span class="highlight-background">Important:</span> all library releases with versions up to 2022.12.X are still available under the MIT license, free even for commercial usage. The QuestPDF Professional or Enterprise License applies only to releases 2023.X and beyond.</p>


    <div class="pricing">
      <section class="pricing-tier">
        <img class="icon" src="/pricing/community.svg" alt="" style="grid-row: span 2; height: 64px;" />

        <div>
          <h3>Community</h3>
          <p class="price">Free forever</p>
        </div>

        <p class="features">
          Free for commercial usage <br>
          Unlimited developers <br>
          Unlimited APIs <br>
          Unlimited client applications <br>
          Unlimited redistributions
        </p>

        <a class="action primary" href="/getting-started">Start learning</a>
      </section>

      <section class="pricing-tier">
        <img class="icon" src="/pricing/professional.svg" alt="" style="grid-row: span 2; height: 64px;" />

        <div>
          <h3>Professional</h3>
          <p class="price">$500 USD per year</p>
        </div>

        <p class="features">
          Up to 10 developers<br>
          Unlimited APIs<br>
          Unlimited client applications<br>
          Unlimited redistributions
        </p>

        <div class="available-soon">
          <a class="action disabled">Purchase</a>
          <span>available soon</span>
        </div>
      </section>

      <section class="pricing-tier">
        <img class="icon" src="/pricing/enterprise.svg" alt="" style="grid-row: span 2; height: 64px;" />

        <div>
          <h3>Enterprise</h3>
          <p class="price">$3000 USD per year</p>
        </div>

        <p class="features">
          Unlimited developers <br>
          Unlimited APIs<br>
          Unlimited client applications<br>
          Unlimited redistributions
        </p>

        <div class="available-soon">
          <a class="action disabled">Purchase</a>
          <span>available soon</span>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup lang="ts">

</script>

<style scoped>
.pricing {
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-gap: 64px;
}

.pricing-tier {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  border: 1px solid var(--vp-c-gutter);
  background-color: var(--vp-c-bg);
  border-radius: 24px;
  padding: 32px;
  transition: all 0.25s ease-in-out;
}

.pricing-tier:hover {
  transform: scale(1.075);
  box-shadow: 0 13px 27px -5px rgb(0 0 0 / 25%), 0 8px 16px -8px rgb(0 0 0 / 30%), 0 -6px 16px -6px rgb(0 0 0 / 3%);
}

.pricing-tier h3 {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.5rem;
  margin-bottom: 8px;
}

.pricing p.price {
  line-height: 1.5rem;
  font-size: 1.2rem;
}

.pricing p.features {
  color: var(--vp-c-text-2);
  line-height: 1.5rem;
  font-size: 1rem;
}

.available-soon {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 4px;
}

.available-soon span {
  font-size: 0.8rem;
  font-style: italic;
  line-height: 1.2rem;
  color: var(--vp-c-text-2);
}

</style>
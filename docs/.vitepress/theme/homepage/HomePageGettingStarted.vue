<template>
  <div class="background-gradient" />
  <div class="background-grid" />

  <section class="content">
    <div class="description">
      <div class="section-tag">Example project</div>

      <h2>See a real-world example</h2>

      <p class="sub-header">Follow our detailed tutorial and see how easy it is to generate a fully functional invoice with fewer than 250 lines of C# code.</p>

      <div class="features">
        <div v-for="feature in features" class="feature-item">
          <i class="fa-duotone fa-square-check"></i>
          <span>{{ feature }}</span>
        </div>
      </div>

      <a class="action primary" href="/getting-started">
        Start Tutorial
        <i class="fa-solid fa-arrow-right arrow-icon"></i>
      </a>
    </div>

    <div class="invoice-stack">
      <div class="invoice-card invoice-back">
        <img src="/homepage/getting-started/invoice2.webp" alt="Sample invoice page 2" />
      </div>
      <div class="invoice-card invoice-front">
        <img src="/homepage/getting-started/invoice1.webp" alt="Sample invoice page 1" />
      </div>
    </div>
  </section>
</template>

<script setup>

const features = [
  "Step-by-step guidance",
  "Production-ready code",
  "Best practices included",
];

</script>

<style scoped>
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 64px;
    align-items: center;
    overflow: visible;
  }

  @media screen and (max-width: 750px) {
    .content {
      grid-template-columns: 1fr;
      grid-gap: 48px;
    }
  }


  /* Features list */

  .features {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 0px 0 32px 0;
  }

  .feature-item {
    display: flex;
    gap: 12px;
    color: var(--vp-c-text-2);
  }


  /* Action button */

  .action.primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .arrow-icon {
    font-size: 16px;
    transition: transform 0.2s ease;
    color: white;
  }

  .action.primary:hover .arrow-icon {
    transform: translateX(4px);
  }


  /* Invoice stack */

  .invoice-stack {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 420px;
    perspective: 1000px;
  }

  @media screen and (max-width: 900px) {
    .invoice-stack {
      min-height: 350px;
    }
  }

  .invoice-card {
    position: absolute;
    background: white;
    border-radius: 8px;

    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 20px 25px -5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  }

  html:not(.dark) .invoice-card {
    border: 1px solid #0004;
  }

  .invoice-card img {
    display: block;
    width: 225px;
    height: auto;
  }

  @media screen and (max-width: 1200px) {
    .invoice-card img {
      width: 200px;
    }
  }

  @media screen and (max-width: 800px) {
    .invoice-card img {
      width: 175px;
    }
  }

  @media screen and (max-width: 500px) {
    .invoice-card img {
      width: 150px;
    }
  }

  .invoice-back {
    transform: translateX(40px) translateY(-20px) rotate(6deg);
    z-index: 1;
  }

  .invoice-front {
    transform: translateX(-40px) translateY(20px) rotate(-3deg);
    z-index: 2;
  }


  /* Hover effects */

  .content:hover {
    .invoice-card {
      box-shadow:
          0 8px 12px -2px rgba(0, 0, 0, 0.12),
          0 16px 24px -4px rgba(0, 0, 0, 0.12),
          0 24px 32px -8px rgba(0, 0, 0, 0.12);
    }

    .invoice-back {
      transform: translateX(60px) translateY(-30px) rotate(8deg);
    }

    .invoice-front {
      transform: translateX(-60px) translateY(30px) rotate(-5deg);
    }
  }


  /* Dark mode */

  html.dark {
    .invoice-card {
      background: #1e1e1e;
      box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.3),
          0 10px 15px -3px rgba(0, 0, 0, 0.3),
          0 20px 25px -5px rgba(0, 0, 0, 0.3);
    }

    .invoice-card img {
      opacity: 0.9;
    }

    .invoice-stack:hover .invoice-card {
      box-shadow:
          0 8px 12px -2px rgba(0, 0, 0, 0.4),
          0 16px 24px -4px rgba(0, 0, 0, 0.4),
          0 24px 32px -8px rgba(0, 0, 0, 0.4);
    }
  }


  /* Background */

  .background-gradient {
    position: absolute;
    pointer-events: none;
    inset: 0;
    background-image: radial-gradient(ellipse 75% 100% at 50% 100%, color-mix(in srgb, var(--vp-c-brand-2) 15%, transparent), transparent);
  }

  .background-grid {
    position: absolute;
    pointer-events: none;
    inset: 0;
    --grid-thickness: 2px;
    --grid-color: var(--vp-c-brand-1);

    background-image:
        linear-gradient(var(--vp-c-brand-3) var(--grid-thickness), transparent var(--grid-thickness)),
        linear-gradient(90deg, var(--vp-c-brand-3) var(--grid-thickness), transparent var(--grid-thickness));
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 75% 75% at 50% 100%, #0001 25%, transparent 100%);
  }

  html.dark .background-grid {
    --grid-thickness: 1px;
    --grid-color: var(--vp-c-brand-3);
  }
</style>
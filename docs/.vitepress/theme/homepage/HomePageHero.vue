<template>
  <div class="hero">
    <section class="content">
      <h1>
        <span class="highlight-foreground">Code-first</span> PDF library for C#
      </h1>

      <p class="lead">
        Generate documents confidently with reviewable code, <span class="no-break">hot-reload</span> preview and your favorite AI coding agents.
      </p>
    </section>
  </div>
</template>


<style scoped>

/* Layout */

.content {
  padding-block: 64px;
  text-align: center;
}


/* Text */

h1 {
  margin: 0 0 clamp(40px, 4vw, 56px);
  font-size: var(--hero-title-size);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.03em;
  word-spacing: 0.1em;
  color: light-dark(#142630, var(--vp-c-text-1));
}

h1 .highlight-foreground {
  display: inline-block; /* so the gradient box ends at the word, not the full line */
  padding-right: 0.05em; /* keeps the gradient clip from shaving the last letter's edge */
  font-weight: 700;

  background-image: linear-gradient(100deg, #00c6ff 0%, #0094f9 55%, #2979ff 100%);
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

html.dark h1 .highlight-foreground {
  background-image: linear-gradient(100deg, #4ED4FF 0%, #2FAEFA 50%, #5C8DFF 100%);
}

.lead {
  max-width: 30em;
  margin: 0 auto;
  font-size: clamp(1.25rem, 1.05rem + 0.92vw, 1.875rem);
  line-height: 1.6;
  font-weight: 450;
  text-wrap: balance;
  color: var(--vp-c-text-1);
}

html.dark .lead {
  font-weight: 400;
  color: color-mix(in srgb, var(--vp-c-text-1) 60%, var(--vp-c-text-2));
}

.no-break {
  white-space: nowrap;
}

</style>

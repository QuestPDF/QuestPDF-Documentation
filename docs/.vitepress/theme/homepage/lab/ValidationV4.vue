<template>
  <!-- 4 · Seal: a ring seal, an eyebrow, a headline claim, then the sentence as the proof -->
  <div class="validation">
    <div class="seal"><i class="fa-solid fa-badge-check"></i></div>
    <div class="body">
      <div class="eyebrow">Independent validation</div>
      <h3 class="headline">Every build passes veraPDF and Mustang.</h3>
      <p class="text">
        Both are independent, open-source validators:
        <a href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> for PDF/A and PDF/UA,
        <a href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a> for ZUGFeRD and Factur-X.
        The checks run automatically in CI on every build.
      </p>
    </div>
  </div>
</template>

<style scoped>

.validation {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.seal {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: var(--vp-c-brand-1);
  box-shadow:
      inset 0 0 0 2px var(--vp-c-brand-1),
      inset 0 0 0 5px var(--home-surface),
      inset 0 0 0 6px color-mix(in srgb, var(--vp-c-brand-1) 50%, transparent);
}

.seal i {
  font-size: 1.375rem;
}

.eyebrow {
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.headline {
  margin: 4px 0 0;
  font-size: 1.125rem;
  line-height: 1.625rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.text {
  margin: 6px 0 0;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
}

.text a {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  text-underline-offset: 3px;
}

</style>

<template>
  <!-- the line as it ships today, for comparison -->
  <p class="validation">
    <i class="fa-regular fa-badge-check"></i>
    <span>
      Every build is automatically validated with the independent, open-source
      <a href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> (PDF/A and PDF/UA) and
      <a href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a> (ZUGFeRD and Factur-X) validators.
    </span>
  </p>
</template>

<style scoped>

.validation {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: 32px 0 0;
  font-size: 0.9375rem;
  line-height: 1.375rem;
  color: var(--vp-c-text-2);
}

.validation i {
  flex-shrink: 0;
  margin-top: 2px;
  font-size: 1.125rem;
  color: var(--vp-c-brand-1);
}

.validation a {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--vp-c-text-1) 30%, transparent);
  text-underline-offset: 3px;
}

</style>

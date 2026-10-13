<template>
  <!-- 1 · Evidence bar: the same sentence, lifted into a tinted inset with a title and a filled badge -->
  <div class="validation">
    <div class="badge"><i class="fa-solid fa-badge-check"></i></div>
    <div class="body">
      <div class="title">Independently validated on every build</div>
      <p class="text">
        Every build is automatically validated with the independent, open-source
        <a href="https://verapdf.org/" target="_blank" rel="noopener">veraPDF</a> (PDF/A and PDF/UA) and
        <a href="https://www.mustangproject.org/" target="_blank" rel="noopener">Mustang</a> (ZUGFeRD and Factur-X) validators.
      </p>
    </div>
  </div>
</template>

<style scoped>

.validation {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-top: 32px;
  padding: 20px 24px;
  border-radius: 16px;
  background-color: var(--home-surface-inner);
}

.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: var(--vp-c-brand-1);
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
}

.badge i {
  font-size: 1.25rem;
}

.title {
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.text {
  margin: 4px 0 0;
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

@media screen and (max-width: 560px) {
  .validation { flex-direction: column; gap: 12px; padding: 20px; }
}

</style>

<template>
  <section class="custom-page license-page">
    <div class="container no-border">
      <div class="content" style="padding-bottom: 48px;">
        <article style="max-width: 800px;">
          <slot name="header"></slot>
        </article>
      </div>
    </div>

    <div class="container reverse-background">
      <div class="content" style="padding-top: 32px;">
        <div style="max-width: 800px;">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style>
.license-page h3 {
  margin: 32px 0 12px 0;
}

.license-page .description {
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  line-height: 2rem;
}

.license-page p {
  margin-bottom: 12px;
}
</style>
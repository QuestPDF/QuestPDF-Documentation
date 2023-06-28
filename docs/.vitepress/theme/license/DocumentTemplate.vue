<template>
  <section class="custom-page document-page">
    <div class="container no-border">
      <div class="content" style="padding-bottom: 48px;">
        <article style="max-width: 800px;">
          <slot name="header"></slot>
        </article>
      </div>
    </div>

    <div class="container reverse-background">
      <div class="content" style="padding-top: 0px;">
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
.document-page h3 {
  margin: 48px 0 8px 0 !important;
}

.document-page .description {
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  line-height: 2rem;
}

.document-page p:not(:last-child) {
  margin-bottom: 24px;
}

</style>
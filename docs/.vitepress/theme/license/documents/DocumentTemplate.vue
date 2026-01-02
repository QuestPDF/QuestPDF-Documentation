<template>
  <section class="custom-page document-page">
    <div class="container">
      <div class="content" style="padding-bottom: 48px;">
        <section style="max-width: 800px;">
          <slot name="header"></slot>
        </section>
      </div>
    </div>

    <div class="container reverse-background">
      <div class="content" style="padding-top: 48px;">
        <div class="document-content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style>
.document-page h3:first-child {
  margin-top: 0;
}

.document-content {
  display: flex;
  flex-direction: column;
  gap: 48px;

  max-width: 800px !important;
}

.document-page h3 {
  margin: 0 0 8px 0 !important;
}

.document-page a {
  font-weight: 600;
}

.document-page .description {
  color: var(--vp-c-text-1);
}

.document-page p:not(:last-child) {
  margin-bottom: 24px;
}

</style>
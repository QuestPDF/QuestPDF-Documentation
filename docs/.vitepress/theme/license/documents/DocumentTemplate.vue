<template>
  <section class="custom-page document-page">
    <div class="container reverse-background">
      <div class="content">
        <section style="max-width: 800px;">
          <div class="section-header">
            <slot name="header"></slot>
          </div>
        </section>

        <div class="card">
          <slot name="content"></slot>
        </div>

        <slot name="footer"></slot>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style>


.document-page .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  max-width: 800px;
}

.document-page h1 {
  margin-bottom: 0;
}

.document-page .card hr {
  margin: 32px -32px;
  width: calc(100% + 64px);
  border-color: #8882;
}


.document-page a.action {
  margin: 0;
}

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
  margin: 0 0 16px 0 !important;
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
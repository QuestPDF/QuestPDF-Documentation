<template>
  <section class="custom-page document-page">
    <div class="container reverse-background">
      <div class="content">
        <section style="max-width: 800px;">
          <div class="section-header">
            <h1>{{ doc.title }}</h1>
          </div>
        </section>

        <div class="card">
          <div class="document-body vp-doc" v-html="doc.html"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { data } from "./licenseDocuments.data.ts";

const props = defineProps({
  id: { type: String, required: true }
});

const doc = data[props.id];
</script>

<style lang="scss">

.document-page .content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  max-width: 800px;
}

.document-body * {
  color: var(--vp-c-text-2);
}

.document-body h2 {
  margin: 32px -32px 16px;
  padding: 32px 32px 0;
  width: calc(100% + 64px);
  border-top: 1px solid #8882;
  color: var(--vp-c-text-1);
  font-size: 1.4rem;
}

.document-body strong {
  color: var(--vp-c-text-1);
}

</style>
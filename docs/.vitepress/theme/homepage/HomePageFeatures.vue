<script setup>

const features = [
    "fa-palette",
    "fa-text",
    "fa-image",
    "fa-bezier-curve",
    "fa-table",
    "fa-list",
    "fa-layer-group",
    "fa-newspaper",
    "fa-objects-align-center-horizontal",
    "fa-crop",
    "fa-page-break",
    "fa-object-group",
    "fa-bookmark",
    "fa-link",
    "fa-scissors",
    "fa-lock",
    "fa-paperclip"
]

</script>

<template>
  <section class="content">
    <div class="section-header">
      <h2>Everything you need to generate PDFs</h2>
      <p class="sub-header">From layout and styling to production features, QuestPDF gives you the flexibility to create documents of any complexity.</p>
    </div>

    <div class="features">
      <i v-for="feature of features" :key="feature" class="feature icon fa-regular" :class="[feature]" />
    </div>

    <a class="action" href="/features-overview" target="_blank">
      Explore all features
    </a>
  </section>
</template>

<style scoped>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.features {
  place-self: center;
  max-width: 800px;
  margin-top: 32px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.feature {
  width: 64px;
  height: 64px;
  place-content: center;
  text-align: center;

  font-size: 1.5rem;

  color: #666;
  background-color: #0000000A;
  border-radius: 12px;
}

html.dark .feature {
  color: #999;
  background-color: #FFFFFF0A;
}

a.action {
  margin-top: 64px;
}

</style>
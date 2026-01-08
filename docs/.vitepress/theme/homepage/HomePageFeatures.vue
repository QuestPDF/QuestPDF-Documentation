<script setup>

const features = [
    "fa-text",
    "fa-image",
    "fa-align-center",
  "fa-text",
  "fa-image",
  "fa-align-center",
  "fa-text",
  "fa-image",
  "fa-align-center",
  "fa-text",
  "fa-image",
  "fa-align-center",
  "fa-align-center",
  "fa-align-center",
  "fa-align-center",
  "fa-align-center",
  "fa-align-center",
]

</script>

<template>
  <section class="content">
    <div class="section-header">
      <h2>Everything you need to generate PDFs</h2>
      <p class="sub-header">A comprehensive toolkit designed for professional PDF document generation in .NET applications</p>
    </div>

    <div class="features">
      <i v-for="feature of features" :key="feature" class="feature icon fa-regular" :class="[feature]" />
    </div>

    <a class="action" href="/features-overview">
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
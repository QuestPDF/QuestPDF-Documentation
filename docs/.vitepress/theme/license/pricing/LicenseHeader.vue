<template>
  <header class="section-header">
    <h1>Perpetual Licensing</h1>

    <div class="license-description">
      <i class="fa-duotone fa-file-certificate license-icon"></i>
      A commercial license is required only for companies with more than 1M USD annual gross revenue
    </div>
  </header>
</template>

<script setup>

</script>

<style scoped>

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 450px) {
  h1 {
    font-size: 2rem;
  }
}

@media screen and (max-width: 400px) {
  h1 {
    font-size: 1.75rem;
  }
}

.license-icon {
  font-size: 48px;
  color: #67B84D;
}

.license-description {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 24px;

  border-radius: 12px;
  padding: 24px;
  color: #1B5E20;
  background-color: #67B84D33;

  max-width: 525px;
  place-self: center;
  text-align: left;
}

html.dark .license-description {
  color: #A5D6A7;
}

</style>
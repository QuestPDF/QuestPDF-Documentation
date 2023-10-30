<script setup>

</script>

<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <div class="content">

        <section class="alert card">

          <div style="display: flex; flex-direction: row; gap: 32px">
            <img src="/license/success.svg" alt="">
            <div>
              <h2 class="title highlight-foreground">Payment successful</h2>
              <p class="subtitle">Thank you for purchasing the QuestPDF library license</p>
            </div>
          </div>

          <hr>

          <p>We greatly appreciate every user and every company that chooses to adhere to our licensing terms. Your purchase allows us to continuously improve the library, ensuring regular feature enhancements and quality updates for the future.</p>

          <hr>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <p>We place our trust in our clients. As a result, the QuestPDF library does not require any license key.</p>

            <p>Modifying the license configuration is simple. Please share the link below with your software development team:</p>
          </div>

          <div style="display: flex; flex-direction: column; align-items: end; margin-top: 32px;">
            <a class="action" href="/license/configuration.html">Configure license</a>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  max-width: 600px;
  align-items: center;
}

.alert {

}

.alert img {
  width: 64px !important;
}

.alert .title {
  margin-bottom: 8px;
}

.alert .subtitle {
  line-height: 1.5rem;
  font-size: 1.25rem;
}

</style>
<script setup lang="ts">
interface ContactInformation {
    image: string;
    title: string;
    description: string;
    link: string;
    linkLabel: string;
}

const contacts: ContactInformation[] = [
  {
    image: "/contact/github.svg",
    title: "Community Support",
    description: "Encountering an issue or have a feature idea? Join our community on GitHub. It is the best place to report bugs, discuss improvements, and share your insights with other developers.",
    link: "https://github.com/QuestPDF/QuestPDF",
    linkLabel: "Visit GitHub"
  },
  {
    image: "/contact/paddle.svg",
    title: "Payment Support",
    description: "We partner with Paddle to guarantee secure payments and global tax compliance. Please reach out to their team directly for assistance with invoices, billing inquiries, or returns.",
    link: "https://www.paddle.com/about/procurement",
    linkLabel: "Go to Paddle"
  },
  {
    image: "/contact/email.svg",
    title: "Get in Touch",
    description: "Have a question about licensing, or just want to share feedback? Send us an email. We value your input and are always happy to help with non-technical inquiries or dedicated support.",
    link: "mailto:contact@questpdf.com",
    linkLabel: "Contact Us"
  }
]
</script>

<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <div class="content">

        <section class="contacts">
          <template v-for="contact of contacts" :key="contact">
            <article class="card">
              <img :src="contact.image" alt="">
              <h3>{{ contact.title }}</h3>
              <p>{{ contact.description }}</p>

              <a class="action" :href="contact.link" target="_blank" style="margin-top: 16px">{{ contact.linkLabel }}</a>
            </article>
          </template>

          <article class="business-details card">
            <h3>QuestPDF is owned and proudly developed by:</h3>

            <p>Marcin Ziąbek CodeFlint</p>
            <p>Chrzanowska 29<br>32-551 Mętków<br>Poland</p>
            <p>contact@questpdf.com<br>VAT: PL6282275649</p>
          </article>
        </section>

      </div>
    </div>
  </div>
</template>

<style scoped>

.contacts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

@media screen and (max-width: 750px) {
  .contacts {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.business-details p:not(:last-child) {
  margin-bottom: 8px;
}

.business-details h3 {
  margin-top: 0;
  margin-bottom: 20px;
}

.content {
  min-height: calc(100vh - var(--vp-nav-height) - 110px);
}

</style>
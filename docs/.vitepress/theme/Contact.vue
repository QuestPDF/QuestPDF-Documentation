<script setup lang="ts">
interface ContactInformation {
    image: string;
    title: string;
    description: string;
    link: string;
    linkLabel: string;
}

const contacts : ContactInformation[] = [
    {
        image: "/contact/github.svg",
        title: "Community Support",
        description: "If you're experiencing any problems or have suggestions to enhance the QuestPDF library, we invite you to seek resolution and share your insights on the GitHub platform.",
        link: "https://github.com/QuestPDF/QuestPDF",
        linkLabel: "Visit GitHub"
    },
    {
        image: "/contact/paddle.svg",
        title: "Payment support",
        description: "We collaborate with Paddle, our Merchant of Record, to ensure compliance with tax regulations and payment security. Paddle provides all customer service inquiries and handles returns.",
        link: "https://www.paddle.com/about/procurement",
        linkLabel: "Go to Paddle"
    },
    {
        image: "/contact/email.svg",
        title: "Support",
        description: "Contact us via email for dedicated support, non-technical inquiries, feedback, and information about the QuestPDF library. We value your input very highly and are open to help.",
        link: "mailto:contact@questpdf.com",
        linkLabel: "Contact us",
    }
]
</script>

<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <div class="content">

        <section class="contacts">
          <template v-for="contact of contacts" :key="contact">
            <article class="contact card">
              <img :src="contact.image" alt="">
              <h3>{{ contact.title }}</h3>
              <p>{{ contact.description }}</p>

              <a class="action" :href="contact.link" target="_blank" style="margin-top: 16px">{{ contact.linkLabel }}</a>
            </article>
          </template>
        </section>

      </div>
    </div>
  </div>
</template>

<style scoped>

.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
}

@media screen and (max-width: 700px) {
  .contacts {
    gap: 32px;
  }
}

.contact {
  width: 100%;
  max-width: 500px;
}

.contact img {
  height: 48px;
}

</style>
<script setup lang="ts">
interface ContactInformation {
    link: string;
    image: string;
    title: string;
    description: string;
}

const contacts : ContactInformation[] = [
    {
        link: "https://github.com/QuestPDF/QuestPDF",
        image: "/contact/github.svg",
        title: "Technical support",
        description: "If you're experiencing any problems or have suggestions to enhance the QuestPDF library, we invite you to seek resolution and share your insights on the GitHub platform.",
    },
    {
        link: "https://www.paddle.com/",
        image: "/contact/paddle.svg",
        title: "Payment support",
        description: "Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.",
    },
    {
        link: "mailto:contact@questpdf.com",
        image: "/contact/email.svg",
        title: "General support",
        description: "Contact us via email for non-technical inquiries, feedback, and information about the QuestPDF library. We value your input very highly and are open to help.",
    }
]
</script>

<template>
  <div class="custom-page">
    <div class="container reverse-background">
      <div class="content">

        <section class="contacts">
          <template v-for="contact of contacts" :key="contact">
            <a :href="contact.link" target="_blank">
              <article class="contact">
                <img :src="contact.image" alt="">
                <h3>{{ contact.title }}</h3>
                <p>{{ contact.description }}</p>
              </article>
            </a>
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

  margin: 0 -24px;
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

.contact {
  padding: 24px;
  transition: 0.2s ease-in-out;
  background-color: var(--vp-c-bg);
  border-radius: 24px;
  box-shadow: var(--elevation);
  border: 1px solid var(--vp-c-gutter);
}

.contact:hover {
  transform: scale(1.05);
  box-shadow: var(--elevation-hover);
}

</style>
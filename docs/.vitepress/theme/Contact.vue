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
        image: "/public/contact/github.svg",
        title: "Technical support",
        description: "If you're experiencing any problems or have suggestions to enhance the QuestPDF library, we invite you to seek resolution and share your insights on the GitHub platform.",
    },
    {
        link: "https://www.paddle.com/",
        image: "/public/contact/paddle.svg",
        title: "Payment support",
        description: "Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.",
    },
    {
        link: "mailto:contact@questpdf.com",
        image: "/public/contact/email.svg",
        title: "General support",
        description: "Contact us via email for non-technical inquiries, feedback, and information about the QuestPDF library. We value your input very highly and are open to help.",
    }
]
</script>

<template>
  <div class="custom-page">
    <div class="container">
      <div class="content">

        <div class="contacts">
          <template v-for="contact of contacts" :key="contact">
            <a :href="contact.link" target="_blank">
              <div class="contact">
                <img :src="contact.image">
                <h3>{{ contact.title }}</h3>
                <p>{{ contact.description }}</p>
              </div>
            </a>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;

  margin: 0 -24px;
}

@media screen and (max-width: 700px) {
  .contacts {
    gap: 64px;
  }
}

.contact {
  width: 500px;
  max-width: 100%;
}

.contact img {
  height: 64px;
}

.contact {
  padding: 24px;
  transition: 0.2s ease-in-out;
  background-color: var(--vp-c-bg);
  border-radius: 24px;
  border: 1px solid transparent;
}

.contact:hover {
  transform: scale(1.05);
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-gutter);
}

</style>
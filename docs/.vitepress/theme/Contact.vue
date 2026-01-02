<script setup lang="ts">
interface Link {
  href: string;
  label: string;
}

interface ContactInformation {
    icon: string;
    title: string;
    description: string;
    links: Link[];
}

const contacts: ContactInformation[] = [
  {
    icon: "fa-duotone fa-user-group",
    title: "Community Support",
    description: "Encountering an issue or have a feature idea? Join our community on GitHub. It is the best place to report bugs, discuss improvements, and share your insights with other developers.",
    links: [
      {
        label: "Open GitHub",
        href: "https://github.com/QuestPDF/QuestPDF"
      }
    ]
  },
  {
    icon: "fa-duotone fa-id-card",
    title: "Customer Portal",
    description: "Access your subscription details, download invoices, update payment methods, or manage your license. Our customer portal provides a convenient way to handle all your account needs in one place.",
    links: [
      {
        label: "Open Customer Portal",
        href: "https://customer-portal.paddle.com/login/cpl_01gmdq0qdr8madhdchknpb52we"
      }
    ]
  },
  {
    icon: "fa-duotone fa-credit-card",
    title: "Payment Support",
    description: "We partner with Paddle to guarantee secure payments and global tax compliance. Please reach out to their team directly for assistance with invoices, billing inquiries, or returns.",
    links: [
      {
        label: "Show Paddle details",
        href: "https://www.paddle.com/about/procurement"
      },
      {
        label: "Contact with Paddle",
        href: "mailto:help@paddle.com"
      }
    ]
  },
  {
    icon: "fa-duotone fa-envelope",
    title: "Get in Touch",
    description: "Have a question about licensing, or just want to share feedback? Send us an email. We value your input and are always happy to help with non-technical inquiries or dedicated support.",
    links: [
      {
        label: "Contact Us",
        href: "mailto:contact@questpdf.com"
      }
    ]
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
              <i class="fa-2xl" :class="[contact.icon]"></i>
              <h3>{{ contact.title }}</h3>
              <p>{{ contact.description }}</p>

              <div class="links">
                <a v-for="link in contact.links" class="action" :href="link.href" target="_blank">{{ link.label }}</a>
              </div>
            </article>
          </template>

          <article class="card business-details">
            <i class="love-icon fa-duotone fa-heart fa-swap-opacity fa-2xl"></i>
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

.links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  place-self: end;
  gap: 12px;
  margin-top: 24px;
}

.love-icon {
  background-color: #F4433622 !important;
  color: #F44336BB !important;
}

.business-details p {
  padding-top: 8px;
}

</style>

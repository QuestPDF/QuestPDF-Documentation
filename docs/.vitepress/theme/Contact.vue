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
    icon: "fa-user-group",
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
    icon: "fa-id-card",
    title: "Customer Portal",
    description: "Access your subscription details, download invoices, update payment methods, or manage your license. Our customer portal provides a convenient way to handle all your account needs in one place.",
    links: [
      {
        label: "Open Customer Portal",
        href: "https://account.questpdf.com"
      }
    ]
  },
  {
    icon: "fa-credit-card",
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
    icon: "fa-envelope",
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
  <div class="custom-page contact-page">
    <div class="container texture-dots">
      <div class="content">
        <header class="section-header contact-header">
          <h1>Contact us</h1>
        </header>

        <section class="contacts">
          <article v-for="contact of contacts" :key="contact.title" class="panel contact-card">
            <div class="icon-tile">
              <i class="fa-regular" :class="contact.icon"></i>
            </div>

            <h3 class="card-title">{{ contact.title }}</h3>
            <p class="card-description">{{ contact.description }}</p>

            <div class="links">
              <a v-for="link in contact.links" :key="link.href" class="action" :href="link.href" :target="link.href.startsWith('http') ? '_blank' : undefined">{{ link.label }}</a>
            </div>
          </article>

          <div class="dotted-divider" aria-hidden="true"></div>

          <!-- full width, so the company details do not sit alone in a half-empty row -->
          <article class="panel business-details">
            <div class="business-owner">
              <div class="icon-tile">
                <i class="love-icon fa-solid fa-heart"></i>
              </div>

              <div>
                <p class="business-intro">QuestPDF is owned and proudly developed by</p>
                <h3 class="business-name">Marcin Ziąbek CodeFlint</h3>
              </div>
            </div>

            <dl class="business-facts">
              <div>
                <dt>Address</dt>
                <dd>Chrzanowska 29<br>32-551 Mętków<br>Poland</dd>
              </div>

              <div>
                <dt>Email</dt>
                <dd>contact@questpdf.com</dd>
              </div>

              <div>
                <dt>VAT</dt>
                <dd>PL6282275649</dd>
              </div>
            </dl>
          </article>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>

.contact-header {
  margin-bottom: 48px;
}

.contacts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
}

@media screen and (max-width: 750px) {
  .contacts {
    grid-template-columns: minmax(0, 1fr);
  }
}

.contact-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.contact-card .icon-tile {
  margin-bottom: 16px;
}

/* buttons sit at the bottom, so they line up across the cards of a row */
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: auto;
  padding-top: 24px;
}

.business-details {
  grid-column: 1 / -1;

  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 32px 48px;
  align-items: center;
}

.business-owner {
  display: flex;
  align-items: center;
  gap: 20px;
}

.business-intro {
  font-size: 0.9375rem;
}

.business-name {
  margin: 4px 0 0;
  line-height: 1.75rem;
}

.business-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.business-facts dt {
  margin-bottom: 6px;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.business-facts dd {
  font-size: 0.9375rem;
  line-height: 1.5rem;
  color: var(--vp-c-text-1);
}

@media screen and (max-width: 960px) {
  .business-details {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media screen and (max-width: 600px) {
  .business-facts {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
}

/* the one coloured icon on the page: the heart keeps its red on the neutral tile */
.icon-tile .love-icon {
  color: #F44336;
}

</style>

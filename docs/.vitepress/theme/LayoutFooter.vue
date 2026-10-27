<script setup lang="ts">
import { useData } from 'vitepress';
import {computed} from "vue";

const { frontmatter } = useData();

const showLinks = computed(() => {
  const layout = frontmatter.value.layout;
  return layout === 'home' || layout === 'page';
});

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const columns: FooterColumn[] = [
  {
    title: "Documentation",
    links: [
      { label: "Quick start", href: "/quick-start.html" },
      { label: "Invoice tutorial", href: "/invoice-tutorial.html" },
      { label: "Features overview", href: "/features-overview.html" },
      { label: "Sample gallery", href: "/sample-gallery.html" },
      { label: "Companion app", href: "/companion/usage.html" },
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Releases", href: "https://github.com/QuestPDF/QuestPDF/releases", external: true },
      { label: "Roadmap", href: "/roadmap.html" },
      { label: "GitHub", href: "https://github.com/QuestPDF/QuestPDF", external: true },
      { label: "NuGet", href: "https://www.nuget.org/packages/QuestPDF", external: true },
    ]
  },
  {
    title: "Licensing & Pricing",
    links: [
      { label: "Pricing", href: "/pricing.html" },
      { label: "License Selection Guide", href: "/license/guide.html" },
      { label: "Community License", href: "/license/community.html" },
      { label: "Professional & Enterprise", href: "/license/professional-enterprise.html" },
    ]
  },
  {
    title: "Company & Legal",
    links: [
      { label: "Contact us", href: "/contact.html" },
      { label: "Customer portal", href: "https://account.questpdf.com", external: true },
      { label: "Terms of Service", href: "/terms-of-service.html" },
      { label: "Security Policy", href: "/security-policy.html" },
      { label: "Privacy Policy", href: "/privacy-policy.html" },
    ]
  }
];

const year = new Date().getFullYear();
</script>

<template>
  <footer>
    <div v-if="showLinks" class="content">
      <nav class="link-categories" aria-label="Footer">
        <div v-for="column in columns" :key="column.title" class="link-category">
          <h2>{{ column.title }}</h2>

          <ul>
            <li v-for="link in column.links" :key="link.label">
              <a :href="link.href" :target="link.external ? '_blank' : undefined">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="content">
      <p class="copyright">© {{ year }} QuestPDF by Marcin Ziąbek CodeFlint</p>
    </div>
  </footer>
</template>

<style scoped>

footer {
  /* opaque, like the navbar: the page canvas (glows and grain) stops at the footer's top border */
  background-color: var(--vp-c-bg);
}

footer * {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}


.content {
  border-top: 1px solid var(--vp-c-divider);
}

.content > * {
  margin: 0 auto;
  max-width: var(--custom-page-width);
  padding: 48px var(--custom-page-gutter);
}

.link-categories {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 48px 32px;
}

.link-category h2 {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.link-category ul {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link-category a:hover {
  color: var(--vp-c-text-1);
  text-decoration: underline;
  text-underline-offset: 4px;
}

@media screen and (max-width: 960px) {
  .link-categories {
    grid-template-columns: repeat(2, auto);
  }
}

@media screen and (max-width: 410px) {
  .link-categories {
    grid-template-columns: repeat(1, auto);
  }
}

/* touch: each link a 44px row (its text keeps its place under the heading) */
@media (pointer: coarse) {
  .link-category h2 {
    margin-bottom: 2px;
  }

  .link-category ul {
    gap: 0;
  }

  .link-category a {
    display: block;
    padding-block: 10px;
  }
}


.copyright {
  text-align: center;
  padding: 24px var(--custom-page-gutter);
}

</style>

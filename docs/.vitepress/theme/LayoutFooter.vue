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

const year = 2026;
</script>

<template>
  <footer>
    <div v-if="showLinks" class="content">
      <nav class="link-categories" aria-label="Footer">
        <div v-for="column in columns" :key="column.title" class="link-category">
          <h2>{{ column.title }}</h2>

          <ul>
            <li v-for="link in column.links" :key="link.label">
              <a :href="link.href"
                 :target="link.external ? '_blank' : undefined"
                 :rel="link.external ? 'noopener' : undefined">
                {{ link.label }}
              </a>
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

<style scoped lang="scss">

footer {
  background-color: var(--vp-c-bg-alt);
}

footer * {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}


/* LINKS */

.content {
  border-top: 1px solid var(--vp-c-divider);

  & > * {
    margin: 0 auto;
    max-width: 1216px;
    padding: 48px 32px 48px;
  }
}

.link-categories {
  margin: 0 auto;
  max-width: 1216px;
  padding: 48px 32px 48px;

  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 48px 32px;
}

.link-category {
  h2 {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--vp-c-text-1);
    margin-bottom: 12px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  a:hover {
    color: var(--vp-c-text-1);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
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


/* COPYRIGHT */

.copyright {
  text-align: center;
  padding: 24px 32px;
}

</style>

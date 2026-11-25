<script setup lang="ts">
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faArrowDownToLine, faStar } from "@fortawesome/pro-regular-svg-icons";
import { useData } from 'vitepress';
import {computed} from "vue";
import Icon from "./Icon.vue";
import { data as statistics } from "./statistics.data";

const { frontmatter } = useData();

/* documentation pages keep the fine print only */
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
    title: "Project",
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

/* the two homepage statistics a developer checks first, with their hero icons */
const proofIcons: Record<string, IconDefinition> = {
  "GitHub stars": faStar,
  "NuGet downloads": faArrowDownToLine
};

const proof = statistics.filter(statistic => statistic.label in proofIcons);

const year = new Date().getFullYear();
</script>

<template>
  <footer>
    <div class="content" :class="{ 'with-links': showLinks }">
      <template v-if="showLinks">
        <div class="brand">
          <a class="logo" href="/" aria-label="QuestPDF home">
            <img class="light-only" src="/questpdf-logo-nav-light.webp" alt="" width="792" height="128" loading="lazy">
            <img class="dark-only" src="/questpdf-logo-nav-dark.webp" alt="" width="792" height="128" loading="lazy">
          </a>

          <p class="tagline">Code-first PDF library for C#</p>

          <ul class="proof">
            <li v-for="statistic in proof" :key="statistic.label">
              <a :href="statistic.link" target="_blank">
                <Icon :icon="proofIcons[statistic.label]" />
                <strong>{{ statistic.value }}</strong>
                <span>{{ statistic.label }}</span>
              </a>
            </li>
          </ul>
        </div>

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
      </template>

      <div class="fine-print">
        <p>© {{ year }} QuestPDF by Marcin Ziabek CodeFlint</p>
        <a href="mailto:contact@questpdf.com">contact@questpdf.com</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>

footer {
  border-top: 1px solid var(--custom-page-divider, var(--vp-c-divider));
  /* opaque, so the page canvas stops at the footer's top border */
  background-color: light-dark(var(--vp-c-bg), #0D1015);
  color: var(--vp-c-text-2);
}

.content {
  margin: 0 auto;
  max-width: var(--custom-page-width);
  padding-inline: var(--custom-page-gutter);
}

/* every column is an auto track, the brand included, so the spare width is shared out equally and the space between
   two columns is the same everywhere */
.with-links {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 48px 32px;
  padding-top: 56px;
}


/* Brand: its lines sit on the rows of the link columns. The logo stands in for a title, so the tagline is on the
   first link's row and the statistics on the third and fourth. */

/* a block of its own: an inline logo would leave the line's descender space under it */
.logo {
  display: flex;
  width: fit-content;
  border-radius: 6px;
}

.logo img {
  width: auto;
  height: 32px;
}

.tagline {
  margin-top: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

/* icon, number and label on three shared columns, so both lines start each part at the same place */
.proof {
  display: grid;
  grid-template-columns: 1.25rem auto auto;
  justify-content: start;
  gap: 10px 8px;
  margin-top: 44px;
}

.proof :is(li, a) {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
}

.proof a {
  align-items: center;
  white-space: nowrap;
}

.proof .icon {
  justify-self: center;
  width: auto;
  color: var(--vp-c-brand-1);
}

.proof strong {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}


/* Link columns: on the brand's grid; the titles sit level with the logo's middle */

.link-categories {
  grid-column: 2 / -1;
  display: grid;
  grid-template-columns: subgrid;
  row-gap: 48px;
  padding-top: 6px;
}

.link-category h2 {
  margin-bottom: 20px;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: light-dark(#1B1B1F, #F5F5F7);
}

.link-category ul {
  display: grid;
  gap: 10px;
}

:is(.proof, .link-category, .fine-print) a {
  border-radius: 4px;
}

:is(.proof, .link-category, .fine-print) a:hover {
  color: var(--vp-c-text-1);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
}

a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}


/* Fine print */

.fine-print {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 32px;
  padding-block: 24px;
  font-size: 0.875rem;
  line-height: 1.25rem;
}

/* 56px under the columns, the grid's row gap included */
.with-links .fine-print {
  grid-column: 1 / -1;
  margin-top: 8px;
  border-top: 1px solid var(--vp-c-divider);
}

/* on the columns' grid while they stand side by side: the email starts where the last column starts */
@media screen and (min-width: 961px) {
  .with-links .fine-print {
    display: grid;
    grid-template-columns: subgrid;
  }

  .with-links .fine-print p {
    grid-column: 1 / -2;
  }

  .with-links .fine-print a {
    grid-column: -2 / -1;
    justify-self: start;
  }
}


/* the brand moves above the columns */
@media screen and (max-width: 1180px) {
  .with-links {
    grid-template-columns: repeat(4, auto);
  }

  .brand,
  .link-categories {
    grid-column: 1 / -1;
  }

  .link-categories {
    padding-top: 0;
  }

  .proof {
    margin-top: 16px;
  }
}

/* two columns, and the groups run down them: the short links on the left, the long licensing and legal ones on the
   right, where they have room on a phone */
@media screen and (max-width: 960px) {
  .with-links {
    grid-template-columns: auto;
  }

  .link-categories {
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(2, auto);
    grid-auto-flow: column;
    column-gap: 32px;
  }
}

@media screen and (max-width: 760px) {
  .with-links {
    padding-top: 48px;
  }
}

@media screen and (max-width: 410px) {
  .link-categories {
    grid-template-columns: auto;
    grid-auto-flow: row;
  }
}

@media (pointer: coarse) {
  .link-category h2 {
    margin-bottom: 6px;
  }

  .link-category ul {
    gap: 0;
  }

  .link-category a {
    display: block;
    padding-block: 10px;
  }

  .proof {
    row-gap: 0;
  }

  .proof a {
    padding-block: 10px;
  }

  .fine-print a {
    margin-block: -12px;
    padding-block: 12px;
  }
}

</style>

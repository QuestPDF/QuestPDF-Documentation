/* The documentation menu can list chapters of a long page as entries of their own ("/page#chapter"). This follows the
   reader down such a page and names the listed chapter they are in, the way the "On this page" outline does;
   SidebarItem.vue marks that entry as the current one. */

import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { onContentUpdated, useData, useRoute } from "vitepress";
import type { SidebarItem, ThemeConfig } from "./themeConfig";

/* the id of the chapter being read; empty above the first listed chapter and on pages without listed chapters */
export const sidebarChapter = ref("");

export function splitLink(link = "") {
  const [path, chapter = ""] = link.split("#");
  return { path, chapter };
}

function chaptersOf(items: SidebarItem[], page: string): string[] {
  return items.flatMap(item => {
    const { path, chapter } = splitLink(item.link);
    return [...(path === page && chapter ? [chapter] : []), ...chaptersOf(item.items ?? [], page)];
  });
}

/* called once, by the layout */
export function trackSidebarChapter() {
  const { theme } = useData<ThemeConfig>();
  const route = useRoute();

  const page = computed(() => `/${route.data.relativePath.replace(/\.md$/, "")}`);
  const chapters = computed(() => chaptersOf(theme.value.sidebar ?? [], page.value));

  function locate() {
    const headings = chapters.value
      .map(id => document.getElementById(id))
      .filter(heading => heading != null)
      .map(heading => ({
        id: heading.id,
        top: heading.getBoundingClientRect().top,
        margin: parseFloat(getComputedStyle(heading).scrollMarginTop) || 0
      }))
      .sort((a, b) => a.top - b.top);

    /* the same reading line as the outline: a heading counts once it reaches the place a link scrolls it to */
    const read = headings.filter(heading => heading.top <= heading.margin + 4);
    const ahead = headings.slice(read.length);

    /* where the page ends, the chapters still ahead cannot reach that line: the one the address names is the one
       being read, otherwise the last */
    const atEnd = window.scrollY > 0
      && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;

    const current = atEnd && ahead.length
      ? ahead.find(heading => `#${heading.id}` === route.hash) ?? ahead.at(-1)
      : read.at(-1);

    sidebarChapter.value = current?.id ?? "";
  }

  /* a link to a chapter near the end changes the address without moving the page */
  watch(() => route.hash, locate);

  onContentUpdated(locate);

  onMounted(() => {
    window.addEventListener("scroll", locate, { passive: true });
    locate();
  });

  onUnmounted(() => window.removeEventListener("scroll", locate));
}

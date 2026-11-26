/* The path lines of the Features overview: the area, and the features in it, that the reader has scrolled into.
   Read from the page as it scrolls; the lists on the page follow the tree item by item. A name moves into the line
   as its own row goes under it: an area when the middle of its heading reaches the middle of the line, so the line
   covers the heading and nothing else, a feature when the middle of its row passes the line's bottom edge. */

import { onBeforeUnmount, onMounted, shallowRef, watch, type Ref } from "vue";
import type { FeatureArea, FeatureNode } from "./featureTree";

const middle = (element: Element) => {
  const { top, bottom } = element.getBoundingClientRect();
  return (top + bottom) / 2;
};

export function useFeaturePath(root: Ref<HTMLElement | null>, areas: Ref<FeatureArea[]>) {
  const path = shallowRef<FeatureNode[]>([]);
  let frame = 0;

  function trace() {
    if (!root.value) return;

    const sections = [...root.value.querySelectorAll(":scope > section")];
    const lineOf = (section: Element) => section.querySelector(".path-line")!;
    const at = sections.findLastIndex(section => middle(section.querySelector(":scope > h2")!) <= middle(lineOf(section)));
    const next: FeatureNode[] = [];

    if (at >= 0) {
      const edge = lineOf(sections[at]).getBoundingClientRect().bottom;
      let items: FeatureNode[] | undefined = areas.value[at].items;
      let list = sections[at].querySelector(":scope > ul");
      next.push(areas.value[at]);

      while (list && items) {
        const index = [...list.children].findLastIndex(item => middle(item.firstElementChild!) <= edge);

        if (!items[index]?.items) break;
        next.push(items[index]);
        list = list.children[index].querySelector(":scope > ul");
        items = items[index].items;
      }
    }

    if (next.length !== path.value.length || next.some((node, index) => node !== path.value[index])) path.value = next;
  }

  function onScroll() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(trace);
  }

  onMounted(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    trace();
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    cancelAnimationFrame(frame);
  });

  /* the filter changes what stands at the line without any scrolling */
  watch(areas, trace, { flush: "post" });

  return path;
}

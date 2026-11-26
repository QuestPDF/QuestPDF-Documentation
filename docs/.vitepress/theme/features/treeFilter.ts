/* The filter of the Features overview as the page uses it: the typed query, the part of the tree it leaves, and the
   marking of its words in the names. What a word finds is decided in featureSearch.ts. */

import {
  computed, h, inject, onMounted, provide, ref, watch, type ComputedRef, type FunctionalComponent, type InjectionKey
} from "vue";
import { useRouter } from "vitepress";
import type { FeatureNode } from "./featureTree";
import { filterTree, segments, wordsOf } from "./featureSearch";

export const toHref = (link: string) => link.replace(/^([^#]+)(#.*)?$/, "$1.html$2");

export const slugOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const markingKey: InjectionKey<ComputedRef<{ words: string[][]; anywhere: boolean }>> =
    Symbol("features-overview-marking");

export function useTreeFilter<Area extends FeatureNode>(tree: Area[]) {
  const query = ref("");
  const words = computed(() => wordsOf(query.value));
  const finding = computed(() => words.value.length > 0);

  const result = computed(() => filterTree(tree, words.value));
  const visible = computed(() => result.value.visible);
  const matches = computed(() => result.value.found.length);

  provide(markingKey, computed(() => ({ words: result.value.words, anywhere: result.value.anywhere })));

  /* the query is kept in the address, so that Back from a feature's page returns to the same list */
  onMounted(() => {
    query.value = new URLSearchParams(location.search).get("q") ?? "";

    watch(query, value => {
      const url = new URL(location.href);
      if (value) url.searchParams.set("q", value);
      else url.searchParams.delete("q");
      history.replaceState(history.state, "", url);
    });
  });

  const router = useRouter();

  const firstLink = (node: FeatureNode): string | undefined =>
      node.link ?? node.items?.map(firstLink).find(Boolean);

  function openFirst() {
    const link = result.value.found.map(firstLink).find(Boolean);
    if (link) router.go(toHref(link));
  }

  return { query, finding, visible, matches, openFirst };
}

/* text with the filter's words marked; its marks carry no scope id, so FeaturesOverview.vue styles them with :deep() */
export const Marked: FunctionalComponent<{ text: string }> = ({ text }) => {
  const marking = inject(markingKey, undefined)?.value;
  if (!marking?.words.length) return text;

  return segments(text, marking.words, marking.anywhere).map(segment => segment.hit ? h("mark", segment.text) : segment.text);
};
Marked.props = ["text"];

import { ref } from "vue";

/* PROTOTYPE: a feature's icon is its permalink, in place of a "#": a click goes to the feature and also copies the
   address, ready to paste into a reply (an issue on GitHub, for example). */
export function useSectionLink() {
  const copied = ref<string>();
  let timer: ReturnType<typeof setTimeout> | undefined;

  function copyLink(id: string) {
    const address = `${location.origin}${location.pathname}#${id}`;
    navigator.clipboard?.writeText(address).catch(() => { /* not allowed: the address bar still has it */ });

    copied.value = id;
    clearTimeout(timer);
    timer = setTimeout(() => copied.value = undefined, 1600);
  }

  return { copied, copyLink };
}

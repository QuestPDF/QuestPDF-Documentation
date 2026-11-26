/* Which features the words of the filter find. A word is looked for in a feature's name, note and keywords, at the
   start of their words: "line" finds Line and LineHeight, not Underline. Every word has to be found in the feature or
   in those above it, and at least one in the feature itself: "table header" finds the header of a table, "bold" the
   font weight. A match keeps everything under it; the rest of the tree stays only as the path to a match.
   Plurals, hyphens, spaces and British spellings do not matter ("tables", "zindex", "page break", "colour").
   When nothing begins with the words, a word that begins no word of the tree is taken for a typo and replaced by the
   closest words of the tree ("tabel" finds Table); when that finds nothing either, the words are looked for anywhere
   ("mail" then finds Email). */

import type { FeatureNode } from "./featureTree";

const ignored = new Set([
  "a", "an", "the", "to", "of", "in", "on", "for", "and", "or", "with", "from", "into", "at", "by",
  "how", "is", "do", "does", "can", "i", "my", "add", "create", "make", "set", "use", "using"
]);

const fold = (text: string) => text.toLowerCase()
    .replace(/colour/g, "color").replace(/centre/g, "center").replace(/grey/g, "gray").replace(/metre/g, "meter");

const squash = (text: string) => text.replace(/[^a-z0-9]/g, "");

/* the words of a query, each in every form it is looked up by: as typed, folded, without a plural ending */
export function wordsOf(query: string): string[][] {
  const typed = query.toLowerCase().split(/\s+/).filter(word => squash(word));
  const kept = typed.filter(word => !ignored.has(word));

  return (kept.length ? kept : typed).map(word => {
    const base = fold(word);
    const forms = [word, base];

    if (base.length > 3) {
      if (base.endsWith("ies")) forms.push(base.slice(0, -3) + "y");
      else if (/(s|x|z|ch|sh)es$/.test(base)) forms.push(base.slice(0, -2));
      else if (base.endsWith("s")) forms.push(base.slice(0, -1));
    }

    return [...new Set(forms)];
  });
}

/* words run together, and where each begins: "AlignCenter" holds two */
interface Index {
  joined: string;
  starts: number[];
}

function indexOf(text: string): Index {
  const starts: number[] = [];
  let joined = "";

  for (const word of fold(text.replace(/([a-z0-9])([A-Z])/g, "$1 $2")).split(/[^a-z0-9]+/)) {
    if (!word) continue;
    starts.push(joined.length);
    joined += word;
  }

  return { joined, starts };
}

/* what a feature is found by itself, and what it lends to those under it: its name and keywords, not its note */
interface Entry {
  own: Index;
  lent: Index;
}

const entries = new WeakMap<FeatureNode, Entry>();

function entryOf(node: FeatureNode): Entry {
  let entry = entries.get(node);

  if (!entry) {
    const lent = `${node.name} ${node.keywords ?? ""}`;
    entries.set(node, entry = { own: indexOf(`${lent} ${node.note ?? ""}`), lent: indexOf(lent) });
  }

  return entry;
}

function has(index: Index, forms: string[], anywhere: boolean): boolean {
  return forms.some(form => {
    const key = squash(form);
    if (anywhere) return index.joined.includes(key);

    return index.starts.some((at, word) => {
      if (!index.joined.startsWith(key, at)) return false;

      /* a key that runs over several words has to end with one: "pdfa" is PDF/A, not "PDF and" */
      const end = at + key.length;
      return end <= (index.starts[word + 1] ?? index.joined.length)
          || end === index.joined.length || index.starts.includes(end);
    });
  });
}

function prune<Node extends FeatureNode>(
    node: Node, above: Index[], words: string[][], anywhere: boolean, found: FeatureNode[]): Node[] {
  const { own, lent } = entryOf(node);
  const holds = (index: Index, forms: string[]) => has(index, forms, anywhere);

  if (words.some(forms => holds(own, forms))
      && words.every(forms => holds(own, forms) || above.some(index => holds(index, forms)))) {
    found.push(node);
    return [node];
  }

  const below = [...above, lent];
  const items = (node.items ?? []).flatMap(item => prune(item, below, words, anywhere, found));
  return items.length ? [{ ...node, items }] : [];
}

/* Typos. A word of four letters or more may have one letter wrong, missing, extra or swapped with the next, from
   eight letters two; never the first one. Whole words of the tree are tried first; from six letters a half-typed word
   is also compared with their beginnings ("watrem" finds Watermark). Words equally close are all kept. */

const vocabularies = new WeakMap<FeatureNode[], string[]>();

function vocabularyOf(tree: FeatureNode[]): string[] {
  let vocabulary = vocabularies.get(tree);

  if (!vocabulary) {
    const words = new Set<string>();

    const add = (node: FeatureNode) => {
      const { joined, starts } = entryOf(node).own;
      starts.forEach((at, word) => words.add(joined.slice(at, starts[word + 1])));
      node.items?.forEach(add);
    };

    tree.forEach(add);
    vocabularies.set(tree, vocabulary = [...words].filter(word => word.length >= 4));
  }

  return vocabulary;
}

/* the last row holds the distance to every beginning of the word */
function distance(typed: string, word: string, toBeginning: boolean): number {
  const d = Array.from({ length: typed.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= word.length; j++) d[0][j] = j;

  for (let i = 1; i <= typed.length; i++)
    for (let j = 1; j <= word.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (typed[i - 1] === word[j - 1] ? 0 : 1));

      if (i > 1 && j > 1 && typed[i - 1] === word[j - 2] && typed[i - 2] === word[j - 1])
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }

  return toBeginning ? Math.min(...d[typed.length]) : d[typed.length][word.length];
}

function closest(typed: string, vocabulary: string[]): string[] {
  const allowed = typed.length < 4 ? 0 : typed.length < 8 ? 1 : 2;

  const pick = (toBeginning: boolean) => {
    let best = allowed;
    let picked: string[] = [];

    for (const word of vocabulary) {
      if (word[0] !== typed[0]) continue;

      const mistakes = distance(typed, word, toBeginning);
      if (mistakes > best) continue;

      if (mistakes < best) picked = [];
      best = mistakes;
      picked.push(word);
    }

    return picked;
  };

  if (!allowed) return [];

  const whole = pick(false);
  return whole.length || typed.length < 6 ? whole : pick(true);
}

function corrected(tree: FeatureNode[], words: string[][]): string[][] {
  const known = (nodes: FeatureNode[], forms: string[]): boolean =>
      nodes.some(node => has(entryOf(node).own, forms, false) || known(node.items ?? [], forms));

  return words.map(forms => {
    if (known(tree, forms)) return forms;

    const found = closest(squash(forms[forms.length - 1]), vocabularyOf(tree));
    return found.length ? found : forms;
  });
}

/* the words the tree was searched by come back with it: corrected ones are what the names are marked with */
export function filterTree<Area extends FeatureNode>(tree: Area[], words: string[][]) {
  const search = (words: string[][], anywhere: boolean) => {
    const found: FeatureNode[] = [];
    const visible = tree.flatMap(area => prune(area, [], words, anywhere, found));
    return { visible, found, words, anywhere };
  };

  if (!words.length) return { visible: tree, found: [] as FeatureNode[], words, anywhere: false };

  const atWordStarts = search(words, false);
  if (atWordStarts.found.length) return atWordStarts;

  /* typos are corrected before words are looked for anywhere, or "lable" would find "available" */
  const fixed = corrected(tree, words);
  const afterCorrection = search(fixed, false);
  return afterCorrection.found.length ? afterCorrection : search(fixed, true);
}

const startsWord = (text: string, at: number) =>
    at === 0 || !/[a-z0-9]/i.test(text[at - 1]) || (/[a-z0-9]/.test(text[at - 1]) && /[A-Z]/.test(text[at]));

/* a shown text in pieces, those the filter's words were found in marked as hits */
export function segments(text: string, words: string[][], anywhere: boolean): { text: string; hit: boolean }[] {
  const lower = text.toLowerCase();
  const hits = new Array<boolean>(text.length).fill(false);

  for (const form of words.flat())
    for (let at = lower.indexOf(form); at >= 0; at = lower.indexOf(form, at + 1))
      if (anywhere || startsWord(text, at)) hits.fill(true, at, at + form.length);

  const result: { text: string; hit: boolean }[] = [];
  let start = 0;

  for (let end = 1; end <= text.length; end++) {
    if (end < text.length && hits[end] === hits[start]) continue;
    result.push({ text: text.slice(start, end), hit: hits[start] });
    start = end;
  }

  return result;
}

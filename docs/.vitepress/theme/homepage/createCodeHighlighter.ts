import { createHighlighterCore } from 'shiki';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import {HighlighterCore} from "@shikijs/types";

let codeHighlighterInstanceCache: HighlighterCore | null = null;

export default async function createCodeHighlighter() {
  if (codeHighlighterInstanceCache == null) {
    codeHighlighterInstanceCache = await createHighlighterCore({
      themes: [
        import('shiki/themes/dark-plus.mjs'),
        import('shiki/themes/light-plus.mjs')
      ],
      langs: [
        import('shiki/langs/csharp.mjs'),
      ],
      engine: createOnigurumaEngine(import('shiki/wasm'))
    });
  }

  return codeHighlighterInstanceCache;
}
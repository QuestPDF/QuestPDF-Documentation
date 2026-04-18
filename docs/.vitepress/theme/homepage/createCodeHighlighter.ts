import { createHighlighterCore } from 'shiki';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import {HighlighterCore} from "@shikijs/types";

let codeHighlighterInstanceCache: Promise<HighlighterCore> | null = null;

export default function createCodeHighlighter() {
  if (codeHighlighterInstanceCache)
    return codeHighlighterInstanceCache;

  codeHighlighterInstanceCache = createHighlighterCore({
    themes: [
      import('shiki/themes/dark-plus.mjs'),
      import('shiki/themes/light-plus.mjs')
    ],
    langs: [
      import('shiki/langs/csharp.mjs'),
    ],
    engine: createOnigurumaEngine(import('shiki/wasm'))
  });

  return codeHighlighterInstanceCache;
}
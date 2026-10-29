/* Folds every method but the one a request works on, as an IDE does. Shared by agentSession.ts and
   sessionBuilder.ts. */

export interface FoldableLine {
  text: string;
  kind: "normal" | "removed" | "added";
}

/* the lines the window shows: a folded method is its signature line alone, marked folded */
export function foldLines<T extends FoldableLine>(lines: T[], unfold: string | undefined) {
  const shown: { line: T; folded: boolean }[] = [];
  let folding = false;

  for (const line of lines) {
    if (folding) {
      folding = line.text !== "}";
      continue;
    }

    folding = !!unfold && line.kind === "normal" && line.text.startsWith("void ") && line.text !== unfold;
    shown.push({ line, folded: folding });
  }

  return shown;
}

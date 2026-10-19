/* The window shows the method a request works on and folds every other one to its signature, as an IDE does.
   Shared by the session (agentSession.ts), which folds the code it shows, and the session builder
   (sessionBuilder.ts), which counts the lines the window has to keep room for. */

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

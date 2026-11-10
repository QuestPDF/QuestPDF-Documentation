/* Shared by the homepage's animated visuals. A pass is a sequence of Web Animations on the document timeline, waits
   included, so it advances only while the page renders: nothing runs ahead in a hidden tab, and one clock drives it all. */

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* how much of a visual has to be on screen before it plays */
export const onScreenShare = 0.6;

/* reports whether at least `share` of the element is on screen; isIntersecting alone is true for a single pixel */
export function observeOnScreen(element: Element, callback: (onScreen: boolean) => void, share = onScreenShare) {
  const observer = new IntersectionObserver(entries => {
    const entry = entries[entries.length - 1];
    callback(entry.isIntersecting && entry.intersectionRatio >= share);
  }, { threshold: [0, share] });

  observer.observe(element);
  return observer;
}

/* one move in a pass of `total` ms: holds `from` until `start`, eases to `to` by `end`, then holds `to` */
export function move(from: Keyframe, to: Keyframe, start: number, end: number, total: number, easing: string): Keyframe[] {
  return [
    { ...from, offset: 0 },
    { ...from, offset: start / total, easing },
    { ...to, offset: end / total },
    { ...to, offset: 1 }
  ];
}

export class Timeline {
  private readonly running = new Set<Animation>();

  animate(target: Element, keyframes: Keyframe[] | null, options: KeyframeAnimationOptions): Animation {
    const animation = target.animate(keyframes, options);
    this.running.add(animation);
    animation.finished.then(() => this.running.delete(animation), () => this.running.delete(animation));
    return animation;
  }

  /* an empty animation: finishes `ms` of timeline time later */
  wait(target: Element, ms: number): Animation {
    return this.animate(target, null, { duration: ms });
  }

  /* true once every animation has finished, false if any was cancelled */
  static settled(animations: Animation[]): Promise<boolean> {
    return Promise.all(animations.map(animation => animation.finished)).then(() => true, () => false);
  }

  /* for unmount */
  cancel() {
    for (const animation of this.running)
      animation.cancel();

    this.running.clear();
  }
}

export type FadePart = { selector: string; at: number; from: string };

/* the Quick start figures' build: each part fades in over `stage` ms from `at` while drifting from `from` into place.
   Opacity eases in and out so nothing pops; the drift is a long ease-out that settles under the fade. */
export function fadeInParts(timeline: Timeline, figure: Element, parts: FadePart[], stage = 600, total = 1000): Animation[] {
  const options = { duration: total, fill: "both" as const };
  const rest = "translate(0px, 0px)";

  return parts.flatMap(({ selector, at, from }) => {
    const element = figure.querySelector(selector);
    if (!element)
      return [];

    return [
      timeline.animate(element, move({ opacity: 0 }, { opacity: 1 }, at, at + stage, total, "cubic-bezier(0.37, 0, 0.63, 1)"), options),
      timeline.animate(element, move({ transform: from }, { transform: rest }, at, at + stage, total, "cubic-bezier(0.22, 1, 0.36, 1)"), options)
    ];
  });
}

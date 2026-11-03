/* Shared by the CTA visuals. A pass is a sequence of Web Animations on the document timeline, waits included, so it
   advances only while the page renders: nothing runs ahead in a hidden tab, and one clock drives it all. */

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

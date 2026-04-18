type PlausibleFn = (event: string, options?: { callback?: () => void }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn & { q?: unknown[] };
  }
}

export function trackPlausibleEvent(name: string): void {
  if (typeof window === 'undefined')
    return;

  window.plausible?.(name);
}
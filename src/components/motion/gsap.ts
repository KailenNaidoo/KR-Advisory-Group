/**
 * Lazy GSAP loader.
 *
 * Dynamically imports `gsap` and the `ScrollTrigger` plugin off the critical
 * path (its own async Vite chunk), registers ScrollTrigger exactly once, and
 * returns a cached promise so concurrent hero mounts share a single import.
 *
 * On import failure (or if the expected exports are missing) it resolves to a
 * `null` sentinel so callers fall back to the already-visible DOM rather than
 * throwing — motion is strictly a progressive enhancement.
 */
import type { gsap as GsapType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

export interface GsapBundle {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
}

let registered = false;
let warned = false;
let cached: Promise<GsapBundle | null> | null = null;

function warnOnce(message: string, error: unknown): void {
  if (import.meta.env.DEV && !warned) {
    warned = true;
    // eslint-disable-next-line no-console
    console.warn(`[motion] ${message}`, error);
  }
}

/**
 * Resolve the GSAP bundle, or `null` if GSAP could not be loaded. The result is
 * cached after the first call.
 */
export function loadGsap(): Promise<GsapBundle | null> {
  if (cached) return cached;

  cached = (async () => {
    try {
      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      const gsap = gsapModule.gsap ?? gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger ?? scrollTriggerModule.default;

      if (!gsap || !ScrollTrigger) {
        warnOnce('GSAP loaded but expected exports are missing; falling back to visible DOM.', {
          gsap,
          ScrollTrigger,
        });
        return null;
      }

      if (!registered) {
        gsap.registerPlugin(ScrollTrigger);
        registered = true;
      }

      return { gsap, ScrollTrigger } as GsapBundle;
    } catch (error) {
      warnOnce('GSAP import failed; falling back to visible DOM.', error);
      return null;
    }
  })();

  return cached;
}

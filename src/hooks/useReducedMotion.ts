import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * SSR-safe `prefers-reduced-motion` hook.
 *
 * Returns `true` (reduced -> motion OFF, content fully visible) on the server
 * and on the first client render, then updates after mount from
 * `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and stays in
 * sync via the media query's `change` event.
 *
 * Defaulting to `true`-until-mounted guarantees the no-flash invariant: the
 * first paint never opts into motion. This value is used ONLY to toggle
 * render-time motion wrappers/attributes — it must NEVER gate the rendering of
 * real content, so the until-mounted default can never hide anything.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mql = window.matchMedia(QUERY);
    setReduced(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

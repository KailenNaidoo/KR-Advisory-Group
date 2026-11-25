/**
 * Shared IntersectionObserver for `[data-reveal]` scroll reveals.
 *
 * One observer handles every `[data-reveal]` node within a root. The hidden
 * pre-reveal state is pure CSS gated on `.motion-ready` (added by the caller);
 * this module only toggles `.is-revealed` and manages `will-change`.
 *
 * No-flash / performance model (motion-design.md §3.1):
 *  - Above-the-fold nodes (already in the viewport at setup) are revealed on
 *    the first requestAnimationFrame and are NOT observed.
 *  - Every other node is observed; on first intersection it is promoted
 *    (`will-change`), revealed one frame later, demoted on `transitionend`,
 *    then unobserved.
 *
 * `setupReveal` returns a teardown function so the caller can re-run it per
 * route (pathname) and disconnect cleanly.
 */

const OBSERVER_INIT: IntersectionObserverInit = {
  threshold: 0,
  rootMargin: '0px 0px -12% 0px',
};

/** Promote -> reveal (next frame) -> demote (on transition end). */
function revealElement(el: HTMLElement): void {
  el.style.willChange = 'opacity, transform';
  requestAnimationFrame(() => el.classList.add('is-revealed'));
  el.addEventListener(
    'transitionend',
    () => {
      el.style.willChange = 'auto';
    },
    { once: true },
  );
}

/**
 * Set up reveals for all `[data-reveal]` nodes under `root` (defaults to the
 * document). Returns a teardown function. If IntersectionObserver is
 * unavailable the function is a no-op and content stays visible.
 */
export function setupReveal(root: ParentNode = document): () => void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return () => {};
  }

  const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (nodes.length === 0) {
    return () => {};
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      revealElement(el);
      observer.unobserve(el);
    }
  }, OBSERVER_INIT);

  const aboveFold: HTMLElement[] = [];
  for (const el of nodes) {
    if (el.classList.contains('is-revealed')) continue;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      aboveFold.push(el);
    } else {
      observer.observe(el);
    }
  }

  if (aboveFold.length > 0) {
    requestAnimationFrame(() => {
      for (const el of aboveFold) {
        el.classList.add('is-revealed');
      }
    });
  }

  return () => observer.disconnect();
}

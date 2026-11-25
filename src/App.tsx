import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { setupReveal } from '@/hooks/useReveal';

/**
 * Review-only flag. Set via VITE_REVIEW_BUILD=true in the GitHub Pages build
 * (see .github/workflows/deploy-pages.yml). When true, every page gets a
 * robots `noindex, nofollow` directive and a visible "preview" banner so this
 * client-review copy is never indexed and is clearly distinguished from the
 * production site. Unset in production builds, so production SEO is untouched.
 */
const IS_REVIEW_BUILD = import.meta.env.VITE_REVIEW_BUILD === 'true';

/**
 * Layout shell shared by every route: semantic header / main / footer with an
 * <Outlet/> for the active page. A skip link lands keyboard users on <main>.
 *
 * The header is position:fixed (so it can be transparent over the home hero and
 * transition to glass on scroll). Home's hero is full-bleed and sits under the
 * header by design; every other route needs top padding equal to the header
 * height (h-16 = 4rem) so its first section isn't hidden behind the fixed bar.
 *
 * Motion bootstrap (motion-design.md §3.1 / §3.1a / §6): a passive, mount-only
 * effect that owns the `[data-reveal]` IO reveal path. It computes the single
 * `motionAllowed` decision via a DIRECT `matchMedia` read (+ IO feature-detect)
 * and, only when allowed, adds `.motion-ready` to <html> and runs the shared
 * reveal observer, re-run per `pathname` so each page's `[data-reveal]` nodes
 * are picked up and the previous observer is disconnected. A SINGLE
 * `prefers-reduced-motion` `change` listener (per DECISION 1) drops motion live
 * on change->reduce and does nothing retroactively on change->no-preference.
 * App never adds `.hero-motion-ready` — that class is owned by HeroReveal's own
 * layout-effect pass.
 */
export function App() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // IO reveal bootstrap — re-run per route so new pages' [data-reveal] nodes
  // are observed and the prior observer is disconnected on route change.
  useEffect(() => {
    const motionAllowed =
      typeof window !== 'undefined' &&
      'IntersectionObserver' in window &&
      typeof window.matchMedia === 'function' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!motionAllowed) return;

    const root = document.documentElement;
    root.classList.add('motion-ready');
    const teardownReveal = setupReveal(document);

    return () => {
      teardownReveal();
    };
  }, [pathname]);

  // Single prefers-reduced-motion 'change' listener (DECISION 1): a live switch
  // to reduce drops motion immediately (remove .motion-ready from <html> and
  // signal hero roots to drop .hero-motion-ready); switching to no-preference
  // does NOTHING retroactively (never hides already-visible content).
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return; // change->no-preference: do nothing retroactively
      // Drop the IO reveal gate.
      document.documentElement.classList.remove('motion-ready');
      // Drop the hero gate and clear any in-flight GSAP inline styles so the
      // hero reverts to its authored, fully-visible state (never stays hidden).
      document.querySelectorAll('.hero-motion-ready').forEach((root) => {
        root.classList.remove('hero-motion-ready');
        root
          .querySelectorAll<HTMLElement>('.hero-line-inner, .hero-reveal')
          .forEach((el) => {
            el.style.opacity = '';
            el.style.transform = '';
            el.style.filter = '';
            el.style.visibility = '';
            el.style.willChange = '';
          });
      });
    };

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      {IS_REVIEW_BUILD && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </Head>
      )}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>
      {IS_REVIEW_BUILD && (
        <p
          role="note"
          className="bg-ink px-4 py-1.5 text-center font-mono text-[11px] uppercase tracking-wide text-background"
        >
          Preview — client review copy, not the live site. Content and referral
          terms subject to final approval.
        </p>
      )}
      <Header />
      <main id="main" className={isHome ? undefined : 'pt-16'}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;

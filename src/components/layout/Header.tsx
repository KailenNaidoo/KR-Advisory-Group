import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { business, navLinks } from '@/content/business';
import { Container } from '@/components/primitives/Container';
import { MobileNav } from '@/components/layout/MobileNav';
import { cn } from '@/lib/cn';
import { asset } from '@/lib/asset';

/**
 * Luxury corporate sticky header.
 *
 * Problem solved: the home page opens with a full-bleed DARK hero. A light,
 * translucent header with dark links was nearly invisible over it. This header
 * is both scroll-aware and route-aware so navigation stays highly legible and
 * premium at every scroll position (reference: McKinsey / Deloitte / EY / BCG).
 *
 * States:
 *  - "overHero" (home page, before ~50px scroll): transparent background,
 *    WHITE logo wordmark + WHITE links, gold CTA. The dark hero behind it
 *    supplies the contrast.
 *  - "solid" (any page once scrolled > ~50px, and interior pages immediately,
 *    since they have no dark hero to be transparent over): glassmorphism navy
 *    bar — rgba(10,20,40,0.85) + backdrop-blur(12px) + subtle white border +
 *    soft shadow, WHITE links, gold hover/active.
 *
 * All transitions animate background-color, backdrop-filter, box-shadow and
 * color over 250ms. In both states link text is white-on-dark (either the dark
 * hero photo or the navy glass bar), which is high-contrast / WCAG AA.
 */
export function Header() {
  const { pathname } = useLocation();
  const hasDarkHero = pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll(); // set correct state on mount / route change
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Transparent only on the home hero before scrolling; otherwise navy glass.
  const overHero = hasDarkHero && !scrolled;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-[250ms] ease-out',
        overHero ? 'header-transparent' : 'header-glass',
      )}
    >
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label={`${business.name} — home`}
        >
          <img
            src={asset('/kr-logo.png')}
            alt=""
            width={36}
            height={36}
            className={cn(
              'h-9 w-auto transition-[filter] duration-[250ms]',
              // The mark is a navy monogram; on the transparent dark-hero state
              // lift it to near-white so it reads on the photo. On the glass bar
              // it sits on navy, so keep it bright too.
              'brightness-0 invert',
            )}
          />
          <span className="font-display text-lg text-white transition-colors duration-[250ms]">
            {business.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium text-white/90 transition-colors duration-200 hover:text-brass',
                  isActive && 'text-brass',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={business.whatsapp.consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero-primary inline-flex items-center justify-center gap-2 rounded px-5 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Book a Consultation
          </a>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}

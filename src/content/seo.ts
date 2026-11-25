import type { RouteMeta } from '../lib/seo';

/**
 * Per-route SEO meta — pure data, no React imports, so both the app
 * (src/routes.tsx) and the Node sitemap generator can consume it safely.
 * Titles/descriptions are verbatim from CONTENT_INVENTORY.md per page.
 */
export const meta: Record<string, RouteMeta> = {
  '/': {
    path: '/',
    title: 'KR Advisory Group | Financial Clarity. Stronger Controls.',
    description:
      'KR Advisory Group delivers accounting, tax, internal audit, audit-readiness and business advisory solutions for growing businesses and public institutions.',
  },
  '/services': {
    path: '/services',
    title: 'Services | KR Advisory Group',
    description:
      'Practical, CA(SA)-led solutions across the full finance function — accounting, tax, internal audit, audit readiness, business advisory, funding support and public sector advisory.',
  },
  '/about': {
    path: '/about',
    title: 'About Us | CA(SA)-Led Practice | KR Advisory Group',
    description:
      'Meet KR Advisory Group — a CA(SA)-led accounting and advisory practice serving growing businesses and public institutions across South Africa.',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact Us | Book a Consultation | KR Advisory Group',
    description:
      'Contact KR Advisory Group in Midrand, Johannesburg to discuss accounting, tax, internal audit, audit readiness and business advisory. Call or WhatsApp 073 499 7148.',
  },
  '/referral': {
    path: '/referral',
    title: 'Referral Programme | Refer a Business | KR Advisory Group',
    description:
      'Refer a business to KR Advisory Group and help growing organisations access CA(SA)-led accounting, tax, internal audit, audit-readiness and advisory support.',
  },
};

/** The ordered list of static route paths (used by the sitemap generator). */
export const routePaths: string[] = Object.keys(meta);

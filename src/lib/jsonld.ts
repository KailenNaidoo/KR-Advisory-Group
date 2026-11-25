/**
 * JSON-LD structured-data builders. All values are drawn from verified
 * business facts (src/content/business.ts) and the seven verified services
 * (src/content/services.ts). Founders carry name + jobTitle ONLY — no bios
 * are fabricated (No Assumptions Policy).
 */
import { SITE_URL } from '../content/business';
import { business, leadership, socials } from '../content/business';
import { services } from '../content/services';
import { canonical } from './seo';

type Json = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;

/** The postal address, split from the verified single-line address. */
const postalAddress: Json = {
  '@type': 'PostalAddress',
  streetAddress: '64 Eagle Street, Kikuyu Estate',
  addressLocality: 'Waterfall, Midrand',
  addressRegion: 'Johannesburg',
  addressCountry: 'ZA',
};

/** Organization — the canonical entity, referenced by @id elsewhere. */
export function organization(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: business.name,
    url: SITE_URL,
    logo: `${SITE_URL}/kr-logo.png`,
    telephone: business.whatsapp.e164,
    email: business.emails.general,
    address: postalAddress,
    sameAs: socials.map((s) => s.url),
  };
}

/** LocalBusiness — the physical practice, with verified address + phone. */
export function localBusiness(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: business.name,
    url: SITE_URL,
    image: `${SITE_URL}/hero.jpg`,
    logo: `${SITE_URL}/kr-logo.png`,
    telephone: business.whatsapp.e164,
    email: business.emails.general,
    address: postalAddress,
    sameAs: socials.map((s) => s.url),
  };
}

/** Person per verified founder — name + jobTitle ONLY (no bio). */
export function founders(): Json[] {
  return leadership.map((person) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.title,
    worksFor: { '@id': ORG_ID },
  }));
}

/** Service per each of the seven verified services. */
export function serviceList(): Json[] {
  return services.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.promise,
    url: `${SITE_URL}/services#${service.id}`,
    provider: { '@id': ORG_ID },
  }));
}

/**
 * ContactPoint + PostalAddress for the Contact page. Built from verified
 * facts only: the split postal address above, the verified WhatsApp number
 * (business.whatsapp.e164) and the primary enquiry email. No hours or map
 * data is included (both are [NOT VERIFIED]).
 */
export function contactPoint(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: business.name,
    url: SITE_URL,
    address: postalAddress,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: business.whatsapp.e164,
      email: business.emails.ralephenya,
      areaServed: 'ZA',
      availableLanguage: 'en',
    },
  };
}

/**
 * FAQPage built from the one verified Contact Q&A. Only the single confirmed
 * question/answer is emitted — no extra questions are fabricated.
 */
export function faqPage(items: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList for an interior page. Always starts at Home, then the page.
 * `name` is the page's breadcrumb label, `path` its route path.
 */
export function breadcrumbs(name: string, path: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: canonical('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name,
        item: canonical(path),
      },
    ],
  };
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Head } from '@/components/seo/Head';
import { JsonLd } from '@/components/seo/JsonLd';
import { serviceList, breadcrumbs } from '@/lib/jsonld';
import { Container } from '@/components/primitives/Container';
import { ServiceSection } from '@/components/cards/ServiceSection';
import { HeroReveal } from '@/components/motion/HeroReveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { services } from '@/content/services';
import { business } from '@/content/business';
import { home } from '@/content/pages';
import { scrollToHash } from '@/lib/scroll';
import { meta } from '@/routes';

export function Services() {
  const { hash } = useLocation();

  // Single-hash deep-link support (/services#accounting), replacing the
  // production double-hash defect. Respects prefers-reduced-motion.
  useEffect(() => {
    if (hash) scrollToHash(hash);
  }, [hash]);

  return (
    <>
      <Head {...meta['/services']} />
      <JsonLd data={[...serviceList(), breadcrumbs('Services', '/services')]} />

      {/* Dark-navy page hero — architectural depth via the shared hero
          utilities, mirroring the home Hero but shorter. */}
      <HeroReveal
        as="section"
        aria-labelledby="services-hero-title"
        className="hero-surface relative overflow-hidden"
      >
        <img
          src={home.heroImage.src}
          alt=""
          aria-hidden="true"
          data-hero-parallax
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
          decoding="async"
        />
        <div className="hero-overlay absolute inset-0" aria-hidden="true" />
        <div className="hero-grid absolute inset-0" aria-hidden="true" />

        <Container className="relative z-10 py-24 sm:py-28">
          <div className="max-w-3xl">
            <p className="hero-reveal font-mono text-xs uppercase tracking-[0.3em] text-brass">
              {business.positioning}
            </p>
            <div className="hero-reveal hero-rule mt-6 h-px w-28" aria-hidden="true" />
            <h1
              id="services-hero-title"
              className="mt-7 font-display font-light leading-[1.02] tracking-[-0.02em] text-[clamp(2.4rem,6vw,4.25rem)]"
              style={{ color: 'oklch(98% 0.01 88)' }}
            >
              <SplitLines mode="single">Our Services</SplitLines>
            </h1>
            <p
              className="hero-reveal mt-7 max-w-2xl text-lg leading-relaxed"
              style={{ color: 'oklch(88% 0.012 258)' }}
            >
              {meta['/services'].description}
            </p>
          </div>
        </Container>
      </HeroReveal>

      {/* Service bands — alternating premium surfaces, last band deep navy. */}
      {services.map((service, i) => (
        <ServiceSection
          key={service.id}
          service={service}
          tone={
            i === services.length - 1 ? 'dark' : i % 2 === 0 ? 'ivory' : 'stone'
          }
        />
      ))}
    </>
  );
}

export default Services;

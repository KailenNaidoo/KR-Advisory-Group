import { Container } from '@/components/primitives/Container';
import { Button } from '@/components/primitives/Button';
import { HeroReveal } from '@/components/motion/HeroReveal';
import { SplitLines } from '@/components/motion/SplitLines';
import { asset } from '@/lib/asset';

interface PageHeroProps {
  /** Mono uppercase positioning line above the title. */
  eyebrow: string;
  /** Serif H1 text. */
  title: string;
  /** Light supporting paragraph beneath the title. */
  supporting: string;
  /** Full-bleed background image. Decorative — rendered aria-hidden. */
  image: { src: string; alt: string };
  /** Optional brass primary call-to-action. */
  cta?: { label: string; href: string };
}

/**
 * Dark-navy interior page hero. Reproduces the approved inline hero markup in
 * src/pages/Services.tsx (hero-surface + full-bleed image + .hero-overlay +
 * .hero-grid + Container with gold eyebrow, brass rule, serif H1 and light
 * supporting copy) as an additive, reusable component for About/Contact/
 * Referral. The protected Services page keeps its own inline markup.
 *
 * The H1 carries a deterministic id and the <section> is aria-labelledby that
 * id, so each page that uses this exposes exactly one labelled H1.
 */
export function PageHero({ eyebrow, title, supporting, image, cta }: PageHeroProps) {
  const titleId = 'page-hero-title';

  return (
    <HeroReveal
      as="section"
      aria-labelledby={titleId}
      className="hero-surface relative overflow-hidden"
    >
      <img
        src={asset(image.src)}
        alt={image.alt}
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
            {eyebrow}
          </p>
          <div className="hero-reveal hero-rule mt-6 h-px w-28" aria-hidden="true" />
          <h1
            id={titleId}
            className="mt-7 font-display font-light leading-[1.02] tracking-[-0.02em] text-[clamp(2.4rem,6vw,4.25rem)]"
            style={{ color: 'oklch(98% 0.01 88)' }}
          >
            <SplitLines mode="single">{title}</SplitLines>
          </h1>
          <p
            className="hero-reveal mt-7 max-w-2xl text-lg leading-relaxed"
            style={{ color: 'oklch(88% 0.012 258)' }}
          >
            {supporting}
          </p>
          {cta ? (
            <div className="hero-reveal mt-9">
              <Button as="a" href={cta.href} variant="primary">
                {cta.label}
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </HeroReveal>
  );
}

export default PageHero;

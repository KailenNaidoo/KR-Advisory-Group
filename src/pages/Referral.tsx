import { Head } from '@/components/seo/Head';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbs } from '@/lib/jsonld';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Button } from '@/components/primitives/Button';
import { PageHero } from '@/components/layout/PageHero';
import { CtaBand } from '@/components/layout/CtaBand';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerReveal } from '@/components/motion/StaggerReveal';
import { FiCheck } from 'react-icons/fi';
import { referral, home } from '@/content/pages';
import { meta } from '@/routes';

export function Referral() {
  return (
    <>
      <Head {...meta['/referral']} />
      <JsonLd data={breadcrumbs('Referral Programme', '/referral')} />

      {/* (A) Interior hero — the single H1 for this page, with primary CTA. */}
      <PageHero
        eyebrow={referral.headingSub}
        title={referral.heading}
        supporting={referral.intro}
        image={home.heroImage}
        cta={{ label: referral.cta.buttonLabel, href: '/contact' }}
      />

      {/* (B) Programme Overview — verified intro copy. */}
      <Section className="bg-surface-ivory" aria-labelledby="referral-overview-title">
        <Container className="max-w-3xl">
          <Reveal>
            <h2
              id="referral-overview-title"
              className="font-display text-3xl text-ink sm:text-4xl"
            >
              Programme Overview
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {referral.intro}
            </p>
            <p className="mt-6 text-base text-muted-foreground">
              Know a business that needs{' '}
            <a className="text-ink underline hover:text-brass-deep" href="/services#internal-audit">
              internal audit
            </a>{' '}
            or{' '}
            <a className="text-ink underline hover:text-brass-deep" href="/services#audit-readiness">
              audit-readiness
            </a>{' '}
            support? Refer them and we will take it from there.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/*
        (C) How Referrals Work — the specific steps are [NOT VERIFIED] and are
        OMITTED here rather than fabricated.
        (D) Reward Structure — OMITTED from the public page. Reward amounts,
        eligibility and terms are [NOT VERIFIED]; the gap is documented in
        CONTENT_GAP_ANALYSIS.md. The [CLIENT TO SUPPLY] placeholder must NOT
        render as customer-facing copy, so no reward section appears below.
      */}

      {/* (C2) Who / What can be referred — RESTORED verbatim from the original
          live site. Two balanced columns on desktop (a subtle left divider on
          the second column), stacking on mobile. Each list reuses the existing
          flex-row list idiom with a gold Feather check marker. */}
      <Section aria-labelledby="referral-who-title referral-what-title">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Reveal>
                <h2
                  id="referral-who-title"
                  className="font-display text-2xl text-ink sm:text-3xl"
                >
                  {referral.whoCanRefer.heading}
                </h2>
                <p className="mt-4 text-muted-foreground">{referral.whoCanRefer.supporting}</p>
              </Reveal>
              <StaggerReveal as="ul" className="mt-6 flex flex-col gap-3">
                {referral.whoCanRefer.items.map((item) => (
                  <li key={item} className="card-lift group flex gap-3 text-foreground">
                    <FiCheck aria-hidden="true" className="mt-1 shrink-0 text-brass-deep" />
                    <span>{item}</span>
                  </li>
                ))}
              </StaggerReveal>
            </div>
            <div className="md:border-l md:border-border md:pl-16">
              <Reveal>
                <h2
                  id="referral-what-title"
                  className="font-display text-2xl text-ink sm:text-3xl"
                >
                  {referral.whatYouCanRefer.heading}
                </h2>
                <p className="mt-4 text-muted-foreground">{referral.whatYouCanRefer.supporting}</p>
              </Reveal>
              <StaggerReveal as="ul" className="mt-6 flex flex-col gap-3">
                {referral.whatYouCanRefer.items.map((item) => (
                  <li key={item} className="card-lift group flex gap-3 text-foreground">
                    <FiCheck aria-hidden="true" className="mt-1 shrink-0 text-brass-deep" />
                    <span>{item}</span>
                  </li>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* (C3) Referral Programme Terms — RESTORED verbatim from the original
          live site. Numbered 01–05 rows with subtle top dividers, a gold
          uppercase eyebrow and clean typography. No reward amounts anywhere;
          flagged in CONTENT_GAP_ANALYSIS.md for final legal/client approval. */}
      <Section className="bg-surface-ivory" aria-labelledby="referral-terms-title">
        <Container className="max-w-3xl">
          <Reveal className="reveal-terms">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-brass-deep">
              Programme
            </p>
            <h2
              id="referral-terms-title"
              className="mt-4 font-display text-3xl text-ink sm:text-4xl"
            >
              {referral.programmeTerms.heading}
            </h2>
          </Reveal>
          {/* CRITICAL: Programme Terms rows (01–05). Short, no-blur reveal with
              a small per-row delay (0.06s) capped so the last of five rows is
              fully visible well under ~1s; rows already in view at load reveal
              on the first frame (useReveal above-the-fold path). The terms are
              fully visible in SSG HTML, with JS off, and under reduced motion —
              never gated, JS-withheld, long-delayed, or behind interaction. The
              terms text is unchanged. */}
          <StaggerReveal as="ul" className="mt-8" step={0.06}>
            {referral.programmeTerms.terms.map((term) => (
              <li
                key={term.number}
                className="reveal-terms flex gap-5 border-t border-border py-5"
              >
                <span className="font-mono text-sm text-brass-deep" aria-hidden="true">
                  {term.number}
                </span>
                <span className="text-muted-foreground">{term.body}</span>
              </li>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* (E) Referral submission CTA — verified referral.cta block. */}
      <Section aria-labelledby="referral-cta-title">
        <Container>
          <Reveal className="flex flex-col gap-6 rounded-lg border border-border bg-surface-stone p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="sm:max-w-xl">
              <h2 id="referral-cta-title" className="font-display text-2xl text-ink">
                {referral.cta.heading}
              </h2>
              <p className="mt-3 text-muted-foreground">{referral.cta.body}</p>
            </div>
            <Button as="a" href="/contact" variant="primary">
              {referral.cta.buttonLabel}
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* (F) Final CTA band. */}
      <CtaBand
        id="referral-band-title"
        heading="Know a business that could benefit from better financial guidance?"
        button={{ label: 'Refer a Business', href: '/contact' }}
      />
    </>
  );
}

export default Referral;

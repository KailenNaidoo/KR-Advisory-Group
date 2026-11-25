import { Head } from '@/components/seo/Head';
import { JsonLd } from '@/components/seo/JsonLd';
import { founders, breadcrumbs } from '@/lib/jsonld';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Card } from '@/components/primitives/Card';
import { AudienceCard } from '@/components/cards/AudienceCard';
import { PageHero } from '@/components/layout/PageHero';
import { CtaBand } from '@/components/layout/CtaBand';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerReveal } from '@/components/motion/StaggerReveal';
import { STAGGER } from '@/animations/motionTokens';
import { about, home } from '@/content/pages';
import { audiences } from '@/content/services';
import { leadership } from '@/content/business';
import { meta } from '@/routes';

/** Initials for the typographic monogram treatment (no portraits). */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('');
}

export function About() {
  return (
    <>
      <Head {...meta['/about']} />
      <JsonLd data={[...founders(), breadcrumbs('About', '/about')]} />

      {/* (A) Interior hero — the single H1 for this page. */}
      <PageHero
        eyebrow={about.headingSub}
        title={about.heading}
        supporting={about.intro}
        image={home.heroImage}
      />

      {/* (B) Who We Are — editorial two-column on desktop, stacked on mobile. */}
      <Section className="bg-surface-ivory" aria-labelledby="about-who-we-are-title">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <Reveal>
              <h2
                id="about-who-we-are-title"
                className="font-display text-3xl text-ink sm:text-4xl"
              >
                Who We Are
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-lg leading-relaxed text-muted-foreground">{about.body}</p>
              <p className="mt-6 font-display text-2xl leading-snug text-ink">
                {about.belief}
              </p>
              <p className="mt-6 text-base text-muted-foreground">
                From{' '}
                <a className="text-ink underline hover:text-brass-deep" href="/services#accounting">
                  accounting
                </a>{' '}
                to{' '}
                <a className="text-ink underline hover:text-brass-deep" href="/services#audit-readiness">
                  audit readiness
                </a>
                , explore the full range of our{' '}
                <a className="text-ink underline hover:text-brass-deep" href="/services">
                  services
                </a>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* (C) Our Leadership — verified names/credentials/titles with the
          founder biographies and expertise labels RESTORED verbatim from the
          original live site. A brass monogram is retained instead of a
          portrait: the founder headshot is not present in the project and is
          never fabricated (flagged in CONTENT_GAP_ANALYSIS.md). Cards grow
          naturally to fit the full bio — no fixed height, no truncation. */}
      <Section aria-labelledby="about-leadership-title">
        <Container>
          <Reveal as="h2" id="about-leadership-title" className="font-display text-3xl text-ink sm:text-4xl">
            Our Leadership
          </Reveal>
          <StaggerReveal className="mt-10 grid gap-6 md:grid-cols-2" step={STAGGER.cards}>
            {leadership.map((person) => (
              <div key={person.name}>
                <Card as="article" className="card-lift group flex h-full gap-5">
                  <span
                  aria-hidden="true"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brass bg-surface-ivory font-display text-lg text-brass-deep"
                >
                  {initials(person.name)}
                </span>
                <div>
                  <h3 className="text-xl text-ink">
                    {person.name}, {person.credential}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wide text-brass-deep">
                    {person.title}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {person.bio}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {person.expertise.map((label) => (
                      <li
                        key={label}
                        className="rounded border border-brass/40 bg-surface-ivory px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-brass-deep"
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
                </Card>
              </div>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* (D) How We Work — the three business principles RESTORED verbatim from
          the original live site, rendered as a 3-up numbered-card grid that
          reuses the Home "What we do" card language (numeric gold eyebrow,
          display title, muted body). Stacks on mobile. */}
      <Section className="bg-surface-stone" aria-labelledby="about-how-title">
        <Container>
          <Reveal as="h2" id="about-how-title" className="font-display text-3xl text-ink sm:text-4xl">
            {about.howWeWork.heading}
          </Reveal>
          <StaggerReveal className="mt-10 grid gap-6 md:grid-cols-3" step={STAGGER.cards}>
            {about.principles.map((principle) => (
              <div key={principle.number}>
                <Card as="article" className="card-lift group h-full">
                  <span className="font-mono text-sm text-brass-deep" aria-hidden="true">
                    {principle.number}
                  </span>
                  <h3 className="mt-2 font-display text-xl text-ink">{principle.title}</h3>
                  <p className="mt-2 text-muted-foreground">{principle.body}</p>
                </Card>
              </div>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* (E) Who We Help — same three audience cards / 3-up grid as Home. */}
      <Section aria-labelledby="about-who-title">
        <Container>
          <Reveal as="h2" id="about-who-title" className="font-display text-3xl text-ink sm:text-4xl">
            {about.whoWeHelp.heading}
          </Reveal>
          <StaggerReveal className="mt-8 grid gap-6 md:grid-cols-3" step={STAGGER.cards}>
            {audiences.map((audience) => (
              <div key={audience.title}>
                <AudienceCard title={audience.title} body={audience.body} />
              </div>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* (F) Closing CTA band. */}
      <CtaBand
        id="about-cta-title"
        heading="Let's strengthen your business together."
        button={{ label: 'Book a Consultation', href: '/contact' }}
      />
    </>
  );
}

export default About;

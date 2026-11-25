import { Link } from 'react-router-dom';
import { Head } from '@/components/seo/Head';
import { JsonLd } from '@/components/seo/JsonLd';
import { organization, localBusiness } from '@/lib/jsonld';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Button } from '@/components/primitives/Button';
import { Card } from '@/components/primitives/Card';
import { AudienceCard } from '@/components/cards/AudienceCard';
import { WhatsAppCTA } from '@/components/layout/WhatsAppCTA';
import { Hero } from '@/components/layout/Hero';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerReveal } from '@/components/motion/StaggerReveal';
import { STAGGER } from '@/animations/motionTokens';
import { services, audiences } from '@/content/services';
import { home } from '@/content/pages';
import { meta } from '@/routes';

/** The six services surfaced on the home page, resolved from services.ts. */
const homeServices = home.serviceListIds
  .map((id) => services.find((s) => s.id === id))
  .filter((s): s is (typeof services)[number] => Boolean(s));

export function Home() {
  return (
    <>
      <Head {...meta['/']} />
      <JsonLd data={[organization(), localBusiness()]} />

      {/* Hero — immersive full-viewport treatment (see components/layout/Hero.tsx). */}
      <Hero />

      {/* Service list (6 shown on home) */}
      <Section className="bg-muted" aria-labelledby="home-services-title">
        <Container>
          <Reveal as="h2" id="home-services-title" className="font-display text-3xl text-ink">
            What we do
          </Reveal>
          <StaggerReveal
            as="ul"
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            step={STAGGER.cards}
          >
            {homeServices.map((service) => (
              <li key={service.id}>
                <Link
                  to={`/services#${service.id}`}
                  className="group block h-full"
                >
                  <Card as="article" className="card-lift h-full transition-colors group-hover:border-brass-deep">
                    <span className="font-mono text-sm text-brass-deep" aria-hidden="true">
                      {service.number}
                    </span>
                    <h3 className="mt-2 text-xl text-ink">{service.title}</h3>
                    <p className="mt-2 text-muted-foreground">{service.promise}</p>
                  </Card>
                </Link>
              </li>
            ))}
          </StaggerReveal>
        </Container>
      </Section>

      {/* Why KR Advisory Group */}
      <Section aria-labelledby="home-why-title">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 id="home-why-title" className="font-display text-3xl text-ink">
              {home.why.heading}
            </h2>
            <p className="mt-6 font-display text-2xl text-ink">{home.why.lead}</p>
            <p className="mt-4 text-lg text-muted-foreground">{home.why.body}</p>
            <div className="mt-8">
              <Button as="a" href={home.why.cta.href} variant="primary">
                {home.why.cta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Who We Help */}
      <Section className="bg-muted" aria-labelledby="home-who-title">
        <Container>
          <Reveal as="h2" id="home-who-title" className="font-display text-3xl text-ink">
            {home.whoWeHelp.heading}
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

      {/* Public Sector Advisory band — full-bleed navy band: the background
          spans the full viewport width (bg-ink on the <Section>), while only
          the inner content is constrained and centred by <Container>. No Card
          chrome (radius/border/shadow) so it reads as an edge-to-edge band
          rather than a boxed card. */}
      <Section className="bg-ink" aria-labelledby="home-public-sector-title">
        <Container>
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2
              id="home-public-sector-title"
              className="font-display text-2xl text-background sm:max-w-xl"
            >
              {home.publicSector.body}
            </h2>
            <Button as="a" href={home.publicSector.cta.href} variant="primary">
              {home.publicSector.cta.label}
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* Referral Programme teaser */}
      <Section className="bg-muted" aria-labelledby="home-referral-title">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <h2 id="home-referral-title" className="font-display text-3xl text-ink">
              {home.referralTeaser.heading}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{home.referralTeaser.body}</p>
            <div className="mt-8 flex justify-center">
              <Button as="a" href={home.referralTeaser.cta.href} variant="primary">
                {home.referralTeaser.cta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Closing CTA band */}
      <Section aria-labelledby="home-closing-title">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <h2 id="home-closing-title" className="font-display text-3xl text-ink">
              {home.closing.heading}
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <WhatsAppCTA kind="consultation" variant="primary" />
              <WhatsAppCTA kind="question" variant="secondary" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

export default Home;

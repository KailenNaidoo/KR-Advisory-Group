import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Button } from '@/components/primitives/Button';
import { Reveal } from '@/components/motion/Reveal';

interface CtaBandProps {
  /** The band heading, rendered as an H2 on light-on-navy. */
  heading: string;
  /** The brass primary call-to-action. */
  button: { label: string; href: string };
  /** Unique id wiring the H2 to the section's aria-labelledby. */
  id: string;
}

/**
 * Full-bleed navy call-to-action band. Reproduces Home's "Public Sector
 * Advisory" band (see src/pages/Home.tsx): a bg-ink Section whose background
 * spans the full viewport, with only the inner content constrained by
 * Container. NO Card chrome (no border, radius or shadow) so it reads as an
 * edge-to-edge band. Additive and reusable for About/Contact/Referral; the
 * protected Home page keeps its own inline markup.
 */
export function CtaBand({ heading, button, id }: CtaBandProps) {
  return (
    <Section className="bg-ink" aria-labelledby={id}>
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 id={id} className="font-display text-2xl text-background sm:max-w-xl">
            {heading}
          </h2>
          <Button as="a" href={button.href} variant="primary">
            {button.label}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

export default CtaBand;

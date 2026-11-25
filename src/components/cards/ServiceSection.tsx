import type { CSSProperties } from 'react';
import { Container } from '@/components/primitives/Container';
import { WhatsAppCTA } from '@/components/layout/WhatsAppCTA';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerReveal } from '@/components/motion/StaggerReveal';
import { cn } from '@/lib/cn';
import type { Service } from '@/content/services';

type Tone = 'ivory' | 'stone' | 'dark';

interface ServiceSectionProps {
  service: Service;
  tone: Tone;
}

/**
 * Explicit light-on-navy colours for the dark band. These mirror the proven
 * hero values (index.css / Hero.tsx) and are applied inline because the OKLCH
 * colour tokens are declared without an alpha channel, so Tailwind opacity
 * modifiers (e.g. `text-background/90`) would render a broken, near-invisible
 * colour on the dark surface. Measured against deep navy (~oklch 20% L) these
 * all exceed WCAG AA for their text sizes.
 */
const darkTitle: CSSProperties = { color: 'oklch(98% 0.01 88)' };
const darkTagline: CSSProperties = { color: 'oklch(88% 0.012 258)' };
const darkLabel: CSSProperties = { color: 'oklch(78% 0.02 258)' };
const darkList: CSSProperties = { color: 'oklch(92% 0.008 258)' };

/**
 * Premium editorial content band for a single service (01–07). Replaces the
 * old boxed `ServiceCard`: no border/radius/shadow chrome, generous vertical
 * padding, and a two-column layout so each service reads as its own
 * destination rather than a stacked card.
 *
 * Left column: a small gold `SERVICE 0N` eyebrow (secondary to the title),
 * the service title as the dominant element, the verified `promise` tagline,
 * a subtle divider, and the two CTAs. Right column: "What This Includes" with
 * the verified `includes[]` as a clean two-column list.
 *
 * Backgrounds alternate ivory/stone to build rhythm; the final band uses deep
 * navy (`tone='dark'`) with light-on-dark text that keeps AA contrast. The
 * `id` + `scroll-mt-24` are preserved so /services#<id> deep links keep
 * working.
 */
export function ServiceSection({ service, tone }: ServiceSectionProps) {
  const headingId = `${service.id}-title`;
  const dark = tone === 'dark';

  const surface =
    tone === 'ivory'
      ? 'bg-surface-ivory'
      : tone === 'stone'
        ? 'bg-surface-stone'
        : 'bg-ink';

  // Eyebrow/bullets switch to bright brass on dark (high contrast on navy);
  // body text uses explicit light inline colours (see dark* above). Light
  // bands keep the AA-compliant ink / brass-deep tokens.
  const eyebrowColor = dark ? 'text-brass' : 'text-brass-deep';
  const dividerColor = dark ? 'border-white/15' : 'border-border';
  const bulletColor = dark ? 'text-brass' : 'text-brass-deep';

  return (
    <section
      id={service.id}
      aria-labelledby={headingId}
      className={cn('scroll-mt-24 py-20 sm:py-24 lg:py-28', surface)}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — identity + narrative + CTAs. Grouped reveal so the eyebrow,
              title, promise, divider and CTA group ride in as one sequence. */}
          <Reveal className="lg:col-span-5">
            <p
              className={cn(
                'font-mono text-xs uppercase tracking-[0.25em]',
                eyebrowColor,
              )}
            >
              Service {service.number}
            </p>
            <h2
              id={headingId}
              className={cn(
                'mt-4 font-display text-3xl leading-tight sm:text-4xl',
                dark ? undefined : 'text-ink',
              )}
              style={dark ? darkTitle : undefined}
            >
              {service.title}
            </h2>
            <p
              className={cn(
                'mt-4 text-lg leading-relaxed',
                dark ? undefined : 'text-muted-foreground',
              )}
              style={dark ? darkTagline : undefined}
            >
              {service.promise}
            </p>

            <hr className={cn('mt-8 border-t', dividerColor)} />

            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppCTA kind="consultation" />
              <WhatsAppCTA
                kind="question"
                variant="secondary"
                className={
                  dark
                    ? '!border-white/40 !bg-transparent !text-white hover:!border-brass hover:!text-brass'
                    : undefined
                }
              />
            </div>
          </Reveal>

          {/* RIGHT — what this includes */}
          <div className="lg:col-span-7">
            <h3
              className={cn(
                'font-mono text-xs uppercase tracking-[0.2em]',
                dark ? undefined : 'text-muted-foreground',
              )}
              style={dark ? darkLabel : undefined}
            >
              What This Includes
            </h3>
            <hr className={cn('mt-4 border-t', dividerColor)} />
            <StaggerReveal as="ul" className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className={cn('flex gap-3', dark ? undefined : 'text-foreground')}
                  style={dark ? darkList : undefined}
                >
                  <span aria-hidden="true" className={cn('mt-0.5', bulletColor)}>
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

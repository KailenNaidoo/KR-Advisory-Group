import { Container } from '@/components/primitives/Container';
import { HeroReveal } from '@/components/motion/HeroReveal';
import { business } from '@/content/business';
import { home } from '@/content/pages';
import { asset } from '@/lib/asset';

/**
 * Immersive, award-quality hero for the home page.
 *
 * Design language (preserved + elevated from the production site): premium
 * CA(SA)-led advisory firm — navy + brass, Fraunces display. The verified
 * city/building image (home.heroImage) is a full-width immersive BACKGROUND,
 * not an image card. Layered overlays (navy gradient, architectural grid,
 * brass glow, glass accents) build architectural depth in the register of
 * Deloitte / McKinsey / BCG / PwC / EY — not a SaaS landing page.
 *
 * Content is 100% the verified copy from content/pages.ts. The headline is
 * split into deliberate lines for rhythm; the text itself is unchanged.
 * Motion is subtle and disabled under prefers-reduced-motion (see index.css).
 */
export function Hero() {
  // Deliberate, editorial line breaks for the verified headline. The full
  // string "Financial clarity. Stronger controls. Better business decisions."
  // is preserved verbatim; we only control where it wraps.
  const headlineLines = ['Financial clarity.', 'Stronger controls.', 'Better business decisions.'];

  return (
    <HeroReveal
      as="section"
      aria-labelledby="home-hero-title"
      className="hero-surface relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Full-width immersive background image (decorative; headline carries meaning).
          data-hero-parallax marks it as the Effect-6 scrubbed parallax target. */}
      <img
        src={asset(home.heroImage.src)}
        alt=""
        aria-hidden="true"
        data-hero-parallax
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1280}
        fetchPriority="high"
        decoding="async"
      />

      {/* Layered depth overlays (navy gradient + brass glow). */}
      <div className="hero-overlay hero-drift absolute inset-0" aria-hidden="true" />
      {/* Refined architectural grid, masked to fade. */}
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      {/* Subtle vignette for edge depth. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          boxShadow: 'inset 0 -120px 160px -80px rgba(0,0,0,0.6), inset 0 0 240px rgba(0,0,0,0.35)',
        }}
      />

      {/* Content — vertically centred. */}
      <Container className="relative z-10 py-28 sm:py-32">
        <div className="max-w-4xl">
          <p className="hero-reveal font-mono text-[0.7rem] uppercase tracking-[0.3em] text-brass sm:text-xs">
            CA(SA)-led · Accounting · Tax · Internal Audit
          </p>

          {/* Thin brass horizon rule for architectural structure. */}
          <div className="hero-reveal hero-rule mt-6 h-px w-28" aria-hidden="true" />

          {/* Line-by-line masked reveal mapped onto the EXISTING nested spans
              (DECISION 2): hero-line-mask on each outer .block span, and
              hero-line-inner on each inner span. No new elements are inserted;
              the line-3 brass accent is preserved. */}
          <h1
            id="home-hero-title"
            className="mt-7 font-display font-light leading-[0.98] tracking-[-0.02em] text-[clamp(2.6rem,7vw,5.75rem)]"
            style={{ color: 'oklch(98% 0.01 88)' }}
          >
            {headlineLines.map((line, i) => (
              <span key={line} className="hero-line-mask block">
                {/* Final clause accented in brass for emphasis. */}
                <span
                  className="hero-line-inner"
                  style={i === headlineLines.length - 1 ? { color: 'oklch(80% 0.115 82)' } : undefined}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="hero-reveal mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl"
            style={{ color: 'oklch(88% 0.012 258)' }}
          >
            {home.heroSubCopy}
          </p>

          {/* CTA group — directly beneath the value proposition. */}
          <div className="hero-reveal mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="/services"
              className="btn-hero-primary inline-flex items-center justify-center gap-2 rounded px-7 py-3.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Explore Our Services
              <span aria-hidden="true" className="cta-arrow">→</span>
            </a>
            {/* Secondary CTA rendered directly (not via the themed Button) so the
                glass ghost treatment is not overridden by brass-fill utilities. */}
            <a
              href={business.whatsapp.consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-ghost inline-flex items-center justify-center gap-2 rounded px-7 py-3.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Book a Consultation
            </a>
          </div>

          {/* Glass credential chips — verified positioning facts only. */}
          <div className="hero-reveal mt-14 flex flex-wrap gap-3">
            {['CA(SA)-led practice', 'Midrand · Johannesburg', 'Business & public sector'].map((chip) => (
              <span
                key={chip}
                className="hero-glass rounded-full px-4 py-2 text-xs font-medium tracking-wide"
                style={{ color: 'oklch(90% 0.012 258)' }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll cue. */}
      <div
        className="hero-reveal absolute inset-x-0 bottom-6 z-10 flex justify-center"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[0.65rem] uppercase tracking-[0.3em]"
          style={{ color: 'oklch(80% 0.03 258 / 0.8)' }}
        >
          Scroll
        </span>
      </div>
    </HeroReveal>
  );
}

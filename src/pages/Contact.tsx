import { useState, type FormEvent } from 'react';
import { Head } from '@/components/seo/Head';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbs, contactPoint, faqPage } from '@/lib/jsonld';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { Card } from '@/components/primitives/Card';
import { Button } from '@/components/primitives/Button';
import { FormField } from '@/components/primitives/FormField';
import { PageHero } from '@/components/layout/PageHero';
import { WhatsAppCTA } from '@/components/layout/WhatsAppCTA';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerReveal } from '@/components/motion/StaggerReveal';
import { STAGGER } from '@/animations/motionTokens';
import { contact, home } from '@/content/pages';
import { services } from '@/content/services';
import { business, contactDetails } from '@/content/business';
import { meta } from '@/routes';

/*
 * [NOT VERIFIED] Contact form submission.
 * The live form is JS-rendered: the exact field names, required-field rules
 * and the submission ENDPOINT could not be confirmed from server HTML and
 * must be supplied by the client. No endpoint is invented here. The fields
 * below (name, email, service, message) are a minimal accessible set; replace
 * them and wire `handleSubmit` to the real endpoint once the client confirms.
 */
interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  // Only ever set to true after a successful submit — never on failure.
  const [submitted, setSubmitted] = useState(false);
  // FAQ accordion open/closed state (single verified Q&A).
  const [faqOpen, setFaqOpen] = useState(false);

  function update(field: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!EMAIL_RE.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!values.message.trim()) next.message = 'Please describe your enquiry.';
    return next;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    // No success state on failure: bail out if there is any validation error.
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    // [NOT VERIFIED] PLACEHOLDER SUBMIT — no real endpoint is configured.
    // Do NOT invent a destination. Once the client supplies the endpoint and
    // confirmed field set, send `values` here (e.g. fetch(ENDPOINT, …)) and
    // only set `submitted` to true on a successful response.
    setSubmitted(true);
  }

  return (
    <>
      <Head {...meta['/contact']} />
      <JsonLd
        data={[
          breadcrumbs('Contact', '/contact'),
          contactPoint(),
          faqPage([{ question: contact.faq.question, answer: contact.faq.answer }]),
        ]}
      />

      {/* (A) Interior hero — the single H1 for this page. */}
      <PageHero
        eyebrow={contact.headingSub}
        title={contact.heading}
        supporting={contact.supporting}
        image={home.heroImage}
      />

      {/* (B) Two-column: LEFT = intro + verified contact details; RIGHT = the
          existing, working enquiry form (behaviour unchanged). */}
      <Section className="bg-surface-ivory" aria-labelledby="contact-details-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* LEFT — intro + verified contact details. */}
            <div>
              <Reveal>
                <h2
                  id="contact-details-title"
                  className="font-display text-3xl text-ink sm:text-4xl"
                >
                  Get in touch
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  {contact.intro}
                </p>
              </Reveal>

              <StaggerReveal as="dl" className="mt-8 space-y-6">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wide text-brass-deep">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      className="break-words text-ink underline hover:text-brass-deep"
                      href={`mailto:${contactDetails.email}`}
                    >
                      {contactDetails.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="font-mono text-xs uppercase tracking-wide text-brass-deep">
                    WhatsApp
                  </dt>
                  <dd className="mt-1">
                    <a
                      className="text-ink underline hover:text-brass-deep"
                      href={contactDetails.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {business.phoneDisplay}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="font-mono text-xs uppercase tracking-wide text-brass-deep">
                    Office
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{contactDetails.address}</dd>
                </div>
              </StaggerReveal>

              <p className="mt-8 text-sm text-muted-foreground">
                Not sure where to start? See how our{' '}
                <a className="text-ink underline hover:text-brass-deep" href="/services#audit-readiness">
                  audit-readiness
                </a>{' '}
                and{' '}
                <a className="text-ink underline hover:text-brass-deep" href="/services#business-advisory">
                  business advisory
                </a>{' '}
                services can help.
              </p>
            </div>

            {/* RIGHT — the EXISTING working form, restyled but behaviour-identical. */}
            <Card as="div">
              <h2 className="font-display text-2xl text-ink">{contact.form.heading}</h2>

              {submitted ? (
                <p role="status" className="mt-4 text-muted-foreground">
                  Thank you — your enquiry is ready to send. (Submission is not yet
                  wired to a destination; see the [NOT VERIFIED] note in the source.)
                </p>
              ) : (
                <form className="mt-6 flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
                  <FormField id="contact-name" label="Name" error={errors.name}>
                    {(aria) => (
                      <input
                        {...aria}
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={values.name}
                        onChange={(e) => update('name', e.target.value)}
                        className="field-motion rounded border border-border bg-background px-3 py-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-deep"
                      />
                    )}
                  </FormField>

                  <FormField id="contact-email" label="Email" error={errors.email}>
                    {(aria) => (
                      <input
                        {...aria}
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="field-motion rounded border border-border bg-background px-3 py-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-deep"
                      />
                    )}
                  </FormField>

                  <FormField id="contact-service" label={contact.prepare.serviceSelectorLabel}>
                    {(aria) => (
                      <select
                        {...aria}
                        name="service"
                        value={values.service}
                        onChange={(e) => update('service', e.target.value)}
                        className="field-motion rounded border border-border bg-background px-3 py-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-deep"
                      >
                        <option value="">No specific service</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    )}
                  </FormField>

                  <FormField id="contact-message" label="How can we help?" error={errors.message}>
                    {(aria) => (
                      <textarea
                        {...aria}
                        name="message"
                        rows={5}
                        value={values.message}
                        onChange={(e) => update('message', e.target.value)}
                        className="field-motion rounded border border-border bg-background px-3 py-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-deep"
                      />
                    )}
                  </FormField>

                  <div>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </Container>
      </Section>

      {/* (C) Alternative contact methods — Email, WhatsApp, Consultation. */}
      <Section aria-labelledby="contact-channels-title">
        <Container>
          <Reveal as="h2" id="contact-channels-title" className="font-display text-3xl text-ink sm:text-4xl">
            Other ways to reach us
          </Reveal>
          <StaggerReveal className="mt-8 grid gap-6 md:grid-cols-3" step={STAGGER.cards}>
            <div>
              <Card as="div" className="card-lift group h-full">
                <h3 className="font-mono text-xs uppercase tracking-wide text-brass-deep">Email</h3>
                <p className="mt-3 text-muted-foreground">
                  Send us the details and we will respond with next steps.
                </p>
                <a
                  className="mt-4 inline-block break-words text-ink underline hover:text-brass-deep"
                  href={`mailto:${contactDetails.email}`}
                >
                  {contactDetails.email}
                </a>
              </Card>
            </div>

            <div>
              <Card as="div" className="card-lift group h-full">
                <h3 className="font-mono text-xs uppercase tracking-wide text-brass-deep">WhatsApp</h3>
                <p className="mt-3 text-muted-foreground">
                  Message us on {business.phoneDisplay} for a quick conversation.
                </p>
                <div className="mt-4">
                  <WhatsAppCTA kind="question" variant="secondary" />
                </div>
              </Card>
            </div>

            <div>
              <Card as="div" className="card-lift group h-full">
                <h3 className="font-mono text-xs uppercase tracking-wide text-brass-deep">
                  Consultation
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Book a free consultation to discuss your requirements.
                </p>
                <div className="mt-4">
                  <WhatsAppCTA kind="consultation" variant="primary" />
                </div>
              </Card>
            </div>
          </StaggerReveal>
        </Container>
      </Section>

      {/* (D) FAQ — accessible accordion with the ONE verified Q&A + closing line. */}
      <Section className="bg-surface-stone" aria-labelledby="contact-faq-title">
        <Container className="max-w-3xl">
          <Reveal as="h2" id="contact-faq-title" className="font-display text-3xl text-ink sm:text-4xl">
            Frequently asked
          </Reveal>

          <Reveal className="mt-8 rounded-lg border border-border bg-background">
            <h3 className="m-0">
              <button
                type="button"
                id="contact-faq-trigger"
                aria-expanded={faqOpen}
                aria-controls="contact-faq-panel"
                onClick={() => setFaqOpen((open) => !open)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-deep"
              >
                <span>{contact.faq.question}</span>
                <span aria-hidden="true" className="shrink-0 text-brass-deep">
                  {faqOpen ? '–' : '+'}
                </span>
              </button>
            </h3>
            <div
              id="contact-faq-panel"
              role="region"
              aria-labelledby="contact-faq-trigger"
              hidden={!faqOpen}
              className="border-t border-border px-5 py-4 text-muted-foreground"
            >
              <p className="leading-relaxed">{contact.faq.answer}</p>
            </div>
          </Reveal>

          <p className="mt-6 text-muted-foreground">{contact.faq.closing}</p>
        </Container>
      </Section>

      {/* (E) Location — verified address text only. No map embed and no business
          hours (both [NOT VERIFIED]; logged as a gap in FEAT-005). */}
      <Section aria-labelledby="contact-location-title">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 id="contact-location-title" className="font-display text-3xl text-ink sm:text-4xl">
              Our office
            </h2>
            <address className="mt-6 not-italic text-lg text-muted-foreground">
              {contactDetails.address}
            </address>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

export default Contact;

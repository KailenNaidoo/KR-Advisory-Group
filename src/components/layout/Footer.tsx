import { Link } from 'react-router-dom';
import type { IconType } from 'react-icons';
import { FiMail, FiMapPin, FiLinkedin } from 'react-icons/fi';
import {
  SiWhatsapp,
  SiTiktok,
  SiInstagram,
  SiX,
  SiYoutube,
} from 'react-icons/si';
import { business, leadership, socials } from '@/content/business';
import { services } from '@/content/services';
import { Container } from '@/components/primitives/Container';

/** Brand icon lookup for the social buttons, keyed by the `socials` label. */
const socialIcons: Record<string, IconType> = {
  TikTok: SiTiktok,
  Instagram: SiInstagram,
  'X (Twitter)': SiX,
  YouTube: SiYoutube,
  LinkedIn: FiLinkedin,
};

/** Global footer: address, brand line, leadership, service + contact links, socials, copyright. */
export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-lg text-ink">{business.name}</p>
            <p className="mt-2 max-w-sm text-muted-foreground">{business.brandLine}</p>
            <address className="mt-4 flex items-start gap-2.5 not-italic text-muted-foreground">
              <FiMapPin
                aria-hidden="true"
                className="mt-1 shrink-0 text-brass-deep"
                size={16}
              />
              <span>{business.address}</span>
            </address>
            <p className="mt-4 text-muted-foreground">
              {leadership.map((l) => (
                <span key={l.name} className="block">
                  {l.name}, {l.credential} — {l.title}
                </span>
              ))}
            </p>
          </div>

          <nav aria-label="Services">
            <h2 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Our Services
            </h2>
            <ul className="mt-3 space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services#${s.id}`}
                    className="text-sm text-ink hover:text-brass-deep"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Contact
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={business.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-ink hover:text-brass-deep"
                >
                  <SiWhatsapp
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-brass-deep"
                    size={16}
                  />
                  <span>WhatsApp {business.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.emails.general}`}
                  className="flex items-start gap-2.5 text-ink hover:text-brass-deep"
                >
                  <FiMail
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-brass-deep"
                    size={16}
                  />
                  <span className="break-words">{business.emails.general}</span>
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-ink hover:text-brass-deep">
                  Contact page
                </Link>
              </li>
            </ul>

            <h2 className="mt-6 font-mono text-xs uppercase tracking-wide text-muted-foreground">
              Follow
            </h2>
            <ul className="mt-3 flex flex-wrap gap-3">
              {socials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${business.name} on ${s.label}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-ink text-ink transition-colors hover:border-brass-deep hover:text-brass-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-deep focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
                    >
                      {Icon ? (
                        <Icon aria-hidden="true" size={16} />
                      ) : (
                        <span className="text-xs">{s.label}</span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{business.copyright}</p>
          <p>{business.locality}</p>
        </div>
      </Container>
    </footer>
  );
}

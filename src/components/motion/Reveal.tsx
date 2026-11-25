import type { ElementType, ReactNode } from 'react';

interface RevealProps {
  /** Element to render. Defaults to 'div'. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Passthrough for any extra attributes (e.g. id, style, aria-*). */
  [key: string]: unknown;
}

/**
 * Single-element scroll-reveal wrapper (CSS + shared IntersectionObserver).
 *
 * Renders `as` (default 'div') with a `data-reveal` marker so the shared
 * observer in `useReveal` reveals it. The hidden pre-reveal state is CSS gated
 * on `.motion-ready` + `prefers-reduced-motion: no-preference`, so content is
 * fully visible without JS or under reduced motion — this wrapper never hides
 * content on its own.
 */
export function Reveal({ as, className, children, ...rest }: RevealProps) {
  const Component = as ?? 'div';
  return (
    <Component data-reveal className={className} {...rest}>
      {children}
    </Component>
  );
}

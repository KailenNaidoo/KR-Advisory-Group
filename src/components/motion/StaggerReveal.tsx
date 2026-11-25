import { Children, isValidElement, cloneElement } from 'react';
import type { CSSProperties, ElementType, ReactElement, ReactNode } from 'react';
import { STAGGER } from '@/animations/motionTokens';

interface StaggerRevealProps {
  /** Container element to render. Defaults to 'div'. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Per-child delay step in seconds. Defaults to STAGGER.group (90ms). */
  step?: number;
  [key: string]: unknown;
}

/**
 * Grouped staggered scroll reveal (CSS + shared IntersectionObserver).
 *
 * Each direct child becomes a `[data-reveal]` node with an incremental
 * `transition-delay` so siblings reveal in sequence. The delay is applied via
 * an inline style merged onto each child; the hidden state is the same CSS as
 * `Reveal`, gated on `.motion-ready` + `no-preference`, so children stay fully
 * visible without JS or under reduced motion.
 */
export function StaggerReveal({
  as,
  className,
  children,
  step = STAGGER.group,
  ...rest
}: StaggerRevealProps) {
  const Component = as ?? 'div';

  return (
    <Component className={className} {...rest}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        const element = child as ReactElement<{ style?: CSSProperties }>;
        const delay = index * step;
        const mergedStyle: CSSProperties = {
          ...(element.props.style ?? {}),
          transitionDelay: `${delay}s`,
        };

        return cloneElement(element, {
          'data-reveal': true,
          style: mergedStyle,
        } as Partial<typeof element.props> & { 'data-reveal': boolean });
      })}
    </Component>
  );
}

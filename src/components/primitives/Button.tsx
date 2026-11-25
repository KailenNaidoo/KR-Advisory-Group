import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary';

const base =
  'inline-flex items-center justify-center gap-2 rounded font-medium ' +
  'px-5 py-3 text-sm shadow-sm transition-all duration-200 ease-out ' +
  'hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-brass-deep focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-background';

const variants: Record<Variant, string> = {
  // Primary: brass FILL + ink text — compliant per the brass contrast policy.
  primary: 'bg-brass text-ink hover:bg-brass-deep hover:text-background',
  // Secondary: outline with ink text (AA on light background).
  secondary:
    'border border-border bg-transparent text-ink hover:border-brass-deep hover:text-brass-deep',
};

interface ButtonAsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button';
  variant?: Variant;
  children: ReactNode;
}

interface ButtonAsAnchor extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as: 'a';
  variant?: Variant;
  children: ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Shared button. Renders a <button> by default or an <a> when `as="a"`.
 * Variant hierarchy: primary = brass fill, secondary = outline. Always has a
 * visible focus ring.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', className, children } = props;
  const classes = cn(base, variants[variant], className);

  if (props.as === 'a') {
    const { as: _as, variant: _v, className: _c, children: _ch, ...anchorProps } = props;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, className: _c, children: _ch, ...buttonProps } = props;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

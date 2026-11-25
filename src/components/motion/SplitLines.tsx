import type { CSSProperties, ReactNode } from 'react';

interface SingleProps {
  /** Whole-heading single masked wipe (interior headings). */
  mode: 'single';
  /** Heading content placed inside one mask -> one inner span. */
  children: ReactNode;
}

interface LinesProps {
  /** One mask + inner span per authored visual line (home hero). */
  mode: 'lines';
  /** Per-line content, in order. Each entry becomes a masked line. */
  lines: ReactNode[];
  /** Optional per-line inline styles (e.g. the brass accent on the last line),
   *  index-aligned with `lines`. */
  lineStyles?: Array<CSSProperties | undefined>;
}

type SplitLinesProps = SingleProps | LinesProps;

/**
 * Static line-mask wrappers for the GSAP hero reveal.
 *
 * Inserts ONLY structural wrapper spans at render time — no runtime
 * measurement, no character splitting, no text duplication, no `aria-hidden`
 * (the real text stays in the DOM for crawlers and assistive tech). Server and
 * client render identical markup, so there is no hydration diff.
 *
 * Each visual line is an `.hero-line-mask` (overflow:hidden once gated) wrapping
 * an `.hero-line-inner` span (the element GSAP translates from below the mask).
 * Both only have a visual effect once `.hero-motion-ready` is added by
 * `HeroReveal`; otherwise the content renders as normal visible text.
 *
 *  - `lines` mode: one mask/inner per authored line (home hero's 3 spans).
 *  - `single` mode: the whole heading in one mask/inner (interior headings).
 */
export function SplitLines(props: SplitLinesProps) {
  if (props.mode === 'single') {
    return (
      <span className="hero-line-mask">
        <span className="hero-line-inner">{props.children}</span>
      </span>
    );
  }

  const { lines, lineStyles } = props;
  return (
    <>
      {lines.map((line, index) => (
        <span key={index} className="hero-line-mask">
          <span className="hero-line-inner" style={lineStyles?.[index]}>
            {line}
          </span>
        </span>
      ))}
    </>
  );
}

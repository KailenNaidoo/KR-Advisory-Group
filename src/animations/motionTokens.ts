/**
 * Motion tokens — the single source of truth for durations, staggers, easing
 * and distances used across the motion system (CSS reveals + GSAP hero).
 *
 * These mirror the `--reveal-*`, `--hero-*`, `--hover` and `--ease-cinematic`
 * CSS custom properties declared in `:root` in `src/index.css`. Keep the two in
 * sync: the CSS reveals read the custom properties and the GSAP timelines read
 * the values below.
 */

/** Easing curves. `cinematic` is the primary; `standard` matches the curve the
 *  pre-existing hero button utilities already use (kept for visual parity). */
export const EASE = {
  cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
  standard: 'cubic-bezier(0.16, 1, 0.32, 1)',
} as const;

/** GSAP ease string equivalent to `EASE.cinematic` (a smooth deceleration with
 *  no overshoot). GSAP uses its own named-ease syntax rather than cubic-bezier. */
export const GSAP_EASE = 'power3.out';

/** Durations in seconds (GSAP native unit; CSS mirrors these in ms). */
export const DURATION = {
  reveal: 0.76,
  heroEyebrow: 0.55,
  heroLine: 0.95,
  heroPara: 0.6,
  heroCta: 0.5,
  hover: 0.26,
} as const;

/** Stagger gaps in seconds. */
export const STAGGER = {
  heroLines: 0.14,
  group: 0.09,
  cards: 0.12,
} as const;

/** translateY start distances in px (animated to 0). */
export const DISTANCE = { reveal: 20, hero: 28 } as const;

/** Blur start radii in px (animated to 0). */
export const BLUR = { reveal: 4, hero: 6 } as const;

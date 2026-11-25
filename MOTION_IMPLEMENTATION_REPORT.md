# Motion Implementation Report — KR Advisory Group

Branch: `motion-experience` (worktree, based on `page-refinement` @ `17b217e`)
Scope: cinematic, performance-first motion layer over the already-approved static
site (vite-react-ssg, 5 routes). This report covers FEAT-004 — the whole-site
verification sweep, screenshots, bundle-delta measurement, and CWV sanity.

> No product copy, headings, SEO metadata, structured data, sitemap, robots, or
> referral programme terms were changed by the motion work. The verification
> below proves the built `<head>` sections and all `<h1>`/`<h2>` text are
> byte-identical to the pre-motion baseline.

---

## 1. Animation summary (effects 3–10)

The motion system is a two-layer, progressive enhancement. The resting / no-JS /
reduced-motion DOM is the fully-visible authored layout; hidden pre-animation
states are CSS gated behind JS-added classes (`.motion-ready` on `<html>` for the
IntersectionObserver reveals; `.hero-motion-ready` on the hero root, added inside
the hero's own `useGSAP` layout pass). Animations always run **from** the
CSS-hidden state **toward** visible — nothing visible is ever hidden after paint.

| # | Effect | Where | Technology |
|---|--------|-------|------------|
| 3 | Cinematic hero text reveal — line-by-line masked `<h1>` wipe (translateY 110%→0 + blur→0), with eyebrow / brass rule / supporting `<p>` / CTA / chips / scroll-cue folded into the same staggered timeline | Home `Hero`, shared `PageHero` (About/Contact/Referral), inline Services hero | **GSAP** timeline in `HeroReveal` (`useLayoutEffect` + `gsap.context().revert()`), GSAP lib lazy-loaded off the critical path |
| 4 | Scroll-reveal of below-the-hero content (`[data-reveal]`): fade + translateY + optional blur, revealed once on intersection then unobserved; above-the-fold nodes reveal on first frame | All pages (`Reveal`) | **CSS transition** + shared **IntersectionObserver** (`useReveal`) |
| 5 | Staggered content entrances — grouped children reveal in sequence via incremental `transition-delay` | Home cards, Who/What lists, referral terms rows, etc. (`StaggerReveal`) | **CSS** + IO |
| 6 | Scrubbed hero-image parallax — `scale: 1.08` over-scale + `yPercent` +4→−4 bound, scrubbed to scroll; `>=768px` only | All three heroes (`[data-hero-parallax]` target) | **GSAP ScrollTrigger** (isolated async chunk) |
| 7 | Card lift — `translateY(-3px)` + defined box-shadow on `group-hover`/`group-focus-within` | Home service cards, audience cards, referral list rows, leadership/principle cards (`.card-lift`) | **CSS** (`transition: transform, box-shadow, border-color`) |
| 8 | CTA arrow nudge — `→` translates on hover/focus of hero/button CTAs (`.cta-arrow`) | Hero + themed buttons | **CSS** |
| 9 | Header transparent→glass transition on scroll | `Header` | **CSS** (pre-existing, preserved) |
| 10 | Reduced-motion + live-toggle governance — a single `matchMedia('(prefers-reduced-motion: reduce)')` read inside each effect body; one `change` listener in `App` reverts in-flight motion to the final visible state and never hides already-visible content | `App` bootstrap, `HeroReveal`, `useReveal` | **CSS gates** + JS `matchMedia` |

Design invariants honoured: one animation library (GSAP); the hero `<h1>` is the
server-rendered LCP element and is never imperatively hidden after paint; reveals
and parallax animate transform/opacity/filter only (no layout-triggering
properties → no CLS from motion); `will-change` is applied transiently to the
entering node and cleared on `transitionend`; the Referral Programme Terms render
verbatim in static HTML and are never gated behind interaction.

---

## 2. Gate battery / test results

All checks were run from the worktree root against the built `dist/` served by an
embedded sirv server (SPA single-page fallback), using Playwright (`msedge`
channel). The harness ran 21 assertions — **21/21 passed**.

### 2.1 Typecheck & build
- `npx tsc --noEmit` → **0 errors**.
- `npm run build` → **succeeds**; `dist/` pre-rendered for all 5 routes; sitemap generated.
- Build note (pre-existing, not a motion regression): a React SSR warning about the
  `fetchPriority` prop casing on the hero `<img>` is emitted during static
  rendering in **both** the pre-motion baseline and the current build. It does not
  affect output, hydration, or the gates.
- The earlier Rollup warning ("`gsap` dynamically imported … but also statically
  imported by `@gsap/react`") is **gone** after the §5 fix — GSAP is now reached
  only through the dynamic import, so it code-splits cleanly.

### 2.2 No-JS / SEO (content is server-rendered, not JS-gated)
- Grep of built HTML confirmed: `dist/index.html` contains the three hero lines
  (`Financial clarity.` / `Stronger controls.` / `Better business decisions.`);
  `dist/referral/index.html` contains the Referral Programme Terms + Who/What
  items; `dist/about/index.html` contains the founder/leadership content;
  `dist/contact/index.html` contains the form fields (`name`/`email`/`service`/`message`).
- **Head-section diff vs pre-motion baseline (`17b217e` build):** the `<head>`
  (canonical / meta / JSON-LD / title) is **byte-identical** on all 5 pages
  (modulo expected hashed asset filenames). All `<h1>`/`<h2>` text is
  **byte-identical** on all 5 pages (10/9/9/11/10 headings respectively).
- **Playwright `javaScriptEnabled:false`** on all 5 pages: hero `<h1>` visible,
  opacity 1, non-zero height, full text present — no hidden/blank hero.

### 2.3 Hero first-load no-flash (LCP gate) — PASS
Init-script sampler reads the hero `<h1>` computed opacity from the first
`requestAnimationFrame` for ~500ms+.
- `/` → first sample **1.000**, no visible→hidden drop → **PASS**
- `/about` → first sample **1.000**, no visible→hidden drop → **PASS**

### 2.4 Reduced motion (`reducedMotion:'reduce'`) — PASS (all 5 pages)
No transforms and no opacity-0 ever applied; hero `<h1>`, `.hero-line-inner`, and
every `[data-reveal]` are fully visible at load.
- home 0/15 reveals hidden · services 0/65 · about 0/14 · contact 0/11 · referral 0/28.

### 2.5 Route transitions / lifecycle — PASS
Navigated Home↔About↔Services↔Contact↔Referral plus back/forward.
- **No console errors or warnings** across all transitions.
- No duplicate-trigger errors; reveals continue to work on re-entered pages.
- Note: `ScrollTrigger.getAll()` is not readable from page scope because GSAP is
  module-scoped (not attached to `window`) — correct for an isolated library. The
  intent of the gate (bounded, no unbounded growth / no leaked observers) is
  satisfied: the `HeroReveal` cleanup calls `gsap.context().revert()` on unmount,
  so each route change disposes the prior hero's timeline + ScrollTrigger, and the
  console stays clean across repeated navigation.

### 2.6 Functional checks — PASS
- Desktop nav: 13 header links present.
- Mobile menu: opens (`aria-expanded=true`), Escape closes (`aria-expanded=false`),
  focus returns to the toggle.
- `/services#accounting` deep link scrolls to the section (scrollY ≈ 446, anchor at top).
- Contact form: empty submit shows validation errors (6 invalid fields + error
  text); valid submit shows the status/confirmation message.
- FAQ accordion toggles (`aria-expanded false → true`).
- WhatsApp links intact (6 `wa.me` anchors); consultation/contact links intact.

---

## 3. Bundle delta (gzipped)

Measured by building the pre-motion baseline (`17b217e`) and the current
`motion-experience` build and gzipping each emitted JS chunk.

| Chunk | Before (pre-motion) | After (motion) | Delta |
|-------|--------------------:|---------------:|------:|
| **Entry `app-*.js`** (critical path) | 283.31 KB raw / **88.84 KB gzip** | 288.38 KB raw / **90.41 KB gzip** | **+5.07 KB raw / +1.57 KB gzip** |
| `client-*.js` | 0.55 KB / 0.37 KB | 0.55 KB / 0.37 KB | 0 |
| `index-*.js` — **GSAP core** (async chunk) | — | 68.69 KB raw / **27.09 KB gzip** | new (code-split, off critical path) |
| `ScrollTrigger-*.js` (async chunk) | — | 42.55 KB raw / **17.63 KB gzip** | new (code-split, off critical path) |

- The **critical-path entry chunk** grows by only **+1.57 KB gzip** — just the
  motion-system code (hooks, reveal wrappers, tokens, the `HeroReveal` shell).
- **GSAP core and ScrollTrigger are both isolated in their own async chunks**,
  loaded only at runtime via the lazy `loadGsap()` dynamic import. The entry
  chunk does **not** statically import either chunk, and `index.html` emits
  **zero `modulepreload`** for them — confirmed by inspecting the built bundle
  (`quickSetter` / ScrollTrigger plugin body are both absent from the entry
  chunk). GSAP is therefore fully off the initial render path (design §2 / §12).

---

## 4. CWV / performance sanity

- **LCP:** the hero `<h1>` is the server-rendered LCP element (present in static
  HTML, visible at first paint, never motion-gated). The no-flash gate confirms
  first-paint opacity = 1.0.
- **CLS:** reveals and parallax animate `transform` / `opacity` / `filter` only —
  no layout-triggering properties (no width/height/top/left/margin). No CLS is
  introduced by motion. Hero image uses fixed `width`/`height` attributes.
- **INP:** interactions (nav, mobile menu, form, FAQ, deep links) remained
  responsive with no console errors across repeated navigation.
- **Library isolation:** GSAP core and ScrollTrigger each ship in their own async
  chunk, loaded only via the lazy `loadGsap()` dynamic import at runtime; neither
  is on the critical-path entry chunk and neither is modulepreloaded (see §5).

---

## 5. Resolved finding — GSAP fully isolated off the critical path

**What the gate found (before fix).** The acceptance criterion / design §2 &
§12.8–12.9 require GSAP to be "dynamically imported off the critical path, in its
own async chunk." ScrollTrigger already met this, but **GSAP core was bundled into
the entry `app-*.js` chunk**, adding +30.11 KB gzip to the critical-path bundle
(entry 88.84 → 118.95 KB gzip).

**Root cause.** `HeroReveal` statically imported `useGSAP` from `@gsap/react`, and
`@gsap/react` statically imports `gsap`. Because `HeroReveal` is in the initial
render graph of all three heroes, that static import chain pulled GSAP core into
the entry chunk, and the lazy `loadGsap()` loader could not move a module that was
also statically imported. A Vite `manualChunks` split was tested and rejected: it
produced a separate `gsap-*.js` file that the entry still statically imported and
`index.html` still `modulepreload`ed, so it was not actually off the critical
path.

**Fix applied (approved — Option A).** `HeroReveal` no longer uses `@gsap/react`'s
`useGSAP`. The identical hero timeline now runs inside a plain `useLayoutEffect`
(SSR-safe, falling back to `useEffect` on the server) with an **empty dependency
array** (mount-only). The effect creates a `gsap.context(..., root)` scoped to the
hero root, and its cleanup calls `ctx.revert()` — so a React StrictMode
double-invoke in dev and a real unmount both tear down cleanly with no duplicate
ScrollTriggers/observers. GSAP + ScrollTrigger are imported **only** via the lazy
`loadGsap()` dynamic import inside the effect, so `@gsap/react` is no longer in the
static import graph and both libraries land in their own async chunks.

**Why this honours the FIXED "hero `useGSAP`, empty deps" decision.** That decision
existed to guarantee mount-only, Strict-Mode-safe setup/cleanup with no reactive
re-arm. The `useLayoutEffect` + manual `gsap.context().revert()` preserves that
exact guarantee by other means. The change is strictly behavior-preserving: same
timeline/choreography, same structural no-flash model (first-paint `<h1>` opacity
= 1.000 on `/` and `/about`, re-verified), same reduced-motion handling (direct
`matchMedia` read; if reduced, the effect returns before adding the gate or
running any tween), and the live-toggle-never-hides-content invariant is intact.
No visible or functional change — the only user-observable effect is a lighter,
faster initial load.

**Verification of the fix.**
- Entry chunk: 118.95 → **90.41 KB gzip** (now only +1.57 KB gzip over the
  pre-motion baseline; GSAP core removed).
- Built entry chunk no longer contains GSAP core (`quickSetter`) or the
  ScrollTrigger plugin body; `index.html` emits **zero `modulepreload`** for the
  GSAP/ScrollTrigger chunks.
- GSAP core ships in its own async chunk `index-*.js` (27.09 KB gzip);
  ScrollTrigger in `ScrollTrigger-*.js` (17.63 KB gzip).
- Full gate battery re-run after the fix: **21/21 pass** (no-JS, no-flash on
  `/` and `/about`, reduced-motion on all 5 pages, route transitions with zero
  console errors, all functional checks). Head/heading byte-diff vs baseline
  still identical on all 5 pages.

---

## 6. Screenshots

Captured via Playwright (`msedge` channel) at **1440px** and **375px** for each of
`/`, `/services`, `/about`, `/contact`, `/referral`, in both **default (motion)**
and **reduced-motion** modes (motion mode captures hero mid-reveal + settled;
reduced-motion captures settled). 30 PNGs total.

Location: `.agents/tasks/motion-experience/screenshots/`

Naming: `<page>-<viewport>-<mode>-<phase>.png`
(e.g. `home-1440-motion-midreveal.png`, `home-1440-motion-settled.png`,
`home-375-reduced-settled.png`).

---

## 7. Compliance checklist

- [x] Approved design / colours / typography / imagery preserved.
- [x] All restored content preserved; Referral Programme Terms verbatim, never gated.
- [x] All text server-rendered and accessible to crawlers (no-JS proof + head/heading byte-diff).
- [x] `prefers-reduced-motion` respected; live toggle never hides visible content.
- [x] No hydration flash (hero first-paint opacity = 1.0) and no CLS from motion.
- [x] Core Web Vitals protected (LCP server-rendered; transform/opacity/filter only).
- [x] All 5 pages tested on desktop (1440) and mobile (375).
- [x] Referral programme terms unchanged.
- [x] Not deployed / merged / pushed — committed locally on `motion-experience` only.
- [x] GSAP (core + ScrollTrigger) fully isolated in async chunks, off the critical-path entry (see §5).

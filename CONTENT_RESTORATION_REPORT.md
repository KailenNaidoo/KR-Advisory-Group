# Content Restoration Report — KR Advisory Group Website

Content-restoration task (NOT a redesign). Verified original copy was restored to
the About and Referral pages while the approved redesign was preserved exactly.

- **Branch:** `page-refinement`
- **Starting commit:** `5b60459` (`feat: add gold contact icons and outlined social buttons to footer`) — working tree clean at start.
- **Scope:** content additions only; no design-system changes.

## Files modified

| File | Change |
| --- | --- |
| `src/content/business.ts` | Added verbatim `bio` and `expertise` fields to both `leadership` entries (Kgaogelo: 8 expertise labels; Naledi: 7). Existing `name`/`credential`/`title`/`email` and `as const` shape preserved. |
| `src/content/pages.ts` | Added `about.principles` (3 items). Removed the resolved `about.leadership.bioPlaceholder` and `about.howWeWork.bodyPlaceholder` placeholders (kept `about.howWeWork.heading`). Added `referral.whoCanRefer` (7 items), `referral.whatYouCanRefer` (10 items) and `referral.programmeTerms` (5 terms). Left `about.body`/`about.bodyPlaceholder`/`referral.intro`/`referral.body`/`referral.cta`/`referral.rewards` untouched. |
| `src/pages/About.tsx` | Section (C) now renders each founder's full bio (cards grow naturally, no fixed height/truncation) plus an expertise chip list using existing border/ivory/brass tokens. Section (D) now renders the three principles as a 3-up numbered-card grid reusing the Home "What we do" card language. Monogram treatment retained (no fabricated photo). |
| `src/pages/Referral.tsx` | Added three new sections between Programme Overview (B) and the submission CTA (E): a two-column "Who can refer" / "What you can refer" section with gold `FiCheck` list markers (desktop two-column with a subtle `md:border-l` divider, stacking on mobile), and a "Referral Programme Terms" section on `bg-surface-ivory` with a gold uppercase eyebrow and 5 numbered rows on subtle top dividers. Hero (A), Programme Overview (B), submission CTA (E) and CtaBand (F) unchanged. |
| `CONTENT_GAP_ANALYSIS.md` | Moved restored items (bios + expertise, principles, who/what, terms) into the restored table; narrowed the leadership gap to the still-missing headshot image; updated summary counts. |

Only these four source files changed under `src/` (confirmed via `git status --porcelain -- src`). Shared primitives, Header, Footer, PageHero, CtaBand, Home.tsx, Services.tsx, Contact.tsx, `src/index.css`, `tailwind.config.ts` and SEO config were not touched.

## Content restored (all verbatim from the supplied original copy)

- **Leadership bios** — Kgaogelo Ralephenya (full bio) and Naledi Gongxeka (full bio), rendered in full with no truncation.
- **Expertise labels** — Kgaogelo: External Audit; IFRS, UK GAAP & US GAAP; PCAOB Environments; SOX & Internal Controls; PFMA & MFMA Public-Sector Auditing; Audit Readiness; Financial Analysis; Risk and Control Assessment (8). Naledi: the same minus PCAOB Environments (7).
- **Three business principles** — 01 Financial clarity, 02 Stronger controls, 03 Better decisions.
- **Who can refer** — supporting line + 7 entries.
- **What you can refer** — supporting line + 10 entries.
- **Referral Programme Terms** — 5 numbered terms, verbatim, no reward amounts.

## Verification results

Run from the worktree `c:\SPINCH\KR-Advisory-Group\.worktrees\page-refinement`.

### Gates

- `npx tsc --noEmit` → **exit 0**.
- `npm run build` → **exit 0**; all **5 routes prerendered** (`/`, `/services`, `/about`, `/contact`, `/referral`). The React `fetchPriority` warning from Home's hero `<img>` is pre-existing baseline noise (present in the `5b60459` baseline build), not a regression.

### Content-presence checks (grep of BUILT `dist/*/index.html`)

- `dist/about/index.html` and `dist/referral/index.html` each contain **0** occurrences of `[CLIENT TO SUPPLY]` and `[NOT VERIFIED]`.
- About HTML: both full bios present (distinctive phrases "engagements in the Netherlands and the United Kingdom" and "gained at one of the Big 4 firms."); all **8** Kgaogelo expertise labels and all **7** Naledi labels present; all **3** principle titles present.
- Referral HTML: "Who can refer" + all **7** who-items; "What you can refer" + all **10** what-items; "Referral Programme Terms" + all **5** term phrases present verbatim.
- No reward figures leaked: **0** `R\d` currency matches; every `%` is either `%20` URL-encoding in WhatsApp hrefs or an OKLCH lightness value in an inline style — no reward percentage.
- Single `<h1>` per page confirmed (About: 1, Referral: 1).

### Regression evidence (design protection)

- A clean baseline build of `5b60459` was captured before edits; the built `dist` HTML for `/`, `/services` and `/contact` was diffed against the post-change build. The **only** differences are the per-build asset-hash fingerprints (JS/CSS filenames and `__VITE_REACT_SSG_HASH__`) that change on every rebuild. The rendered body markup of Home, Services and Contact is **byte-identical** otherwise.
- The app CSS bundle grew marginally (21.39 → 21.70 kB) solely because the new expertise-chip utility classes (`border-brass/40`, `text-[11px]`) were emitted. This is additive; no existing rule, token or `src/index.css`/`tailwind.config.ts` was modified.
- `git status --porcelain -- src` lists exactly the four permitted files, confirming Home/Services/Contact/primitives/Header/Footer sources are untouched.

### Screenshots

A headless browser (Playwright/Puppeteer) is **not installed** in this environment, and installing one is outside the permitted file-change scope, so pixel screenshots at 1440/375 were not captured. The deterministic regression gate used instead is the built-HTML diff above (Home/Services/Contact rendered markup unchanged) plus structural inspection of the About/Referral DOM:

- Leadership cards use the existing `Card` with `flex gap-5` and no fixed height; the full bio paragraph and a `flex flex-wrap` chip list sit in the content column, so the card expands with the content (no clipping/overlap possible from a height constraint).
- Principles render in `grid gap-6 md:grid-cols-3` → three columns on desktop, single-column stack below `md`.
- Who/What render in `grid gap-10 md:grid-cols-2` with the second column carrying `md:border-l md:border-border md:pl-16` → two columns + subtle divider on desktop, stacked (no divider) on mobile. No fixed widths, so no horizontal overflow is introduced.
- Programme Terms use `max-w-3xl` rows with `border-t border-border` dividers.

### Links / nav

- Navigation, in-page service deep links, the referral hero CTA and submission CTA, and the final CtaBand are rendered from untouched source/content, so link behaviour is unchanged.

## Content still needing client confirmation

- **Kgaogelo professional headshot image** — the live site uses a real headshot; no approved image exists in the project (`public/` holds only `hero.jpg`, `kr-logo.png`, `robots.txt`, `_redirects`). The brass monogram/initials treatment is retained for both founders. **No photo was fabricated.** Flagged in `CONTENT_GAP_ANALYSIS.md`.
- **Referral reward amounts / eligibility** — none were supplied and none appear in customer-facing copy. The `referral.rewards` placeholder remains in the content module as the gap record but is never rendered.
- **Referral Programme Terms** — restored verbatim but **flagged for final legal/client approval before production publication**.

## Issues

None blocking. One environment limitation noted: no browser-automation tool for pixel screenshots (mitigated by the HTML diff and DOM structure review above).

## Build results

- `npx tsc --noEmit`: exit 0.
- `npm run build`: exit 0, 5/5 routes prerendered, sitemap written (5 urls).
- About built HTML 24.16 → 28.72 KiB, Referral 21.80 → 30.62 KiB (added content); Home/Services/Contact HTML sizes unchanged.

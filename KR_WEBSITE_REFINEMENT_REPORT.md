# KR Advisory Group — Website Refinement Report

**Branch:** `page-refinement` (local only — not merged, not pushed, not deployed)
**Baseline:** `main` @ `4cde85b`
**Architecture (unchanged):** React 18 + TypeScript, Vite via `vite-react-ssg`, Tailwind CSS, pre-rendered to static HTML.

This report documents the refinement of the About, Contact and Referral pages, the
accompanying SEO improvements, and the protected-page regression evidence proving
that Home changed only by the single approved paragraph and Services did not change.

---

## 1. Files modified

Actual source changes on `page-refinement` vs `main` (`git diff --name-status main..HEAD`):

| Status | Path |
| --- | --- |
| Added | `src/components/layout/PageHero.tsx` |
| Added | `src/components/layout/CtaBand.tsx` |
| Modified | `src/content/pages.ts` |
| Modified | `src/content/business.ts` |
| Modified | `src/content/seo.ts` |
| Modified | `src/lib/jsonld.ts` |
| Modified | `src/pages/About.tsx` |
| Modified | `src/pages/Contact.tsx` |
| Modified | `src/pages/Referral.tsx` |

9 files changed, 651 insertions(+), 228 deletions(-).

**No protected file was edited:** `src/pages/Home.tsx`, `src/pages/Services.tsx`,
`src/components/layout/Hero.tsx` and `src/components/cards/ServiceSection.tsx` are
untouched. No shared primitive (`Section`/`Container`/`Card`/`Button`/`FormField`)
and no design token (`src/index.css`, `tailwind.config.ts`) was modified. The single
approved Home change is **data-only** in `src/content/pages.ts` (`home.why.body`).

---

## 2. Pages updated

### About (`src/pages/About.tsx`)
Rebuilt to the premium section order A–F using the new `PageHero`/`CtaBand`, the
existing `Section`/`Container`/`Card`/`AudienceCard` primitives, and restored content:
- **A — PageHero:** eyebrow "ABOUT KR ADVISORY GROUP", H1 "Financial clarity. Stronger businesses.", supporting = verified `about.intro`, reusing the verified architectural hero image. (Single H1.)
- **B — "Who We Are":** editorial two-column (heading | `about.body` + `about.belief`) on `bg-surface-ivory`, stacking on mobile.
- **C — "Our Leadership":** typographic founder cards (brass-circle monogram, **no portraits**) from verified names/credentials/titles; bios shown as a clearly-labelled "[CLIENT TO SUPPLY] Founder bio pending client confirmation." placeholder.
- **D — "How We Work":** clearly-labelled client-confirmation placeholder (no fabricated process).
- **E — "Who We Help":** `audiences` data + `AudienceCard` 3-up grid.
- **F — CtaBand:** "Let's strengthen your business together." → `/contact`.

### Contact (`src/pages/Contact.tsx`)
Rebuilt to section order A–E while **preserving the existing working form exactly**:
- **A — PageHero:** eyebrow "LET'S TALK ABOUT YOUR BUSINESS", H1 "Let's start a conversation."
- **B — Two-column:** verified `contact.intro` + verified details (mailto, WhatsApp via `wa.me`, office address) on the left; the **existing enquiry form** on the right.
- **C — Alternative contact methods:** Email / WhatsApp / Consultation cards, each with a valid link.
- **D — FAQ accordion:** the one verified Q&A + closing line.
- **E — Location:** address text only; **no** map embed, **no** business hours (both unverified — logged in `CONTENT_GAP_ANALYSIS.md`).

The enquiry form is behaviour-identical to baseline: Name / Email / Service / Message
fields, `EMAIL_RE` validation, `validate()`, `handleSubmit()`, the submitted-state
behaviour, accessible `FormField` labels, and the `[NOT VERIFIED]` placeholder-submit
comment are all preserved. **No endpoint was invented.**

### Referral (`src/pages/Referral.tsx`)
Rebuilt to section order A–F:
- **A — PageHero:** eyebrow "REFERRAL PROGRAMME", H1 "Great connections. Stronger businesses.", primary CTA "Refer a Business".
- **B — Programme Overview:** verified `referral.intro`.
- **C — "How Referrals Work":** **omitted** (no verified steps; nothing fabricated).
- **D — Reward Structure:** **omitted from public copy** — the `[CLIENT TO SUPPLY]` reward block does not render (gap logged in `CONTENT_GAP_ANALYSIS.md`).
- **E — submission CTA:** verified `referral.cta` block ("Ready to make a referral?").
- **F — final CtaBand:** "Know a business that could benefit from better financial guidance?" → "Refer a Business".

---

## 3. Content restored (verbatim)

Recovered verbatim from the live site into `src/content/*.ts` and now rendered:
About intro / body / belief and leadership names+credentials+titles; Contact intro,
the single FAQ Q&A + closing, and verified contact details (address, WhatsApp/phone
073 499 7148, email Kralephenya@kradvisorygroup.co.za); Referral intro/overview and
the submission CTA block; and the approved Home "Why" paragraph. See
`CONTENT_GAP_ANALYSIS.md` for the full itemised list.

---

## 4. Information still needing client confirmation

Seven items remain unavailable and are documented in **`CONTENT_GAP_ANALYSIS.md`**:
founder bios, About "How We Work", Referral "How Referrals Work", Referral Reward
Structure (amounts/eligibility/terms), business hours, map/location embed, and the
Contact form submission endpoint + exact field set. None were fabricated — each is a
clearly-labelled placeholder or an omitted section.

Verified in the built output: `dist/contact/index.html` and `dist/referral/index.html`
contain **0** occurrences of "CLIENT TO SUPPLY" / "NOT VERIFIED"; `dist/about/index.html`
contains the one deliberate, clearly-labelled founder-bio placeholder.

---

## 5. UI / UX changes

- **New reusable layout components:** `PageHero` (interior hero mirroring the Services
  hero pattern — full-bleed image, overlay, grid, brass eyebrow + rule, light serif
  H1) and `CtaBand` (full-bleed navy `bg-ink` call-to-action band), used across About,
  Contact and Referral for a consistent premium rhythm.
- **Section rhythm** reuses existing tokens/utilities only (`bg-ink`,
  `bg-surface-ivory`/`stone`, `text-brass-deep`, `font-display`, `Section`/`Container`
  spacing). No new theme or global CSS was introduced.
- **Accessibility:** one H1 per route; logical H2/H3 order; the Footer stays global
  (no page adds a second `<footer>`); the FAQ is a keyboard-operable accordion.

---

## 6. SEO changes

- **`src/content/seo.ts`:** unique `<title>` + meta description for `/about`,
  `/contact` and `/referral` only. The `/` and `/services` entries were left
  unchanged (confirmed below).
- **`src/lib/jsonld.ts`:** added a `ContactPoint`/`PostalAddress`-based builder and a
  `FAQPage` builder, both from verified facts only, wired into Contact alongside the
  existing breadcrumbs. About keeps its `Person` (founders) + `BreadcrumbList` JSON-LD.
- **Internal links:** About, Contact and Referral link to the matching
  `/services#<id>` anchors (ids match `src/content/services.ts`).

---

## 7. Functional tests

- **Enquiry form:** behaviour preserved — empty submit surfaces field errors via
  `validate()`; a valid submit shows the existing success state; the `[NOT VERIFIED]`
  placeholder submit remains (no real endpoint).
- **FAQ accordion:** real `<button>` toggling `aria-expanded`, controlling the panel
  via `aria-controls`; keyboard-operable (Enter/Space); exposes only the one verified
  Q&A.
- **Mobile navigation:** the visual-QA interaction test at 360px found the toggle,
  opened the menu, and counted 36 visible links — `{"toggleFound":true,"opened":true,"linksVisible":36}`.
- **Build/typecheck:** `npx tsc --noEmit` passes clean; `npm run build` succeeds and
  prerenders all five routes. (The `fetchPriority` SSG warning originates from the
  protected Home/`Hero.tsx` and is pre-existing baseline behaviour, unrelated to this
  work.)

---

## 8. Screenshot + regression results

### Full QA — `qa-screenshots/diagnostics.json`
Served `dist/` on `http://127.0.0.1:4178` and ran `node src/scripts/visual-qa.mjs`
(QA_BASE=http://127.0.0.1:4178). Result: **POTENTIAL ISSUES: []**. All 30 route
entries (5 routes × 6 viewports: 360/390/768/1024/1440/1920) are clean:

| Route | h1Count | horizontalOverflow | header | footer | waCtas |
| --- | --- | --- | --- | --- | --- |
| home | 1 | false | true | true | 6 |
| services | 1 | false | true | true | 17 |
| about | 1 | false | true | true | 3 |
| contact | 1 | false | true | true | 6 |
| referral | 1 | false | true | true | 3 |

No entry has `horizontalOverflow:true`, `h1Count != 1`, `header:false` or
`footer:false`.

### Protected-page regression — screenshots
Captured fresh Home + Services screenshots at 1440 and 390 via
`node .agents/tasks/page-refinement/screenshot-baseline.mjs` and compared them
pixel-by-pixel against the reference baselines:

| Screenshot | Reference dims | Fresh dims | Pixel diff |
| --- | --- | --- | --- |
| `services-baseline-1440.png` | 1440×4327 | 1440×4327 | **0 pixels (identical)** |
| `services-baseline-390.png` | 390×7200 | 390×7200 | **0 pixels (identical)** |
| `home-baseline-1440.png` | 1440×3790 | 1440×3874 | taller: paragraph wraps to more lines |
| `home-baseline-390.png` | 390×5111 | 390×5335 | taller: paragraph wraps to more lines |

Services renders **pixel-for-pixel identical** at both viewports. Home's rendered
height increased because the approved replacement paragraph is longer than the former
one-line `[CLIENT TO SUPPLY]` placeholder, so it wraps to additional lines and pushes
subsequent sections down. Because a vertical shift makes a whole-page pixel compare
report cascading differences, the **authoritative** proof of "only the paragraph
changed" is the HTML diff below.

### Protected-page regression — HTML diff (authoritative)
Compared the built HTML against the committed baselines (asset-hash tokens normalised,
since the shared bundle hash moves whenever any page's code changes):

- **Home — `dist/index.html` vs `.agents/tasks/page-refinement/home-baseline.html`:**
  **exactly one line differs.** Baseline:
  `[CLIENT TO SUPPLY] Body copy explaining support for SMEs, audit preparation, and public institutions.`
  Dist: the approved verified paragraph
  (`At KR Advisory Group, we help organisations manage their finances … we provide practical solutions tailored to your organisation.`).
  Every other line is identical.
- **Services — `dist/services/index.html` vs `services-baseline.html`:** **identical**
  after asset-hash normalisation (0 content lines added or removed). The only raw byte
  difference is the hashed bundle filenames (`app-C_Yrw3v1.js`/`.css` →
  `app-T8s3wd9R.js`/`CcN9wuOd.css`), a global Vite build artifact that changes for
  every page when any page's code changes and does not alter Services' markup or
  rendering — consistent with the 0-pixel screenshot result above.

---

## 9. Explicit protected-page confirmation

- **Home is unchanged except for the single approved paragraph.** Evidence: the
  `dist/index.html` vs `home-baseline.html` diff shows exactly one differing line (the
  approved `home.why.body` replacement); the screenshot height delta is solely the
  longer paragraph wrapping. No design, component, styling, layout, typography,
  imagery, animation or functionality was altered.
- **Services is visually unchanged.** Evidence: `services-baseline-1440.png` and
  `services-baseline-390.png` compare **pixel-for-pixel identical** (0 changed pixels),
  and `dist/services/index.html` matches `services-baseline.html` with no content
  differences — the only raw difference is the global hashed-asset filename, which is a
  build artifact, not a content or visual change.

---

## 10. Unresolved issues

- The seven content gaps in `CONTENT_GAP_ANALYSIS.md` need client input before the
  placeholders/omitted sections can be finalised (notably the Contact form endpoint
  and the Referral Reward Structure).
- The pre-existing `fetchPriority` SSG warning on Home/`Hero.tsx` is baseline
  behaviour and out of scope for this refinement (the Home hero is protected).
- No deployment or merge was performed, by instruction. The branch is ready for client
  review.

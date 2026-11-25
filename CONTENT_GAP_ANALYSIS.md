# Content Gap Analysis — KR Advisory Group Website Refinement

This document records every content item on the refined pages (About, Contact,
Referral) that is either **restored verbatim** from the live site or **unavailable
and requiring client confirmation**. Items marked "unavailable" are rendered as
clearly-labelled placeholders (or omitted entirely for the Referral Reward
Structure) and are **never fabricated**, per the implementation requirement to
document missing information for client confirmation rather than inventing content.

- **Verified source** `live site` = recovered verbatim from the client's original
  published website and captured in `src/content/*.ts`.
- **Verified source** `NOT VERIFIED` = no reliable source exists; must be supplied
  or confirmed by the client before publication.
- The restored items were approved as part of this refinement and need **no further
  approval**. The gaps need client input before the placeholder copy can be replaced.

## Gaps requiring client confirmation

| Page/Section | Current local content | Original website content | Missing/incomplete | Verified source | Proposed restoration | Client approval needed |
| --- | --- | --- | --- | --- | --- | --- |
| About — Our Leadership (founder **headshot image**) | Brass monogram/initials treatment retained for both founders; **no portrait photo**. | The live site uses a real professional headshot for Kgaogelo Ralephenya. | The actual professional headshot image file(s). | NOT VERIFIED | Client to supply the approved headshot image(s); until then the monogram treatment stays. No photo is ever fabricated. | Yes |
| Referral — "How Referrals Work" | Section omitted from the public page (no fabricated steps rendered). | No referral process steps found on the live site. | The step-by-step referral workflow. | NOT VERIFIED | Client to confirm the steps; section stays omitted until confirmed. | Yes |
| Referral — Reward Structure (amounts/eligibility/terms) | **Omitted** from public copy — the `[CLIENT TO SUPPLY]` reward block does **not** render on the live Referral page (verified: `dist/referral/index.html` contains 0 occurrences of "CLIENT TO SUPPLY" / "NOT VERIFIED"). | No reward amounts, eligibility rules or terms appear anywhere on the live site. | Reward amounts, eligibility criteria and programme terms. | NOT VERIFIED | Client to supply the reward structure; publish only after confirmation. Do not publish any figure until then. | Yes |
| Contact / Footer — Business hours | Not published on any page. | No business hours found on the live site. | Opening hours. | NOT VERIFIED | Client to supply hours; add to Contact "Location" and/or LocalBusiness JSON-LD once confirmed. | Yes |
| Contact — Map / location embed | Address text only in an `<address>` element; **no** map embed. | No map embed found on the live site. | Interactive map / exact geo-coordinates. | NOT VERIFIED | Client to confirm the precise location/coordinates before adding a map embed. | Yes |
| Contact — Enquiry form submission endpoint + exact field set | Existing working form preserved exactly: Name / Email / Service (select) / Message fields, `EMAIL_RE` validation, `validate()`, `handleSubmit()`, success-state behaviour, and the `[NOT VERIFIED]` placeholder-submit comment. No real endpoint invented. | The original form's submission destination and canonical field set were not verifiable. | The real form POST endpoint (and confirmation of the intended field set). | NOT VERIFIED | Client to supply the submission endpoint; wire it into `handleSubmit()` and confirm fields. Until then the placeholder submit remains. | Yes |

## Restored items (verbatim from the live site — no further approval needed)

| Page/Section | Current local content | Original website content | Missing/incomplete | Verified source | Proposed restoration | Client approval needed |
| --- | --- | --- | --- | --- | --- | --- |
| Home — "Why KR Advisory Group" body paragraph | The approved verified paragraph (`pages.ts` `home.why.body`), replacing the former `[CLIENT TO SUPPLY]` placeholder. This is the single approved Home copy change. | Verified original copy: "At KR Advisory Group, we help organisations manage their finances… we provide practical solutions tailored to your organisation." | None — restored. | live site (client-approved) | Already restored verbatim. | No |
| About — intro | `about.intro`: "KR Advisory Group is a CA(SA)-led practice serving growing businesses and public institutions across South Africa." | Same, verbatim. | None — restored. | live site | Already restored verbatim. | No |
| About — body | `about.body`: "We help organisations manage their finances, strengthen their internal controls, prepare for audits and make informed financial decisions…" | Same, verbatim. | None — restored. | live site | Already restored verbatim. | No |
| About — belief statement | `about.belief`: "Our work is led by Chartered Accountants and built on a simple belief: accounting should do more than keep you compliant — it should give you the clarity and control to run a stronger organisation." | Same, verbatim. | None — restored. | live site | Already restored verbatim. | No |
| About — leadership names/credentials/titles | Kgaogelo Ralephenya, CA(SA) — Co-Founder & Managing Director; Naledi Gongxeka, CA(SA) — Co-Founder. | Same, verbatim. | None — restored. Only the headshot image is still missing (see gaps table). | live site | Already restored verbatim (names/titles only). | No |
| About — Our Leadership (founder bios + expertise) | Full biographies for both founders rendered under each card (cards expand naturally, no truncation), plus the expertise-label chip lists — Kgaogelo (8 labels), Naledi (7 labels). Source: `content/business.ts` `leadership[].bio` / `.expertise`. | Same, verbatim (bios and expertise labels recovered from the original site). | None — restored. | live site | Already restored verbatim. | No |
| About — "How We Work" (three business principles) | Three-column numbered-card grid (01 Financial clarity, 02 Stronger controls, 03 Better decisions) under the retained "How We Work" heading. Source: `pages.ts` `about.principles`. | Same, verbatim (three principles). | None — restored. | live site | Already restored verbatim. | No |
| Referral — "Who can refer" | New section after Programme Overview with supporting line "Our professional networks are at the heart of the programme." and the 7 professional-network entries as a gold-check list. Source: `pages.ts` `referral.whoCanRefer`. | Same, verbatim (7 entries). | None — restored. | live site | Already restored verbatim. | No |
| Referral — "What you can refer" | Second column alongside "Who can refer" (two columns desktop, stacked mobile) with supporting line "Businesses or organisations requiring:" and the 10 service-need entries. Source: `pages.ts` `referral.whatYouCanRefer`. | Same, verbatim (10 entries). | None — restored. | live site | Already restored verbatim. | No |
| Referral — "Referral Programme Terms" | New ivory section with gold uppercase eyebrow and 5 numbered terms (01–05) on subtle row dividers; **no reward amounts/percentages**. Source: `pages.ts` `referral.programmeTerms`. | Same, verbatim (5 terms). | None — content restored. | live site | Restored verbatim. **Flagged for final legal/client approval before production publication.** | Yes (legal/client sign-off before go-live) |
| Contact — intro | `contact.intro`: "We would be pleased to discuss your business or organisation's requirements — accounting, tax, internal audit, audit readiness, business advisory or funding preparation." | Same, verbatim. | None — restored. | live site | Already restored verbatim. | No |
| Contact — FAQ (one Q&A + closing) | Verified Q "How do I get started / book a consultation?" with its verified answer and closing line, in an accessible accordion. | Same, verbatim (single Q&A). | None — restored (no extra Q&As invented). | live site | Already restored verbatim. | No |
| Contact — verified details | Office address "64 Eagle Street, Kikuyu Estate, Waterfall, Midrand, Johannesburg"; WhatsApp/phone 073 499 7148; email Kralephenya@kradvisorygroup.co.za. | Same, verbatim. | None — restored. | live site | Already restored verbatim. | No |
| Referral — intro / programme overview | `referral.intro`: "Our referral programme rewards the professionals and contacts who connect us with businesses that need accounting, tax, internal audit, audit-readiness or business advisory support." | Same, verbatim. | None — restored. | live site | Already restored verbatim. | No |
| Referral — submission CTA block | "Ready to make a referral?" + body "Send us the details of the business or organisation, and we will take it from there." + button "Refer a Business". | Same, verbatim. | None — restored. | live site | Already restored verbatim. | No |

## Summary

- **6 open gaps** require client confirmation before the corresponding placeholder
  (or omitted) content can be finalised: the founder **headshot image**, Referral
  "How Referrals Work", Referral Reward Structure (amounts/eligibility), business
  hours, map/location embed, and the Contact form endpoint + field set.
- **16 restored content groups** were recovered verbatim from the live site and need
  no further approval, with one exception: the **Referral Programme Terms** are
  restored verbatim but **flagged for final legal/client sign-off before production**.
- This refinement restored: both founder biographies and their expertise labels
  (Kgaogelo 8, Naledi 7), the three business principles in "How We Work", and the
  Referral "Who can refer" (7), "What you can refer" (10) and "Referral Programme
  Terms" (5) sections. The former About bio placeholder and "How We Work" placeholder
  are resolved and removed from the content modules.
- No reward figures, bios, process steps, hours or map data were fabricated. Where a
  value was unavailable it remains either a clearly-labelled gap (founder headshot
  image) or omitted from public copy (Referral Reward Structure amounts, "How
  Referrals Work" steps, map, hours). No reward amount appears in any customer-facing
  copy.

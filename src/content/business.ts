/**
 * Verified business information — verbatim from CONTENT_INVENTORY.md
 * ("Verified business information" + "Global components").
 * Do NOT fabricate or alter. Items the inventory marks [NOT VERIFIED]
 * (leadership bios/photos, form endpoint/fields, referral reward terms,
 * analytics ownership) are intentionally absent and must be supplied by
 * the client — never invented.
 */

export const SITE_URL = 'https://www.kradvisorygroup.co.za';

export const business = {
  name: 'KR Advisory Group',
  positioning: 'CA(SA)-led · Accounting · Tax · Internal Audit',
  tagline: 'Financial clarity. Stronger controls. Better business decisions.',
  address: '64 Eagle Street, Kikuyu Estate, Waterfall, Midrand, Johannesburg',
  locality: 'CA(SA)-led · Midrand, Johannesburg',
  brandLine:
    'CA(SA)-led · Financial Clarity. Stronger Controls. Better Business Decisions.',
  phoneDisplay: '073 499 7148',
  whatsapp: {
    number: '27734997148',
    url: 'https://wa.me/27734997148',
    e164: '+27734997148',
    // Prefilled WhatsApp messages observed on the live site.
    consultationUrl:
      'https://wa.me/27734997148?text=I%20would%20like%20to%20book%20a%20consultation.',
    questionUrl: 'https://wa.me/27734997148?text=I%20have%20a%20question.',
  },
  emails: {
    general: 'info@kradvisorygroup.co.za',
    ralephenya: 'kralephenya@kradvisorygroup.co.za',
    gongxeka: 'ngongxeka@kradvisorygroup.co.za',
  },
  copyright: '© 2026 KR Advisory Group. All rights reserved.',
} as const;

/**
 * Grouped contact details for the Contact/Referral pages. Reuses ONLY the
 * verified values already defined above (verbatim from the live site) — no new
 * facts are introduced here. The primary enquiry email on the live site's
 * contact copy is kralephenya@kradvisorygroup.co.za.
 */
export const contactDetails = {
  address: business.address,
  phoneDisplay: business.phoneDisplay,
  whatsappUrl: business.whatsapp.url,
  whatsappConsultationUrl: business.whatsapp.consultationUrl,
  whatsappQuestionUrl: business.whatsapp.questionUrl,
  email: business.emails.ralephenya,
} as const;

export const leadership = [
  {
    name: 'Kgaogelo Ralephenya',
    credential: 'CA(SA)',
    title: 'Co-Founder & Managing Director',
    email: 'kralephenya@kradvisorygroup.co.za',
    // Verbatim: recovered founder biography from the original live site.
    bio: 'Kgaogelo Ralephenya is a Chartered Accountant of South Africa (CA(SA)) and co-founder and Managing Director of KR Advisory Group. He is a graduate of the University of the Witwatersrand, holding a Bachelor of Accounting Science and a Postgraduate Diploma in Accountancy. He has experience across external audit, financial reporting, internal controls and public-sector auditing, gained within a Big 4 firm with engagements in the Netherlands and the United Kingdom. He has worked on UK, US and South African listed clients across IFRS, UK GAAP and US GAAP reporting, in PCAOB, SOX and other regulated control environments, and on PFMA and MFMA public-sector audits. He leads the firm\u2019s work with growing businesses and public institutions across South Africa.',
    // Verbatim: recovered expertise labels (8, exact order) from the live site.
    expertise: [
      'External Audit',
      'IFRS, UK GAAP & US GAAP',
      'PCAOB Environments',
      'SOX & Internal Controls',
      'PFMA & MFMA Public-Sector Auditing',
      'Audit Readiness',
      'Financial Analysis',
      'Risk and Control Assessment',
    ],
  },
  {
    name: 'Naledi Gongxeka',
    credential: 'CA(SA)',
    title: 'Co-Founder',
    email: 'ngongxeka@kradvisorygroup.co.za',
    // Verbatim: recovered founder biography from the original live site.
    bio: 'Naledi Gongxeka is a Chartered Accountant of South Africa (CA(SA)) and co-founder of KR Advisory Group. He is a graduate of the University of the Witwatersrand, holding a Bachelor of Accounting Science and a Postgraduate Diploma in Accountancy. His experience spans external audit, financial reporting, internal controls and public-sector auditing, gained at one of the Big 4 firms.',
    // Verbatim: recovered expertise labels (7, exact order) from the live site.
    expertise: [
      'External Audit',
      'IFRS, UK GAAP & US GAAP',
      'SOX & Internal Controls',
      'PFMA & MFMA Public-Sector Auditing',
      'Audit Readiness',
      'Financial Analysis',
      'Risk and Control Assessment',
    ],
  },
] as const;

export const socials = [
  {
    label: 'LinkedIn',
    url: 'http://www.linkedin.com/in/kr-advisory-group-pty-ltd-52a532440',
  },
  { label: 'Instagram', url: 'https://www.instagram.com/kradvisorygroup' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@kr.advisory.group' },
  { label: 'YouTube', url: 'https://www.youtube.com/@kradvisorygroup' },
  { label: 'X (Twitter)', url: 'https://x.com/KRAdvisorygroup' },
] as const;

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Referral', href: '/referral' },
] as const;

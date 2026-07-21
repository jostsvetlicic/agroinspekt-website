/**
 * ============================================================================
 *  CENTRAL BRAND CONFIG  -  Agroinspekt d.o.o.
 * ----------------------------------------------------------------------------
 *  Re-skin the entire site from this one file: brand identity, palette,
 *  contact/office details, navigation and social links.
 *  Long-form + bilingual copy lives in `src/i18n/*` and `src/config/*`.
 * ============================================================================
 */

export const brand = {
  name: "Agroinspekt",
  legalName: "AGROINSPEKT d.o.o.",
  descriptorEn:
    "Independent third-party inspection, survey, sampling and testing.",
  descriptorSi:
    "Neodvisni tretji-stranski nadzor, pregledi, vzorčenje in testiranje.",
  domain: "agroinspekt.si",
  email: "operations@agroinspekt.si",
} as const;

/**
 * WhatsApp contact - the Koper port-operations line, WhatsApp-enabled.
 * Single source of truth: change the number/messages here only. Components
 * build the deep link via `whatsappHref(locale)` (see below) so the prefilled
 * opening message follows the visitor's language and is correctly URL-encoded.
 */
export const whatsapp = {
  number: "38631686212", // international format, no "+" (wa.me requirement)
  link: "https://wa.me/38631686212",
  prefill: {
    en: "Hello, I would like to request an inspection.",
    si: "Pozdravljeni, rad bi povprašal za nadzor.",
  },
} as const;

/**
 * Palette tokens - mirrored in tailwind.config.ts for utility classes.
 * Light theme. Primary green (#139E3E) sampled directly from the client logo.
 */
export const palette = {
  white: "#FFFFFF",
  offwhite: "#F6F8F7",
  ink: "#1A2332", // deep navy-charcoal - headlines, footer, dark bands
  grey: "#6B7785", // cool grey - body text
  green: "#139E3E", // primary brand green (from logo)
  greenDeep: "#0C7A31", // links / hover / small text on white
  line: "#E4E9E7", // hairline
} as const;

/** Real brand logo files (in /public/logo). */
export const logos = {
  dark: "/logo/agroinspect-logo.png", // coloured logo for light backgrounds
  white: "/logo/agroinspect-logo-white.png", // white logo for dark backgrounds
  aspect: 500 / 106, // intrinsic width / height
} as const;

/** Office locations - REAL details, use exactly as provided by the client. */
export const offices = [
  {
    id: "ljubljana",
    city: "Ljubljana",
    role: { en: "Head Office", si: "Sedež podjetja" },
    company: "AGROINSPEKT d.o.o.",
    street: "Na Stolbi 1",
    postal: "1000 Ljubljana",
    country: { en: "Slovenia", si: "Slovenija" },
    phone: "+386 41 610 578",
    phoneHref: "+38641610578",
    emails: ["operations@agroinspekt.si"],
    // Approx. coordinates for map pin (Ljubljana centre).
    coords: { lat: 46.0509, lng: 14.5083 },
  },
  {
    id: "koper",
    city: "Koper",
    role: { en: "Port Operations", si: "Pristaniške operacije" },
    company: "AGROINSPEKT d.o.o.",
    street: "Ankaranska 7",
    postal: "6000 Koper",
    country: { en: "Slovenia", si: "Slovenija" },
    phone: "+386 31 686 212",
    phoneHref: "+38631686212",
    emails: ["matej.jesenko@agroinspekt.si", "operations@agroinspekt.si"],
    // Approx. coordinates near Port of Koper.
    coords: { lat: 45.5481, lng: 13.7302 },
    emphasis: true, // Operational advantage - emphasise on the map.
  },
] as const;

export type Locale = "en" | "si";
export const locales: Locale[] = ["en", "si"];
export const defaultLocale: Locale = "en";

/** WhatsApp deep link with a language-appropriate, URL-encoded opening message. */
export const whatsappHref = (locale: Locale): string =>
  `${whatsapp.link}?text=${encodeURIComponent(whatsapp.prefill[locale])}`;

export const navLinks = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
] as const;

import { locales, defaultLocale, type Locale } from "@/config/site";

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function normalizeLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** Build a locale-prefixed href, e.g. localePath("si", "/about") -> "/si/about" */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/**
 * Read a locale-map JSON string (e.g. '{"en":"Grain","si":"Žito"}') for the
 * given locale, falling back to the default locale, then any value. This is the
 * translation layer for admin-managed content — adding a language is just
 * another key in the map.
 */
export function tr(field: string | null | undefined, locale: Locale): string {
  if (!field) return "";
  try {
    const map = JSON.parse(field) as Record<string, unknown>;
    const v = map[locale] ?? map[defaultLocale] ?? Object.values(map)[0];
    return typeof v === "string" ? v : v == null ? "" : String(v);
  } catch {
    return field; // tolerate plain (non-JSON) legacy values
  }
}

/** Same as `tr`, but for string-array fields (covers, methods, …). */
export function trArr(field: string | null | undefined, locale: Locale): string[] {
  if (!field) return [];
  try {
    const map = JSON.parse(field) as Record<string, unknown>;
    const v = map[locale] ?? map[defaultLocale] ?? Object.values(map)[0] ?? [];
    return Array.isArray(v) ? (v as string[]) : [];
  } catch {
    return [];
  }
}

/** Build a locale-map object from a builder run for every configured locale. */
export function buildLocaleMap<T>(build: (l: Locale) => T): Record<Locale, T> {
  return Object.fromEntries(locales.map((l) => [l, build(l)])) as Record<Locale, T>;
}

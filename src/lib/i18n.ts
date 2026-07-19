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

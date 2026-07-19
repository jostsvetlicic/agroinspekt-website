import Link from "next/link";
import { headers } from "next/headers";
import { defaultLocale, navLinks, type Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/lib/i18n";

const copy = {
  en: {
    eyebrow: "Error 404",
    title: "This page could not be found",
    lead: "The page you are looking for may have been moved, renamed, or never existed. Let us point you back to solid ground.",
    home: "Back to home",
    explore: "Or explore",
  },
  si: {
    eyebrow: "Napaka 404",
    title: "Te strani ni bilo mogoče najti",
    lead: "Stran, ki jo iščete, je bila morda premaknjena, preimenovana ali pa ni nikoli obstajala. Pot nazaj vam pokažemo tukaj.",
    home: "Nazaj na domačo stran",
    explore: "Ali raziščite",
  },
} as const;

/**
 * Branded, bilingual 404. Rendered inside the [locale] layout, so it inherits
 * the site nav and footer. not-found boundaries do not receive route params,
 * so the active locale arrives via the `x-locale` header set in middleware.
 */
export default async function LocaleNotFound() {
  const seg = (await headers()).get("x-locale") ?? "";
  const locale: Locale = isLocale(seg) ? seg : defaultLocale;
  const c = copy[locale];
  const nav = getDict(locale).nav;

  return (
    <section className="section">
      <div className="container-x">
        <div className="mx-auto flex max-w-2xl flex-col items-center py-10 text-center md:py-20">
          <span className="eyebrow">{c.eyebrow}</span>
          <p className="mt-8 font-display text-[6rem] font-semibold leading-none tracking-tight text-ink md:text-[9rem]">
            404
          </p>
          <h1 className="mt-6 font-display text-2xl font-medium text-ink md:text-3xl">
            {c.title}
          </h1>
          <p className="mt-4 max-w-md leading-relaxed text-grey">{c.lead}</p>

          <Link href={`/${locale}`} className="btn-primary mt-10">
            {c.home}
          </Link>

          <div className="mt-12 w-full border-t border-line pt-8">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-grey-light">
              {c.explore}
            </p>
            <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {navLinks.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className="link-green text-sm"
                >
                  {nav[item.key]}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

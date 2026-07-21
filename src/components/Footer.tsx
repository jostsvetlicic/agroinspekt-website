import Link from "next/link";
import type { Locale } from "@/config/site";
import { brand, navLinks, offices, whatsappHref } from "@/config/site";
import { services } from "@/config/services";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/lib/i18n";
import Logo from "./Logo";
import { Mail, Phone, Pin, WhatsApp } from "./Icons";

export default function Footer({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const t = d.footer;
  const nav = d.nav;
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="bg-ink text-white">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo variant="white" height={30} />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              {t.descriptor}
            </p>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="eyebrow eyebrow-on-dark mb-5">{t.explore}</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.key}>
                  <Link
                    href={localePath(locale, l.href)}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {nav[l.key as keyof typeof nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="eyebrow eyebrow-on-dark mb-5">{t.servicesCol}</h4>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={localePath(locale, `/services/${s.slug}`)}
                    className="text-white/70 transition-colors hover:text-white"
                  >
                    {s[locale].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="lg:col-span-3">
            <h4 className="eyebrow eyebrow-on-dark mb-5">{t.offices}</h4>
            <div className="space-y-6 text-sm">
              {offices.map((o) => (
                <div key={o.id}>
                  <p className="font-medium text-white">
                    {o.company}, {o.city}
                  </p>
                  <p className="mt-1 flex items-start gap-2 text-white/60">
                    <Pin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green" />
                    {o.street}, {o.postal}, {o.country[locale]}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-white/60">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-green" />
                    <a
                      href={`tel:${o.phoneHref}`}
                      className="tabular hover:text-white"
                    >
                      {o.phone}
                    </a>
                  </p>
                  {"emphasis" in o && o.emphasis && (
                    <p className="mt-1 flex items-center gap-2 text-white/60">
                      <WhatsApp className="h-3.5 w-3.5 shrink-0 text-green" />
                      <a
                        href={whatsappHref(locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white"
                      >
                        {d.common.whatsapp}
                      </a>
                    </p>
                  )}
                  {o.emails.map((e) => (
                    <p
                      key={e}
                      className="mt-1 flex items-center gap-2 text-white/60"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-green" />
                      <a href={`mailto:${e}`} className="hover:text-white">
                        {e}
                      </a>
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center">
          <p>
            © {year} {brand.legalName} {t.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={localePath(locale, "/privacy")}
              className="hover:text-white"
            >
              {t.legalPrivacy}
            </Link>
            <span className="text-white/35">{t.builtNote}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

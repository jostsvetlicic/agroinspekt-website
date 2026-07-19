import Link from "next/link";
import type { Locale } from "@/config/site";
import { services } from "@/config/services";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/lib/i18n";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

export default function ServicesGrid({ locale }: { locale: Locale }) {
  const t = getDict(locale).services;
  const eyebrow = locale === "si" ? "Kaj pregledujemo" : "What we inspect";

  return (
    <section className="section section-alt">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow">{eyebrow}</span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="display mt-5 text-3xl leading-[1.12] sm:text-4xl">
                {t.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <Link
              href={localePath(locale, "/services")}
              className="link-green inline-flex items-center gap-2 text-sm font-medium"
            >
              {t.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i % 4}>
              <ServiceCard service={s} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

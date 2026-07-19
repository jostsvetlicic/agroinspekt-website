import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/config/site";
import { locales } from "@/config/site";
import { services, getService } from "@/config/services";
import { projects } from "@/config/projects";
import { getDict } from "@/i18n/dictionaries";
import { isLocale, localePath } from "@/lib/i18n";
import { media } from "@/config/media";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PlaceholderNote from "@/components/PlaceholderNote";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import CtaBand from "@/components/CtaBand";
import { ServiceIcons, Check, ArrowRight } from "@/components/Icons";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const s = getService(slug);
  if (!s) return {};
  const c = s[locale];
  return { title: c.title, description: c.tagline };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const service = getService(slug);
  if (!service) notFound();

  const c = service[l];
  const t = getDict(l).servicePage;
  const nav = getDict(l).nav;
  const Icon = ServiceIcons[service.icon];
  const img = media.service[service.slug];

  const relatedProjects = projects.filter((p) => p.serviceSlug === slug);
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  const standardsHaveTodo = c.standards.some((s) => s.includes("TODO"));

  const columns: { title: string; items: string[] }[] = [
    { title: t.covers, items: c.covers },
    { title: t.commodities, items: c.commodities },
    { title: t.methods, items: c.methods },
  ];

  return (
    <>
      <PageHero
        locale={l}
        eyebrow={getDict(l).services.eyebrow}
        title={c.title}
        lead={c.intro}
        image={img.src}
        imageAlt={img.alt}
        crumbs={[
          { label: nav.services, href: "/services" },
          { label: c.title },
        ]}
      />

      <section className="section">
        <div className="container-x">
          {/* Icon marker */}
          <Reveal>
            <span className="grid h-14 w-14 place-items-center rounded-xl border border-green/30 bg-green-soft text-green-deep">
              <span className="h-7 w-7">
                <Icon />
              </span>
            </span>
          </Reveal>

          {/* Three content columns */}
          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {columns.map((col, ci) => (
              <Reveal key={col.title} delay={ci}>
                <div>
                  <h2 className="eyebrow">{col.title}</h2>
                  <ul className="mt-6 space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-grey">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Standards */}
          <Reveal>
            <div className="mt-14 rounded-xl border border-line bg-offwhite p-8">
              <h2 className="eyebrow">{t.standards}</h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {c.standards.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-line bg-white px-4 py-2 text-sm text-ink"
                  >
                    {s.replace(/\s*\(TODO\[CLIENT\].*$/i, "")}
                  </li>
                ))}
              </ul>
              {standardsHaveTodo && (
                <div className="mt-6">
                  <PlaceholderNote label="For the client">
                    Confirm exact accreditations, memberships and standard
                    references for this service. Some are shown as
                    industry-typical placeholders.
                  </PlaceholderNote>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="section border-t border-line section-alt">
          <div className="container-x">
            <h2 className="eyebrow">{getDict(l).projects.eyebrow}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((p, i) => (
                <Reveal key={p.slug} delay={i % 3}>
                  <ProjectCard project={p} locale={l} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other services */}
      <section className="section border-t border-line">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <h2 className="eyebrow">{t.otherServices}</h2>
            <Link
              href={localePath(l, "/services")}
              className="link-green inline-flex items-center gap-2 text-sm"
            >
              {getDict(l).services.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s, i) => (
              <Reveal key={s.slug} delay={i}>
                <ServiceCard service={s} locale={l} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={l} title={t.ctaTitle} text={t.ctaText} />
    </>
  );
}

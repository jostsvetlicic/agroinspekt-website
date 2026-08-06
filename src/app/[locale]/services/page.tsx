import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/config/site";
import { getServices } from "@/lib/services";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import Capability from "@/components/sections/Capability";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale).services;
  return { title: d.eyebrow, description: d.lead };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getDict(l).services;
  const nav = getDict(l).nav;
  const services = await getServices();

  return (
    <>
      <PageHero
        locale={l}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        crumbs={[{ label: nav.services }]}
      />

      <section className="section">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i % 3}>
              <ServiceCard service={s} locale={l} />
            </Reveal>
          ))}
        </div>
      </section>

      <Capability locale={l} />
      <CtaBand locale={l} />
    </>
  );
}

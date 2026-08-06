import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/config/site";
import { offices, whatsappHref } from "@/config/site";
import { getServices } from "@/lib/services";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { Mail, Phone, Pin, WhatsApp } from "@/components/Icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale).contact;
  return { title: d.eyebrow, description: d.lead };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getDict(l).contact;
  const nav = getDict(l).nav;
  const common = getDict(l).common;
  const services = (await getServices()).map((s) => ({
    slug: s.slug,
    title: s[l].title,
  }));

  return (
    <>
      <PageHero
        locale={l}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        crumbs={[{ label: nav.contact }]}
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          {/* Form */}
          <Reveal>
            <ContactForm locale={l} services={services} />
          </Reveal>

          {/* Offices */}
          <div>
            <h2 className="eyebrow">{t.officesTitle}</h2>
            <div className="mt-6 space-y-6">
              {offices.map((o, i) => {
                const emphasised = "emphasis" in o && o.emphasis;
                const q = encodeURIComponent(
                  `${o.street}, ${o.postal}, Slovenia`
                );
                return (
                  <Reveal key={o.id} delay={i}>
                    <div
                      className={`card overflow-hidden ${
                        emphasised ? "border-green/40" : ""
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-display text-lg font-medium text-ink">
                            {o.company}, {o.city}
                          </h3>
                          <span
                            className={`rounded-md px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide ${
                              emphasised
                                ? "bg-green/15 text-green-deep"
                                : "bg-offwhite text-grey"
                            }`}
                          >
                            {o.role[l]}
                          </span>
                        </div>
                        <div className="mt-4 space-y-2 text-sm text-grey">
                          <p className="flex items-start gap-2.5">
                            <Pin className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                            {o.street}, {o.postal}, {o.country[l]}
                          </p>
                          <p className="flex items-center gap-2.5">
                            <Phone className="h-4 w-4 shrink-0 text-green" />
                            <a
                              href={`tel:${o.phoneHref}`}
                              className="tabular hover:text-ink"
                            >
                              {o.phone}
                            </a>
                          </p>
                          {emphasised && (
                            <p className="flex items-center gap-2.5">
                              <WhatsApp className="h-4 w-4 shrink-0 text-green" />
                              <a
                                href={whatsappHref(l)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-ink"
                              >
                                {common.whatsapp}
                              </a>
                            </p>
                          )}
                          {o.emails.map((e) => (
                            <p
                              key={e}
                              className="flex items-center gap-2.5"
                            >
                              <Mail className="h-4 w-4 shrink-0 text-green" />
                              <a
                                href={`mailto:${e}`}
                                className="hover:text-ink"
                              >
                                {e}
                              </a>
                            </p>
                          ))}
                        </div>
                      </div>
                      {/* Embedded OpenStreetMap (no API key needed) */}
                      <iframe
                        title={`Map of ${o.city}`}
                        className="h-48 w-full border-t border-line grayscale"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                          o.coords.lng - 0.02
                        }%2C${o.coords.lat - 0.012}%2C${
                          o.coords.lng + 0.02
                        }%2C${o.coords.lat + 0.012}&layer=mapnik&marker=${
                          o.coords.lat
                        }%2C${o.coords.lng}`}
                      />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${q}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border-t border-line px-6 py-3 text-xs text-green-deep hover:bg-offwhite"
                      >
                        {o.city} · Google Maps →
                      </a>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

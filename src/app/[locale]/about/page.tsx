import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/lib/i18n";
import { media } from "@/config/media";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Accreditations from "@/components/sections/Accreditations";
import { features } from "@/config/features";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale).about;
  return { title: d.title, description: d.lead };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getDict(l).about;
  const nav = getDict(l).nav;

  return (
    <>
      <PageHero
        locale={l}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image={media.about.src}
        imageAlt={media.about.alt}
        crumbs={[{ label: nav.about }]}
      />

      {/* Story */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow={t.eyebrow} title={t.storyTitle} />
            <div className="mt-6 space-y-5">
              {t.story.map((p, i) => (
                <Reveal key={i} delay={i}>
                  <p className="leading-relaxed text-grey">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Reveal>
              <div className="card p-8">
                <h3 className="font-display text-xl font-medium text-ink">
                  {t.independenceTitle}
                </h3>
                <p className="mt-3 leading-relaxed text-grey">
                  {t.independence}
                </p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="card p-8">
                <h3 className="font-display text-xl font-medium text-ink">
                  {t.expertiseTitle}
                </h3>
                <p className="mt-3 leading-relaxed text-grey">
                  {t.expertise}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section border-t border-line section-alt">
        <div className="container-x">
          <SectionHeading
            eyebrow={t.valuesTitle}
            title={t.valuesTitle}
            align="center"
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((v, i) => (
              <Reveal key={v.title} delay={i}>
                <div className="card h-full p-7">
                  <span className="font-display text-3xl font-semibold tabular text-green-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-medium text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-grey">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team - hidden until the client supplies real people (features.showTeam) */}
      {features.showTeam && (
        <section className="section border-t border-line">
          <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line">
                <Image
                  src={media.whatWeDo.src}
                  alt={media.whatWeDo.alt}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
              </div>
            </Reveal>
            <div>
              <SectionHeading eyebrow={t.teamTitle} title={t.teamTitle} />
              <p className="mt-6 leading-relaxed text-grey">
                {t.teamPlaceholder}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Accreditations (shared) */}
      <Accreditations locale={l} />

      <CtaBand locale={l} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/config/site";
import { locales } from "@/config/site";
import { projects, getProject } from "@/config/projects";
import { getService } from "@/config/services";
import { getDict } from "@/i18n/dictionaries";
import { isLocale, localePath } from "@/lib/i18n";
import { media } from "@/config/media";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import CtaBand from "@/components/CtaBand";
import { ArrowRight, Check } from "@/components/Icons";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const p = getProject(slug);
  if (!p) return {};
  return { title: p[locale].title, description: p[locale].summary };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const project = getProject(slug);
  if (!project) notFound();

  const c = project[l];
  const t = getDict(l).projects;
  const nav = getDict(l).nav;
  const img = media.project[project.slug];
  const service = getService(project.serviceSlug);

  const others = projects.filter((p) => p.slug !== slug).slice(0, 3);

  const meta = [
    { label: t.commodity, value: project.commodity[l] },
    { label: t.related, value: service ? service[l].title : "N/A" },
  ];

  return (
    <>
      <PageHero
        locale={l}
        eyebrow={t.eyebrow}
        title={c.title}
        image={img.src}
        imageAlt={img.alt}
        crumbs={[
          { label: nav.projects, href: "/projects" },
          { label: c.title },
        ]}
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          {/* Main narrative */}
          <div>
            <Reveal>
              <p className="text-xl leading-relaxed text-ink">
                {c.summary}
              </p>
            </Reveal>

            <Reveal delay={1}>
              <div className="mt-10">
                <h2 className="eyebrow">{t.approach}</h2>
                <ul className="mt-5 space-y-3">
                  {c.approach.map((a) => (
                    <li key={a} className="flex gap-3 text-grey">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-green" />
                      <span className="leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Meta sidebar */}
          <div>
            <Reveal delay={1}>
              <div className="card sticky top-28 p-8">
                <dl className="space-y-6">
                  {meta.map((m) => (
                    <div key={m.label}>
                      <dt className="text-xs uppercase tracking-eyebrow text-grey">
                        {m.label}
                      </dt>
                      <dd className="mt-1.5 font-display text-lg text-ink">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {service && (
                  <Link
                    href={localePath(l, `/services/${service.slug}`)}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-green-deep transition-colors hover:text-green"
                  >
                    {service[l].title}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Other projects */}
      <section className="section border-t border-line section-alt">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <h2 className="eyebrow">{t.eyebrow}</h2>
            <Link
              href={localePath(l, "/projects")}
              className="link-green inline-flex items-center gap-2 text-sm"
            >
              {t.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i % 3}>
                <ProjectCard project={p} locale={l} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={l} />
    </>
  );
}

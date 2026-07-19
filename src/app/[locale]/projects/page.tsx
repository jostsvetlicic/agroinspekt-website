import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/config/site";
import { projects } from "@/config/projects";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import PlaceholderNote from "@/components/PlaceholderNote";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDict(locale).projects;
  return { title: d.eyebrow, description: d.lead };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getDict(l).projects;
  const nav = getDict(l).nav;

  return (
    <>
      <PageHero
        locale={l}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        crumbs={[{ label: nav.projects }]}
      />

      <section className="section">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i % 3}>
                <ProjectCard project={p} locale={l} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mx-auto mt-12 max-w-3xl">
              <PlaceholderNote label="For the client">
                Project titles are real; summaries, locations, dates and
                outcomes are plausible placeholders. Supply verified details for
                each so these become genuine, citable case studies.
              </PlaceholderNote>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand locale={l} />
    </>
  );
}

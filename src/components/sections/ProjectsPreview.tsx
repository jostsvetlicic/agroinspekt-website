import Link from "next/link";
import type { Locale } from "@/config/site";
import { projects } from "@/config/projects";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/lib/i18n";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/Icons";

export default function ProjectsPreview({ locale }: { locale: Locale }) {
  const t = getDict(locale).projects;
  const featured = projects.slice(0, 3);

  return (
    <section className="section">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <Reveal delay={2}>
            <Link
              href={localePath(locale, "/projects")}
              className="link-green inline-flex items-center gap-2 text-sm font-medium"
            >
              {t.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i % 3}>
              <ProjectCard project={p} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

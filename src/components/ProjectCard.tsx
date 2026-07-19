import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/config/site";
import type { Project } from "@/config/projects";
import { media } from "@/config/media";
import { localePath } from "@/lib/i18n";
import { ArrowUpRight, Pin } from "./Icons";

export default function ProjectCard({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const c = project[locale];
  const img = media.project[project.slug];

  return (
    <Link
      href={localePath(locale, `/projects/${project.slug}`)}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover"
        />
        <span className="absolute left-4 top-4 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-green-deep shadow-sm">
          {project.commodity[locale]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-medium leading-snug text-ink">
          {c.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-grey line-clamp-3">
          {c.summary}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <span className="flex items-center gap-1.5 text-xs text-grey">
            <Pin className="h-3.5 w-3.5 text-green" />
            {project.location[locale]}
            <span className="text-grey-light">·</span>
            <span className="tabular">{project.year}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 text-grey-light transition-colors duration-200 group-hover:text-green" />
        </div>
      </div>
    </Link>
  );
}

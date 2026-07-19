import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/config/site";
import type { Service } from "@/config/services";
import { media } from "@/config/media";
import { ArrowRight } from "./Icons";
import { localePath } from "@/lib/i18n";

export default function ServiceCard({
  service,
  locale,
}: {
  service: Service;
  locale: Locale;
}) {
  const c = service[locale];
  const img = media.service[service.slug];

  return (
    <Link
      href={localePath(locale, `/services/${service.slug}`)}
      className="card card-hover group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-medium leading-snug text-ink">
          {c.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-grey">
          {c.tagline}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-green-deep">
          {locale === "si" ? "Več" : "Learn more"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

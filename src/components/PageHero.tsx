import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/config/site";
import { localePath } from "@/lib/i18n";
import Reveal from "./Reveal";

interface Crumb {
  label: string;
  href?: string;
}

export default function PageHero({
  locale,
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  crumbs = [],
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
}) {
  const onDark = Boolean(image);

  return (
    <section
      className={`relative overflow-hidden border-b border-line ${
        onDark ? "" : "bg-offwhite"
      }`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/50" />
        </>
      )}

      <div className="container-x relative pb-16 pt-36 md:pb-20 md:pt-44">
        {crumbs.length > 0 && (
          <Reveal>
            <nav
              className={`mb-6 flex flex-wrap items-center gap-2 text-xs ${
                onDark ? "text-white/60" : "text-grey"
              }`}
            >
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-2">
                  {i > 0 && (
                    <span className={onDark ? "text-white/30" : "text-grey-light"}>
                      /
                    </span>
                  )}
                  {c.href ? (
                    <Link
                      href={localePath(locale, c.href)}
                      className={`transition-colors ${
                        onDark ? "hover:text-white" : "hover:text-ink"
                      }`}
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className={onDark ? "text-white" : "text-ink"}>
                      {c.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        <Reveal delay={1}>
          <span className={`eyebrow ${onDark ? "eyebrow-on-dark" : ""}`}>
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={2}>
          <h1
            className={`display mt-5 max-w-4xl text-4xl leading-[1.05] sm:text-5xl md:text-6xl ${
              onDark ? "text-white" : "text-ink"
            }`}
          >
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={3}>
            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed ${
                onDark ? "text-white/70" : "text-grey"
              }`}
            >
              {lead}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

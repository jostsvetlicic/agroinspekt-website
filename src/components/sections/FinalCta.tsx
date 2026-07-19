import Link from "next/link";
import type { Locale } from "@/config/site";
import { offices } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/lib/i18n";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { ArrowRight, Phone } from "@/components/Icons";

export default function FinalCta({ locale }: { locale: Locale }) {
  const t = getDict(locale).finalCta;

  return (
    <section className="bg-ink text-white">
      <div className="container-x relative py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Logo variant="white" height={34} className="mx-auto" />
          </Reveal>
          <Reveal delay={1}>
            <h2 className="display mt-8 text-3xl leading-[1.08] text-white sm:text-4xl md:text-5xl">
              {t.title}
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
              {t.text}
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={localePath(locale, "/contact")}
                className="btn-primary"
              >
                {t.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-x-8 gap-y-2 text-sm text-white/60 sm:flex-row">
              <span className="text-white/40">{t.call}</span>
              {offices.map((o) => (
                <a
                  key={o.id}
                  href={`tel:${o.phoneHref}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-green" />
                  <span className="tabular">{o.phone}</span>
                  <span className="text-white/40">· {o.city}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

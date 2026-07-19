import Link from "next/link";
import type { Locale } from "@/config/site";
import { offices } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { localePath } from "@/lib/i18n";
import Reveal from "./Reveal";
import { ArrowRight, Phone } from "./Icons";

export default function CtaBand({
  locale,
  title,
  text,
}: {
  locale: Locale;
  title?: string;
  text?: string;
}) {
  const d = getDict(locale);

  return (
    <section className="section-alt border-t border-line">
      <div className="container-x py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-ink p-8 md:flex-row md:items-center md:p-12">
            <div className="max-w-xl">
              <h2 className="display text-2xl text-white sm:text-3xl">
                {title ?? d.finalCta.title}
              </h2>
              <p className="mt-3 text-white/70">{text ?? d.finalCta.text}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
                {offices.map((o) => (
                  <a
                    key={o.id}
                    href={`tel:${o.phoneHref}`}
                    className="flex items-center gap-2 hover:text-white"
                  >
                    <Phone className="h-4 w-4 text-green" />
                    <span className="tabular">{o.phone}</span>
                    <span className="text-white/40">· {o.city}</span>
                  </a>
                ))}
              </div>
            </div>
            <Link
              href={localePath(locale, "/contact")}
              className="btn-primary shrink-0"
            >
              {d.common.requestCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

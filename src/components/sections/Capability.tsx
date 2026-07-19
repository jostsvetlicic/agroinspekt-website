import Image from "next/image";
import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { media } from "@/config/media";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Capability({ locale }: { locale: Locale }) {
  const t = getDict(locale).capability;

  return (
    <section className="section border-t border-line">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={t.eyebrow}
              title={t.title}
              lead={t.lead}
            />

            <ol className="mt-12 space-y-0">
              {t.steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i}>
                  <div className="group relative flex gap-6 border-t border-line py-6">
                    <span className="font-display text-sm font-medium tabular text-green-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-medium text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-grey">
                        {s.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Sticky image */}
          <Reveal delay={1}>
            <div className="relative lg:sticky lg:top-28">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line">
                <Image
                  src={media.capability.src}
                  alt={media.capability.alt}
                  fill
                  sizes="(max-width:1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

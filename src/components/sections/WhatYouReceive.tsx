import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import Reveal from "@/components/Reveal";
import { MeasureRule, SectionIndex } from "@/components/Precision";
import { Check } from "@/components/Icons";
import CertificatePreview from "@/components/CertificatePreview";

export default function WhatYouReceive({ locale }: { locale: Locale }) {
  const t = getDict(locale).whatYouReceive;

  return (
    <section className="section relative overflow-hidden bg-white">
      <div className="container-x">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <span className="eyebrow justify-center">{t.eyebrow}</span>
          <h2 className="display mt-5 text-3xl leading-[1.1] sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-grey">
            {t.lead}
          </p>
        </div>

        {/* Two-column: certificate preview + deliverables list */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Certificate preview — pinned on desktop while list scrolls */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <CertificatePreview />
            {/* Turnaround note below certificate */}
            <div className="mx-auto mt-6 max-w-sm rounded-xl border border-green/25 bg-green/5 px-4 py-3">
              <p className="text-center text-[13px] leading-relaxed text-green-deep">
                {t.note}
              </p>
            </div>
          </div>

          {/* Deliverables list */}
          <div>
            <MeasureRule />
            {t.deliverables.map((d, i) => (
              <Reveal key={d.title} delay={i}>
                <div className="flex gap-5 py-6">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green/10">
                    <Check className="h-4 w-4 text-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-base font-semibold text-ink md:text-lg">
                      {d.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-grey">
                      {d.text}
                    </p>
                  </div>
                </div>
                <MeasureRule />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

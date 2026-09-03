import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import Reveal from "@/components/Reveal";
import { MeasureRule, SectionIndex } from "@/components/Precision";
import { Check } from "@/components/Icons";

export default function WhatYouReceive({ locale }: { locale: Locale }) {
  const t = getDict(locale).whatYouReceive;

  return (
    <section className="section bg-white">
      <div className="container-x">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          {/* Heading column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-4">
                <span className="eyebrow">{t.eyebrow}</span>
                <span className="ml-auto lg:hidden">
                  <SectionIndex n={5} total={7} />
                </span>
              </div>
              <h2 className="display mt-5 text-3xl leading-[1.12] sm:text-4xl">
                {t.title}
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-grey">
                {t.lead}
              </p>
              {/* Turnaround note */}
              <div className="mt-8 rounded-xl border border-green/25 bg-green/5 px-4 py-4">
                <p className="text-[13px] leading-relaxed text-green-deep">
                  {t.note}
                </p>
              </div>
              <div className="mt-6 hidden lg:block">
                <SectionIndex n={5} total={7} />
              </div>
            </div>
          </div>

          {/* Deliverables list */}
          <div className="lg:col-span-7 lg:col-start-6">
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

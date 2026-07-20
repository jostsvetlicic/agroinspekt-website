import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { features } from "@/config/features";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function Accreditations({ locale }: { locale: Locale }) {
  const t = getDict(locale).accreditations;

  return (
    <section className="section section-alt">
      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
          align="center"
        />

        {features.showAccreditationLogos ? (
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.items.map((item, i) => (
              <Reveal key={i} delay={i}>
                <div className="card flex h-full flex-col items-center p-7 text-center">
                  <div className="grid h-20 w-full place-items-center rounded-lg border border-dashed border-line bg-offwhite">
                    <span className="text-[10px] uppercase tracking-eyebrow text-grey-light">
                      {t.logoLabel}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-base font-medium text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-grey">
                    {item.scope}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-3">
            {t.points.map((point, i) => (
              <Reveal key={point.title} delay={i}>
                <div className="card h-full p-7">
                  <span className="font-display text-2xl font-semibold tabular text-green-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-medium text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-grey">
                    {point.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

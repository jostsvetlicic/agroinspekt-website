import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import PlaceholderNote from "@/components/PlaceholderNote";

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

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, i) => (
            <Reveal key={i} delay={i}>
              <div className="card flex h-full flex-col items-center p-7 text-center">
                {/* Placeholder logo slot */}
                <div className="grid h-20 w-full place-items-center rounded-lg border border-dashed border-line bg-offwhite">
                  <span className="text-[10px] uppercase tracking-eyebrow text-grey-light">
                    {t.placeholderLabel}
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

        <Reveal delay={2}>
          <div className="mx-auto mt-10 max-w-3xl">
            <PlaceholderNote label="Missing content">
              {t.disclaimer}
            </PlaceholderNote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

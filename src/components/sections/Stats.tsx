import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";

/**
 * The page's dark "breath out" - a clean, flat navy band. Numbers count up on
 * entry. The navy value matches the final CTA and the footer exactly.
 */
export default function Stats({ locale }: { locale: Locale }) {
  const t = getDict(locale).stats;

  return (
    <section className="section-dark">
      <div className="container-x relative py-20 md:py-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {t.items.map((item, i) => (
            <Reveal key={item.label} delay={i}>
              <div className="flex flex-col">
                <span className="font-display text-5xl font-semibold tracking-tight text-white md:text-6xl">
                  <Counter value={item.value} suffix={item.suffix} />
                </span>
                <span className="mt-4 text-sm text-white/60">{item.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 text-center text-xs text-white/35">{t.note}</p>
      </div>
    </section>
  );
}

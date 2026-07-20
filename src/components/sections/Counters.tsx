"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { Locale } from "@/config/site";
import { metrics } from "@/config/metrics";

const DURATION = 1600; // ms
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let start: number | null = null;
    const step = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / DURATION, 1);
      setValue(Math.round(easeOut(progress) * target));
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, active]);

  return value;
}

function Figure({
  value,
  suffix,
  label,
  active,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
}) {
  const current = useCountUp(value, active);
  return (
    <div className="text-center">
      <div className="font-display text-5xl font-semibold tabular tracking-tight text-white sm:text-6xl md:text-7xl">
        {current.toLocaleString("en-US")}
        <span className="text-green">{suffix}</span>
      </div>
      <div className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-white/55">
        {label}
      </div>
    </div>
  );
}

export default function Counters({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });

  return (
    <section ref={ref} className="bg-ink py-24 text-white md:py-32">
      <div className="container-x">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.items.map((m) => (
            <Figure
              key={m.label.en}
              value={m.value}
              suffix={m.suffix}
              label={m.label[locale]}
              active={inView}
            />
          ))}
        </div>

        {metrics.showCaption && (
          <p className="mx-auto mt-16 max-w-xl text-center text-xs leading-relaxed text-white/35">
            {metrics.caption[locale]}
          </p>
        )}
      </div>
    </section>
  );
}

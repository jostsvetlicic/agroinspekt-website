"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { Locale } from "@/config/site";
import type { MetricsData } from "@/lib/content";

const DURATION = 1400; // ms
const START_FRACTION = 0.7; // count the final stretch only — never from zero
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function useCountUp(target: number, active: boolean, animate: boolean) {
  const from = Math.round(target * START_FRACTION);
  const [value, setValue] = useState(from);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!animate) {
      setValue(target);
      return;
    }
    if (!active) {
      setValue(from);
      return;
    }
    let start: number | null = null;
    const step = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / DURATION, 1);
      setValue(Math.round(from + easeOut(progress) * (target - from)));
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, active, animate, from]);

  return value;
}

function Figure({
  value,
  suffix,
  label,
  active,
  animate,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  animate: boolean;
}) {
  const current = useCountUp(value, active, animate);
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

export default function Counters({
  locale,
  metrics,
}: {
  locale: Locale;
  metrics: MetricsData;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px -15% 0px" });
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="bg-ink py-24 text-white md:py-32">
      <div className="container-x">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.items.map((m, i) => (
            <Figure
              key={i}
              value={m.value}
              suffix={m.suffix}
              label={m.label[locale]}
              active={inView}
              animate={!reduce}
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

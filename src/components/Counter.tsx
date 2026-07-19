"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

/** Counts up from 0 to `value` when scrolled into view. */
export default function Counter({
  value,
  suffix = "",
  duration = 1800,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // Reset to zero whenever the counter leaves the viewport, so it counts
    // up again from scratch the next time it scrolls back into view.
    if (!inView) {
      setDisplay(0);
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular">
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

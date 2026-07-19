"use client";

import { motion } from "framer-motion";

/**
 * PRECISION MOTIF PRIMITIVES
 * A small, consistent vocabulary of technical marks - hairline rules,
 * crosshairs, frame corners, faint grids, margin indices. Understated,
 * like the markings on a measuring instrument. Never decorative.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** A small crosshair "+" mark, used to pin section corners. */
export function Crosshair({
  className = "",
  size = 14,
  tone = "green",
}: {
  className?: string;
  size?: number;
  tone?: "green" | "ink" | "white";
}) {
  const color =
    tone === "green" ? "#139E3E" : tone === "white" ? "#ffffff" : "#1a2332";
  const half = size / 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden
    >
      <line
        x1={half}
        y1={0}
        x2={half}
        y2={size}
        stroke={color}
        strokeWidth={1}
        opacity={0.5}
      />
      <line
        x1={0}
        y1={half}
        x2={size}
        y2={half}
        stroke={color}
        strokeWidth={1}
        opacity={0.5}
      />
    </svg>
  );
}

/**
 * Four crosshair marks pinned to the corners of a block, framing it like
 * a registration target. Absolutely positioned inside a `relative` parent.
 */
export function FrameCorners({
  tone = "green",
  inset = "0px",
}: {
  tone?: "green" | "ink" | "white";
  inset?: string;
}) {
  const style = (pos: React.CSSProperties): React.CSSProperties => ({
    position: "absolute",
    ...pos,
  });
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <span style={style({ top: inset, left: inset })}>
        <Crosshair tone={tone} />
      </span>
      <span style={style({ top: inset, right: inset })}>
        <Crosshair tone={tone} />
      </span>
      <span style={style({ bottom: inset, left: inset })}>
        <Crosshair tone={tone} />
      </span>
      <span style={style({ bottom: inset, right: inset })}>
        <Crosshair tone={tone} />
      </span>
    </div>
  );
}

/**
 * A fine hairline that draws itself in when scrolled into view.
 * Horizontal by default. Used to separate or underline quietly.
 */
export function MeasureRule({
  className = "",
  tone = "line",
  vertical = false,
}: {
  className?: string;
  tone?: "line" | "green" | "white";
  vertical?: boolean;
}) {
  const color =
    tone === "green" ? "#139E3E" : tone === "white" ? "#ffffff" : "#e3e8e6";
  return (
    <motion.span
      className={`block ${className}`}
      style={{
        background: color,
        transformOrigin: vertical ? "top" : "left",
        ...(vertical ? { width: 1 } : { height: 1 }),
      }}
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 1.1, ease: EASE }}
      aria-hidden
    />
  );
}

/**
 * A section index set in the margin, like a plate number on a technical
 * drawing - e.g. "02 / 09". Monospaced feel via tabular figures.
 */
export function SectionIndex({
  n,
  total,
  tone = "grey",
  className = "",
}: {
  n: number;
  total: number;
  tone?: "grey" | "white";
  className?: string;
}) {
  const pad = (v: number) => String(v).padStart(2, "0");
  return (
    <span
      className={`tabular text-[11px] font-medium tracking-eyebrow ${
        tone === "white" ? "text-white/40" : "text-grey-light"
      } ${className}`}
    >
      {pad(n)} <span className="opacity-50">/ {pad(total)}</span>
    </span>
  );
}

"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const Row = ({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-[#e2e8e4] py-2.5 last:border-0">
    <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a9690]">
      {label}
    </span>
    <span
      className={`text-right text-sm text-[#1a2332] ${mono ? "font-mono tabular-nums" : "font-medium"}`}
    >
      {value}
    </span>
  </div>
);

export default function CertificatePreview() {
  return (
    <motion.div
      className="relative mx-auto max-w-sm select-none"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* Subtle page shadow behind the document */}
      <div className="absolute -bottom-3 left-4 right-4 top-3 rounded-2xl bg-black/8 blur-sm" />

      {/* Document card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#d8e2de] bg-[#fafcfb] shadow-[0_2px_4px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(26,35,50,0.18)]">
        {/* SPECIMEN watermark — diagonal, clearly marks this as a template */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <span
            className="font-display text-5xl font-extrabold tracking-[0.3em] text-green/[0.055] uppercase"
            style={{ transform: "rotate(-28deg)" }}
          >
            SPECIMEN
          </span>
        </div>

        {/* Document header */}
        <div className="bg-[#1a2332] px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-green">
                Agroinspekt d.o.o.
              </p>
              <h3 className="font-display mt-1 text-base font-bold text-white">
                Certificate of Inspection
              </h3>
            </div>
            {/* Cert reference chip */}
            <div className="rounded-md border border-white/15 bg-white/8 px-2.5 py-1.5 text-center">
              <p className="font-mono text-[10px] text-white/50 uppercase tracking-wider">Ref</p>
              <p className="font-mono text-xs font-bold text-white">AGI-XXXX</p>
            </div>
          </div>
        </div>

        {/* Status band */}
        <div className="flex items-center gap-2.5 border-b border-[#d8e2de] bg-green/[0.06] px-6 py-2.5">
          <div className="h-2 w-2 rounded-full bg-green" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-green-deep">
            Findings — Compliant to contract specification
          </span>
        </div>

        {/* Data rows */}
        <div className="px-6 py-4">
          <Row label="Commodity" value="Sunflower Oil (crude)" />
          <Row label="Quantity" value="12,450 MT" mono />
          <Row label="Standard" value="FOSFA 54" />
          <Row label="Location" value="Port of Koper — Shore Tank 3" />
          <Row label="Inspection date" value="[date of attendance]" />
          <Row label="Sampling method" value="Composite — top / mid / bottom" />
        </div>

        {/* Signature block */}
        <div className="border-t border-[#d8e2de] bg-[#f3f7f5] px-6 py-4">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <div className="h-px w-32 bg-[#c4d0ca]" />
              <p className="mt-1 text-[11px] text-[#8a9690]">Inspector signature</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold text-[#1a2332]">AGROINSPEKT d.o.o.</p>
              <p className="text-[10px] text-[#8a9690]">Authorised issuer</p>
            </div>
          </div>
        </div>

        {/* Slim footer note */}
        <div className="bg-[#f0f4f2] px-6 py-3">
          <p className="text-center text-[10px] leading-snug text-[#b0bdb8]">
            This document is a specimen for illustration purposes only. Actual
            certificates carry full legal reference and inspector credentials.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

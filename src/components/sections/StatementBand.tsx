"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MediaItem } from "@/config/media";
import { MeasureRule } from "@/components/Precision";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A full-bleed, edge-to-edge photographic band with a single large statement
 * laid over a dark gradient. Breaks out of the container to give the client's
 * port/cargo photography room to breathe. Used two or three times per page.
 *
 * The image sits still; the statement and its quiet supporting line reveal on
 * scroll, and a fine measurement rule draws in beneath - the precision motif.
 */
export default function StatementBand({
  media,
  statement,
  support,
  index,
  align = "left",
}: {
  media: MediaItem;
  statement: string;
  support: string;
  index?: string;
  align?: "left" | "center";
}) {
  const alignCls =
    align === "center"
      ? "items-center text-center mx-auto"
      : "items-start text-left";

  return (
    <section className="relative w-full overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark gradient for legibility - heavier on the text side. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              align === "center"
                ? "linear-gradient(180deg, rgba(16,22,34,0.55) 0%, rgba(16,22,34,0.35) 45%, rgba(16,22,34,0.75) 100%)"
                : "linear-gradient(90deg, rgba(16,22,34,0.86) 0%, rgba(16,22,34,0.62) 45%, rgba(16,22,34,0.28) 100%)",
          }}
        />
        <div className="film-grain" />
      </div>

      <div className="container-x relative z-10 py-28 md:py-40 lg:py-48">
        <div className={`flex max-w-2xl flex-col ${alignCls}`}>
          {index && (
            <span className="tabular mb-6 text-[11px] font-medium tracking-eyebrow text-white/45">
              {index}
            </span>
          )}
          <motion.h2
            className="statement text-white text-[clamp(2.25rem,6vw,4.75rem)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {statement}
          </motion.h2>

          <MeasureRule
            tone="green"
            className={`mt-8 w-24 ${align === "center" ? "self-center" : ""}`}
          />

          <motion.p
            className="mt-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            {support}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

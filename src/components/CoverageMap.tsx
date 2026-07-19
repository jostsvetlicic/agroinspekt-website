"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/config/site";
import { offices } from "@/config/site";
import {
  sloveniaPath,
  sloveniaViewBox,
  sloveniaMarkers,
  koperLjubljanaRoute,
  koperLjubljanaDistanceKm,
} from "@/config/sloveniaMap";

/**
 * Accurate Slovenia outline (real boundary data, projected to SVG at build time
 * in src/config/sloveniaMap.ts - no runtime fetch). The two office markers are
 * projected with the exact same transform, so they sit correctly inside the border.
 */
export default function CoverageMap({ locale }: { locale: Locale }) {
  const { width: vw, height: vh } = sloveniaViewBox;

  // Build the Koper → Ljubljana route as an SVG path in viewBox space.
  const routePath = koperLjubljanaRoute
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
    .join(" ");

  // Label sits beside the mid-section of the route, over the Kras plateau.
  const mid = koperLjubljanaRoute[2];
  const routeLabelLeft = ((mid.x + 30) / vw) * 100;
  const routeLabelTop = ((mid.y - 6) / vh) * 100;

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-line bg-offwhite"
      style={{ aspectRatio: `${vw} / ${vh}` }}
    >
      <svg
        viewBox={`0 0 ${vw} ${vh}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* A solid stroke draws in via pathLength and reveals the dashed
              route beneath it - so the line stays dashed while animating. */}
          <mask id="routeReveal">
            <motion.path
              d={routePath}
              fill="none"
              stroke="white"
              strokeWidth={9}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </mask>
        </defs>

        <path
          d={sloveniaPath}
          fill="#139E3E"
          fillOpacity={0.08}
          stroke="#139E3E"
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Fine dashed green route, revealed by the mask. */}
        <path
          d={routePath}
          fill="none"
          stroke="#139E3E"
          strokeWidth={1.75}
          strokeDasharray="5 5"
          strokeLinecap="round"
          strokeLinejoin="round"
          mask="url(#routeReveal)"
        />
      </svg>

      <span
        className="tabular absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-green/40 bg-white px-2 py-0.5 text-[10px] font-medium text-green-deep shadow-sm"
        style={{ left: `${routeLabelLeft}%`, top: `${routeLabelTop}%` }}
      >
        ~{koperLjubljanaDistanceKm} km
      </span>

      <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-eyebrow text-grey-light">
        {locale === "si" ? "Jadransko morje" : "Adriatic Sea"}
      </span>

      {offices.map((o, i) => {
        const m = sloveniaMarkers[o.id as keyof typeof sloveniaMarkers];
        if (!m) return null;
        const emphasised = "emphasis" in o && o.emphasis;
        const left = (m.x / vw) * 100;
        const top = (m.y / vh) * 100;
        const labelAbove = top > 70; // keep low markers' labels inside the frame

        return (
          <motion.div
            key={o.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${left}%`, top: `${top}%` }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
          >
            <span
              className={`relative block h-3 w-3 rounded-full ring-4 ${
                emphasised ? "bg-green ring-green/20" : "bg-ink ring-ink/10"
              }`}
            />
            <div
              className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border px-2.5 py-1 text-xs font-medium shadow-sm ${
                labelAbove ? "bottom-full mb-2" : "top-full mt-2"
              } ${
                emphasised
                  ? "border-green/40 bg-white text-ink"
                  : "border-line bg-white text-grey"
              }`}
            >
              {o.city}
              <span
                className={`ml-1.5 text-[10px] ${
                  emphasised ? "text-green-deep" : "text-grey-light"
                }`}
              >
                {o.role[locale]}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

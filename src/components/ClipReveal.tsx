"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "left" | "right" | "up" | "down";

const hidden: Record<Direction, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  up: "inset(100% 0 0 0)",
  down: "inset(0 0 100% 0)",
};

/**
 * Reveals its children with a clip wipe rather than a fade - the image is
 * uncovered as if a straight edge sweeps across it. Slow and eased; runs once.
 * Used for photography and full-bleed statement bands.
 */
export default function ClipReveal({
  children,
  className = "",
  direction = "left",
  delay = 0,
  duration = 1.1,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: hidden[direction] }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

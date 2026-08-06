"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Tag = "div" | "section" | "li" | "article" | "span";

const tags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
  span: motion.span,
} as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
}

/**
 * Fade-and-rise reveal on scroll into view. Reveals once (calm, not noisy),
 * ease-out, and collapses to a plain fade when reduced-motion is requested.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = tags[as];
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0.2 : 0.5,
        delay: reduce ? 0 : i * 0.07,
        ease: [0.23, 1, 0.32, 1],
      },
    }),
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

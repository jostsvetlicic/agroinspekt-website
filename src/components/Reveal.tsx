"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

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

/** Fade-and-slide reveal on scroll into view. */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = tags[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { SectionIndex, MeasureRule } from "@/components/Precision";

const EASE = [0.22, 1, 0.36, 1] as const;

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <MeasureRule />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-start gap-4 py-5 text-left transition-colors duration-150"
        aria-expanded={open}
      >
        <span className="font-display tabular mt-0.5 min-w-[2rem] text-sm font-medium text-green">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-display text-base font-medium text-ink transition-colors duration-150 group-hover:text-green-deep md:text-lg">
          {q}
        </span>
        <span
          className="mt-1 shrink-0 text-green transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2v12M2 8h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-10 pr-4 text-[15px] leading-relaxed text-grey md:pr-12">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq({ locale }: { locale: Locale }) {
  const t = getDict(locale).faq;

  return (
    <section className="section bg-offwhite">
      <div className="container-x">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          {/* Heading column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-4">
                <span className="eyebrow">{t.eyebrow}</span>
                <span className="ml-auto lg:hidden">
                  <SectionIndex n={6} total={7} />
                </span>
              </div>
              <h2 className="display mt-5 text-3xl leading-[1.12] sm:text-4xl">
                {t.title}
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-grey">
                {t.lead}
              </p>
              <div className="mt-6 hidden lg:block">
                <SectionIndex n={6} total={7} />
              </div>
            </div>
          </div>

          {/* Accordion column */}
          <div className="lg:col-span-7 lg:col-start-6">
            {t.items.map((item, i) => (
              <Item key={item.q} q={item.q} a={item.a} index={i} />
            ))}
            <MeasureRule />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const EN_CLIENTS = [
  "Commodity Trading Houses",
  "Cargo Insurers",
  "P&I Clubs",
  "Shipowners & Operators",
  "Import / Export Companies",
  "Banks & Trade Finance",
  "Port Agents",
  "Loss Adjusters",
];

const SI_CLIENTS = [
  "Blagovne hiše",
  "Zavarovalnice blaga",
  "Klubi P&I",
  "Lastniki ladij",
  "Uvozniki in izvozniki",
  "Banke in trgovinsko financiranje",
  "Ladijski agenti",
  "Škodni regulatorji",
];

export default function ClientsStrip({ locale }: { locale: Locale }) {
  const clients = locale === "si" ? SI_CLIENTS : EN_CLIENTS;
  const eyebrow = locale === "si" ? "Delamo z" : "We work with";
  const title =
    locale === "si"
      ? "Stranke, ki se zanesejo na naše potrdilo"
      : "The clients who rely on our certificate";

  return (
    <section className="section-alt section relative overflow-hidden">
      <div className="container-x">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <span className="eyebrow justify-center">{eyebrow}</span>
          <h2 className="display mt-5 text-3xl leading-[1.1] sm:text-4xl">
            {title}
          </h2>
        </div>

        {/* Client type grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {clients.map((label, i) => (
            <motion.div
              key={label}
              className="group flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-4 transition-shadow duration-200 hover:shadow-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            >
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
              <span className="text-sm font-medium leading-snug text-ink">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

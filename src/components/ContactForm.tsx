"use client";

import { useState } from "react";
import type { Locale } from "@/config/site";
import { services } from "@/config/services";
import { getDict } from "@/i18n/dictionaries";
import { Check, ArrowRight } from "./Icons";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export default function ContactForm({ locale }: { locale: Locale }) {
  const t = getDict(locale).contact;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const sent = status === "sent";

  const field =
    "w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-grey-light outline-none transition-colors focus:border-green/60 focus:ring-1 focus:ring-green/30";
  const label =
    "mb-2 block text-xs font-medium uppercase tracking-wide text-grey";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-green/40 bg-green-soft p-12 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-green/50 text-green-deep">
          <Check className="h-7 w-7" />
        </span>
        <p className="mt-6 max-w-sm text-lg text-ink">{t.success}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-6 md:p-8"
    >
      <h2 className="font-display text-xl font-medium text-ink">
        {t.formTitle}
      </h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            {t.name} *
          </label>
          <input id="name" name="name" required className={field} />
        </div>
        <div>
          <label htmlFor="company" className={label}>
            {t.company}
          </label>
          <input id="company" name="company" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            {t.email} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={field}
          />
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            {t.phone}
          </label>
          <input id="phone" name="phone" type="tel" className={field} />
        </div>
        <div>
          <label htmlFor="commodity" className={label}>
            {t.commodity}
          </label>
          <input id="commodity" name="commodity" className={field} />
        </div>
        <div>
          <label htmlFor="serviceType" className={label}>
            {t.serviceType}
          </label>
          <select
            id="serviceType"
            name="serviceType"
            defaultValue=""
            className={field}
          >
            <option value="" disabled>
              {t.serviceTypePlaceholder}
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s[locale].title}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="location" className={label}>
            {t.location}
          </label>
          <input id="location" name="location" className={field} />
        </div>
        <div>
          <label htmlFor="dateFrom" className={label}>
            {t.dateFrom}
          </label>
          <input
            id="dateFrom"
            name="dateFrom"
            type="date"
            className={`${field} tabular`}
          />
        </div>
        <div>
          <label htmlFor="dateTo" className={label}>
            {t.dateTo}
          </label>
          <input
            id="dateTo"
            name="dateTo"
            type="date"
            className={`${field} tabular`}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={label}>
            {t.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`${field} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? t.sending : t.submit}
        <ArrowRight className="h-4 w-4" />
      </button>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {t.error}
        </p>
      )}
    </form>
  );
}

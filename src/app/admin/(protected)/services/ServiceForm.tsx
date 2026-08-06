import { createService, updateService } from "../actions";
import { Field, SaveBar, inputCls, labelCls } from "../ui";
import { locales, type Locale } from "@/config/site";

const ICONS = [
  "general",
  "fruits",
  "coffee",
  "grains",
  "marine",
  "liquids",
  "minerals",
  "dangerous",
];

export type ServiceFormValues = {
  id?: string;
  slug: string;
  order: number;
  published: boolean;
  icon: string;
  title: Record<Locale, string>;
  tagline: Record<Locale, string>;
  intro: Record<Locale, string>;
  covers: Record<Locale, string>;
  commodities: Record<Locale, string>;
  methods: Record<Locale, string>;
  standards: Record<Locale, string>;
};

/** One input per configured locale — adding a language shows a field here. */
function Localized({
  label,
  base,
  values,
  textarea,
  rows,
  hint,
}: {
  label: string;
  base: string;
  values: Record<Locale, string>;
  textarea?: boolean;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <p className={labelCls}>{label}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {locales.map((l) => (
          <div key={l}>
            {textarea ? (
              <textarea
                name={`${base}.${l}`}
                defaultValue={values[l] ?? ""}
                rows={rows ?? 3}
                className={`${inputCls} resize-y`}
                placeholder={l.toUpperCase()}
              />
            ) : (
              <input
                name={`${base}.${l}`}
                defaultValue={values[l] ?? ""}
                className={inputCls}
                placeholder={l.toUpperCase()}
              />
            )}
            <span className="mt-1 block text-[11px] uppercase tracking-wide text-grey-light">
              {l}
            </span>
          </div>
        ))}
      </div>
      {hint && <p className="mt-1 text-xs text-grey-light">{hint}</p>}
    </div>
  );
}

export default function ServiceForm({
  values,
  mode,
}: {
  values: ServiceFormValues;
  mode: "create" | "edit";
}) {
  const listHint = "One item per line, per language.";
  return (
    <form action={mode === "edit" ? updateService : createService} className="space-y-6">
      {mode === "edit" && <input type="hidden" name="id" value={values.id} />}

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
        <Field
          label="Slug"
          hint={mode === "edit" ? "Fixed after creation." : "e.g. marine-surveys"}
        >
          {mode === "edit" ? (
            <input className={`${inputCls} bg-offwhite`} defaultValue={values.slug} disabled />
          ) : (
            <input name="slug" className={inputCls} defaultValue={values.slug} />
          )}
        </Field>
        <Field label="Icon">
          <select name="icon" defaultValue={values.icon} className={inputCls}>
            {ICONS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Order">
          <input
            name="order"
            type="number"
            defaultValue={values.order}
            className={`${inputCls} w-24`}
          />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={values.published}
          className="h-4 w-4 rounded border-line text-green focus:ring-green/30"
        />
        Published (visible on the public site)
      </label>

      <Localized label="Title" base="title" values={values.title} />
      <Localized label="Tagline" base="tagline" values={values.tagline} textarea rows={2} />
      <Localized label="Intro" base="intro" values={values.intro} textarea rows={4} />

      {mode === "edit" && (
        <>
          <Localized label="Covers" base="covers" values={values.covers} textarea rows={5} hint={listHint} />
          <Localized label="Commodities" base="commodities" values={values.commodities} textarea rows={5} hint={listHint} />
          <Localized label="Methods" base="methods" values={values.methods} textarea rows={5} hint={listHint} />
          <Localized label="Standards" base="standards" values={values.standards} textarea rows={4} hint={listHint} />
        </>
      )}

      <SaveBar label={mode === "edit" ? "Save changes" : "Create service"} />
    </form>
  );
}

import { createService, updateService } from "../actions";
import { Field, SaveBar, inputCls, labelCls } from "../ui";

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
  titleEn: string;
  titleSi: string;
  taglineEn: string;
  taglineSi: string;
  introEn: string;
  introSi: string;
  coversEn: string;
  coversSi: string;
  commoditiesEn: string;
  commoditiesSi: string;
  methodsEn: string;
  methodsSi: string;
  standardsEn: string;
  standardsSi: string;
};

function Pair({
  label,
  nameEn,
  nameSi,
  en,
  si,
  textarea,
  rows,
  hint,
}: {
  label: string;
  nameEn: string;
  nameSi: string;
  en: string;
  si: string;
  textarea?: boolean;
  rows?: number;
  hint?: string;
}) {
  return (
    <div>
      <p className={labelCls}>{label}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { code: "EN", name: nameEn, val: en },
          { code: "SI", name: nameSi, val: si },
        ].map((f) => (
          <div key={f.code}>
            {textarea ? (
              <textarea
                name={f.name}
                defaultValue={f.val}
                rows={rows ?? 3}
                className={`${inputCls} resize-y`}
                placeholder={f.code}
              />
            ) : (
              <input
                name={f.name}
                defaultValue={f.val}
                className={inputCls}
                placeholder={f.code}
              />
            )}
            <span className="mt-1 block text-[11px] uppercase tracking-wide text-grey-light">
              {f.code}
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
  const listHint = "One item per line.";
  return (
    <form action={mode === "edit" ? updateService : createService} className="space-y-6">
      {mode === "edit" && <input type="hidden" name="id" value={values.id} />}

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
        <Field label="Slug" hint={mode === "edit" ? "Fixed after creation." : "e.g. marine-surveys"}>
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
        Published
      </label>

      <Pair label="Title" nameEn="titleEn" nameSi="titleSi" en={values.titleEn} si={values.titleSi} />
      <Pair label="Tagline" nameEn="taglineEn" nameSi="taglineSi" en={values.taglineEn} si={values.taglineSi} textarea rows={2} />
      <Pair label="Intro" nameEn="introEn" nameSi="introSi" en={values.introEn} si={values.introSi} textarea rows={4} />

      {mode === "edit" && (
        <>
          <Pair label="Covers" nameEn="coversEn" nameSi="coversSi" en={values.coversEn} si={values.coversSi} textarea rows={5} hint={listHint} />
          <Pair label="Commodities" nameEn="commoditiesEn" nameSi="commoditiesSi" en={values.commoditiesEn} si={values.commoditiesSi} textarea rows={5} hint={listHint} />
          <Pair label="Methods" nameEn="methodsEn" nameSi="methodsSi" en={values.methodsEn} si={values.methodsSi} textarea rows={5} hint={listHint} />
          <Pair label="Standards" nameEn="standardsEn" nameSi="standardsSi" en={values.standardsEn} si={values.standardsSi} textarea rows={4} hint={listHint} />
        </>
      )}

      <SaveBar label={mode === "edit" ? "Save changes" : "Create service"} />
    </form>
  );
}

import { createInspection, updateInspection } from "../actions";
import { Field, SaveBar, inputCls } from "../ui";

const STATUS = ["scheduled", "in_progress", "completed"];

export type InspectionFormValues = {
  id?: string;
  reference: string;
  commodity: string;
  serviceSlug: string;
  client: string;
  location: string;
  status: string;
  scheduledFor: string; // yyyy-mm-dd
  notes: string;
};

export default function InspectionForm({
  values,
  services,
  mode,
}: {
  values: InspectionFormValues;
  services: { slug: string; titleEn: string }[];
  mode: "create" | "edit";
}) {
  return (
    <form
      action={mode === "edit" ? updateInspection : createInspection}
      className="space-y-6"
    >
      {mode === "edit" && <input type="hidden" name="id" value={values.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Reference">
          <input name="reference" defaultValue={values.reference} className={inputCls} placeholder="AGI-2026-000" />
        </Field>
        <Field label="Status">
          <select name="status" defaultValue={values.status} className={inputCls}>
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Commodity">
          <input name="commodity" defaultValue={values.commodity} className={inputCls} required />
        </Field>
        <Field label="Related service">
          <select name="serviceSlug" defaultValue={values.serviceSlug} className={inputCls}>
            <option value="">— none —</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.titleEn}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Client">
          <input name="client" defaultValue={values.client} className={inputCls} />
        </Field>
        <Field label="Scheduled for">
          <input name="scheduledFor" type="date" defaultValue={values.scheduledFor} className={inputCls} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Location">
            <input name="location" defaultValue={values.location} className={inputCls} placeholder="Port of Koper — berth 7" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Notes">
            <textarea name="notes" defaultValue={values.notes} rows={3} className={`${inputCls} resize-y`} />
          </Field>
        </div>
      </div>

      <SaveBar label={mode === "edit" ? "Save changes" : "Create inspection"} />
    </form>
  );
}

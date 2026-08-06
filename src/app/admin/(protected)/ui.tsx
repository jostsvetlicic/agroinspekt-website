// Shared admin form primitives — calm, consistent, one accent (green).
import type React from "react";

export const inputCls =
  "w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-green/60 focus:ring-1 focus:ring-green/30";
export const labelCls =
  "mb-1.5 block text-xs font-medium uppercase tracking-wide text-grey";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-grey-light">{hint}</span>}
    </label>
  );
}

export function SaveBar({ label = "Save changes" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 border-t border-line pt-5">
      <button
        type="submit"
        className="rounded-md bg-green px-4 py-2 text-sm font-medium text-white transition-[transform,background-color] duration-150 ease-out hover:bg-green-deep active:scale-[0.98]"
      >
        {label}
      </button>
    </div>
  );
}

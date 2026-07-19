/**
 * A clearly-marked callout for content that must be supplied by the client.
 * Visible in the proposed redesign so the client sees exactly what is missing.
 * Remove these once real content is in place.
 */
export default function PlaceholderNote({
  children,
  label = "For the client",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-dashed border-green/40 bg-green-soft px-4 py-3 text-sm text-grey">
      <span className="mt-0.5 shrink-0 rounded bg-green/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-deep">
        {label}
      </span>
      <p className="leading-relaxed">{children}</p>
    </div>
  );
}

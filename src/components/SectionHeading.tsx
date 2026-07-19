import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"
      } ${className}`}
    >
      <Reveal>
        <span className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="display mt-5 text-3xl leading-[1.12] sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={2}>
          <p className="mt-5 text-lg leading-relaxed text-grey">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

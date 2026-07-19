import Image from "next/image";
import { brand, logos } from "@/config/site";

/**
 * Real Agroinspekt wordmark. Two variants:
 *  - "dark"  (coloured logo) for light backgrounds - the nav, light sections.
 *  - "white" for dark backgrounds - the footer and dark CTA band.
 */
export default function Logo({
  variant = "dark",
  className = "",
  height = 28,
}: {
  variant?: "dark" | "white";
  className?: string;
  height?: number;
}) {
  const src = variant === "white" ? logos.white : logos.dark;
  const width = Math.round(height * logos.aspect);

  return (
    <Image
      src={src}
      alt={brand.legalName}
      width={width}
      height={height}
      priority
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}

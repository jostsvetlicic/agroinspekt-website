import type React from "react";
import type { IconKey } from "@/config/services";

type P = { className?: string };

const base = "h-full w-full";
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ---- Service icons ---------------------------------------------------- */

export const ServiceIcons: Record<IconKey, (p: P) => React.ReactElement> = {
  general: ({ className = base }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M4 8l8-4 8 4-8 4-8-4z" />
      <path d="M4 8v8l8 4 8-4V8" />
      <path d="M12 12v8" />
    </svg>
  ),
  fruits: ({ className = base }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 7c-3 0-5 2-5 6s2 5 5 5 5-1 5-5-2-6-5-6z" />
      <path d="M12 7c0-2 1-3 3-3" />
      <path d="M9.5 12h5" />
    </svg>
  ),
  coffee: ({ className = base }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M5 9h11v4a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V9z" />
      <path d="M16 10h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 6c0-1 1-1 1-2M11 6c0-1 1-1 1-2" />
    </svg>
  ),
  grains: ({ className = base }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3v18" />
      <path d="M12 7c-2-1-4 0-4 2 2 1 4 0 4-2zM12 7c2-1 4 0 4 2-2 1-4 0-4-2z" />
      <path d="M12 12c-2-1-4 0-4 2 2 1 4 0 4-2zM12 12c2-1 4 0 4 2-2 1-4 0-4-2z" />
    </svg>
  ),
  marine: ({ className = base }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M4 14l1.5 4h13L20 14" />
      <path d="M6 14V9h9l3 5" />
      <path d="M11 9V5" />
      <path d="M3 20c1.5 1 2.5 1 4 0s2.5-1 4 0 2.5 1 4 0 2.5-1 4 0" />
    </svg>
  ),
  liquids: ({ className = base }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3s5 6 5 10a5 5 0 0 1-10 0c0-4 5-10 5-10z" />
      <path d="M9.5 13a2.5 2.5 0 0 0 2.5 2.5" />
    </svg>
  ),
  minerals: ({ className = base }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3l4 4-4 14-4-14 4-4z" />
      <path d="M8 7h8" />
      <path d="M12 3v18" />
    </svg>
  ),
  dangerous: ({ className = base }) => (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 4l9 16H3l9-16z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
};

/* ---- UI icons --------------------------------------------------------- */

export const ArrowRight = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRight = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const Phone = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M5 4h4l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
  </svg>
);

export const Mail = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const Pin = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Check = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M4 12l5 5L20 6" />
  </svg>
);

/** Official WhatsApp glyph (filled, uses currentColor). */
export const WhatsApp = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91a9.85 9.85 0 0 0-2.9-7.01A9.85 9.85 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.48-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.25 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29z" />
  </svg>
);

export const Menu = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

import type { Metadata, Viewport } from "next";
import { Figtree, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

// viewport-fit=cover exposes the iOS safe-area insets (env(safe-area-inset-*))
// used to keep the floating WhatsApp button clear of the home indicator.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agroinspekt.si"),
  title: {
    default: "Agroinspekt: Independent Inspection, Survey & Testing",
    template: "%s · Agroinspekt",
  },
  description:
    "Independent third-party inspection, survey, sampling and testing across agricultural commodities, minerals, liquids and dangerous goods. Ljubljana & Port of Koper, Slovenia.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    title: "Agroinspekt",
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${figtree.variable} ${hankenGrotesk.variable}`}>
      <body>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}

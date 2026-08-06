import type { Metadata } from "next";

// The admin is a private tool — keep it out of search indexes.
export const metadata: Metadata = {
  title: "Agroinspekt Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-offwhite text-ink">{children}</div>;
}

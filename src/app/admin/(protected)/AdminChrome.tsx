"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../actions";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/inspections", label: "Inspections" },
  { href: "/admin/content", label: "Content" },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export default function AdminChrome({
  email,
  name,
  children,
}: {
  email: string;
  name: string | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLink = (href: string, label: string, block = false) => {
    const active = isActive(pathname, href);
    return (
      <Link
        key={href}
        href={href}
        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ${
          block ? "block" : ""
        } ${
          active
            ? "bg-green/10 text-green-deep"
            : "text-grey hover:bg-ink/[0.04] hover:text-ink"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar (desktop) */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-white lg:flex">
        <div className="px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">
            Agroinspekt
          </p>
          <p className="mt-0.5 text-xs text-grey">Admin</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV.map((n) => navLink(n.href, n.label, true))}
        </nav>
        <div className="border-t border-line px-4 py-4">
          <p className="truncate text-xs text-grey" title={email}>
            {name ?? email}
          </p>
          <form action={logout}>
            <button
              type="submit"
              className="mt-2 text-xs font-medium text-grey transition-colors hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Top bar (mobile) */}
      <header className="flex items-center justify-between border-b border-line bg-white px-4 py-3 lg:hidden">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">
          Agroinspekt Admin
        </span>
        <form action={logout}>
          <button
            type="submit"
            className="text-xs font-medium text-grey transition-colors hover:text-ink"
          >
            Sign out
          </button>
        </form>
      </header>
      <nav className="flex gap-1 overflow-x-auto border-b border-line bg-white px-3 py-2 lg:hidden">
        {NAV.map((n) => navLink(n.href, n.label))}
      </nav>

      {/* Main */}
      <main className="flex-1 px-5 py-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}

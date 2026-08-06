import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminChrome from "./AdminChrome";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  return (
    <AdminChrome email={user.email} name={user.name ?? null}>
      {children}
    </AdminChrome>
  );
}

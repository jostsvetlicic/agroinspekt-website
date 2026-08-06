import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-deep">
            Agroinspekt
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold text-ink">
            Admin sign in
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

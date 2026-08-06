"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions";

const initial: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initial);

  return (
    <form
      action={formAction}
      className="rounded-xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_14px_34px_-18px_rgba(16,24,40,0.20)]"
    >
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-grey">
        Email
      </label>
      <input
        name="email"
        type="email"
        autoComplete="username"
        required
        autoFocus
        className="mb-4 w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-green/60 focus:ring-1 focus:ring-green/30"
      />

      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-grey">
        Password
      </label>
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-green/60 focus:ring-1 focus:ring-green/30"
      />

      {state.error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-md bg-green px-4 py-2.5 text-sm font-medium text-white transition-[transform,background-color] duration-150 ease-out hover:bg-green-deep active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

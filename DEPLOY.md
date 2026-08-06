# Agroinspekt — Deploy & Run Guide

The public site is static + server-rendered; the `/admin` panel and the contact
form are backed by a database. **Local dev uses SQLite (zero setup); production
uses PostgreSQL on Netlify.** The Prisma provider is committed as `postgresql`
(prod-correct); `npm run db:sqlite` flips it locally.

---

## 1. Run locally (SQLite — for the demo)

```bash
npm install
npm run db:setup:local   # switches provider to sqlite, creates + seeds dev.db
npm run dev              # http://localhost:3000
```

- Public site: `http://localhost:3000/en` (and `/si`)
- Admin: `http://localhost:3000/admin`
- Default login (from `.env`): **admin@agroinspekt.si** / **agroinspekt-demo**

`npm run db:setup:local` intentionally leaves `prisma/schema.prisma` showing the
sqlite provider as an *uncommitted* change — that's expected. Run
`npm run db:postgres` before committing if you touched it.

Reset local data anytime: `npm run db:reset:local`.

---

## 2. Create a production PostgreSQL database (Neon — free)

1. Go to **neon.tech** → sign up → **New Project** (region close to your users).
2. Copy the **connection string**. It looks like:
   `postgresql://USER:PASSWORD@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require`

(Supabase or Railway work identically — any Postgres URL is fine.)

---

## 3. Set environment variables in Netlify

Netlify → **Site configuration → Environment variables** → add:

| Key | Value |
| --- | --- |
| `DATABASE_URL` | your Neon connection string (from step 2) |
| `AUTH_SECRET` | a long random string — generate with `openssl rand -base64 32` |
| `ADMIN_EMAIL` | the admin login email (e.g. `operations@agroinspekt.si`) |
| `ADMIN_PASSWORD` | a strong admin password |
| `ADMIN_NAME` | display name (e.g. `Agroinspekt`) |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | *(optional)* Formspree URL to also email enquiries |

---

## 4. Initialise the production database (one time)

From your machine, pointed at the **production** URL:

```bash
npm run db:postgres                              # ensure provider = postgresql
DATABASE_URL="<your Neon URL>" npx prisma db push   # create the tables
DATABASE_URL="<your Neon URL>" \
  ADMIN_EMAIL="operations@agroinspekt.si" \
  ADMIN_PASSWORD="<strong password>" \
  npx prisma db seed                              # admin user + services + figures
```

`db push` creates the schema; `db seed` adds the admin user, the 8 services, the
homepage figures and sample data. Re-running seed is safe (it won't clobber edits).

---

## 5. Deploy on Netlify

1. Push this repo to GitHub (already the `agroinspekt-website` repo).
2. Netlify → **Add new site → Import from GitHub** → pick the repo.
3. Build settings are read from `netlify.toml` automatically:
   - Build command: `npm run build` (runs `prisma generate` then `next build`)
   - Plugin: `@netlify/plugin-nextjs` (SSR, middleware, API routes)
4. Deploy. Then visit:
   - Site: `https://<your-site>.netlify.app/en`
   - Admin: `https://<your-site>.netlify.app/admin`

When you point the real domain (`agroinspekt.si`) at Netlify, update the base URL
constants if you want canonical/sitemap URLs to match a different domain.

---

## 6. What the admin can do

- **Enquiries** — every contact-form submission lands here; mark handled / reply / delete.
- **Services** — add / edit / delete the eight inspection domains (bilingual).
- **Inspections** — operational records (the foundation for the 2027 app).
- **Content** — edit the four homepage figures + captions and the closing CTA,
  with no code. Saving revalidates the homepage immediately.

---

## Troubleshooting

- **Admin 500 / "AUTH_SECRET is not set"** → set `AUTH_SECRET` in Netlify env vars, redeploy.
- **Admin shows no data / can't log in** → you skipped step 4 (push + seed against the prod DB).
- **Prisma engine error on Netlify** → the schema already lists
  `binaryTargets = ["native", "rhel-openssl-3.0.x"]`; make sure the build ran
  `prisma generate` (it does, via `npm run build`).
- **Homepage figures didn't update after an edit** → they revalidate on save; a
  hard refresh confirms. The public site falls back to static config if the DB is
  ever unreachable, so it never errors.

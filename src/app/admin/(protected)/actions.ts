"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { locales } from "@/config/site";

async function requireAuth() {
  if (!(await getSession())) redirect("/admin/login");
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

// Build a locale-map JSON string from per-locale form fields "base.en", "base.si", …
const jsonText = (fd: FormData, base: string) =>
  JSON.stringify(Object.fromEntries(locales.map((l) => [l, str(fd, `${base}.${l}`)])));

const jsonList = (fd: FormData, base: string) =>
  JSON.stringify(
    Object.fromEntries(
      locales.map((l) => [
        l,
        str(fd, `${base}.${l}`)
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      ]),
    ),
  );

// Service/content edits change the footer + homepage + service pages, so
// revalidate everything under the root layout.
function revalidateSite() {
  revalidatePath("/", "layout");
}

/* ── Enquiries ──────────────────────────────────────────────────────────── */

export async function setEnquiryHandled(formData: FormData) {
  await requireAuth();
  await prisma.enquiry.update({
    where: { id: str(formData, "id") },
    data: { handled: formData.get("handled") === "true" },
  });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

export async function deleteEnquiry(formData: FormData) {
  await requireAuth();
  await prisma.enquiry.delete({ where: { id: str(formData, "id") } });
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

/* ── Services ───────────────────────────────────────────────────────────── */

export async function updateService(formData: FormData) {
  await requireAuth();
  await prisma.service.update({
    where: { id: str(formData, "id") },
    data: {
      order: Number(formData.get("order") ?? 0),
      published: formData.get("published") === "on",
      icon: str(formData, "icon") || "general",
      title: jsonText(formData, "title"),
      tagline: jsonText(formData, "tagline"),
      intro: jsonText(formData, "intro"),
      covers: jsonList(formData, "covers"),
      commodities: jsonList(formData, "commodities"),
      methods: jsonList(formData, "methods"),
      standards: jsonList(formData, "standards"),
    },
  });
  revalidateSite();
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function createService(formData: FormData) {
  await requireAuth();
  const slug =
    str(formData, "slug").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
    `service-${Date.now()}`;
  const count = await prisma.service.count();
  await prisma.service.create({
    data: {
      slug,
      order: count,
      icon: str(formData, "icon") || "general",
      title: jsonText(formData, "title"),
      tagline: jsonText(formData, "tagline"),
      intro: jsonText(formData, "intro"),
    },
  });
  revalidateSite();
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await requireAuth();
  await prisma.service.delete({ where: { id: str(formData, "id") } });
  revalidateSite();
  revalidatePath("/admin/services");
}

/* ── Inspections ────────────────────────────────────────────────────────── */

function inspectionData(formData: FormData) {
  const scheduled = str(formData, "scheduledFor");
  return {
    reference: str(formData, "reference") || null,
    commodity: str(formData, "commodity") || "Unspecified",
    serviceSlug: str(formData, "serviceSlug") || null,
    client: str(formData, "client") || null,
    location: str(formData, "location") || null,
    status: str(formData, "status") || "scheduled",
    scheduledFor: scheduled ? new Date(scheduled) : null,
    notes: str(formData, "notes") || null,
  };
}

export async function createInspection(formData: FormData) {
  await requireAuth();
  await prisma.inspection.create({ data: inspectionData(formData) });
  revalidatePath("/admin/inspections");
  revalidatePath("/admin");
  redirect("/admin/inspections");
}

export async function updateInspection(formData: FormData) {
  await requireAuth();
  await prisma.inspection.update({
    where: { id: str(formData, "id") },
    data: inspectionData(formData),
  });
  revalidatePath("/admin/inspections");
  redirect("/admin/inspections");
}

export async function deleteInspection(formData: FormData) {
  await requireAuth();
  await prisma.inspection.delete({ where: { id: str(formData, "id") } });
  revalidatePath("/admin/inspections");
  revalidatePath("/admin");
}

/* ── Content (metrics figures + settings) ───────────────────────────────── */

async function upsertSetting(key: string, value: string) {
  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function updateContent(formData: FormData) {
  await requireAuth();

  const ids = formData.getAll("metricId").map(String);
  for (const id of ids) {
    const label = JSON.stringify(
      Object.fromEntries(
        locales.map((l) => [l, String(formData.get(`label_${id}_${l}`) ?? "").trim()]),
      ),
    );
    await prisma.metric.update({
      where: { id },
      data: {
        value: Math.max(0, Math.round(Number(formData.get(`value_${id}`) ?? 0))),
        suffix: String(formData.get(`suffix_${id}`) ?? "+").slice(0, 4),
        label,
      },
    });
  }

  const showCaption = formData.get("showCaption") === "on" ? "true" : "false";
  await upsertSetting("metrics.showCaption", JSON.stringify({ en: showCaption }));
  await upsertSetting("metrics.caption", jsonText(formData, "caption"));
  await upsertSetting("finalCta.title", jsonText(formData, "finalCtaTitle"));
  await upsertSetting("finalCta.text", jsonText(formData, "finalCtaText"));

  revalidateSite();
  revalidatePath("/admin/content");
  redirect("/admin/content?saved=1");
}

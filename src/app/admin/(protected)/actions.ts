"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

async function requireAuth() {
  if (!(await getSession())) redirect("/admin/login");
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const lines = (fd: FormData, k: string) =>
  JSON.stringify(
    str(fd, k)
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
  );

function revalidatePublicHome() {
  revalidatePath("/en");
  revalidatePath("/si");
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
      titleEn: str(formData, "titleEn"),
      titleSi: str(formData, "titleSi"),
      taglineEn: str(formData, "taglineEn"),
      taglineSi: str(formData, "taglineSi"),
      introEn: str(formData, "introEn"),
      introSi: str(formData, "introSi"),
      coversEn: lines(formData, "coversEn"),
      coversSi: lines(formData, "coversSi"),
      commoditiesEn: lines(formData, "commoditiesEn"),
      commoditiesSi: lines(formData, "commoditiesSi"),
      methodsEn: lines(formData, "methodsEn"),
      methodsSi: lines(formData, "methodsSi"),
      standardsEn: lines(formData, "standardsEn"),
      standardsSi: lines(formData, "standardsSi"),
    },
  });
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
      titleEn: str(formData, "titleEn") || "Untitled service",
      titleSi: str(formData, "titleSi") || "Neimenovana storitev",
      taglineEn: str(formData, "taglineEn"),
      taglineSi: str(formData, "taglineSi"),
      introEn: str(formData, "introEn"),
      introSi: str(formData, "introSi"),
    },
  });
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await requireAuth();
  await prisma.service.delete({ where: { id: str(formData, "id") } });
  revalidatePath("/admin/services");
}

/* ── Inspections ────────────────────────────────────────────────────────── */

function inspectionData(formData: FormData) {
  const scheduled = str(formData, "scheduledFor");
  return {
    reference: str(formData, "reference") || null,
    commodity: str(formData, "commodity") || "—",
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

async function upsertSetting(key: string, valueEn: string, valueSi: string) {
  await prisma.setting.upsert({
    where: { key },
    update: { valueEn, valueSi },
    create: { key, valueEn, valueSi },
  });
}

export async function updateContent(formData: FormData) {
  await requireAuth();

  const ids = formData.getAll("metricId").map(String);
  for (const id of ids) {
    await prisma.metric.update({
      where: { id },
      data: {
        value: Math.max(0, Math.round(Number(formData.get(`value_${id}`) ?? 0))),
        suffix: String(formData.get(`suffix_${id}`) ?? "+").slice(0, 4),
        labelEn: String(formData.get(`labelEn_${id}`) ?? "").trim(),
        labelSi: String(formData.get(`labelSi_${id}`) ?? "").trim(),
      },
    });
  }

  const showCaption = formData.get("showCaption") === "on" ? "true" : "false";
  await upsertSetting("metrics.showCaption", showCaption, showCaption);
  await upsertSetting(
    "metrics.caption",
    str(formData, "captionEn"),
    str(formData, "captionSi"),
  );
  await upsertSetting(
    "finalCta.title",
    str(formData, "finalCtaTitleEn"),
    str(formData, "finalCtaTitleSi"),
  );
  await upsertSetting(
    "finalCta.text",
    str(formData, "finalCtaTextEn"),
    str(formData, "finalCtaTextSi"),
  );

  revalidatePublicHome();
  revalidatePath("/admin/content");
  redirect("/admin/content?saved=1");
}

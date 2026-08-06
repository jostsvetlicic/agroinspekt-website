import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const clean = (v: unknown, max = 2000) =>
  String(v ?? "").trim().slice(0, max) || null;

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const name = clean(data.name, 200);
    const email = clean(data.email, 200);
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    await prisma.enquiry.create({
      data: {
        name,
        email,
        company: clean(data.company, 200),
        phone: clean(data.phone, 60),
        commodity: clean(data.commodity, 200),
        serviceType: clean(data.serviceType, 120),
        location: clean(data.location, 200),
        dateFrom: clean(data.dateFrom, 40),
        dateTo: clean(data.dateTo, 40),
        message: clean(data.message, 4000),
        locale: data.locale === "si" ? "si" : "en",
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not save your enquiry. Please try again." },
      { status: 500 },
    );
  }
}

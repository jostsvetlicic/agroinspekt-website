import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { services } from "../src/config/services";
import { metrics } from "../src/config/metrics";

const prisma = new PrismaClient();

async function main() {
  // ── Admin user ──────────────────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL ?? "admin@agroinspekt.si";
  const password = process.env.ADMIN_PASSWORD ?? "agroinspekt-demo";
  const name = process.env.ADMIN_NAME ?? "Agroinspekt Admin";
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser) {
    await prisma.user.create({
      data: {
        email,
        name,
        role: "admin",
        passwordHash: bcrypt.hashSync(password, 10),
      },
    });
    console.log(`✓ Created admin user: ${email}`);
  } else {
    console.log(`• Admin user ${email} already exists.`);
  }

  // ── Services (upsert by slug; do not clobber later admin edits) ──────────
  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        order: i,
        icon: s.icon,
        titleEn: s.en.title,
        titleSi: s.si.title,
        taglineEn: s.en.tagline,
        taglineSi: s.si.tagline,
        introEn: s.en.intro,
        introSi: s.si.intro,
        coversEn: JSON.stringify(s.en.covers),
        coversSi: JSON.stringify(s.si.covers),
        commoditiesEn: JSON.stringify(s.en.commodities),
        commoditiesSi: JSON.stringify(s.si.commodities),
        methodsEn: JSON.stringify(s.en.methods),
        methodsSi: JSON.stringify(s.si.methods),
        standardsEn: JSON.stringify(s.en.standards),
        standardsSi: JSON.stringify(s.si.standards),
      },
    });
  }
  console.log(`✓ Seeded ${services.length} services.`);

  // ── Metrics (only if empty, so admin edits survive reseeds) ─────────────
  if ((await prisma.metric.count()) === 0) {
    for (let i = 0; i < metrics.items.length; i++) {
      const m = metrics.items[i];
      await prisma.metric.create({
        data: {
          order: i,
          value: m.value,
          suffix: m.suffix,
          labelEn: m.label.en,
          labelSi: m.label.si,
        },
      });
    }
    console.log(`✓ Seeded ${metrics.items.length} metrics.`);
  } else {
    console.log("• Metrics already present, skipping.");
  }

  // ── Editable site content + flags ───────────────────────────────────────
  const settings: { key: string; valueEn: string; valueSi: string }[] = [
    {
      key: "metrics.showCaption",
      valueEn: metrics.showCaption ? "true" : "false",
      valueSi: metrics.showCaption ? "true" : "false",
    },
    { key: "metrics.caption", valueEn: metrics.caption.en, valueSi: metrics.caption.si },
    {
      key: "finalCta.title",
      valueEn: "Need goods inspected?",
      valueSi: "Potrebujete nadzor blaga?",
    },
    {
      key: "finalCta.text",
      valueEn:
        "Tell us the commodity, the port and the dates. We confirm scope, method and standard, and attend.",
      valueSi:
        "Sporočite nam blago, pristanišče in datume. Potrdimo obseg, metodo in standard ter se udeležimo.",
    },
  ];
  for (const st of settings) {
    await prisma.setting.upsert({
      where: { key: st.key },
      update: {},
      create: { key: st.key, valueEn: st.valueEn, valueSi: st.valueSi },
    });
  }
  console.log(`✓ Seeded ${settings.length} settings.`);

  // ── Sample inspections (demo data for the admin / future app) ───────────
  if ((await prisma.inspection.count()) === 0) {
    await prisma.inspection.createMany({
      data: [
        {
          reference: "AGI-2026-014",
          commodity: "Sunflower oil",
          serviceSlug: "liquids",
          client: "Cargill",
          location: "Port of Koper — shore tank",
          status: "completed",
        },
        {
          reference: "AGI-2026-021",
          commodity: "Wheat",
          serviceSlug: "grains-and-feedstuff",
          client: "ADM",
          location: "Port of Koper — berth 7",
          status: "in_progress",
        },
        {
          reference: "AGI-2026-025",
          commodity: "Phosphate rock",
          serviceSlug: "minerals-coal-coke-ores",
          client: "Petrochema",
          location: "Port of Koper — dry bulk terminal",
          status: "scheduled",
        },
      ],
    });
    console.log("✓ Seeded 3 sample inspections.");
  } else {
    console.log("• Inspections already present, skipping.");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

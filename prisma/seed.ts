import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { services } from "../src/config/services";
import { metrics } from "../src/config/metrics";
import { locales } from "../src/config/site";

const prisma = new PrismaClient();

// Build a locale-map JSON string, e.g. {"en":"...","si":"..."}, by running the
// builder for every configured locale.
const jmap = <T>(build: (l: (typeof locales)[number]) => T) =>
  JSON.stringify(Object.fromEntries(locales.map((l) => [l, build(l)])));

async function main() {
  // ── Admin user ──────────────────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL ?? "admin@agroinspekt.si";
  const password = process.env.ADMIN_PASSWORD ?? "agroinspekt-demo";
  const name = process.env.ADMIN_NAME ?? "Agroinspekt Admin";
  if (!(await prisma.user.findUnique({ where: { email } }))) {
    await prisma.user.create({
      data: { email, name, role: "admin", passwordHash: bcrypt.hashSync(password, 10) },
    });
    console.log(`✓ Created admin user: ${email}`);
  } else {
    console.log(`• Admin user ${email} already exists.`);
  }

  // ── Services (upsert by slug; don't clobber later admin edits) ───────────
  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        order: i,
        icon: s.icon,
        title: jmap((l) => s[l].title),
        tagline: jmap((l) => s[l].tagline),
        intro: jmap((l) => s[l].intro),
        covers: jmap((l) => s[l].covers),
        commodities: jmap((l) => s[l].commodities),
        methods: jmap((l) => s[l].methods),
        standards: jmap((l) => s[l].standards),
      },
    });
  }
  console.log(`✓ Seeded ${services.length} services.`);

  // ── Metrics ──────────────────────────────────────────────────────────────
  if ((await prisma.metric.count()) === 0) {
    for (let i = 0; i < metrics.items.length; i++) {
      const m = metrics.items[i];
      await prisma.metric.create({
        data: {
          order: i,
          value: m.value,
          suffix: m.suffix,
          label: jmap((l) => m.label[l]),
        },
      });
    }
    console.log(`✓ Seeded ${metrics.items.length} metrics.`);
  } else {
    console.log("• Metrics already present, skipping.");
  }

  // ── Editable site content + flags ───────────────────────────────────────
  const settings: { key: string; value: string }[] = [
    { key: "metrics.showCaption", value: JSON.stringify({ en: metrics.showCaption ? "true" : "false" }) },
    { key: "metrics.caption", value: jmap((l) => metrics.caption[l]) },
    {
      key: "finalCta.title",
      value: JSON.stringify({ en: "Need goods inspected?", si: "Potrebujete nadzor blaga?" }),
    },
    {
      key: "finalCta.text",
      value: JSON.stringify({
        en: "Tell us the commodity, the port and the dates. We confirm scope, method and standard, and attend.",
        si: "Sporočite nam blago, pristanišče in datume. Potrdimo obseg, metodo in standard ter se udeležimo.",
      }),
    },
  ];
  for (const st of settings) {
    await prisma.setting.upsert({
      where: { key: st.key },
      update: {},
      create: { key: st.key, value: st.value },
    });
  }
  console.log(`✓ Seeded ${settings.length} settings.`);

  // ── Sample inspections (demo data) ──────────────────────────────────────
  if ((await prisma.inspection.count()) === 0) {
    await prisma.inspection.createMany({
      data: [
        { reference: "AGI-2026-014", commodity: "Sunflower oil", serviceSlug: "liquids", client: "Cargill", location: "Port of Koper — shore tank", status: "completed" },
        { reference: "AGI-2026-021", commodity: "Wheat", serviceSlug: "grains-and-feedstuff", client: "ADM", location: "Port of Koper — berth 7", status: "in_progress" },
        { reference: "AGI-2026-025", commodity: "Phosphate rock", serviceSlug: "minerals-coal-coke-ores", client: "Petrochema", location: "Port of Koper — dry bulk terminal", status: "scheduled" },
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

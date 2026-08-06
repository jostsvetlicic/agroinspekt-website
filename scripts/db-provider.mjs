// Switches the Prisma datasource provider between sqlite (local dev) and
// postgresql (production) without hand-editing the schema.
//   node scripts/db-provider.mjs sqlite
//   node scripts/db-provider.mjs postgresql
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, "..", "prisma", "schema.prisma");

const arg = (process.argv[2] || "").toLowerCase();
const target =
  arg === "sqlite" ? "sqlite" : arg === "postgres" || arg === "postgresql" ? "postgresql" : null;

if (!target) {
  console.error('Usage: node scripts/db-provider.mjs <sqlite|postgresql>');
  process.exit(1);
}

const schema = readFileSync(schemaPath, "utf8");
const updated = schema.replace(
  /provider = "(sqlite|postgresql)"/,
  `provider = "${target}"`,
);

if (updated === schema) {
  console.log(`Provider already "${target}" (no change).`);
} else {
  writeFileSync(schemaPath, updated);
  console.log(`Prisma provider set to "${target}".`);
}

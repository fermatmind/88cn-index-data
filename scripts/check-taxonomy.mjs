import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TAXONOMY_DIR = path.join(ROOT, "taxonomy");

function fail(msg) {
  console.error(`  FAIL: ${msg}`);
  process.exitCode = 1;
}

function ok(msg) {
  console.log(`  PASS: ${msg}`);
}

const files = [
  { name: "categories.json", label: "Categories" },
  { name: "source-types.json", label: "Source Types" },
  { name: "regions.json", label: "Regions" },
  { name: "tech-stacks.json", label: "Tech Stacks" },
];

for (const { name, label } of files) {
  const filePath = path.join(TAXONOMY_DIR, name);
  console.log(`--- ${label} (${name}) ---`);

  if (!fs.existsSync(filePath)) {
    fail(`File not found`);
    continue;
  }

  let raw;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch {
    fail("Cannot read file");
    continue;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    fail(`Invalid JSON: ${e.message}`);
    continue;
  }

  if (!Array.isArray(data)) {
    fail(`Must be a JSON array`);
    continue;
  }

  ok(`Contains ${data.length} entries`);

  // Check required fields
  const slugs = new Set();
  for (const entry of data) {
    if (!entry.slug) {
      fail(`Entry missing slug`);
      continue;
    }
    if (!entry.name) {
      fail(`Entry "${entry.slug}" missing name`);
    }
    if (!entry.description) {
      fail(`Entry "${entry.slug}" missing description`);
    }

    // Slug pattern: lowercase alphanumeric + hyphens
    if (!/^[a-z][a-z0-9-]*$/.test(entry.slug)) {
      fail(`Invalid slug pattern: "${entry.slug}"`);
    }

    // Uniqueness
    if (slugs.has(entry.slug)) {
      fail(`Duplicate slug: "${entry.slug}"`);
    }
    slugs.add(entry.slug);
  }

  ok(`All slugs unique and valid`);
  console.log("");
}

if (process.exitCode) {
  console.error("Taxonomy check FAILED");
  process.exit(1);
}

console.log("Taxonomy check passed.");

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PROJECTS_DIR = path.join(ROOT, "data/projects");
const DIST_DIR = path.join(ROOT, "dist");

if (!fs.existsSync(PROJECTS_DIR)) {
  console.error("data/projects/ directory not found");
  process.exit(1);
}

fs.mkdirSync(DIST_DIR, { recursive: true });

const files = fs
  .readdirSync(PROJECTS_DIR)
  .filter((f) => f.endsWith(".json"));

const projects = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
  const p = JSON.parse(raw);
  projects.push(p);
}

// Sort by category_slug, then slug
projects.sort((a, b) => {
  const cat = (a.category_slug || "").localeCompare(b.category_slug || "");
  if (cat !== 0) return cat;
  return (a.slug || "").localeCompare(b.slug || "");
});

// Write aggregated projects
fs.writeFileSync(
  path.join(DIST_DIR, "projects.json"),
  JSON.stringify(projects, null, 2)
);

// Statistics
const stats = {
  project_count: projects.length,
  categories: {},
  source_types: {},
  regions: {},
  tech_stacks: {},
};

for (const p of projects) {
  const cat = p.category_slug || "unknown";
  stats.categories[cat] = (stats.categories[cat] || 0) + 1;

  const st = p.source_type || "unknown";
  stats.source_types[st] = (stats.source_types[st] || 0) + 1;

  const reg = p.region || "unknown";
  stats.regions[reg] = (stats.regions[reg] || 0) + 1;

  if (Array.isArray(p.tech_stack)) {
    for (const t of p.tech_stack) {
      stats.tech_stacks[t] = (stats.tech_stacks[t] || 0) + 1;
    }
  }
}

fs.writeFileSync(
  path.join(DIST_DIR, "stats.json"),
  JSON.stringify(stats, null, 2)
);

console.log(`Aggregated ${projects.length} project(s).`);
console.log(`  dist/projects.json  — ${projects.length} projects`);
console.log(`  dist/stats.json     — statistics`);
console.log("\nCategories:");
for (const [cat, count] of Object.entries(stats.categories)) {
  console.log(`  ${cat}: ${count}`);
}
console.log("\nSource types:");
for (const [st, count] of Object.entries(stats.source_types)) {
  console.log(`  ${st}: ${count}`);
}

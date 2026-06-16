import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const CATEGORIES = JSON.parse(
  fs.readFileSync(path.join(ROOT, "taxonomy/categories.json"), "utf8")
);
const SOURCE_TYPES = JSON.parse(
  fs.readFileSync(path.join(ROOT, "taxonomy/source-types.json"), "utf8")
);
const REGIONS = JSON.parse(
  fs.readFileSync(path.join(ROOT, "taxonomy/regions.json"), "utf8")
);
const TECH_STACKS = JSON.parse(
  fs.readFileSync(path.join(ROOT, "taxonomy/tech-stacks.json"), "utf8")
);

const categorySlugs = new Set(CATEGORIES.map((c) => c.slug));
const sourceTypeSlugs = new Set(SOURCE_TYPES.map((s) => s.slug));
const regionSlugs = new Set(REGIONS.map((r) => r.slug));
const techStackSlugs = new Set(TECH_STACKS.map((t) => t.slug));

const PUBLIC_SOURCE_FIELDS = [
  "github_url",
  "docs_url",
  "product_hunt_url",
  "hacker_news_url",
  "founder_public_url",
  "launch_url",
];

const BLOCKED_URL_PREFIXES = [
  "http://",
  "javascript:",
  "data:",
  "file:",
  "ftp:",
];
const BLOCKED_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

function fail(msg) {
  console.error(`  FAIL: ${msg}`);
  process.exitCode = 1;
}

function ok(msg) {
  console.log(`  PASS: ${msg}`);
}

const projectsDir = path.join(ROOT, "data/projects");
if (!fs.existsSync(projectsDir)) {
  console.error("data/projects/ directory not found");
  process.exit(1);
}

const files = fs
  .readdirSync(projectsDir)
  .filter((f) => f.endsWith(".json"));

if (files.length === 0) {
  console.error("No project files found in data/projects/");
  process.exit(1);
}

console.log(`Validating ${files.length} project file(s)...\n`);

const slugs = new Set();

for (const file of files) {
  const filePath = path.join(projectsDir, file);
  console.log(`--- ${file} ---`);

  let raw;
  try {
    raw = fs.readFileSync(filePath, "utf8");
  } catch {
    fail(`Cannot read file`);
    continue;
  }

  let project;
  try {
    project = JSON.parse(raw);
  } catch (e) {
    fail(`Invalid JSON: ${e.message}`);
    continue;
  }

  // Check slug uniqueness
  const slug = project.slug;
  if (!slug) {
    fail("Missing slug");
  } else if (slugs.has(slug)) {
    fail(`Duplicate slug: "${slug}"`);
  } else {
    slugs.add(slug);
    ok(`Slug: ${slug}`);
  }

  // Check category_slug
  if (!project.category_slug) {
    fail("Missing category_slug");
  } else if (!categorySlugs.has(project.category_slug)) {
    fail(`Unknown category_slug: "${project.category_slug}"`);
  } else {
    ok(`Category: ${project.category_slug}`);
  }

  // Check source_type
  if (!project.source_type) {
    fail("Missing source_type");
  } else if (!sourceTypeSlugs.has(project.source_type)) {
    fail(`Unknown source_type: "${project.source_type}"`);
  } else {
    ok(`Source type: ${project.source_type}`);
  }

  // Check region
  if (!project.region) {
    fail("Missing region");
  } else if (!regionSlugs.has(project.region)) {
    fail(`Unknown region: "${project.region}"`);
  } else {
    ok(`Region: ${project.region}`);
  }

  // Check tech_stack
  if (project.tech_stack && Array.isArray(project.tech_stack)) {
    const unknown = project.tech_stack.filter(
      (t) => !techStackSlugs.has(t)
    );
    if (unknown.length > 0) {
      fail(`Unknown tech_stack entries: ${unknown.join(", ")}`);
    } else {
      ok(`Tech stack: ${project.tech_stack.length} entries`);
    }
  }

  // Check all URLs are https
  const urlFields = [
    "website_url",
    "github_url",
    "docs_url",
    "pricing_url",
    "product_hunt_url",
    "hacker_news_url",
    "founder_public_url",
    "launch_url",
  ];
  for (const field of urlFields) {
    const url = project[field];
    if (!url) continue;
    const lower = String(url).toLowerCase();
    for (const prefix of BLOCKED_URL_PREFIXES) {
      if (lower.startsWith(prefix)) {
        fail(`URL "${field}" uses blocked protocol: ${prefix}...`);
      }
    }
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:") {
        fail(`URL "${field}" must use https:// (got ${parsed.protocol})`);
      }
      if (BLOCKED_HOSTS.has(parsed.hostname.toLowerCase())) {
        fail(`URL "${field}" uses blocked host: ${parsed.hostname}`);
      }
    } catch {
      fail(`URL "${field}" is not a valid URL: ${url}`);
    }
  }

  // At least one public source (beyond website_url)
  const hasPublicSource = PUBLIC_SOURCE_FIELDS.some(
    (f) => project[f] && String(project[f]).trim().length > 0
  );
  if (!hasPublicSource) {
    fail("No public source field provided (github_url, docs_url, etc.)");
  } else {
    ok("Public source present");
  }

  console.log("");
}

if (process.exitCode) {
  console.error("Validation FAILED");
  process.exit(1);
}

console.log(`All ${files.length} project file(s) passed validation.`);

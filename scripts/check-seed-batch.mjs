import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const MANIFEST_PATH = path.join(ROOT, "seed", "seed-100-manifest.json");
const PROJECTS_DIR = path.join(ROOT, "data/projects");

const TARGET_COUNT = 100;
const EXAMPLE_SLUG = "example-ai-project";

const PROHIBITED_DOMAINS = new Set([
  "toolify.ai",
  "taaft.com",
  "saashub.com",
  "futurepedia.io",
  "theresanaiforthat.com",
]);

const MANIFEST_FORBIDDEN_KEYS = new Set([
  "revenue",
  "mrr",
  "arr",
  "api_key",
  "access_token",
  "token",
  "stripe",
  "equity",
  "fund",
  "spv",
]);

const PROJECT_FORBIDDEN_KEYS = new Set([
  "founder_email",
  "email",
  "phone",
  "wechat",
  "telegram",
  "discord_private",
  "revenue",
  "mrr",
  "arr",
  "gmv",
  "stripe_customer_id",
  "stripe_session_id",
  "stripe",
  "api_key",
  "access_token",
  "secret",
  "password",
  "analytics_screenshot",
  "bank",
  "investor",
  "backer",
  "investment",
  "equity",
  "token",
  "wallet",
  "private_dashboard",
  "private_customer_list",
  "customer_emails",
  "ip_address",
  "cookie",
  "session",
]);

const FORBIDDEN_MARKETING_PHRASES = [
  "dofollow",
  "backlink",
  "SEO juice",
  "guaranteed ranking",
  "guaranteed traffic",
  "guaranteed AI citation",
  "guaranteed AI search citation",
  "fund",
  "SPV",
  "equity",
  "token",
  "invest now",
];

const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/;

const failures = [];

function fail(msg) {
  console.error(`  FAIL: ${msg}`);
  failures.push(msg);
  process.exitCode = 1;
}

function ok(msg) {
  console.log(`  PASS: ${msg}`);
}

function warn(msg) {
  console.warn(`  WARN: ${msg}`);
}

function scanForbiddenKeys(obj, forbiddenSet, label, prefix = "") {
  const results = [];
  if (typeof obj !== "object" || obj === null) return results;

  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      results.push(...scanForbiddenKeys(item, forbiddenSet, label, `${prefix}[${i}]`));
    });
    return results;
  }

  for (const [key, value] of Object.entries(obj)) {
    const keyPath = prefix ? `${prefix}.${key}` : key;
    if (forbiddenSet.has(key)) {
      results.push({ keyPath, key, label });
    }
    if (typeof value === "object" && value !== null) {
      results.push(...scanForbiddenKeys(value, forbiddenSet, label, keyPath));
    }
  }
  return results;
}

function extractDomain(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

// --- Manifest checks ---

console.log("=== Seed 100 Manifest Validation ===\n");

if (!fs.existsSync(MANIFEST_PATH)) {
  fail(`Manifest file not found: ${MANIFEST_PATH}`);
  console.error("\nValidation FAILED");
  process.exit(1);
}

let manifestRaw;
try {
  manifestRaw = fs.readFileSync(MANIFEST_PATH, "utf8");
} catch {
  fail("Cannot read manifest file");
  console.error("\nValidation FAILED");
  process.exit(1);
}

let manifest;
try {
  manifest = JSON.parse(manifestRaw);
} catch (e) {
  fail(`Invalid JSON in manifest: ${e.message}`);
  console.error("\nValidation FAILED");
  process.exit(1);
}

ok("Manifest file exists and is valid JSON");

// Check items array
if (!manifest.items || !Array.isArray(manifest.items)) {
  fail('Manifest missing "items" array');
  console.error("\nValidation FAILED");
  process.exit(1);
}

ok("Manifest has items array");

// Check emails in raw manifest
const emailMatches = manifestRaw.match(EMAIL_RE);
if (emailMatches) {
  fail(`Manifest contains email address(es): ${emailMatches.join(", ")}`);
} else {
  ok("Manifest contains no email addresses");
}

// Check manifest for forbidden keys
const manifestForbidden = scanForbiddenKeys(manifest, MANIFEST_FORBIDDEN_KEYS, "manifest");
for (const { keyPath, key } of manifestForbidden) {
  fail(`Manifest contains forbidden key "${key}" at ${keyPath}`);
}
if (manifestForbidden.length === 0) {
  ok("Manifest contains no forbidden private data keys");
}

// --- Item count ---

const allItems = manifest.items;
const verifiedItems = allItems.filter((item) => item.slug !== EXAMPLE_SLUG);
const exampleItem = allItems.find((item) => item.slug === EXAMPLE_SLUG);

if (exampleItem) {
  warn(`Found "${EXAMPLE_SLUG}" in manifest — excluding from verified count`);
}

console.log(`\nManifest contains ${allItems.length} items total`);
console.log(`Verified items (excluding example): ${verifiedItems.length}\n`);

if (verifiedItems.length < TARGET_COUNT) {
  fail(`Item count is ${verifiedItems.length}, expected at least ${TARGET_COUNT} verified items`);
} else if (verifiedItems.length === TARGET_COUNT) {
  ok(`Item count is exactly ${TARGET_COUNT}`);
} else {
  warn(`Item count is ${verifiedItems.length} (more than target of ${TARGET_COUNT})`);
}

// --- Per-item validation ---

const seenSlugs = new Set();
const categoryCounts = {};
const sourceTypeCounts = {};

for (let i = 0; i < allItems.length; i++) {
  const item = allItems[i];
  const label = item.slug ? `"${item.slug}"` : `item #${i + 1}`;
  console.log(`\n--- ${label} ---`);

  // Required fields
  const requiredFields = [
    "slug",
    "project_file",
    "verified_public_sources",
    "verification_status",
    "selection_reason",
  ];
  let missingFields = false;
  for (const field of requiredFields) {
    if (!item[field]) {
      fail(`${label}: missing required field "${field}"`);
      missingFields = true;
    }
  }
  if (missingFields) continue;

  const { slug, project_file, verified_public_sources } = item;

  // Slug uniqueness
  if (seenSlugs.has(slug)) {
    fail(`Duplicate slug: "${slug}"`);
    continue;
  }
  seenSlugs.add(slug);

  // Slug matches project_file filename (without .json)
  const expectedFilename = `${slug}.json`;
  if (project_file !== `data/projects/${expectedFilename}`) {
    fail(
      `"${slug}": project_file "${project_file}" does not match expected path "data/projects/${expectedFilename}"`
    );
  }

  // Project file exists
  const projectFilePath = path.join(ROOT, project_file);
  if (!fs.existsSync(projectFilePath)) {
    fail(`"${slug}": project file not found at ${project_file}`);
    continue;
  }

  // Project file is valid JSON
  let projectRaw;
  try {
    projectRaw = fs.readFileSync(projectFilePath, "utf8");
  } catch {
    fail(`"${slug}": cannot read project file ${project_file}`);
    continue;
  }

  let project;
  try {
    project = JSON.parse(projectRaw);
  } catch (e) {
    fail(`"${slug}": invalid JSON in project file: ${e.message}`);
    continue;
  }

  // Slug in project file matches item.slug
  if (project.slug !== slug) {
    fail(`"${slug}": project file slug "${project.slug}" does not match item slug "${slug}"`);
  } else {
    ok(`Slug "${slug}" consistent`);
  }

  // verified_public_sources checks
  if (!Array.isArray(verified_public_sources)) {
    fail(`"${slug}": verified_public_sources must be an array`);
  } else {
    // At least one entry (except example)
    if (slug !== EXAMPLE_SLUG && verified_public_sources.length === 0) {
      fail(`"${slug}": verified_public_sources must have at least one entry`);
    }

    for (let j = 0; j < verified_public_sources.length; j++) {
      const source = verified_public_sources[j];
      const srcLabel = `"${slug}": verified_public_sources[${j}]`;

      if (typeof source !== "string" || source.trim().length === 0) {
        fail(`${srcLabel} is empty or not a string`);
        continue;
      }

      if (!source.startsWith("https://")) {
        fail(`${srcLabel} does not start with "https://": ${source}`);
      }

      const domain = extractDomain(source);
      if (domain && PROHIBITED_DOMAINS.has(domain)) {
        fail(`${srcLabel} contains prohibited domain "${domain}": ${source}`);
      }
    }

    if (verified_public_sources.length > 0) {
      ok(`${slug} has ${verified_public_sources.length} verified public source(s)`);
    }
  }

  // Check project file for forbidden fields
  if (slug !== EXAMPLE_SLUG) {
    const projectForbidden = scanForbiddenKeys(project, PROJECT_FORBIDDEN_KEYS, slug);
    for (const { keyPath, key: fKey } of projectForbidden) {
      fail(`"${slug}": project file contains forbidden key "${fKey}" at ${keyPath}`);
    }
    if (projectForbidden.length === 0) {
      ok(`"${slug}" project file has no forbidden fields`);
    }
  } else {
    ok(`"${slug}": example project — skipping forbidden field checks`);
  }

  // Check description and one_liner for marketing phrases
  if (slug !== EXAMPLE_SLUG) {
    const textFields = {};
    if (project.description) textFields.description = project.description;
    if (project.one_liner) textFields.one_liner = project.one_liner;

    for (const [field, text] of Object.entries(textFields)) {
      if (typeof text !== "string") continue;
      const lowerText = text.toLowerCase();
      for (const phrase of FORBIDDEN_MARKETING_PHRASES) {
        if (lowerText.includes(phrase.toLowerCase())) {
          fail(`"${slug}": ${field} contains forbidden marketing phrase "${phrase}"`);
        }
      }
    }

    if (
      typeof project.description === "string" ||
      typeof project.one_liner === "string"
    ) {
      ok(`"${slug}" no forbidden marketing phrases detected`);
    }
  }

  // Collect stats
  if (project.category_slug) {
    categoryCounts[project.category_slug] = (categoryCounts[project.category_slug] || 0) + 1;
  }
  if (project.source_type) {
    sourceTypeCounts[project.source_type] = (sourceTypeCounts[project.source_type] || 0) + 1;
  }
}

// --- Summary ---

console.log("\n========================================");
console.log("              VALIDATION SUMMARY");
console.log("========================================\n");

console.log(`Total manifest items:           ${allItems.length}`);
console.log(`Verified items (excl. example): ${verifiedItems.length}`);
console.log("");

console.log("Projects per category_slug:");
if (Object.keys(categoryCounts).length === 0) {
  console.log("  (none)");
} else {
  const sortedCats = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  for (const [cat, count] of sortedCats) {
    console.log(`  ${cat}: ${count}`);
  }
}

console.log("\nProjects per source_type:");
if (Object.keys(sourceTypeCounts).length === 0) {
  console.log("  (none)");
} else {
  const sortedSrc = Object.entries(sourceTypeCounts).sort((a, b) => b[1] - a[1]);
  for (const [src, count] of sortedSrc) {
    console.log(`  ${src}: ${count}`);
  }
}

if (failures.length > 0) {
  console.log(`\nFailures (${failures.length}):`);
  for (const f of failures) {
    console.log(`  - ${f}`);
  }
}

console.log("");
if (process.exitCode) {
  console.error("Validation FAILED");
  process.exit(1);
}

console.log("All checks passed.");
